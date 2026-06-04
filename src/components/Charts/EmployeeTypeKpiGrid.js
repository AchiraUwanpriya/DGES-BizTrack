import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import {
  Users,
  CalendarOff,
  CheckCircle2,
  XCircle,
  UsersRound,
  Building2,
} from "lucide-react";

// ─── Type normalization ───────────────────────────────────────────────────────
const normalizeType = (value) => {
  const s = (value || "").toString().trim().toLowerCase();
  if (s.includes("dges")) return "DGES";
  if (s.includes("trainee")) return "Trainee";
  if (s.includes("sub") && s.includes("l")) return "Sub (L)";
  if (s.includes("sub") && s.includes("f")) return "Sub (F)";
  if (s.includes("kry") || s.includes("site")) return "KRY Site";
  return (value || "").toString().trim();
};

const TYPE_ORDER = { DGES: 1, "Sub (L)": 2, "Sub (F)": 3, Trainee: 4, "KRY Site": 5 };

// ─── Card color config ────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  DGES:      { pill: "#a3cff8", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#c9ddf7", numColor: "#222427", rateColor: "#0314fa" },
  Trainee:    { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
  "Sub (L)":  { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
  "Sub (F)":  { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
  "KRY Site": { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
};

// ─── Build per-type breakdown ─────────────────────────────────────────────────
const buildTypeBreakdown = (allAttendance = []) => {
  console.log("Building breakdown from:", allAttendance);
  
  const transformed = (allAttendance || [])
    .filter((item) => {
      const t = (item?.Type || item?.TYPE || item?.EmployeeType || item?.employeeType || "").toString().trim();
      return t && t.toUpperCase() !== "TOTAL";
    })
    .map((item) => {
      const type       = normalizeType(item?.Type || item?.TYPE || item?.EmployeeType || "Unknown");
      const strength   = parseInt(item?.ActualStrength   || item?.Strength   || 0) || 0;
      const eligible   = parseInt(item?.EligibleStrength || item?.Eligible   || item?.EligibleCount || item?.EligibleAttendance || 0) || 0;
      const attendance = parseInt(item?.Attendance || 0) || 0;
      // ✅ CRITICAL FIX: Use ActualPercentage as the primary rate source
      let apiRate = parseFloat(item?.ActualPercentage || 0);
      
      // Fallback to EligiblePercentage if ActualPercentage is not available
      if (isNaN(apiRate) || apiRate === 0) {
        apiRate = parseFloat(item?.EligiblePercentage || 0);
      }
      
      console.log(`Processing ${type}:`, { strength, eligible, attendance, apiRate });
      
      return { type, strength, eligible, attendance, apiRate };
    });

  const merged = {};
  transformed.forEach((row) => {
    if (!merged[row.type]) merged[row.type] = { ...row };
    else {
      merged[row.type].strength   += row.strength;
      merged[row.type].eligible   += row.eligible;
      merged[row.type].attendance += row.attendance;
      // Average the apiRate when merging rows of same type (though usually one row per type)
      merged[row.type].apiRate = (merged[row.type].apiRate + row.apiRate) / 2;
    }
  });

  const result = Object.values(merged).sort(
    (a, b) => (TYPE_ORDER[a.type] || 99) - (TYPE_ORDER[b.type] || 99)
  );
  
  console.log("Final breakdown:", result);
  return result;
};

// ─── Arc Gauge SVG ────────────────────────────────────────────────────────────
const ARC_LENGTH = Math.PI * 42;

const ArcGauge = ({ rate, color, trackColor }) => {
  // Ensure rate is a valid number between 0 and 100
  const validRate = Math.min(100, Math.max(0, rate || 0));
  const offset = ARC_LENGTH - (ARC_LENGTH * validRate) / 100;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, pb: 1.5, pt: 0.5 }}>
      <svg width="100" height="54" viewBox="0 0 100 54" style={{ overflow: "visible" }}>
        <path
          d="M8,50 A42,42 0 0,1 92,50"
          fill="none" stroke={trackColor} strokeWidth="7" strokeLinecap="round"
        />
        <path
          d="M8,50 A42,42 0 0,1 92,50"
          fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
          strokeDasharray={ARC_LENGTH} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
    </Box>
  );
};

