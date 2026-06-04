
///---------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
//   Grid,
//   Paper,
//   Divider,
//   Chip,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import NoteIcon from "@mui/icons-material/Note";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
// import Swal from "sweetalert2";
// import ReservationCancelModal from "../Reservations/ReservationCancelModal";
// import axios from "axios";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import { useAuth } from "../../../context/AuthContext";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   maxWidth: "90vw",
//   maxHeight: "90vh",
//   overflow: "auto",
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//   p: 0,
// };

// const PointsEarnedIcon = () => {
//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         padding: 2,
//         borderRadius: 2,
//         background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
//         mb: 2,
//       }}
//     >
//       <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 36, mr: 2 }} />
//       <Box>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
//           12 Points
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#7e57c2" }}>
//           You'll earn with this reservation
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// const ReservationModal = ({ open, handleClose }) => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [bungalowType, setBungalowType] = useState("");
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [guestName, setGuestName] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [capacityError, setCapacityError] = useState("");
//   const [cancelModalOpen, setCancelModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { authKey } = useAuth();

//   const bungalowOptions = [
//     { 
//       value: 1, 
//       label: "Main Bungalow",
//       maxCapacity: 12,
//       description: "Maximum 12 guests (adults + children)"
//     },
//     { 
//       value: 2, 
//       label: "The Little Haven",
//       maxCapacity: 5,
//       description: "Maximum 5 guests (adults + children)"
//     },
//   ];

//   // Get selected bungalow details
//   const selectedBungalow = bungalowOptions.find(option => option.value === bungalowType);

//   // Validate capacity when bungalow type, adults, or children change
//   useEffect(() => {
//     if (selectedBungalow) {
//       const totalGuests = adults + children;
//       if (totalGuests > selectedBungalow.maxCapacity) {
//         setCapacityError(`Exceeds maximum capacity of ${selectedBungalow.maxCapacity} guests for ${selectedBungalow.label}`);
//       } else if (totalGuests === 0) {
//         setCapacityError("At least 1 guest is required");
//       } else {
//         setCapacityError("");
//       }
//     }
//   }, [bungalowType, adults, children, selectedBungalow]);

//   const handleCancel = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Confirm Cancellation",
//       text: "Are you sure you want to cancel?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel",
//       cancelButtonText: "No, Go Back",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleClose();
//       }
//     });
//   };

//   const handleBookClick = async () => {
//     // Validate required fields
//     if (!checkInDate || !checkOutDate || !bungalowType) {
//       Swal.fire({
//         icon: "warning",
//         title: "Oops...",
//         text: "Please select Check-in Date, Check-out Date and Bungalow Type.",
//         confirmButtonColor: "#3f51b5",
//       });
//       return;
//     }

//     // Validate dates
//     if (checkInDate >= checkOutDate) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Dates",
//         text: "Check-out date must be after check-in date.",
//         confirmButtonColor: "#3f51b5",
//       });
//       return;
//     }

//     // Validate capacity
//     if (capacityError) {
//       Swal.fire({
//         icon: "warning",
//         title: "Capacity Exceeded",
//         text: capacityError,
//         confirmButtonColor: "#3f51b5",
//       });
//       return;
//     }

//     const confirmation = await Swal.fire({
//       icon: "question",
//       title: "Confirm Booking",
//       text: "Are you sure you want to proceed with the booking?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Book Now",
//       cancelButtonText: "Not Yet",
//       confirmButtonColor: "#3f51b5",
//       cancelButtonColor: "#f44336",
//     });

//     if (confirmation.isConfirmed) {
//       try {
//         setLoading(true); 
//         const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
//         const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd"); 

//         const response = await axios.post(
//           `Reservation/PostBooking?P_BUNGALOW_ID=${bungalowType}&P_CHECK_IN=${formattedCheckIn}&P_CHECK_OUT=${formattedCheckOut}&P_ADULTS=${adults}&P_CHILDREN=${children}&P_REMARKS=${remarks}`,
//           {},
//           {
//             headers: {
//               "auth-key": authKey,
//             },
//           }
//         );

//         if (response.data.StatusCode === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Booking Confirmed!",
//             text: "Your reservation has been successfully booked.",
//             confirmButtonColor: "#4caf50",
//           }).then(() => {
//             handleClose();
//             window.location.reload();
//           });
//         } else {
//           throw new Error(response.data.Message || "Booking failed");
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Booking Failed",
//           text: error.message || "An error occurred while booking",
//           confirmButtonColor: "#f44336",
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleCancelClick = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Cancel Reservation?",
//       text: "Are you sure you want to cancel this reservation?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel It",
//       cancelButtonText: "No, Keep It",
//       confirmButtonColor: "#f44336",
//       cancelButtonColor: "#3f51b5",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setCancelModalOpen(true);
//       }
//     });
//   };

//   const handleCancelModalClose = () => {
//     setCancelModalOpen(false);
//   };

//   // Calculate number of nights (if both dates are selected)
//   const calculateNights = () => {
//     if (checkInDate && checkOutDate) {
//       const diffTime = Math.abs(checkOutDate - checkInDate);
//       return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }
//     return null;
//   };

//   const nights = calculateNights();

//   // Calculate total guests
//   const totalGuests = adults + children;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           {/* Header */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#1976d2",
//               color: "white",
//               borderTopLeftRadius: 8,
//               borderTopRightRadius: 8,
//               position: "relative",
//             }}
//           >
//             <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
//               New Reservation
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleClose}
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 color: "white",
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Content */}
//           <Box sx={{ p: 3 }}>
//             {/* Bungalow Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <HomeIcon sx={{ mr: 1 }} /> Select Bungalow
//               </Typography>
//               <TextField
//                 select
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Select a bungalow type"
//                 value={bungalowType}
//                 onChange={(e) => setBungalowType(e.target.value)}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {bungalowOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     <Box>
//                       <Typography variant="body1">{option.label}</Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {option.description}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Box>

//             {/* Guest Information */}
//             {bungalowType && (
//               <Box sx={{ mb: 3 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     mb: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: "500",
//                     color: "#1976d2",
//                   }}
//                 >
//                   <FamilyRestroomIcon sx={{ mr: 1 }} /> Guest Information
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Adults"
//                       value={adults}
//                       onChange={(e) => setAdults(parseInt(e.target.value))}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array(selectedBungalow?.maxCapacity || 12).keys()].map((num) => (
//                         <MenuItem key={num + 1} value={num + 1}>
//                           {num + 1}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Children"
//                       value={children}
//                       onChange={(e) => setChildren(parseInt(e.target.value))}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array((selectedBungalow?.maxCapacity || 12) + 1).keys()].map((num) => (
//                         <MenuItem key={num} value={num}>
//                           {num}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 </Grid>

//                 {/* Capacity Info and Warning */}
//                 <Box sx={{ mt: 1 }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Total guests: {totalGuests} {selectedBungalow && `(Max: ${selectedBungalow.maxCapacity})`}
//                   </Typography>

//                   {capacityError && (
//                     <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
//                       {capacityError}
//                     </Alert>
//                   )}

//                   {!capacityError && selectedBungalow && totalGuests > 0 && (
//                     <Alert 
//                       severity={totalGuests === selectedBungalow.maxCapacity ? "warning" : "success"} 
//                       sx={{ mt: 1, borderRadius: 2 }}
//                     >
//                       {totalGuests === selectedBungalow.maxCapacity 
//                         ? `Maximum capacity reached for ${selectedBungalow.label}`
//                         : `Capacity: ${totalGuests}/${selectedBungalow.maxCapacity} guests`
//                       }
//                     </Alert>
//                   )}
//                 </Box>
//               </Box>
//             )}

//             {/* Dates Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <CalendarMonthIcon sx={{ mr: 1 }} /> Select Dates
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-in Date"
//                     value={checkInDate}
//                     onChange={(newValue) => setCheckInDate(newValue)}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                     minDate={new Date()}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-out Date"
//                     value={checkOutDate}
//                     onChange={(newValue) => setCheckOutDate(newValue)}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                     minDate={checkInDate || new Date()}
//                   />
//                 </Grid>
//               </Grid>

//               {nights && (
//                 <Box
//                   sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <Chip
//                     label={`${nights} ${nights === 1 ? "night" : "nights"}`}
//                     color="primary"
//                     size="small"
//                   />
//                 </Box>
//               )}
//             </Box>

//             {/* Remarks */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <NoteIcon sx={{ mr: 1 }} /> Special Requests
//               </Typography>
//               <TextField
//                 fullWidth
//                 placeholder="Any special requests or notes for your stay?"
//                 variant="outlined"
//                 multiline
//                 rows={3}
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box>

//             {/* Points */}
//             <PointsEarnedIcon />

//             <ReservationCancelModal
//               open={cancelModalOpen}
//               handleClose={handleCancelModalClose}
//             />
//           </Box>

