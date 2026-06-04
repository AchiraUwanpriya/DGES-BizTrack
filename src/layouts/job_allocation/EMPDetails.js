import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Typography,
  Checkbox,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2196F3",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "4px 8px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    wordWrap: "break-word",
    whiteSpace: "normal",
    padding: "4px 8px",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor !== "" ? bgcolor : theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  padding: 0,
  margin: 0,
  cursor: "pointer",
}));
export default function EMPDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    EWONO,
    JOBNO,
    unassignedList: initialUnassignedList,
    selectedDate,
  } = location.state || {};
  const [unassignedList, setUnassignedList] = useState(
    initialUnassignedList || []
  );
  const [allocatedList, setAllocatedList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatedTimes, setUpdatedTimes] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployeeForUpdate, setSelectedEmployeeForUpdate] =
    useState(null);

  const fetchAllocatedEmployees = async () => {
    try {
      const response = await axios.get("JobAllocation/GetAssignedList", {
        params: {
          P_DATE: selectedDate,
          P_EWO_NO: EWONO,
        },
      });
      if (response.data && response.data.StatusCode === 200) {
        setAllocatedList(response.data.ResultSet);
      } else {
        console.log("Failed to fetch allocated employees.");
      }
    } catch (error) {
      console.error("Error fetching allocated employees:", error);
      // alert("Error fetching allocated employees.");
      Swal.fire("Error", "Error fetching allocated employees.", "error");
    }
  };
  useEffect(() => {
    if (selectedDate && EWONO) {
      fetchAllocatedEmployees();
    }
  }, [selectedDate, EWONO]);
  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employee)
        ? prevSelected.filter((e) => e.BarCodeNo !== employee.BarCodeNo)
        : [...prevSelected, employee]
    );
  };
  const saveEmployees = async () => {
    if (selectedEmployees.length === 0) {
      //alert("No employees selected to save.");
      Swal.fire("Warning", "No employees selected to save.", "warning");
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Save",
      text: "Are you sure to save selected records?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    const employeesToSave = selectedEmployees.filter(
      (employee) =>
        !allocatedList.some(
          (allocated) => allocated.AS_BarCodeNo === employee.BarCodeNo
        )
    );

    if (employeesToSave.length === 0) {
      Swal.fire(
        "Info",
        "All selected employees are already allocated.",
        "info"
      );
      setSelectedEmployees([]);
      return;
    }

    try {
      for (const employee of employeesToSave) {
        const response = await axios.get("JobAllocation/SelectEmployee", {
          params: {
            P_DATE: selectedDate,
            P_TIME_IN: employee.InTime,
            P_TIME_OUT: employee.OutTime,
            P_EWO_NO: EWONO,
            P_BARCODE_CARDNO: employee.BarCodeNo,
            P_CONTINUED_STATUS: employee.Cont,
          },
        });

        if (response.data && response.data.StatusCode === 200) {
          setAllocatedList((prev) => [...prev, employee]);
          setUnassignedList((prev) =>
            prev.filter((e) => e.BarCodeNo !== employee.BarCodeNo)
          );
        } else {
          //alert(`Employee ${employee.Name} could not be saved.`);
          Swal.fire(
            "Error",
            `Employee ${employee.Name} could not be saved.`,
            "error"
          );
        }
      }
      setSelectedEmployees([]);
      //alert("Selected employees saved successfully!");
      Swal.fire("Success", "Selected employees saved successfully!", "success");
      setTimeout(() => {
        fetchAllocatedEmployees();
      }, 500);
    } catch (error) {
      console.error("Error saving employees:", error);
      //alert("Error saving employees.");
      Swal.fire("Error", "Error saving employees.", "error");
    }
  };
  const handleUpdateTimes = (employee) => {
    const currentDateTime = new Date();
    setSelectedEmployeeForUpdate(employee);

    setUpdatedTimes((prevTimes) => ({
      ...prevTimes,
      [employee.BarCodeNo]: {
        inDate: employee.AS_InTime
          ? new Date(employee.AS_InTime).toISOString().split("T")[0]
          : "",
        inTime: employee.AS_InTime
          ? new Date(employee.AS_InTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            })
          : "",
        outDate: employee.AS_OutTime
          ? new Date(employee.AS_OutTime).toISOString().split("T")[0]
          : currentDateTime.toISOString().split("T")[0], 
        outTime: employee.AS_OutTime
          ? new Date(employee.AS_OutTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hourCycle: "h23",
            })
          : "", 
      },
    }));
    setOpenDialog(true);
  };
  const handleConfirmUpdate = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Update",
      text: "Are you sure you want to change the date and time?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!isConfirmed) return;

    try {
      const updatedEmployee = updatedTimes[selectedEmployeeForUpdate.BarCodeNo];

      const response = await axios.post(
        "JobAllocation/UpdateAllocatedTime",
        null,
        {
          params: {
            P_DATE: updatedEmployee.inDate,
            P_EWO_NO: EWONO,
            P_BARCODE_CARDNO: selectedEmployeeForUpdate.AS_BarCodeNo,
            P_SERIALNO: selectedEmployeeForUpdate.SerialNo || 1,
            P_SDATE: updatedEmployee.inTime
              ? `${updatedEmployee.inDate} ${updatedEmployee.inTime}`
              : null,
            P_EDATE: updatedEmployee.outTime
              ? `${updatedEmployee.outDate} ${updatedEmployee.outTime}`
              : null,
          },
        }
      );

      if (response.data && response.data.StatusCode === 200) {
        await Swal.fire(
          "Success",
          "Successfully updated the date and time.",
          "success"
        );

        fetchAllocatedEmployees();
        setOpenDialog(false);
      } else {
        Swal.fire("Error", "Failed to update the date and time.", "error");
      }
    } catch (error) {
      console.error("Error updating date and time:", error);
      Swal.fire("Error", "Error updating date and time.", "error");
    }
  };

  const filteredUnassignedList = unassignedList.filter(
    (employee) =>
      employee.BarCodeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <Box sx={{ px: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {EWONO} | {JOBNO} | Date: {selectedDate}
        </Typography>
        <Grid sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#4caf50" }}
            >
              Allocated Employees
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
            sx={{ maxHeight: 260, width: "100%", overflowY: "auto" }}
          >
            <Table stickyHeader aria-label="allocated employees table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ width: "10%" }}>
                    Barcode No
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "50%" }}>
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "10%" }}>
                    In Time
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "10%" }}>
                    Out Time
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "20%" }}>
                    Action
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocatedList.map((employee) => (
                  <StyledTableRow key={employee.AS_BarCodeNo}>
                    <StyledTableCell align="center">
                      {employee.AS_BarCodeNo}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {employee.AS_Name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(employee.AS_InTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h23",
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {employee.AS_OutTime
                        ? new Date(employee.AS_OutTime).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hourCycle: "h23",
                          })
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: "none" }}
                        onClick={() => handleUpdateTimes(employee)}
                      >
                        Update Time
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "#2196F3" }}
            >
              Unassigned Employees
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={saveEmployees}
              sx={{ textTransform: "none" }}
            >
              Save
            </Button>
          </Box>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 280, width: "100%", overflowY: "auto" }}
          >
            <TextField
              size="small"
              id="search"
              label="Search"
              variant="outlined"
              sx={{ width: "100%", mb: 2, backgroundColor: "white" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Table stickyHeader aria-label="unassigned employees table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" sx={{ width: "5%" }}>
                    Select
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "1%" }}>
                    Barcode No
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "79%" }}>
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "15%" }}>
                    In Time
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "15%" }}>
                    Out Time
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUnassignedList.map((employee) => (
                  <StyledTableRow key={employee.BarCodeNo}>
                    <StyledTableCell align="center">
                      <Checkbox
                        checked={selectedEmployees.includes(employee)}
                        onChange={() => handleCheckboxChange(employee)}
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {employee.BarCodeNo}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {employee.Name}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {employee.InTime
                        ? new Date(employee.InTime).toLocaleTimeString([], {
                            hour: "2-digit",

                            minute: "2-digit",

                            hourCycle: "h23",
                          })
                        : " "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {employee.OutTime
                        ? new Date(employee.OutTime).toLocaleTimeString([], {
                            hour: "2-digit",

                            minute: "2-digit",

                            hourCycle: "h23",
                          })
                        : " "}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle>Update Date & Time</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="In Time"
                  type="time"
                  value={
                    updatedTimes[selectedEmployeeForUpdate?.BarCodeNo]
                      ?.inTime || ""
                  }
                  onChange={(e) =>
                    setUpdatedTimes((prev) => ({
                      ...prev,
                      [selectedEmployeeForUpdate.BarCodeNo]: {
                        ...prev[selectedEmployeeForUpdate.BarCodeNo],
                        inTime: e.target.value || null, 
                      },
                    }))
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Out Time"
                  type="time"
                  value={
                    updatedTimes[selectedEmployeeForUpdate?.BarCodeNo]
                      ?.outTime || ""
                  }
                  onChange={(e) =>
                    setUpdatedTimes((prev) => ({
                      ...prev,
                      [selectedEmployeeForUpdate.BarCodeNo]: {
                        ...prev[selectedEmployeeForUpdate.BarCodeNo],
                        outTime: e.target.value || null,
                      },
                    }))
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmUpdate} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