// ─── CdplcKpiCard (full-width) ────────────────────────────────────────────────
export const CdplcKpiCard = ({ strength, eligible, attendance, apiRate = 0, liveData, onClick }) => {
  const cfg = TYPE_CONFIG["DGES"];
  
  let rate = Math.round(apiRate);
  
  // Only calculate if apiRate is not available (fallback)
  if (isNaN(rate) || rate === 0) {
    rate = eligible > 0 ? Math.round((attendance / eligible) * 100) : 0;
  }
  
  console.log(`DGES Card - apiRate: ${apiRate}, calculated rate: ${rate}`);

  const liveRows = [
    { label: "Live Employees", value: liveData?.liveEmployees, color: "#0314fa", icon: <Users size={14} strokeWidth={2} /> },
    { label: "Duty Off",       value: liveData?.dutyOff,       color: "#f59e0b", icon: <CalendarOff size={14} strokeWidth={2} /> },
    { label: "OT Entered",     value: liveData?.otEntered,     color: "#10b981", icon: <CheckCircle2 size={14} strokeWidth={2} /> },
    { label: "OT Not Entered", value: liveData?.otNotEntered,  color: "#e53935", icon: <XCircle size={14} strokeWidth={2} /> },
  ];

  const strengthRows = [
    // { label: "Eligible Strength", value: eligible, icon: <UsersRound size={13} strokeWidth={2} /> },
    { label: "Actual Strength",   value: strength, icon: <Building2 size={13} strokeWidth={2} /> },
  ];

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "0.5px solid",
        borderColor: "divider",
        background: "linear-gradient(135deg, #EEF2FF 0%)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: onClick ? "pointer" : "default",
        mb: { xs: "10px", sm: "12px", md: "14px" },
        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 28px rgba(0,0,0,0.09)" },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: "16px", pt: "14px", pb: "12px" }}>
        <Box sx={{ display: "inline-block", px: "9px", py: "3px", borderRadius: "20px", backgroundColor: cfg.pill }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: cfg.pillText }}>DGES</Typography>
        </Box>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: cfg.rateColor, lineHeight: 1 }}>
          {rate}%
        </Typography>
      </Box>

      <Divider />

      {/* Body: 3-section grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1px 1fr", sm: "1fr 1px 1fr 1px 1fr", md: "1.2fr 1px 1.6fr 1px 1.6fr" }, alignItems: "stretch" }}>

        {/* Col 1: Attendance + Arc */}
        <Box sx={{ textAlign: "center", pt: "14px", pb: 0, px: "8px" }}>
          <Typography sx={{ fontSize: "10px", color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", mb: "4px" }}>
            Attendance
          </Typography>
          <Typography sx={{ fontSize: "36px", fontWeight: 700, color: cfg.numColor, lineHeight: 1 }}>
            {(attendance || 0).toLocaleString()}
          </Typography>
          <ArcGauge rate={rate} color={cfg.arc} trackColor={cfg.arcTrack} />
        </Box>

        {/* Divider */}
        <Box sx={{ backgroundColor: "divider", width: "1px", my: "12px" }} />

        {/* Col 2: Live panel */}
        <Box sx={{ px: "14px", py: "14px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "5px", mb: "2px" }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#e53935" }} />
            <Typography sx={{ fontSize: "11px", fontWeight: 700, color: "#e53935", letterSpacing: "0.8px" }}>LIVE</Typography>
          </Box>
          {liveRows.map(({ label, value, color, icon }) => (
            <Box key={label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Box sx={{ color, display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</Box>
                <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 600 }}>{label}</Typography>
              </Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color }}>
                {value != null ? value.toLocaleString() : "—"}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Divider (hidden xs) */}
        <Box sx={{ display: { xs: "none", sm: "block" }, backgroundColor: "divider", width: "1px", my: "12px" }} />

        {/* Col 3: Strength (hidden xs) */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, px: "14px", py: "14px", flexDirection: "column", gap: "9px", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "10px", color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", mb: "2px" }}>
            Strength
          </Typography>
          {strengthRows.map(({ label, value, icon }) => (
            <Box key={label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Box sx={{ color: "text.secondary", display: "flex", alignItems: "center", flexShrink: 0 }}>{icon}</Box>
                <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 600 }}>{label}</Typography>
              </Box>
              <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "text.primary" }}>
                {(value || 0).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mobile-only Strength */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          borderTop: "0.5px solid",
          borderColor: "divider",
          px: 2,
          py: "10px",
          gap: "8px",
          flexDirection: "column",
        }}
      >
        {strengthRows.map(({ label, value, icon }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                minWidth: "140px",
              }}
            >
              <Box
                sx={{
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {icon}
              </Box>

              <Typography
                sx={{
                  fontSize: "11px",
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                {label}
              </Typography>
            </Box>

            {/* Right Side */}
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {(value || 0).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export const AttendanceKpiCard = ({ type, strength, eligible, attendance, apiRate = 0, onClick }) => {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG["DGES"];
  
  // ✅ CRITICAL FIX: Use apiRate from server first
  let rate = Math.round(apiRate);
  
  // Only calculate if apiRate is not available (fallback)
  if (isNaN(rate) || rate === 0) {
    rate = eligible > 0 ? Math.round((attendance / eligible) * 100) : 0;
  }
  
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (e) => {
    if (!isInteractive) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "0.5px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: isInteractive ? "pointer" : "default",
        "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 28px rgba(0,0,0,0.09)" },
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", px: "16px", pt: "14px", pb: "12px" }}>
        <Box sx={{ display: "inline-block", px: "9px", py: "3px", borderRadius: "20px", backgroundColor: cfg.pill }}>
          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: cfg.pillText }}>{type}</Typography>
        </Box>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, color: cfg.rateColor, lineHeight: 1 }}>
          {rate}%
        </Typography>
      </Box>

      <Divider />

      {/* Attendance */}
      <Box sx={{ textAlign: "center", pt: "14px", pb: 0 }}>
        <Typography sx={{ fontSize: "10px", color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", mb: "4px" }}>
          Attendance
        </Typography>
        <Typography sx={{ fontSize: "32px", fontWeight: 700, color: cfg.numColor, lineHeight: 1 }}>
          {(attendance || 0).toLocaleString()}
        </Typography>
      </Box>

      <ArcGauge rate={rate} color={cfg.arc} trackColor={cfg.arcTrack} />

      {/* Strength */}
      <Divider />
      <Box sx={{ px: "16px", pt: "10px", pb: "14px", display: "flex", flexDirection: "column", gap: "7px" }}>
        {[
          // { label: "Eligible Strength", value: eligible, icon: <UsersRound size={12} strokeWidth={2} /> },
          { label: "Actual Strength",   value: strength, icon: <Building2 size={12} strokeWidth={2} /> },
        ].map(({ label, value, icon }) => (
          <Box key={label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Box sx={{ color: "text.secondary", display: "flex", alignItems: "center" }}>{icon}</Box>
              <Typography sx={{ fontSize: "11px", color: "text.secondary", fontWeight: 600 }}>{label}</Typography>
            </Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "text.primary" }}>
              {(value || 0).toLocaleString()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

// ─── Skeleton components ──────────────────────────────────────────────────────
export const KpiCardSkeleton = () => (
  <Box sx={{ position: "relative", background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)", borderRadius: "16px", padding: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.8)", height: 220, "@keyframes shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } }, "&::after": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)", backgroundSize: "200% 100%", animation: "shimmer 1.8s infinite", borderRadius: "16px" } }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box sx={{ width: "40%", height: 22, backgroundColor: "rgba(0,74,173,0.1)", borderRadius: "10px" }} />
      <Box sx={{ width: "20%", height: 22, backgroundColor: "rgba(0,74,173,0.08)", borderRadius: "6px" }} />
    </Box>
    <Box sx={{ width: "50%", height: 36, backgroundColor: "rgba(0,74,173,0.12)", borderRadius: "6px", mx: "auto", mb: 1 }} />
    <Box sx={{ width: 100, height: 54, backgroundColor: "rgba(0,74,173,0.07)", borderRadius: "50px", mx: "auto", mb: 2 }} />
    {[1, 2].map((i) => (
      <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ width: "30%", height: 11, backgroundColor: "rgba(0,74,173,0.06)", borderRadius: "6px" }} />
        <Box sx={{ width: "25%", height: 11, backgroundColor: "rgba(0,74,173,0.10)", borderRadius: "6px" }} />
      </Box>
    ))}
  </Box>
);

export const CdplcCardSkeleton = () => (
  <Box sx={{ position: "relative", background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)", borderRadius: "16px", padding: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.8)", height: 140, mb: { xs: "10px", sm: "12px", md: "14px" }, "@keyframes shimmer": { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } }, "&::after": { content: '""', position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)", backgroundSize: "200% 100%", animation: "shimmer 1.8s infinite", borderRadius: "16px" } }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box sx={{ width: "15%", height: 22, backgroundColor: "rgba(0,74,173,0.1)", borderRadius: "10px" }} />
      <Box sx={{ width: "8%",  height: 22, backgroundColor: "rgba(0,74,173,0.08)", borderRadius: "6px" }} />
    </Box>
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
      {[1, 2, 3].map((i) => (
        <Box key={i}>
          <Box sx={{ width: "60%", height: 32, backgroundColor: "rgba(0,74,173,0.12)", borderRadius: "6px", mb: 1 }} />
          {[1, 2].map((j) => (
            <Box key={j} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Box sx={{ width: "45%", height: 10, backgroundColor: "rgba(0,74,173,0.06)", borderRadius: "4px" }} />
              <Box sx={{ width: "25%", height: 10, backgroundColor: "rgba(0,74,173,0.10)", borderRadius: "4px" }} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  </Box>
);

// ─── EmployeeTypeKpiGrid — main export for Dashboard ─────────────────────────
export const EmployeeTypeKpiGrid = ({ allAttendance1, loading, onCardClick }) => {
  console.log("EmployeeTypeKpiGrid received data:", allAttendance1);
  
  const breakdown = buildTypeBreakdown(allAttendance1);
  const byType = {};
  breakdown.forEach((row) => { byType[row.type] = row; });

  return (
    <Box sx={{ mb: "24px" }}>
      {/* Row 1: CDPLC full width */}
      {loading ? (
        <CdplcCardSkeleton />
      ) : (
        <CdplcKpiCard
          strength={byType["DGES"]?.strength   || 0}
          eligible={byType["DGES"]?.eligible   || 0}
          attendance={byType["DGES"]?.attendance || 0}
          apiRate={byType["DGES"]?.apiRate      || 0}
          onClick={onCardClick ? () => onCardClick("DGES") : undefined}
        />
      )}

      {/* Row 2: Trainee / Sub (L) / Sub (F) */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)" }, gap: { xs: "10px", sm: "12px", md: "14px" }, alignItems: "start" }}>
        {["Trainee", "Sub (L)"].map((type) =>
          loading ? (
            <KpiCardSkeleton key={type} />
          ) : (
            <AttendanceKpiCard
              key={type}
              type={type}
              strength={byType[type]?.strength   || 0}
              eligible={byType[type]?.eligible   || 0}
              attendance={byType[type]?.attendance || 0}
              apiRate={byType[type]?.apiRate      || 0}
              onClick={onCardClick ? () => onCardClick(type) : undefined}
            />
          )
        )}
      </Box>
      
      {/* Debug info - remove after confirming it works */}
      {!loading && breakdown.length === 0 && (
        <Typography sx={{ color: 'red', mt: 2, textAlign: 'center', fontSize: '12px' }}>
          No data available. Check console for details.
        </Typography>
      )}
    </Box>
  );
};

export default EmployeeTypeKpiGrid;