import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LabelList,
} from "recharts";

export function TraineesOverview({ traineeOverall, traineeByDivision }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmall = isMobile;
  const attendanceChartHeight = isMobile ? 300 : 350;

  const getLeftMargin = () => {
    return isMobile ? 60 : 100;
  };

  const getYAxisWidth = () => {
    return isMobile ? 50 : 80;
  };

  const truncate = (str, length) => {
    if (typeof str !== "string") return str;
    return str.length > length ? str.substring(0, length) + "..." : str;
  };

  const totalTrainees = {
    clerical: 2,
    clerical_att: 0,
    clerical_percent: 0,
    industrial: 143,
    industrial_att: 116,
    industrial_percent: 80,
    total: 145,
    total_att: 116,
    total_percent: 80,
  };

  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.4s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        px: { xs: 0, sm: 0 },
      }}
    >
      {/* Trainees Overview Bar Chart */}
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "16px", sm: "24px" },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          marginBottom: "32px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 600,
              color: "#1a2d4d",
            }}
          >
            Trainees Overview
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Category-wise strength and attendance distribution
          </Typography>
        </Box>

        {/* Chart */}
        <Box
          sx={{
            height: { xs: "300px", sm: "320px" },
            width: "100%",
            marginBottom: "24px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={traineeOverall}
              margin={{
                top: 20,
                right: { xs: 5, sm: 30 },
                left: { xs: 0, sm: 0 },
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient
                  id="colorAttendance"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: { xs: 9, sm: 12 },
                  angle: isSmall ? -30 : 0,
                  textAnchor: isSmall ? "end" : "middle",
                  dy: isSmall ? 5 : 0,
                  dx: isSmall ? -2 : 0,
                }}
                height={isSmall ? 50 : 30}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: { xs: 9, sm: 11 },
                }}
                width={isSmall ? 25 : 40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  fontSize: isSmall ? "12px" : "14px",
                }}
                labelStyle={{ color: "#1a2d4d" }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: isSmall ? "10px" : "12px",
                  paddingTop: isSmall ? "10px" : "0",
                }}
                iconSize={isSmall ? 10 : 14}
                verticalAlign={isSmall ? "bottom" : "top"}
                height={isSmall ? 40 : 30}
              />
              <Bar
                dataKey="strength"
                fill="url(#colorStrength)"
                radius={[8, 8, 0, 0]}
                barSize={isSmall ? 30 : 30}
              />
              <Bar
                dataKey="attendance"
                fill="url(#colorAttendance)"
                radius={[8, 8, 0, 0]}
                barSize={isSmall ? 30 : 30}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: { xs: "8px", sm: "16px" },
            padding: { xs: "12px", sm: "16px" },
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              Total Trainees
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px" },
                fontWeight: 700,
                color: "#1a2d4d",
              }}
            >
              {totalTrainees.total}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              Present Today
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px" },
                fontWeight: 700,
                color: "#10b981",
              }}
            >
              {totalTrainees.total_att}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: "#94a3b8",
                marginBottom: "4px",
              }}
            >
              Attendance Rate
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px" },
                fontWeight: 700,
                color: "#3b82f6",
              }}
            >
              {totalTrainees.total_percent}%
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "10px", sm: "11px" },
            color: "#94a3b8",
            fontStyle: "italic",
          }}
        >
          * This includes CDL Consultant, CDL Permanent, CDL Contract, CDL
          Trainee and Trainee Facility
        </Typography>
      </Box>

      {/* Trainees by Division Chart */}
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "16px", sm: "24px" },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          marginBottom: "32px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 600,
              color: "#1a2d4d",
            }}
          >
            Trainees by Division
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Attendance distribution across divisions
          </Typography>
        </Box>

        {/* Chart */}
        <Box
          sx={{
            height: isMobile ? "520px" : "384px",
            width: "100%",
            marginBottom: "16px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            {isMobile ? (
              <BarChart
                data={traineeByDivision}
                layout="vertical"
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                barCategoryGap="20%"
                barGap={6}
              >
                <defs>
                  <linearGradient
                    id="divisonClerical"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient
                    id="divisonClericalAtt"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient
                    id="divisionIndustrial"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient
                    id="divisionIndustrialAtt"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.08)"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  dataKey="division"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={120}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#1a2d4d" }}
                />
                <Legend verticalAlign="bottom" align="center" />
                <Bar
                  dataKey="clerical_attendance"
                  fill="url(#divisonClericalAtt)"
                  name="Clerical (Attended)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="clerical_strength"
                  fill="url(#divisonClerical)"
                  name="Clerical (Strength)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="industrial_attendance"
                  fill="url(#divisionIndustrialAtt)"
                  name="Industrial (Attended)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="industrial_strength"
                  fill="url(#divisionIndustrial)"
                  name="Industrial (Strength)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            ) : (
              <BarChart
                data={traineeByDivision}
                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
              >
                <defs>
                  <linearGradient
                    id="divisonClerical"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient
                    id="divisonClericalAtt"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient
                    id="divisionIndustrial"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient
                    id="divisionIndustrialAtt"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,0,0,0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="division"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  labelStyle={{ color: "#1a2d4d" }}
                />
                <Legend />
                <Bar
                  dataKey="clerical_strength"
                  fill="url(#divisonClerical)"
                  name="Clerical (Strength)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="clerical_attendance"
                  fill="url(#divisonClericalAtt)"
                  name="Clerical (Attended)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="industrial_strength"
                  fill="url(#divisionIndustrial)"
                  name="Industrial (Strength)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="industrial_attendance"
                  fill="url(#divisionIndustrialAtt)"
                  name="Industrial (Attended)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: "10px", sm: "11px" },
            color: "#94a3b8",
            fontStyle: "italic",
          }}
        >
          * This Includes Other Trainees (NAITA)
        </Typography>
      </Box>

      {/* Trainee Attendance Rate Chart */}
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: { xs: "16px", sm: "24px" },
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 600,
              color: "#1a2d4d",
            }}
          >
            Trainee Attendance Rate by Division
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "11px", sm: "12px" },
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            Percentage attendance across divisions
          </Typography>
        </Box>

        {/* Chart */}
        <Box sx={{ height: attendanceChartHeight, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={traineeByDivision}
              margin={{
                top: 20,
                right: isSmall ? 25 : 30,
                left: getLeftMargin(),
                bottom: isSmall ? 60 : 20,
              }}
            >
              <defs>
                <linearGradient id="linePercent" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.08)"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#94a3b8",
                  fontSize: isSmall ? 9 : 11,
                }}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="division"
                axisLine={false}
                tickLine={false}
                width={getYAxisWidth()}
                tick={({ x, y, payload }) => {
                  const label = truncate(payload.value, isSmall ? 6 : 24);
                  return (
                    <text
                      x={x - 2}
                      y={y + 4}
                      fill="#94a3b8"
                      fontSize={isSmall ? 9 : 11}
                      textAnchor="end"
                    >
                      {label}
                    </text>
                  );
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  fontSize: isSmall ? "12px" : "14px",
                }}
                formatter={(value) => [`${value}%`, "Attendance Rate"]}
                labelStyle={{ color: "#1a2d4d" }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: isSmall ? "11px" : "12px",
                  paddingTop: "10px",
                }}
                iconSize={isSmall ? 10 : 12}
                verticalAlign={isSmall ? "bottom" : "top"}
                height={isSmall ? 30 : 20}
              />
              <Bar
                dataKey="total_percent"
                fill="url(#linePercent)"
                name="Attendance Rate"
                radius={[8, 8, 0, 0]}
                barSize={isSmall ? 20 : 16}
              >
                {isSmall ? (
                  <LabelList
                    dataKey="total_percent"
                    formatter={(v) => `${v}%`}
                    position="right"
                    style={{ fill: "#1a2d4d", fontSize: 9, fontWeight: 500 }}
                  />
                ) : (
                  <LabelList
                    dataKey="total_percent"
                    formatter={(v) => `${v}%`}
                    position="right"
                    style={{ fill: "#1a2d4d", fontSize: 11 }}
                  />
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