//           {/* Footer with Actions */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#f5f5f5",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//               borderTop: "1px solid #e0e0e0",
//               borderBottomLeftRadius: 8,
//               borderBottomRightRadius: 8,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleBookClick}
//               disabled={loading || !!capacityError}
//               startIcon={
//                 loading && <CircularProgress size={20} color="inherit" />
//               }
//               sx={{
//                 borderRadius: 2,
//                 bgcolor: "#1976d2",
//                 "&:hover": {
//                   bgcolor: "#303f9f",
//                 },
//                 "&:disabled": {
//                   bgcolor: "#cccccc",
//                 },
//               }}
//             >
//               {loading ? "Booking..." : "Confirm Booking"}
//             </Button>
//             <Button variant="outlined" onClick={handleCancel}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </LocalizationProvider>
//   );
// };

// export default ReservationModal;











// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
//   Grid,
//   Paper,
//   Divider,
//   Chip,
//   CircularProgress,
//   Alert,
//   LinearProgress,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import NoteIcon from "@mui/icons-material/Note";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import Swal from "sweetalert2";
// import ReservationCancelModal from "../Reservations/ReservationCancelModal";
// import axios from "axios";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import { useAuth } from "../../../context/AuthContext";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   maxWidth: "90vw",
//   maxHeight: "90vh",
//   overflow: "auto",
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//   p: 0,
// };

// const PointsEarnedIcon = () => {
//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         padding: 2,
//         borderRadius: 2,
//         background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
//         mb: 2,
//       }}
//     >
//       <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 36, mr: 2 }} />
//       <Box>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
//           12 Points
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#7e57c2" }}>
//           You'll earn with this reservation
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// const CountdownTimer = ({ secondsRemaining, totalSeconds }) => {
//   const progress = (secondsRemaining / totalSeconds) * 100;
//   const minutes = Math.floor(secondsRemaining / 60);
//   const seconds = secondsRemaining % 60;

//   // Color changes based on time remaining
//   const getTimerColor = () => {
//     if (secondsRemaining > 30) return "primary";
//     if (secondsRemaining > 10) return "warning";
//     return "error";
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 2 }}>
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//         <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
//           <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
//           Time remaining to complete booking:
//         </Typography>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             fontWeight: "bold",
//             color: secondsRemaining <= 10 ? "error.main" : secondsRemaining <= 30 ? "warning.main" : "primary.main"
//           }}
//         >
//           {minutes}:{seconds.toString().padStart(2, '0')}
//         </Typography>
//       </Box>
//       <LinearProgress 
//         variant="determinate" 
//         value={progress} 
//         color={getTimerColor()}
//         sx={{ 
//           height: 6, 
//           borderRadius: 3,
//           backgroundColor: '#f0f0f0'
//         }}
//       />
//     </Box>
//   );
// };

// const ReservationModal = ({ open, handleClose }) => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [bungalowType, setBungalowType] = useState("");
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [guestName, setGuestName] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [capacityError, setCapacityError] = useState("");
//   const [cancelModalOpen, setCancelModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Countdown state
//   const [countdownActive, setCountdownActive] = useState(false);
//   const [secondsRemaining, setSecondsRemaining] = useState(60);
//   const [countdownInterval, setCountdownInterval] = useState(null);

//   const { authKey } = useAuth();

//   const bungalowOptions = [
//     { 
//       value: 1, 
//       label: "Main Bungalow",
//       maxCapacity: 12,
//       description: "Maximum 12 guests (adults + children)"
//     },
//     { 
//       value: 2, 
//       label: "The Little Haven",
//       maxCapacity: 5,
//       description: "Maximum 5 guests (adults + children)"
//     },
//   ];

//   // Start countdown when modal opens
//   useEffect(() => {
//     if (open) {
//       startCountdown();
//     } else {
//       stopCountdown();
//     }

//     // Cleanup on unmount
//     return () => {
//       stopCountdown();
//     };
//   }, [open]);

//   // Countdown logic
//   const startCountdown = () => {
//     setSecondsRemaining(60);
//     setCountdownActive(true);

//     const interval = setInterval(() => {
//       setSecondsRemaining(prev => {
//         if (prev <= 1) {
//           clearInterval(interval);
//           handleAutoClose();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     setCountdownInterval(interval);
//   };

//   const stopCountdown = () => {
//     if (countdownInterval) {
//       clearInterval(countdownInterval);
//       setCountdownInterval(null);
//     }
//     setCountdownActive(false);
//   };

//   const resetCountdown = () => {
//     stopCountdown();
//     startCountdown();
//   };

//   const handleAutoClose = () => {
//     Swal.fire({
//       icon: "warning",
//       title: "Time's Up!",
//       text: "Your booking session has expired. Please start over.",
//       confirmButtonColor: "#3f51b5",
//     }).then(() => {
//       handleClose();
//     });
//   };

//   // Reset countdown on user interaction
//   const handleUserInteraction = () => {
//     if (countdownActive) {
//       resetCountdown();
//     }
//   };

//   // Get selected bungalow details
//   const selectedBungalow = bungalowOptions.find(option => option.value === bungalowType);

//   // Validate capacity when bungalow type, adults, or children change
//   useEffect(() => {
//     if (selectedBungalow) {
//       const totalGuests = adults + children;
//       if (totalGuests > selectedBungalow.maxCapacity) {
//         setCapacityError(`Exceeds maximum capacity of ${selectedBungalow.maxCapacity} guests for ${selectedBungalow.label}`);
//       } else if (totalGuests === 0) {
//         setCapacityError("At least 1 guest is required");
//       } else {
//         setCapacityError("");
//       }
//     }
//   }, [bungalowType, adults, children, selectedBungalow]);

//   const handleCancel = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Confirm Cancellation",
//       text: "Are you sure you want to cancel?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel",
//       cancelButtonText: "No, Go Back",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         stopCountdown();
//         handleClose();
//       }
//     });
//   };

//   const handleBookClick = async () => { 
//     stopCountdown();

//     if (!checkInDate || !checkOutDate || !bungalowType) {
//       Swal.fire({
//         icon: "warning",
//         title: "Oops...",
//         text: "Please select Check-in Date, Check-out Date and Bungalow Type.",
//         confirmButtonColor: "#3f51b5",
//       });
//       startCountdown();
//       return;
//     }

//     // Validate dates
//     if (checkInDate >= checkOutDate) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Dates",
//         text: "Check-out date must be after check-in date.",
//         confirmButtonColor: "#3f51b5",
//       });
//       startCountdown();
//       return;
//     }

//     // Validate capacity
//     if (capacityError) {
//       Swal.fire({
//         icon: "warning",
//         title: "Capacity Exceeded",
//         text: capacityError,
//         confirmButtonColor: "#3f51b5",
//       });
//       startCountdown();
//       return;
//     }

//     const confirmation = await Swal.fire({
//       icon: "question",
//       title: "Confirm Booking",
//       text: "Are you sure you want to proceed with the booking?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Book Now",
//       cancelButtonText: "Not Yet",
//       confirmButtonColor: "#3f51b5",
//       cancelButtonColor: "#f44336",
//     });

//     if (confirmation.isConfirmed) {
//       try {
//         setLoading(true); 
//         const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
//         const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd"); 

//         const response = await axios.post(
//           `Reservation/PostBooking?P_BUNGALOW_ID=${bungalowType}&P_CHECK_IN=${formattedCheckIn}&P_CHECK_OUT=${formattedCheckOut}&P_ADULT_COUNT=${adults}&P_CHILD_COUNT=${children}&P_REMARKS=${remarks}`,
//           {},
//           {
//             headers: {
//               "auth-key": authKey,
//             },
//           }
//         );

//         if (response.data.StatusCode === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Booking Confirmed!",
//             text: "Your reservation has been successfully booked.",
//             confirmButtonColor: "#4caf50",
//           }).then(() => {
//             handleClose();
//             window.location.reload();
//           });
//         } else {
//           throw new Error(response.data.Message || "Booking failed");
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Booking Failed",
//           text: error.message || "An error occurred while booking",
//           confirmButtonColor: "#f44336",
//         });
//         // Restart countdown on error
//         startCountdown();
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       // Restart countdown if user cancels confirmation
//       startCountdown();
//     }
//   };

//   const handleCancelClick = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Cancel Reservation?",
//       text: "Are you sure you want to cancel this reservation?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel It",
//       cancelButtonText: "No, Keep It",
//       confirmButtonColor: "#f44336",
//       cancelButtonColor: "#3f51b5",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setCancelModalOpen(true);
//       }
//     });
//   };

//   const handleCancelModalClose = () => {
//     setCancelModalOpen(false);
//   };

//   // Calculate number of nights (if both dates are selected)
//   const calculateNights = () => {
//     if (checkInDate && checkOutDate) {
//       const diffTime = Math.abs(checkOutDate - checkInDate);
//       return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }
//     return null;
//   };

//   const nights = calculateNights();

//   // Calculate total guests
//   const totalGuests = adults + children;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Modal
//         open={open}
//         onClose={(event, reason) => {
//           // Prevent closing by clicking backdrop when countdown is active
//           if (reason === 'backdropClick' && countdownActive) {
//             return;
//           }
//           stopCountdown();
//           handleClose();
//         }}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         disableEscapeKeyDown={countdownActive}
//       >
//         <Box sx={style}>
//           {/* Header */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#1976d2",
//               color: "white",
//               borderTopLeftRadius: 8,
//               borderTopRightRadius: 8,
//               position: "relative",
//             }}
//           >
//             <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
//               New Reservation
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleCancel}
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 color: "white",
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Countdown Timer */}
//           {countdownActive && (
//             <Box sx={{ px: 3, pt: 2 }}>
//               <CountdownTimer 
//                 secondsRemaining={secondsRemaining} 
//                 totalSeconds={60} 
//               />
//             </Box>
//           )}

