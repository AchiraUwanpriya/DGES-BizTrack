// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   Button,
//   IconButton,
//   Stack,
//   Chip,
//   Divider,
//   Avatar,
//   FormControlLabel,
//   Switch,
//   Card,
//   CardContent,
//   LinearProgress,
//   Rating,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";
// import RateReviewIcon from "@mui/icons-material/RateReview";
// import BuildIcon from "@mui/icons-material/Build";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
// import axios from "axios";
 
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "95%", sm: "85%", md: "750px" },
//   bgcolor: "background.paper",
//   borderRadius: "20px",
//   boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)",
//   p: { xs: 2, sm: 3, md: 4 },
//   maxHeight: "95vh",
//   overflowY: "auto",
//   backdropFilter: "blur(10px)",
//   background: "rgba(255, 255, 255, 0.95)",
//   border: "1px solid rgba(255, 255, 255, 0.2)",
// };

// const statusOptions = [
//   { value: "Pending", label: "Pending", color: "warning", code: "P" },
//   { value: "Complete", label: "Complete", color: "success", code: "C" },
// ];

// const FeedbackModal = ({ open, handleClose, reservation }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
//   const [reservationNo, setReservationNo] = useState("");
//   const [bungalowType, setBungalowType] = useState("");
//   const [checkInDate, setCheckInDate] = useState(null);
//   const [checkOutDate, setCheckOutDate] = useState(null);
//   const [feedbackReport, setFeedbackReport] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(-1);
//   const [showMaintenanceFields, setShowMaintenanceFields] = useState(false);
//   const [maintenanceReport, setMaintenanceReport] = useState("");
//   const [maintenanceStatus, setMaintenanceStatus] = useState("Pending");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [charCount, setCharCount] = useState(0);

//   useEffect(() => {
//     if (reservation) {
//       setReservationNo(reservation.Res_no || "");
//       setBungalowType(
//         reservation.Res_Bang_Id == 1
//           ? "Main bungalow"
//           : reservation.Res_Bang_Id == 2
//           ? "Family bungalow"
//           : "Unknown"
//       );

//       if (reservation.Res_Check_In) {
//         setCheckInDate(reservation.Res_Check_In);
//       }
//       if (reservation.Res_Check_Out) {
//         setCheckOutDate(reservation.Res_Check_Out);
//       }
//     }
//   }, [reservation]);

//   const handleFeedbackChange = (e) => {
//     setFeedbackReport(e.target.value);
//     setCharCount(e.target.value.length);
//   };

//   const getRatingLabel = (value) => {
//     const labels = {
//       1: "Poor",
//       2: "Fair",
//       3: "Good",
//       4: "Very Good",
//       5: "Excellent"
//     };
//     return labels[value] || "Select Rating";
//   };

//   const handleSubmitFeedback = async () => {
//     if (!feedbackReport.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Feedback Required",
//         text: "Please share your experience before submitting.",
//         confirmButtonColor: "#1976d2",
//         background: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//       });
//       return;
//     }

//     if (rating === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "Rating Required",
//         text: "Please rate your experience before submitting.",
//         confirmButtonColor: "#1976d2",
//         background: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//       });
//       return;
//     }

//     if (showMaintenanceFields && !maintenanceReport.trim()) {
//       Swal.fire({
//         icon: "warning",
//         title: "Maintenance Report Required",
//         text: "Please describe the maintenance issue or disable the maintenance section.",
//         confirmButtonColor: "#1976d2",
//         background: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//       });
//       return;
//     }

//     const status = rating >= 3 ? "G" : "B";

//     Swal.fire({
//       icon: "question",
//       title: "Ready to Submit?",
//       text: "Are you sure you want to submit your feedback?",
//       showCancelButton: true,
//       confirmButtonText: "Yes, Submit",
//       cancelButtonText: "Review",
//       confirmButtonColor: "#1976d2",
//       cancelButtonColor: "#6c757d",
//       background: theme.palette.background.paper,
//       color: theme.palette.text.primary,
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           setIsSubmitting(true);

//           const maintenanceStatusCode =
//             statusOptions.find((option) => option.value === maintenanceStatus)
//               ?.code || "P";

