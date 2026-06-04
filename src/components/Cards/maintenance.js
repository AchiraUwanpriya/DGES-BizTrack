// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   IconButton,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   Tooltip,
//   CircularProgress,
//   Alert,
//   Divider,
//   InputAdornment,
//   Toolbar,
// } from "@mui/material";
// import {
//   Refresh as RefreshIcon,
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Done as DoneIcon,
//   BuildCircle as BuildCircleIcon,
//   HomeWork as HomeWorkIcon,
//   FilterList as FilterListIcon,
// } from "@mui/icons-material";
// import axios from "axios";
// import Swal from "sweetalert2";


// const statusMap = {
//   "G": { label: "Good", color: "success" },
//   "B": { label: "Bad", color: "error" },
//   "P": { label: "Pending", color: "warning" },
//   "C": { label: "Complete", color: "success" },
//   "A": { label: "Accept", color: "info" },
//   "D": { label: "Complete Done", color: "primary" },
//   "I": { label: "In Process", color: "secondary" },
// };

// const bungalowTypeMap = {
//   "1": "Main Bungalow",
//   "2": "Family Bungalow",
// };

// const MaintenancePage = () => {
//   const [feedbackData, setFeedbackData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showOnlyPending, setShowOnlyPending] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedFeedback, setSelectedFeedback] = useState(null);
//   const [maintenanceStatus, setMaintenanceStatus] = useState("");
//   const [maintenanceComment, setMaintenanceComment] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);


//   useEffect(() => {
//     fetchFeedbackData();
//   }, []);


//   useEffect(() => {
//     if (feedbackData) {
//       let filtered = [...feedbackData];

//       if (searchTerm) {
//         filtered = filtered.filter(item =>
//           item.Res_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (item.Feed_MatReport && item.Feed_MatReport.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       }


//       if (showOnlyPending) {
//         filtered = filtered.filter(item => item.Feed_MatStatus === "P");
//       }

//       setFilteredData(filtered);
//     }
//   }, [feedbackData, searchTerm, showOnlyPending]);

//   const fetchFeedbackData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get("Reservation/GetFeedbackDetails");
//       if (response.data.StatusCode === 200) {

//         const maintenanceItems = response.data.ResultSet.filter(item => item.Feed_MatReport);
//         setFeedbackData(maintenanceItems);
//         setFilteredData(maintenanceItems);
//       } else {
//         throw new Error("Failed to fetch feedback data");
//       }
//     } catch (err) {
//       console.error("Error fetching feedback data:", err);
//       setError("Failed to load maintenance data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenDialog = (feedback) => {
//     setSelectedFeedback(feedback);
//     setMaintenanceStatus(feedback.Feed_MatStatus);
//     setMaintenanceComment(feedback.Feed_MatComm || "");
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedFeedback(null);
//     setMaintenanceComment("");
//   };

//   const handleUpdateMaintenance = async () => {
//     if (!selectedFeedback) return;

//     setIsSubmitting(true);
//     try {

//       const updateUrl = `Reservation/AddMatcFeedback?P_MATC_STATUS=${maintenanceStatus}&P_MATC_COMMENT=${encodeURIComponent(maintenanceComment)}&P_IWO_NO=1233&P_RESERVATION_NO=${selectedFeedback.Res_no}&P_FEEDBACK_ID=${selectedFeedback.Feed_Id}`;


//       const response = await axios.get(updateUrl);

//       if (response.data && response.data.StatusCode === 200) {
//         const updatedData = feedbackData.map(item => {
//           if (item.Feed_Id === selectedFeedback.Feed_Id) {
//             return {
//               ...item,
//               Feed_MatStatus: maintenanceStatus,
//               Feed_MatComm: maintenanceComment
//             };
//           }
//           return item;
//         });

//         setFeedbackData(updatedData);

//         Swal.fire({
//           icon: "success",
//           title: "Updated Successfully",
//           text: "Maintenance status has been updated.",
//           confirmButtonColor: "#1976d2",
//           timer: 2000,
//         });
//       } else {
//         throw new Error("API returned an unsuccessful status code");
//       }
//     } catch (error) {
//       console.error("Error updating maintenance status:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//         text: "Failed to update maintenance status. Please try again.",
//         confirmButtonColor: "#1976d2",
//       });
//     } finally {
//       handleCloseDialog();
//       setIsSubmitting(false);
//     }
//   };

