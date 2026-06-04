import React, { useState } from "react";
import {
  Box,
  Typography,
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

const Time_Endoresement = () => {
  const navigate = useNavigate();
  const [endorsementNumber, setEndorsementNumber] = useState("");
  const [tableData, setTableData] = useState([]);

  // Mock data for the table (replace with API call in real implementation)
  const mockTableData = [
    {
      date: "2025-04-11",
      barcodeNo: "12345",
      name: "John Doe",
      in: "09:00 AM",
      enterGateNo: "Gate 1",
      workOvernight: false,
      out: "05:00 PM",
      exitGateNo: "Gate 1",
      reason: "Forgotten/Failed to bring the Barcode",
    },
    {
      date: "2025-04-11",
      barcodeNo: "67890",
      name: "Jane Smith",
      in: "10:00 AM",
      enterGateNo: "Gate 2",
      workOvernight: true,
      out: "06:00 PM",
      exitGateNo: "Gate 2",
      reason: "Forgotten/Failed to bring the Barcode",
    },
  ];

  // Handle Endorsement Number Input
  const handleEndorsementNumberChange = (e) => {
    setEndorsementNumber(e.target.value);
  };

  // Load Table Data
  const loadTableData = () => {
    if (endorsementNumber) {
      // Simulate loading data (replace with API call)
      setTableData(mockTableData);
    } else {
      // Display SweetAlert if the text box is empty
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter an endorsement number.",
        confirmButtonColor: "#1976d2",
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: "16px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      {/* Add Extra Hours Text and Back Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Add Extra Hours
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none" }}
        >
          Back
        </Button>
      </Box>

      {/* Endorsement Number Input and Load Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Endorsement Number"
          variant="outlined"
          fullWidth
          value={endorsementNumber}
          onChange={handleEndorsementNumberChange}
        />
        <Button variant="contained" onClick={loadTableData}>
          Load
        </Button>
      </Box>

      {/* Table */}
      {tableData.length > 0 && (
        <Table sx={{ backgroundColor: "white", borderRadius: "8px" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,fontSize: "12px",}}>
                Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Barcode No
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,fontSize: "12px",}}>
                In
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Enter GNo
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Work Overnight
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Out
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Exit GNo
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold",fontSize: "12px", }}>
                Reason
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{fontSize: "12px",}}>{row.date}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.barcodeNo}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.name}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.in}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.enterGateNo}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>
                  {row.workOvernight ? "Yes" : "No"} {/* Display 'Yes' or 'No' */}
                </TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.out}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.exitGateNo}</TableCell>
                <TableCell sx={{fontSize: "12px",}}>{row.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Time_Endoresement;
