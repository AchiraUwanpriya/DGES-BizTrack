import React, { useState, useEffect } from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import UmrModal from "../../components/Utility/Approvals/UmrModal";
import axios from "axios";
import dayjs from "dayjs";

function UmrApp() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [umrData, setUmrData] = useState([]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    const fetchUMRDetails = async () => {
      try {
        const response = await axios.get(
          `Approvals/GetUMRDetails?P_YEAR=${year}`
        );
        const resultSet = response.data.ResultSet;
        if (resultSet) {
          const formattedData = resultSet.map((item) => ({
            id: item.UMRRequestNo,
            serviceno: item.UMRPreparedBy,
            startDate: item.UMRPDate,
            jobNo: `${item.UMRCat}-${item.UMRJmain}-${item.UMRSub}`,
            specification: item.UMRSpec,
            extc: item.UMRExtc,
            name: item.UMRPreparedByName,
            iwoNo: item.UMRIWoNo,
            sts: item.UMRStatus,
          }));
          setUmrData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching UMR data", error);
      }
    };

    fetchUMRDetails();
  }, [year]);

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
    console.log("Updated UMR Row:", selectedRow);
    setOpenModal(false);
  };

  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: "800px", mt:1, padding: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <FormControl sx={{ marginBottom: 2, width: "150px" }}>
            <InputLabel>Year</InputLabel>
            <Select
              value={year}
              onChange={handleChangeYear}
              label="Year"
              sx={{
                height: "32px",
                fontSize: "12px",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    overflowY: "auto",
                  },
                },
              }}
            >
              {Array.from({ length: 10 }, (_, index) => {
                    const currentYear = new Date().getFullYear();
                    const y = currentYear - index;
              
                    return (
                      <MenuItem
                        key={y}
                        value={y}
                        sx={{ fontSize: "12px", height: "28px" }}
                      >
                        {y}
                      </MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
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
      <Box sx={{ mt: 1, maxWidth: "95%", mx: "auto" }}>
        <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
          UMR Details
        </Typography>

        <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                height: "30px",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "40px",
                  textAlign: "center",
                }}
              >
                UMR No
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "50px",
                  textAlign: "center",
                }}
              >
                Date
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "60px",
                  textAlign: "left",
                }}
              >
                Service No
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "35px",
                }}
              >
                Job No
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "50px",
                }}
              >
                SPEC
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "30px",
                }}
              >
                EXTC
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "12px",
                  color: "white",
                  padding: "3px",
                  width: "40px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {umrData.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.id}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.startDate}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.serviceno}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.jobNo}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.specification}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
                  {row.extc}
                </TableCell>
                <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px" }}>
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
      <UmrModal
        open={openModal}
        row={selectedRow}
        year={year}
        appName="UMR"
        onClose={handleCloseModal}
        onStatusUpdate={handleStatusUpdate}
        onSave={handleSaveStatus}
      />

    </div>
  );
}

export default UmrApp;