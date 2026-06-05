<?php
/**
 * GPS Tracker PHP Proxy — Hostinger Production Version
 * =====================================================
 * Place this file alongside your React build in public_html.
 *
 * How it works:
 *  1. The React app calls /gps-proxy.php?path=/index.php?au=TOKEN&m=true
 *  2. This script fetches the page from gps.trackmycar.lk server-side
 *  3. It strips X-Frame-Options so the iframe can embed the page
 *  4. All assets (JS, CSS, images) are fetched directly by the browser from
 *     gps.trackmycar.lk (they don't need proxying — only the HTML page does)
 *
 * Diagnostic: visit /gps-proxy.php?diag=1 in your browser to check if it works
 */

// ── Suppress PHP errors from appearing in proxied responses ───────────────
error_reporting(0);
ini_set('display_errors', 0);

// ── Config ────────────────────────────────────────────────────────────────
const GPS_BASE     = 'https://gps.trackmycar.lk';
const GPS_AUTH_URL = GPS_BASE . '/func/fn_connect.php';
const GPS_USERNAME = 'cdplc';
const GPS_PASSWORD = 'cdplc#dts223';
const GPS_UA       = 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36';

// ── CORS ──────────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-GPS-Proxy: active'); // React component checks this header

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── Diagnostic mode ───────────────────────────────────────────────────────
if (isset($_GET['diag'])) {
    header('Content-Type: application/json');
    $tests = [];

    // Test 1: cURL available?
    $tests['curl_available'] = function_exists('curl_init');

    // Test 2: Can connect to GPS server?
    $tests['gps_reachable'] = false;
    if ($tests['curl_available']) {
        $ch = curl_init(GPS_BASE);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_NOBODY         => true,
            CURLOPT_TIMEOUT        => 10,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 0,
        ]);
        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        $tests['gps_reachable'] = $httpCode > 0;
        $tests['gps_http_code'] = $httpCode;
        if ($curlError) $tests['gps_curl_error'] = $curlError;
    }

    // Test 3: Can login?
    $tests['login_success'] = false;
    if ($tests['gps_reachable']) {
        $cookie = doLogin();
        $tests['login_success'] = !empty($cookie);
        if ($cookie) $tests['session_cookie_preview'] = substr($cookie, 0, 60) . '...';
    }

    // Test 4: Cache writable?
    $tests['cache_writable'] = false;
    $cacheFile = sys_get_temp_dir() . '/gps_cache_test.txt';
    if (@file_put_contents($cacheFile, 'test') !== false) {
        $tests['cache_writable'] = true;
        @unlink($cacheFile);
    }

    echo json_encode($tests, JSON_PRETTY_PRINT);
    exit;
}

// ── File-Based Cookie Caching ──────────────────────────────────────────────
// Caching cookies in a local file is 100% reliable on shared hosting and
// completely bypasses browser cookie blockages and PHP session issues.
define('COOKIE_FILE', sys_get_temp_dir() . '/gps_cookie_' . md5(__DIR__) . '.txt');

function getCachedCookie() {
    if (file_exists(COOKIE_FILE) && (time() - filemtime(COOKIE_FILE)) < 21600) { // 6 hours
        $content = @file_get_contents(COOKIE_FILE);
        if ($content !== false) {
            return $content;
        }
    }
    return null;
}

function cacheCookie($cookie) {
    @file_put_contents(COOKIE_FILE, $cookie);
}

function doLogin() {
    if (!function_exists('curl_init')) return '';

    $ch = curl_init(GPS_AUTH_URL);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query([
            'cmd'         => 'login',
            'username'    => GPS_USERNAME,
            'password'    => GPS_PASSWORD,
            'remember_me' => 'true',
            'mobile'      => 'true',
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING       => "",    // Automatically handle all encodings and decompress responses
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_USERAGENT      => GPS_UA,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/x-www-form-urlencoded',
            'Referer: ' . GPS_BASE . '/index.php',
            'Origin: '  . GPS_BASE,
        ],
    ]);
    $resp       = curl_exec($ch);
    $hSize      = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    curl_close($ch);

    if (!$resp) return '';

    preg_match_all('/^Set-Cookie:\s*([^;\r\n]+)/mi', substr($resp, 0, $hSize), $m);
    if (!empty($m[1])) {
        $cookie = implode('; ', $m[1]);
        cacheCookie($cookie);
        return $cookie;
    }
    return '';
}

function getSessionCookie() {
    $c = getCachedCookie();
    return $c ?: doLogin();
}

// ── Build Target URL ──────────────────────────────────────────────────────
// If routed via /gps-proxy/... rewrite, extract the target path directly
// from REQUEST_URI to keep query params and directory context intact.
$reqUri = $_SERVER['REQUEST_URI'];
$prefix = '/gps-proxy';
$gpsPxPos = strpos($reqUri, $prefix);

if ($gpsPxPos !== false) {
    $path = substr($reqUri, $gpsPxPos + strlen($prefix));
    if (substr($path, 0, 1) !== '/') {
        $path = '/' . $path;
    }
} else {
    // Fallback for direct /gps-proxy.php?path=... calls
    $path = $_GET['path'] ?? '/index.php?au=17D49774E905C0B2484BCD68401BCA34&m=true';
    if (substr($path, 0, 1) !== '/') {
        $path = '/' . $path;
    }
}