//   const togglePendingFilter = () => {
//     setShowOnlyPending(!showOnlyPending);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper sx={{ p: 3, borderRadius: 2 }}>
//         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <BuildCircleIcon sx={{ fontSize: 32, color: "primary.main", mr: 1 }} />
//             <Typography variant="h5" component="h1">
//               Maintenance Reports
//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 3 }} />


//         <Toolbar
//           sx={{
//             p: 0,
//             mb: 2,
//             display: "flex",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//             gap: 2
//           }}
//         >
//           <TextField
//             placeholder="Search by Reservation # or Issue"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ width: { xs: "100%", sm: "auto", flexGrow: 1, maxWidth: "500px" } }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             color={showOnlyPending ? "warning" : "inherit"}
//             variant={showOnlyPending ? "contained" : "outlined"}
//             onClick={togglePendingFilter}
//             startIcon={<FilterListIcon />}
//             sx={{ borderRadius: 1, whiteSpace: "nowrap" }}
//           >
//             {showOnlyPending ? "Showing Pending Only" : "Show All"}
//           </Button>
//         </Toolbar>


//         {error && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {error}
//           </Alert>
//         )}


//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : filteredData.length === 0 ? (
//           <Alert severity="info" sx={{ mb: 3 }}>
//             No maintenance reports found. {searchTerm && "Try adjusting your search."}
//           </Alert>
//         ) : (
//           /* Data Table */
//           <TableContainer component={Paper} sx={{ boxShadow: "none", maxHeight: "calc(100vh - 250px)", overflow: "auto" }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   {/* <TableCell sx={{ fontWeight: "bold" }}>Reservation #</TableCell> */}
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976D2", color: "white" }}>Bungalow</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976D2", color: "white" }}>Guest Rating</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976D2", color: "white" }}>Maintenance Issue</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976D2", color: "white" }}>Status</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976D2", color: "white" }}>Comments</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976D2", color: "white" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>


//               <TableBody>
//                 {filteredData.map((feedback) => (
//                   <TableRow key={feedback.Feed_Id} hover>
//                     {/* <TableCell>{feedback.Res_no}</TableCell> */}
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         {/* <HomeWorkIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary" }} /> */}
//                         {bungalowTypeMap[feedback.Feed_Banglowid] || `Bungalow ${feedback.Feed_Banglowid}`}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={statusMap[feedback.Feed_Status]?.label || feedback.Feed_Status}
//                         color={statusMap[feedback.Feed_Status]?.color || "default"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Tooltip title={feedback.Feed_Report || ""} placement="top">
//                         <Typography>
//                           {feedback.Feed_MatReport}
//                         </Typography>
//                       </Tooltip>
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={statusMap[feedback.Feed_MatStatus]?.label || feedback.Feed_MatStatus}
//                         color={statusMap[feedback.Feed_MatStatus]?.color || "default"}
//                         size="small"
//                         icon={feedback.Feed_MatStatus === "D" ? <DoneIcon /> : null}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {feedback.Feed_MatComm || "-"}
//                     </TableCell>
//                     <TableCell>
//                       <IconButton
//                         size="small"
//                         color="primary"
//                         onClick={() => handleOpenDialog(feedback)}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Update Maintenance Status Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           Update Maintenance Status
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//               Reservation: #{selectedFeedback?.Res_no}
//             </Typography>

//             <Typography variant="subtitle1" gutterBottom>
//               Maintenance Issue:
//             </Typography>
//             <Typography paragraph sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
//               {selectedFeedback?.Feed_MatReport}
//             </Typography>

//             <TextField
//               select
//               fullWidth
//               margin="normal"
//               label="Status"
//               value={maintenanceStatus}
//               onChange={(e) => setMaintenanceStatus(e.target.value)}
//             >
//               <MenuItem value="A">
//                 <Chip label="Accept" color="info" size="small" sx={{ mr: 1 }} />
//                 Accept
//               </MenuItem>
//               <MenuItem value="I">
//                 <Chip label="In Process" color="secondary" size="small" sx={{ mr: 1 }} />
//                 In Process
//               </MenuItem>
//               <MenuItem value="C">
//                 <Chip label="Complete" color="success" size="small" sx={{ mr: 1 }} />
//                 Complete
//               </MenuItem>
//             </TextField>