//           {/* Content */}
//           <Box 
//             sx={{ p: 3 }} 
//             onClick={handleUserInteraction}
//             onKeyDown={handleUserInteraction}
//           >
//             {/* Bungalow Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <HomeIcon sx={{ mr: 1 }} /> Select Bungalow
//               </Typography>
//               <TextField
//                 select
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Select a bungalow type"
//                 value={bungalowType}
//                 onChange={(e) => {
//                   setBungalowType(e.target.value);
//                   handleUserInteraction();
//                 }}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {bungalowOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     <Box>
//                       <Typography variant="body1">{option.label}</Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {option.description}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Box>

//             {/* Guest Information */}
//             {bungalowType && (
//               <Box sx={{ mb: 3 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     mb: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: "500",
//                     color: "#1976d2",
//                   }}
//                 >
//                   <FamilyRestroomIcon sx={{ mr: 1 }} /> Guest Information
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Adults"
//                       value={adults}
//                       onChange={(e) => {
//                         setAdults(parseInt(e.target.value));
//                         handleUserInteraction();
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array(selectedBungalow?.maxCapacity || 12).keys()].map((num) => (
//                         <MenuItem key={num + 1} value={num + 1}>
//                           {num + 1}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Children"
//                       value={children}
//                       onChange={(e) => {
//                         setChildren(parseInt(e.target.value));
//                         handleUserInteraction();
//                       }}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array((selectedBungalow?.maxCapacity || 12) + 1).keys()].map((num) => (
//                         <MenuItem key={num} value={num}>
//                           {num}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 </Grid>

//                 {/* Capacity Info and Warning */}
//                 <Box sx={{ mt: 1 }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Total guests: {totalGuests} {selectedBungalow && `(Max: ${selectedBungalow.maxCapacity})`}
//                   </Typography>

//                   {capacityError && (
//                     <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
//                       {capacityError}
//                     </Alert>
//                   )}

//                   {!capacityError && selectedBungalow && totalGuests > 0 && (
//                     <Alert 
//                       severity={totalGuests === selectedBungalow.maxCapacity ? "warning" : "success"} 
//                       sx={{ mt: 1, borderRadius: 2 }}
//                     >
//                       {totalGuests === selectedBungalow.maxCapacity 
//                         ? `Maximum capacity reached for ${selectedBungalow.label}`
//                         : `Capacity: ${totalGuests}/${selectedBungalow.maxCapacity} guests`
//                       }
//                     </Alert>
//                   )}
//                 </Box>
//               </Box>
//             )}

//             {/* Dates Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <CalendarMonthIcon sx={{ mr: 1 }} /> Select Dates
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-in Date"
//                     value={checkInDate}
//                     onChange={(newValue) => {
//                       setCheckInDate(newValue);
//                       handleUserInteraction();
//                     }}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                     minDate={new Date()}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-out Date"
//                     value={checkOutDate}
//                     onChange={(newValue) => {
//                       setCheckOutDate(newValue);
//                       handleUserInteraction();
//                     }}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                     minDate={checkInDate || new Date()}
//                   />
//                 </Grid>
//               </Grid>

//               {nights && (
//                 <Box
//                   sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <Chip
//                     label={`${nights} ${nights === 1 ? "night" : "nights"}`}
//                     color="primary"
//                     size="small"
//                   />
//                 </Box>
//               )}
//             </Box>

//             {/* Remarks */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <NoteIcon sx={{ mr: 1 }} /> Special Requests
//               </Typography>
//               <TextField
//                 fullWidth
//                 placeholder="Any special requests or notes for your stay?"
//                 variant="outlined"
//                 multiline
//                 rows={3}
//                 value={remarks}
//                 onChange={(e) => {
//                   setRemarks(e.target.value);
//                   handleUserInteraction();
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box>

//             {/* Points */}
//             <PointsEarnedIcon />

//             <ReservationCancelModal
//               open={cancelModalOpen}
//               handleClose={handleCancelModalClose}
//             />
//           </Box>

//           {/* Footer with Actions */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#f5f5f5",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//               borderTop: "1px solid #e0e0e0",
//               borderBottomLeftRadius: 8,
//               borderBottomRightRadius: 8,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleBookClick}
//               disabled={loading || !!capacityError}
//               startIcon={
//                 loading && <CircularProgress size={20} color="inherit" />
//               }
//               sx={{
//                 borderRadius: 2,
//                 bgcolor: "#1976d2",
//                 "&:hover": {
//                   bgcolor: "#303f9f",
//                 },
//                 "&:disabled": {
//                   bgcolor: "#cccccc",
//                 },
//               }}
//             >
//               {loading ? "Booking..." : "Confirm Booking"}
//             </Button>
//             <Button variant="outlined" onClick={handleCancel}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </LocalizationProvider>
//   );
// };

// export default ReservationModal;








//--------------------------------------------------------------------30-12-2025-------------------------------------------------
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
//   Grid,
//   Paper,
//   Divider,
//   Chip,
//   CircularProgress,
//   Alert,
//   LinearProgress,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import NoteIcon from "@mui/icons-material/Note";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import Swal from "sweetalert2";
// import ReservationCancelModal from "../Reservations/ReservationCancelModal";
// import axios from "axios";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import { useAuth } from "../../../context/AuthContext";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   maxWidth: "90vw",
//   maxHeight: "90vh",
//   overflow: "auto",
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//   p: 0,
// };

// const PointsEarnedIcon = () => {
//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         padding: 2,
//         borderRadius: 2,
//         background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
//         mb: 2,
//       }}
//     >
//       <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 36, mr: 2 }} />
//       <Box>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
//           12 Points
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#7e57c2" }}>
//           You'll earn with this reservation
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// const CountdownTimer = ({ secondsRemaining, totalSeconds }) => {
//   const progress = (secondsRemaining / totalSeconds) * 100;
//   const minutes = Math.floor(secondsRemaining / 60);
//   const seconds = secondsRemaining % 60;

//   const getTimerColor = () => {
//     if (secondsRemaining > 300) return "primary";  
//     if (secondsRemaining > 60) return "warning";  
//     return "error";
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 2 }}>
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//         <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
//           <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
//           Time remaining to complete booking:
//         </Typography>
//         <Typography 
//           variant="body2" 
//           sx={{ 
//             fontWeight: "bold",
//             color: secondsRemaining <= 60 ? "error.main" : secondsRemaining <= 300 ? "warning.main" : "primary.main"
//           }}
//         >
//           {minutes}:{seconds.toString().padStart(2, '0')}
//         </Typography>
//       </Box>
//       <LinearProgress 
//         variant="determinate" 
//         value={progress} 
//         color={getTimerColor()}
//         sx={{ 
//           height: 6, 
//           borderRadius: 3,
//           backgroundColor: '#f0f0f0'
//         }}
//       />
//     </Box>
//   );
// };

// const ReservationModal = ({ open, handleClose }) => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [bungalowType, setBungalowType] = useState("");
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [guestName, setGuestName] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [capacityError, setCapacityError] = useState("");
//   const [cancelModalOpen, setCancelModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [countdownActive, setCountdownActive] = useState(false);
//   const [secondsRemaining, setSecondsRemaining] = useState(600); 
//   const countdownIntervalRef = useRef(null);


//   const lastResetTimeRef = useRef(0);
//   const RESET_COOLDOWN = 5000;  

//   const { authKey } = useAuth();

//   const bungalowOptions = [
//     { 
//       value: 1, 
//       label: "Main Bungalow",
//       maxCapacity: 12,
//       description: "Maximum 12 guests (adults + children)"
//     },
//     { 
//       value: 2, 
//       label: "The Little Haven",
//       maxCapacity: 5,
//       description: "Maximum 5 guests (adults + children)"
//     },
//   ];

//   // Start countdown when modal opens
//   useEffect(() => {
//     if (open) {
//       startCountdown();
//     } else {
//       stopCountdown();
//     }

//     // Cleanup on unmount
//     return () => {
//       stopCountdown();
//     };
//   }, [open]);


//   const startCountdown = () => {
//     setSecondsRemaining(600); 
//     setCountdownActive(true);

//     countdownIntervalRef.current = setInterval(() => {
//       setSecondsRemaining(prev => {
//         if (prev <= 1) {
//           clearInterval(countdownIntervalRef.current);
//           handleAutoClose();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const stopCountdown = () => {
//     if (countdownIntervalRef.current) {
//       clearInterval(countdownIntervalRef.current);
//       countdownIntervalRef.current = null;
//     }
//     setCountdownActive(false);
//   };

//   const resetCountdown = () => {
//     const now = Date.now();

//     if (now - lastResetTimeRef.current > RESET_COOLDOWN) {
//       stopCountdown();
//       startCountdown();
//       lastResetTimeRef.current = now;
//     }
//   };

