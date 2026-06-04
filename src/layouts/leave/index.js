import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useTheme } from "@material-ui/core/styles";
import LeaveBalance from "./LeaveBalance";
import Punctuality from "./Punctuality";
import NotEnteredLeave from "./NotEnteredLeave";
import LeaveSummery from "./LeaveSummery";
import {
  GetLeaveBalance,
  GetLeaveSummary,
  GetNotEnteredLeave,
  GetPunctuality,
} from "../../action/Leave";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import LeaveDetailsModal from "../../../src/components/Utility/LeaveDetailsModal";
import LeaveSummaryModal from "../../../src/components/Utility/LeaveSummaryModal";
import { Visibility, DesignServices } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const AddLeave = () => {
  const [leaveType, setLeaveType] = useState("");
  const [days, setDays] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const isDisabled = true;

  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = () => { 
    console.log({ leaveType, days, reason, startDate, endDate });
  };
  return (

    // <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
    //   <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
    //     Add Leave
    //   </Typography>
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
    //       <DatePicker
    //         label="Leave Start Date"
    //         value={startDate}
    //         onChange={(newValue) => setStartDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //       <DatePicker
    //         label="Leave End Date"
    //         value={endDate}
    //         onChange={(newValue) => setEndDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //     </Box>
    //   </LocalizationProvider>
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 2,
    //       marginBottom: 2,
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend">Leave Type</FormLabel>
    //       <RadioGroup value={leaveType} onChange={handleLeaveTypeChange}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Casual Leave"
    //               control={<Radio />}
    //               label="Casual Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Annual Leave"
    //               control={<Radio />}
    //               label="Annual Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Day Off"
    //               control={<Radio />}
    //               label="Day Off"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Sick Leave"
    //               control={<Radio />}
    //               label="Sick Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Duty Leave"
    //               control={<Radio />}
    //               label="Duty Leave"
    //             />
    //           </Grid>
    //           <Grid item xs={6}>
    //             <FormControlLabel
    //               value="Shift Day-Off"
    //               control={<Radio />}
    //               label="Shift Day-Off"
    //             />
    //           </Grid>
    //         </Grid>
    //       </RadioGroup>
    //     </FormControl>
    //   </Box>
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 2,
    //       marginBottom: 2,
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend">Days</FormLabel>
    //       <RadioGroup row value={days} onChange={handleDaysChange}>
    //         <FormControlLabel value="1" control={<Radio />} label="1" />
    //         <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
    //       </RadioGroup>
    //     </FormControl>
    //   </Box>
    //   <TextField
    //     label="Reason"
    //     multiline
    //     rows={4}
    //     fullWidth
    //     value={reason}
    //     onChange={handleReasonChange}
    //     inputProps={{ maxLength: 100 }}
    //     sx={{ marginBottom: 2 }}
    //   />
    //   <Button variant="contained" color="primary" onClick={handleSubmit}>
    //     Submit
    //   </Button>
    // </Paper>
    // <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
    //   <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
    //     Add Leave
    //   </Typography>
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <Box sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
    //       <DatePicker
    //         label="Leave Start Date"
    //         value={startDate}
    //         onChange={(newValue) => setStartDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //       <DatePicker
    //         label="Leave End Date"
    //         value={endDate}
    //         onChange={(newValue) => setEndDate(newValue)}
    //         renderInput={(params) => <TextField {...params} fullWidth />}
    //       />
    //     </Box>
    //   </LocalizationProvider>

    //   {/* Leave Type */}
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 1, // <-- reduced padding
    //       marginBottom: 1, // <-- reduced margin
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend" sx={{ fontSize: 12 }}>Leave Type</FormLabel>
    //       <RadioGroup value={leaveType} onChange={handleLeaveTypeChange}>
    //         <Grid container spacing={1}>
    //           {[
    //             "Casual Leave",
    //             "Annual Leave",
    //             "Day Off",
    //             "Sick Leave",
    //             "Duty Leave",
    //             "Shift Day-Off",
    //           ].map((type) => (
    //             <Grid item xs={6} key={type}>
    //               <FormControlLabel
    //                 value={type}
    //                 control={<Radio />}
    //                 label={type}
    //                 sx={{
    //                   margin: 0,
    //                   padding: 0,
    //                   '& .MuiFormControlLabel-label': {
    //                     fontSize: '12px',
    //                   },
    //                 }}
    //               />
    //             </Grid>
    //           ))}
    //         </Grid>
    //       </RadioGroup>

    //     </FormControl>
    //   </Box>

    //   {/* Days */}
    //   <Box
    //     sx={{
    //       border: "1px solid #ccc",
    //       borderRadius: 1,
    //       padding: 1, // reduced padding
    //       marginBottom: 1, // reduced margin
    //     }}
    //   >
    //     <FormControl component="fieldset" sx={{ width: "100%" }}>
    //       <FormLabel component="legend">Days</FormLabel>
    //       <RadioGroup row value={days} onChange={handleDaysChange}>
    //         <FormControlLabel value="1" control={<Radio />} label="1" />
    //         <FormControlLabel value="0.5" control={<Radio />} label="0.5" />
    //       </RadioGroup>
    //     </FormControl>
    //   </Box>

    //   {/* Reason */}
    //   <TextField
    //     label="Reason"
    //     multiline
    //     rows={2}
    //     fullWidth
    //     value={reason}
    //     onChange={handleReasonChange}
    //     inputProps={{ maxLength: 100 }}
    //     sx={{ marginBottom: 1 }} // reduced margin
    //   />

    //   <Button variant="contained" color="primary" onClick={handleSubmit}>
    //     Submit
    //   </Button>
    // </Paper>



//leave modify 2026-01-19------------------------------------


    // <Paper elevation={1} sx={{ p: 1, mt: 2 }}>
    //   <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
    //     Add Leave
    //   </Typography>

    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
    //       <DatePicker
    //         label="Leave Start Date"
    //         value={startDate}
    //         onChange={(newValue) => setStartDate(newValue)}
    //         renderInput={(params) => (
    //           <TextField {...params} fullWidth size="small" inputProps={{ style: { fontSize: 12 } }} />
    //         )}
    //       />
    //       <DatePicker
    //         label="Leave End Date"
    //         value={endDate}
    //         onChange={(newValue) => setEndDate(newValue)}
    //         renderInput={(params) => (
    //           <TextField {...params} fullWidth size="small" inputProps={{ style: { fontSize: 12 } }} />
    //         )}
    //       />
    //     </Box>
    //   </LocalizationProvider>

    //   {/* Leave Type box */}
    //   <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
    //     {/* Leave Type Box (Left) */}
    //     <Box sx={{ flex: 1, minWidth: "35%", border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
    //       <FormControl component="fieldset" sx={{ width: "100%" }}>
    //         <FormLabel component="legend" sx={{ fontSize: 12 }}>
    //           Leave Type
    //         </FormLabel>
    //         <RadioGroup value={leaveType} onChange={handleLeaveTypeChange}>
    //           <Grid container spacing={1}>
    //             {[
    //               "Casual Leave",
    //               "Annual Leave",
    //               "Day Off",
    //               "Sick Leave",
    //               "Duty Leave",
    //               "Shift Day-Off",
    //             ].map((type) => (
    //               <Grid item xs={6} key={type}>
    //                 <FormControlLabel
    //                   value={type}
    //                   control={<Radio sx={{ p: 0.5 }} />}
    //                   label={type}
    //                   sx={{
    //                     m: 0,
    //                     '& .MuiFormControlLabel-label': { fontSize: '12px' },
    //                   }}
    //                 />
    //               </Grid>
    //             ))}
    //           </Grid>
    //         </RadioGroup>
    //       </FormControl>
    //     </Box>

    //     {/* Days Box in Right */}
    //     <Box sx={{ width: "20%", border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
    //       <FormControl component="fieldset" sx={{ width: "100%" }}>
    //         <FormLabel component="legend" sx={{ fontSize: 12 }}>Days</FormLabel>
    //         <RadioGroup row value={days} onChange={handleDaysChange}>
    //           <FormControlLabel
    //             value="1"
    //             control={<Radio sx={{ mt: -1 }} />}
    //             label="1"
    //             sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px', mt: -1 } }}
    //           />
    //           <FormControlLabel
    //             value="0.5"
    //             control={<Radio sx={{ mt: -1 }} />}
    //             label="0.5"
    //             sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px', mt: -1 } }}
    //           />
    //         </RadioGroup>
    //       </FormControl>
    //     </Box>
    //   </Box>

    //   {/* Reason Box */}
    //   <TextField
    //     label="Reason"
    //     multiline
    //     rows={1}
    //     fullWidth
    //     value={reason}
    //     onChange={handleReasonChange}
    //     inputProps={{ maxLength: 100, style: { fontSize: 12 } }}
    //     InputLabelProps={{ style: { fontSize: 12 } }}
    //     sx={{ mb: 1 }}
    //   />

    //   <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontSize: 12 }}>
    //     Submit
    //   </Button>
    // </Paper>


    <Paper
      elevation={1}
      sx={{
        p: 1,
        mt: 2,
        backgroundColor: isDisabled ? "#f5f5f5" : "#fff",
        opacity: isDisabled ? 0.6 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Add Leave
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          <DatePicker
            label="Leave Start Date"
            value={startDate}
            disabled={isDisabled}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
              />
            )}
          />
          <DatePicker
            label="Leave End Date"
            value={endDate}
            disabled={isDisabled}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                size="small"
                inputProps={{ style: { fontSize: 12 } }}
              />
            )}
          />
        </Box>
      </LocalizationProvider>

      {/* Leave Type & Days */}
      <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
        {/* Leave Type */}
        <Box
          sx={{
            flex: 1,
            minWidth: "35%",
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 1,
          }}
        >
          <FormControl component="fieldset" sx={{ width: "100%" }} disabled={isDisabled}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Leave Type
            </FormLabel>
            <RadioGroup value={leaveType}>
              <Grid container spacing={1}>
                {[
                  "Casual Leave",
                  "Annual Leave",
                  "Day Off",
                  "Sick Leave",
                  "Duty Leave",
                  "Shift Day-Off",
                ].map((type) => (
                  <Grid item xs={6} key={type}>
                    <FormControlLabel
                      value={type}
                      control={<Radio sx={{ p: 0.5 }} />}
                      label={type}
                      sx={{
                        m: 0,
                        "& .MuiFormControlLabel-label": {
                          fontSize: "12px",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Days */}
        <Box
          sx={{
            width: "20%",
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 1,
          }}
        >
          <FormControl component="fieldset" sx={{ width: "100%" }} disabled={isDisabled}>
            <FormLabel component="legend" sx={{ fontSize: 12 }}>
              Days
            </FormLabel>
            <RadioGroup row value={days}>
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "12px" } }}
              />
              <FormControlLabel
                value="0.5"
                control={<Radio />}
                label="0.5"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: "12px" } }}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>

      {/* Reason */}
      <TextField
        label="Reason"
        multiline
        rows={1}
        fullWidth
        disabled={isDisabled}
        value={reason}
        inputProps={{ maxLength: 100, style: { fontSize: 12 } }}
        InputLabelProps={{ style: { fontSize: 12 } }}
        sx={{ mb: 1 }}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={isDisabled}
        onClick={handleSubmit}
        sx={{ fontSize: 12 }}
      >
        Submit
      </Button>
    </Paper>


  );
};