//             <TextField
//               fullWidth
//               margin="normal"
//               label="Maintenance Comments"
//               multiline
//               rows={3}
//               value={maintenanceComment}
//               onChange={(e) => setMaintenanceComment(e.target.value)}
//               placeholder="Add comments about the maintenance performed..."
//             />

//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} disabled={isSubmitting}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleUpdateMaintenance}
//             disabled={isSubmitting}
//             startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
//           >
//             {isSubmitting ? "Updating..." : "Update Status"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MaintenancePage;


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tooltip,
  CircularProgress,
  Alert,
  Divider,
  InputAdornment,
  Toolbar,
  Avatar,
  Badge,
  useMediaQuery,
  useTheme,
  Link,
  Tabs,
  Tab,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Done as DoneIcon,
  BuildCircle as BuildCircleIcon,
  HomeWork as HomeWorkIcon,
  FilterList as FilterListIcon,
  Assignment as AssignmentIcon,
  Construction as ConstructionIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../components/Utility/Loader";

const statusMap = {
  "G": { label: "Good", color: "success", icon: <CheckCircleIcon fontSize="small" /> },
  "B": { label: "Bad", color: "error", icon: <ConstructionIcon fontSize="small" /> },
  "P": { label: "Pending", color: "warning", icon: <HourglassEmptyIcon fontSize="small" /> },
  "C": { label: "Complete", color: "success", icon: <DoneIcon fontSize="small" /> },
  "A": { label: "Accept", color: "info", icon: <AssignmentIcon fontSize="small" /> },
  "D": { label: "Complete Done", color: "primary", icon: <DoneIcon fontSize="small" /> },
  "I": { label: "In Process", color: "secondary", icon: <BuildCircleIcon fontSize="small" /> },
};

const bungalowTypeMap = {
  "1": "Main",
  "2": "Family",
};