//   const handleAutoClose = () => {
//     Swal.fire({
//       icon: "warning",
//       title: "Time's Up!",
//       text: "Your booking session has expired. Please start over.",
//       confirmButtonColor: "#3f51b5",
//     }).then(() => {
//       handleClose();
//     });
//   };


//   const handleBungalowChange = (e) => {
//     setBungalowType(e.target.value);
//     resetCountdown();
//   };

//   const handleAdultsChange = (e) => {
//     setAdults(parseInt(e.target.value));
//     resetCountdown();
//   };

//   const handleChildrenChange = (e) => {
//     setChildren(parseInt(e.target.value));
//     resetCountdown();
//   };

//   const handleCheckInChange = (newValue) => {
//     setCheckInDate(newValue);
//     resetCountdown();
//   };

//   const handleCheckOutChange = (newValue) => {
//     setCheckOutDate(newValue);
//     resetCountdown();
//   };

//   const handleRemarksChange = (e) => {
//     setRemarks(e.target.value);

//   };


//   const selectedBungalow = bungalowOptions.find(option => option.value === bungalowType);

//   useEffect(() => {
//     if (selectedBungalow) {
//       const totalGuests = adults + children;
//       if (totalGuests > selectedBungalow.maxCapacity) {
//         setCapacityError(`Exceeds maximum capacity of ${selectedBungalow.maxCapacity} guests for ${selectedBungalow.label}`);
//       } else if (totalGuests === 0) {
//         setCapacityError("At least 1 guest is required");
//       } else {
//         setCapacityError("");
//       }
//     }
//   }, [bungalowType, adults, children, selectedBungalow]);

//   const handleCancel = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Confirm Cancellation",
//       text: "Are you sure you want to cancel?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel",
//       cancelButtonText: "No, Go Back",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         stopCountdown();
//         handleClose();
//       }
//     });
//   };

//   const handleBookClick = async () => { 
//     stopCountdown();

//     if (!checkInDate || !checkOutDate || !bungalowType) {
//       Swal.fire({
//         icon: "warning",
//         title: "Oops...",
//         text: "Please select Check-in Date, Check-out Date and Bungalow Type.",
//         confirmButtonColor: "#3f51b5",
//       });
//       startCountdown();
//       return;
//     }


//     if (checkInDate >= checkOutDate) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Dates",
//         text: "Check-out date must be after check-in date.",
//         confirmButtonColor: "#3f51b5",
//       });
//       startCountdown();
//       return;
//     }

//     if (capacityError) {
//       Swal.fire({
//         icon: "warning",
//         title: "Capacity Exceeded",
//         text: capacityError,
//         confirmButtonColor: "#3f51b5",
//       });
//       startCountdown();
//       return;
//     }

//     const confirmation = await Swal.fire({
//       icon: "question",
//       title: "Confirm Booking",
//       text: "Are you sure you want to proceed with the booking?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Book Now",
//       cancelButtonText: "Not Yet",
//       confirmButtonColor: "#3f51b5",
//       cancelButtonColor: "#f44336",
//     });

//     if (confirmation.isConfirmed) {
//       try {
//         setLoading(true); 
//         const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
//         const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd"); 

//         const response = await axios.post(
//           `Reservation/PostBooking?P_BUNGALOW_ID=${bungalowType}&P_CHECK_IN=${formattedCheckIn}&P_CHECK_OUT=${formattedCheckOut}&P_ADULT_COUNT=${adults}&P_CHILD_COUNT=${children}&P_REMARKS=${remarks}`,
//           {},
//           {
//             headers: {
//               "auth-key": authKey,
//             },
//           }
//         );

//         if (response.data.StatusCode === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Booking Confirmed!",
//             text: "Your reservation has been successfully booked.",
//             confirmButtonColor: "#4caf50",
//           }).then(() => {
//             handleClose();
//             window.location.reload();
//           });
//         } else {
//           throw new Error(response.data.Message || "Booking failed");
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Booking Failed",
//           text: error.message || "An error occurred while booking",
//           confirmButtonColor: "#f44336",
//         });

//         startCountdown();
//       } finally {
//         setLoading(false);
//       }
//     } else {

//       startCountdown();
//     }
//   };

//   const handleCancelClick = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Cancel Reservation?",
//       text: "Are you sure you want to cancel this reservation?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel It",
//       cancelButtonText: "No, Keep It",
//       confirmButtonColor: "#f44336",
//       cancelButtonColor: "#3f51b5",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setCancelModalOpen(true);
//       }
//     });
//   };

//   const handleCancelModalClose = () => {
//     setCancelModalOpen(false);
//   };


//   const calculateNights = () => {
//     if (checkInDate && checkOutDate) {
//       const diffTime = Math.abs(checkOutDate - checkInDate);
//       return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }
//     return null;
//   };

//   const nights = calculateNights();

//   // Calculate total guests
//   const totalGuests = adults + children;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Modal
//         open={open}
//         onClose={(event, reason) => {
//           // Prevent closing by clicking backdrop when countdown is active
//           if (reason === 'backdropClick' && countdownActive) {
//             return;
//           }
//           stopCountdown();
//           handleClose();
//         }}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         disableEscapeKeyDown={countdownActive}
//       >
//         <Box sx={style}>
//           {/* Header */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#1976d2",
//               color: "white",
//               borderTopLeftRadius: 8,
//               borderTopRightRadius: 8,
//               position: "relative",
//             }}
//           >
//             <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
//               New Reservation
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleCancel}
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 color: "white",
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Countdown Timer */}
//           {countdownActive && (
//             <Box sx={{ px: 3, pt: 2 }}>
//               <CountdownTimer 
//                 secondsRemaining={secondsRemaining} 
//                 totalSeconds={600} 
//               />
//             </Box>
//           )}

//           {/* Content */}
//           <Box sx={{ p: 3 }}>
//             {/* Bungalow Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <HomeIcon sx={{ mr: 1 }} /> Select Bungalow
//               </Typography>
//               <TextField
//                 select
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Select a bungalow type"
//                 value={bungalowType}
//                 onChange={handleBungalowChange}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {bungalowOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     <Box>
//                       <Typography variant="body1">{option.label}</Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {option.description}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Box>

//             {/* Guest Information */}
//             {bungalowType && (
//               <Box sx={{ mb: 3 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     mb: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: "500",
//                     color: "#1976d2",
//                   }}
//                 >
//                   <FamilyRestroomIcon sx={{ mr: 1 }} /> Guest Information
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Adults"
//                       value={adults}
//                       onChange={handleAdultsChange}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array(selectedBungalow?.maxCapacity || 12).keys()].map((num) => (
//                         <MenuItem key={num + 1} value={num + 1}>
//                           {num + 1}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Children"
//                       value={children}
//                       onChange={handleChildrenChange}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array((selectedBungalow?.maxCapacity || 12) + 1).keys()].map((num) => (
//                         <MenuItem key={num} value={num}>
//                           {num}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 </Grid>

//                 {/* Capacity Info and Warning */}
//                 <Box sx={{ mt: 1 }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Total guests: {totalGuests} {selectedBungalow && `(Max: ${selectedBungalow.maxCapacity})`}
//                   </Typography>

//                   {capacityError && (
//                     <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
//                       {capacityError}
//                     </Alert>
//                   )}

//                   {!capacityError && selectedBungalow && totalGuests > 0 && (
//                     <Alert 
//                       severity={totalGuests === selectedBungalow.maxCapacity ? "warning" : "success"} 
//                       sx={{ mt: 1, borderRadius: 2 }}
//                     >
//                       {totalGuests === selectedBungalow.maxCapacity 
//                         ? `Maximum capacity reached for ${selectedBungalow.label}`
//                         : `Capacity: ${totalGuests}/${selectedBungalow.maxCapacity} guests`
//                       }
//                     </Alert>
//                   )}
//                 </Box>
//               </Box>
//             )}

//             {/* Dates Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <CalendarMonthIcon sx={{ mr: 1 }} /> Select Dates
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-in Date"
//                     value={checkInDate}
//                     onChange={handleCheckInChange}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                     minDate={new Date()}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-out Date"
//                     value={checkOutDate}
//                     onChange={handleCheckOutChange}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                     minDate={checkInDate || new Date()}
//                   />
//                 </Grid>
//               </Grid>

//               {nights && (
//                 <Box
//                   sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
//                 >
//                   <Chip
//                     label={`${nights} ${nights === 1 ? "night" : "nights"}`}
//                     color="primary"
//                     size="small"
//                   />
//                 </Box>
//               )}
//             </Box>

//             {/* Remarks */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <NoteIcon sx={{ mr: 1 }} /> Special Requests
//               </Typography>
//               <TextField
//                 fullWidth
//                 placeholder="Any special requests or notes for your stay?"
//                 variant="outlined"
//                 multiline
//                 rows={3}
//                 value={remarks}
//                 onChange={handleRemarksChange}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box>

//             {/* Points */}
//             <PointsEarnedIcon />

//             <ReservationCancelModal
//               open={cancelModalOpen}
//               handleClose={handleCancelModalClose}
//             />
//           </Box>

