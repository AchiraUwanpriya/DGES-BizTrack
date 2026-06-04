// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
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
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   CircularProgress,
//   Divider,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Link,
//   Tabs,
//   Tab,
//   Grid,
//   Card,
//   CardContent,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   IconButton,
//   Fade,
//   Slide
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';

// import {
//   Refresh as RefreshIcon,
//   Search as SearchIcon,
//   Done as DoneIcon,
//   HomeWork as HomeWorkIcon,
//   FilterList as FilterListIcon,
//   CheckCircle as CheckCircleIcon,
//   HourglassEmpty as HourglassEmptyIcon,
//   CleaningServices as CleaningServicesIcon,
//   Inventory as InventoryIcon,
//   Visibility as VisibilityIcon,
//   ArrowBack as ArrowBackIcon,
//   Person as PersonIcon,
//   VerifiedUser as VerifiedUserIcon,
//   Close as CloseIcon,
//   Comment as CommentIcon,
//   Schedule as ScheduleIcon,
//   ThumbUp as ThumbUpIcon,
//   ThumbDown as ThumbDownIcon,
//   ExitToApp as ExitToAppIcon,
//   Assignment,
//   Error as ErrorIcon,
//   Warning as WarningIcon
// } from "@mui/icons-material";
// import CheckoutDialog from "../../components/Cards/CheckoutDialog";
// import {
//   fetchCaregiverData,
//   updateCheckStatus,
//   addCaretFeedback,
//   fetchCaretFeedbackDetails ,
//   updateCaretStatus
// } from "../../action/caregiverActions";

// // Import the new FeedbackDialog component
// import FeedbackDialog from "../../components/Cards/FeedbackDialog";

// const statusMap = {
//   "Confirm": { label: "Confirmed", color: "info", icon: <CheckCircleIcon fontSize="small" /> },
//   "Check In": { label: "Checked In", color: "success", icon: <DoneIcon fontSize="small" /> },
//   "Check Out": { label: "Checked Out", color: "primary", icon: <DoneIcon fontSize="small" /> },
//   "Pending": { label: "Pending", color: "warning", icon: <HourglassEmptyIcon fontSize="small" /> },
//   "I": { label: "Check In", color: "success", icon: <CheckCircleIcon fontSize="small" /> },
//   "O": { label: "Check Out", color: "primary", icon: <DoneIcon fontSize="small" /> },
//   "B": { label: "Maintenance Needed", color: "error", icon: <WarningIcon fontSize="small" /> },
// };

// const bungalowTypeMap = {
//   "1": "Main",
//   "2": "Family",
// };

// const CaregiverPage = () => {
//   const dispatch = useDispatch();
//   const {
//     loading,
//     data,
//     error,
//     feedbackData,
//     feedbackLoadingById,
//     feedbackErrorById
//   } = useSelector(state => state.caregiver);

//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showOnlyPending, setShowOnlyPending] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedReservation, setSelectedReservation] = useState(null);
//   const [caregiverStatus, setCaregiverStatus] = useState("");
//   const [caregiverComment, setCaregiverComment] = useState("");
//   const [feedbackType, setFeedbackType] = useState("good");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [tabValue, setTabValue] = useState('all');
//   const [viewMode, setViewMode] = useState('card');
//   const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
//   const [selectedFeedbackReservation, setSelectedFeedbackReservation] = useState(null);
//   const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
//   const [checkoutFeedbackType, setCheckoutFeedbackType] = useState("good");
//   const [checkoutComment, setCheckoutComment] = useState("");
//   const [validationError, setValidationError] = useState('');

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

//   const showAlert = (title, message, icon = 'success') => {
//     Swal.fire({
//       title,
//       text: message,
//       icon,
//       confirmButtonText: 'OK',
//       confirmButtonColor: theme.palette.primary.main,
//     });
//   };

//   const showErrorAlert = (message) => {
//     showAlert('Error', message, 'error');
//   };

//   const showSuccessAlert = (message) => {
//     showAlert('Success', message, 'success');
//   };

//   const showInfoAlert = (message) => {
//     showAlert('Information', message, 'info');
//   };

//   const showWarningAlert = (message) => {
//     showAlert('Warning', message, 'warning');
//   };

//   const ReadMoreText = ({ text, wordLimit = 20 }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     if (!text) return "N/A";

//     const words = text.split(' ');

//     if (words.length <= wordLimit) {
//       return text;
//     }

//     const toggleExpand = (e) => {
//       e.preventDefault();
//       setIsExpanded(!isExpanded);
//     };

//     return isExpanded ? (
//       <span>
//         {text}{' '}
//         <Link
//           href="#"
//           onClick={toggleExpand}
//           sx={{
//             color: '#1976d2',
//             fontSize: '11px',
//             fontWeight: 500,
//             ml: 0.5
//           }}
//         >
//           See less
//         </Link>
//       </span>
//     ) : (
//       <span>
//         {words.slice(0, wordLimit).join(' ')}{' '}
//         <Link
//           href="#"
//           onClick={toggleExpand}
//           sx={{
//             color: '#1976d2',
//             fontSize: '11px',
//             fontWeight: 500,
//             ml: 0.5
//           }}
//         >
//           See more
//         </Link>
//       </span>
//     );
//   };

//   useEffect(() => {
//     dispatch(fetchCaregiverData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       let filtered = [...data];

//       if (tabValue !== 'all') {
//         filtered = filtered.filter(item => item.Res_Bang_Id === tabValue);
//       }

//       if (searchTerm) {
//         filtered = filtered.filter(item =>
//           item.Res_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (item.Res_Guest_Name && item.Res_Guest_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (item.Res_Remarks && item.Res_Remarks.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       }

//       if (showOnlyPending) {
//         filtered = filtered.filter(item => item.Res_CheckStatus === "Pending");
//       }

//       setFilteredData(filtered);
//     }
//   }, [data, searchTerm, showOnlyPending, tabValue]);

//   const canUpdateStatus = (reservation) => {
//     const disallowedStatuses = ["Check Out", "O", "Completed", "Closed"];
//     // Allow checkout even if status is "B" (maintenance needed)
//     if (reservation.Res_CheckStatus === "B") {
//       return true;
//     }
//     return !disallowedStatuses.includes(reservation.Res_CheckStatus);
//   };

//   const canCheckout = (reservation) => {
//     const allowedStatuses = ["I", "Check In", "Confirm", "Pending", "B"];
//     return allowedStatuses.includes(reservation.Res_CheckStatus);
//   };

//   const handleOpenDialog = (reservation) => {
//     setSelectedReservation(reservation);
//     setCaregiverStatus(reservation.Res_CheckStatus === "Pending" ? "I" : reservation.Res_CheckStatus);
//     setCaregiverComment(reservation.Res_Remarks || "");
//     setFeedbackType("good");
//     setValidationError('');
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedReservation(null);
//     setCaregiverComment("");
//     setFeedbackType("good");
//     setValidationError('');
//   };

//   const validateForm = () => {
//     if (caregiverStatus === "O" && feedbackType === "bad" && !caregiverComment.trim()) {
//       setValidationError('Feedback is required when reporting issues with the bungalow.');
//       return false;
//     }

//     if (caregiverStatus === "O" && feedbackType === "bad" && caregiverComment.trim().length < 10) {
//       setValidationError('Please provide more detailed feedback about the issues (minimum 10 characters).');
//       return false;
//     }

//     setValidationError('');
//     return true;
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedReservation) return;

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       if (caregiverStatus === "I") {
//         await dispatch(updateCheckStatus(selectedReservation.Res_no, caregiverStatus));
//         showSuccessAlert("Guest successfully checked in!");
//       } else if (caregiverStatus === "O") {
//         if (feedbackType === "good") {
//           await dispatch(updateCheckStatus(selectedReservation.Res_no, caregiverStatus));
//           showSuccessAlert("Guest successfully checked out! Bungalow is in good condition.");
//         } else {
//           // For bad feedback, set status to "B" (maintenance needed)
//           await dispatch(addCaretFeedback(
//             selectedReservation.Res_no,
//             caregiverComment.trim(),
//             "B"
//           ));

//           // Also update the main status to "B"
//           await dispatch(updateCheckStatus(selectedReservation.Res_no, "B"));

//           showSuccessAlert("Feedback submitted successfully! Maintenance has been notified.");
//         }
//       }

//       handleCloseDialog();
//       dispatch(fetchCaregiverData());

//     } catch (error) {
//       console.error('Error updating status:', error);
//       showErrorAlert(`Error: ${error.message || 'Please try again.'}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewFeedback = async (reservationNo) => {
//     try {
//       if (!feedbackData[reservationNo]) {
//         await dispatch(fetchCaretFeedbackDetails(reservationNo));
//       }

//       setSelectedFeedbackReservation(reservationNo);
//       setFeedbackDialogOpen(true);

//     } catch (error) {
//       console.error('Error fetching feedback:', error);
//       showErrorAlert(`Error loading feedback: ${error.message || 'Please try again.'}`);
//     }
//   };

//   const handleCheckoutFromFeedback = () => {
//     setCheckoutDialogOpen(true);
//   };

//   const handleCheckoutSubmit = async () => {
//     if (!selectedFeedbackReservation) return;

//     // Validate only for bad feedback
//     if (checkoutFeedbackType === "bad") {
//       if (!checkoutComment.trim()) {
//         setValidationError('Feedback is required when reporting issues with the bungalow.');
//         return;
//       }

//       if (checkoutComment.trim().length < 10) {
//         setValidationError('Please provide more detailed feedback about the issues (minimum 10 characters).');
//         return;
//       }
//     }

//     setIsSubmitting(true);

//     try {
//       const feedbackItems = feedbackData[selectedFeedbackReservation];
//       const feedbackId = feedbackItems && feedbackItems.length > 0
//         ? feedbackItems[0].Feed_Id
//         : null;

//       if (checkoutFeedbackType === "good") {
//         // Good condition checkout
//         if (feedbackId) {
//           await dispatch(updateCaretStatus(feedbackId, "P", selectedFeedbackReservation));
//         }

//         // Update main status to "O" (Checked Out)
//         await dispatch(updateCheckStatus(selectedFeedbackReservation, "O"));
//         showSuccessAlert("Guest checked out successfully! Status updated.");

//       } else {
//         // Bad condition - needs maintenance
//         if (feedbackId) {
//           // Update existing feedback to "B" status
//           await dispatch(updateCaretStatus(feedbackId, "B", selectedFeedbackReservation));

//           // Add new feedback comment
//           await dispatch(addCaretFeedback(
//             selectedFeedbackReservation,
//             checkoutComment.trim(),
//             "B"
//           ));
//         } else {
//           // Create new feedback with "B" status
//           await dispatch(addCaretFeedback(
//             selectedFeedbackReservation,
//             checkoutComment.trim(),
//             "B"
//           ));
//         }

//         // Update main status to "B" (Maintenance Needed)
//         await dispatch(updateCheckStatus(selectedFeedbackReservation, "B"));
//         showSuccessAlert("Feedback submitted successfully! Status updated to Maintenance Needed.");
//       }

//       setCheckoutDialogOpen(false);
//       setFeedbackDialogOpen(false);
//       setCheckoutComment("");
//       setValidationError('');
//       dispatch(fetchCaregiverData());

//     } catch (error) {
//       console.error('Error updating status:', error);
//       showErrorAlert(`Error: ${error.message || 'Please try again.'}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePendingFilter = () => {
//     setShowOnlyPending(!showOnlyPending);
//   };

//   const handleRefresh = () => {
//     dispatch(fetchCaregiverData());
//     showInfoAlert('Data refreshed successfully!');
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'list' ? 'card' : 'list');
//   };