const MaintenancePage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [maintenanceStatus, setMaintenanceStatus] = useState("");
  const [maintenanceComment, setMaintenanceComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState('all');
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const ReadMoreText = ({ text, wordLimit = 20 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return "N/A";

    const words = text.split(' ');

    if (words.length <= wordLimit) {
      return text;
    }

    const toggleExpand = (e) => {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    };

    return isExpanded ? (
      <span>
        {text}{' '}
        <Link
          href="#"
          onClick={toggleExpand}
          sx={{
            color: '#1976d2',
            fontSize: '11px',
            fontWeight: 500,
            ml: 0.5
          }}
        >
          See less
        </Link>
      </span>
    ) : (
      <span>
        {words.slice(0, wordLimit).join(' ')}{' '}
        <Link
          href="#"
          onClick={toggleExpand}
          sx={{
            color: '#1976d2',
            fontSize: '11px',
            fontWeight: 500,
            ml: 0.5
          }}
        >
          See more
        </Link>
      </span>
    );
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  useEffect(() => {
    if (feedbackData) {
      let filtered = [...feedbackData];

      if (tabValue !== 'all') {
        filtered = filtered.filter(item => item.Feed_Banglowid === tabValue);
      }

      
      if (searchTerm) {
        filtered = filtered.filter(item =>
          item.Res_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.Feed_MatReport && item.Feed_MatReport.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      
      if (showOnlyPending) {
        filtered = filtered.filter(item => item.Feed_MatStatus === "P");
      }

      setFilteredData(filtered);
    }
  }, [feedbackData, searchTerm, showOnlyPending, tabValue]);

  const fetchFeedbackData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("Reservation/GetFeedbackDetails");
      if (response.data.StatusCode === 200) {
        const maintenanceItems = response.data.ResultSet.filter(item => item.Feed_MatReport);
        setFeedbackData(maintenanceItems);
        setFilteredData(maintenanceItems);
      } else {
        throw new Error("Failed to fetch feedback data");
      }
    } catch (err) {
      console.error("Error fetching feedback data:", err);
    //  setError("Failed to load maintenance data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (feedback) => {
    setSelectedFeedback(feedback);
    setMaintenanceStatus(feedback.Feed_MatStatus);
    setMaintenanceComment(feedback.Feed_MatComm || "");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFeedback(null);
    setMaintenanceComment("");
  };

  const handleUpdateMaintenance = async () => {
    if (!selectedFeedback) return;

    setIsSubmitting(true);
    try {
      const updateUrl = `Reservation/AddMatcFeedback?P_MATC_STATUS=${maintenanceStatus}&P_MATC_COMMENT=${encodeURIComponent(maintenanceComment)}&P_IWO_NO=1233&P_RESERVATION_NO=${selectedFeedback.Res_no}&P_FEEDBACK_ID=${selectedFeedback.Feed_Id}`;

      const response = await axios.get(updateUrl);

      if (response.data && response.data.StatusCode === 200) {
        const updatedData = feedbackData.map(item => {
          if (item.Feed_Id === selectedFeedback.Feed_Id) {
            return {
              ...item,
              Feed_MatStatus: maintenanceStatus,
              Feed_MatComm: maintenanceComment
            };
          }
          return item;
        });

        setFeedbackData(updatedData);

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          text: "Maintenance status has been updated.",
          confirmButtonColor: "#1976d2",
          timer: 2000,
          showConfirmButton: false,
          backdrop: false
        });
      } else {
        throw new Error("API returned an unsuccessful status code");
      }
    } catch (error) {
      console.error("Error updating maintenance status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update maintenance status. Please try again.",
        confirmButtonColor: "#1976d2",
      });
    } finally {
      handleCloseDialog();
      setIsSubmitting(false);
    }
  };

  const togglePendingFilter = () => {
    setShowOnlyPending(!showOnlyPending);
  };

  const handleRefresh = () => {
    fetchFeedbackData();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ p: isMobile ? 1 : 3 }}>
          <Paper sx={{
            p: isMobile ? 1 : 3,
            borderRadius: 2,
            boxShadow: isMobile ? 'none' : theme.shadows[3]
          }}>
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                flexDirection: "row",
                width: "100%"
              }}
            >
              {/* Left: Avatar + Title */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    mr: 2,
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48
                  }}
                >
                  <BuildCircleIcon fontSize={isMobile ? "medium" : "large"} />
                </Avatar>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  component="h1"
                  fontWeight="bold"
                >
                  Maintenance Reports
                </Typography>
              </Box>

              {/* Right: Back Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{
                  textTransform: "none",
                  height: "40px",
                  minWidth: isMobile ? "auto" : "100px"
                }}
                size={isMobile ? "small" : "medium"}
              >
                Back
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />
            <Toolbar
              sx={{
                p: 0,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2
              }}
            >
              <TextField
                placeholder="Search by Reservation # or Issue"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: { xs: "100%", sm: "auto", flexGrow: 1, maxWidth: "500px" },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />

            </Toolbar>
            {/* Tabs */}


            <Box sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.08)'
              }
            }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile
                aria-label="Accommodation types"
                sx={{
                  '& .MuiTabs-indicator': {
                    height: 3,
                    backgroundColor: 'primary.main',
                    borderRadius: '3px 3px 0 0'
                  }
                }}
              >
                <Tab
                  label="All"
                  value="all"
                  sx={{
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    minHeight: 48,
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 600
                    }
                  }}
                />
                <Tab
                  label="Main Bungalow"
                  value="1"
                  sx={{
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    minHeight: 48,
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 600
                    }
                  }}
                />
                {/* <Tab
                  label="Lower Garden Suite"
                  value="2"
                  sx={{
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    minHeight: 48,
                    '&.Mui-selected': {
                      color: 'primary.main',
                      fontWeight: 600
                    }
                  }}
                /> */}
              </Tabs>
            </Box>



            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {loading ? (
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: '200px'
              }}>
                <CircularProgress size={isMobile ? 40 : 60} />
              </Box>
            ) : filteredData.length === 0 ? (
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                No maintenance reports found. {searchTerm && "Try adjusting your search."}
              </Alert>
            ) : (
              /* Data Table */
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  maxHeight: isMobile ? "calc(100vh - 300px)" : "calc(100vh - 250px)",
                  overflow: "auto",
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Table stickyHeader size={isMobile ? "small" : "medium"}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        py: isMobile ? 1 : 2
                      }}>
                        Bungalow
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        py: isMobile ? 1 : 2
                      }}>
                        Status
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        py: isMobile ? 1 : 2
                      }}>
                        Issue
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        py: isMobile ? 1 : 2
                      }}>
                        Guest/Rating
                      </TableCell>

                      <TableCell sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        py: isMobile ? 1 : 2,
                        display: isMobile ? 'none' : 'table-cell'
                      }}>
                        Comments
                      </TableCell>
                      <TableCell sx={{
                        fontWeight: "bold",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        py: isMobile ? 1 : 2
                      }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData.map((feedback) => (
                      <TableRow key={feedback.Feed_Id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <HomeWorkIcon fontSize="small" sx={{
                              mr: 1,
                              color: theme.palette.primary.main,
                              display: isMobile ? 'none' : 'block'
                            }} />
                            <Typography variant="body2" fontWeight="medium">
                              {bungalowTypeMap[feedback.Feed_Banglowid] || `Bungalow ${feedback.Feed_Banglowid}`}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={statusMap[feedback.Feed_MatStatus]?.label || feedback.Feed_MatStatus}
                            color={statusMap[feedback.Feed_MatStatus]?.color || "default"}
                            size="small"
                            icon={statusMap[feedback.Feed_MatStatus]?.icon}
                            sx={{
                              borderRadius: 1,
                              '& .MuiChip-icon': {
                                marginLeft: '4px'
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            title={feedback.Feed_MatReport || ""}
                            placement="top"
                            PopperProps={{
                              sx: {
                                '& .MuiTooltip-tooltip': {
                                  fontSize: theme.typography.pxToRem(14),
                                  maxWidth: '250px'
                                }
                              }
                            }}
                          >
                            <Typography variant="body2" noWrap>
                              <ReadMoreText text={feedback.Feed_MatReport || "N/A"} wordLimit={3} />
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={statusMap[feedback.Feed_Status]?.label || feedback.Feed_Status}
                            color={statusMap[feedback.Feed_Status]?.color || "default"}
                            size="small"
                            icon={statusMap[feedback.Feed_Status]?.icon}
                            sx={{
                              borderRadius: 1,
                              '& .MuiChip-icon': {
                                marginLeft: '4px'
                              }
                            }}
                          />
                        </TableCell>

                        <TableCell sx={{ display: isMobile ? 'none' : 'table-cell' }}>
                          <Typography variant="body2" noWrap>
                            {feedback.Feed_MatComm || "-"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(feedback)}
                            sx={{
                              backgroundColor: theme.palette.primary.lighter,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.light
                              }
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>

          {/* Update Maintenance Status Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
              sx: {
                borderRadius: isMobile ? 0 : 2
              }
            }}
          >
            <DialogTitle sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              py: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EditIcon />
                <Typography variant="h6">Update Maintenance Status</Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
              <Box sx={{ mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Reservation: #{selectedFeedback?.Res_no}
                </Typography>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
                  Maintenance Issue:
                </Typography>
                <Box sx={{
                  p: 2,
                  bgcolor: theme.palette.grey[100],
                  borderRadius: 2,
                  borderLeft: `4px solid ${theme.palette.primary.main}`
                }}>
                  <Typography variant="body1">
                    {selectedFeedback?.Feed_MatReport}
                  </Typography>
                </Box>

                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Status"
                  value={maintenanceStatus}
                  onChange={(e) => setMaintenanceStatus(e.target.value)}
                  variant="outlined"
                  sx={{ mt: 3 }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        sx: {
                          maxHeight: 300
                        }
                      }
                    }
                  }}
                >
                  <MenuItem value="A">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="Accept" color="info" size="small" icon={<AssignmentIcon />} />
                      Accept
                    </Box>
                  </MenuItem>
                  <MenuItem value="I">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="In Process" color="secondary" size="small" icon={<BuildCircleIcon />} />
                      In Process
                    </Box>
                  </MenuItem>
                  <MenuItem value="C">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label="Complete" color="success" size="small" icon={<CheckCircleIcon />} />
                      Complete
                    </Box>
                  </MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Maintenance Comments"
                  multiline
                  rows={isMobile ? 3 : 4}
                  value={maintenanceComment}
                  onChange={(e) => setMaintenanceComment(e.target.value)}
                  placeholder="Add comments about the maintenance performed..."
                  variant="outlined"
                  sx={{ mt: 2 }}
                  InputProps={{
                    sx: {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Button
                onClick={handleCloseDialog}
                disabled={isSubmitting}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  minWidth: 100
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdateMaintenance}
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                sx={{
                  borderRadius: 2,
                  minWidth: 150,
                  '&.Mui-disabled': {
                    backgroundColor: theme.palette.action.disabledBackground
                  }
                }}
              >
                {isSubmitting ? "Updating..." : "Update Status"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </div>
  );
};

export default MaintenancePage;