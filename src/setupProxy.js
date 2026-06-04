/**
 * GPS Tracker Proxy — React Dev Server Middleware
 * ================================================
 * Auto-loaded by react-scripts on `npm start`.
 * Proxies /gps-proxy/* → gps.trackmycar.lk with:
 *  - Server-side authentication (session cookie injection)
 *  - X-Frame-Options / CSP headers stripped so iframe works
 *  - Mobile User-Agent for all requests (iOS, Android, desktop)
 *
 * Theme styling is injected via iframe.contentDocument in VehicalTracking.js
 * (possible because the proxy makes the GPS page same-origin with the app).
 */

const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");

const GPS_BASE    = "https://gps.trackmycar.lk";
const GPS_USERNAME = "cdplc";
const GPS_PASSWORD = "cdplc#dts223";

let sessionCookie = "";

async function loginToGPS() {
  try {
    console.log("[gps-proxy] Logging in to GPS tracker…");
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
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36",
          Referer: `${GPS_BASE}/index.php`,
          Origin: GPS_BASE,
        },
        maxRedirects: 5,
        validateStatus: () => true,
      }
    );
    const cookies = response.headers["set-cookie"];
    if (cookies && cookies.length > 0) {
      sessionCookie = cookies.map((c) => c.split(";")[0]).join("; ");
      console.log("[gps-proxy] Session cookie:", sessionCookie);
    } else {
      console.warn("[gps-proxy] No Set-Cookie in login response.");
    }
    console.log("[gps-proxy] Login result:", response.data);
  } catch (err) {
    console.error("[gps-proxy] Login failed:", err.message);
  }
}

module.exports = function (app) {
  loginToGPS();

  app.use(
    "/gps-proxy",
    createProxyMiddleware({
      target: GPS_BASE,
      changeOrigin: true,
      secure: true,
      pathRewrite: { "^/gps-proxy": "" },
      on: {
        proxyReq: (proxyReq) => {
          if (sessionCookie) {
            proxyReq.setHeader("Cookie", sessionCookie);
          }
          proxyReq.setHeader(
            "User-Agent",
            "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36"
          );
          proxyReq.setHeader("Referer", `${GPS_BASE}/index.php`);
          proxyReq.setHeader("Origin", GPS_BASE);
        },
        proxyRes: (proxyRes) => {
          // Strip headers that block iframe embedding
          delete proxyRes.headers["x-frame-options"];
          delete proxyRes.headers["content-security-policy"];
          proxyRes.headers["Access-Control-Allow-Origin"] = "*";

          // Keep session cookie up to date
          const setCookie = proxyRes.headers["set-cookie"];
          if (setCookie && setCookie.length > 0) {
            try {
              const newCookies = setCookie.map((c) => c.split(";")[0]).join("; ");
              const existing = Object.fromEntries(
                sessionCookie.split("; ").filter(Boolean).map((c) => {
                  const [k, ...rest] = c.split("=");
                  return [k, rest.join("=")];
                })
              );
              const incoming = Object.fromEntries(
                newCookies.split("; ").filter(Boolean).map((c) => {
                  const [k, ...rest] = c.split("=");
                  return [k, rest.join("=")];
                })
              );
              sessionCookie = Object.entries({ ...existing, ...incoming })
                .map(([k, v]) => `${k}=${v}`)
                .join("; ");
            } catch (_) {}
          }
        },
        error: (err, req, res) => {
          console.error("[gps-proxy] Error:", err.message);
          res.status(502).send("GPS Proxy error: " + err.message);
        },
      },
    })
  );
};