//           {/* Footer with Actions */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#f5f5f5",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//               borderTop: "1px solid #e0e0e0",
//               borderBottomLeftRadius: 8,
//               borderBottomRightRadius: 8,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleBookClick}
//               disabled={loading || !!capacityError}
//               startIcon={
//                 loading && <CircularProgress size={20} color="inherit" />
//               }
//               sx={{
//                 borderRadius: 2,
//                 bgcolor: "#1976d2",
//                 "&:hover": {
//                   bgcolor: "#303f9f",
//                 },
//                 "&:disabled": {
//                   bgcolor: "#cccccc",
//                 },
//               }}
//             >
//               {loading ? "Booking..." : "Confirm Booking"}
//             </Button>
//             <Button variant="outlined" onClick={handleCancel}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </LocalizationProvider>
//   );
// };

// export default ReservationModal;














//---------------------------------------------------------------------2026-01-02----------------------------------------------



// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   MenuItem,
//   Button,
//   IconButton,
//   Grid,
//   Paper,
//   Divider,
//   Chip,
//   CircularProgress,
//   Alert,
//   LinearProgress,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import NoteIcon from "@mui/icons-material/Note";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import Swal from "sweetalert2";
// import ReservationCancelModal from "../Reservations/ReservationCancelModal";
// import axios from "axios";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import { useAuth } from "../../../context/AuthContext";
// import { useDispatch } from "react-redux";
// import { UpdateResStatus } from "../../../action/Reservation";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   maxWidth: "90vw",
//   maxHeight: "90vh",
//   overflow: "auto",
//   bgcolor: "background.paper",
//   borderRadius: 2,
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
//   p: 0,
// };

// const PointsEarnedIcon = () => {
//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         padding: 2,
//         borderRadius: 2,
//         background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
//         mb: 2,
//       }}
//     >
//       <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 36, mr: 2 }} />
//       <Box>
//         <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
//           12 Points
//         </Typography>
//         <Typography variant="body2" sx={{ color: "#7e57c2" }}>
//           You'll earn with this reservation
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// const CountdownTimer = ({ secondsRemaining, totalSeconds }) => {
//   const progress = (secondsRemaining / totalSeconds) * 100;
//   const minutes = Math.floor(secondsRemaining / 60);
//   const seconds = secondsRemaining % 60;

//   const getTimerColor = () => {
//     if (secondsRemaining > 300) return "primary";
//     if (secondsRemaining > 60) return "warning";
//     return "error";
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 2 }}>
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//         <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
//           <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
//           Time remaining to complete booking:
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             fontWeight: "bold",
//             color: secondsRemaining <= 60 ? "error.main" : secondsRemaining <= 300 ? "warning.main" : "primary.main"
//           }}
//         >
//           {minutes}:{seconds.toString().padStart(2, '0')}
//         </Typography>
//       </Box>
//       <LinearProgress
//         variant="determinate"
//         value={progress}
//         color={getTimerColor()}
//         sx={{
//           height: 6,
//           borderRadius: 3,
//           backgroundColor: '#f0f0f0'
//         }}
//       />
//     </Box>
//   );
// };

// const ReservationModal = ({ open, handleClose }) => {
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [bungalowType, setBungalowType] = useState("");
//   const [adults, setAdults] = useState(1);
//   const [children, setChildren] = useState(0);
//   const [guestName, setGuestName] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [capacityError, setCapacityError] = useState("");
//   const [cancelModalOpen, setCancelModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isClosing, setIsClosing] = useState(false);
//   const dispatch = useDispatch();
//   const [countdownActive, setCountdownActive] = useState(false);
//   const [secondsRemaining, setSecondsRemaining] = useState(600);
//   const countdownIntervalRef = useRef(null);
//   const lastResetTimeRef = useRef(0);
//   const RESET_COOLDOWN = 5000;
//   const { authKey } = useAuth();
//   const addMonths = (date, months) => {
//     const d = new Date(date);
//     d.setMonth(d.getMonth() + months);
//     return d;
//   };


//   // --------------------------- calender checkin  & checkout date limit--------------------

//   const today = new Date();
//   //const maxSelectableDate = addMonths(today, 3);

//   const maxSelectableDate = new Date(
//     today.getFullYear(),
//     today.getMonth() + 4,
//     0
//   );
//   const getMaxStayDays = (checkIn) => {
//     if (!checkIn) return 3;

//     const month = new Date(checkIn).getMonth() + 1;

//     if (month === 4 || month === 12) {
//       return 2;
//     }

//     return 3;
//   };



//   const maxStayDays = getMaxStayDays(checkInDate);

//   const maxCheckoutDate = checkInDate
//     ? (() => {
//       const d = new Date(checkInDate);
//       d.setDate(d.getDate() + maxStayDays);
//       return d;
//     })()
//     : null;


//   const bungalowOptions = [
//     {
//       value: 1,
//       label: "Main Bungalow",
//       maxCapacity: 16,
//       description: "Maximum 16 guests (adults + children)"
//     },
//     // {
//     //   value: 2,
//     //   label: "Lower Garden Suite",
//     //   maxCapacity: 5,
//     //   description: "Maximum 5 guests (adults + children)"
//     // },
//   ];

//   const stopCountdown = useCallback(() => {
//     if (countdownIntervalRef.current) {
//       clearInterval(countdownIntervalRef.current);
//       countdownIntervalRef.current = null;
//     }
//     setCountdownActive(false);
//     setSecondsRemaining(600);
//   }, []);

//   const startCountdown = useCallback(() => {
//     stopCountdown();

//     setSecondsRemaining(600);
//     setCountdownActive(true);

//     countdownIntervalRef.current = setInterval(() => {
//       setSecondsRemaining(prev => {
//         if (prev <= 1) {
//           clearInterval(countdownIntervalRef.current);
//           countdownIntervalRef.current = null;
//           handleAutoClose();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   }, [stopCountdown]);

//   const resetCountdown = useCallback(() => {
//     const now = Date.now();
//     if (now - lastResetTimeRef.current > RESET_COOLDOWN) {
//       stopCountdown();
//       startCountdown();
//       lastResetTimeRef.current = now;
//     }
//   }, [startCountdown, stopCountdown]);

//   const handleAutoClose = useCallback(() => {
//     Swal.fire({
//       icon: "warning",
//       title: "Time's Up!",
//       text: "Your booking session has expired. Please start over.",
//       confirmButtonColor: "#3f51b5",
//     }).then(() => {
//       handleCloseModal();
//     });
//   }, []);

//   const handleCloseModal = useCallback((event, reason) => {
//     if (isClosing) return;

//     setIsClosing(true);

//     stopCountdown();

//     if (reason === 'backdropClick' && countdownActive) {
//       setIsClosing(false);
//       return;
//     }

//     setCheckInDate(null);
//     setCheckOutDate(null);
//     setBungalowType("");
//     setAdults(1);
//     setChildren(0);
//     setGuestName("");
//     setRemarks("");
//     setCapacityError("");
//     handleClose();
//     setIsClosing(false);
//   }, [stopCountdown, countdownActive, handleClose, isClosing]);

//   const handleCancel = useCallback(() => {
//     Swal.fire({
//       icon: "question",
//       title: "Cancellation",
//       text: "Are you sure you want to cancel this reservation?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Cancel",
//       cancelButtonText: "No, Go Back",
//       confirmButtonColor: "#f44336",
//       cancelButtonColor: "#3f51b5",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           setLoading(true);

//           const res = await dispatch(UpdateResStatus());

//           if (res?.success) {
//             Swal.fire({
//               icon: "success",
//               title: "Cancelled!",
//               text: "Reservation cancelled successfully.",
//               timer: 2000,
//               showConfirmButton: false,
//               timerProgressBar: true,
//             }).then(() => {
//               handleCloseModal();
//             });
//           }
//         } catch (error) {
//           Swal.fire({
//             icon: "error",
//             title: "Cancellation Failed",
//             text:
//               error?.response?.data?.Result ||
//               "Unable to cancel reservation",
//           });
//         } finally {
//           setLoading(false);
//         }
//       }
//     });
//   }, [dispatch, handleCloseModal]);


//   useEffect(() => {
//     return () => {
//       stopCountdown();
//     };
//   }, [stopCountdown]);

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       stopCountdown();
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       stopCountdown();
//     };
//   }, [stopCountdown]);

//   useEffect(() => {
//     if (open) {
//       setCheckInDate(null);
//       setCheckOutDate(null);
//       setBungalowType("");
//       setAdults(1);
//       setChildren(0);
//       setGuestName("");
//       setRemarks("");
//       setCapacityError("");
//       setLoading(false);
 
//       const timer = setTimeout(() => {
//         startCountdown();
//       }, 100);

//       return () => clearTimeout(timer);
//     } else {
//       stopCountdown();
//     }
//   }, [open, startCountdown, stopCountdown]);


//   const handleBungalowChange = (e) => {
//     setBungalowType(e.target.value);
//     // resetCountdown();
//   };

//   const handleAdultsChange = (e) => {
//     setAdults(parseInt(e.target.value));
//     // resetCountdown();
//   };

//   const handleChildrenChange = (e) => {
//     setChildren(parseInt(e.target.value));
//     //resetCountdown();
//   };

//   const handleCheckInChange = (newValue) => {
//     setCheckInDate(newValue);
//     setCheckOutDate(null);
//     // resetCountdown();
//   };

//   const handleCheckOutChange = (newValue) => {
//     setCheckOutDate(newValue);
//     //resetCountdown();
//   };