//           const apiUrl = `/Reservation/AddFeedback?P_RESERVATION_NO=${reservationNo}&P_FEEDBACK_REPORT=${encodeURIComponent(
//             feedbackReport
//           )}&P_REMARKS=${encodeURIComponent(remarks)}&P_STATUS=${status}${
//             showMaintenanceFields
//               ? `&P_MATC_REPORT=${encodeURIComponent(
//                   maintenanceReport
//                 )}&P_MATC_STATUS=${maintenanceStatusCode}`
//               : ""
//           }`;

//           const response = await axios.get(apiUrl);

//           if (response.status === 200) {
//             Swal.fire({
//               icon: "success",
//               title: "Thank You! ✨",
//               text: "Your feedback helps us improve your future experiences.",
//               confirmButtonColor: "#1976d2",
//               timer: 2500,
//               background: theme.palette.background.paper,
//               color: theme.palette.text.primary,
//             });
//             handleClose();
//             // Reset form
//             setRating(0);
//             setFeedbackReport("");
//             setRemarks("");
//             setMaintenanceReport("");
//             setShowMaintenanceFields(false);
//             setCharCount(0);
//           } else {
//             throw new Error("Failed to submit feedback");
//           }
//         } catch (error) {
//           console.error("Error submitting feedback:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Submission Failed",
//             text: "We encountered an issue. Please try again in a moment.",
//             confirmButtonColor: "#1976d2",
//             background: theme.palette.background.paper,
//             color: theme.palette.text.primary,
//           });
//         } finally {
//           setIsSubmitting(false);
//         }
//       }
//     });
//   };

//   const handleCancel = () => {
//     if (
//       feedbackReport ||
//       remarks ||
//       (showMaintenanceFields && maintenanceReport) ||
//       rating > 0
//     ) {
//       Swal.fire({
//         icon: "question",
//         title: "Unsaved Changes",
//         text: "You have unsaved changes. Are you sure you want to leave?",
//         showCancelButton: true,
//         confirmButtonText: "Yes, Discard",
//         cancelButtonText: "Continue Editing",
//         confirmButtonColor: "#d32f2f",
//         cancelButtonColor: "#6c757d",
//         background: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           handleClose();
//           // Reset form
//           setRating(0);
//           setFeedbackReport("");
//           setRemarks("");
//           setMaintenanceReport("");
//           setShowMaintenanceFields(false);
//           setCharCount(0);
//         }
//       });
//     } else {
//       handleClose();
//     }
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleCancel}
//       aria-labelledby="feedback-modal-title"
//       aria-describedby="feedback-modal-description"
//       sx={{
//         backdropFilter: "blur(8px)",
//       }}
//     >
//       <Box sx={style}>
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 3,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Avatar 
//               sx={{ 
//                 bgcolor: "primary.main",
//                 width: 48,
//                 height: 48,
//                 boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
//               }}
//             >
//               <RateReviewIcon />
//             </Avatar>
//             <Box>
//               <Typography 
//                 id="feedback-modal-title" 
//                 variant="h4" 
//                 component="h2"
//                 fontWeight="600"
//                 sx={{
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                 }}
//               >
//                 Share Your Experience
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Help us improve our services
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton
//             aria-label="close"
//             onClick={handleCancel}
//             sx={{
//               color: "grey.500",
//               bgcolor: "action.hover",
//               "&:hover": {
//                 bgcolor: "grey.200",
//                 transform: "rotate(90deg)",
//                 transition: "transform 0.3s ease",
//               },
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Divider sx={{ my: 3 }} />

//         {/* Reservation Details Card */}
//         <Card 
//           sx={{ 
//             mb: 4, 
//             borderRadius: "16px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//             border: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <CardContent>
//             {/* <Typography variant="h6" fontWeight="600" gutterBottom>
//               Reservation Details
//             </Typography>
//             <Stack
//               direction={{ xs: "column", sm: "row" }}
//               spacing={2}
//               sx={{ mb: 2 }}
//             >
//               <TextField
//                 fullWidth
//                 label="Reservation No"
//                 variant="filled"
//                 value={reservationNo}
//                 disabled
//                 sx={{
//                   "& .MuiFilledInput-root": {
//                     borderRadius: "12px",
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Bungalow Type"
//                 variant="filled"
//                 value={bungalowType}
//                 disabled
//                 sx={{
//                   "& .MuiFilledInput-root": {
//                     borderRadius: "12px",
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               />
//             </Stack>

