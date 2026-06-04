import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import {
  GetMedicalIndoorUsageDetails,
  GetMedicalOutdoorUsageDetails,
  GetUserMedicalDetails,
} from "../../action/Medical";
import IndoorAllocations from "./indoorAllocations";

const Leave = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("OutdoorAllocations");
  const [year, setYear] = useState(dayjs().format("YYYY"));
  const navigate = useNavigate();
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const renderComponent = () => {
    switch (selectedTab) {

      case "OutdoorAllocations":
        return <IndoorAllocations allocationName="Outdoor" />;
      case "IndoorAllocations":
        return <IndoorAllocations allocationName="Indoor" />;
      default:
        return null;
    }
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
    dispatch(GetUserMedicalDetails(year));
    dispatch(GetMedicalIndoorUsageDetails(year));
    dispatch(GetMedicalOutdoorUsageDetails(year));
  }, [year]);

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //   }}
    // >
    //   <FormControl
    //     sx={{
    //       minWidth: 130,
    //       width: "100px",
    //       mt: 1,
    //       mb: 1,
    //       "& .MuiSelect-root": {
    //         height: "32px",
    //         fontSize: "12px",
    //       },
    //       "& .MuiInputLabel-root": {
    //         fontSize: "12px",
    //         top: "2px",
    //       },
    //     }}
    //   >
    //     <InputLabel>Year</InputLabel>
    //     <Select
    //       value={year}
    //       onChange={handleChangeYear}
    //       label="Year"
    //       size="small"
    //       sx={{
    //         height: "32px",
    //         fontSize: "12px",
    //       }}
    //     >
    //       <MenuItem value={2025}>2025</MenuItem>
    //       <MenuItem value={2024}>2024</MenuItem>
    //       <MenuItem value={2023}>2023</MenuItem>
    //       <MenuItem value={2022}>2022</MenuItem>
    //       <MenuItem value={2021}>2021</MenuItem>
    //     </Select>
    //   </FormControl>


    <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
      <Box
        id={"header"}
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#F2F2F2",
              }}
            >
              {/* <Box
                sx={{
                  display: "flex",
                  //gap: 2,
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <Button
                  variant={
                    selectedTab === "OutdoorAllocations"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleTabChange("OutdoorAllocations")}
                  sx={{
                    backgroundColor:
                      selectedTab === "OutdoorAllocations"
                        ? "#5ac8fa"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedTab === "OutdoorAllocations"
                          ? "#5ac8fa"
                          : "#f1f1f1",
                    },
                    padding: "14px 34px",
                    fontSize: "16px",
                  }}
                >
                  OUTDOOR ALLOCATIONS
                </Button>

                <Button
                  variant={
                    selectedTab === "IndoorAllocations"
                      ? "contained"
                      : "outlined"
                  }
                  onClick={() => handleTabChange("IndoorAllocations")}
                  sx={{
                    backgroundColor:
                      selectedTab === "IndoorAllocations"
                        ? "#5ac8fa"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedTab === "IndoorAllocations"
                          ? "#5ac8fa"
                          : "#f1f1f1",
                    },
                    padding: "14px 34px",
                    fontSize: "16px",
                  }}
                >
                  INDOOR ALLOCATIONS
                </Button>
              </Box> */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                  gap: 0.2,
                }}
              >
                <Button
                  variant={selectedTab === "OutdoorAllocations" ? "contained" : "outlined"}
                  onClick={() => handleTabChange("OutdoorAllocations")}
                  sx={{
                    backgroundColor:
                      selectedTab === "OutdoorAllocations" ? "#1976d2" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedTab === "OutdoorAllocations" ? "#1976d2" : "#f1f1f1",
                    },
                    padding: "8px 20px",
                    fontSize: "13px",
                    minWidth: "180px",
                  }}
                >
                  OUTDOOR ALLOCATIONS
                </Button>

                <Button
                  variant={selectedTab === "IndoorAllocations" ? "contained" : "outlined"}
                  onClick={() => handleTabChange("IndoorAllocations")}
                  sx={{
                    backgroundColor:
                      selectedTab === "IndoorAllocations" ? "#1976D2" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedTab === "IndoorAllocations" ? "#1976D2" : "#f1f1f1",
                    },
                    padding: "8px 20px",
                    fontSize: "13px",
                    minWidth: "180px",
                  }}
                >
                  INDOOR ALLOCATIONS
                </Button>
              </Box>
              <Paper elevation={1} sx={{ padding: 1, marginTop: 2 }}>
                <Box sx={{ marginTop: 2 }}>{renderComponent()}</Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Leave;
