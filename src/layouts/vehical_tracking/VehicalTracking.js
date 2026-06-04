import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { CircularProgress, Box, IconButton, Typography, Button } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

// Relative URL — served through the React dev server proxy (src/setupProxy.js).
// Works on every device (iOS, Android, desktop).
const PROXY_URL =
  "/gps-proxy/index.php?au=17D49774E905C0B2484BCD68401BCA34&m=true";

// ── BizTrack theme CSS injected into the GPS iframe ───────────────────────
// Hides the original purple/blue navbar and sets padding/positions
// so the map fills 100% of the iframe without scrollbars.
const BIZTRACK_THEME = `
  /* ── Hide original navbar & reset spacing ── */
  nav.navbar,
  .navbar,
  .navbar-fixed-top {
    display: none !important;
  }
  body {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  #page_map,
  .page-map {
    top: 0 !important;
    height: 100% !important;
  }
  #page_menu,
  .page-menu,
  .menu-block {
    top: 0 !important;
    height: 100% !important;
  }

  /* ── Sidebar ── */
  .page-menu, #page_menu {
    background-color: #ffffff !important;
    border-right: 1px solid #e0e7ef !important;
  }
  .page-menu .menu-block a,
  #page_menu .menu-block a {
    color: #1a2e4a !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    font-weight: 500 !important;
    border-radius: 8px !important;
    transition: background 0.15s ease !important;
  }
  .page-menu .menu-block a:hover,
  #page_menu .menu-block a:hover {
    background-color: #e8f0fb !important;
    color: #004AAD !important;
  }
  .page-menu .menu-header,
  #page_menu .menu-header {
    background-color: #004AAD !important;
    color: #ffffff !important;
  }

  /* ── Buttons ── */
  .btn-primary, .btn-info, .btn-success {
    background-color: #004AAD !important;
    border-color: #003d94 !important;
    border-radius: 8px !important;
  }
  .btn-primary:hover, .btn-info:hover, .btn-success:hover {
    background-color: #0056c9 !important;
  }

  /* ── Panels ── */
  .panel-primary > .panel-heading {
    background-color: #004AAD !important;
    border-color: #003d94 !important;
  }

  /* ── Typography ── */
  body, html {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                 "Helvetica Neue", Arial, sans-serif !important;
  }

  /* ── Leaflet zoom controls ── */
  .leaflet-control-zoom a {
    color: #004AAD !important;
    font-weight: 700 !important;
  }
  .leaflet-control-zoom a:hover {
    background-color: #e8f0fb !important;
  }

  /* ── Scrollbars ── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #004AAD; border-radius: 3px; }
`;

function injectTheme(iframe) {
  try {
    const doc = iframe?.contentDocument || iframe?.contentWindow?.document;
    if (!doc || !doc.head) return;
    // Avoid injecting twice
    if (doc.getElementById("biztrack-theme")) return;
    const style = doc.createElement("style");
    style.id = "biztrack-theme";
    style.textContent = BIZTRACK_THEME;
    doc.head.appendChild(style);
  } catch (e) {
    // Silently ignore — cross-origin guard (shouldn't happen via proxy)
  }
}

