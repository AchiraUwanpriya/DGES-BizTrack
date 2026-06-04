import axios from "axios";
import {
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import Swal from "sweetalert2";

function WorkOrderModal({ onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cdlJobNo, setCdlJobNo] = useState("");
  const [specification, setSpecification] = useState("");
  const [p_loc, setLocation] = useState("");
  const [p_remarks, setRemarks] = useState("");
  const [jobNoOptions, setJobNoOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    const fetchJobNumbers = async () => {
      try {
        const response = await axios.get("JobAllocation/LoadJobNo");
        if (response.status === 200 && response.data.ResultSet) {
          setJobNoOptions(
            response.data.ResultSet.map((item) => ({
              JOBNO: item.JOBNO,
              DISCRIP: item.DISCRIP,
            }))
          );
        } else {
          Swal.fire("Error", "Failed to load job numbers", "error");
        }
      } catch (error) {
        console.error("Error fetching job numbers:", error);
        Swal.fire(
          "Error",
          "An error occurred while loading job numbers",
          "error"
        );
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get("JobAllocation/LoadLocation");
        if (response.status === 200 && response.data.ResultSet) {
          const locations = response.data.ResultSet.map((item) => ({
            LOCCODE: item.LOCCODE,
            LOCDISCRIP: item.LOCDISCRIP,
          }));
          setLocationOptions(locations);
        } else {
          Swal.fire("Error", "Failed to load locations", "error");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        Swal.fire(
          "Error",
          "An error occurred while loading locations",
          "error"
        );
      }
    };

    fetchJobNumbers();
    fetchLocations();
  }, []);

  const handleSave = async () => {
    if (!startDate || !endDate || !specification) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill the required fields",
        icon: "warning",
        customClass: {
          container: "swal2-container",
        },
      });
      return;
    }

    const userConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      customClass: {
        container: "swal2-container",
      },
    });

    if (!userConfirmed.isConfirmed) return;

    const P_JCAT = cdlJobNo.slice(0, 2);
    const P_JMAIN = cdlJobNo.slice(3);

    try {
      const response = await axios.get("JobAllocation/AddNewJob", {
        params: {
          p_jcat: P_JCAT,
          p_jmain: P_JMAIN,
          p_spec: specification,
          p_sdate: dayjs(startDate).format("YYYY-MM-DD"),
          p_edate: dayjs(endDate).format("YYYY-MM-DD"),
          p_loc: p_loc,
          p_remarks: p_remarks,
          p_status: "",
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Record Saved Successfully!",
          icon: "success",
          customClass: {
            container: "swal2-container",
          },
        }).then(() => {
          onClose();
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Failed to add job: ${response.data.Result}`,
          icon: "error",
          customClass: {
            container: "swal2-container",
          },
        });
      }
    } catch (error) {
      console.error("Error adding job:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
        customClass: {
          container: "swal2-container",
        },
      });
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "#2196F3" }}
      >
        Temporary Work Order
      </Typography>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label={
                    <span>
                      Start Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                    setEndDate(null);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label={
                    <span>
                      End Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  minDate={startDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="cdl-job-no-label">CDL Job No</InputLabel>
              <Select
                labelId="cdl-job-no-label"
                id="cdl-job-no"
                value={cdlJobNo}
                label="CDL Job No"
                onChange={(e) => setCdlJobNo(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {jobNoOptions.length > 0 ? (
                  jobNoOptions.map(({ JOBNO, DISCRIP }) => (
                    <MenuItem
                      key={JOBNO}
                      value={JOBNO}
                      sx={{
                        fontSize: "0.875rem",
                        padding: "4px 8px",
                      }}
                    >
                      {`${JOBNO} - ${DISCRIP}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No job numbers available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                id="location"
                value={p_loc}
                label="Location"
                onChange={(e) => setLocation(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 200,
                    },
                  },
                }}
              >
                {locationOptions.length > 0 ? (
                  locationOptions.map(({ LOCCODE, LOCDISCRIP }) => (
                    <MenuItem key={LOCCODE} value={LOCCODE}>
                      {`${LOCCODE} - ${LOCDISCRIP}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No locations available</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={
                <span>
                  Specification <span style={{ color: "red" }}>*</span>
                </span>
              }
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <TextField
          label="Remarks"
          value={p_remarks}
          onChange={(e) => setRemarks(e.target.value)}
          fullWidth
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </>
  );
}

export default WorkOrderModal;
