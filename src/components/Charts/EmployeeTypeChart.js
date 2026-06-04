import React, { useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetTraineeBasedTypes } from "../../action/Attendance";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

const AttendanceCustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const percentage = Number(data?.percentage || 0);
  
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          sx={{
            color: "#1a2d4d",
            fontWeight: 600,
            marginBottom: "8px",
            fontSize: "12px",
          }}
        >
          {data.type}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            marginBottom: "4px",
          }}
        >
          <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
            Percentage:
          </Typography>
          <Typography
            sx={{
              color: "#1a2d4d",
              fontWeight: 600,
              fontSize: "11px",
            }}
          >
            {percentage.toFixed(2)}%
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            marginBottom: "4px",
          }}
        >
          <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
            Strength:
          </Typography>
          <Typography
            sx={{
              color: "#1a2d4d",
              fontWeight: 600,
              fontSize: "11px",
            }}
          >
            {data.strength}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
          }}
        >
          <Typography sx={{ color: "#64748b", fontSize: "11px" }}>
            Attendance:
          </Typography>
          <Typography
            sx={{
              color: "#1a2d4d",
              fontWeight: 600,
              fontSize: "11px",
            }}
          >
            {data.attendance}
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};
export function EmployeeTypeChart({ employeeTypeData = [] }) {
  const dispatch = useDispatch();
  const traineeTypes = useSelector(
    (state) => state.attendanceCard?.traineeTypes || [],
  );

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
 
  useEffect(() => {
    if (!employeeTypeData || employeeTypeData.length === 0) {
      const today = new Date().toISOString().split("T")[0];
      try {
        dispatch(GetTraineeBasedTypes(today));
      } catch (err) {
        // ignore
      }
    }
  }, [dispatch, employeeTypeData]);

  const sourceData =
    employeeTypeData && employeeTypeData.length > 0
      ? employeeTypeData
      : traineeTypes;
 
  const normalized = sourceData.map((item) => {
    const type =
      item.type ||
      item.TYPE ||
      item.category ||
      item.CATEGORY ||
      item.TYPE_NAME ||
      "Unknown";
    const strength =
      parseInt(
        item.strength ??
          item.STRENGTH ??
          item.count ??
          item.COUNT ??
          item.COUNTY ??
          0,
      ) || 0;
    const attendance =
      parseInt(
        item.attendance ?? item.ATTENDANCE ?? item.ATTEND ?? item.PRESENT ?? 0,
      ) || 0;
    const percentage = strength > 0 ? (attendance / strength) * 100 : 0;
    return { type, strength, attendance, percentage };
  });

  const chartData = normalized;

  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        height: "100%",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: "#1a2d4d",
              marginBottom: "2px",
            }}
          >
            Trainees by Type
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              color: "#64748b",
            }}
          >
            Color indicates attendance health
          </Typography>
        </Box>

        {/* Chart */}
        <Box
          sx={{
            height: { xs: "120px", md: "320px" },
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 0, left: -20, bottom: 5 }}
              barGap={6}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: 10,
                }}
                ticks={[0, 25, 50, 75, 100]}
              />
              <YAxis
                type="category"
                dataKey="type"
                axisLine={false}
                tickLine={false}
                width={isSmall ? 90 : 160}
                tick={({ x, y, payload }) => (
                  <text
                    x={x - 10}
                    y={y + 4}
                    fill="#1a2d4d"
                    fontSize={isSmall ? 11 : 13}
                    fontWeight={500}
                    textAnchor="end"
                  >
                    {String(payload.value)}
                  </text>
                )}
              />
              <Tooltip trigger="click" content={<AttendanceCustomTooltip />} />
              <ReferenceLine
                x={100}
                stroke="#ef4444"
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <Bar dataKey="percentage" barSize={28} radius={[8, 8, 8, 8]}>
                {chartData.map((entry, index) => {
                  const pct = entry.percentage || 0;
                  let color = "#ef4444"; // red
                  if (pct >= 90)
                    color = "#10b981"; // green
                  else if (pct >= 80)
                    color = "#84cc16"; // lime
                  else if (pct >= 70)
                    color = "#f59e0b"; // amber
                  else color = "#ef4444"; // red
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "4px",
            paddingTop: "12px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <Box
            sx={{
              width: "20px",
              height: "0px",
              borderBottom: "2px dashed #ef4444",
            }}
          />
          <Typography sx={{ fontSize: "10px", color: "#64748b" }}>
            Target
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
