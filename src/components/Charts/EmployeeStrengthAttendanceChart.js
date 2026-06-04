import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  alpha,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  LabelList,
} from "recharts";

const COLORS = {
  strength:   "#e07b39",
  attendance: "#4472c4",
  accent:     "#93C5FD",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
   
  const percentage = payload[0]?.payload?.percentage || 0;
  
  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "12px 16px",
        border: "1px solid #BFDBFE",
        minWidth: "190px",
      }}
    >
      <Typography
        sx={{ fontWeight: 700, fontSize: 13, color: "#1E3A8A", mb: 1,
          borderBottom: "1px solid #BFDBFE", pb: 0.8 }}
      >
        {label}
      </Typography>
      {payload.map((entry, i) => (
        <Box key={i} sx={{ display: "flex", justifyContent: "space-between",
          alignItems: "center", mb: 0.6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Box sx={{ width: 9, height: 9, borderRadius: "3px",
              bgcolor: entry.color }} />
            <Typography sx={{ fontSize: 12, color: "#334155" }}>{entry.name}:</Typography>
          </Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#1E3A8A" }}>
            {Number(entry.value || 0).toLocaleString()}
          </Typography>
        </Box>
      ))}
      <Box sx={{ mt: 1, pt: 0.5, borderTop: "1px solid #BFDBFE" }}>
        <Typography sx={{ fontSize: 11, color: "#1E3A8A", fontWeight: 600 }}>
          Attendance Rate: <strong style={{ color: "#004AAD" }}>{percentage}%</strong>
        </Typography>
      </Box>
    </Paper>
  );
};

// ─── Legend ───────────────────────────────────────────────────────────────────
const CustomLegend = () => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2, justifyContent: "center" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
      <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: COLORS.strength }} />
      <Typography sx={{ fontSize: 12, color: "#475569" }}>Actual Strength</Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
      <Box sx={{ width: 12, height: 12, borderRadius: "3px", bgcolor: COLORS.attendance }} />
      <Typography sx={{ fontSize: 12, color: "#475569" }}>Attendance</Typography>
    </Box>
  </Box>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export function EmployeeStrengthAttendanceChart({ allAttendance = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartData = (allAttendance || [])
    .filter((item) => {
      const loc = item?.loc || "";
      return loc && loc !== "Total";
    })
    .map((item) => {
      const strength = parseInt(item?.str || 0);
      const attendance = parseInt(item?.att || 0);
      const percentage = parseInt(item?.pre || 0);
      const location = item?.loc || "";
 
      let type = "";
      switch(location) {
        case 'E':
          type = "Executive";
          break;
        case 'S':
          type = "Supervisory";
          break;
        case 'C':
          type = "Clerical";
          break;
        case 'I':
          type = "Industrial";
          break;
        case 'T':
          type = "Trainee";
          break;
        default:
          type = location;
      }
      
      return {
        type,
        strength,
        attendance,
        percentage,
      };
    });

  const totals = chartData.reduce(
    (acc, d) => ({
      strength: acc.strength + (d.strength || 0),
      attendance: acc.attendance + (d.attendance || 0),
    }),
    { strength: 0, attendance: 0 }
  );
  
  const totalPercentage = totals.strength > 0 
    ? ((totals.attendance / totals.strength) * 100).toFixed()
    : 0;

  const fmtVal = (v) => (v > 0 ? v.toLocaleString() : "");
  
  // REDUCED SPACING: Changed from 80px to 45px per category
  const barHeight = isMobile ? 32 : 38; // Individual bar height
  const categorySpacing = 12; // Spacing between categories
  const chartHeight = chartData.length * (barHeight + categorySpacing) + 40;
  
  const YAXIS_W = isMobile ? 85 : 100;
  
  // Dynamic bar size based on available space
  const barSize = isMobile ? 16 : 20;

  if (!chartData || chartData.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#F8FAFF",
          borderRadius: "20px",
          padding: "24px",
          border: "1px solid #BFDBFE",
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "#64748B" }}>
          No attendance data available
        </Typography>
      </Paper>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          backgroundColor: "#F8FAFF",
          borderRadius: "20px",
          padding: { xs: "16px", sm: "20px", md: "24px" },
          border: "1px solid #BFDBFE",
          boxShadow: "0 4px 24px rgba(37,99,235,0.07)",
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{
            fontSize: { xs: "17px", sm: "19px", md: "21px" },
            fontWeight: 700, 
            color: "#1E3A8A", 
            letterSpacing: "-0.01em",
            mb: 1
          }}>
            Employee Strength & Attendance Overview
          </Typography>
        </Box>

        {/* Chart */}
        <Box sx={{ width: "100%", height: chartHeight, minHeight: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: isMobile ? 20 : 100, left: 0, bottom: 10 }}
              barCategoryGap={categorySpacing} // Reduced from 15% to fixed pixel value
              barGap={2} // Reduced gap between bars in same category
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#DBEAFE" horizontal={false} vertical={true} /> 
              <YAxis
                type="category"
                dataKey="type"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#1E3A8A", fontSize: isMobile ? 12 : 13, fontWeight: 600 }}
                width={YAXIS_W}
                interval={0}
              />

              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: isMobile ? 10 : 11 }}
                tickFormatter={(v) => v.toLocaleString()}
              />

              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: alpha("#0b0c0c", 0.05) }} />

              <Bar 
                dataKey="strength" 
                name="Strength"
                fill={COLORS.strength} 
                radius={[0, 5, 5, 0]} 
                barSize={barSize}
              >
                <LabelList 
                  dataKey="strength" 
                  position="right" 
                  formatter={fmtVal}
                  style={{ fill: "#0f0f0f", fontSize: isMobile ? 10 : 11, fontWeight: 600 }} 
                />
              </Bar> 
              <Bar 
                dataKey="attendance" 
                name="Attendance"
                fill={COLORS.attendance} 
                radius={[0, 5, 5, 0]} 
                barSize={barSize}
              >
                <LabelList 
                  dataKey="attendance" 
                  position="right" 
                  formatter={fmtVal}
                  style={{ fill: "#0f0f0f", fontSize: isMobile ? 10 : 11, fontWeight: 600 }} 
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <CustomLegend />

        {/* Footer with percentages */}
        {/* <Box sx={{
          display: "flex", 
          flexWrap: "wrap", 
          gap: 2, 
          mt: 3, 
          pt: 2,
          borderTop: "1px solid #BFDBFE",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          
            <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center" }}>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box sx={{ width: 9, height: 9, borderRadius: "3px", bgcolor: COLORS.strength }} />
                <Typography variant="caption" sx={{ color: "#475569" }}>
                  Total Strength:{" "}
                  <strong style={{ color: "#1E3A8A" }}>
                    {totals.strength.toLocaleString()}
                  </strong>
                </Typography>
              </Box>

              
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box sx={{ width: 9, height: 9, borderRadius: "3px", bgcolor: COLORS.attendance }} />
                <Typography variant="caption" sx={{ color: "#475569" }}>
                  Total Attendance:{" "}
                  <strong style={{ color: "#1E3A8A" }}>
                    {totals.attendance.toLocaleString()}
                  </strong>
                </Typography>
              </Box>
            </Box>

           
            <Typography variant="caption" sx={{ color: "#475569", textAlign: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Box sx={{ width: 9, height: 9, borderRadius: "3px", bgcolor: "#dd1b1b" }} />
                Percentage:{" "}
                <strong style={{ color: "#1E3A8A" }}>
                  {totalPercentage}%
                </strong>
              </Box>
            </Typography>
          </Box>
        </Box> */}
      </Paper>
    </motion.div>
  );
}