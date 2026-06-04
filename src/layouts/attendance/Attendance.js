import React, { useEffect } from "react";
import { Box, MenuItem, Select, FormControl, InputLabel, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import AttendanceCard from "../../components/Cards/AttendanceCard";
import dayjs from "dayjs";
import { GetAttendanceCard } from "../../action/Attendance";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [year, setYear] = React.useState(dayjs().year());
  const [month, setMonth] = React.useState(dayjs().format("MM"));
  const dispatch = useDispatch();
  const currentMonth = dayjs().format("MM");
  const navigate = useNavigate();
  useEffect(() => {
    const selectedYear = year ? year : null;
    dispatch(GetAttendanceCard(selectedYear + "-" + month));
  }, [year, month, dispatch]);
  const handleChangeYear = (e) => {
    setYear(e.target.value);
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const months = [
    { label: "December", value: "12" },
    { label: "November", value: "11" },
    { label: "October", value: "10" },
    { label: "September", value: "09" },
    { label: "August", value: "08" },
    { label: "July", value: "07" },
    { label: "June", value: "06" },
    { label: "May", value: "05" },
    { label: "April", value: "04" },
    { label: "March", value: "03" },
    { label: "February", value: "02" },
    { label: "January", value: "01" },
  ];

  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt:1
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mx: 2,  
          gap: 2,
        }}
      >
        {/* Left Side - Dropdowns */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
          {/* Year Dropdown */}
          <FormControl sx={{ minWidth: 135, height: "40px" }}>
            <InputLabel sx={{ fontSize: "12px", top: "-5px" }}>Year</InputLabel>
            <Select
              value={year}
              onChange={handleChangeYear}
              label="Year"
              sx={{
                height: "32px",
                fontSize: "12px",
                padding: "4px 8px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: "200px",
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

          {/* Month Dropdown */}
          <FormControl sx={{ minWidth: 135, height: "40px" }}>
            <InputLabel sx={{ fontSize: "12px", top: "-5px" }}>Month</InputLabel>
            <Select
              value={month}
              onChange={handleChangeMonth}
              label="Month"
              sx={{
                height: "32px",
                fontSize: "12px",
                padding: "4px 8px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: "200px",
                  },
                },
              }}
            >
              {months.map((chip) => (
                <MenuItem
                  key={chip.value}
                  value={chip.value}
                  sx={{ fontSize: "12px", height: "28px" }}
                >
                  {chip.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Right Side - Back Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none", height: "30px" ,mb:1}}
        >
          Back
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          marginLeft: 1,
          marginRight: 1,
          marginBottom: "70px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <AttendanceCard />
        </Box>
      </Box>
    </Box>
  );
};
export default Attendance;