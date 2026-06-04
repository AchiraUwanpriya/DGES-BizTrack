import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const Extra_Hours = () => {
  const navigate = useNavigate();
  const [eveningHours, setEveningHours] = useState(""); // State for Evening Hours

  // Sample data for the table
  const tableData = [
    { Task: "Task 1", Description: "Description for Task 1" },
    { Task: "Task 2", Description: "Description for Task 2" },
    { Task: "Task 3", Description: "Description for Task 3" },
  ];

  // Handle Save Button Click
  const handleSave = () => {
    if (!eveningHours) {
      // Show error alert if Evening Hours is empty
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter the evening hours before saving!",
      });
      return;
    }

    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the extra hours?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5ac8fa",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Save logic here
        Swal.fire("Saved!", "Your extra hours have been saved.", "success");
      }
    });
  };

  return (
    <Box
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "64px",
      }}
    >
      {/* Header and Back Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mr: 2,
        }}
      >
        {/* Add Extra Hours Text */}
        <Typography variant="h6" sx={{ fontWeight: "bold", marginLeft: 2 }}>
          Add Extra Hours
        </Typography>

        {/* Back Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
      </Box>

      {/* Schedule Dropdown */}
      <FormControl fullWidth sx={{ marginTop: "16px" }}>
        <InputLabel>Schedule</InputLabel>
        <Select label="Schedule" defaultValue="Evening">
          <MenuItem value="Evening">Evening</MenuItem>
          <MenuItem value="Morning">Morning</MenuItem>
          <MenuItem value="Night">Night</MenuItem>
        </Select>
      </FormControl>

      {/* Extra Hours Input */}
      <TextField
        fullWidth
        label="Evening Hours"
        type="number"
        value={eveningHours}
        onChange={(e) => setEveningHours(e.target.value)}
        sx={{ marginTop: "16px" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        {/* Continue Until Next Day Checkbox */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
          <Typography variant="body2" component="span">
            Continue until next day
          </Typography>
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#5ac8fa",
            "&:hover": { backgroundColor: "#4ab7e9" },
            marginRight: "16px",
          }}
        >
          Save
        </Button>
      </Box>

      {/* Total Extra Hours Text and Text Box */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body2"
          component="span"
          sx={{ marginRight: "8px" }}
        >
          Total Extra Hours :
        </Typography>
        <TextField
          size="small"
          value="12" // Set the value to 12
          disabled // Disable the TextField
          sx={{ width: "100px", marginTop: "16px" }}
        />
      </Box>

      {/* Table */}
      <Box sx={{ marginTop: "24px" }}>
        <Table
          size="small"
          sx={{ width: "100%", tableLayout: "fixed", marginBottom: "16px" }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  
                }}
              >
                Task
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  
                }}
              >
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{fontSize: "12px",}}>{row.Task}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.Description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Extra_Hours;
