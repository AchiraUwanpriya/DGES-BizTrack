import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const QuickAccessCard = ({
  icon: Icon,
  label,
  route,
  delay = 0,
  color = "#004AAD",
  backgroundColor = "#f3f4f6",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 12px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        cursor: route ? "pointer" : "default",
        transition: "all 0.3s ease",
        animation: `slideUp 0.5s ease-out ${delay * 0.1}s backwards`,
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-4px)",
          borderColor: "#d1d5db",
        },
        "@keyframes slideUp": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      {Icon && (
        <Box
          sx={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            backgroundColor: backgroundColor,
            marginBottom: "8px",
            color: color,
            transition: "all 0.3s ease",
          }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </Box>
      )}
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 500,
          color: "#1f2937",
          textAlign: "center",
          marginTop: "4px",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default QuickAccessCard;