//             <Stack
//               direction={{ xs: "column", sm: "row" }}
//               spacing={2}
//             >
//               <TextField
//                 fullWidth
//                 label="Check In"
//                 variant="filled"
//                 value={checkInDate || ""}
//                 disabled
//                 sx={{
//                   "& .MuiFilledInput-root": {
//                     borderRadius: "12px",
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Check Out"
//                 variant="filled"
//                 value={checkOutDate || ""}
//                 disabled
//                 sx={{
//                   "& .MuiFilledInput-root": {
//                     borderRadius: "12px",
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               />
//             </Stack> */}

//            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar sx={{ bgcolor: "warning.light", width: 36, height: 36 }}>
//                   <BuildIcon fontSize="small" />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="600">
//                     Maintenance Report
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Report any issues you encountered
//                   </Typography>
//                 </Box>
//               </Box>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={showMaintenanceFields}
//                     onChange={(e) => setShowMaintenanceFields(e.target.checked)}
//                     color="warning"
//                   />
//                 }
//                 label={showMaintenanceFields ? "Enabled" : "Enable"}
//               />
//             </Box>

//             {showMaintenanceFields && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   p: 3,
//                   borderRadius: "12px",
//                   backgroundColor: "warning.light",
//                   background: `linear-gradient(135deg, ${theme.palette.warning.light}15, ${theme.palette.warning.light}30)`,
//                   border: "1px solid",
//                   borderColor: "warning.light",
//                 }}
//               >
//                 <TextField
//                   fullWidth
//                   label="Describe the issue..."
//                   variant="outlined"
//                   multiline
//                   rows={3}
//                   value={maintenanceReport}
//                   onChange={(e) => setMaintenanceReport(e.target.value)}
//                   required={showMaintenanceFields}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "8px",
//                       backgroundColor: "background.paper",
//                     },
//                   }}
//                 />
//                 <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
//                   Our team will address this promptly
//                 </Typography>
//               </Box>
//             )}

//           </CardContent>
//         </Card>

//         {/* Rating Section */}
//         <Card 
//           sx={{ 
//             mb: 4, 
//             borderRadius: "16px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//             border: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" fontWeight="600" gutterBottom>
//               How was your stay?
//             </Typography>
//             <Box sx={{ textAlign: "center", py: 2 }}>
//               <Rating
//                 name="experience-rating"
//                 value={rating}
//                 onChange={(event, newValue) => {
//                   setRating(newValue);
//                 }}
//                 onChangeActive={(event, newHover) => {
//                   setHoverRating(newHover);
//                 }}
//                 size="large"
//                 sx={{
//                   fontSize: { xs: "2.5rem", sm: "3rem" },
//                   "& .MuiRating-icon": {
//                     transition: "transform 0.2s ease",
//                   },
//                   "& .MuiRating-icon:hover": {
//                     transform: "scale(1.2)",
//                   },
//                 }}
//                 icon={
//                   <EmojiEmotionsIcon 
//                     fontSize="inherit" 
//                     sx={{ 
//                       color: theme.palette.primary.main,
//                     }} 
//                   />
//                 }
//                 emptyIcon={
//                   <SentimentDissatisfiedIcon 
//                     fontSize="inherit" 
//                     sx={{ 
//                       color: theme.palette.grey[400],
//                     }} 
//                   />
//                 }
//               />
//               <Typography 
//                 variant="h6" 
//                 color="primary" 
//                 sx={{ mt: 2, minHeight: "32px" }}
//               >
//                 {getRatingLabel(hoverRating !== -1 ? hoverRating : rating)}
//               </Typography>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Feedback Section */}
//         <Card 
//           sx={{ 
//             mb: 4, 
//             borderRadius: "16px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//             border: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <CardContent>
//             <Typography variant="h6" fontWeight="600" gutterBottom>
//               Share Your Experience
//             </Typography>
//             <TextField
//               fullWidth
//               label="Tell us about your stay..."
//               variant="outlined"
//               multiline
//               rows={4}
//               value={feedbackReport}
//               onChange={handleFeedbackChange}
//               required
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "12px",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
//                   },
//                   "&.Mui-focused": {
//                     boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
//                   },
//                 },
//               }}
//             />
//             <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//               <Typography variant="caption" color="text.secondary">
//                 Your feedback helps us improve
//               </Typography>
//               <Typography 
//                 variant="caption" 
//                 color={charCount > 10 ? "success.main" : "text.secondary"}
//               >
//                 {charCount}/500
//               </Typography>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Maintenance Section */}
//         {/* <Card 
//           sx={{ 
//             mb: 4, 
//             borderRadius: "16px",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
//             border: "1px solid",
//             borderColor: showMaintenanceFields ? "warning.main" : "divider",
//             transition: "all 0.3s ease",
//           }}
//         >
//           <CardContent>
//             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar sx={{ bgcolor: "warning.light", width: 36, height: 36 }}>
//                   <BuildIcon fontSize="small" />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="600">
//                     Maintenance Report
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Report any issues you encountered
//                   </Typography>
//                 </Box>
//               </Box>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={showMaintenanceFields}
//                     onChange={(e) => setShowMaintenanceFields(e.target.checked)}
//                     color="warning"
//                   />
//                 }
//                 label={showMaintenanceFields ? "Enabled" : "Enable"}
//               />
//             </Box>