const Leave = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [year, setYear] = React.useState(dayjs().year());
  const [selectedRow, setSelectedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openLeaveSummaryModal, setOpenLeaveSummaryModal] = useState(false);
  const [selectedTab, setSelectedTab] = React.useState("Leave Details");
  const [modalTitle, setModalTitle] = useState("");
  const [leaveDetailsData, setLeaveDetailsData] = useState([]);
  const [showLeaveBalanceSummary, setShowLeaveBalanceSummary] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const leaveBalanceData = useSelector(
    (state) => state.leaveBalance.responseBody
  );
  const punctualityData = useSelector(
    (state) => state.punctuality.responseBody
  );
  const notEnteredLeaveData = useSelector(
    (state) => state.notEnteredLeave.responseBody
  );
  const isLoading = useSelector((state) => state.leaveBalance.loading);
  const maxYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => maxYear - index);

  const handleLeaveSummaryClick = () => {
    setSelectedTab("LeaveSummery");
    setShowLeaveBalanceSummary(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedTab(event.target.value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleDesignButtonClick = () => {
    setOpenLeaveSummaryModal(true);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);

    let data = [];
    switch (tabName) {
      case "LeaveSummery":
        data = leaveBalanceData;
        break;
      case "NotEnteredLeave":
        data = notEnteredLeaveData;
        break;
      case "Punctuality":
        data = punctualityData;
        break;
      default:
        data = [];
    }

    // if (data.length === 0) {
    //   Swal.fire({
    //     title: `${tabName} Not Available`,
    //     text: `No data available for the ${tabName} tab for the selected Year.`,
    //     icon: "info",
    //     confirmButtonText: "OK",
    //   });
    // }
  };

  useEffect(() => {
    dispatch(GetLeaveBalance(year));
    dispatch(GetNotEnteredLeave(year));
    dispatch(GetPunctuality(year));
    dispatch(GetLeaveSummary(year));
  }, [dispatch, year]);

  const totalLeave = leaveBalanceData.reduce(
    (sum, row) => sum + (parseFloat(row.Total) || 0),
    0
  );
  const totalTakenLeave = leaveBalanceData.reduce(
    (sum, row) => sum + (parseFloat(row.Taken) || 0),
    0
  );
  const totalBalanceLeave = leaveBalanceData.reduce(
    (sum, row) => sum + (parseFloat(row.Balance) || 0),
    0
  );

  const fetchLeaveDetails = async (P_TYPE, P_YEAR) => {
    try {
      const response = await axios.get("Leave/GetLeaveByType", {
        params: {
          P_YEAR: P_YEAR,
          P_TYPE: P_TYPE,
        },
      });
      if (response.data && response.data.StatusCode === 200) {
        setLeaveDetailsData(response.data.ResultSet || []);
      } else {
        setLeaveDetailsData([]);
        console.error("Failed to fetch leave details:", response.data);
      }
    } catch (error) {
      console.error("Error fetching leave details:", error);
      setLeaveDetailsData([]);
    }
  };



  return (
    <Box
      sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            {/* {Array.from({ length: 11 }, (_, i) => 2025 - i).map(
              (yearOption) => (
                <MenuItem key={yearOption} value={yearOption}>
                  {yearOption}
                </MenuItem>
              )
            )} */}
            {Array.from({ length: 10 }, (_, index) => {
              const currentYear = new Date().getFullYear();
              const yearOption = currentYear - index;

              return (
                <MenuItem
                  key={yearOption}
                  value={yearOption}
                  sx={{ fontSize: "12px", height: "28px" }}
                >
                  {yearOption}
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

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          marginTop: 1,
        }}
      >
        <Button
          variant={selectedTab === "AddLeave" ? "contained" : "outlined"}
          onClick={() => handleTabClick("AddLeave")}
          sx={{
            backgroundColor:
              selectedTab === "AddLeave" ? "#5ac8fa" : "transparent",
            "&:hover": {
              backgroundColor:
                selectedTab === "AddLeave" ? "#5ac8fa" : "#f1f1f1",
            },
            fontSize: "12px",
          }}
        >
          Add Leave
        </Button>
        <Button
          variant={selectedTab === "LeaveSummery" ? "contained" : "outlined"}
          onClick={() => handleTabClick("LeaveSummery")}
          sx={{
            backgroundColor:
              selectedTab === "LeaveSummery" ? "#5ac8fa" : "transparent",
            "&:hover": {
              backgroundColor:
                selectedTab === "LeaveSummery" ? "#5ac8fa" : "#f1f1f1",
            },
            fontSize: "12px",
          }}
        >
          Leave Summary
        </Button>
        <Button
          variant={selectedTab === "NotEnteredLeave" ? "contained" : "outlined"}
          onClick={() => handleTabClick("NotEnteredLeave")}
          sx={{
            backgroundColor:
              selectedTab === "NotEnteredLeave" ? "#5ac8fa" : "transparent",
            "&:hover": {
              backgroundColor:
                selectedTab === "NotEnteredLeave" ? "#5ac8fa" : "#f1f1f1",
            },
            fontSize: "14px",
          }}
        >
          Not Entered Leave
        </Button>
        <Button
          variant={selectedTab === "Punctuality" ? "contained" : "outlined"}
          onClick={() => handleTabClick("Punctuality")}
          sx={{
            backgroundColor:
              selectedTab === "Punctuality" ? "#5ac8fa" : "transparent",
            "&:hover": {
              backgroundColor:
                selectedTab === "Punctuality" ? "#5ac8fa" : "#f1f1f1",
            },
            fontSize: "14px",
            px: 1, // Adds horizontal padding for add padding to left and right of the button name

            minWidth: "auto", // Optional: allows button to shrink-wrap the text
          }}
        >
          Punctuality
        </Button>
      </Box> */}


      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.1,
          marginTop: 1,
        }}
      >
        {[
          { key: "Leave Details", label: "Add Leave" },
          { key: "LeaveSummery", label: "Leave Summary" },
          { key: "NotEnteredLeave", label: "Not Entered Leave" },
          { key: "Punctuality", label: "Punctuality" },
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={selectedTab === tab.key ? "contained" : "outlined"}
            onClick={() => handleTabClick(tab.key)}
            sx={{
              backgroundColor:
                selectedTab === tab.key ? "#1976d2" : "transparent",
              "&:hover": {
                backgroundColor:
                  selectedTab === tab.key ? "#1976d2" : "#f1f1f1",
              },
              fontSize: "11px",
              px: 1,
              py: 0.4,
              minHeight: "28px",
              minWidth: "auto",
              borderRadius: "6px",
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>


      {selectedTab === "Leave Details" && (
        <>
          {/* {showLeaveBalanceSummary && selectedTab !== "AddLeave" && (
        <Paper elevation={1} sx={{ padding: 1, marginTop: 2 }}>
          Below codes inside the paper block are same
        </Paper>
      )} */}
          {/* Moved Leave Balance Summary here under Add Leave */}


          <AddLeave />{" "}
          {/* Used for add the Leave Balance Summary Top of the Add Leave Section */}
          {showLeaveBalanceSummary && (
            <Paper elevation={1} sx={{ padding: 1, marginTop: 2 }}>
              <Typography
                variant="h6"
                sx={{ marginBottom: 1, fontWeight: "bold" }}
              >
                Leave Balance Summary
              </Typography>
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <Table
                  size="small"
                  sx={{ width: "100%", tableLayout: "fixed" }}
                >
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: "#1976d2", color: "white" }}
                    >
                      <TableCell
                        sx={{
                          width: "24%",
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "white",
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "white",
                          textAlign: "center",
                          padding: "8px",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "white",
                          textAlign: "center",
                          padding: "8px",
                        }}
                      >
                        Taken
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "white",
                          textAlign: "center",
                          padding: "8px",
                        }}
                      >
                        Balance
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: "11px",
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
                    {leaveBalanceData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {row.Description}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {row.Total}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {row.Taken}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "12px",
                          }}
                        >
                          {row.Balance}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "5px",
                            fontSize: "12px",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setModalTitle(`${row.Description} Details`);
                              fetchLeaveDetails(row.Type, year);
                              setOpenModal(true);
                            }}
                            sx={{
                              backgroundColor: "#5ac8fa",
                              "&:hover": { backgroundColor: "#5ac8fa" },
                              color: "white",
                              borderColor: "#5ac8fa",
                              padding: "4px",
                              minWidth: "auto",
                              borderRadius: "50%",
                            }}
                          >
                            <Visibility sx={{ fontSize: "16px" }} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "12px",
                        }}
                      >
                        Total
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {totalLeave}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {totalTakenLeave}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "5px",
                          fontSize: "12px",
                        }}
                      >
                        {totalBalanceLeave}
                      </TableCell>
                      <TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={handleDesignButtonClick}
                            sx={{
                              backgroundColor: "#5ac8fa",
                              "&:hover": { backgroundColor: "#5ac8fa" },
                              color: "white",
                              borderColor: "#5ac8fa",
                              padding: "4px",
                              minWidth: "auto",
                              borderRadius: "50%",
                              marginLeft: "-5px",
                            }}
                          >
                            <DesignServices
                              sx={{ fontSize: "16px", alignItems: "center" }}
                            />
                          </Button>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Paper>
          )}

        </>
      )}

      <Box
        flex={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          mt: 1,
          mb: 1,
          mr: 1,
        }}
      ></Box>
      {[
        "LeaveBalance",
        "Punctuality",
        "NotEnteredLeave",
        "LeaveSummery",
      ].includes(selectedTab) && (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
              {selectedTab === "LeaveBalance" && "Leave Balance Summary"}
              {selectedTab === "Punctuality" && "Punctuality Summary"}
              {selectedTab === "NotEnteredLeave" && "Not Entered Leave Summary"}
              {selectedTab === "LeaveSummery" && "Leave Summary"}
            </Typography>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : (
              <>
                {selectedTab === "LeaveBalance" && <LeaveBalance />}
                {selectedTab === "Punctuality" && <Punctuality />}
                {selectedTab === "NotEnteredLeave" && (
                  <NotEnteredLeave selectedYear={year} />
                )}
                {selectedTab === "LeaveSummery" && <LeaveSummery />}
              </>
            )}
          </Paper>
        )}

      {openLeaveSummaryModal && (
        <LeaveSummaryModal
          open={openLeaveSummaryModal}
          onClose={() => setOpenLeaveSummaryModal(false)}
        />
      )}

      {openModal && (
        <LeaveDetailsModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          rowData={leaveDetailsData}
          modalTitle={modalTitle}
        />
      )}
    </Box>
  );
};

export default Leave;
