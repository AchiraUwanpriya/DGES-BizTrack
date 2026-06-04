import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TJobModel from "../Utility/TJobModel";
import EWOUpdateModal from "../Utility/EWOUpdateModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "8px 8px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    wordWrap: "break-word",
    whiteSpace: "normal",
    padding: "8px 8px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor !== "" ? bgcolor : theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function JobCard({
  jobData = [],
  unassignedList,
  selectedDate,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedEditRow, setSelectedEditRow] = useState(null);
  const [temporaryJobData, setTemporaryJobData] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchTemporaryJobs = async () => {
    try {
      const response = await axios.get("JobAllocation/LoadTempJob", {
        params: {
          P_DATE: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
        },
      });
      if (response.data.StatusCode === 200 && response.data.ResultSet) {
        setTemporaryJobData(response.data.ResultSet);
      }
    } catch (error) {
      console.error("Error loading temporary jobs:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) fetchTemporaryJobs();
  }, [selectedDate]);

  const handleRowClick = (row) => {
    navigate("/empdetails", {
      state: {
        EWONO: row.EWONO || row.TEMP_EWONO,
        JOBNO: row.JOBNO || row.TEMP_JOBNO,
        unassignedList,
        selectedDate: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
      },
    });
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleEditClick = (row) => {
    setSelectedEditRow(row);
    setModalEditOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleCloseUpdateModal = () => {
    setModalEditOpen(false);
    setSelectedEditRow(null);
  };

  const handleUpdateEwo = (newEwoNumber) => {
    console.log("Updated EWO Number:", newEwoNumber);
    fetchTemporaryJobs();
  };

  return (
    <Box sx={{ px: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2196F3" }}>
          Assigned Jobs
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

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 260,
          width: "100%",
          overflowX: "auto",
          borderRadius: "8px",
          mb: 4,
        }}
      >
        <Table stickyHeader aria-label="assigned jobs table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                EWO No
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Job No
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                LOC
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobData.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => handleRowClick(row)}
                sx={{
                  backgroundColor: index === 0 ? "lightblue" : "inherit",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <StyledTableCell align="center">{row.EWONO}</StyledTableCell>
                <StyledTableCell align="center">{row.JOBNO}</StyledTableCell>
                <StyledTableCell align="center">{row.LOC}</StyledTableCell>
                <StyledTableCell align="center">{row.STS}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "#2196F3" }}
      >
        Temporary Jobs
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 300,
          width: "100%",
          overflowX: "auto",
          borderRadius: "8px",
        }}
      >
        <Table stickyHeader aria-label="temporary jobs table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{ fontSize: 12, fontWeight: "bold" }}
              >
                TWO No
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontSize: 12, fontWeight: "bold" }}
              >
                Job No
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontSize: 12, fontWeight: "bold" }}
              >
                Specification
              </StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ fontSize: 12, fontWeight: "bold" }}
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temporaryJobData.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => handleRowClick(row)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
              >
                <StyledTableCell align="center">
                  {"T" + row.TEMP_EWONO.toString().padStart(5, "0")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.TEMP_JOBNO}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.TEMP_SPEC}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box display="flex" alignItems="center">
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewClick(row);
                      }}
                      aria-label="view"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(row);
                      }}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TJobModel
        open={modalOpen}
        onClose={handleCloseModal}
        selectedRow={selectedRow}
      />
      <EWOUpdateModal
        open={modalEditOpen}
        onClose={handleCloseUpdateModal}
        ewoNumber={selectedEditRow?.TEMP_EWONO || ""}
        onUpdate={handleUpdateEwo}
      />
    </Box>
  );
}
