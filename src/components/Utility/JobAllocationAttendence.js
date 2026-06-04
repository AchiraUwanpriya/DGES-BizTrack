import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  CircularProgress,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import dayjs from "dayjs";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      paper: "#fff",
    },
    grey: {
      100: "#f5f5f5",
      700: "#333333",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    body2: {
      fontSize: "0.875rem",
    },
  },
});

const JobAllocationAttendence = ({ onClose, selectedDate }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `JobAllocation/GetAttendance?P_DATE=${selectedDate}`
        );

        if (response.data?.StatusCode === 200) {
          setAttendanceData(response.data.ResultSet || []);
        } else {
          setAttendanceData([]);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      fetchAttendance();
    }
  }, [selectedDate]);

  return (
    <ThemeProvider theme={customTheme}>
      <Modal open={true} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            width: "100%",
            height: "90%",
            // maxWidth: 600,
            // maxHeight: "90vh",
            overflow: "auto",
            pt: 5,
            pl: 1,
            pr: 1,
            pb: 1,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
              mt: -1,
              mr: -0.5,
            }}
          >
            <CloseIcon />
          </IconButton>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ maxHeight: "85vh", overflow: "auto" }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    {["Barcode No", "Name", "In Time", "Out Time"].map(
                      (text, i) => (
                        <TableCell
                          key={i}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "11px",
                            padding: "4px 8px",    
                            lineHeight: 2,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {text}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No attendance records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    attendanceData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ backgroundColor: "grey.100" }}
                      >
                        <TableCell sx={{ color: "grey.700" }}>
                          <Typography sx={{ fontSize: 12 }}>
                            {row.BarCodeNo}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ color: "grey.700" }}>
                          <Typography sx={{ fontSize: 12 }}>
                            {row.Name}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ color: "grey.700" }}>
                          <Typography sx={{ fontSize: 12 }}>
                            {row.InTime
                              ? dayjs(row.InTime).format("HH:mm")
                              : ""}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ color: "grey.700" }}>
                          <Typography sx={{ fontSize: 12 }}>
                            {row.OutTime
                              ? dayjs(row.OutTime).format("HH:mm")
                              : ""}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default JobAllocationAttendence;