//   const handleRemarksChange = (e) => {
//     setRemarks(e.target.value);
//     //resetCountdown();
//   };

//   // Capacity validation
//   const selectedBungalow = bungalowOptions.find(option => option.value === bungalowType);

//   useEffect(() => {
//     if (selectedBungalow) {
//       const totalGuests = adults + children;
//       if (totalGuests > selectedBungalow.maxCapacity) {
//         setCapacityError(`Exceeds maximum capacity of ${selectedBungalow.maxCapacity} guests for ${selectedBungalow.label}`);
//       } else  if (totalGuests === 0) {
//         setCapacityError("At least 1 guest is required");
//       } else {
//         setCapacityError("");
//       }
//     }
//   }, [bungalowType, adults, children, selectedBungalow]);


//   const handleBookClick = async () => {
//     stopCountdown();


//     if (!checkInDate || !checkOutDate || !bungalowType) {
//       Swal.fire({
//         icon: "warning",
//         title: "Oops...",
//         text: "Please select Check-in Date, Check-out Date and Bungalow Type.",
//         confirmButtonColor: "#3f51b5",
//       });
//       //startCountdown(); 
//       return;
//     }

//     if (checkInDate >= checkOutDate) {
//       Swal.fire({
//         icon: "warning",
//         title: "Invalid Dates",
//         text: "Check-out date must be after check-in date.",
//         confirmButtonColor: "#3f51b5",
//       });
//       //startCountdown();  
//       return;
//     }

//     if (capacityError) {
//       Swal.fire({
//         icon: "warning",
//         title: "Capacity Exceeded",
//         text: capacityError,
//         confirmButtonColor: "#3f51b5",
//       });
//       //startCountdown();  
//       return;
//     }

//     const confirmation = await Swal.fire({
//       icon: "question",
//       title: "Reserving",
//       text: "Are you sure you want to proceed with the reserving?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Reserve Now",
//       cancelButtonText: "Not Yet",
//       confirmButtonColor: "#3f51b5",
//       cancelButtonColor: "#f44336",
//     });

//     if (confirmation.isConfirmed) {
//       try {
//         setLoading(true);
//         const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
//         const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");
//         const sno = localStorage.getItem("sno");
//         const logId = localStorage.getItem("logId");

//         const response = await axios.post(
//           `Reservation/PostBooking?P_BUNGALOW_ID=${bungalowType}&P_CHECK_IN=${formattedCheckIn}&P_CHECK_OUT=${formattedCheckOut}&P_ADULT_COUNT=${adults}&P_CHILD_COUNT=${children}&P_LOG_ID=${logId}&P_SERIAL_NO=${sno}`,
//           {},
//           {
//             headers: {
//               "auth-key": authKey,
//             },
//           }
//         );

//         if (response.data.StatusCode === 200) {
//           Swal.fire({
//             icon: "success",
//             title: "Reservation",
//             text: "Your booking request has been received. Confirmation status will be sent to you via SMS.",
//             confirmButtonColor: "#4caf50",
//           }).then(() => {
//             handleCloseModal();
//             window.location.reload();
//           });
//         } else {
//           throw new Error(response.data.Result || "Booking Failed");
//         }
//       } catch (error) {
//         //console.error("Booking error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Booking Failed",
//           text: error.Result || "Booking already exists for this period.",
//           confirmButtonColor: "#f44336",
//         });

//         startCountdown();
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       startCountdown();
//     }
//   };

//   const handleCancelModalClose = () => {
//     setCancelModalOpen(false);
//   };

//   const calculateNights = () => {
//     if (checkInDate && checkOutDate) {
//       const diffTime = Math.abs(checkOutDate - checkInDate);
//       return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     }
//     return null;
//   };

//   const nights = calculateNights();
//   const totalGuests = adults + children;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Modal
//         open={open}
//         onClose={(event, reason) => {
//           if (
//             countdownActive &&
//             (reason === "backdropClick" || reason === "escapeKeyDown")
//           ) {
//             return;
//           }

//           handleCloseModal(event, reason);
//         }}

//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         disableEscapeKeyDown={countdownActive}
//       >
//         <Box sx={style}>
//           {/* Header */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#1976d2",
//               color: "white",
//               borderTopLeftRadius: 8,
//               borderTopRightRadius: 8,
//               position: "relative",
//             }}
//           >
//             <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
//               New Reservation
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleCancel}
//               sx={{
//                 position: "absolute",
//                 top: 8,
//                 right: 8,
//                 color: "white",
//                 '&:hover': {
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                 },
//               }}
//               disabled={isClosing}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Countdown Timer */}
//           {countdownActive && (
//             <Box sx={{ px: 3, pt: 2 }}>
//               <CountdownTimer
//                 secondsRemaining={secondsRemaining}
//                 totalSeconds={600}
//               />
//             </Box>
//           )}

//           {/* Content */}
//           <Box sx={{ p: 3 }}>
//             {/* Bungalow Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <HomeIcon sx={{ mr: 1 }} /> Select Bungalow
//               </Typography>
//               <TextField
//                 select
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Select a bungalow type"
//                 value={bungalowType}
//                 onChange={handleBungalowChange}
//                 required
//                 disabled={loading}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {bungalowOptions.map((option) => (
//                   <MenuItem key={option.value} value={option.value}>
//                     <Box>
//                       <Typography variant="body1">{option.label}</Typography>
//                       <Typography variant="caption" color="textSecondary">
//                         {option.description}
//                       </Typography>
//                     </Box>
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Box>

//             {/* Guest Information */}
//             {bungalowType && (
//               <Box sx={{ mb: 3 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     mb: 1,
//                     display: "flex",
//                     alignItems: "center",
//                     fontWeight: "500",
//                     color: "#1976d2",
//                   }}
//                 >
//                   <FamilyRestroomIcon sx={{ mr: 1 }} /> Guest Information
//                 </Typography>

//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Adults"
//                       value={adults}
//                       onChange={handleAdultsChange}
//                       disabled={loading}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array(selectedBungalow?.maxCapacity || 16).keys()].map((num) => (
//                         <MenuItem key={num + 1} value={num + 1}>
//                           {num + 1}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Children"
//                       value={children}
//                       onChange={handleChildrenChange}
//                       disabled={loading}
//                       sx={{
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 2,
//                         },
//                       }}
//                     >
//                       {[...Array((selectedBungalow?.maxCapacity || 16) + 1).keys()].map((num) => (
//                         <MenuItem key={num} value={num}>
//                           {num}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 </Grid>

//                 {/* Capacity Info and Warning */}
//                 <Box sx={{ mt: 1 }}>
//                   <Typography variant="caption" color="textSecondary">
//                     Total guests: {totalGuests} {selectedBungalow && `(Max: ${selectedBungalow.maxCapacity})`}
//                   </Typography>

//                   {capacityError && (
//                     <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
//                       {capacityError}
//                     </Alert>
//                   )}

//                   {/* {!capacityError && selectedBungalow && totalGuests > 0 && (
//                     <Alert
//                       severity={totalGuests === selectedBungalow.maxCapacity ? "warning" : "success"}
//                       sx={{ mt: 1, borderRadius: 2 }}
//                     >
//                       {totalGuests === selectedBungalow.maxCapacity 
//                         ? `Maximum capacity reached for ${selectedBungalow.label}`
//                         : `Capacity: ${totalGuests}/${selectedBungalow.maxCapacity} guests`
//                       }
//                     </Alert>
//                   )} */}
//                 </Box>
//               </Box>
//             )}

//             {/* Dates Selection */}
//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <CalendarMonthIcon sx={{ mr: 1 }} /> Select Dates
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-in Date"
//                     value={checkInDate}
//                     onChange={handleCheckInChange}
//                     disabled={loading}
//                     minDate={today}
//                     maxDate={maxSelectableDate}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                   />

//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <DatePicker
//                     label="Check-out Date"
//                     value={checkOutDate}
//                     onChange={handleCheckOutChange}
//                     disabled={loading || !checkInDate}
//                     minDate={checkInDate || today}
//                     maxDate={maxCheckoutDate}
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         required: true,
//                         sx: {
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                           },
//                         },
//                       },
//                     }}
//                   />

//                 </Grid>
//               </Grid>

//               {nights && (
//                 <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
//                   <Chip
//                     label={`${nights} ${nights === 1 ? "night" : "nights"}`}
//                     color="primary"
//                     size="small"
//                   />
//                 </Box>
//               )}
//             </Box>

//             {/* Remarks */}

//             {/* <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="subtitle1"
//                 sx={{
//                   mb: 1,
//                   display: "flex",
//                   alignItems: "center",
//                   fontWeight: "500",
//                   color: "#1976d2",
//                 }}
//               >
//                 <NoteIcon sx={{ mr: 1 }} /> Special Requests
//               </Typography>
//               <TextField
//                 fullWidth
//                 placeholder="Any special requests or notes for your stay?"
//                 variant="outlined"
//                 multiline
//                 rows={3}
//                 value={remarks}
//                 onChange={handleRemarksChange}
//                 disabled={loading}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box> */}

//             {/*--------------------------------- Points ------------------------------*/}

//             {/* <PointsEarnedIcon /> */}