function VehicalTracking() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const iframeRef = useRef(null);
  const containerRef = useRef(null);

  // Custom states synced from the iframe
  const [iframeTitle, setIframeTitle] = useState("Vehicle Tracker");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navControls, setNavControls] = useState({
    map_layer: { visible: false, value: "", options: [] },
    event_list_page: { visible: false, value: "", options: [] },
    marker_list_page: { visible: false, value: "", options: [] },
    route_list_page: { visible: false, value: "", options: [] },
    zone_list_page: { visible: false, value: "", options: [] },
  });

  // Keep refs in sync for the polling function to avoid dependency loops
  const iframeTitleRef = useRef(iframeTitle);
  const isMenuOpenRef = useRef(isMenuOpen);
  const navControlsRef = useRef(navControls);

  useEffect(() => {
    iframeTitleRef.current = iframeTitle;
  }, [iframeTitle]);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    navControlsRef.current = navControls;
  }, [navControls]);

  // Disable scroll on the parent route container to keep the layout fixed
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (parent) {
      const originalOverflow = parent.style.overflowY;
      parent.style.overflowY = "hidden";
      return () => {
        parent.style.overflowY = originalOverflow;
      };
    }
  }, []);

  const syncFromIframe = () => {
    try {
      const iframe = iframeRef.current;
      const win = iframe?.contentWindow;
      const doc = iframe?.contentDocument || win?.document;
      if (!doc || !win) return;

      // 1. Sync Title
      const pageTitleEl = doc.getElementById("page_title");
      if (pageTitleEl) {
        const txt = pageTitleEl.textContent.trim();
        if (txt && txt !== iframeTitleRef.current) {
          setIframeTitle(txt);
        }
      }

      // 2. Sync Menu State
      const pageMenu = doc.getElementById("page_menu");
      const currentMenuOpen = pageMenu && win.getComputedStyle(pageMenu).display !== "none";
      if (currentMenuOpen !== isMenuOpenRef.current) {
        setIsMenuOpen(currentMenuOpen);
      }

      // 3. Sync Select Controls
      const selectIds = [
        "map_layer",
        "event_list_page",
        "marker_list_page",
        "route_list_page",
        "zone_list_page",
      ];

      let changed = false;
      const currentControls = navControlsRef.current;
      const updatedControls = { ...currentControls };

      selectIds.forEach((id) => {
        const selectEl = doc.getElementById(id);
        if (selectEl) {
          const displayStyle = win.getComputedStyle(selectEl).display;
          const isVisible = displayStyle !== "none";

          const options = Array.from(selectEl.options).map((opt) => ({
            value: opt.value,
            label: opt.text,
          }));

          const prev = currentControls[id];
          const hasOptionsChanged =
            prev.options.length !== options.length ||
            prev.options.some((opt, idx) => opt.value !== options[idx].value || opt.label !== options[idx].label);

          if (
            prev.visible !== isVisible ||
            prev.value !== selectEl.value ||
            hasOptionsChanged
          ) {
            updatedControls[id] = {
              visible: isVisible,
              value: selectEl.value,
              options,
            };
            changed = true;
          }
        } else if (currentControls[id].visible) {
          updatedControls[id] = { visible: false, value: "", options: [] };
          changed = true;
        }
      });

      if (changed) {
        setNavControls(updatedControls);
      }
    } catch (e) {
      // Ignore security block or transient load errors
    }
  };

  // Sync polling setup
  useEffect(() => {
    if (status !== "ready") return;

    syncFromIframe();
    const intervalId = setInterval(syncFromIframe, 500);
    return () => clearInterval(intervalId);
  }, [status]);

  const handleControlChange = (id, newValue) => {
    try {
      const iframe = iframeRef.current;
      const win = iframe?.contentWindow;
      const doc = iframe?.contentDocument || win?.document;
      if (!win || !doc) return;

      const selectEl = doc.getElementById(id);
      if (selectEl) {
        selectEl.value = newValue;
        const event = new Event("change", { bubbles: true });
        selectEl.dispatchEvent(event);
      }

      setNavControls((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          value: newValue,
        },
      }));
    } catch (e) {
      console.error(`Error changing control ${id}:`, e);
    }
  };

  const toggleMenu = () => {
    try {
      const iframe = iframeRef.current;
      const win = iframe?.contentWindow;
      const doc = iframe?.contentDocument || win?.document;
      if (!win || !doc) return;

      if (isMenuOpenRef.current) {
        if (typeof win.switchPage === "function") {
          win.switchPage("map");
        } else {
          doc.getElementById("page_menu_map")?.click();
        }
      } else {
        if (typeof win.switchPage === "function") {
          win.switchPage("menu");
        } else {
          doc.querySelector(".show-menu")?.click();
        }
      }
    } catch (e) {
      console.error("Error toggling menu:", e);
    }
  };

  const handleLoad = () => {
    try {
      const iframeDoc =
        iframeRef.current?.contentDocument ||
        iframeRef.current?.contentWindow?.document;
      const title = iframeDoc?.title || "";
      if (
        title.toLowerCase().includes("biztrack") ||
        title.toLowerCase().includes("react app")
      ) {
        setStatus("error");
        return;
      }
      injectTheme(iframeRef.current);
    } catch (_) {
      injectTheme(iframeRef.current);
    }
    setStatus("ready");
  };

  const handleRetry = () => {
    setStatus("loading");
    if (iframeRef.current) {
      iframeRef.current.src = PROXY_URL;
    }
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.5,
          py: 0.8,
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e7ef",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => navigate(-1)}
            size="small"
            sx={{ color: "#004AAD", mr: 0.5 }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          {status === "ready" && (
            <IconButton
              onClick={toggleMenu}
              size="small"
              sx={{ color: "#004AAD", mr: 1 }}
            >
              {isMenuOpen ? (
                <CloseRoundedIcon fontSize="small" />
              ) : (
                <MenuRoundedIcon fontSize="small" />
              )}
            </IconButton>
          )}

          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ color: "#004AAD", fontSize: 15, letterSpacing: 0.2 }}
          >
            {iframeTitle}
          </Typography>
        </Box>

        {/* Dropdowns */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {status === "ready" &&
            Object.entries(navControls).map(([id, control]) => {
              if (!control.visible || control.options.length === 0) return null;
              return (
                <Box
                  component="select"
                  key={id}
                  value={control.value}
                  onChange={(e) => handleControlChange(id, e.target.value)}
                  sx={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    padding: "6px 28px 6px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    backgroundColor: "#f8fafc",
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23004AAD' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                    backgroundSize: "14px",
                    color: "#004AAD",
                    fontSize: "13px",
                    fontWeight: "600",
                    outline: "none",
                    cursor: "pointer",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    transition: "all 0.15s ease",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      borderColor: "#004AAD",
                      backgroundColor: "#f0f7ff",
                    },
                    "&:focus": {
                      borderColor: "#004AAD",
                      boxShadow: "0 0 0 2px rgba(0, 74, 173, 0.15)",
                    },
                  }}
                >
                  {control.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Box>
              );
            })}
        </Box>
      </Box>

      {/* Loading spinner */}
      {status === "loading" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 2,
          }}
        >
          <CircularProgress size={36} thickness={4} sx={{ color: "#004AAD" }} />
          <Typography variant="body2" color="text.secondary">
            Loading tracker…
          </Typography>
        </Box>
      )}

      {/* Error state */}
      {status === "error" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 2,
            px: 3,
            textAlign: "center",
          }}
        >
          <WarningAmberRoundedIcon sx={{ fontSize: 48, color: "#f59e0b" }} />
          <Typography variant="subtitle1" fontWeight={600}>
            Tracker Unavailable
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The GPS proxy is not responding. Please restart the dev server
            and try again.
          </Typography>
          <Button
            variant="contained"
            startIcon={<RefreshRoundedIcon />}
            onClick={handleRetry}
            sx={{ backgroundColor: "#004AAD", borderRadius: 2, mt: 1 }}
          >
            Retry
          </Button>
        </Box>
      )}

      {/* GPS Iframe */}
      <iframe
        ref={iframeRef}
        src={PROXY_URL}
        title="Vehicle Tracker"
        onLoad={handleLoad}
        allow="geolocation"
        style={{
          flex: 1,
          border: "none",
          width: "100%",
          height: "100%",
          display: status === "ready" ? "block" : "none",
        }}
      />
    </Box>
  );
}

export default VehicalTracking;