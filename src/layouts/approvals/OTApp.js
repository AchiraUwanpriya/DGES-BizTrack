import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function OTApp() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [otData, setOtData] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `Approvals/GetOTDetails?P_YEAR=${currentYear}`
        );
        if (response.data.ResultSet) {
          setOtData(response.data.ResultSet);
        }
      } catch (error) {
        console.error("Error fetching OT data:", error);
      }
    };

    fetchData();
  }, [currentYear]);

  const getRowId = (row) => `${row.OTServiceNo}_${row.OTDate}`;

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const allIds = otData.map(getRowId);
    setSelectedRows(selectedRows.length === otData.length ? [] : allIds);
  };

  // const handleApproval = () => {
  //   if (selectedRows.length === 0) {
  //     Swal.fire("No Selection", "Please select at least one row.", "warning");
  //     return;
  //   }

  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to approve the selected records?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Approve",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         for (const row of otData) {
  //           const rowId = getRowId(row);
  //           if (selectedRows.includes(rowId)) {
  //             const apiUrl = `Approvals/SaveOTDetails?P_DATE=${row.OTDate}&P_BARCODE_CARDNO=${row.OTBarcodeNo}&p_eservice_no=${row.OTServiceNo}`;
  //             await axios.post(apiUrl);
  //           }
  //         }
  //         Swal.fire(
  //           "Approved!",
  //           "Selected records have been approved.",
  //           "success"
  //         );
  //         setSelectedRows([]);
  //       } catch (error) {
  //         console.error("Error approving records:", error);
  //         Swal.fire("Error", "Failed to approve records.", "error");
  //       }
  //     }
  //   });
  // };

  const handleApproval = () => {
    if (selectedRows.length === 0) {
      Swal.fire("No Selection", "Please select at least one row.", "warning");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve the selected records?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const row of otData) {
            const logid = localStorage.getItem("logId");
            const rowId = getRowId(row);
            if (selectedRows.includes(rowId)) {
              const apiUrl = `Approvals/SaveOTDetails?P_LOGID=${logid}&P_DATE=${row.OTDate}&P_BARCODE_CARDNO=${row.OTBarcodeNo}&P_ESERVICE_NO=${row.OTServiceNo}`;
              await axios.post(apiUrl);
            }
          }
          Swal.fire(
            "Approved!",
            "Selected records have been approved.",
            "success"
          ).then(() => {
            window.location.reload(); 
          });
          setSelectedRows([]);
        } catch (error) {
          console.error("Error approving records:", error);
          Swal.fire("Error", "Failed to approve records.", "error");
        }
      }
    });
  };

  const handleCancel = () => {
    setSelectedRows([]);
    console.log("Selection Cancelled");
  };
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 1,mt:1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
            Overtime Approval
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
      </Box>
      <Table size="small" sx={{ width: "100%", tableLayout: "fixed" ,mt:1}}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "white",
                textAlign: "left",
                width: "50px",
              }}
            >
              Select
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "white",
                textAlign: "left",
                width: "50px",
              }}
            >
              Service No
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "white",
                textAlign: "center",
                width: "80px",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "white",
                textAlign: "center",
                width: "50px",
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "white",
                textAlign: "center",
                width: "50px",
              }}
            >
              Extra Hours
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "white",
                textAlign: "center",
                width: "50px",
              }}
            >
              Bar. No
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otData.map((row) => {
            const rowId = getRowId(row);
            return (
              <TableRow key={rowId}>
                <TableCell sx={{ textAlign: "center", padding: "8px" }}>
                  <Checkbox
                    checked={selectedRows.includes(rowId)}
                    onChange={() => handleCheckboxChange(rowId)}
                    color="primary"
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.OTServiceNo}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px" ,fontSize: "12px"}}>
                  {row.OTName}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.OTDate ? row.OTDate.split(" ")[0] : ""}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.OTEXHours}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.OTBarcodeNo}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleSelectAll}>
          Select All
        </Button>
        <Button variant="contained" color="success" onClick={handleApproval}>
          Approval
        </Button>
        <Button variant="contained" color="warning">
          View
        </Button>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default OTApp;