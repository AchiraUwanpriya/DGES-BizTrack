import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function LeaveApp({ message = "No leave records found" }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
            Leave Details
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", height: "40px" }}
          >
            Back
          </Button>
        </Box>

        {/* NOT Found Alert */}
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <img src={require("../../assets/icons/404-error.png")} alt="No data" style={{ maxWidth: "200px" }} />
          <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default LeaveApp;
