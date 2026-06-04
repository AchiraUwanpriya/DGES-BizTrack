/**
 * GPS Tracker Proxy Server
 * ========================
 * Runs alongside the React dev server.
 * Logs into gps.trackmycar.lk server-side, stores the session cookie,
 * and proxies all GPS requests through localhost:3001.
 *
 * This completely bypasses third-party cookie restrictions because
 * the React app iframe points to localhost:3001 (same-origin area),
 * and all real HTTP traffic happens server-to-server.
 *
 * Usage:  node proxy-server.js
 */

const express = require("express");
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 3001;
// Domain only — used as the proxy target and for building endpoint URLs
const GPS_BASE = "https://gps.trackmycar.lk";
// Full mobile + pre-auth URL — forwarded to the iframe via the proxy
const GPS_MOBILE_PATH = "/index.php?au=17D49774E905C0B2484BCD68401BCA34&m=true";
const GPS_USERNAME = "cdplc";
const GPS_PASSWORD = "cdplc#dts223";

// Store the session cookie obtained after server-side login
let sessionCookie = "";

// ──────────────────────────────────────────────
// 1.  Login to GPS site and capture session cookie
// ──────────────────────────────────────────────
async function loginToGPS() {
  try {
    console.log("[proxy] Logging in to GPS tracker…");

    const params = new URLSearchParams({
      cmd: "login",
      username: GPS_USERNAME,
      password: GPS_PASSWORD,
      remember_me: "true",
      mobile: "true",
    });

    const response = await axios.post(
      `${GPS_BASE}/func/fn_connect.php`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Mobile User-Agent so the GPS server returns the mobile view
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36",
          Referer: `${GPS_BASE}/index.php`,
          Origin: GPS_BASE,
        },
        maxRedirects: 5,
        validateStatus: () => true, // accept any status
      }
    );

    // Capture Set-Cookie header(s)
    const cookies = response.headers["set-cookie"];
    if (cookies && cookies.length > 0) {
      // Join all cookies into one Cookie header string (strip the flags)
      sessionCookie = cookies
        .map((c) => c.split(";")[0])
        .join("; ");
      console.log("[proxy] Session cookie captured:", sessionCookie);
    } else {
      console.warn("[proxy] No Set-Cookie header in login response.");
    }

    console.log("[proxy] Login response:", response.data);
  } catch (err) {
    console.error("[proxy] Login failed:", err.message);
  }
}

// ──────────────────────────────────────────────
// 2.  Proxy all requests → GPS site, injecting the session cookie
// ──────────────────────────────────────────────
app.use(
  "/",
  createProxyMiddleware({
    target: GPS_BASE,   // must be domain-only for http-proxy-middleware
    changeOrigin: true,
    secure: true,
    // Allow the iframe to be embedded in the React app (removes X-Frame-Options)
    on: {
      proxyReq: (proxyReq) => {
        if (sessionCookie) {
          proxyReq.setHeader("Cookie", sessionCookie);
        }
        // Always send a mobile User-Agent so the GPS site returns mobile view
        proxyReq.setHeader(
          "User-Agent",
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36"
        );
        proxyReq.setHeader("Referer", `${GPS_BASE}/index.php`);
      },
      proxyRes: (proxyRes) => {
        // Remove X-Frame-Options so our app can embed the page in an iframe
        delete proxyRes.headers["x-frame-options"];
        delete proxyRes.headers["content-security-policy"];
        // Allow cross-origin access from the React dev server
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";

        // If GPS server sets new cookies, update our stored session
        const setCookie = proxyRes.headers["set-cookie"];
        if (setCookie && setCookie.length > 0) {
          const newCookies = setCookie.map((c) => c.split(";")[0]).join("; ");
          // Merge new cookies with existing ones
          const existing = Object.fromEntries(
            sessionCookie.split("; ").map((c) => c.split("="))
          );
          const incoming = Object.fromEntries(
            newCookies.split("; ").map((c) => c.split("="))
          );
          const merged = { ...existing, ...incoming };
          sessionCookie = Object.entries(merged)
            .map(([k, v]) => `${k}=${v}`)
            .join("; ");
        }
      },
      error: (err, req, res) => {
        console.error("[proxy] Error:", err.message);
        res.status(502).send("Proxy error: " + err.message);
      },
    },
  })
);

// ──────────────────────────────────────────────
// 3.  Start: login first, then start listening
// ──────────────────────────────────────────────
loginToGPS().then(() => {
  app.listen(PORT, () => {
    console.log(`\n✅ GPS Proxy running at http://localhost:${PORT}`);
    console.log(
      `   Iframe URL: http://localhost:${PORT}${GPS_MOBILE_PATH}`
    );
    console.log(`   React app should be on http://localhost:3000\n`);
  });
});