//             {showMaintenanceFields && (
//               <Box
//                 sx={{
//                   mt: 2,
//                   p: 3,
//                   borderRadius: "12px",
//                   backgroundColor: "warning.light",
//                   background: `linear-gradient(135deg, ${theme.palette.warning.light}15, ${theme.palette.warning.light}30)`,
//                   border: "1px solid",
//                   borderColor: "warning.light",
//                 }}
//               >
//                 <TextField
//                   fullWidth
//                   label="Describe the issue..."
//                   variant="outlined"
//                   multiline
//                   rows={3}
//                   value={maintenanceReport}
//                   onChange={(e) => setMaintenanceReport(e.target.value)}
//                   required={showMaintenanceFields}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "8px",
//                       backgroundColor: "background.paper",
//                     },
//                   }}
//                 />
//                 <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
//                   Our team will address this promptly
//                 </Typography>
//               </Box>
//             )}
//           </CardContent>
//         </Card> */}

//         {/* Progress Bar when submitting */}
//         {isSubmitting && (
//           <LinearProgress 
//             sx={{ 
//               mb: 3, 
//               borderRadius: "4px",
//               "& .MuiLinearProgress-bar": {
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }
//             }} 
//           />
//         )}

//         {/* Action Buttons */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: 2,
//             mt: 3,
//             pt: 3,
//             borderTop: "1px solid",
//             borderColor: "divider",
//           }}
//         >
//           <Button
//             variant="outlined"
//             onClick={handleCancel}
//             sx={{
//               borderRadius: "12px",
//               px: 4,
//               py: 1.5,
//               textTransform: "none",
//               fontWeight: "600",
//               fontSize: "1rem",
//               minWidth: "120px",
//             }}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmitFeedback}
//             disabled={isSubmitting || rating === 0 || !feedbackReport.trim()}
//             sx={{
//               borderRadius: "12px",
//               px: 4,
//               py: 1.5,
//               textTransform: "none",
//               fontWeight: "600",
//               fontSize: "1rem",
//               minWidth: "160px",
//               background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               boxShadow: "0 4px 15px rgba(25, 118, 210, 0.3)",
//               "&:hover": {
//                 boxShadow: "0 6px 20px rgba(25, 118, 210, 0.4)",
//                 transform: "translateY(-1px)",
//               },
//               "&:disabled": {
//                 background: theme.palette.grey[300],
//                 boxShadow: "none",
//                 transform: "none",
//               },
//               transition: "all 0.3s ease",
//             }}
//           >
//             {isSubmitting ? (
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Box 
//                   sx={{ 
//                     width: 16, 
//                     height: 16, 
//                     border: "2px solid transparent", 
//                     borderTop: "2px solid white", 
//                     borderRadius: "50%", 
//                     animation: "spin 1s linear infinite",
//                     "@keyframes spin": {
//                       "0%": { transform: "rotate(0deg)" },
//                       "100%": { transform: "rotate(360deg)" },
//                     }
//                   }} 
//                 />
//                 Submitting...
//               </Box>
//             ) : (
//               "Submit Feedback"
//             )}
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default FeedbackModal;







