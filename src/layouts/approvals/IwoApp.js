import { Visibility } from "@mui/icons-material";
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
import React, { useState, useEffect } from "react";
import IwoModal from "../../components/Utility/Approvals/IwoModal";
import axios from "axios";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";

function IwoApp() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const [iwoData, setIwoData] = useState([]);

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const fetchIwoData = async (year) => {
    try {
      const response = await axios.get(
        `Approvals/GetIWODetails?P_YEAR=${year}`
      );
      if (response.data.StatusCode === 200 && response.data.ResultSet) {
        setIwoData(response.data.ResultSet);
      } else {
        setIwoData([]);
      }
    } catch (error) {
      console.error("Error fetching IWO data:", error);
      setIwoData([]);
    }
  };

  useEffect(() => {
    fetchIwoData(year);
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
    console.log("Updated Row:", selectedRow);
    setOpenModal(false);
  };

  return (
    <div>
      <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",mt:1 }}>
          <FormControl sx={{ width: "150px" }}>
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
          IWO Details
        </Typography>



        {/* <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2", color: "white"  }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "11px", 
                  color: "white",
                  textAlign: "center",
                  padding: "8px",

                }}
              >
                IWO No
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
            {iwoData.length > 0 ? (
              iwoData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
                    {row.IWONO}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
                    {row.IWOJcat} / {row.IWOJmain} / {row.IWOSub}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
                    {row.IWOJcat}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
                    {row.StartDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
                    {row.EndDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}

        < Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <tableRow>
              {["IWO No", "Job No", "Status", "Start Date", "End Date", "Action"].map(
                (text, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "11px",
                      padding: "5px 12px",
                      lineHeight: 2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {text}
                  </TableCell>
                )
              )}
            </tableRow>
          </TableHead>
          <TableBody>
            {iwoData.length > 0 ? (
              iwoData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px", }}>
                    {row.IWONO}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px", }}>
                    {row.IWOJcat} / {row.IWOJmain} / {row.IWOSub}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px", }}>
                    {row.IWOJcat}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px", }}>
                    {row.StartDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px", }}>
                    {row.EndDate}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px", }}>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <IwoModal
        open={openModal}
        row={selectedRow}
        onClose={handleCloseModal}
        onStatusUpdate={handleStatusUpdate}
        onSave={handleSaveStatus}
        appName="IWO"
      />
    </div>

  );
}

export default IwoApp;
