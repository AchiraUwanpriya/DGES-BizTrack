import { Box, Typography } from "@mui/material";

// Get color based on rate
export const getColor = (rate) => {
  if (rate >= 90) return "#10b981";
  if (rate >= 75) return "#3b82f6";
  return "#f43f5e";
};

// Custom Dot for Line Chart (Division Breakdown)
export const CustomDot = ({ cx, cy, payload, divisionData }) => {
  const getDivisionData = () => {
    if (divisionData) {
      return divisionData.find((x) => x.division === payload.division);
    }
    return null;
  };

  const color = getColor(payload.rate);
  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill={color}
      stroke="#ffffff"
      strokeWidth={2}
    />
  );
};

// Custom Tooltip for Line Chart (Division Breakdown)
export const CustomTooltip = ({ active, payload, label, divisionData }) => {
  if (active && payload && payload.length) {
    const d = divisionData?.find((x) => x.division === label);
    const color = getColor(payload[0].value);
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          minWidth: "160px",
        }}
      >
        <Typography
          sx={{
            color: "#1a2d4d",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
          <Typography
            sx={{ fontSize: "12px", fontWeight: "bold", color: color }}
          >
            {payload[0].value}% Attendance
          </Typography>
        </Box>
        {d && (
          <Box
            sx={{
              space: "8px",
              fontSize: "12px",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "8px",
            }}
          >
            {d.categories.executive && (
              <Box sx={{ marginBottom: "6px" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Executive
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    color: "#475569",
                    fontSize: "11px",
                  }}
                >
                  <span>
                    Strength: {d.categories.executive.st} | Att:{" "}
                    {d.categories.executive.at}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    {d.categories.executive.percent}%
                  </span>
                </Box>
              </Box>
            )}
            {d.categories.supervisory && (
              <Box sx={{ marginBottom: "6px" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Supervisory
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    color: "#475569",
                    fontSize: "11px",
                  }}
                >
                  <span>
                    Strength: {d.categories.supervisory.st} | Att:{" "}
                    {d.categories.supervisory.at}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    {d.categories.supervisory.percent}%
                  </span>
                </Box>
              </Box>
            )}
            {d.categories.clerical && (
              <Box sx={{ marginBottom: "6px" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Clerical
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    color: "#475569",
                    fontSize: "11px",
                  }}
                >
                  <span>
                    Strength: {d.categories.clerical.st} | Att:{" "}
                    {d.categories.clerical.at}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    {d.categories.clerical.percent}%
                  </span>
                </Box>
              </Box>
            )}
            {d.categories.industrial && (
              <Box sx={{ marginBottom: "6px" }}>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginBottom: "2px",
                  }}
                >
                  Industrial
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    color: "#475569",
                    fontSize: "11px",
                  }}
                >
                  <span>
                    Strength: {d.categories.industrial.st} | Att:{" "}
                    {d.categories.industrial.at}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    {d.categories.industrial.percent}%
                  </span>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  }
  return null;
};

// Custom Tooltip for CDPLC Chart
export const CDPLCCustomTooltip = ({ active, payload, cdplcData }) => {
  if (active && payload && payload.length) {
    const item = cdplcData?.find((d) => d.name === payload[0].payload.name);
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            color: "#1a2d4d",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          {payload[0].payload.name}
        </Typography>
        <Box sx={{ space: "4px", fontSize: "12px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "4px",
            }}
          >
            <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
              Actual %
            </Typography>
            <Typography
              sx={{ fontWeight: 600, color: "#1a2d4d", fontSize: "11px" }}
            >
              {item?.actualPct}%
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "4px",
            }}
          >
            <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
              Eligible %
            </Typography>
            <Typography
              sx={{ fontWeight: 600, color: "#1a2d4d", fontSize: "11px" }}
            >
              {item?.eligiblePct}%
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "4px",
            }}
          >
            <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
              Attendance
            </Typography>
            <Typography
              sx={{ fontWeight: 600, color: "#1a2d4d", fontSize: "11px" }}
            >
              {item?.attendance}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
              Strength
            </Typography>
            <Typography
              sx={{ fontWeight: 600, color: "#1a2d4d", fontSize: "11px" }}
            >
              {item?.strength}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
};

// Custom Legend for CDPLC Chart
export const CDPLCLegend = ({ cdplcData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "16px",
        marginTop: "12px",
      }}
    >
      {cdplcData?.map((entry) => (
        <Box
          key={entry.name}
          sx={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: entry.fill,
            }}
          />
          <Typography sx={{ fontSize: "12px", color: "#64748b" }}>
            {entry.name}
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: "bold", color: entry.fill }}
          >
            {entry.actualPct}%
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