//   return (
//     <Box sx={{ p: isMobile ? 1 : 3 }}>
//       <Paper sx={{
//         p: isMobile ? 1 : 3,
//         borderRadius: 2,
//         boxShadow: isMobile ? 'none' : theme.shadows[3]
//       }}>
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 2,
//             flexDirection: isMobile ? "column" : "row",
//             width: "100%",
//             gap: isMobile ? 2 : 0
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               sx={{
//                 bgcolor: "primary.main",
//                 mr: 2,
//                 width: isMobile ? 40 : 48,
//                 height: isMobile ? 40 : 48
//               }}
//             >
//               <CleaningServicesIcon fontSize={isMobile ? "medium" : "large"} />
//             </Avatar>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h6" : "h5"}
//                 component="h1"
//                 fontWeight="bold"
//               >
//                 Bungalow Caretaker Portal
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Manage bungalow check-in and checkout operations
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap' }}>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleRefresh}
//               startIcon={<RefreshIcon />}
//               disabled={loading}
//               sx={{
//                 textTransform: "none",
//                 height: "40px"
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               Refresh
//             </Button>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={toggleViewMode}
//               startIcon={viewMode === 'list' ? <VisibilityIcon /> : <InventoryIcon />}
//               sx={{
//                 textTransform: "none",
//                 height: "40px"
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               {viewMode === 'list' ? 'Card View' : 'List View'}
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate(-1)}
//               startIcon={<ArrowBackIcon />}
//               sx={{
//                 textTransform: "none",
//                 height: "40px"
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               Back
//             </Button>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         {/* Tabs */}
//         <Box sx={{
//           borderBottom: 1,
//           borderColor: 'divider',
//           mb: 2
//         }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             variant={isMobile ? "scrollable" : "standard"}
//             scrollButtons={isMobile ? "auto" : false}
//             allowScrollButtonsMobile
//           >
//             <Tab
//               label={`All Bungalows (${data ? data.length : 0})`}
//               value="all"
//               sx={{ textTransform: 'none' }}
//             />
//             <Tab
//               label={`Main (${data ? data.filter(item => item.Res_Bang_Id === "1").length : 0})`}
//               value="1"
//               sx={{ textTransform: 'none' }}
//             />
//             <Tab
//               label={`Family (${data ? data.filter(item => item.Res_Bang_Id === "2").length : 0})`}
//               value="2"
//               sx={{ textTransform: 'none' }}
//             />
//           </Tabs>
//         </Box>

//         {error && (
//           <Box sx={{ mb: 3, p: 2, backgroundColor: '#ffebee', borderRadius: 2 }}>
//             <Typography variant="body1" color="error" gutterBottom>
//               Error
//             </Typography>
//             <Typography variant="body2" color="error">
//               {error}
//             </Typography>
//           </Box>
//         )}

//         {loading ? (
//           <Box sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             minHeight: '200px',
//             flexDirection: 'column',
//             gap: 2
//           }}>
//             <CircularProgress size={isMobile ? 40 : 60} />
//             <Typography variant="body2" color="text.secondary">
//               Loading bungalow data...
//             </Typography>
//           </Box>
//         ) : filteredData.length === 0 ? (
//           <Box sx={{ mb: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
//             <Typography variant="body1" color="info" gutterBottom>
//               No Results Found
//             </Typography>
//             <Typography variant="body2" color="info">
//               {searchTerm
//                 ? "No bungalows match your search criteria. Try adjusting your search terms."
//                 : showOnlyPending
//                   ? "No pending reservations found."
//                   : "No bungalow reservations found."
//               }
//             </Typography>
//           </Box>
//         ) : viewMode === 'list' ? (
//           /* List View */
//           <TableContainer
//             component={Paper}
//             sx={{
//               boxShadow: "none",
//               maxHeight: isMobile ? "calc(100vh - 400px)" : "calc(100vh - 350px)",
//               overflow: "auto",
//               borderRadius: 2,
//               border: `1px solid ${theme.palette.divider}`
//             }}
//           >
//             <Table stickyHeader size={isMobile ? "small" : "medium"}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Bungalow
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Status
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Guest
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Check-In/Out
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredData.map((reservation) => (
//                   <TableRow key={reservation.Res_no} hover>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <HomeWorkIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
//                         <Box>
//                           <Typography variant="body2" fontWeight="medium">
//                             {bungalowTypeMap[reservation.Res_Bang_Id] || `Bungalow ${reservation.Res_Bang_Id}`}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             #{reservation.Res_no}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Chip
//                         label={statusMap[reservation.Res_CheckStatus]?.label || reservation.Res_CheckStatus}
//                         color={statusMap[reservation.Res_CheckStatus]?.color || "default"}
//                         size="small"
//                         icon={statusMap[reservation.Res_CheckStatus]?.icon}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <PersonIcon fontSize="small" color="action" />
//                         <Typography variant="body2">
//                           {reservation.Res_Guest_Name || 'N/A'}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Box>
//                           <Typography variant="body2" fontSize="0.8rem">
//                             In: {reservation.Res_Check_In}
//                           </Typography>
//                           <Typography variant="body2" fontSize="0.8rem">
//                             Out: {reservation.Res_Check_Out}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
//                         <Button
//                           variant="contained"
//                           size="small"
//                           onClick={() => handleOpenDialog(reservation)}
//                           startIcon={<PersonIcon />}
//                           disabled={!canCheckout(reservation)}
//                           sx={{ textTransform: "none", borderRadius: 2 }}
//                         >
//                           Check In/Out
//                         </Button>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           onClick={() => handleViewFeedback(reservation.Res_no)}
//                           startIcon={<VisibilityIcon />}
//                           sx={{ textTransform: "none", borderRadius: 2 }}
//                         >
//                           Feedback
//                         </Button>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           /* Card View */
//           <Grid container spacing={2}>
//             {filteredData.map((reservation) => (
//               <Grid item xs={12} sm={6} md={4} key={reservation.Res_no}>
//                 <Card sx={{
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   border: reservation.Res_CheckStatus === "Pending" ? '2px solid #ed6c02' :
//                           reservation.Res_CheckStatus === "B" ? '2px solid #d32f2f' : '1px solid #e0e0e0'
//                 }}>
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <HomeWorkIcon color="primary" sx={{ mr: 1 }} />
//                         <Typography variant="h6" component="h2">
//                           {bungalowTypeMap[reservation.Res_Bang_Id] || `Bungalow ${reservation.Res_Bang_Id}`}
//                         </Typography>
//                       </Box>
//                       <Chip
//                         label={statusMap[reservation.Res_CheckStatus]?.label || reservation.Res_CheckStatus}
//                         color={statusMap[reservation.Res_CheckStatus]?.color || "default"}
//                         size="small"
//                         icon={statusMap[reservation.Res_CheckStatus]?.icon}
//                       />
//                     </Box>

//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Reservation: #{reservation.Res_no}
//                     </Typography>

//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                       <PersonIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.secondary">
//                         Guest: {reservation.Res_Guest_Name || 'N/A'}
//                       </Typography>
//                     </Box>

//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                       <ScheduleIcon fontSize="small" color="action" />
//                       <Box>
//                         <Typography variant="body2" color="text.secondary">
//                           Check-In: {reservation.Res_Check_In}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Check-Out: {reservation.Res_Check_Out}
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {reservation.Res_Remarks && (
//                       <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
//                         <CommentIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
//                         <Typography variant="body2" sx={{ mt: 0.5 }}>
//                           <ReadMoreText text={reservation.Res_Remarks} wordLimit={10} />
//                         </Typography>
//                       </Box>
//                     )}
//                   </CardContent>

//                   <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
//                     <Button
//                       variant="contained"
//                       size="small"
//                       onClick={() => handleOpenDialog(reservation)}
//                       startIcon={<PersonIcon />}
//                       disabled={!canCheckout(reservation)}
//                       sx={{ textTransform: "none", borderRadius: 2 }}
//                     >
//                       Check In/Out
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleViewFeedback(reservation.Res_no)}
//                       startIcon={<VisibilityIcon />}
//                       sx={{ textTransform: "none", borderRadius: 2 }}
//                     >
//                       View Feedback
//                     </Button>
//                   </Box>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Paper>

//       {/* Status Update Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//       >
//         <DialogTitle sx={{
//           backgroundColor: theme.palette.primary.main,
//           color: 'white',
//           py: 2,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <PersonIcon />
//             <Typography variant="h6">Update Reservation Status</Typography>
//           </Box>
//           {isMobile && (
//             <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
//               <CloseIcon />
//             </IconButton>
//           )}
//         </DialogTitle>

//         <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
//           {selectedReservation && (
//             <Box sx={{ mt: 1 }}>
//               <Paper sx={{ p: 2, mb: 3, backgroundColor: 'grey.50' }}>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   Reservation Details
//                 </Typography>

//                 <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Reservation Number
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       #{selectedReservation.Res_no}
//                     </Typography>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Bungalow
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       {bungalowTypeMap[selectedReservation.Res_Bang_Id]} Bungalow
//                     </Typography>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Guest Name
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       {selectedReservation.Res_Guest_Name || 'N/A'}
//                     </Typography>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Current Status
//                     </Typography>
//                     <Chip
//                       label={statusMap[selectedReservation.Res_CheckStatus]?.label || selectedReservation.Res_CheckStatus}
//                       color={statusMap[selectedReservation.Res_CheckStatus]?.color || "default"}
//                       size="small"
//                       icon={statusMap[selectedReservation.Res_CheckStatus]?.icon}
//                       sx={{ mt: 0.5 }}
//                     />
//                   </Box>
//                 </Box>
//               </Paper>

//               {validationError && (
//                 <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
//                   <Typography variant="body2" color="error">
//                     {validationError}
//                   </Typography>
//                 </Box>
//               )}

//               <TextField
//                 select
//                 fullWidth
//                 margin="normal"
//                 label="Update Status"
//                 value={caregiverStatus}
//                 onChange={(e) => setCaregiverStatus(e.target.value)}
//                 variant="outlined"
//                 sx={{ mt: 2 }}
//                 helperText={
//                   selectedReservation?.Res_CheckStatus === "B"
//                     ? "Bungalow requires maintenance. You can still proceed with checkout."
//                     : "Select the appropriate action for this reservation"
//                 }
//               >
//                 <MenuItem value="I">
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
//                     <CheckCircleIcon color="success" />
//                     <Box>
//                       <Typography variant="body2" fontWeight="medium">
//                         Check In Guest
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Guest is arriving and entering the bungalow
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </MenuItem>
//                 <MenuItem value="O">
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
//                     <DoneIcon color="primary" />
//                     <Box>
//                       <Typography variant="body2" fontWeight="medium">
//                         Check Out Guest
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Guest is leaving the bungalow
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </MenuItem>
//               </TextField>

//               {caregiverStatus === "O" && (
//                 <Box sx={{ mt: 3 }}>
//                   <Paper sx={{ p: 2, border: '1px solid', borderColor: 'primary.main', backgroundColor: 'grey.100' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                       <CommentIcon color="primary" />
//                       <Typography variant="subtitle2" color="primary.dark">
//                         Bungalow Condition After Checkout
//                       </Typography>
//                     </Box>

//                     <FormControl component="fieldset" sx={{ mb: 2 }}>
//                       <FormLabel component="legend">How is the bungalow condition?</FormLabel>
//                       <RadioGroup
//                         value={feedbackType}
//                         onChange={(e) => setFeedbackType(e.target.value)}
//                         row
//                       >
//                         <FormControlLabel
//                           value="good"
//                           control={<Radio />}
//                           label={
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                               <ThumbUpIcon color="success" fontSize="small" />
//                               <Typography variant="body2">Checked out without any issue</Typography>
//                             </Box>
//                           }
//                         />
//                         <FormControlLabel
//                           value="bad"
//                           control={<Radio />}
//                           label={
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                               <ThumbDownIcon color="error" fontSize="small" />
//                               <Typography variant="body2">Checked out with some issues</Typography>
//                             </Box>
//                           }
//                         />
//                       </RadioGroup>
//                     </FormControl>

//                     {feedbackType === "bad" && (
//                       <>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                           Please provide detailed feedback about the bungalow condition,
//                           cleanliness, and any issues that need attention for maintenance.
//                         </Typography>

//                         <TextField
//                           fullWidth
//                           label="Bungalow Issues & Feedback *"
//                           multiline
//                           rows={4}
//                           value={caregiverComment}
//                           onChange={(e) => setCaregiverComment(e.target.value)}
//                           placeholder="Example: Damage to table, broken lamp, stained carpet, etc."
//                           variant="outlined"
//                           required
//                           error={!!validationError}
//                           helperText={
//                             validationError
//                               ? validationError
//                               : `${caregiverComment.length}/500 characters`
//                           }
//                           inputProps={{ maxLength: 500 }}
//                           sx={{
//                             backgroundColor: 'white',
//                             '& .MuiInputBase-root': {
//                               backgroundColor: 'white'
//                             }
//                           }}
//                         />
//                       </>
//                     )}
//                   </Paper>
//                 </Box>
//               )}
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}`, gap: 1 }}>
//           <Button
//             onClick={handleCloseDialog}
//             disabled={isSubmitting}
//             variant="outlined"
//             sx={{ borderRadius: 2, minWidth: 100, textTransform: 'none' }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleUpdateStatus}
//             disabled={isSubmitting || !caregiverStatus}
//             startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <VerifiedUserIcon />}
//             sx={{
//               borderRadius: 2,
//               minWidth: 150,
//               textTransform: 'none',
//               '&.Mui-disabled': { backgroundColor: theme.palette.action.disabledBackground }
//             }}
//           >
//             {isSubmitting
//               ? "Processing..."
//               : caregiverStatus === "I"
//                 ? "Confirm Check-In"
//                 : caregiverStatus === "O"
//                   ? feedbackType === "good"
//                     ? "Confirm Check-Out"
//                     : "Submit Feedback"
//                   : "Update Status"
//             }
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <FeedbackDialog
//         open={feedbackDialogOpen}
//         onClose={() => setFeedbackDialogOpen(false)}
//         reservationNo={selectedFeedbackReservation}
//         data={data}
//         feedbackData={feedbackData}
//         feedbackLoadingById={feedbackLoadingById}
//         feedbackErrorById={feedbackErrorById}
//         onCheckout={handleCheckoutFromFeedback}
//         theme={theme}
//       />

//       {/* Checkout Dialog */}
//       <CheckoutDialog
//         open={checkoutDialogOpen}
//         onClose={() => {
//           setCheckoutDialogOpen(false);
//           setValidationError('');
//         }}
//         reservationNo={selectedFeedbackReservation}
//         checkoutFeedbackType={checkoutFeedbackType}
//         setCheckoutFeedbackType={setCheckoutFeedbackType}
//         checkoutComment={checkoutComment}
//         setCheckoutComment={setCheckoutComment}
//         validationError={validationError}
//         setValidationError={setValidationError}
//         isSubmitting={isSubmitting}
//         handleCheckoutSubmit={handleCheckoutSubmit}
//         theme={theme}
//         isMobile={isMobile}
//       />
//     </Box>
//   );
// };

// export default CaregiverPage;

//-----------------------------------------------------2026-01-05-----------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
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
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   CircularProgress,
//   Divider,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Link,
//   Tabs,
//   Tab,
//   Grid,
//   Card,
//   CardContent,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   FormLabel,
//   IconButton,
//   Fade,
//   Slide
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import Loader from "../../components/Utility/Loader";

// import {
//   Refresh as RefreshIcon,
//   Search as SearchIcon,
//   Done as DoneIcon,
//   HomeWork as HomeWorkIcon,
//   FilterList as FilterListIcon,
//   CheckCircle as CheckCircleIcon,
//   HourglassEmpty as HourglassEmptyIcon,
//   CleaningServices as CleaningServicesIcon,
//   Inventory as InventoryIcon,
//   Visibility as VisibilityIcon,
//   ArrowBack as ArrowBackIcon,
//   Person as PersonIcon,
//   VerifiedUser as VerifiedUserIcon,
//   Close as CloseIcon,
//   Comment as CommentIcon,
//   Schedule as ScheduleIcon,
//   ThumbUp as ThumbUpIcon,
//   ThumbDown as ThumbDownIcon,
//   ExitToApp as ExitToAppIcon,
//     Assignment,
//   Error as ErrorIcon,
//   Warning as WarningIcon
// } from "@mui/icons-material";
//  import CheckoutDialog from "../../components/Cards/CheckoutDialog";
// import {
//   fetchCaregiverData,
//   updateCheckStatus,
//   addCaretFeedback,
//   fetchCaretFeedbackDetails ,
//   updateCaretStatus
// } from "../../action/caregiverActions";

// import FeedbackDialog from "../../components/Cards/FeedbackDialog";

// const statusMap = {
//   "Confirm": { label: "Confirmed", color: "info", icon: <CheckCircleIcon fontSize="small" /> },
//   "Check In": { label: "Checked In", color: "success", icon: <DoneIcon fontSize="small" /> },
//   "Check Out": { label: "Checked Out", color: "primary", icon: <DoneIcon fontSize="small" /> },
//   "Pending": { label: "Pending", color: "warning", icon: <HourglassEmptyIcon fontSize="small" /> },
//   "I": { label: "Check In", color: "success", icon: <CheckCircleIcon fontSize="small" /> },
//   "O": { label: "Check Out", color: "primary", icon: <DoneIcon fontSize="small" /> },
//   "B": { label: "Maintenance Needed", color: "error", icon: <WarningIcon fontSize="small" /> },
// };

// const bungalowTypeMap = {
//   "1": "Main",
//   "2": "Lower Garden Suite",
// };

// const bungalowCapacity = {
//   "1": {
//     maxAdults: 12,
//     maxChildren: 12,
//     totalCapacity: 12
//   },
//   "2": {
//     maxAdults: 5,
//     maxChildren: 5,
//     totalCapacity: 5
//   }
// };

// const CaregiverPage = () => {
//   const dispatch = useDispatch();
//   const {
//     loading,
//     data,
//     error,
//     feedbackData,
//     feedbackLoadingById,
//     feedbackErrorById
//   } = useSelector(state => state.caregiver);

//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showOnlyPending, setShowOnlyPending] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedReservation, setSelectedReservation] = useState(null);
//   const [caregiverStatus, setCaregiverStatus] = useState("");
//   const [caregiverComment, setCaregiverComment] = useState("");
//   const [feedbackType, setFeedbackType] = useState("good");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [tabValue, setTabValue] = useState('all');
//   const [viewMode, setViewMode] = useState('card');
//   const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
//   const [selectedFeedbackReservation, setSelectedFeedbackReservation] = useState(null);
//   const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
//   const [checkoutFeedbackType, setCheckoutFeedbackType] = useState("good");
//   const [checkoutComment, setCheckoutComment] = useState("");
//   const [validationError, setValidationError] = useState('');
//   const [capacityError, setCapacityError] = useState('');
// const [isLoading, setIsLoading] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const navigate = useNavigate();

//   const showAlert = (title, message, icon = 'success') => {
//     Swal.fire({
//       title,
//       text: message,
//       icon,
//       confirmButtonText: 'OK',
//       confirmButtonColor: theme.palette.primary.main,
//     });
//   };

//   const showErrorAlert = (message) => {
//     showAlert('Error', message, 'error');
//   };

//   const showSuccessAlert = (message) => {
//     showAlert('Success', message, 'success');
//   };

//   const showInfoAlert = (message) => {
//     showAlert('Information', message, 'info');
//   };

//   const showWarningAlert = (message) => {
//     showAlert('Warning', message, 'warning');
//   };

//   const validateCapacity = (reservation) => {
//     if (!reservation) return { isValid: true, error: '' };

//     const bungalowId = reservation.Res_Bang_Id;
//     const capacityConfig = bungalowCapacity[bungalowId];

//     if (!capacityConfig) {
//       return { isValid: true, error: '' };
//     }

//     const adultsCount = reservation.Res_AdultCount || reservation.Res_AdultCount || 0;
//     const childrenCount = reservation.Res_ChildCount || reservation.Res_ChildCount || 0;
//     const totalGuests = adultsCount + childrenCount;

//     // Check individual limits
//     if (adultsCount > capacityConfig.maxAdults) {
//       return {
//         isValid: false,
//         error: `Main Bungalow maximum is ${capacityConfig.maxAdults} adults. Current: ${adultsCount} adults.`
//       };
//     }

//     if (childrenCount > capacityConfig.maxChildren) {
//       return {
//         isValid: false,
//         error: `Main Bungalow maximum is ${capacityConfig.maxChildren} children. Current: ${childrenCount} children.`
//       };
//     }

//     // Check total capacity
//     if (totalGuests > capacityConfig.totalCapacity) {
//       return {
//         isValid: false,
//         error: `${bungalowTypeMap[bungalowId]} maximum capacity is ${capacityConfig.totalCapacity} guests. Current: ${totalGuests} guests.`
//       };
//     }

//     return { isValid: true, error: '' };
//   };

//   const ReadMoreText = ({ text, wordLimit = 20 }) => {
//     const [isExpanded, setIsExpanded] = useState(false);

//     if (!text) return "N/A";

//     const words = text.split(' ');

//     if (words.length <= wordLimit) {
//       return text;
//     }

//     const toggleExpand = (e) => {
//       e.preventDefault();
//       setIsExpanded(!isExpanded);
//     };

//     return isExpanded ? (
//       <span>
//         {text}{' '}
//         <Link
//           href="#"
//           onClick={toggleExpand}
//           sx={{
//             color: '#1976d2',
//             fontSize: '11px',
//             fontWeight: 500,
//             ml: 0.5
//           }}
//         >
//           See less
//         </Link>
//       </span>
//     ) : (
//       <span>
//         {words.slice(0, wordLimit).join(' ')}{' '}
//         <Link
//           href="#"
//           onClick={toggleExpand}
//           sx={{
//             color: '#1976d2',
//             fontSize: '11px',
//             fontWeight: 500,
//             ml: 0.5
//           }}
//         >
//           See more
//         </Link>
//       </span>
//     );
//   };

//   useEffect(() => {
//     dispatch(fetchCaregiverData());
//   }, [dispatch]);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       let filtered = [...data];

//       if (tabValue !== 'all') {
//         filtered = filtered.filter(item => item.Res_Bang_Id === tabValue);
//       }

//       if (searchTerm) {
//         filtered = filtered.filter(item =>
//           item.Res_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (item.Res_Guest_Name && item.Res_Guest_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (item.Res_Remarks && item.Res_Remarks.toLowerCase().includes(searchTerm.toLowerCase()))
//         );
//       }

//       if (showOnlyPending) {
//         filtered = filtered.filter(item => item.Res_CheckStatus === "Pending");
//       }

//       setFilteredData(filtered);
//     }
//   }, [data, searchTerm, showOnlyPending, tabValue]);

//   const handleOpenDialog = (reservation) => {
//     setSelectedReservation(reservation);

//     if (reservation.Res_CheckStatus === "Pending" || reservation.Res_CheckStatus === "Confirm") {
//       setCaregiverStatus("I");
//     } else if (reservation.Res_CheckStatus === "Check In" || reservation.Res_CheckStatus === "I") {
//       setCaregiverStatus("O");
//     } else {
//       setCaregiverStatus(reservation.Res_CheckStatus);
//     }

//     setCaregiverComment(reservation.Res_Remarks || "");
//     setFeedbackType("good");
//     setValidationError('');
//     setCapacityError('');
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedReservation(null);
//     setCaregiverComment("");
//     setFeedbackType("good");
//     setValidationError('');
//     setCapacityError('');
//   };

//   const validateForm = () => {
//     if (caregiverStatus === "I") {
//       const capacityValidation = validateCapacity(selectedReservation);
//       if (!capacityValidation.isValid) {
//         setCapacityError(capacityValidation.error);
//         return false;
//       }
//     }

//     setValidationError('');
//     setCapacityError('');
//     return true;
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedReservation) return;

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       if (caregiverStatus === "I") {
//         await dispatch(updateCheckStatus(selectedReservation.Res_no, caregiverStatus));
//         showSuccessAlert("Guest successfully checked in!");
//       } else if (caregiverStatus === "O") {
//         if (feedbackType === "good") {
//           await dispatch(updateCheckStatus(selectedReservation.Res_no, caregiverStatus));
//           showSuccessAlert("Guest successfully checked out! Bungalow is in good condition.");
//         } else {
//           await dispatch(addCaretFeedback(
//             selectedReservation.Res_no,
//           // caregiverComment.trim(),
//             "B"
//           ));
//           await dispatch(updateCheckStatus(selectedReservation.Res_no, "O"));
//           showSuccessAlert("Guest checked out and maintenance feedback submitted!");
//         }
//       }

//       handleCloseDialog();
//       dispatch(fetchCaregiverData());

//     } catch (error) {
//       console.error('Error updating status:', error);
//       showErrorAlert(`Error: ${error.message || 'Please try again.'}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleViewFeedback = async (reservationNo) => {
//     try {
//       if (!feedbackData[reservationNo]) {
//         await dispatch(fetchCaretFeedbackDetails(reservationNo));
//       }

//       setSelectedFeedbackReservation(reservationNo);
//       setFeedbackDialogOpen(true);

//     } catch (error) {
//       console.error('Error fetching feedback:', error);
//       showErrorAlert(`Error loading feedback: ${error.message || 'Please try again.'}`);
//     }
//   };

//   const handleCheckoutFromFeedback = () => {
//     setCheckoutDialogOpen(true);
//   };

//   const handleCheckoutSubmit = async () => {
//     if (!selectedFeedbackReservation) return;

//     if (checkoutFeedbackType === "bad") {
//       if (!checkoutComment.trim()) {
//         setValidationError('Feedback is required when reporting issues with the bungalow.');
//         return;
//       }

//       if (checkoutComment.trim().length < 10) {
//         setValidationError('Please provide more detailed feedback about the issues (minimum 10 characters).');
//         return;
//       }
//     }

//     setIsSubmitting(true);

//     try {

//       const currentReservation = data.find(item => item.Res_no === selectedFeedbackReservation);

//       if (checkoutFeedbackType === "good") {

//         await dispatch(updateCheckStatus(selectedFeedbackReservation, "O"));
//         showSuccessAlert("Guest checked out successfully! Bungalow is in good condition.");
//       } else {

//         await dispatch(addCaretFeedback(
//           selectedFeedbackReservation,
//           checkoutComment.trim(),
//           "B"
//         ));

//         await dispatch(updateCheckStatus(selectedFeedbackReservation, "O"));
//         showSuccessAlert("Guest checked out and maintenance feedback submitted!");
//       }

//       setCheckoutDialogOpen(false);
//       setFeedbackDialogOpen(false);
//       setCheckoutComment("");
//       setValidationError('');
//       dispatch(fetchCaregiverData());

//     } catch (error) {
//       console.error('Error updating status:', error);
//       showErrorAlert(`Error: ${error.message || 'Please try again.'}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePendingFilter = () => {
//     setShowOnlyPending(!showOnlyPending);
//   };

//   const handleRefresh = () => {
//     dispatch(fetchCaregiverData());
//     showInfoAlert('Data refreshed successfully!');
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const toggleViewMode = () => {
//     setViewMode(viewMode === 'list' ? 'card' : 'list');
//   };

//   const canUpdateStatus = (reservation) => {
//     const disallowedStatuses = ["Check Out", "O", "Completed", "Closed"];
//     return !disallowedStatuses.includes(reservation.Res_CheckStatus);
//   };

//   const shouldShowCheckoutInFeedback = (reservationNo) => {
//     if (!reservationNo || !data) return false;

//     const reservation = data.find(item => item.Res_no === reservationNo);
//     if (!reservation) return false;

//     const allowedStatuses = ["Check In", "I", "Pending", "Confirm", "B"];
//     return allowedStatuses.includes(reservation.Res_CheckStatus);
//   };

//   const getCurrentReservation = () => {
//     if (!selectedFeedbackReservation || !data) return null;
//     return data.find(item => item.Res_no === selectedFeedbackReservation);
//   };

//   const getGuestCounts = (reservation) => {
//     const adults = reservation.Res_Adults || reservation.Res_No_Adults || 0;
//     const children = reservation.Res_Children || reservation.Res_No_Children || 0;
//     return { adults, children, total: adults + children };
//   };

//   return (
//      <div>

//       {isLoading ? (
//         <Loader />
//       ) : (
//     <Box sx={{ p: isMobile ? 1 : 3 }}>
//       <Paper sx={{
//         p: isMobile ? 1 : 3,
//         borderRadius: 2,
//         boxShadow: isMobile ? 'none' : theme.shadows[3]
//       }}>
//         {/* Header Section */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 2,
//             flexDirection: isMobile ? "column" : "row",
//             width: "100%",
//             gap: isMobile ? 2 : 0
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               sx={{
//                 bgcolor: "primary.main",
//                 mr: 2,
//                 width: isMobile ? 40 : 48,
//                 height: isMobile ? 40 : 48
//               }}
//             >
//               <CleaningServicesIcon fontSize={isMobile ? "medium" : "large"} />
//             </Avatar>
//             <Box>
//               <Typography
//                 variant={isMobile ? "h6" : "h5"}
//                 component="h1"
//                 fontWeight="bold"
//               >
//                 Bungalow Caretaker Portal
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Manage bungalow check-in and checkout operations
//               </Typography>
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap' }}>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={handleRefresh}
//               startIcon={<RefreshIcon />}
//               disabled={loading}
//               sx={{
//                 textTransform: "none",
//                 height: "40px"
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               Refresh
//             </Button>
//             <Button
//               variant="outlined"
//               color="primary"
//               onClick={toggleViewMode}
//               startIcon={viewMode === 'list' ? <VisibilityIcon /> : <InventoryIcon />}
//               sx={{
//                 textTransform: "none",
//                 height: "40px"
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               {viewMode === 'list' ? 'Card View' : 'List View'}
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => navigate(-1)}
//               startIcon={<ArrowBackIcon />}
//               sx={{
//                 textTransform: "none",
//                 height: "40px"
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               Back
//             </Button>
//           </Box>
//         </Box>

//         <Divider sx={{ mb: 3 }} />

//         {/* Tabs */}
//         <Box sx={{
//           borderBottom: 1,
//           borderColor: 'divider',
//           mb: 2
//         }}>
//           <Tabs
//             value={tabValue}
//             onChange={handleTabChange}
//             variant={isMobile ? "scrollable" : "standard"}
//             scrollButtons={isMobile ? "auto" : false}
//             allowScrollButtonsMobile
//           >
//             <Tab
//               label={`All Bungalows (${data ? data.length : 0})`}
//               value="all"
//               sx={{ textTransform: 'none' }}
//             />
//             <Tab
//               label={`Main (${data ? data.filter(item => item.Res_Bang_Id === "1").length : 0})`}
//               value="1"
//               sx={{ textTransform: 'none' }}
//             />
//             <Tab
//               label={`Lower Garden Suite (${data ? data.filter(item => item.Res_Bang_Id === "2").length : 0})`}
//               value="2"
//               sx={{ textTransform: 'none' }}
//             />
//           </Tabs>
//         </Box>

//         {error && (
//           <Box sx={{ mb: 3, p: 2, backgroundColor: '#ffebee', borderRadius: 2 }}>
//             <Typography variant="body1" color="error" gutterBottom>
//               Error
//             </Typography>
//             <Typography variant="body2" color="error">
//               {error}
//             </Typography>
//           </Box>
//         )}

//         {loading ? (
//           <Box sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             minHeight: '200px',
//             flexDirection: 'column',
//             gap: 2
//           }}>
//             <CircularProgress size={isMobile ? 40 : 60} />
//             <Typography variant="body2" color="text.secondary">
//               Loading bungalow data...
//             </Typography>
//           </Box>
//         ) : filteredData.length === 0 ? (
//           <Box sx={{ mb: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
//             <Typography variant="body1" color="info" gutterBottom>
//               No Results Found
//             </Typography>
//             <Typography variant="body2" color="info">
//               {searchTerm
//                 ? "No bungalows match your search criteria. Try adjusting your search terms."
//                 : showOnlyPending
//                   ? "No pending reservations found."
//                   : "No bungalow reservations found."
//               }
//             </Typography>
//           </Box>
//         ) : viewMode === 'list' ? (
//           /* List View */
//           <TableContainer
//             component={Paper}
//             sx={{
//               boxShadow: "none",
//               maxHeight: isMobile ? "calc(100vh - 400px)" : "calc(100vh - 350px)",
//               overflow: "auto",
//               borderRadius: 2,
//               border: `1px solid ${theme.palette.divider}`
//             }}
//           >
//             <Table stickyHeader size={isMobile ? "small" : "medium"}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Bungalow
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Status
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Guest
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Guest Count
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Check-In/Out
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredData.map((reservation) => {
//                   const guestCounts = getGuestCounts(reservation);
//                   const capacityConfig = bungalowCapacity[reservation.Res_Bang_Id];
//                   const isOverCapacity = guestCounts.total > (capacityConfig?.totalCapacity || 0);

//                   return (
//                     <TableRow
//                       key={reservation.Res_no}
//                       hover
//                       sx={{
//                         backgroundColor: isOverCapacity ? '#ffebee' : 'inherit'
//                       }}
//                     >
//                       <TableCell>
//                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                           <HomeWorkIcon fontSize="small" sx={{ mr: 1, color: theme.palette.primary.main }} />
//                           <Box>
//                             <Typography variant="body2" fontWeight="medium">
//                               {bungalowTypeMap[reservation.Res_Bang_Id] || `Bungalow ${reservation.Res_Bang_Id}`}
//                             </Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               #{reservation.Res_no}
//                             </Typography>
//                             {isOverCapacity && (
//                               <Typography variant="caption" color="error" display="block">
//                                 Over Capacity!
//                               </Typography>
//                             )}
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Chip
//                           label={statusMap[reservation.Res_CheckStatus]?.label || reservation.Res_CheckStatus}
//                           color={statusMap[reservation.Res_CheckStatus]?.color || "default"}
//                           size="small"
//                           icon={statusMap[reservation.Res_CheckStatus]?.icon}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <PersonIcon fontSize="small" color="action" />
//                           <Typography variant="body2">
//                             {reservation.Res_Guest_Name || 'N/A'}
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box>
//                           <Typography variant="body2" fontSize="0.8rem">
//                             Adults:{reservation.Res_AdultCount}
//                           </Typography>
//                           <Typography variant="body2" fontSize="0.8rem">
//                             Children: {reservation.Res_ChildCount}
//                           </Typography>
//                           <Typography variant="body2" fontSize="0.8rem" fontWeight="bold">
//                             Total:
//                           </Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Box>
//                             <Typography variant="body2" fontSize="0.8rem">
//                               In: {reservation.Res_Check_In}
//                             </Typography>
//                             <Typography variant="body2" fontSize="0.8rem">
//                               Out: {reservation.Res_Check_Out}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={() => handleOpenDialog(reservation)}
//                             startIcon={<PersonIcon />}
//                             disabled={!canUpdateStatus(reservation)}
//                             sx={{ textTransform: "none", borderRadius: 2 }}
//                           >
//                             {reservation.Res_CheckStatus === "Check In" || reservation.Res_CheckStatus === "I" ? "Check Out" : "Check In"}
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             onClick={() => handleViewFeedback(reservation.Res_no)}
//                             startIcon={<VisibilityIcon />}
//                             sx={{ textTransform: "none", borderRadius: 2 }}
//                           >
//                             Feedback
//                           </Button>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         ) : (
//           /* Card View */
//           <Grid container spacing={2}>
//             {filteredData.map((reservation) => {
//               const guestCounts = getGuestCounts(reservation);
//               const capacityConfig = bungalowCapacity[reservation.Res_Bang_Id];
//               const isOverCapacity = guestCounts.total > (capacityConfig?.totalCapacity || 0);

//               return (
//                 <Grid item xs={12} sm={6} md={4} key={reservation.Res_no}>
//                   <Card sx={{
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     border: isOverCapacity ? '2px solid #f44336' :
//                             reservation.Res_CheckStatus === "Pending" ? '2px solid #ed6c02' : '1px solid #e0e0e0',
//                     borderColor: reservation.Res_CheckStatus === "B" ? 'error.main' : undefined
//                   }}>
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                           <HomeWorkIcon color="primary" sx={{ mr: 1 }} />
//                           <Typography variant="h6" component="h2">
//                             {bungalowTypeMap[reservation.Res_Bang_Id] || `Bungalow ${reservation.Res_Bang_Id}`}
//                           </Typography>
//                         </Box>
//                         <Chip
//                           label={statusMap[reservation.Res_CheckStatus]?.label || reservation.Res_CheckStatus}
//                           color={statusMap[reservation.Res_CheckStatus]?.color || "default"}
//                           size="small"
//                           icon={statusMap[reservation.Res_CheckStatus]?.icon}
//                         />
//                       </Box>

//                       <Typography variant="body2" color="text.secondary" gutterBottom>
//                         Reservation: #{reservation.Res_no}
//                       </Typography>

//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                         <PersonIcon fontSize="small" color="action" />
//                         <Typography variant="body2" color="text.secondary">
//                           Guest: {reservation.Res_Guest_Name || 'N/A'}
//                         </Typography>
//                       </Box>

//                       {/* Guest Counts */}
//                       <Box sx={{ mb: 2, p: 1, backgroundColor: isOverCapacity ? '#ffebee' : '#f5f5f5', borderRadius: 1 }}>
//                         <Typography variant="subtitle2" color={isOverCapacity ? 'error' : 'text.secondary'} gutterBottom>
//                           Guest Count:
//                         </Typography>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                           <Typography variant="body2">
//                             Adults: {reservation.Res_AdultCount}
//                           </Typography>
//                           <Typography variant="body2">
//                             Children: {reservation.Res_ChildCount}
//                           </Typography>
//                           <Typography variant="body2" fontWeight="bold">
//                             Total: {Number(reservation.Res_AdultCount) + Number(reservation.Res_ChildCount)}
//                           </Typography>
//                         </Box>
//                         {isOverCapacity && (
//                           <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
//                             ⚠️ Over capacity! Max: {capacityConfig?.totalCapacity}
//                           </Typography>
//                         )}
//                       </Box>

//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                         <ScheduleIcon fontSize="small" color="action" />
//                         <Box>
//                           <Typography variant="body2" color="text.secondary">
//                             Check-In: {reservation.Res_Check_In}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             Check-Out: {reservation.Res_Check_Out}
//                           </Typography>
//                         </Box>
//                       </Box>

//                       {reservation.Res_Remarks && (
//                         <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
//                           <CommentIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
//                           <Typography variant="body2" sx={{ mt: 0.5 }}>
//                             <ReadMoreText text={reservation.Res_Remarks} wordLimit={10} />
//                           </Typography>
//                         </Box>
//                       )}
//                     </CardContent>

//                     <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
//                       <Button
//                         variant="contained"
//                         size="small"
//                         onClick={() => handleOpenDialog(reservation)}
//                         startIcon={<PersonIcon />}
//                         disabled={!canUpdateStatus(reservation)}
//                         sx={{ textTransform: "none", borderRadius: 2 }}
//                       >
//                         {reservation.Res_CheckStatus === "Check In" || reservation.Res_CheckStatus === "I" ? "Check Out" : "Check In"}
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() => handleViewFeedback(reservation.Res_no)}
//                         startIcon={<VisibilityIcon />}
//                         sx={{ textTransform: "none", borderRadius: 2 }}
//                       >
//                         View Feedback
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         )}
//       </Paper>

//       {/* Status Update Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//       >
//         <DialogTitle sx={{
//           backgroundColor: theme.palette.primary.main,
//           color: 'white',
//           py: 2,
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <PersonIcon />
//             <Typography variant="h6">Update Reservation Status</Typography>
//           </Box>
//           {isMobile && (
//             <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
//               <CloseIcon />
//             </IconButton>
//           )}
//         </DialogTitle>

//         <DialogContent sx={{ p: isMobile ? 2 : 3 }}>
//           {selectedReservation && (
//             <Box sx={{ mt: 1 }}>
//               <Paper sx={{ p: 2, mb: 3, backgroundColor: 'grey.50' }}>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   Reservation Details
//                 </Typography>

//                 <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Reservation Number
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       #{selectedReservation.Res_no}
//                     </Typography>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Bungalow
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       {bungalowTypeMap[selectedReservation.Res_Bang_Id]} Bungalow
//                     </Typography>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Guest Name
//                     </Typography>
//                     <Typography variant="body2" fontWeight="medium">
//                       {selectedReservation.Res_Guest_Name || 'N/A'}
//                     </Typography>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" color="text.secondary">
//                       Current Status
//                     </Typography>
//                     <Chip
//                       label={statusMap[selectedReservation.Res_CheckStatus]?.label || selectedReservation.Res_CheckStatus}
//                       color={statusMap[selectedReservation.Res_CheckStatus]?.color || "default"}
//                       size="small"
//                       icon={statusMap[selectedReservation.Res_CheckStatus]?.icon}
//                       sx={{ mt: 0.5 }}
//                     />
//                   </Box>
//                 </Box>

//                 {/* Guest Counts in Dialog */}
//                 <Box sx={{ mt: 2, p: 2, backgroundColor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
//                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                     Guest Count:
//                   </Typography>
//                   {(() => {
//                     const guestCounts = getGuestCounts(selectedReservation);
//                     const capacityValidation = validateCapacity(selectedReservation);

//                     return (
//                       <>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                           <Typography variant="body2">
//                             Adults: {selectedReservation.Res_AdultCount || 'N/A'}
//                           </Typography>
//                           <Typography variant="body2">
//                             Children: {selectedReservation.Res_ChildCount || 'N/A'}
//                           </Typography>
//                           <Typography variant="body2" fontWeight="bold">
//                             Total: {Number(selectedReservation.Res_AdultCount) + Number(selectedReservation.Res_ChildCount)}
//                           </Typography>
//                         </Box>
//                         <Typography variant="caption" color="text.secondary">
//                           Capacity: {bungalowCapacity[selectedReservation.Res_Bang_Id]?.totalCapacity} guests maximum
//                         </Typography>

//                       </>
//                     );
//                   })()}
//                 </Box>
//               </Paper>

//               {capacityError && (
//                 <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
//                   <Typography variant="body2" color="error">
//                     {capacityError}
//                   </Typography>
//                 </Box>
//               )}

//               {validationError && (
//                 <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
//                   <Typography variant="body2" color="error">
//                     {validationError}
//                   </Typography>
//                 </Box>
//               )}

//               <TextField
//                 select
//                 fullWidth
//                 margin="normal"
//                 label="Update Status"
//                 value={caregiverStatus}
//                 onChange={(e) => setCaregiverStatus(e.target.value)}
//                 variant="outlined"
//                 sx={{ mt: 2 }}
//                 helperText="Select the appropriate action for this reservation"
//               >
//                 <MenuItem value="I">
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
//                     <CheckCircleIcon color="success" />
//                     <Box>
//                       <Typography variant="body2" fontWeight="medium">
//                         Check In Guest
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Guest is arriving and entering the bungalow
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </MenuItem>
//                 <MenuItem value="O">
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
//                     <DoneIcon color="primary" />
//                     <Box>
//                       <Typography variant="body2" fontWeight="medium">
//                         Check Out Guest
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Guest is leaving the bungalow
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </MenuItem>
//               </TextField>

//               {caregiverStatus === "O" && (
//                 <Box sx={{ mt: 3 }}>
//                   <Paper sx={{ p: 2, border: '1px solid', borderColor: 'primary.main', backgroundColor: 'grey.100' }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                       <CommentIcon color="primary" />
//                       <Typography variant="subtitle2" color="primary.dark">
//                         Bungalow Condition After Checkout
//                       </Typography>
//                     </Box>

//                     <FormControl component="fieldset" sx={{ mb: 2 }}>
//                       <FormLabel component="legend">How is the bungalow condition?</FormLabel>
//                       <RadioGroup
//                         value={feedbackType}
//                         onChange={(e) => setFeedbackType(e.target.value)}
//                         row
//                       >
//                         <FormControlLabel
//                           value="good"
//                           control={<Radio />}
//                           label={
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                               <ThumbUpIcon color="success" fontSize="small" />
//                               <Typography variant="body2">Checked out without any issue</Typography>
//                             </Box>
//                           }
//                         />
//                         <FormControlLabel
//                           value="bad"
//                           control={<Radio />}
//                           label={
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                               <ThumbDownIcon color="error" fontSize="small" />
//                               <Typography variant="body2">Checked out with some issues</Typography>
//                             </Box>
//                           }
//                         />
//                       </RadioGroup>
//                     </FormControl>

//                     {feedbackType === "bad" && (
//                       <>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                           If You have any issues, Please Contact Mr. Kumara.
//                         </Typography>

//                         {/* <TextField
//                           fullWidth
//                           label="Bungalow Issues & Feedback *"
//                           multiline
//                           rows={4}
//                           value={caregiverComment}
//                           onChange={(e) => setCaregiverComment(e.target.value)}
//                           placeholder="Example: Damage to table, broken lamp, stained carpet, etc."
//                           variant="outlined"
//                           required
//                           error={!!validationError}
//                           helperText={
//                             validationError
//                               ? validationError
//                               : `${caregiverComment.length}/500 characters`
//                           }
//                           inputProps={{ maxLength: 500 }}
//                           sx={{
//                             backgroundColor: 'white',
//                             '& .MuiInputBase-root': {
//                               backgroundColor: 'white'
//                             }
//                           }}
//                         /> */}

//                       </>
//                     )}
//                   </Paper>
//                 </Box>
//               )}
//             </Box>
//           )}
//         </DialogContent>

//         <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}`, gap: 1 }}>
//           <Button
//             onClick={handleCloseDialog}
//             disabled={isSubmitting}
//             variant="outlined"
//             sx={{ borderRadius: 2, minWidth: 100, textTransform: 'none' }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleUpdateStatus}
//             disabled={isSubmitting || !caregiverStatus || (caregiverStatus === "I" && capacityError)}
//             startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <VerifiedUserIcon />}
//             sx={{
//               borderRadius: 2,
//               minWidth: 150,
//               textTransform: 'none',
//               '&.Mui-disabled': { backgroundColor: theme.palette.action.disabledBackground }
//             }}
//           >
//             {isSubmitting
//               ? "Processing..."
//               : caregiverStatus === "I"
//                 ? "Confirm Check-In"
//                 : caregiverStatus === "O"
//                   ? feedbackType === "good"
//                     ? "Confirm Check-Out"
//                     : "Confirm Check Out"
//                   : "Update Status"
//             }
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <FeedbackDialog
//         open={feedbackDialogOpen}
//         onClose={() => setFeedbackDialogOpen(false)}
//         reservationNo={selectedFeedbackReservation}
//         data={data}
//         feedbackData={feedbackData}
//         feedbackLoadingById={feedbackLoadingById}
//         feedbackErrorById={feedbackErrorById}
//         onCheckout={handleCheckoutFromFeedback}
//         showCheckout={shouldShowCheckoutInFeedback(selectedFeedbackReservation)}
//         theme={theme}
//       />

//       {/* Checkout Dialog */}
//       <CheckoutDialog
//         open={checkoutDialogOpen}
//         onClose={() => {
//           setCheckoutDialogOpen(false);
//           setValidationError('');
//         }}
//         reservationNo={selectedFeedbackReservation}
//         checkoutFeedbackType={checkoutFeedbackType}
//         setCheckoutFeedbackType={setCheckoutFeedbackType}
//         checkoutComment={checkoutComment}
//         setCheckoutComment={setCheckoutComment}
//         validationError={validationError}
//         setValidationError={setValidationError}
//         isSubmitting={isSubmitting}
//         handleCheckoutSubmit={handleCheckoutSubmit}
//         theme={theme}
//         isMobile={isMobile}
//       />
//     </Box>
//      )}
//     </div>
//   );
// };

// export default CaregiverPage;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  CircularProgress,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
  Link,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Fade,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../components/Utility/Loader";
import { caregiverTranslations, LanguageSelector } from "./translations";
import { Language as LanguageIcon } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";

import {
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Done as DoneIcon,
  HomeWork as HomeWorkIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CleaningServices as CleaningServicesIcon,
  Inventory as InventoryIcon,
  Visibility as VisibilityIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  VerifiedUser as VerifiedUserIcon,
  Close as CloseIcon,
  Comment as CommentIcon,
  Schedule as ScheduleIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  ExitToApp as ExitToAppIcon,
  Assignment,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import CheckoutDialog from "../../components/Cards/CheckoutDialog";
import {
  fetchCaregiverData,
  updateCheckStatus,
  addCaretFeedback,
  fetchCaretFeedbackDetails,
  updateCaretStatus,
} from "../../action/caregiverActions";

import FeedbackDialog from "../../components/Cards/FeedbackDialog";

// change 2026-01-06

// const statusMap = {
//   "Confirm": { label: "Confirmed", color: "info", icon: <CheckCircleIcon fontSize="small" /> },
//   "Check In": { label: "Checked In", color: "success", icon: <DoneIcon fontSize="small" /> },
//   "Check Out": { label: "Checked Out", color: "primary", icon: <DoneIcon fontSize="small" /> },
//   "Pending": { label: "Pending", color: "warning", icon: <HourglassEmptyIcon fontSize="small" /> },
//   "I": { label: "Check In", color: "success", icon: <CheckCircleIcon fontSize="small" /> },
//   "O": { label: "Check Out", color: "primary", icon: <DoneIcon fontSize="small" /> },
//   "B": { label: "Maintenance Needed", color: "error", icon: <WarningIcon fontSize="small" /> },
// };

const bungalowTypeMap = {
  1: "Main",
  2: "Lower Garden Suite",
};

const bungalowCapacity = {
  1: {
    maxAdults: 16,
    maxChildren: 16,
    totalCapacity: 16,
  },
  2: {
    maxAdults: 5,
    maxChildren: 5,
    totalCapacity: 5,
  },
};

const CaregiverPage = () => {
  const dispatch = useDispatch();
  const {
    loading,
    data,
    error,
    feedbackData,
    feedbackLoadingById,
    feedbackErrorById,
  } = useSelector((state) => state.caregiver);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [caregiverStatus, setCaregiverStatus] = useState("");
  const [caregiverComment, setCaregiverComment] = useState("");
  const [feedbackType, setFeedbackType] = useState("good");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState("all");
  const [viewMode, setViewMode] = useState("card");
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [selectedFeedbackReservation, setSelectedFeedbackReservation] =
    useState(null);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [checkoutFeedbackType, setCheckoutFeedbackType] = useState("good");
  const [checkoutComment, setCheckoutComment] = useState("");
  const [validationError, setValidationError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const showAlert = (title, message, icon = "success") => {
    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: "OK",
      confirmButtonColor: theme.palette.primary.main,
    });
  };

  const t = (key) => {
    return (
      caregiverTranslations[language]?.[key] ||
      caregiverTranslations.en[key] ||
      key
    );
  };

  const statusMap = React.useMemo(
    () => ({
      Confirm: {
        label: t("confirmed"),
        color: "info",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      "Check In": {
        label: t("checkedIn"),
        color: "success",
        icon: <DoneIcon fontSize="small" />,
      },
      "Check Out": {
        label: t("checkedOut"),
        color: "primary",
        icon: <DoneIcon fontSize="small" />,
      },
      Pending: {
        label: t("pending"),
        color: "warning",
        icon: <HourglassEmptyIcon fontSize="small" />,
      },
      I: {
        label: t("checkIn"),
        color: "success",
        icon: <CheckCircleIcon fontSize="small" />,
      },
      O: {
        label: t("checkOut"),
        color: "primary",
        icon: <DoneIcon fontSize="small" />,
      },
      B: {
        label: t("maintenanceNeeded"),
        color: "error",
        icon: <WarningIcon fontSize="small" />,
      },
    }),
    [language],
  );

  const getBungalowName = (bungalowId) => {
    if (bungalowId === "1") return t("mainBungalow");
    if (bungalowId === "2") return t("lowerGardenSuite");
    return `${t("bungalow")} ${bungalowId}`;
  };

  const showErrorAlert = (message) => {
    showAlert("Error", message, "error");
  };

  const showSuccessAlert = (message) => {
    showAlert("Success", message, "success");
  };

  const showInfoAlert = (message) => {
    showAlert("Information", message, "info");
  };

  const showWarningAlert = (message) => {
    showAlert("Warning", message, "warning");
  };

  const validateCapacity = (reservation) => {
    if (!reservation) return { isValid: true, error: "" };

    const bungalowId = reservation.Res_Bang_Id;
    const capacityConfig = bungalowCapacity[bungalowId];

    if (!capacityConfig) {
      return { isValid: true, error: "" };
    }

    const adultsCount = Number(reservation.Res_AdultCount) || 0;
    const childrenCount = Number(reservation.Res_ChildCount) || 0;
    const totalGuests = adultsCount + childrenCount;

    // Check individual limits
    if (adultsCount > capacityConfig.maxAdults) {
      return {
        isValid: false,
        error: `Main Bungalow maximum is ${capacityConfig.maxAdults} adults. Current: ${adultsCount} adults.`,
      };
    }

    if (childrenCount > capacityConfig.maxChildren) {
      return {
        isValid: false,
        error: `Main Bungalow maximum is ${capacityConfig.maxChildren} children. Current: ${childrenCount} children.`,
      };
    }

    // Check total capacity
    if (totalGuests > capacityConfig.totalCapacity) {
      return {
        isValid: false,
        error: `${bungalowTypeMap[bungalowId]} maximum capacity is ${capacityConfig.totalCapacity} guests. Current: ${totalGuests} guests.`,
      };
    }

    return { isValid: true, error: "" };
  };

  const isReservationPast = (reservation) => {
    if (!reservation || !reservation.Res_Check_Out) return false;

    try {
      const checkOutDate = parseDate(reservation.Res_Check_Out);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return checkOutDate < today;
    } catch (error) {
      return false;
    }
  };

  const getDisplayData = () => {
    if (!data || data.length === 0) return [];
    if (showHistory) {
      return data.filter((item) => isReservationPast(item));
    } else {
      return data.filter((item) => !isReservationPast(item));
    }
  };

  const ReadMoreText = ({ text, wordLimit = 20 }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return "N/A";

    const words = text.split(" ");

    if (words.length <= wordLimit) {
      return text;
    }

    const toggleExpand = (e) => {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    };

    return isExpanded ? (
      <span>
        {text}{" "}
        <Link
          href="#"
          onClick={toggleExpand}
          sx={{
            color: "#1976d2",
            fontSize: "11px",
            fontWeight: 500,
            ml: 0.5,
          }}
        >
          See less
        </Link>
      </span>
    ) : (
      <span>
        {words.slice(0, wordLimit).join(" ")}{" "}
        <Link
          href="#"
          onClick={toggleExpand}
          sx={{
            color: "#1976d2",
            fontSize: "11px",
            fontWeight: 500,
            ml: 0.5,
          }}
        >
          See more
        </Link>
      </span>
    );
  };

  useEffect(() => {
    dispatch(fetchCaregiverData());
  }, [dispatch]);

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     let filtered = [...data];

  //     if (tabValue !== 'all') {
  //       filtered = filtered.filter(item => item.Res_Bang_Id === tabValue);
  //     }

  //     if (searchTerm) {
  //       filtered = filtered.filter(item =>
  //         item.Res_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         (item.Res_Guest_Name && item.Res_Guest_Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //         (item.Res_Remarks && item.Res_Remarks.toLowerCase().includes(searchTerm.toLowerCase()))
  //       );
  //     }

  //     if (showOnlyPending) {
  //       filtered = filtered.filter(item => item.Res_CheckStatus === "Pending");
  //     }

  //     setFilteredData(filtered);
  //   }
  // }, [data, searchTerm, showOnlyPending, tabValue]);

  useEffect(() => {
    if (data && data.length > 0) {
      let filtered = [...data];

      // Separate past from current/future records based on showHistory flag
      if (showHistory) {
        filtered = filtered.filter((item) => isReservationPast(item));
      } else {
        filtered = filtered.filter((item) => !isReservationPast(item));
      }

      if (tabValue !== "all") {
        filtered = filtered.filter((item) => item.Res_Bang_Id === tabValue);
      }

      if (searchTerm) {
        filtered = filtered.filter(
          (item) =>
            item.Res_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.Res_Guest_Name &&
              item.Res_Guest_Name.toLowerCase().includes(
                searchTerm.toLowerCase(),
              )) ||
            (item.Res_Remarks &&
              item.Res_Remarks.toLowerCase().includes(
                searchTerm.toLowerCase(),
              )),
        );
      }

      if (showOnlyPending && !showHistory) {
        filtered = filtered.filter(
          (item) => item.Res_CheckStatus === "Pending",
        );
      }

      filtered.sort((a, b) => {
        const statusA = a.Res_CheckStatus?.trim() || "";
        const statusB = b.Res_CheckStatus?.trim() || "";

        const isCheckedInA = ["I", "Check In"].includes(statusA);
        const isCheckedInB = ["I", "Check In"].includes(statusB);
        const isPendingA = ["Pending", "Confirm", "B", ""].includes(statusA);
        const isPendingB = ["Pending", "Confirm", "B", ""].includes(statusB);
        const isCheckedOutA = [
          "O",
          "Check Out",
          "Completed",
          "Closed",
        ].includes(statusA);
        const isCheckedOutB = [
          "O",
          "Check Out",
          "Completed",
          "Closed",
        ].includes(statusB);

        if (isCheckedInA && !isCheckedInB) return -1;
        if (!isCheckedInA && isCheckedInB) return 1;

        if (isCheckedOutA && !isCheckedOutB) return 1;
        if (!isCheckedOutA && isCheckedOutB) return -1;

        if (isCheckedInA && isCheckedInB) {
          const dateA = parseDate(a.Res_Check_In);
          const dateB = parseDate(b.Res_Check_In);
          return dateB - dateA;
        }

        if (isPendingA && isPendingB) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const dateA = parseDate(a.Res_Check_In);
          const dateB = parseDate(b.Res_Check_In);

          const isFutureA = dateA >= today;
          const isFutureB = dateB >= today;
          const isPastA = dateA < today;
          const isPastB = dateB < today;

          if (isFutureA && isPastB) return -1;
          if (isPastA && isFutureB) return 1;

          if (isFutureA && isFutureB) {
            return dateA - today - (dateB - today);
          }

          if (isPastA && isPastB) {
            return today - dateB - (today - dateA);
          }
        }

        return a.Res_no.localeCompare(b.Res_no);
      });

      setFilteredData(filtered);
    }
  }, [data, searchTerm, showOnlyPending, tabValue, showHistory]);

  const parseDate = (dateString) => {
    if (!dateString) return new Date(8640000000000000);

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      const parts = dateString.split(/[-/]/);
      if (parts.length === 3) {
        const formats = [
          `${parts[0]}-${parts[1]}-${parts[2]}`,
          `${parts[2]}-${parts[0]}-${parts[1]}`,
          `${parts[2]}-${parts[1]}-${parts[0]}`,
        ];

        for (const format of formats) {
          const parsedDate = new Date(format);
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate;
          }
        }
      }
      return new Date(8640000000000000);
    }

    return date;
  };

  // const parseDate = (dateString) => {
  //   if (!dateString) return new Date(0);

  //   const date = new Date(dateString);

  //   if (isNaN(date.getTime())) {

  //     const parts = dateString.split(/[-/]/);
  //     if (parts.length === 3) {

  //       const possibleDate1 = new Date(`${parts[2]}-${parts[0]}-${parts[1]}`);
  //       const possibleDate2 = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

  //       if (!isNaN(possibleDate1.getTime())) return possibleDate1;
  //       if (!isNaN(possibleDate2.getTime())) return possibleDate2;
  //     }
  //     return new Date(0);
  //   }

  //   return date;
  // };

  const handleOpenDialog = (reservation) => {
    setSelectedReservation(reservation);

    if (
      reservation.Res_CheckStatus === "Pending" ||
      reservation.Res_CheckStatus === "Confirm"
    ) {
      setCaregiverStatus("I");
    } else if (
      reservation.Res_CheckStatus === "Check In" ||
      reservation.Res_CheckStatus === "I"
    ) {
      setCaregiverStatus("O");
    } else {
      setCaregiverStatus(reservation.Res_CheckStatus);
    }

    setCaregiverComment(reservation.Res_Remarks || "");
    setFeedbackType("good");
    setValidationError("");
    setCapacityError("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReservation(null);
    setCaregiverComment("");
    setFeedbackType("good");
    setValidationError("");
    setCapacityError("");
  };

  const validateForm = () => {
    if (caregiverStatus === "I") {
      const capacityValidation = validateCapacity(selectedReservation);
      if (!capacityValidation.isValid) {
        setCapacityError(capacityValidation.error);
        return false;
      }
    }

    setValidationError("");
    setCapacityError("");
    return true;
  };

  const handleUpdateStatus = async () => {
    if (!selectedReservation) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (caregiverStatus === "I") {
        await dispatch(
          updateCheckStatus(selectedReservation.Res_no, caregiverStatus),
        );
        showSuccessAlert("Guest successfully checked in!");
      } else if (caregiverStatus === "O") {
        if (feedbackType === "good") {
          await dispatch(
            updateCheckStatus(selectedReservation.Res_no, caregiverStatus),
          );
          showSuccessAlert(
            "Guest successfully checked out! Bungalow is in good condition.",
          );
        } else {
          await dispatch(
            addCaretFeedback(
              selectedReservation.Res_no,
              caregiverComment.trim(),
              "B",
            ),
          );
          await dispatch(updateCheckStatus(selectedReservation.Res_no, "O"));
          showSuccessAlert(
            "Guest checked out and maintenance feedback submitted!",
          );
        }
      }

      handleCloseDialog();
      dispatch(fetchCaregiverData());
    } catch (error) {
      console.error("Error updating status:", error);
      showErrorAlert(`Error: ${error.message || "Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewFeedback = async (reservationNo) => {
    try {
      if (!feedbackData[reservationNo]) {
        await dispatch(fetchCaretFeedbackDetails(reservationNo));
      }

      setSelectedFeedbackReservation(reservationNo);
      setFeedbackDialogOpen(true);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      showErrorAlert(
        `Error loading feedback: ${error.message || "Please try again."}`,
      );
    }
  };

  const handleCheckoutFromFeedback = () => {
    setCheckoutDialogOpen(true);
  };

  const handleCheckoutSubmit = async () => {
    if (!selectedFeedbackReservation) return;

    if (checkoutFeedbackType === "bad") {
      if (!checkoutComment.trim()) {
        setValidationError(
          "Feedback is required when reporting issues with the bungalow.",
        );
        return;
      }

      if (checkoutComment.trim().length < 10) {
        setValidationError(
          "Please provide more detailed feedback about the issues (minimum 10 characters).",
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const currentReservation = data.find(
        (item) => item.Res_no === selectedFeedbackReservation,
      );

      if (checkoutFeedbackType === "good") {
        await dispatch(updateCheckStatus(selectedFeedbackReservation, "O"));
        showSuccessAlert(
          "Guest checked out successfully! Bungalow is in good condition.",
        );
      } else {
        await dispatch(
          addCaretFeedback(
            selectedFeedbackReservation,
            checkoutComment.trim(),
            "B",
          ),
        );

        await dispatch(updateCheckStatus(selectedFeedbackReservation, "O"));
        showSuccessAlert(
          "Guest checked out and maintenance feedback submitted!",
        );
      }

      setCheckoutDialogOpen(false);
      setFeedbackDialogOpen(false);
      setCheckoutComment("");
      setValidationError("");
      dispatch(fetchCaregiverData());
    } catch (error) {
      console.error("Error updating status:", error);
      showErrorAlert(`Error: ${error.message || "Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePendingFilter = () => {
    setShowOnlyPending(!showOnlyPending);
  };

  const handleRefresh = () => {
    dispatch(fetchCaregiverData());
    showInfoAlert("Data refreshed successfully!");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "card" : "list");
  };

  const canUpdateStatus = (reservation) => {
    //   const disallowedStatuses = ["Check Out", "O", "Completed", "Closed"];
    //   return !disallowedStatuses.includes(reservation.Res_CheckStatus);
    // };

    if (!reservation) return false;

    const currentStatus = reservation.Res_CheckStatus?.trim() || "";

    const showCheckInStatuses = ["", "Pending", "Confirm", "B"];
    const showCheckOutStatuses = ["Check In", "I"];

    const allowedStatuses = [...showCheckInStatuses, ...showCheckOutStatuses];
    const disallowedStatuses = ["Check Out", "O", "Completed", "Closed"];

    return (
      allowedStatuses.includes(currentStatus) &&
      !disallowedStatuses.includes(currentStatus)
    );
  };

  // const getButtonText = (reservation) => {
  //   if (!reservation) return "Check In";

  //   const currentStatus = reservation.Res_CheckStatus?.trim() || "";
  //   const showCheckOutStatuses = ["Check In", "I"];

  //   return showCheckOutStatuses.includes(currentStatus) ?
  //     "Check Out" : "Check In";
  // };

  const getButtonText = (reservation) => {
    if (!reservation) return t("checkIn");

    const currentStatus = reservation.Res_CheckStatus?.trim() || "";
    const showCheckOutStatuses = ["Check In", "I"];

    return showCheckOutStatuses.includes(currentStatus)
      ? t("checkOut")
      : t("checkIn");
  };

  const shouldShowCheckoutInFeedback = (reservationNo) => {
    if (!reservationNo || !data) return false;

    const reservation = data.find((item) => item.Res_no === reservationNo);
    if (!reservation) return false;

    const allowedStatuses = ["Check In", "I", "Pending", "Confirm", "B"];
    return allowedStatuses.includes(reservation.Res_CheckStatus);
  };

  const getCurrentReservation = () => {
    if (!selectedFeedbackReservation || !data) return null;
    return data.find((item) => item.Res_no === selectedFeedbackReservation);
  };

  const getGuestCounts = (reservation) => {
    const adults = reservation.Res_Adults || reservation.Res_No_Adults || 0;
    const children =
      reservation.Res_Children || reservation.Res_No_Children || 0;
    return { adults, children, total: adults + children };
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={{ p: isMobile ? 1 : 3 }}>
          <Paper
            sx={{
              p: isMobile ? 1 : 3,
              borderRadius: 2,
              boxShadow: isMobile ? "none" : theme.shadows[3],
            }}
          >
            {/* Header Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
                flexDirection: isMobile ? "column" : "row",
                width: "100%",
                gap: isMobile ? 2 : 0,
              }}
            >
              {/* Left Side - Title and Avatar */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    mr: 2,
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48,
                  }}
                >
                  <CleaningServicesIcon fontSize={isMobile ? "medium" : "large"} />
                </Avatar>

                <Box>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    component="h1"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {t("pageTitle")}

                    {/* Back Button - Inside Title (Mobile) */}
                    {isMobile && (
                      <IconButton
                        onClick={() => navigate(-1)}
                        size="small"
                        sx={{
                          ml: 1,
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": {
                            bgcolor: "primary.dark",
                          },
                        }}
                      >
                        <ArrowBackIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t("pageSubtitle")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Second Row - Search and Main Actions */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                mb: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Search Bar - Left Side */}
              <TextField
                size="small"
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "action.active", mr: 1, fontSize: 20 }} />
                  ),
                }}
                sx={{
                  minWidth: isMobile ? "100%" : 300,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />

              {/* Action Buttons - Right Side */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  width: isMobile ? "100%" : "auto",
                  justifyContent: isMobile ? "space-between" : "flex-end",
                }}
              >


                {/* Language Selector Chip */}
                <Chip
                  icon={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      {/* Country Flag based on language */}

                      <PublicIcon sx={{ fontSize: 16, color: "white" }} />
                    </Box>
                  }
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          fontSize: language === "ta" ? "0.75rem" : "0.875rem",
                        }}
                      >
                        {language === "en" ? "EN" :
                          language === "si" ? "සිං" :
                            language === "ta" ? "த" :
                              "हि"}
                      </Typography>
                    </Box>
                  }
                  onClick={() => {
                    const nextLang =
                      language === "en"
                        ? "si"
                        : language === "si"
                          ? "ta"
                          : language === "ta"
                            ? "hi"
                            : "en";
                    setLanguage(nextLang);
                  }}
                  sx={{
                    height: "44px",
                    minWidth: "90px",
                    background: (theme) => {
                      const colors = {
                        en: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",  
                        si: "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",  
                        ta: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",  
                        hi: "linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)",  
                      };
                      return colors[language] || colors.en;
                    },
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "30px",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",

                    "& .MuiChip-icon": {
                      marginLeft: "4px",
                      marginRight: "4px",
                      color: "white",
                    },

                    "& .MuiChip-label": {
                      paddingLeft: "4px",
                      paddingRight: "8px",
                    },

                     
                    "&:hover": {
                      transform: "translateY(-2px) scale(1.02)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                      border: "2px solid white",
                      background: (theme) => {
                        const colors = {
                          en: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)",
                          si: "linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)",
                          ta: "linear-gradient(135deg, #f57c00 0%, #e65100 100%)",
                          hi: "linear-gradient(135deg, #7b1fa2 0%, #4a0072 100%)",
                        };
                        return colors[language] || colors.en;
                      },
                    },

                     
                    "&:active": {
                      transform: "translateY(0) scale(0.98)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    },

                     
                    "& .MuiTouchRipple-root": {
                      color: "rgba(255, 255, 255, 0.3)",
                    },

                     
                    "&:focus-visible": {
                      outline: "none",
                      boxShadow: "0 0 0 3px rgba(255,255,255,0.5), 0 4px 15px rgba(0,0,0,0.2)",
                    },
                  }}
                />

                {/* View Toggle */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={toggleViewMode}
                  startIcon={viewMode === "list" ? <VisibilityIcon /> : <InventoryIcon />}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: "none",
                    borderRadius: "20px",
                    minWidth: isMobile ? "auto" : "100px",
                    flex: isMobile ? 1 : "0 1 auto",
                  }}
                >
                  {viewMode === "list" ? t("cardView") : t("listView")}
                </Button>

                {/* History/Current Toggle */}
                <Button
                  variant={showHistory ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setShowHistory(!showHistory)}
                  startIcon={<Assignment />}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: "none",
                    borderRadius: "20px",
                    minWidth: isMobile ? "auto" : "100px",
                    flex: isMobile ? 1 : "0 1 auto",
                  }}
                >
                  {showHistory ? t("current") : t("history")}
                </Button>
              </Box>
            </Box>

            {/* <Divider sx={{ mb: 3 }} /> */}

            {/* Tabs */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                mb: 2,
              }}
            >
              {/* <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile
              >
                <Tab
                  label={`All Bungalows (${data ? data.length : 0})`}
                  value="all"
                  sx={{ textTransform: 'none' }}
                />
                <Tab
                  label={`Main (${data ? data.filter(item => item.Res_Bang_Id === "1").length : 0})`}
                  value="1"
                  sx={{ textTransform: 'none' }}
                />
                { <Tab 
              label={`Lower Garden Suite (${data ? data.filter(item => item.Res_Bang_Id === "2").length : 0})`} 
              value="2" 
              sx={{ textTransform: 'none' }} 
            /> }
              </Tabs> */}

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile
              >
                <Tab
                  label={`${t("allBungalows")} (${getDisplayData() ? getDisplayData().length : 0})`}
                  value="all"
                  sx={{ textTransform: "none" }}
                />
                <Tab
                  label={`${t("mainBungalowShort")} (${getDisplayData() ? getDisplayData().filter((item) => item.Res_Bang_Id === "1").length : 0})`}
                  value="1"
                  sx={{ textTransform: "none" }}
                />

                {/* <Tab 
    label={`${t('lowerGardenSuiteShort')} (${data ? data.filter(item => item.Res_Bang_Id === "2").length : 0})`} 
    value="2" 
    sx={{ textTransform: 'none' }} 
  /> */}
              </Tabs>
            </Box>

            {error && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  backgroundColor: "#ffebee",
                  borderRadius: 2,
                }}
              >
                {/* <Typography variant="body1" color="error" gutterBottom>
                  Error
                </Typography> */}
                <Typography variant="body1" color="error" gutterBottom>
                  {t("noResultsFound")}
                </Typography>
                <Typography variant="body2" color="info">
                  {searchTerm
                    ? t("noBungalowsMatch")
                    : showOnlyPending
                      ? t("noPendingReservations")
                      : t("noBungalowReservations")}
                </Typography>

                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Box>
            )}

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <CircularProgress size={isMobile ? 40 : 60} />
                {/* <Typography variant="body2" color="text.secondary">
                  Loading bungalow data...
                </Typography> */}

                <Typography variant="body2" color="text.secondary">
                  {t("loadingData")}
                </Typography>
              </Box>
            ) : filteredData.length === 0 ? (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  backgroundColor: "#e3f2fd",
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" color="info" gutterBottom>
                  No Results Found
                </Typography>
                <Typography variant="body2" color="info">
                  {searchTerm
                    ? "No bungalows match your search criteria. Try adjusting your search terms."
                    : showOnlyPending
                      ? "No pending reservations found."
                      : "No bungalow reservations found."}
                </Typography>
              </Box>
            ) : viewMode === "list" ? (
              /* List View */
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  maxHeight: isMobile
                    ? "calc(100vh - 260px)"
                    : "calc(100vh - 220px)",
                  overflow: "auto",
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Table stickyHeader size={isMobile ? "small" : "medium"}>
                  {/* <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
                        Bungalow
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
                        Guest
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
                        Guest Count
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
                        Check-In/Out
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", backgroundColor: theme.palette.primary.main, color: "white" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead> */}

                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      >
                        {t("tableBungalow")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      >
                        {t("tableStatus")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      >
                        {t("tableGuest")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      >
                        {t("tableGuestCount")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      >
                        {t("tableCheckInOut")}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                        }}
                      >
                        {t("tableActions")}
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredData.map((reservation) => {
                      const guestCounts = getGuestCounts(reservation);
                      const capacityConfig =
                        bungalowCapacity[reservation.Res_Bang_Id];
                      const isOverCapacity =
                        guestCounts.total >
                        (capacityConfig?.totalCapacity || 0);

                      return (
                        <TableRow
                          key={reservation.Res_no}
                          hover
                          sx={{
                            backgroundColor: isOverCapacity
                              ? "#ffebee"
                              : "inherit",
                          }}
                        >
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <HomeWorkIcon
                                fontSize="small"
                                sx={{
                                  mr: 1,
                                  color: theme.palette.primary.main,
                                }}
                              />
                              <Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {bungalowTypeMap[reservation.Res_Bang_Id] ||
                                    `Bungalow ${reservation.Res_Bang_Id}`}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  #{reservation.Res_no}
                                </Typography>
                                {isOverCapacity && (
                                  // <Typography variant="caption" color="error" display="block">
                                  //   Over Capacity!
                                  // </Typography>
                                  <Typography
                                    variant="caption"
                                    color="error"
                                    display="block"
                                  >
                                    {t("overCapacity")}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={
                                statusMap[reservation.Res_CheckStatus]?.label ||
                                reservation.Res_CheckStatus
                              }
                              color={
                                statusMap[reservation.Res_CheckStatus]?.color ||
                                "default"
                              }
                              size="small"
                              icon={
                                statusMap[reservation.Res_CheckStatus]?.icon
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <PersonIcon fontSize="small" color="action" />
                              <Typography variant="body2">
                                {reservation.Res_Guest_Name || "N/A"}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              {/* <Typography variant="body2" fontSize="0.8rem">
                                Adults:{reservation.Res_AdultCount}
                              </Typography> */}
                              <Typography variant="body2" fontSize="0.8rem">
                                {t("adults")}:{reservation.Res_AdultCount}
                              </Typography>
                              <Typography variant="body2" fontSize="0.8rem">
                                {t("children")}: {reservation.Res_ChildCount}
                              </Typography>
                              <Typography
                                variant="body2"
                                fontSize="0.8rem"
                                fontWeight="bold"
                              >
                                {t("total")}: {guestCounts.total}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box>
                                <Typography variant="body2" fontSize="0.8rem">
                                  In: {reservation.Res_Check_In}
                                </Typography>
                                <Typography variant="body2" fontSize="0.8rem">
                                  Out: {reservation.Res_Check_Out}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1,
                                flexDirection: isMobile ? "column" : "row",
                              }}
                            >
                              {/* <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleOpenDialog(reservation)}
                                startIcon={<PersonIcon />}
                                disabled={!canUpdateStatus(reservation)}
                                sx={{ textTransform: "none", borderRadius: 2 }}
                              >
                                {reservation.Res_CheckStatus === "Check In" || reservation.Res_CheckStatus === "I" ? "Check Out" : "Check In"}
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleViewFeedback(reservation.Res_no)}
                                startIcon={<VisibilityIcon />}
                                sx={{ textTransform: "none", borderRadius: 2 }}
                              >
                                Feedback
                              </Button> */}

                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleOpenDialog(reservation)}
                                startIcon={<PersonIcon />}
                                disabled={!canUpdateStatus(reservation)}
                                sx={{ textTransform: "none", borderRadius: 2 }}
                              >
                                {getButtonText(reservation)}
                              </Button>

                              {/* Feedback Button */}
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                  handleViewFeedback(reservation.Res_no)
                                }
                                startIcon={<VisibilityIcon />}
                                sx={{ textTransform: "none", borderRadius: 2 }}
                              >
                                {t("viewFeedback")}
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              /* Card View */
              <Grid container spacing={2}>
                {filteredData.map((reservation) => {
                  const guestCounts = getGuestCounts(reservation);
                  const capacityConfig =
                    bungalowCapacity[reservation.Res_Bang_Id];
                  const isOverCapacity =
                    guestCounts.total > (capacityConfig?.totalCapacity || 0);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={reservation.Res_no}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          border: isOverCapacity
                            ? "2px solid #f44336"
                            : reservation.Res_CheckStatus === "Pending"
                              ? "2px solid #ed6c02"
                              : "1px solid #e0e0e0",
                          borderColor:
                            reservation.Res_CheckStatus === "B"
                              ? "error.main"
                              : undefined,
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <HomeWorkIcon color="primary" sx={{ mr: 1 }} />
                              <Typography variant="h6" component="h2">
                                {bungalowTypeMap[reservation.Res_Bang_Id] ||
                                  `Bungalow ${reservation.Res_Bang_Id}`}
                              </Typography>
                            </Box>
                            <Chip
                              label={
                                statusMap[reservation.Res_CheckStatus]?.label ||
                                reservation.Res_CheckStatus
                              }
                              color={
                                statusMap[reservation.Res_CheckStatus]?.color ||
                                "default"
                              }
                              size="small"
                              icon={
                                statusMap[reservation.Res_CheckStatus]?.icon
                              }
                            />
                          </Box>

                          {/* <Typography variant="body2" color="text.secondary" gutterBottom>
                            Reservation: #{reservation.Res_no}
                          </Typography> */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {t("cardReservation")}: #{reservation.Res_no}
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <PersonIcon fontSize="small" color="action" />
                            {/* <Typography variant="body2" color="text.secondary">
                              Guest: {reservation.Res_Guest_Name || 'N/A'}
                            </Typography> */}
                            <Typography variant="body2" color="text.secondary">
                              {t("cardGuest")}:{" "}
                              {reservation.Res_Guest_Name || "N/A"}
                            </Typography>
                          </Box>

                          {/* Guest Counts */}
                          <Box
                            sx={{
                              mb: 2,
                              p: 1,
                              backgroundColor: isOverCapacity
                                ? "#ffebee"
                                : "#f5f5f5",
                              borderRadius: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              color={
                                isOverCapacity ? "error" : "text.secondary"
                              }
                              gutterBottom
                            >
                              {t("guestCount")}:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {/* <Typography variant="body2">
                                Adults: {reservation.Res_AdultCount}
                              </Typography> */}
                              <Typography variant="body2" fontSize="0.8rem">
                                {t("adults")}:{reservation.Res_AdultCount}
                              </Typography>
                              <Typography variant="body2">
                                {t("children")}: {reservation.Res_ChildCount}
                              </Typography>
                              <Typography variant="body2" fontWeight="bold">
                                {t("total")}:{" "}
                                {Number(reservation.Res_AdultCount) +
                                  Number(reservation.Res_ChildCount)}
                              </Typography>
                            </Box>
                            {isOverCapacity && (
                              <Typography
                                variant="caption"
                                color="error"
                                sx={{ mt: 0.5, display: "block" }}
                              >
                                ⚠️ Over capacity! Max:{" "}
                                {capacityConfig?.totalCapacity}
                              </Typography>
                            )}
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            <ScheduleIcon fontSize="small" color="action" />
                            <Box>
                              {/* <Typography variant="body2" color="text.secondary">
                                Check-In: {reservation.Res_Check_In}
                              </Typography> */}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {t("cardCheckIn")}: {reservation.Res_Check_In}
                              </Typography>

                              {/* <Typography variant="body2" color="text.secondary">
                                Check-Out: {reservation.Res_Check_Out}
                              </Typography> */}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {t("cardCheckOut")}: {reservation.Res_Check_Out}
                              </Typography>
                            </Box>
                          </Box>

                          {reservation.Res_Remarks && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 1,
                                mb: 2,
                              }}
                            >
                              <CommentIcon
                                fontSize="small"
                                color="action"
                                sx={{ mt: 0.5 }}
                              />
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                <ReadMoreText
                                  text={reservation.Res_Remarks}
                                  wordLimit={10}
                                />
                              </Typography>
                            </Box>
                          )}
                        </CardContent>

                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleOpenDialog(reservation)}
                            startIcon={<PersonIcon />}
                            disabled={!canUpdateStatus(reservation)}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                          >
                            {reservation.Res_CheckStatus === "Check In" ||
                              reservation.Res_CheckStatus === "I"
                              ? t("checkOut")
                              : t("checkIn")}
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              handleViewFeedback(reservation.Res_no)
                            }
                            startIcon={<VisibilityIcon />}
                            sx={{ textTransform: "none", borderRadius: 2 }}
                          >
                            {t("viewfeadback")}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Paper>

          {/* ------------------------------------------------------------Status Update Dialog-------------------------------------------------- */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
              sx: {
                borderRadius: isMobile ? 0 : 2,
                maxHeight: isMobile ? "100vh" : "85vh",
              },
            }}
          >
            {/* Simple Header */}
            <DialogTitle
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                py: isMobile ? 1.5 : 2,
                px: isMobile ? 2 : 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize={isMobile ? "small" : "medium"} />
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  fontWeight="bold"
                >
                  Update Status
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {/* Simple Language Toggle */}
                <Chip
                  icon={<PublicIcon sx={{ color: "white", fontSize: 16 }} />}
                  label={
                    language === "en"
                      ? "ENGLISH"
                      : language === "si"
                        ? "SINHALA"
                        : language === "ta"
                          ? "TAMIL"
                          : "HINDI"
                  }
                  onClick={() => {
                    const nextLang =
                      language === "en"
                        ? "si"
                        : language === "si"
                          ? "ta"
                          : language === "ta"
                            ? "hi"
                            : "en";
                    setLanguage(nextLang);
                  }}
                  size="small"
                  sx={{
                    color: "white",
                    bgcolor: "rgba(33, 199, 42, 0.99)",
                    cursor: "pointer",
                    height: "24px",
                    "&:hover": {
                      bgcolor: "rgba(33, 199, 42, 0.99)",
                    },
                  }}
                />
                <IconButton
                  onClick={handleCloseDialog}
                  sx={{
                    color: "white",
                    p: 0.5,
                  }}
                  size="small"
                >
                  <CloseIcon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent
              sx={{
                p: isMobile ? 2 : 3,
                backgroundColor: "#fafafa",
              }}
            >
              {selectedReservation && (
                <Box sx={{ mt: 1 }}>
                  {/* Reservation Summary */}
                  <Box
                    sx={{
                      p: 2,
                      mb: 3,
                      backgroundColor: "white",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Assignment color="primary" fontSize="small" />
                      <Typography variant="subtitle2" fontWeight="medium">
                        {t("reservationDetails")}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "grid", gap: 1.5 }}>
                      {/* Row 1 */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {t("reservationNumber")}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          #{selectedReservation.Res_no}
                        </Typography>
                      </Box>

                      {/* Row 2 */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {t("bungalow")}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {getBungalowName(selectedReservation.Res_Bang_Id)}
                        </Typography>
                      </Box>

                      {/* Row 3 */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {t("guestName")}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {selectedReservation.Res_Guest_Name || t("na")}
                        </Typography>
                      </Box>

                      {/* Row 4 */}
                      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                {t('currentStatus')}
              </Typography>
              <Chip
                label={statusMap[selectedReservation.Res_CheckStatus]?.label || selectedReservation.Res_CheckStatus}
                color={statusMap[selectedReservation.Res_CheckStatus]?.color || "default"}
                size="small"
                sx={{ fontSize: '0.75rem' }}
              />
            </Box> */}
                    </Box>
                  </Box>

                  {/* Guest Counts */}
                  <Box
                    sx={{
                      p: 2,
                      mb: 3,
                      backgroundColor: "white",
                      borderRadius: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      gutterBottom
                    >
                      {t("guestCount")}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {t("adults")}
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {selectedReservation.Res_AdultCount || 0}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {t("children")}
                        </Typography>
                        <Typography variant="h6" color="secondary.main">
                          {selectedReservation.Res_ChildCount || 0}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1, textAlign: "center" }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          {t("total")}
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {Number(selectedReservation.Res_AdultCount) +
                            Number(selectedReservation.Res_ChildCount)}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      {t("capacity")}:{" "}
                      {
                        bungalowCapacity[selectedReservation.Res_Bang_Id]
                          ?.totalCapacity
                      }{" "}
                      {t("guestsMaximum")}
                    </Typography>
                  </Box>

                  {/* Error Messages - Simple */}
                  {capacityError && (
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#ffebee",
                        borderRadius: 1,
                        borderLeft: "4px solid #f44336",
                      }}
                    >
                      <Typography variant="body2" color="error">
                        {capacityError}
                      </Typography>
                    </Box>
                  )}

                  {validationError && (
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "#fff3e0",
                        borderRadius: 1,
                        borderLeft: "4px solid #ff9800",
                      }}
                    >
                      <Typography variant="body2" color="warning.dark">
                        {validationError}
                      </Typography>
                    </Box>
                  )}

                  {/* Status Selection */}
                  {/* <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
            {t('updateStatus')}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant={caregiverStatus === "I" ? "contained" : "outlined"}
              color="success"
              onClick={() => setCaregiverStatus("I")}
              fullWidth
              size={isMobile ? "medium" : "large"}
              startIcon={<CheckCircleIcon />}
              sx={{ 
                borderRadius: 1,
                py: isMobile ? 1 : 1.5,
                textTransform: 'none'
              }}
            >
              {t('checkInGuest')}
            </Button>
            
            <Button
              variant={caregiverStatus === "O" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setCaregiverStatus("O")}
              fullWidth
              size={isMobile ? "medium" : "large"}
              startIcon={<DoneIcon />}
              sx={{ 
                borderRadius: 1,
                py: isMobile ? 1 : 1.5,
                textTransform: 'none'
              }}
            >
              {t('checkOutGuest')}
            </Button>
          </Box>
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {t('selectAction')}
          </Typography>
        </Box> */}

                  {/* Status Selection */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="medium"
                      gutterBottom
                    >
                      {t("updateStatus")}
                    </Typography>

                    {selectedReservation && (
                      <Box sx={{ display: "flex", gap: 2 }}>
                        {(!selectedReservation.Res_CheckStatus ||
                          selectedReservation.Res_CheckStatus.trim() === "" ||
                          selectedReservation.Res_CheckStatus.trim() ===
                          "Pending" ||
                          selectedReservation.Res_CheckStatus.trim() ===
                          "Confirm" ||
                          selectedReservation.Res_CheckStatus.trim() ===
                          "B") && (
                            <Button
                              variant={
                                caregiverStatus === "I" ? "contained" : "outlined"
                              }
                              color="success"
                              onClick={() => setCaregiverStatus("I")}
                              fullWidth
                              size={isMobile ? "medium" : "large"}
                              startIcon={<CheckCircleIcon />}
                              sx={{
                                borderRadius: 1,
                                py: isMobile ? 1 : 1.5,
                                textTransform: "none",
                              }}
                            >
                              {t("checkInGuest")}
                            </Button>
                          )}

                        {(selectedReservation.Res_CheckStatus.trim() ===
                          "Check In" ||
                          selectedReservation.Res_CheckStatus.trim() ===
                          "I") && (
                            <Button
                              variant={
                                caregiverStatus === "O" ? "contained" : "outlined"
                              }
                              color="primary"
                              onClick={() => setCaregiverStatus("O")}
                              fullWidth
                              size={isMobile ? "medium" : "large"}
                              startIcon={<DoneIcon />}
                              sx={{
                                borderRadius: 1,
                                py: isMobile ? 1 : 1.5,
                                textTransform: "none",
                              }}
                            >
                              {t("checkOutGuest")}
                            </Button>
                          )}
                      </Box>
                    )}

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block" }}
                    >
                      {t("selectAction")}
                    </Typography>
                  </Box>

                  {/* Bungalow Condition - Only show when Check Out selected */}
                  {caregiverStatus === "O" && (
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: "white",
                        borderRadius: 1,
                        border: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight="medium"
                        gutterBottom
                      >
                        {t("bungalowCondition")}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {t("bungalowConditionQuestion")}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <Button
                          variant={
                            feedbackType === "good" ? "contained" : "outlined"
                          }
                          color="success"
                          onClick={() => setFeedbackType("good")}
                          fullWidth
                          size="small"
                          startIcon={<ThumbUpIcon />}
                          sx={{
                            borderRadius: 1,
                            py: 1,
                            textTransform: "none",
                          }}
                        >
                          {t("checkedOutWithoutIssue")}
                        </Button>

                        <Button
                          variant={
                            feedbackType === "bad" ? "contained" : "outlined"
                          }
                          color="error"
                          onClick={() => setFeedbackType("bad")}
                          fullWidth
                          size="small"
                          startIcon={<ThumbDownIcon />}
                          sx={{
                            borderRadius: 1,
                            py: 1,
                            textTransform: "none",
                          }}
                        >
                          {t("checkedOutWithIssues")}
                        </Button>
                      </Box>

                      {feedbackType === "bad" && (
                        <Box
                          sx={{
                            mt: 2,
                            p: 2,
                            backgroundColor: "#fff3e0",
                            borderRadius: 2,
                            border: "1px dashed #ff9800",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <WarningIcon color="warning" fontSize="small" />
                            <Typography
                              variant="body2"
                              color="warning.dark"
                              fontWeight="medium"
                            >
                              Important Notice
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {t("contactInstructions")}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            </DialogContent>

            {/* Simple Dialog Actions */}
            <DialogActions
              sx={{
                p: isMobile ? 2 : 3,
                borderTop: `1px solid ${theme.palette.divider}`,
                gap: 2,
                backgroundColor: "white",
              }}
            >
              <Button
                onClick={handleCloseDialog}
                disabled={isSubmitting}
                variant="outlined"
                fullWidth={isMobile}
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  flex: isMobile ? 1 : "none",
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                variant="contained"
                onClick={handleUpdateStatus}
                disabled={
                  isSubmitting ||
                  !caregiverStatus ||
                  (caregiverStatus === "I" && capacityError)
                }
                fullWidth={isMobile}
                sx={{
                  borderRadius: 1,
                  textTransform: "none",
                  flex: isMobile ? 1 : "none",
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>{t("processing")}</span>
                  </Box>
                ) : caregiverStatus === "I" ? (
                  t("confirmCheckIn")
                ) : caregiverStatus === "O" ? (
                  t("confirmCheckOut")
                ) : (
                  t("updateStatusButton")
                )}
              </Button>
            </DialogActions>
          </Dialog>

          <FeedbackDialog
            open={feedbackDialogOpen}
            onClose={() => setFeedbackDialogOpen(false)}
            reservationNo={selectedFeedbackReservation}
            data={data}
            feedbackData={feedbackData}
            feedbackLoadingById={feedbackLoadingById}
            feedbackErrorById={feedbackErrorById}
            onCheckout={handleCheckoutFromFeedback}
            showCheckout={shouldShowCheckoutInFeedback(
              selectedFeedbackReservation,
            )}
            theme={theme}
            language={language}
            t={t}
          />

          {/* Checkout Dialog */}
          <CheckoutDialog
            open={checkoutDialogOpen}
            onClose={() => {
              setCheckoutDialogOpen(false);
              setValidationError("");
            }}
            reservationNo={selectedFeedbackReservation}
            checkoutFeedbackType={checkoutFeedbackType}
            setCheckoutFeedbackType={setCheckoutFeedbackType}
            checkoutComment={checkoutComment}
            setCheckoutComment={setCheckoutComment}
            validationError={validationError}
            setValidationError={setValidationError}
            isSubmitting={isSubmitting}
            handleCheckoutSubmit={handleCheckoutSubmit}
            theme={theme}
            isMobile={isMobile}
          />
        </Box>
      )}
    </div>
  );
};

export default CaregiverPage;
