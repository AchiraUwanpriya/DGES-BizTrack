import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, IconButton, Typography, Button, Paper } from "@mui/material";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const MAP_URL = "https://gps.trackmycar.lk/index.php?au=17D49774E905C0B2484BCD68401BCA34&m=true";

function VehicalTracking() {
  const navigate = useNavigate();

  const handleOpenMap = () => {
    window.open(MAP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        backgroundColor: "#f1f5f9",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 1.5,
          py: 0.8,
          backgroundColor: "#fff",
          borderBottom: "1px solid #e0e7ef",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          size="small"
          sx={{ color: "#004AAD", mr: 0.5 }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <Typography
          variant="subtitle1"
          fontWeight={700}
          sx={{ color: "#004AAD", fontSize: 15, letterSpacing: 0.2 }}
        >
          Vehicle Tracker
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 5,
            borderRadius: 4,
            maxWidth: 400,
            textAlign: "center",
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "#f0f7ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <MapRoundedIcon sx={{ fontSize: 40, color: "#004AAD" }} />
          </Box>
          
          <Typography variant="h5" fontWeight={700} sx={{ color: "#1e293b", mb: 1.5 }}>
            Live GPS Tracking
          </Typography>
          
          <Typography variant="body1" sx={{ color: "#64748b", mb: 4, lineHeight: 1.6 }}>
            For optimal security and performance, the live map tracking dashboard opens in a separate secure window. You will be logged in automatically.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleOpenMap}
            endIcon={<OpenInNewRoundedIcon />}
            sx={{
              backgroundColor: "#004AAD",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: "none",
              fontSize: "1rem",
              boxShadow: "0 4px 14px 0 rgba(0, 74, 173, 0.39)",
              "&:hover": {
                backgroundColor: "#003d94",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 20px rgba(0, 74, 173, 0.23)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Open Live Map
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default VehicalTracking;