$targetUrl = GPS_BASE . $path;

// ── Proxy the Request ─────────────────────────────────────────────────────
if (!function_exists('curl_init')) {
    http_response_code(503);
    header('Content-Type: text/plain');
    echo 'Error: PHP cURL extension is not enabled on this server. Enable it in hPanel > PHP > Extensions > curl';
    exit;
}

$cookie   = getSessionCookie();
$isPost   = $_SERVER['REQUEST_METHOD'] === 'POST';
$postBody = $isPost ? file_get_contents('php://input') : null;

$reqHeaders = [
    'Referer: ' . GPS_BASE . '/index.php',
    'Origin: '  . GPS_BASE,
];
if ($cookie) {
    $reqHeaders[] = 'Cookie: ' . $cookie;
}
if ($isPost) {
    $ct = $_SERVER['CONTENT_TYPE'] ?? 'application/x-www-form-urlencoded';
    $reqHeaders[] = 'Content-Type: ' . $ct;
}

$ch = curl_init($targetUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HEADER         => true,
    CURLOPT_FOLLOWLOCATION => false, // Don't follow redirects on server; let the browser follow them to keep URL in sync
    CURLOPT_ENCODING       => "",    // Automatically handle all encodings (gzip, deflate, etc.) and decompress the response
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_USERAGENT      => GPS_UA,
    CURLOPT_HTTPHEADER     => $reqHeaders,
    CURLOPT_POST           => $isPost,
    CURLOPT_POSTFIELDS     => ($isPost && $postBody) ? $postBody : null,
]);

$raw      = curl_exec($ch);
$hSize    = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$cType    = curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: 'text/html; charset=UTF-8';
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr || !$raw) {
    http_response_code(502);
    header('Content-Type: text/plain');
    echo 'GPS Proxy Error: Could not reach gps.trackmycar.lk — ' . $curlErr;
    exit;
}

$rawHeaders  = substr($raw, 0, $hSize);
$body        = substr($raw, $hSize);

// ── Update session cookie ─────────────────────────────────────────────────
preg_match_all('/^Set-Cookie:\s*([^;\r\n]+)/mi', $rawHeaders, $sc);
if (!empty($sc[1])) {
    // Merge new cookies on top of existing ones
    $merged = [];
    foreach (explode('; ', $cookie ?: '') as $p) {
        if (strpos($p, '=') !== false) {
            [$k, $v] = explode('=', trim($p), 2);
            $merged[trim($k)] = trim($v);
        }
    }
    foreach ($sc[1] as $p) {
        if (strpos($p, '=') !== false) {
            [$k, $v] = explode('=', trim($p), 2);
            $merged[trim($k)] = trim($v);
        }
    }
    cacheCookie(implode('; ', array_map(fn($k, $v) => "$k=$v", array_keys($merged), $merged)));
}

// ── Send Response ─────────────────────────────────────────────────────────
http_response_code($httpCode);
header('Content-Type: ' . $cType, true);

// Headers to suppress (don't forward to browser)
$suppress = [
    'x-frame-options', 'content-security-policy', 'set-cookie',
    'transfer-encoding', 'content-encoding', 'content-length',
    'connection', 'keep-alive', 'content-type', // already set above
];

foreach (explode("\r\n", $rawHeaders) as $line) {
    if (!trim($line) || str_starts_with($line, 'HTTP/')) continue;
    $pos = strpos($line, ':');
    if ($pos === false) continue;
    
    $name = strtolower(trim(substr($line, 0, $pos)));
    if (in_array($name, $suppress)) continue;
    
    // Rewrite Location header to keep browser requests routed through the proxy
    if ($name === 'location') {
        $value = trim(substr($line, $pos + 1));
        
        // Find proxy base folder (e.g. /biztrack/gps-proxy or /gps-proxy)
        $proxyBase = '';
        if ($gpsPxPos !== false) {
            $proxyBase = substr($reqUri, 0, $gpsPxPos) . '/gps-proxy';
        } else {
            $scriptName = $_SERVER['SCRIPT_NAME'];
            $proxyBase = dirname($scriptName);
            if ($proxyBase === '/' || $proxyBase === '\\') {
                $proxyBase = '';
            }
            $proxyBase .= '/gps-proxy';
        }
        
        // Remove GPS_BASE if it's an absolute URL
        $value = str_ireplace(GPS_BASE, '', $value);
        
        // If it's a relative redirect (e.g. "tracking.php"), resolve it
        // relative to the current path context of the requested target URL
        if (!str_starts_with($value, '/')) {
            $currentPath = parse_url($targetUrl, PHP_URL_PATH) ?: '/index.php';
            $currentDir = dirname($currentPath);
            if ($currentDir === '/' || $currentDir === '\\') {
                $currentDir = '';
            }
            $value = $currentDir . '/' . $value;
        }
        
        $line = 'Location: ' . $proxyBase . $value;
    }
    
    header($line, false);
}

header('X-GPS-Proxy: active');
header('X-Frame-Options: ALLOWALL');

// ── Output ─────────────────────────────────────────────────────────────────
// Output the body as-is. All relative URLs will resolve to /gps-proxy/...
// dynamically, so we don't need <base href> injection and avoid CORS.
echo $body;

