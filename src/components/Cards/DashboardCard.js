import React from "react";
import { Card, CardContent, Box, Typography, Grid } from "@mui/material";
import "./DashboardCard.css";

const DashboardCard = ({ icon: Icon, title, value, percentage, color }) => {
  return (
    <Card
      sx={{
        margin: 1,
        minWidth: 280,
        backgroundColor: "#1a2a4a",
        color: "white",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 50,
              height: 50,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: color || "#4CAF50",
            }}
          >
            {Icon && <Icon sx={{ fontSize: 28 }} />}
          </Box>
          {percentage && (
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: color || "#4CAF50",
              }}
            >
              {percentage}
            </Typography>
          )}
        </Box>

        <Typography
          sx={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 1,
            letterSpacing: "-0.5px",
          }}
        >
          {value || "0"}
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            opacity: 0.8,
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>

        {percentage && (
          <Typography
            sx={{
              fontSize: 12,
              marginTop: 1,
              opacity: 0.6,
            }}
          >
            of total
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
