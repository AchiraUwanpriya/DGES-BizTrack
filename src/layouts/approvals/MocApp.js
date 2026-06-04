import React, { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MocModal from "../../components/Utility/Approvals/MocModal";

function MocApp() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const mocData = [
    {
      id: "4353545",
      jobNo: "NC/0209",
      status: "Stand By",
      startDate: "2025-01-03",
      endDate: "2025-01-04",
    },
    {
      id: "888883",
      jobNo: "NC/0210",
      status: "In Progress",
      startDate: "2025-01-05",
      endDate: "2025-01-06",
    },
    {
      id: "777775",
      jobNo: "NC/0211",
      status: "Completed",
      startDate: "2025-01-07",
      endDate: "2025-01-08",
    },
    {
      id: "999996",
      jobNo: "NC/0209",
      status: "Stand By",
      startDate: "2025-01-03",
      endDate: "2025-01-04",
    },
    {
      id: "888886",
      jobNo: "NC/0210",
      status: "In Progress",
      startDate: "2025-01-05",
      endDate: "2025-01-06",
    },
    {
      id: "7777788",
      jobNo: "NC/0211",
      status: "Completed",
      startDate: "2025-01-07",
      endDate: "2025-01-08",
    },
    {
      id: "999999",
      jobNo: "NC/0209",
      status: "Stand By",
      startDate: "2025-01-03",
      endDate: "2025-01-04",
    },
    {
      id: "888888",
      jobNo: "NC/0210",
      status: "In Progress",
      startDate: "2025-01-05",
      endDate: "2025-01-06",
    },
    {
      id: "777788",
      jobNo: "NC/0211",
      status: "Completed",
      startDate: "2025-01-07",
      endDate: "2025-01-08",
    },
  ];
  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenModal(false);
  };

  const handleStatusUpdate = (newStatus) => {
    setSelectedRow({ ...selectedRow, status: newStatus });
  };

  const handleSaveStatus = () => {
    console.log("Updated MOC Row:", selectedRow);
    setOpenModal(false);
  };
  return (
    <div>
      <Box sx={{ mt: 2, maxWidth: "95%", mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
            MOC Details
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
        <Box sx={{ mt: 2 }}>
          <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  MOC No
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  Job No
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  End Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    color: "white",
                    textAlign: "center",
                    padding: "8px",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mocData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                    {row.id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                    {row.jobNo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                    {row.status}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px"}}>
                    {row.startDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                    {row.endDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px" ,fontSize: "12px"}}>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: "#5ac8fa",
                        "&:hover": { backgroundColor: "#5ac8fa" },
                        color: "white",
                        borderColor: "#5ac8fa",
                        padding: "4px",
                        minWidth: "auto",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleOpenModal(row)}
                    >
                      <Visibility sx={{ fontSize: "16px" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <MocModal
          open={openModal}
          row={selectedRow}
          appName="MOC"
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
          onSave={handleSaveStatus}
        />
      </Box>
    </div>
  );
}

export default MocApp;
