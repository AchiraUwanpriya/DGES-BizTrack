const axios = require("axios");

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", (err) => reject(err));
  });
}

module.exports = async (req, res) => {
  const GPS_BASE = "https://gps.trackmycar.lk";

  // 1. Reconstruct path and query params from req.query
  let path = req.query.path || "";
  if (Array.isArray(path)) {
    path = path.join("/");
  }

  const queryParams = { ...req.query };
  delete queryParams.path;
  const queryString = new URLSearchParams(queryParams).toString();

  let normalizedPath = path;
  if (normalizedPath && !normalizedPath.startsWith("/")) {
    normalizedPath = "/" + normalizedPath;
  }
  if (!normalizedPath) {
    normalizedPath = "/";
  }

  const targetUrl = `${GPS_BASE}${normalizedPath}${queryString ? "?" + queryString : ""}`;

  // 2. Prepare headers to forward
  const headers = {};
  if (req.headers.cookie) {
    headers["Cookie"] = req.headers.cookie;
  }
  headers["User-Agent"] =
    "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36";
  headers["Referer"] = `${GPS_BASE}/index.php`;
  headers["Origin"] = GPS_BASE;

  if (req.headers["content-type"]) {
    headers["Content-Type"] = req.headers["content-type"];
  }

  try {
    // Read raw body if present (for POST/PUT requests)
    let requestBody = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      requestBody = await getRawBody(req);
    }

    const config = {
      method: req.method,
      url: targetUrl,
      headers: headers,
      data: requestBody,
      validateStatus: () => true, // Forward any HTTP status code
      responseType: "arraybuffer", // Retrieve raw bytes (handles assets, page HTML, etc.)
      maxRedirects: 0, // Do NOT follow redirects server-side; let the browser handle redirects same-origin
    };

    const response = await axios(config);

    // 3. Set the response status code
    res.status(response.status);

    // 4. Forward response headers, stripping security and transfer headers
    const suppress = [
      "x-frame-options",
      "content-security-policy",
      "transfer-encoding",
      "content-encoding",
      "content-length",
      "connection",
    ];

    Object.entries(response.headers).forEach(([key, value]) => {
      const lowerKey = key.toLowerCase();
      if (suppress.includes(lowerKey)) return;

      // Rewrite Location redirect headers to point back to the proxy route
      if (lowerKey === "location") {
        let loc = value;
        loc = loc.replace(GPS_BASE, "");
        if (!loc.startsWith("/")) {
          const lastSlashIndex = normalizedPath.lastIndexOf("/");
          const currentDir = lastSlashIndex !== -1 ? normalizedPath.substring(0, lastSlashIndex) : "";
          loc = currentDir + "/" + loc;
        }
        const cleanLoc = ("/gps-proxy/" + loc).replace(/\/+/g, "/");
        res.setHeader("Location", cleanLoc);
      } else {
        res.setHeader(key, value);
      }
    });

    // 5. Inject headers to permit iframe embedding same-origin
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("X-GPS-Proxy", "active");

    // 6. Return response body buffer
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("[vercel-proxy] Error:", error.message);
    res.status(502).send("GPS Proxy Error: " + error.message);
  }
};

// Disable automatic body parsing so we can read raw buffer stream directly
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