//             <ReservationCancelModal
//               open={cancelModalOpen}
//               handleClose={handleCancelModalClose}
//             />
//           </Box>

//           {/* Footer with Actions */}
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: "#f5f5f5",
//               display: "flex",
//               justifyContent: "flex-end",
//               gap: 2,
//               borderTop: "1px solid #e0e0e0",
//               borderBottomLeftRadius: 8,
//               borderBottomRightRadius: 8,
//             }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleBookClick}
//               disabled={loading || !!capacityError || isClosing}
//               startIcon={
//                 loading && <CircularProgress size={20} color="inherit" />
//               }
//               sx={{
//                 borderRadius: 2,
//                 bgcolor: "#1976d2",
//                 "&:hover": {
//                   bgcolor: "#303f9f",
//                 },
//                 "&:disabled": {
//                   bgcolor: "#cccccc",
//                 },
//                 minWidth: '140px',
//               }}
//             >
//               {loading ? "Booking..." : "Reserve"}
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={handleCancel}
//               disabled={loading || isClosing}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </LocalizationProvider>
//   );
// };

// export default ReservationModal;










//---------------------------------------------------------------------2026-02-09----------------------------------------------

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Grid,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NoteIcon from "@mui/icons-material/Note";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Swal from "sweetalert2";
import ReservationCancelModal from "../Reservations/ReservationCancelModal";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { format, isSameDay } from "date-fns";
import { useAuth } from "../../../context/AuthContext";
import { useDispatch } from "react-redux";
import { UpdateResStatus } from "../../../action/Reservation";
import BuildIcon from '@mui/icons-material/Build';
import BlockIcon from '@mui/icons-material/Block';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  p: 0,
};

const PointsEarnedIcon = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderRadius: 2,
        background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
        mb: 2,
      }}
    >
      <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 36, mr: 2 }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
          12 Points
        </Typography>
        <Typography variant="body2" sx={{ color: "#7e57c2" }}>
          You'll earn with this reservation
        </Typography>
      </Box>
    </Paper>
  );
};

const CountdownTimer = ({ secondsRemaining, totalSeconds }) => {
  const progress = (secondsRemaining / totalSeconds) * 100;
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const getTimerColor = () => {
    if (secondsRemaining > 300) return "primary";
    if (secondsRemaining > 60) return "warning";
    return "error";
  };

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
          <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
          Time remaining to complete booking:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            color: secondsRemaining <= 60 ? "error.main" : secondsRemaining <= 300 ? "warning.main" : "primary.main"
          }}
        >
          {minutes}:{seconds.toString().padStart(2, '0')}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        color={getTimerColor()}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: '#f0f0f0'
        }}
      />
    </Box>
  );
};

const MaintenanceDay = ({ day, isSelected, isMaintenance }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isMaintenance && (
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: 'warning.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <BuildIcon sx={{ fontSize: 10, color: 'white' }} />
        </Box>
      )}
      <Typography
        variant="body2"
        sx={{
          color: isMaintenance ? 'warning.main' : (isSelected ? 'white' : 'text.primary'),
          fontWeight: isMaintenance ? 'bold' : 'normal',
          opacity: isMaintenance ? 0.7 : 1,
        }}
      >
        {day.getDate()}
      </Typography>
    </Box>
  );
};

