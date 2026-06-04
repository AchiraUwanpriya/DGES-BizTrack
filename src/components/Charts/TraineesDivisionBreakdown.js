import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Users, Briefcase } from "lucide-react";

const getAttendanceColor = (percentage) => {
  const numPercentage = parseFloat(percentage) || 0;
  if (numPercentage >= 90) return "#10b981"; // Green for good
  if (numPercentage >= 80) return "#f59e0b"; // Orange for average
  return "#ef4444"; // Red for poor
};

export function TraineesDivisionBreakdown({ traineeDivisionData }) {
  const [selectedCategory, setSelectedCategory] = useState("industrial");

  // Filter out divisions with no data for the selected category
  const filteredData = useMemo(() => {
    if (!traineeDivisionData || !Array.isArray(traineeDivisionData)) {
      return [];
    }

    return traineeDivisionData.filter((division) => {
      if (selectedCategory === "clerical") {
        return parseInt(division.STRENGTH_CLERICAL) > 0;
      } else {
        return parseInt(division.STRENGTH_INDUSTRIAL) > 0;
      }
    });
  }, [traineeDivisionData, selectedCategory]);

  if (
    !traineeDivisionData ||
    !Array.isArray(traineeDivisionData) ||
    traineeDivisionData.length === 0
  ) {
    return null;
  }

  const calculateStats = () => {
    let totalStrength = 0;
    let totalAttendance = 0;

    traineeDivisionData.forEach((division) => {
      if (selectedCategory === "clerical") {
        totalStrength += Math.max(0, parseInt(division.STRENGTH_CLERICAL) || 0);
        totalAttendance += Math.max(0, parseInt(division.ATTENDANCE_CLERICAL) || 0);
      } else if (selectedCategory === "industrial") {
        totalStrength += Math.max(0, parseInt(division.STRENGTH_INDUSTRIAL) || 0);
        totalAttendance += Math.max(0, parseInt(division.ATTENDANCE_INDUSTRIAL) || 0);
      }
    });

    const rate =
      totalStrength > 0
        ? Math.round((totalAttendance / totalStrength) * 100)
        : 0;
    return { totalStrength, totalAttendance, rate };
  };

  const stats = calculateStats();

  const getTableData = () => {
    return traineeDivisionData
      .map((division) => {
        let strength = 0;
        let attendance = 0;
        let percentage = 0;

        if (selectedCategory === "clerical") {
          strength = Math.max(0, parseInt(division.STRENGTH_CLERICAL) || 0);
          attendance = Math.max(0, parseInt(division.ATTENDANCE_CLERICAL) || 0);
          percentage = parseFloat(division.PERCENTAGE_CLERICAL) || 0;
        } else if (selectedCategory === "industrial") {
          strength = Math.max(0, parseInt(division.STRENGTH_INDUSTRIAL) || 0);
          attendance = Math.max(0, parseInt(division.ATTENDANCE_INDUSTRIAL) || 0);
          percentage = parseFloat(division.PERCENTAGE_INDUSTRIAL) || 0;
        }

        return {
          division: division?.V_DIVNAME || "Unknown",
          divisionCode: division?.HLD_DIV_CODE || "",
          strength,
          attendance,
          rate: percentage.toFixed(2),
        };
      })
      .filter((item) => item.strength > 0); // Only show divisions with strength
  };

  const tableData = getTableData();

  const categories = [
    { key: "industrial", label: "Industrial Trainees", icon: "🔧" },
    { key: "clerical", label: "Clerical Trainees", icon: "📋" },
  ];

  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.3s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
          marginBottom: "50px",
        }}
      >
        {/* Header */}
        <Box sx={{ marginBottom: "24px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px",
            }}
          >
            <Briefcase size={20} color="#1a2d4d" />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a2d4d",
              }}
            >
              Trainees Based on Division 
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            View trainee attendance by division and category
          </Typography>
        </Box>

        {/* Category Filter Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              sx={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "none",
                border: "1px solid #e5e7eb",
                backgroundColor:
                  selectedCategory === category.key ? "#dbeafe" : "#f3f4f6",
                color:
                  selectedCategory === category.key ? "#3b82f6" : "#6b7280",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === category.key ? "#dbeafe" : "#e5e7eb",
                },
              }}
            >
               {category.label}
            </Button>
          ))}
        </Box>

        {/* Summary Stats */}
        <Box
          sx={{
            display: "flex",
            gap: "60px",
            marginBottom: "24px",
            paddingBottom: "24px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
              }}
            >
              Total Strength
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1a2d4d",
              }}
            >
              {stats.totalStrength}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
              }}
            >
              Total Attendance
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#1a2d4d",
              }}
            >
              {stats.totalAttendance}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
              }}
            >
              Attendance Rate
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: getAttendanceColor(stats.rate),
              }}
            >
              {stats.rate}%
            </Typography>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f5f9",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#cbd5e1",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#94a3b8",
              },
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "10px",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  Division 
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "10px",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  Strength
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "10px",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 16px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  Attendance
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "10px",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 10px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  Rate (%)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      fontSize: "11px",
                      color: "#64748b",
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                    }}
                  >
                    {row.divisionCode}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#1a2d4d",
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                    }}
                  >
                    {row.strength}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#1a2d4d",
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                    }}
                  >
                    {row.attendance}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 700,
                      fontSize: "12px",
                      color: getAttendanceColor(row.rate),
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                    }}
                  >
                    {row.rate}%
                  </TableCell>
                </TableRow>
              ))}
              {tableData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{
                      padding: "32px",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    No data available for the selected category
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

         
      </Box>
    </Box>
  );
}