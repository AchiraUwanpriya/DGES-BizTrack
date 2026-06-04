import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Avatar } from "@mui/material";
import Email from "../../assets/icons/Email.png";
import SMS from "../../assets/icons/SMS.png";
import Notification from "../../assets/icons/Notification.png";

const NotificationMessage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  if (!item)
    return <Typography variant="h6">No message data found.</Typography>;

  return (
    <Box
      sx={{
        minHeight: "100%",
        width: "100%",
        bgcolor: "#fff",
        px: { xs: 2.5, sm: 4, md: 8 },
        py: 1,
        boxSizing: "border-box",
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}> 
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ textTransform: "none", height: "30px", mb: 3 }}
      >
        Back
      </Button>
      </Box>
      <Box>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            sx={{ width: 35, height: 35, mr: 1.5, mt:-2 }}
            src={item.Type === "EML" ? Notification : Notification}
          />
          <Typography variant="h6" fontWeight="bold">
            {item.Subject}
          </Typography>
        </Box>

        <Typography
          sx={{
            mb: 1,
            wordBreak: "break-word",
            fontSize: "16px",
            
          }}
        >
          <span style={{ fontWeight: "bold" }}>To:</span> {item.Ced_recipients}
        </Typography>

        <Typography
          sx={{
            mb: 1,
            wordBreak: "break-word",
            fontSize: "16px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>CC:</span>{" "}
          {item.Ced_cc || "None"}
        </Typography>
        <Typography
          sx={{
            mb: 1,
            wordBreak: "break-word",
            fontSize: "16px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>BCC:</span>{" "}
          {item.Ced_bcc || "None"}
        </Typography>

        <Typography sx={{ mb: 3, whiteSpace: "pre-line", fontSize: "16px" }}>
          {item.Message}
        </Typography>

        <Box display="flex" justifyContent="flex-end">
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            {item.Created_date}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationMessage;
