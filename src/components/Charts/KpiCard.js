import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

// Count Up Hook
export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef();
  const start = useRef();

  useEffect(() => {
    start.current = undefined;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return count;
}

// KPI Card Component
export function KpiCard({
  label,
  target,
  suffix = "",
  icon: Icon,
  sparkData,
  sparkColor,
  trend,
  trendPositive,
  delay,
}) {
  const count = useCountUp(target, 1200 + delay * 200);

  // Determine icon background color based on sparkColor
  const getIconBgColor = (color) => {
    const colorMap = {
      "#3b82f6": "#dbeafe", // blue
      "#8b5cf6": "#ede9fe", // purple
      "#10b981": "#d1fae5", // green
      "#06b6d4": "#cffafe", // cyan
    };
    return colorMap[color] || `${color}15`;
  };

  const getIconColor = (color) => {
    const colorMap = {
      "#3b82f6": "#1e40af", // blue
      "#8b5cf6": "#5b21b6", // purple
      "#10b981": "#065f46", // green
      "#06b6d4": "#0e4e4d", // cyan
    };
    return colorMap[color] || color;
  };

  return (
    <Box
      sx={{
        animation: `slideUp 0.5s ease-out ${delay * 0.12}s forwards`,
        opacity: 0,
        "@keyframes slideUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "16px 20px 12px",
          color: "#1a2d4d",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          },
          display: "flex",
          flexDirection: "column",
          minHeight: "102px",
        }}
      >
        {/* Content Container */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left Section - Icon and Values */}
          <Box sx={{ display: "flex", gap: "12px", flex: 1 }}>
            {/* Icon */}
            <Box
              sx={{
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: getIconBgColor(sparkColor),
                color: getIconColor(sparkColor),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "44px",
                height: "44px",
                flexShrink: 0,
              }}
            >
              <Icon size={24} />
            </Box>

            {/* Value and Label */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#000",
                  letterSpacing: "-0.5px",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {count.toLocaleString()}
                {suffix}
              </Typography>
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "#6b7280",
                  marginTop: "4px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {label}
              </Typography>
            </Box>
          </Box>

          {/* Right Section - Trend Indicator */}
          {trend && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              <Box
                sx={{
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor: trendPositive
                    ? "rgba(16, 185, 129, 0.1)"
                    : "rgba(244, 63, 94, 0.1)",
                  color: trendPositive ? "#10b981" : "#f43f5e",
                }}
              >
                {trend}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
