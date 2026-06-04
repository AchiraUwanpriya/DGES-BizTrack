import React from "react";
import { Box, Typography } from "@mui/material";
import QuickAccessCard from "./QuickAccessCard";
import {
  User,
  Phone,
  ShoppingBag,
  CheckSquare,
  Building2,
  Calendar,
  Users,
  Image,
} from "lucide-react";

const QuickAccessSection = () => {
  const quickAccessItems = [
    {
      icon: User,
      label: "Personal",
      route: "/personal",
      color: "#0ea5e9",
      backgroundColor: "#cffafe",
    },
    {
      icon: Phone,
      label: "Telephone",
      route: "/telephone",
      color: "#10b981",
      backgroundColor: "#d1fae5",
    },
    {
      icon: ShoppingBag,
      label: "Sahanasala",
      route: "/budget-shop",
      color: "#f59e0b",
      backgroundColor: "#fef3c7",
    },
    {
      icon: CheckSquare,
      label: "Approvals",
      route: "/approvals",
      color: "#8b5cf6",
      backgroundColor: "#ede9fe",
    },
    {
      icon: Building2,
      label: "Job Allocation",
      route: "/job-allocation",
      color: "#3b82f6",
      backgroundColor: "#dbeafe",
    },
    {
      icon: Calendar,
      label: "NEHB Reservation",
      route: "/reservations",
      color: "#ec4899",
      backgroundColor: "#fce7f3",
    },
    {
      icon: Users,
      label: "Remote Attendance",
      route: "/attendance",
      color: "#6366f1",
      backgroundColor: "#e0e7ff",
    },
    {
      icon: Image,
      label: "Gallery",
      route: "/gallery",
      color: "#ef4444",
      backgroundColor: "#fee2e2",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "32px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#1f2937",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        Quick Access
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: "16px",
        }}
      >
        {quickAccessItems.map((item, index) => (
          <QuickAccessCard
            key={index}
            icon={item.icon}
            label={item.label}
            route={item.route}
            delay={index}
            color={item.color}
            backgroundColor={item.backgroundColor}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuickAccessSection;
