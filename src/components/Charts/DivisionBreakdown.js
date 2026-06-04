import React, { useState } from "react";
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
import { Building2 } from "lucide-react";
 
const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return "#10b981";  
  if (percentage >= 80) return "#f59e0b";  
  return "#ef4444";  
};

export function DivisionBreakdown({ divisionData }) {
  const [selectedCategory, setSelectedCategory] = useState("executive");
 
  if (
    !divisionData ||
    !Array.isArray(divisionData) ||
    divisionData.length === 0
  ) {
    return null;  
  }
 
  const calculateStats = () => {
    let totalStrength = 0;
    let totalAttendance = 0;

    divisionData.forEach((division) => {
      const categoryData = division?.categories?.[selectedCategory];
      if (categoryData) {
        totalStrength += Math.max(0, parseInt(categoryData.st) || 0);
        totalAttendance += Math.max(0, parseInt(categoryData.at) || 0);
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
    return divisionData
      .map((division) => {
        const categoryData = division?.categories?.[selectedCategory];
        if (!categoryData) return null;
        return {
          division: division?.division || "Unknown",
          strength: Math.max(0, parseInt(categoryData.st) || 0),
          attendance: Math.max(0, parseInt(categoryData.at) || 0),
          rate: Math.max(0, Math.min(100, parseInt(categoryData.percent) || 0)),
        };
      })
      .filter((item) => item !== null);
  };

  const tableData = getTableData();

  const categories = [
    { key: "executive", label: "Executive", icon: "👔" },
    { key: "supervisory", label: "Supervisory", icon: "👥" },
    { key: "clerical", label: "Clerical", icon: "📋" },
    { key: "industrial", label: "Industrial", icon: "🔧" },
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
            <Building2 size={20} color="#1a2d4d" />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a2d4d",
              }}
            >
              CDL Based ON Division  
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#64748b",
            }}
          >
            Select a sector to view division-level attendance
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
              Strength
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
              Attendance
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
              Rate
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
            overflowX: "auto", 
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
          <Table >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: "10px",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    borderBottom: "1px solid #e5e7eb",
                    padding: "12px 10px",
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
                    padding: "12px 16px",
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
                    padding: "12px 16px",
                  }}
                >
                  Rate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#f9fafb" },
                    backgroundColor:
                      row.division === "DPR"
                        ? "rgba(239, 68, 68, 0.05)"
                        : "transparent",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: "11px",
                      color: row.division === "DPR" ? "#ef4444" : "#1a2d4d",
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {row.division}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      fontSize: "11px",
                      color: "#4b5563",
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                    }}
                  >
                    {row.strength}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 500,
                      fontSize: "11px",
                      color: "#4b5563",
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
                      fontSize: "11px",
                      color: getAttendanceColor(row.rate),
                      borderBottom: "1px solid #e5e7eb",
                      padding: "16px",
                    }}
                  >
                    {row.rate}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