import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
  Stack,
  Chip,
  Divider,
  Avatar,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  LinearProgress,
  Rating,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Grid
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BuildIcon from "@mui/icons-material/Build";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "85%", md: "750px" },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)",
  p: { xs: 2, sm: 3, md: 4 },
  maxHeight: "95vh",
  overflowY: "auto",
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const statusOptions = [
  { value: "Pending", label: "Pending", color: "warning", code: "P" },
  // { value: "Complete", label: "Complete", color: "success", code: "C" },
];

const FeedbackModal = ({ open, handleClose, reservation }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [reservationNo, setReservationNo] = useState("");
  const [bungalowType, setBungalowType] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [feedbackReport, setFeedbackReport] = useState("");
  const [remarks, setRemarks] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(-1);
  const [showMaintenanceFields, setShowMaintenanceFields] = useState(false);
  const [maintenanceReport, setMaintenanceReport] = useState("");
  const [maintenanceStatus, setMaintenanceStatus] = useState("Pending");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [existingFeedback, setExistingFeedback] = useState(null);
  const [feedId, setFeedId] = useState(null);
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [hasMaintenanceReport, setHasMaintenanceReport] = useState(false);

  useEffect(() => {
    if (reservation && open) {
      setReservationNo(reservation.Res_no || "");
      setBungalowType(
        reservation.Res_Bang_Id == 1
          ? "Main bungalow"
          : reservation.Res_Bang_Id == 2
          ? "Family bungalow"
          : "Unknown"
      );

      if (reservation.Res_Check_In) {
        setCheckInDate(reservation.Res_Check_In);
      }
      if (reservation.Res_Check_Out) {
        setCheckOutDate(reservation.Res_Check_Out);
      }
      
      // Load existing feedback data
      fetchExistingFeedback(reservation.Res_no);
    }
  }, [reservation, open]);

const fetchExistingFeedback = async (reservationNo) => {
  setLoadingExisting(true);
  try {
    const response = await axios.get(
      `Reservation/GetGuestFeedback?P_RESERVATION_NO=${reservationNo}`
    );
    
    if (response.data && response.data.StatusCode === 200) {
      const feedbackData = response.data.ResultSet;
      if (feedbackData && feedbackData.length > 0) {
        const existing = feedbackData[0];
        setExistingFeedback(existing);
        setFeedId(existing.Feed_Id);
        
         
        setFeedbackReport(existing.Feed_Report || "");
        setCharCount((existing.Feed_Report || "").length);
        setRemarks(existing.Feed_Remark || ""); 
        
         
        if (existing.Feed_Status === "G") {
          setRating(4);
        } else if (existing.Feed_Status === "B") {
          setRating(2);
        }
        
         
        if (existing.Feed_MatReport) {  
          setShowMaintenanceFields(true);
          setMaintenanceReport(existing.Feed_MatReport || "");
          setMaintenanceStatus(
            existing.Feed_MatStatus === "C" ? "Complete" : "Pending"  
          );
          setHasMaintenanceReport(true); 
        }
      }
    }
  } catch (error) {
    console.error("Error fetching existing feedback:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load existing feedback. Please try again.",
      confirmButtonColor: "#1976d2",
    });
  } finally {
    setLoadingExisting(false);
  }
};
  const handleFeedbackChange = (e) => {
    setFeedbackReport(e.target.value);
    setCharCount(e.target.value.length);
  };

  const getRatingLabel = (value) => {
    const labels = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
    return labels[value] || "Select Rating";
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackReport.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please share your experience before submitting.",
        confirmButtonColor: "#1976d2",
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      });
      return;
    }

    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please rate your experience before submitting.",
        confirmButtonColor: "#1976d2",
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      });
      return;
    }

    if (showMaintenanceFields && !maintenanceReport.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Maintenance Report Required",
        text: "Please describe the maintenance issue or disable the maintenance section.",
        confirmButtonColor: "#1976d2",
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      });
      return;
    }

    const status = rating >= 3 ? "G" : "B";

    Swal.fire({
      icon: "question",
      title: existingFeedback ? "Update Feedback?" : "Ready to Submit?",
      text: existingFeedback 
        ? "Are you sure you want to update your feedback?"
        : "Are you sure you want to submit your feedback?",
      showCancelButton: true,
      confirmButtonText: existingFeedback ? "Yes, Update" : "Yes, Submit",
      cancelButtonText: "Review",
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#6c757d",
      background: theme.palette.background.paper,
      color: theme.palette.text.primary,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsSubmitting(true);

          const maintenanceStatusCode =
            statusOptions.find((option) => option.value === maintenanceStatus)
              ?.code || "P";

           
          let apiUrl = `Reservation/AddFeedback?P_RESERVATION_NO=${reservationNo}&P_FEEDBACK_REPORT=${encodeURIComponent(
            feedbackReport
          )}&P_REMARKS=${encodeURIComponent(remarks)}&P_STATUS=${status}`;
          
          // Add Feed_Id if exists (for update)
          if (feedId) {
            apiUrl += `&Feed_Id=${feedId}`;
          }
          
          // Add maintenance fields if enabled
          if (showMaintenanceFields) {
            apiUrl += `&P_MATC_REPORT=${encodeURIComponent(
              maintenanceReport
            )}&P_MATC_STATUS=${maintenanceStatusCode}`;
          }

          const response = await axios.get(apiUrl);

          if (response.status === 200 && response.data.StatusCode === 200) {
            Swal.fire({
              icon: "success",
              title: existingFeedback ? "Updated Successfully! ✨" : "Thank You! ✨",
              text: existingFeedback 
                ? "Your feedback has been updated."
                : "Your feedback helps us improve your future experiences.",
              confirmButtonColor: "#1976d2",
              timer: 2500,
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
            });
            handleClose();
            // Reset form
            setRating(0);
            setFeedbackReport("");
            setRemarks("");
            setMaintenanceReport("");
            setShowMaintenanceFields(false);
            setCharCount(0);
            setExistingFeedback(null);
            setFeedId(null);
            setHasMaintenanceReport(false);
          } else {
            throw new Error(response.data.Message || "Failed to submit feedback");
          }
        } catch (error) {
          console.error("Error submitting feedback:", error);
          Swal.fire({
            icon: "error",
            title: "Submission Failed",
            text: error.message || "We encountered an issue. Please try again in a moment.",
            confirmButtonColor: "#1976d2",
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };

  const handleCancel = () => {
    if (
      feedbackReport ||
      remarks ||
      (showMaintenanceFields && maintenanceReport) ||
      rating > 0
    ) {
      Swal.fire({
        icon: "question",
        title: "Unsaved Changes",
        text: "You have unsaved changes. Are you sure you want to leave?",
        showCancelButton: true,
        confirmButtonText: "Yes, Discard",
        cancelButtonText: "Continue Editing",
        confirmButtonColor: "#d32f2f",
        cancelButtonColor: "#6c757d",
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }).then((result) => {
        if (result.isConfirmed) {
          handleClose();
          // Reset form
          setRating(0);
          setFeedbackReport("");
          setRemarks("");
          setMaintenanceReport("");
          setShowMaintenanceFields(false);
          setCharCount(0);
          setExistingFeedback(null);
          setFeedId(null);
          setHasMaintenanceReport(false);
        }
      });
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="feedback-modal-title"
      aria-describedby="feedback-modal-description"
      sx={{
        backdropFilter: "blur(8px)",
      }}
    >
      <Box sx={style}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar 
              sx={{ 
                bgcolor: existingFeedback ? "warning.main" : "primary.main",
                width: 48,
                height: 48,
                boxShadow: existingFeedback 
                  ? "0 4px 12px rgba(255, 152, 0, 0.3)" 
                  : "0 4px 12px rgba(25, 118, 210, 0.3)",
              }}
            >
              <RateReviewIcon />
            </Avatar>
            <Box>
              <Typography 
                id="feedback-modal-title" 
                variant="h4" 
                component="h2"
                fontWeight="600"
                sx={{
                  background: existingFeedback
                    ? `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`
                    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {existingFeedback ? "Update Your Feedback" : "Share Your Experience"}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {existingFeedback ? "Update your previous feedback" : "Help us improve our services"}
              </Typography> */}
            </Box>
          </Box>
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              color: "grey.500",
              bgcolor: "action.hover",
              "&:hover": {
                bgcolor: "grey.200",
                transform: "rotate(90deg)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 3 }} />

        {loadingExisting ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Loading existing feedback...
            </Typography>
          </Box>
        ) : (
          <>
            {existingFeedback && (
              <Alert 
                severity="info" 
                sx={{ 
                  mb: 3, 
                  borderRadius: "12px",
                  bgcolor: "info.light",
                  color: "info.dark"
                }}
              >
                <Typography variant="body2">
                  You have already submitted feedback for this reservation. You can update it below.
                </Typography>
              </Alert>
            )}

            {/* Reservation Details Card */}
            <Card 
              sx={{ 
                mb: 4, 
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                {/* <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Reservation No"
                      variant="filled"
                      value={reservationNo}
                      disabled
                      sx={{
                        "& .MuiFilledInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "action.hover",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Bungalow Type"
                      variant="filled"
                      value={bungalowType}
                      disabled
                      sx={{
                        "& .MuiFilledInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "action.hover",
                        },
                      }}
                    />
                  </Grid>
                </Grid> */}

                {/* <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check In"
                      variant="filled"
                      value={checkInDate || ""}
                      disabled
                      sx={{
                        "& .MuiFilledInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "action.hover",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Check Out"
                      variant="filled"
                      value={checkOutDate || ""}
                      disabled
                      sx={{
                        "& .MuiFilledInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "action.hover",
                        },
                      }}
                    />
                  </Grid>
                </Grid> */}

                {/* Maintenance Section */}
                <Box sx={{  pt: 2, borderTop: `1px  ` }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: hasMaintenanceReport ? "warning.main" : "warning.light", 
                        width: 36, 
                        height: 36 
                      }}>
                        <BuildIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          Maintenance Report
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {hasMaintenanceReport 
                            ? "Update your maintenance report" 
                            : "Report any issues you encountered"}
                        </Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showMaintenanceFields}
                          onChange={(e) => {
                            if (!hasMaintenanceReport) {
                              setShowMaintenanceFields(e.target.checked);
                            }
                          }}
                          color="warning"
                          disabled={hasMaintenanceReport} // Disable switch if already has maintenance report
                        />
                      }
                      label={showMaintenanceFields ? "Enabled" : "Enable"}
                    />
                  </Box>

                  {showMaintenanceFields && (
                    <Box
                      sx={{
                        mt: 2,
                        p: 3,
                        borderRadius: "12px",
                        backgroundColor: hasMaintenanceReport ? "warning.light" : "grey.50",
                        background: hasMaintenanceReport
                          ? `linear-gradient(135deg, ${theme.palette.warning.light}15, ${theme.palette.warning.light}30)`
                          : `linear-gradient(135deg, ${theme.palette.grey[50]}, ${theme.palette.grey[100]})`,
                        border: "1px solid",
                        borderColor: hasMaintenanceReport ? "warning.light" : "grey.300",
                      }}
                    >
                      {/* {hasMaintenanceReport && (
                        <Alert 
                          severity="warning" 
                          sx={{ 
                            mb: 2,
                            borderRadius: "8px",
                            bgcolor: "warning.main",
                            color: "warning.contrastText"
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold">
                            📋 Existing Maintenance Report
                          </Typography>
                          <Typography variant="body2">
                            <strong>Status:</strong> {maintenanceStatus}
                          </Typography>
                          {existingFeedback?.Feed_MatcReport && (
                            <Typography variant="body2" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                              "{existingFeedback.Feed_MatcReport.substring(0, 100)}..."
                            </Typography>
                          )}
                        </Alert>
                      )} */}
                      
                      <TextField
                        fullWidth
                        label="Describe the issue..."
                        variant="outlined"
                        multiline
                        rows={3}
                        value={maintenanceReport}
                        onChange={(e) => setMaintenanceReport(e.target.value)}
                        required={showMaintenanceFields}
                        sx={{
                          mb: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "background.paper",
                          },
                        }}
                      />
                      
                      {/* Maintenance Status Selector */}
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom fontWeight="600">
                          Maintenance Status
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {statusOptions.map((option) => (
                            <Chip
                              key={option.value}
                              label={option.label}
                              color={option.color}
                              variant={maintenanceStatus === option.value ? "filled" : "outlined"}
                              //onClick={() => setMaintenanceStatus(option.value)}
                              clickable
                              sx={{
                                borderRadius: "8px",
                                fontWeight: maintenanceStatus === option.value ? "600" : "400",
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                      
                     
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Rating Section */}
            <Card 
              sx={{ 
                mb: 4, 
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  How was your stay?
                </Typography>
                <Box sx={{ textAlign: "center", py: 2 }}>
                  <Rating
                    name="experience-rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHoverRating(newHover);
                    }}
                    size="large"
                    sx={{
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                      "& .MuiRating-icon": {
                        transition: "transform 0.2s ease",
                      },
                      "& .MuiRating-icon:hover": {
                        transform: "scale(1.2)",
                      },
                    }}
                    icon={
                      <EmojiEmotionsIcon 
                        fontSize="inherit" 
                        sx={{ 
                          color: theme.palette.primary.main,
                        }} 
                      />
                    }
                    emptyIcon={
                      <SentimentDissatisfiedIcon 
                        fontSize="inherit" 
                        sx={{ 
                          color: theme.palette.grey[400],
                        }} 
                      />
                    }
                  />
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ mt: 2, minHeight: "32px" }}
                  >
                    {getRatingLabel(hoverRating !== -1 ? hoverRating : rating)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card 
              sx={{ 
                mb: 4, 
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  Share Your Experience
                </Typography>
                <TextField
                  fullWidth
                  label="Tell us about your stay..."
                  variant="outlined"
                  multiline
                  rows={4}
                  value={feedbackReport}
                  onChange={handleFeedbackChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                      },
                    },
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Your feedback helps us improve
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color={charCount > 10 ? "success.main" : "text.secondary"}
                  >
                    {charCount}/500
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Progress Bar when submitting */}
            {isSubmitting && (
              <LinearProgress 
                sx={{ 
                  mb: 3, 
                  borderRadius: "4px",
                  "& .MuiLinearProgress-bar": {
                    background: existingFeedback
                      ? `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`
                      : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }
                }} 
              />
            )}

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  minWidth: "120px",
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitFeedback}
                disabled={isSubmitting || rating === 0 || !feedbackReport.trim()}
                sx={{
                  borderRadius: "12px",
                  px: 4,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  minWidth: "160px",
                  background: existingFeedback
                    ? `linear-gradient(45deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`
                    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: existingFeedback
                    ? "0 4px 15px rgba(255, 152, 0, 0.3)"
                    : "0 4px 15px rgba(25, 118, 210, 0.3)",
                  "&:hover": {
                    boxShadow: existingFeedback
                      ? "0 6px 20px rgba(255, 152, 0, 0.4)"
                      : "0 6px 20px rgba(25, 118, 210, 0.4)",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    background: theme.palette.grey[300],
                    boxShadow: "none",
                    transform: "none",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isSubmitting ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        border: "2px solid transparent", 
                        borderTop: "2px solid white", 
                        borderRadius: "50%", 
                        animation: "spin 1s linear infinite",
                        "@keyframes spin": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        }
                      }} 
                    />
                    {existingFeedback ? "Updating..." : "Submitting..."}
                  </Box>
                ) : (
                  existingFeedback ? "Update Feedback" : "Submit Feedback"
                )}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default FeedbackModal;