const ReservationModal = ({ open, handleClose, maintenanceDates = new Set() }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bungalowType, setBungalowType] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const [countdownActive, setCountdownActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const countdownIntervalRef = useRef(null);
  const lastResetTimeRef = useRef(0);
  const RESET_COOLDOWN = 5000;
  const { authKey } = useAuth();
  
  const addMonths = (date, months) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  // --------------------------- calendar checkin & checkout date limit--------------------
  const today = new Date();
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth() + 4,
    0
  );

  const getMaxStayDays = (checkIn) => {
    if (!checkIn) return 3;

    const month = new Date(checkIn).getMonth() + 1;

    if (month === 4 || month === 12) {
      return 2;
    }

    return 3;
  };

  const maxStayDays = getMaxStayDays(checkInDate);

  const maxCheckoutDate = checkInDate
    ? (() => {
      const d = new Date(checkInDate);
      d.setDate(d.getDate() + maxStayDays);
      return d;
    })()
    : null;

  const bungalowOptions = [
    {
      value: 1,
      label: "Main Bungalow",
      maxCapacity: 16,
      description: "Maximum 16 guests (adults + children)"
    },
  ];

   
  const isDateUnderMaintenance = useCallback((date) => {
    if (!date || maintenanceDates.size === 0) return false;
    
    const dateStr = format(date, "yyyy-MM-dd");
    return maintenanceDates.has(dateStr);
  }, [maintenanceDates]);

   
  const isDateRangeUnderMaintenance = useCallback((startDate, endDate) => {
    if (!startDate || !endDate || maintenanceDates.size === 0) return false;
    
    const currentDate = new Date(startDate);
    const targetDate = new Date(endDate);
    
    while (currentDate <= targetDate) {
      if (isDateUnderMaintenance(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return false;
  }, [isDateUnderMaintenance]);

  
  const shouldDisableDate = useCallback((date) => {
     
    if (isDateUnderMaintenance(date)) {
      return true;
    }
    
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (checkDate < today) {
      return true;
    }
    
    return false;
  }, [isDateUnderMaintenance]);

  const stopCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownActive(false);
    setSecondsRemaining(600);
  }, []);

  const startCountdown = useCallback(() => {
    stopCountdown();

    setSecondsRemaining(600);
    setCountdownActive(true);

    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          handleAutoClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopCountdown]);

  const resetCountdown = useCallback(() => {
    const now = Date.now();
    if (now - lastResetTimeRef.current > RESET_COOLDOWN) {
      stopCountdown();
      startCountdown();
      lastResetTimeRef.current = now;
    }
  }, [startCountdown, stopCountdown]);

  const handleAutoClose = useCallback(() => {
    Swal.fire({
      icon: "warning",
      title: "Time's Up!",
      text: "Your booking session has expired. Please start over.",
      confirmButtonColor: "#3f51b5",
    }).then(() => {
      handleCloseModal();
    });
  }, []);

  const handleCloseModal = useCallback((event, reason) => {
    if (isClosing) return;

    setIsClosing(true);

    stopCountdown();

    if (reason === 'backdropClick' && countdownActive) {
      setIsClosing(false);
      return;
    }

    setCheckInDate(null);
    setCheckOutDate(null);
    setBungalowType("");
    setAdults(1);
    setChildren(0);
    setGuestName("");
    setRemarks("");
    setCapacityError("");
    handleClose();
    setIsClosing(false);
  }, [stopCountdown, countdownActive, handleClose, isClosing]);

  const handleCancel = useCallback(() => {
    Swal.fire({
      icon: "question",
      title: "Cancellation",
      text: "Are you sure you want to cancel this reservation?",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Go Back",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#3f51b5",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          const res = await dispatch(UpdateResStatus());

          if (res?.success) {
            Swal.fire({
              icon: "success",
              title: "Cancelled!",
              text: "Reservation cancelled successfully.",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            }).then(() => {
              handleCloseModal();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Cancellation Failed",
            text:
              error?.response?.data?.Result ||
              "Unable to cancel reservation",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  }, [dispatch, handleCloseModal]);

  useEffect(() => {
    return () => {
      stopCountdown();
    };
  }, [stopCountdown]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCountdown();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      stopCountdown();
    };
  }, [stopCountdown]);

  useEffect(() => {
    if (open) {
      setCheckInDate(null);
      setCheckOutDate(null);
      setBungalowType("");
      setAdults(1);
      setChildren(0);
      setGuestName("");
      setRemarks("");
      setCapacityError("");
      setLoading(false);

      const timer = setTimeout(() => {
        startCountdown();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      stopCountdown();
    }
  }, [open, startCountdown, stopCountdown]);

  const handleBungalowChange = (e) => {
    setBungalowType(e.target.value);
  };

  const handleAdultsChange = (e) => {
    setAdults(parseInt(e.target.value));
  };

  const handleChildrenChange = (e) => {
    setChildren(parseInt(e.target.value));
  };

  const handleCheckInChange = (newValue) => {
    setCheckInDate(newValue);
    setCheckOutDate(null);
  };

  const handleCheckOutChange = (newValue) => {
    setCheckOutDate(newValue);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

 
  const selectedBungalow = bungalowOptions.find(option => option.value === bungalowType);

  useEffect(() => {
    if (selectedBungalow) {
      const totalGuests = adults + children;
      if (totalGuests > selectedBungalow.maxCapacity) {
        setCapacityError(`Exceeds maximum capacity of ${selectedBungalow.maxCapacity} guests for ${selectedBungalow.label}`);
      } else if (totalGuests === 0) {
        setCapacityError("At least 1 guest is required");
      } else {
        setCapacityError("");
      }
    }
  }, [bungalowType, adults, children, selectedBungalow]);

  const handleBookClick = async () => {
    stopCountdown();

     
    if (!checkInDate || !checkOutDate || !bungalowType) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select Check-in Date, Check-out Date and Bungalow Type.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    
    if (checkInDate >= checkOutDate) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Dates",
        text: "Check-out date must be after check-in date.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

     
    if (checkInDate && isDateUnderMaintenance(checkInDate)) {
      Swal.fire({
        icon: "warning",
        title: "Maintenance Period",
        text: "Check-in date is during maintenance period. Please select another date.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    if (checkOutDate && isDateUnderMaintenance(checkOutDate)) {
      Swal.fire({
        icon: "warning",
        title: "Maintenance Period",
        text: "Check-out date is during maintenance period. Please select another date.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    
    if (checkInDate && checkOutDate) {
      const hasMaintenance = isDateRangeUnderMaintenance(checkInDate, checkOutDate);
      
      if (hasMaintenance) {
        Swal.fire({
          icon: "warning",
          title: "Maintenance Period",
          text: "Selected date range includes maintenance period. Please select different dates.",
          confirmButtonColor: "#3f51b5",
        });
        startCountdown();
        return;
      }
    }

    
    if (capacityError) {
      Swal.fire({
        icon: "warning",
        title: "Capacity Exceeded",
        text: capacityError,
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    const confirmation = await Swal.fire({
      icon: "question",
      title: "Reserving",
      text: "Are you sure you want to proceed with the reserving?",
      showCancelButton: true,
      confirmButtonText: "Yes, Reserve Now",
      cancelButtonText: "Not Yet",
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#f44336",
    });

    if (confirmation.isConfirmed) {
      try {
        setLoading(true);
        const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
        const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");
        const sno = localStorage.getItem("sno");
        const logId = localStorage.getItem("logId");

        const response = await axios.post(
          `Reservation/PostBooking?P_BUNGALOW_ID=${bungalowType}&P_CHECK_IN=${formattedCheckIn}&P_CHECK_OUT=${formattedCheckOut}&P_ADULT_COUNT=${adults}&P_CHILD_COUNT=${children}&P_LOG_ID=${logId}&P_SERIAL_NO=${sno}`,
          {},
          {
            headers: {
              "auth-key": authKey,
            },
          }
        );

        if (response.data.StatusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Reservation",
            text: "Your booking request has been received. Confirmation status will be sent to you via SMS.",
            confirmButtonColor: "#4caf50",
          }).then(() => {
            handleCloseModal();
            window.location.reload();
          });
        } else {
          throw new Error(response.data.Result || "Booking Failed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: error.message || error.Result || "Booking already exists for this period.",
          confirmButtonColor: "#f44336",
        });

        startCountdown();
      } finally {
        setLoading(false);
      }
    } else {
      startCountdown();
    }
  };

  const handleCancelModalClose = () => {
    setCancelModalOpen(false);
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return null;
  };

  const nights = calculateNights();
  const totalGuests = adults + children;

   
  const renderDay = (day, _value, DayComponentProps) => {
    const isMaintenance = isDateUnderMaintenance(day);
    const isSelected = DayComponentProps.selected;
    
    return (
      <PickersDay
        {...DayComponentProps}
        disabled={isMaintenance || DayComponentProps.disabled}
        sx={{
          ...(isMaintenance && {
            backgroundColor: '#FFF3E0 !important',
            color: '#FF9800 !important',
            fontWeight: 'bold',
            opacity: 0.7,
            '&:hover': {
              backgroundColor: '#FFE0B2 !important',
            },
            '&.Mui-selected': {
              backgroundColor: '#FF9800 !important',
              color: 'white !important',
            },
          }),
        }}
      >
        <MaintenanceDay 
          day={day} 
          isSelected={isSelected} 
          isMaintenance={isMaintenance} 
        />
      </PickersDay>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (
            countdownActive &&
            (reason === "backdropClick" || reason === "escapeKeyDown")
          ) {
            return;
          }

          handleCloseModal(event, reason);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={countdownActive}
      >
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#1976d2",
              color: "white",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              position: "relative",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
              New Reservation
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCancel}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              disabled={isClosing}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Countdown Timer */}
          {countdownActive && (
            <Box sx={{ px: 3, pt: 2 }}>
              <CountdownTimer
                secondsRemaining={secondsRemaining}
                totalSeconds={600}
              />
            </Box>
          )}

          {/* Maintenance Legend */}
          {/* {maintenanceDates.size > 0 && (
            <Box sx={{ px: 3, pt: 1, pb: 1 }}>
              <Alert 
                severity="info" 
                icon={<BuildIcon />}
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    alignItems: 'center',
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 16, 
                    height: 16, 
                    borderRadius: '50%', 
                    bgcolor: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <BuildIcon sx={{ fontSize: 10, color: 'white' }} />
                  </Box>
                  <Typography variant="body2">
                    Dates marked with <BuildIcon sx={{ fontSize: 12, verticalAlign: 'middle', color: 'warning.main' }} /> are under maintenance and cannot be selected.
                  </Typography>
                </Box>
              </Alert>
            </Box>
          )} */}

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {/* Bungalow Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  color: "#1976d2",
                }}
              >
                <HomeIcon sx={{ mr: 1 }} /> Select Bungalow
              </Typography>
              <TextField
                select
                fullWidth
                variant="outlined"
                placeholder="Select a bungalow type"
                value={bungalowType}
                onChange={handleBungalowChange}
                required
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                {bungalowOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box>
                      <Typography variant="body1">{option.label}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {option.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Guest Information */}
            {bungalowType && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "500",
                    color: "#1976d2",
                  }}
                >
                  <FamilyRestroomIcon sx={{ mr: 1 }} /> Guest Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      label="Adults"
                      value={adults}
                      onChange={handleAdultsChange}
                      disabled={loading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    >
                      {[...Array(selectedBungalow?.maxCapacity || 16).keys()].map((num) => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      label="Children"
                      value={children}
                      onChange={handleChildrenChange}
                      disabled={loading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    >
                      {[...Array((selectedBungalow?.maxCapacity || 16) + 1).keys()].map((num) => (
                        <MenuItem key={num} value={num}>
                          {num}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                {/* Capacity Info and Warning */}
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Total guests: {totalGuests} {selectedBungalow && `(Max: ${selectedBungalow.maxCapacity})`}
                  </Typography>

                  {capacityError && (
                    <Alert severity="error" sx={{ mt: 1, borderRadius: 2 }}>
                      {capacityError}
                    </Alert>
                  )}
                </Box>
              </Box>
            )}

            {/* Dates Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  color: "#1976d2",
                }}
              >
                <CalendarMonthIcon sx={{ mr: 1 }} /> Select Dates
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Check-in Date"
                    value={checkInDate}
                    onChange={handleCheckInChange}
                    disabled={loading}
                    minDate={today}
                    maxDate={maxSelectableDate}
                    shouldDisableDate={shouldDisableDate}
                    renderDay={renderDay}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: checkInDate && isDateUnderMaintenance(checkInDate),
                        helperText: checkInDate && isDateUnderMaintenance(checkInDate) 
                          ? "Date is under maintenance"
                          : "",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Check-out Date"
                    value={checkOutDate}
                    onChange={handleCheckOutChange}
                    disabled={loading || !checkInDate}
                    minDate={checkInDate || today}
                    maxDate={maxCheckoutDate}
                    shouldDisableDate={shouldDisableDate}
                    renderDay={renderDay}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: checkOutDate && isDateUnderMaintenance(checkOutDate),
                        helperText: checkOutDate && isDateUnderMaintenance(checkOutDate)
                          ? "Date is under maintenance"
                          : "",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Maintenance warnings */}
              {checkInDate && isDateUnderMaintenance(checkInDate) && (
                <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <BlockIcon sx={{ mr: 1 }} />
                  Selected check-in date is under maintenance. Please choose another date.
                </Alert>
              )}

              {checkOutDate && isDateUnderMaintenance(checkOutDate) && (
                <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <BlockIcon sx={{ mr: 1 }} />
                  Selected check-out date is under maintenance. Please choose another date.
                </Alert>
              )}

              {checkInDate && checkOutDate && isDateRangeUnderMaintenance(checkInDate, checkOutDate) && (
                <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <BlockIcon sx={{ mr: 1 }} />
                  Selected date range includes maintenance period. Please select different dates.
                </Alert>
              )}

              {nights && (
                <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Chip
                    label={`${nights} ${nights === 1 ? "night" : "nights"}`}
                    color="primary"
                    size="small"
                  />
                </Box>
              )}
            </Box>

            {/* Points Section (Optional) */}
            {/* <PointsEarnedIcon /> */}

            <ReservationCancelModal
              open={cancelModalOpen}
              handleClose={handleCancelModalClose}
            />
          </Box>

          {/* Footer with Actions */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#f5f5f5",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              borderTop: "1px solid #e0e0e0",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookClick}
              disabled={loading || !!capacityError || isClosing || 
                (checkInDate && isDateUnderMaintenance(checkInDate)) ||
                (checkOutDate && isDateUnderMaintenance(checkOutDate)) ||
                (checkInDate && checkOutDate && isDateRangeUnderMaintenance(checkInDate, checkOutDate))
              }
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                borderRadius: 2,
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#303f9f",
                },
                "&:disabled": {
                  bgcolor: "#cccccc",
                },
                minWidth: '140px',
              }}
            >
              {loading ? "Booking..." : "Reserve"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={loading || isClosing}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default ReservationModal;