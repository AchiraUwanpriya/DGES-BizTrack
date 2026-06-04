// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Modal,
// //   IconButton,
// //   Button,
// //   TextField,
// //   Paper,
// //   CircularProgress,
// //   Alert,
// //   Chip,
// //   Avatar,
// //   Card,
// //   CardContent,
// //   Grid,
// //   Fade,
// //   useTheme,
// //   useMediaQuery,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions
// // } from "@mui/material";
// // import {
// //   Close,
// //   CheckCircle,
// //   Warning,
// //   Info,
// //   CalendarToday,
// //   NightsStay,
// //   Home,
// //   Assignment,
// //   RateReview,
// //   Cancel
// // } from "@mui/icons-material";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import FeedbackModal from "./FeedbackModal";

// // const CaretakerModal = ({ open, handleClose, reservation }) => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [caretakerList, setCaretakerList] = useState([]);
// //   const [caretakerComment, setCaretakerComment] = useState("");
// //   const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
// //   const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
// //   const [selectedReservation, setSelectedReservation] = useState(null);
// //   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
// //   const [cancelRemarks, setCancelRemarks] = useState("");
// //   const [cancelLoading, setCancelLoading] = useState(false);
// //   const [remarksError, setRemarksError] = useState(false);

// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// //   useEffect(() => {
// //     if (open && reservation) {
// //       fetchCaretakerData();
// //     }
// //   }, [open, reservation]);

// //   const fetchCaretakerData = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axios.get(
// //         "Reservation/GetGuestFeeDetails",
// //         { params: { P_RESNO: reservation.Res_no } }
// //       );

// //       if (response.data.StatusCode === 200) {
// //         const results = response.data.ResultSet || [];
// //         setCaretakerList(results);
// //       } else {
// //         setError(response.data.Result || "Failed to fetch caretaker data");
// //       }
// //     } catch (err) {
// //       setError("Error fetching caretaker data. Please try again.");
// //       console.error("Caretaker data fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAgree = async (feedbackId, reservationNo) => {
// //     if (!caretakerComment.trim()) {
// //       Swal.fire({
// //         title: "Comment Required",
// //         text: "Please provide your comment before agreeing",
// //         icon: "info",
// //         confirmButtonColor: "#1976d2",
// //       });
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         "Reservation/GustStatusUp",
// //         {
// //           params: {
// //             P_FEEDBACK_ID: feedbackId,
// //             P_CARET_STATUS: "A",
// //             P_RESERVATION_NO: reservationNo,
// //             P_EMP_COMMENT: caretakerComment,
// //           },
// //         }
// //       );

// //       if (response.data.StatusCode === 200) {
// //         Swal.fire({
// //           title: "Success!",
// //           text: "Caretaker status agreed successfully!",
// //           icon: "success",
// //           confirmButtonColor: "#1976d2",
// //         });
// //         setCaretakerComment("");
// //         fetchCaretakerData();
// //       } else {
// //         Swal.fire({
// //           title: "Error!",
// //           text: response.data.Message || "Failed to update caretaker status",
// //           icon: "error",
// //           confirmButtonColor: "#1976d2",
// //         });
// //       }
// //     } catch (err) {
// //       Swal.fire({
// //         title: "Error!",
// //         text: "Error updating caretaker status. Please try again.",
// //         icon: "error",
// //         confirmButtonColor: "#1976d2",
// //       });
// //       console.error("Caretaker update error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleFeedbackClick = (item) => {

// //     const reservationData = {
// //       Res_no: item.Res_no,
// //       Res_Bang_Id: item.Feed_Banglowid,
// //       Res_Check_In: item.Check_In,
// //       Res_Check_Out: item.Check_Out,
// //       Res_Status: "Confirmed"
// //     };

// //     setSelectedReservation(reservationData);
// //     setFeedbackModalOpen(true);
// //   };

// //   const handleFeedbackModalClose = () => {
// //     setFeedbackModalOpen(false);
// //     setSelectedReservation(null);
// //   };

// //   const handleCancelClick = (reservation) => {
// //     setSelectedReservation(reservation);
// //     setCancelRemarks("");
// //     setRemarksError(false);
// //     setCancelDialogOpen(true);
// //   };

// //   const handleCancelDialogClose = () => {
// //     setCancelDialogOpen(false);
// //     setSelectedReservation(null);
// //     setRemarksError(false);
// //   };

// //   const handleCancellation = async () => {
// //     if (!selectedReservation) return;

// //     if (!cancelRemarks.trim()) {
// //       setRemarksError(true);
// //       return;
// //     }

// //     setCancelLoading(true);
// //     const today = new Date();
// //     const cancelDate = today.toISOString().split("T")[0];

// //     try {
// //       const response = await axios.get(`Reservation/CancelBooking`, {
// //         params: {
// //           P_RESNO: selectedReservation.Res_no,
// //           P_STATUS: "C",
// //           P_CANCELLED_DATE: cancelDate,
// //           P_REMARKS: cancelRemarks,
// //         },
// //       });

// //       if (response.data && response.data.StatusCode === 200) {
// //         Swal.fire({
// //           title: "Success!",
// //           text: "Reservation cancelled successfully!",
// //           icon: "success",
// //           confirmButtonColor: "#1976d2",
// //         });
// //         fetchCaretakerData();
// //       } else {
// //         Swal.fire({
// //           title: "Error!",
// //           text: response.data?.Message || "Failed to cancel reservation",
// //           icon: "error",
// //           confirmButtonColor: "#1976d2",
// //         });
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         title: "Error!",
// //         text: "Error cancelling reservation. Please try again.",
// //         icon: "error",
// //         confirmButtonColor: "#1976d2",
// //       });
// //     } finally {
// //       setCancelLoading(false);
// //       handleCancelDialogClose();
// //     }
// //   };

// //   const handleRemarksChange = (e) => {
// //     setCancelRemarks(e.target.value);
// //     if (e.target.value.trim()) {
// //       setRemarksError(false);
// //     }
// //   };

// //   const getBungalowName = (id) => {
// //     switch (id) {
// //       case "1": return "Main Bungalow";
// //       case "2": return "Lower Garden Suite";
// //       default: return "Unknown Bungalow";
// //     }
// //   };

// //   const getStatusChip = (status) => {
// //     if (status === "B") {
// //       return (
// //         <Chip
// //           icon={<Warning />}
// //           label="Requires Attention"
// //           color="error"
// //           variant="outlined"
// //           size="small"
// //           sx={{ mb: 1 }}
// //         />
// //       );
// //     }
// //     return null;
// //   };


// //   const canCancelReservation = (reservation) => {
// //     return reservation.Res_Status === "Confirm" || reservation.Res_Status === "Confirmed";
// //   };

// //   return (
// //     <>
// //       <Modal open={open} onClose={handleClose} closeAfterTransition>
// //         <Fade in={open}>
// //           <Box
// //             sx={{
// //               position: "absolute",
// //               top: "50%",
// //               left: "50%",
// //               transform: "translate(-50%, -50%)",
// //               width: { xs: "95%", sm: "90%", md: "700px" },
// //               maxWidth: "95vw",
// //               bgcolor: "background.paper",
// //               boxShadow: theme.shadows[10],
// //               p: { xs: 2, sm: 3 },
// //               borderRadius: 2,
// //               maxHeight: "90vh",
// //               overflow: "auto",
// //               "&::-webkit-scrollbar": {
// //                 width: "8px",
// //               },
// //               "&::-webkit-scrollbar-track": {
// //                 background: "#f1f1f1",
// //                 borderRadius: "4px",
// //               },
// //               "&::-webkit-scrollbar-thumb": {
// //                 background: "#ccc",
// //                 borderRadius: "4px",
// //               },
// //               "&::-webkit-scrollbar-thumb:hover": {
// //                 background: "#aaa",
// //               },
// //             }}
// //           >
// //             <Box sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               mb: 2,
// //               borderBottom: `1px solid ${theme.palette.divider}`,
// //               pb: 1
// //             }}>
// //               <Typography variant="h5" sx={{ fontWeight: "600", color: "primary.main" }}>
// //                 <Assignment sx={{ mr: 1, verticalAlign: "bottom" }} />
// //                 My Reservation
// //               </Typography>
// //               <IconButton
// //                 aria-label="close"
// //                 onClick={handleClose}
// //                 sx={{
// //                   color: "text.secondary",
// //                   "&:hover": {
// //                     backgroundColor: "action.hover",
// //                   }
// //                 }}
// //               >
// //                 <Close />
// //               </IconButton>
// //             </Box>

// //             {loading && !caretakerList.length ? (
// //               <Box sx={{
// //                 display: "flex",
// //                 justifyContent: "center",
// //                 alignItems: "center",
// //                 minHeight: "200px",
// //                 flexDirection: "column",
// //                 gap: 2
// //               }}>
// //                 <CircularProgress />
// //                 <Typography variant="body2" color="text.secondary">
// //                   Loading caretaker data...
// //                 </Typography>
// //               </Box>
// //             ) : error ? (
// //               <Alert
// //                 severity="error"
// //                 sx={{
// //                   mb: 2,
// //                   borderRadius: 2
// //                 }}
// //                 action={
// //                   <Button
// //                     color="inherit"
// //                     size="small"
// //                     onClick={fetchCaretakerData}
// //                   >
// //                     Retry
// //                   </Button>
// //                 }
// //               >
// //                 {error}
// //               </Alert>
// //             ) : (
// //               <>
// //                 {caretakerList.map((item, index) => {

// //                   const statusConfig = {
// //                     "Confirm": { label: "Confirmed", color: "success" },
// //                     "Confirmed": { label: "Confirmed", color: "success" },
// //                     "Cancelled": { label: "Cancelled", color: "error" },
// //                     "Pending": { label: "Pending", color: "warning" }
// //                   };

// //                   const statusInfo = statusConfig[item.Res_Status] || { label: item.Res_Status, color: "default" };

// //                   return (
// //                     <Card
// //                       key={item.Feed_Id}
// //                       elevation={2}
// //                       sx={{
// //                         mb: 2,
// //                         borderRadius: 2,
// //                         overflow: "hidden",
// //                         transition: "all 0.3s ease",
// //                         border: `1px solid ${theme.palette[statusInfo.color].main}`,
// //                         borderLeft: `4px solid ${theme.palette[statusInfo.color].main}`,
// //                         position: "relative",
// //                         "&:hover": {
// //                           boxShadow: theme.shadows[4],
// //                           transform: "translateY(-2px)",
// //                         },
// //                       }}
// //                     >
// //                       {/* Status label at top right */}
// //                       <Box
// //                         sx={{
// //                           position: "absolute",
// //                           top: 0,
// //                           right: 0,
// //                           bgcolor: `${theme.palette[statusInfo.color].main}`,
// //                           color: "white",
// //                           px: 1.5,
// //                           py: 0.5,
// //                           borderBottomLeftRadius: 8,
// //                           fontSize: "0.75rem",
// //                           fontWeight: "bold"
// //                         }}
// //                       >
// //                         {statusInfo.label}
// //                       </Box>

// //                       <CardContent sx={{ p: 2, pt: 3 }}>
// //                         {getStatusChip(item.Feed_CareTStatus)}

// //                         {/* First row: Reservation number and Bungalow type */}
// //                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
// //                           <Box sx={{ display: "flex", alignItems: "center" }}>
// //                             <Avatar sx={{
// //                               bgcolor: "primary.main",
// //                               width: 24,
// //                               height: 24,
// //                               mr: 1,
// //                               fontSize: "0.8rem"
// //                             }}>
// //                               #
// //                             </Avatar>
// //                             <Typography variant="body1" fontWeight="600">
// //                               Reservation: {item.Res_no}
// //                             </Typography>
// //                           </Box>

// //                           <Box sx={{ display: "flex", alignItems: "center" }}>
// //                             <Home sx={{ fontSize: 20, color: "primary.main", mr: 1 }} />
// //                             <Typography variant="body1" fontWeight="500">
// //                               {getBungalowName(item.Feed_Banglowid)}
// //                             </Typography>
// //                           </Box>
// //                         </Box>

// //                         {/* Second row: Check-in, Check-out, and Day count */}
// //                         <Box sx={{
// //                           display: "flex",
// //                           justifyContent: "space-between",
// //                           alignItems: "center",
// //                           mb: 2,
// //                           flexWrap: "wrap",
// //                           gap: 1
// //                         }}>
// //                           <Box sx={{ display: "flex", alignItems: "center" }}>
// //                             <CalendarToday sx={{ fontSize: 20, color: "success.main", mr: 1 }} />
// //                             <Typography variant="body2">
// //                               Check-in: {item.Check_In}
// //                             </Typography>
// //                           </Box>

// //                           <Box sx={{ display: "flex", alignItems: "center" }}>
// //                             <NightsStay sx={{ fontSize: 20, color: "info.main", mr: 1 }} />
// //                             <Typography variant="body2">
// //                               Check-out: {item.Check_Out}
// //                             </Typography>
// //                           </Box>

// //                           <Box sx={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             bgcolor: "primary.light",
// //                             color: "primary.contrastText",
// //                             px: 1.5,
// //                             py: 0.5,
// //                             borderRadius: 1
// //                           }}>
// //                             <Typography variant="body2" fontWeight="500">
// //                               {item.Day_Count} day(s)
// //                             </Typography>
// //                           </Box>
// //                         </Box>

// //                         {item.Feed_CareTReport && (
// //                           <Box
// //                             sx={{
// //                               mt: 2,
// //                               p: 2,
// //                               backgroundColor: "grey.50",
// //                               borderRadius: 2,
// //                               maxHeight: 120,
// //                               overflowY: "auto",
// //                             }}
// //                           >
// //                             <Typography variant="subtitle2" color="primary" gutterBottom>
// //                               Caretaker's message:
// //                             </Typography>
// //                             <Typography
// //                               variant="body2"
// //                               sx={{
// //                                 whiteSpace: "pre-line",
// //                                 lineHeight: 1.6,
// //                               }}
// //                             >
// //                               {item.Feed_CareTReport}
// //                             </Typography>
// //                           </Box>
// //                         )}


// //                         {item.Feed_EmpComm && (
// //                           <Box sx={
// //                             {
// //                               mt: 2,
// //                               p: 2,
// //                               //backgroundColor: "success.light", 
// //                               borderRadius: 2,
// //                               opacity: 0.9
// //                             }}>
// //                             <Typography variant="subtitle2" color="success.dark" gutterBottom>
// //                               <CheckCircle sx={{ fontSize: 16, mr: 0.5, verticalAlign: "text-bottom" }} />
// //                               My Response:
// //                             </Typography>
// //                             <Typography
// //                               variant="body2"
// //                               sx={{
// //                                 whiteSpace: "pre-line",
// //                                 lineHeight: 1.6
// //                               }}
// //                             >
// //                               {item.Feed_EmpComm}
// //                             </Typography>
// //                           </Box>
// //                         )}

// //                         <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
// //                           {item.Feed_CareTStatus === "B" && (
// //                             <>
// //                               <TextField
// //                                 fullWidth
// //                                 multiline
// //                                 rows={3}
// //                                 label="Your Response"
// //                                 value={
// //                                   selectedFeedbackId === item.Feed_Id
// //                                     ? caretakerComment
// //                                     : ""
// //                                 }
// //                                 onFocus={() => setSelectedFeedbackId(item.Feed_Id)}
// //                                 onChange={(e) => setCaretakerComment(e.target.value)}
// //                                 placeholder="Please provide your comments regarding the caretaker's report..."
// //                                 variant="outlined"
// //                                 sx={{
// //                                   mb: 2,
// //                                   "& .MuiInputBase-input": { fontSize: "0.85rem" },
// //                                   "& .MuiInputLabel-root": { fontSize: "0.85rem" }
// //                                 }}
// //                               />
// //                               <Button
// //                                 variant="contained"
// //                                 disabled={loading}
// //                                 onClick={() => handleAgree(item.Feed_Id, item.Res_no)}
// //                                 startIcon={loading ? <CircularProgress size={16} /> : <CheckCircle />}
// //                                 fullWidth={isMobile}
// //                                 sx={{
// //                                   borderRadius: 2,
// //                                   textTransform: 'none',
// //                                   fontWeight: '600',
// //                                   py: 1,
// //                                   ...(isMobile ? {} : { minWidth: '200px' })
// //                                 }}
// //                               >
// //                                 {loading ? "Submitting..." : "Agree with Report"}
// //                               </Button>
// //                             </>
// //                           )}

// //                           {(item.Res_Status === "Confirm" || item.Res_Status === "Confirmed") && (
// //                             <Button
// //                               variant="outlined"
// //                               onClick={() => handleFeedbackClick(item)}
// //                               startIcon={<RateReview />}
// //                               sx={{
// //                                 borderRadius: 2,
// //                                 textTransform: 'none',
// //                                 fontWeight: '600',
// //                                 py: 1,
// //                                 ...(isMobile ? {} : { minWidth: '200px' })
// //                               }}
// //                             >
// //                               Provide Feedback
// //                             </Button>
// //                           )}

// //                           {(item.Res_Status === "Pending" || item.Res_Status === "Pending") && (
// //                             <Button
// //                               variant="outlined"
// //                               color="error"
// //                               onClick={() => handleCancelClick(item)}
// //                               startIcon={<Cancel />}
// //                               sx={{
// //                                 borderRadius: 2,
// //                                 textTransform: 'none',
// //                                 fontWeight: '600',
// //                                 py: 1,
// //                                 ...(isMobile ? {} : { minWidth: '200px' })
// //                               }}
// //                             >
// //                               Cancel Reservation
// //                             </Button>
// //                           )}
// //                         </Box>
// //                       </CardContent>
// //                     </Card>
// //                   );
// //                 })}

// //                 {caretakerList.length === 0 && !loading && (
// //                   <Box sx={{
// //                     textAlign: "center",
// //                     py: 4,
// //                     color: "text.secondary"
// //                   }}>
// //                     <Info sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
// //                     <Typography variant="h6">
// //                       No caretaker reports found
// //                     </Typography>
// //                     <Typography variant="body2">
// //                       There are no caretaker reports for this reservation.
// //                     </Typography>
// //                   </Box>
// //                 )}
// //               </>
// //             )}
// //           </Box>
// //         </Fade>
// //       </Modal>

// //       {/* Feedback Modal */}
// //       {selectedReservation && (
// //         <FeedbackModal
// //           open={feedbackModalOpen}
// //           handleClose={handleFeedbackModalClose}
// //           reservation={selectedReservation}
// //         />
// //       )}

// //       {/* Cancel Confirmation Dialog */}
// //       <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose} maxWidth="sm" fullWidth>
// //         <DialogTitle sx={{ bgcolor: "#f44336", color: "white", fontWeight: "bold" }}>
// //           Cancellation Policy
// //           <IconButton
// //             aria-label="close"
// //             onClick={handleCancelDialogClose}
// //             sx={{ color: "white", position: "absolute", right: 16 }}
// //           >
// //             <Close />
// //           </IconButton>
// //         </DialogTitle>
// //         <DialogContent sx={{ mt: 2 }}>
// //           {selectedReservation && (
// //             <>
// //               <Typography variant="body1" sx={{ mb: 2 }}>
// //                 <p>
// //                   The following cancellation fee will be applied unless there is
// //                   an order for cancellation by the superior on an essential
// //                   official commitment.
// //                 </p>
// //                 <p>
// //                   From occupancy date: <br />
// //                 </p>
// //                 <p>
// //                   <b>
// //                     • 30 days before - No fee <br />
// //                     • 15 days before - 50% of full occupancy fee <br />
// //                     • Less than 15 days – 100% of full occupancy fee
// //                   </b>
// //                 </p>
// //               </Typography>
// //               <hr />
// //               <Typography variant="body1" sx={{ mb: 2 }}>
// //                 Are you sure you want to cancel this reservation?
// //               </Typography>

// //               <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 3 }}>
// //                 <Typography variant="body2" sx={{ mb: 1 }}>
// //                   <strong>Bungalow:</strong>{" "}
// //                   {getBungalowName(selectedReservation.Feed_Banglowid)}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ mb: 1 }}>
// //                   <strong>Check In:</strong> {selectedReservation.Check_In}
// //                 </Typography>
// //                 <Typography variant="body2">
// //                   <strong>Check Out:</strong> {selectedReservation.Check_Out}
// //                 </Typography>
// //               </Box>

// //               <TextField
// //                 autoFocus
// //                 margin="dense"
// //                 id="remarks"
// //                 label="Cancellation Remarks"
// //                 type="text"
// //                 fullWidth
// //                 variant="outlined"
// //                 value={cancelRemarks}
// //                 onChange={handleRemarksChange}
// //                 placeholder="Enter reason for cancellation"
// //                 required
// //                 error={remarksError}
// //                 helperText={remarksError ? "Cancellation reason is required" : ""}
// //               />
// //             </>
// //           )}
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
// //           <Button onClick={handleCancelDialogClose} variant="outlined" disabled={cancelLoading}>
// //             Back
// //           </Button>
// //           <Button
// //             onClick={handleCancellation}
// //             variant="contained"
// //             color="error"
// //             size="small"
// //             disabled={cancelLoading}
// //             startIcon={cancelLoading ? <CircularProgress size={20} /> : <Cancel />}
// //           >
// //             {cancelLoading ? "Processing..." : "Confirm Cancellation"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </>
// //   );
// // };

// // export default CaretakerModal;




// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   IconButton,
//   Button,
//   TextField,
//   Paper,
//   CircularProgress,
//   Alert,
//   Chip,
//   Avatar,
//   Card,
//   CardContent,
//   Grid,
//   Fade,
//   useTheme,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions
// } from "@mui/material";
// import {
//   Close,
//   CheckCircle,
//   Warning,
//   Info,
//   CalendarToday,
//   NightsStay,
//   Home,
//   Assignment,
//   RateReview,
//   Cancel
// } from "@mui/icons-material";
// import axios from "axios";
// import Swal from "sweetalert2";
// import FeedbackModal from "./FeedbackModal";

// const CaretakerModal = ({ open, handleClose, reservation }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [caretakerList, setCaretakerList] = useState([]);
//   const [caretakerComment, setCaretakerComment] = useState("");
//   const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
//   const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
//   const [selectedReservation, setSelectedReservation] = useState(null);
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//   const [cancelRemarks, setCancelRemarks] = useState("");
//   const [cancelLoading, setCancelLoading] = useState(false);
//   const [remarksError, setRemarksError] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     if (open && reservation) {
//       fetchCaretakerData();
//     }
//   }, [open, reservation]);

//   const fetchCaretakerData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         "Reservation/GetGuestFeeDetails",
//         { params: { P_RESNO: reservation.Res_no } }
//       );

//       if (response.data.StatusCode === 200) {
//         const results = response.data.ResultSet || [];
//         setCaretakerList(results);
//       } else {
//         setError(response.data.Result || "Failed to fetch caretaker data");
//       }
//     } catch (err) {
//       setError("Error fetching caretaker data. Please try again.");
//       console.error("Caretaker data fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAgree = async (feedbackId, reservationNo) => {
//     if (!caretakerComment.trim()) {
//       Swal.fire({
//         title: "Comment Required",
//         text: "Please provide your comment before agreeing",
//         icon: "info",
//         confirmButtonColor: "#1976d2",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "Reservation/GustStatusUp",
//         {
//           params: {
//             P_FEEDBACK_ID: feedbackId,
//             P_CARET_STATUS: "A",
//             P_RESERVATION_NO: reservationNo,
//             P_EMP_COMMENT: caretakerComment,
//           },
//         }
//       );

//       if (response.data.StatusCode === 200) {
//         Swal.fire({
//           title: "Success!",
//           text: "Caretaker status agreed successfully!",
//           icon: "success",
//           confirmButtonColor: "#1976d2",
//         });
//         setCaretakerComment("");
//         fetchCaretakerData();
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: response.data.Message || "Failed to update caretaker status",
//           icon: "error",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         title: "Error!",
//         text: "Error updating caretaker status. Please try again.",
//         icon: "error",
//         confirmButtonColor: "#1976d2",
//       });
//       console.error("Caretaker update error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFeedbackClick = (item) => {
//     const reservationData = {
//       Res_no: item.Res_no,
//       Res_Bang_Id: item.Feed_Banglowid,
//       Res_Check_In: item.Check_In,
//       Res_Check_Out: item.Check_Out,
//       Res_Status: "Confirmed"
//     };

//     setSelectedReservation(reservationData);
//     setFeedbackModalOpen(true);
//   };

//   const handleFeedbackModalClose = () => {
//     setFeedbackModalOpen(false);
//     setSelectedReservation(null);
//   };

//   const handleCancelClick = (reservation) => {
//     // Check if check-in date is more than 30 days from today
//     const checkInDate = new Date(reservation.Check_In);
//     const today = new Date();
//     const timeDiff = checkInDate.getTime() - today.getTime();
//     const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
//     // If check-in date is within 30 days, show alert and don't allow cancellation
//     if (daysDiff <= 30) {
//       Swal.fire({
//         title: "Cancellation Not Allowed",
//         html: `Check-in date (${reservation.Check_In}) is within 30 days.<br/><br/>
//                <b>Please contact MR Kumara to process cancellation.</b>`,
//         icon: "warning",
//         confirmButtonColor: "#1976d2",
//       });
//       return;
//     }
    
//     // If check-in is more than 30 days away, proceed with normal cancellation
//     setSelectedReservation(reservation);
//     setCancelRemarks("");
//     setRemarksError(false);
//     setCancelDialogOpen(true);
//   };

//   const handleCancelDialogClose = () => {
//     setCancelDialogOpen(false);
//     setSelectedReservation(null);
//     setRemarksError(false);
//   };

//   const handleCancellation = async () => {
//     if (!selectedReservation) return;

//     if (!cancelRemarks.trim()) {
//       setRemarksError(true);
//       return;
//     }

//     setCancelLoading(true);
//     const today = new Date();
//     const cancelDate = today.toISOString().split("T")[0];

//     try {
//       const response = await axios.get(`Reservation/CancelBooking`, {
//         params: {
//           P_RESNO: selectedReservation.Res_no,
//           P_STATUS: "C",
//           P_CANCELLED_DATE: cancelDate,
//           P_REMARKS: cancelRemarks,
//         },
//       });

//       if (response.data && response.data.StatusCode === 200) {
//         Swal.fire({
//           title: "Success!",
//           text: "Reservation cancelled successfully!",
//           icon: "success",
//           confirmButtonColor: "#1976d2",
//         });
//         fetchCaretakerData();
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: response.data?.Message || "Failed to cancel reservation",
//           icon: "error",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error!",
//         text: "Error cancelling reservation. Please try again.",
//         icon: "error",
//         confirmButtonColor: "#1976d2",
//       });
//     } finally {
//       setCancelLoading(false);
//       handleCancelDialogClose();
//     }
//   };

//   const handleRemarksChange = (e) => {
//     setCancelRemarks(e.target.value);
//     if (e.target.value.trim()) {
//       setRemarksError(false);
//     }
//   };

//   const getBungalowName = (id) => {
//     switch (id) {
//       case "1": return "Main Bungalow";
//       case "2": return "Lower Garden Suite";
//       default: return "Unknown Bungalow";
//     }
//   };

//   const getStatusChip = (status) => {
//     if (status === "B") {
//       return (
//         <Chip
//           icon={<Warning />}
//           label="Requires Attention"
//           color="error"
//           variant="outlined"
//           size="small"
//           sx={{ mb: 1 }}
//         />
//       );
//     }
//     return null;
//   };

//   const canShowCancelButton = (reservation) => {
//     // Show cancel button for Pending and Confirmed status
//     if (reservation.Res_Status === "Pending" || reservation.Res_Status === "Confirm" || reservation.Res_Status === "Confirmed") {
//       // Check if check-in date is more than 30 days away
//       const checkInDate = new Date(reservation.Check_In);
//       const today = new Date();
//       const timeDiff = checkInDate.getTime() - today.getTime();
//       const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
//       // Only show cancel button if check-in is more than 30 days away
//       return daysDiff > 30;
//     }
//     return false;
//   };

//   const getCancelButtonLabel = (reservation) => {
//     const checkInDate = new Date(reservation.Check_In);
//     const today = new Date();
//     const timeDiff = checkInDate.getTime() - today.getTime();
//     const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
//     if (daysDiff <= 30) {
//       return "Contact MR Kumara to Cancel";
//     }
//     return "Cancel Reservation";
//   };

//   return (
//     <>
//       <Modal open={open} onClose={handleClose} closeAfterTransition>
//         <Fade in={open}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               width: { xs: "95%", sm: "90%", md: "700px" },
//               maxWidth: "95vw",
//               bgcolor: "background.paper",
//               boxShadow: theme.shadows[10],
//               p: { xs: 2, sm: 3 },
//               borderRadius: 2,
//               maxHeight: "90vh",
//               overflow: "auto",
//               "&::-webkit-scrollbar": {
//                 width: "8px",
//               },
//               "&::-webkit-scrollbar-track": {
//                 background: "#f1f1f1",
//                 borderRadius: "4px",
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 background: "#ccc",
//                 borderRadius: "4px",
//               },
//               "&::-webkit-scrollbar-thumb:hover": {
//                 background: "#aaa",
//               },
//             }}
//           >
//             <Box sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               borderBottom: `1px solid ${theme.palette.divider}`,
//               pb: 1
//             }}>
//               <Typography variant="h5" sx={{ fontWeight: "600", color: "primary.main" }}>
//                 <Assignment sx={{ mr: 1, verticalAlign: "bottom" }} />
//                 My Reservation
//               </Typography>
//               <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={{
//                   color: "text.secondary",
//                   "&:hover": {
//                     backgroundColor: "action.hover",
//                   }
//                 }}
//               >
//                 <Close />
//               </IconButton>
//             </Box>

//             {loading && !caretakerList.length ? (
//               <Box sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 minHeight: "200px",
//                 flexDirection: "column",
//                 gap: 2
//               }}>
//                 <CircularProgress />
//                 <Typography variant="body2" color="text.secondary">
//                   Loading caretaker data...
//                 </Typography>
//               </Box>
//             ) : error ? (
//               <Alert
//                 severity="error"
//                 sx={{
//                   mb: 2,
//                   borderRadius: 2
//                 }}
//                 action={
//                   <Button
//                     color="inherit"
//                     size="small"
//                     onClick={fetchCaretakerData}
//                   >
//                     Retry
//                   </Button>
//                 }
//               >
//                 {error}
//               </Alert>
//             ) : (
//               <>
//                 {caretakerList.map((item, index) => {
//                   const statusConfig = {
//                     "Confirm": { label: "Confirmed", color: "success" },
//                     "Confirmed": { label: "Confirmed", color: "success" },
//                     "Cancelled": { label: "Cancelled", color: "error" },
//                     "Pending": { label: "Pending", color: "warning" }
//                   };

//                   const statusInfo = statusConfig[item.Res_Status] || { label: item.Res_Status, color: "default" };
                  
//                   // Calculate days until check-in
//                   const checkInDate = new Date(item.Check_In);
//                   const today = new Date();
//                   const timeDiff = checkInDate.getTime() - today.getTime();
//                   const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));

//                   return (
//                     <Card
//                       key={item.Feed_Id}
//                       elevation={2}
//                       sx={{
//                         mb: 2,
//                         borderRadius: 2,
//                         overflow: "hidden",
//                         transition: "all 0.3s ease",
//                         border: `1px solid ${theme.palette[statusInfo.color].main}`,
//                         borderLeft: `4px solid ${theme.palette[statusInfo.color].main}`,
//                         position: "relative",
//                         "&:hover": {
//                           boxShadow: theme.shadows[4],
//                           transform: "translateY(-2px)",
//                         },
//                       }}
//                     >
//                       {/* Status label at top right */}
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           top: 0,
//                           right: 0,
//                           bgcolor: `${theme.palette[statusInfo.color].main}`,
//                           color: "white",
//                           px: 1.5,
//                           py: 0.5,
//                           borderBottomLeftRadius: 8,
//                           fontSize: "0.75rem",
//                           fontWeight: "bold"
//                         }}
//                       >
//                         {statusInfo.label}
//                       </Box>

//                       <CardContent sx={{ p: 2, pt: 3 }}>
//                         {getStatusChip(item.Feed_CareTStatus)}

//                         {/* Days until check-in warning */}
//                         {daysUntilCheckIn <= 30 && daysUntilCheckIn > 0 && (
//                           <Alert 
//                             severity="warning" 
//                             sx={{ 
//                               mb: 2,
//                               borderRadius: 2,
//                               fontSize: '0.8rem',
//                               py: 0.5
//                             }}
//                           >
//                             <Typography variant="body2" fontWeight="bold">
//                               Check-in in {daysUntilCheckIn} days! 
//                             </Typography>
//                             <Typography variant="body2">
//                               Cancellation requires contact with MR Kumara.
//                             </Typography>
//                           </Alert>
//                         )}

//                         {/* First row: Reservation number and Bungalow type */}
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <Avatar sx={{
//                               bgcolor: "primary.main",
//                               width: 24,
//                               height: 24,
//                               mr: 1,
//                               fontSize: "0.8rem"
//                             }}>
//                               #
//                             </Avatar>
//                             <Typography variant="body1" fontWeight="600">
//                               Reservation: {item.Res_no}
//                             </Typography>
//                           </Box>

//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <Home sx={{ fontSize: 20, color: "primary.main", mr: 1 }} />
//                             <Typography variant="body1" fontWeight="500">
//                               {getBungalowName(item.Feed_Banglowid)}
//                             </Typography>
//                           </Box>
//                         </Box>

//                         {/* Second row: Check-in, Check-out, and Day count */}
//                         <Box sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                           mb: 2,
//                           flexWrap: "wrap",
//                           gap: 1
//                         }}>
//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <CalendarToday sx={{ fontSize: 20, color: "success.main", mr: 1 }} />
//                             <Typography variant="body2">
//                               Check-in: {item.Check_In}
//                             </Typography>
//                           </Box>

//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <NightsStay sx={{ fontSize: 20, color: "info.main", mr: 1 }} />
//                             <Typography variant="body2">
//                               Check-out: {item.Check_Out}
//                             </Typography>
//                           </Box>

//                           <Box sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             bgcolor: "primary.light",
//                             color: "primary.contrastText",
//                             px: 1.5,
//                             py: 0.5,
//                             borderRadius: 1
//                           }}>
//                             <Typography variant="body2" fontWeight="500">
//                               {item.Day_Count} day(s)
//                             </Typography>
//                           </Box>
//                         </Box>

//                         {item.Feed_CareTReport && (
//                           <Box
//                             sx={{
//                               mt: 2,
//                               p: 2,
//                               backgroundColor: "grey.50",
//                               borderRadius: 2,
//                               maxHeight: 120,
//                               overflowY: "auto",
//                             }}
//                           >
//                             <Typography variant="subtitle2" color="primary" gutterBottom>
//                               Caretaker's message:
//                             </Typography>
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 whiteSpace: "pre-line",
//                                 lineHeight: 1.6,
//                               }}
//                             >
//                               {item.Feed_CareTReport}
//                             </Typography>
//                           </Box>
//                         )}

//                         {item.Feed_EmpComm && (
//                           <Box sx={{
//                             mt: 2,
//                             p: 2,
//                             borderRadius: 2,
//                             opacity: 0.9
//                           }}>
//                             <Typography variant="subtitle2" color="success.dark" gutterBottom>
//                               <CheckCircle sx={{ fontSize: 16, mr: 0.5, verticalAlign: "text-bottom" }} />
//                               My Response:
//                             </Typography>
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 whiteSpace: "pre-line",
//                                 lineHeight: 1.6
//                               }}
//                             >
//                               {item.Feed_EmpComm}
//                             </Typography>
//                           </Box>
//                         )}

//                         <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
//                           {item.Feed_CareTStatus === "B" && (
//                             <>
//                               <TextField
//                                 fullWidth
//                                 multiline
//                                 rows={3}
//                                 label="Your Response"
//                                 value={
//                                   selectedFeedbackId === item.Feed_Id
//                                     ? caretakerComment
//                                     : ""
//                                 }
//                                 onFocus={() => setSelectedFeedbackId(item.Feed_Id)}
//                                 onChange={(e) => setCaretakerComment(e.target.value)}
//                                 placeholder="Please provide your comments regarding the caretaker's report..."
//                                 variant="outlined"
//                                 sx={{
//                                   mb: 2,
//                                   "& .MuiInputBase-input": { fontSize: "0.85rem" },
//                                   "& .MuiInputLabel-root": { fontSize: "0.85rem" }
//                                 }}
//                               />
//                               <Button
//                                 variant="contained"
//                                 disabled={loading}
//                                 onClick={() => handleAgree(item.Feed_Id, item.Res_no)}
//                                 startIcon={loading ? <CircularProgress size={16} /> : <CheckCircle />}
//                                 fullWidth={isMobile}
//                                 sx={{
//                                   borderRadius: 2,
//                                   textTransform: 'none',
//                                   fontWeight: '600',
//                                   py: 1,
//                                   ...(isMobile ? {} : { minWidth: '200px' })
//                                 }}
//                               >
//                                 {loading ? "Submitting..." : "Agree with Report"}
//                               </Button>
//                             </>
//                           )}

//                           {(item.Res_Status === "Confirm" || item.Res_Status === "Confirmed") && (
//                             <Button
//                               variant="outlined"
//                               onClick={() => handleFeedbackClick(item)}
//                               startIcon={<RateReview />}
//                               sx={{
//                                 borderRadius: 2,
//                                 textTransform: 'none',
//                                 fontWeight: '600',
//                                 py: 1,
//                                 ...(isMobile ? {} : { minWidth: '200px' })
//                               }}
//                             >
//                               Provide Feedback
//                             </Button>
//                           )}

//                           {canShowCancelButton(item) && (
//                             <Button
//                               variant="outlined"
//                               color={daysUntilCheckIn <= 30 ? "warning" : "error"}
//                               onClick={() => handleCancelClick(item)}
//                               startIcon={<Cancel />}
//                               sx={{
//                                 borderRadius: 2,
//                                 textTransform: 'none',
//                                 fontWeight: '600',
//                                 py: 1,
//                                 ...(isMobile ? {} : { minWidth: '200px' })
//                               }}
//                             >
//                               {getCancelButtonLabel(item)}
//                             </Button>
//                           )}
//                         </Box>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}

//                 {caretakerList.length === 0 && !loading && (
//                   <Box sx={{
//                     textAlign: "center",
//                     py: 4,
//                     color: "text.secondary"
//                   }}>
//                     <Info sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
//                     <Typography variant="h6">
//                       No caretaker reports found
//                     </Typography>
//                     <Typography variant="body2">
//                       There are no caretaker reports for this reservation.
//                     </Typography>
//                   </Box>
//                 )}
//               </>
//             )}
//           </Box>
//         </Fade>
//       </Modal>

//       {/* Feedback Modal */}
//       {selectedReservation && (
//         <FeedbackModal
//           open={feedbackModalOpen}
//           handleClose={handleFeedbackModalClose}
//           reservation={selectedReservation}
//         />
//       )}

//       {/* Cancel Confirmation Dialog */}
//       <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ bgcolor: "#f44336", color: "white", fontWeight: "bold" }}>
//           Cancellation Policy
//           <IconButton
//             aria-label="close"
//             onClick={handleCancelDialogClose}
//             sx={{ color: "white", position: "absolute", right: 16 }}
//           >
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent sx={{ mt: 2 }}>
//           {selectedReservation && (
//             <>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 <p>
//                   The following cancellation fee will be applied unless there is
//                   an order for cancellation by the superior on an essential
//                   official commitment.
//                 </p>
//                 <p>
//                   From occupancy date: <br />
//                 </p>
//                 <p>
//                   <b>
//                     • 30 days before - No fee <br />
//                     • 15 days before - 50% of full occupancy fee <br />
//                     • Less than 15 days – 100% of full occupancy fee
//                   </b>
//                 </p>
//               </Typography>
//               <hr />
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 Are you sure you want to cancel this reservation?
//               </Typography>

//               <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 3 }}>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   <strong>Bungalow:</strong>{" "}
//                   {getBungalowName(selectedReservation.Feed_Banglowid)}
//                 </Typography>
//                 <Typography variant="body2" sx={{ mb: 1 }}>
//                   <strong>Check In:</strong> {selectedReservation.Check_In}
//                 </Typography>
//                 <Typography variant="body2">
//                   <strong>Check Out:</strong> {selectedReservation.Check_Out}
//                 </Typography>
//               </Box>

//               <TextField
//                 autoFocus
//                 margin="dense"
//                 id="remarks"
//                 label="Cancellation Remarks"
//                 type="text"
//                 fullWidth
//                 variant="outlined"
//                 value={cancelRemarks}
//                 onChange={handleRemarksChange}
//                 placeholder="Enter reason for cancellation"
//                 required
//                 error={remarksError}
//                 helperText={remarksError ? "Cancellation reason is required" : ""}
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
//           <Button onClick={handleCancelDialogClose} variant="outlined" disabled={cancelLoading}>
//             Back
//           </Button>
//           <Button
//             onClick={handleCancellation}
//             variant="contained"
//             color="error"
//             size="small"
//             disabled={cancelLoading}
//             startIcon={cancelLoading ? <CircularProgress size={20} /> : <Cancel />}
//           >
//             {cancelLoading ? "Processing..." : "Confirm Cancellation"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CaretakerModal;












//===============================================  2026/01/29====================================

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Fade,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Close,
  CheckCircle,
  Warning,
  Info,
  CalendarToday,
  NightsStay,
  Home,
  Assignment,
  RateReview,
  Cancel
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import FeedbackModal from "./FeedbackModal";

const CaretakerModal = ({ open, handleClose, reservation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [caretakerList, setCaretakerList] = useState([]);
  const [caretakerComment, setCaretakerComment] = useState("");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelRemarks, setCancelRemarks] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [remarksError, setRemarksError] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (open && reservation) {
      fetchCaretakerData();
    }
  }, [open, reservation]);

  const fetchCaretakerData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "Reservation/GetGuestFeeDetails",
        { params: { P_RESNO: reservation.Res_no } }
      );

      if (response.data.StatusCode === 200) {
        const results = response.data.ResultSet || [];
        setCaretakerList(results);
      } else {
        setError(response.data.Result || "Failed to fetch data");
      }
    } catch (err) {
      setError("Error fetching  data. Please try again.");
      console.error("Caretaker data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAgree = async (feedbackId, reservationNo) => {
    if (!caretakerComment.trim()) {
      Swal.fire({
        title: "Comment Required",
        text: "Please provide your comment before agreeing",
        icon: "info",
        confirmButtonColor: "#1976d2",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "Reservation/GustStatusUp",
        {
          params: {
            P_FEEDBACK_ID: feedbackId,
            P_CARET_STATUS: "A",
            P_RESERVATION_NO: reservationNo,
            P_EMP_COMMENT: caretakerComment,
          },
        }
      );

      if (response.data.StatusCode === 200) {
        Swal.fire({
          title: "Success!",
          text: "Caretaker status agreed successfully!",
          icon: "success",
          confirmButtonColor: "#1976d2",
        });
        setCaretakerComment("");
        fetchCaretakerData();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.Message || "Failed to update caretaker status",
          icon: "error",
          confirmButtonColor: "#1976d2",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Error updating caretaker status. Please try again.",
        icon: "error",
        confirmButtonColor: "#1976d2",
      });
      console.error("Caretaker update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackClick = (item) => {
    const reservationData = {
      Res_no: item.Res_no,
      Res_Bang_Id: item.Feed_Banglowid,
      Res_Check_In: item.Check_In,
      Res_Check_Out: item.Check_Out,
      Res_Status: "Confirmed"
    };

    setSelectedReservation(reservationData);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setFeedbackModalOpen(false);
    setSelectedReservation(null);
  };

  const handleCancelClick = (reservation) => { 
    if (reservation.Res_Status === "Pending") {
      setSelectedReservation(reservation);
      setCancelRemarks("");
      setRemarksError(false);
      setCancelDialogOpen(true);
      return;
    }
     
    const checkInDate = new Date(reservation.Check_In);
    const today = new Date();
    const timeDiff = checkInDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
     
    if (daysDiff <= 30) {
      Swal.fire({
        title: "Cancellation Not Allowed",
        html: `Check-in date (${reservation.Check_In}) is within 30 days.<br/><br/>
               <b>Please contact MR Kumara to process cancellation.</b>`,
        icon: "warning",
        confirmButtonColor: "#1976d2",
      });
      return;
    }
     
    setSelectedReservation(reservation);
    setCancelRemarks("");
    setRemarksError(false);
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
    setSelectedReservation(null);
    setRemarksError(false);
  };

  const handleCancellation = async () => {
    if (!selectedReservation) return;

    if (!cancelRemarks.trim()) {
      setRemarksError(true);
      return;
    }

    setCancelLoading(true);
    const today = new Date();
    const cancelDate = today.toISOString().split("T")[0];

    try {
      const response = await axios.get(`Reservation/CancelBooking`, {
        params: {
          P_RESNO: selectedReservation.Res_no,
          P_STATUS: "C",
          P_CANCELLED_DATE: cancelDate,
          P_REMARKS: cancelRemarks,
        },
      });

      if (response.data && response.data.StatusCode === 200) {
        Swal.fire({
          title: "Success!",
          text: "Reservation cancelled successfully!",
          icon: "success",
          confirmButtonColor: "#1976d2",
        });
        fetchCaretakerData();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data?.Message || "Failed to cancel reservation",
          icon: "error",
          confirmButtonColor: "#1976d2",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error cancelling reservation. Please try again.",
        icon: "error",
        confirmButtonColor: "#1976d2",
      });
    } finally {
      setCancelLoading(false);
      handleCancelDialogClose();
    }
  };

  const handleRemarksChange = (e) => {
    setCancelRemarks(e.target.value);
    if (e.target.value.trim()) {
      setRemarksError(false);
    }
  };

  const getBungalowName = (id) => {
    switch (id) {
      case "1": return "Main Bungalow";
      case "2": return "Lower Garden Suite";
      default: return "Unknown Bungalow";
    }
  };

  const getStatusChip = (status) => {
    if (status === "B") {
      return (
        <Chip
          icon={<Warning />}
          label="Requires Attention"
          color="error"
          variant="outlined"
          size="small"
          sx={{ mb: 1 }}
        />
      );
    }
    return null;
  };

  const canShowCancelButton = (reservation) => { 
    if (reservation.Res_Status === "Pending") {
      return true;
    }
     
    if (reservation.Res_Status === "Confirm" || reservation.Res_Status === "Confirmed") {
       
      const checkInDate = new Date(reservation.Check_In);
      const today = new Date();
      const timeDiff = checkInDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return daysDiff > 30;
    }
    
    return false;
  };

  const getCancelButtonLabel = (reservation) => {
    
    if (reservation.Res_Status === "Pending") {
      return "Cancel Reservation";
    }
    
     
    const checkInDate = new Date(reservation.Check_In);
    const today = new Date();
    const timeDiff = checkInDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 30) {
      return "Contact MR Kumara to Cancel";
    }
    return "Cancel Reservation";
  };

  const getCancelButtonColor = (reservation) => {
     
    if (reservation.Res_Status === "Pending") {
      return "error";
    }
    
     
    const checkInDate = new Date(reservation.Check_In);
    const today = new Date();
    const timeDiff = checkInDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff <= 30 ? "warning" : "error";
  };

  const showCancelWarning = (reservation) => {
    
    if (reservation.Res_Status === "Pending") {
      return false;
    }
    
    
    const checkInDate = new Date(reservation.Check_In);
    const today = new Date();
    const timeDiff = checkInDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff <= 30 && daysDiff > 0;
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
  <Fade in={open}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "95%", sm: "90%", md: "700px" },
        maxWidth: "95vw",
        bgcolor: "background.paper",
        boxShadow: theme.shadows[10],
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",  
      }}
    >
       
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 1,
        flexShrink: 0,  
      }}>
        <Typography variant="h5" sx={{ fontWeight: "600", color: "primary.main" }}>
          <Assignment sx={{ mr: 1, verticalAlign: "bottom" }} />
          My Reservation
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: "text.secondary",
            "&:hover": {
              backgroundColor: "action.hover",
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Scrollable Content Section */}
      <Box
        sx={{
          flex: 1, // Take remaining space
          overflow: "auto", // Scroll only this section
          minHeight: 0, // Important for flex child scrolling
          pr: 1, // Add some padding for scrollbar
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#ccc",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#aaa",
          },
        }}
      >

            {loading && !caretakerList.length ? (
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
                flexDirection: "column",
                gap: 2
              }}>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary">
                  Loading caretaker data...
                </Typography>
              </Box>
            ) : error ? (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  borderRadius: 2
                }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={fetchCaretakerData}
                  >
                    Retry
                  </Button>
                }
              >
                {error}
              </Alert>
            ) : (
              <>
                {caretakerList
                .filter(item => item.Res_Status !== "Closed")
                .map((item, index) => {
                  const statusConfig = {
                    "Confirm": { label: "Confirmed", color: "success" },
                    "Confirmed": { label: "Confirmed", color: "success" },
                    "Cancelled": { label: "Cancelled", color: "error" },
                    "Pending": { label: "Pending", color: "warning" },
                     
                  };

                  const statusInfo =
  statusConfig[item.Res_Status] || { label: item.Res_Status, color: "primary" };

                  
                  // Calculate days until check-in
                  const checkInDate = new Date(item.Check_In);
                  const today = new Date();
                  const timeDiff = checkInDate.getTime() - today.getTime();
                  const daysUntilCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));

                  return (
                    <Card
                      key={item.Feed_Id}
                      elevation={2}
                      sx={{
                        mb: 2,
                        borderRadius: 2,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        border: `1px solid ${theme.palette[statusInfo.color].main}`,
                        borderLeft: `4px solid ${theme.palette[statusInfo.color].main}`,
                        position: "relative",
                        "&:hover": {
                          boxShadow: theme.shadows[4],
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {/* Status label at top right */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bgcolor: `${theme.palette[statusInfo.color].main}`,
                          color: "white",
                          px: 1.5,
                          py: 0.5,
                          borderBottomLeftRadius: 8,
                          fontSize: "0.75rem",
                          fontWeight: "bold"
                        }}
                      >
                        {statusInfo.label}
                      </Box>

                      <CardContent sx={{ p: 2, pt: 3 }}>
                        {getStatusChip(item.Feed_CareTStatus)}

                        {showCancelWarning(item) && (
                          <Alert 
                            severity="warning" 
                            sx={{ 
                              mb: 2,
                              borderRadius: 2,
                              fontSize: '0.8rem',
                              py: 0.5
                            }}
                          >
                            <Typography variant="body2" fontWeight="bold">
                              Check-in in {daysUntilCheckIn} days! 
                            </Typography>
                            <Typography variant="body2">
                              Cancellation requires contact with MR Kumara.
                            </Typography>
                          </Alert>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{
                              bgcolor: "primary.main",
                              width: 24,
                              height: 24,
                              mr: 1,
                              fontSize: "0.8rem"
                            }}>
                              #
                            </Avatar>
                            <Typography variant="body1" fontWeight="600">
                              Reservation: {item.Res_no}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Home sx={{ fontSize: 20, color: "primary.main", mr: 1 }} />
                            <Typography variant="body1" fontWeight="500">
                              {getBungalowName(item.Feed_Banglowid)}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                          flexWrap: "wrap",
                          gap: 1
                        }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CalendarToday sx={{ fontSize: 20, color: "success.main", mr: 1 }} />
                            <Typography variant="body2">
                              Check-in: {item.Check_In}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <NightsStay sx={{ fontSize: 20, color: "info.main", mr: 1 }} />
                            <Typography variant="body2">
                              Check-out: {item.Check_Out}
                            </Typography>
                          </Box>

                          <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "primary.light",
                            color: "primary.contrastText",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1
                          }}>
                            <Typography variant="body2" fontWeight="500">
                              {item.Day_Count} day(s)
                            </Typography>
                          </Box>
                        </Box>

                        {item.Feed_CareTReport && (
                          <Box
                            sx={{
                              mt: 2,
                              p: 2,
                              backgroundColor: "grey.50",
                              borderRadius: 2,
                              maxHeight: 120,
                              overflowY: "auto",
                            }}
                          >
                            <Typography variant="subtitle2" color="primary" gutterBottom>
                              Caretaker's message:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                              }}
                            >
                              {item.Feed_CareTReport}
                            </Typography>
                          </Box>
                        )}

                        {item.Feed_EmpComm && (
                          <Box sx={{
                            mt: 2,
                            p: 2,
                            borderRadius: 2,
                            opacity: 0.9
                          }}>
                            <Typography variant="subtitle2" color="success.dark" gutterBottom>
                              <CheckCircle sx={{ fontSize: 16, mr: 0.5, verticalAlign: "text-bottom" }} />
                              My Response:
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                whiteSpace: "pre-line",
                                lineHeight: 1.6
                              }}
                            >
                              {item.Feed_EmpComm}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {item.Feed_CareTStatus === "B" && (
                            <>
                              <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Your Response"
                                value={
                                  selectedFeedbackId === item.Feed_Id
                                    ? caretakerComment
                                    : ""
                                }
                                onFocus={() => setSelectedFeedbackId(item.Feed_Id)}
                                onChange={(e) => setCaretakerComment(e.target.value)}
                                placeholder="Please provide your comments regarding the caretaker's report..."
                                variant="outlined"
                                sx={{
                                  mb: 2,
                                  "& .MuiInputBase-input": { fontSize: "0.85rem" },
                                  "& .MuiInputLabel-root": { fontSize: "0.85rem" }
                                }}
                              />
                              <Button
                                variant="contained"
                                disabled={loading}
                                onClick={() => handleAgree(item.Feed_Id, item.Res_no)}
                                startIcon={loading ? <CircularProgress size={16} /> : <CheckCircle />}
                                fullWidth={isMobile}
                                sx={{
                                  borderRadius: 2,
                                  textTransform: 'none',
                                  fontWeight: '600',
                                  py: 1,
                                  ...(isMobile ? {} : { minWidth: '200px' })
                                }}
                              >
                                {loading ? "Submitting..." : "Agree with Report"}
                              </Button>
                            </>
                          )}

                          {(item.Res_Status === "Confirm" || item.Res_Status === "Confirmed" || item.Res_Status === "Closed") && (
                            <Button
                              variant="outlined"
                              onClick={() => handleFeedbackClick(item)}
                              startIcon={<RateReview />}
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: '600',
                                py: 1,
                                ...(isMobile ? {} : { minWidth: '200px' })
                              }}
                            >
                              Provide Feedback
                            </Button>
                          )}

                          {canShowCancelButton(item) && (
                            <Button
                              variant="outlined"
                              color={getCancelButtonColor(item)}
                              onClick={() => handleCancelClick(item)}
                              startIcon={<Cancel />}
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: '600',
                                py: 1,
                                ...(isMobile ? {} : { minWidth: '200px' })
                              }}
                            >
                              {getCancelButtonLabel(item)}
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}

                {caretakerList.filter(item => item.Res_Status !== "Closed").length === 0 && !loading && (
                  <Box sx={{
                    textAlign: "center",
                    py: 4,
                    color: "text.secondary"
                  }}>
                    <Info sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                    <Typography variant="h6">
                      No caretaker reports found
                    </Typography>
                    <Typography variant="body2">
                      There are no caretaker reports for this reservation.
                    </Typography>
                  </Box>
                )}
              </>
            )}
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Feedback Modal */}
      {selectedReservation && (
        <FeedbackModal
          open={feedbackModalOpen}
          handleClose={handleFeedbackModalClose}
          reservation={selectedReservation}
        />
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#f44336", color: "white", fontWeight: "bold" }}>
          Cancellation Policy
          <IconButton
            aria-label="close"
            onClick={handleCancelDialogClose}
            sx={{ color: "white", position: "absolute", right: 16 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedReservation && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <p>
                  The following cancellation fee will be applied unless there is
                  an order for cancellation by the superior on an essential
                  official commitment.
                </p>
                <p>
                  From occupancy date: <br />
                </p>
                <p>
                  <b>
                    • 30 days before - No fee <br />
                    • 15 days before - 50% of full occupancy fee <br />
                    • Less than 15 days – 100% of full occupancy fee
                  </b>
                </p>
              </Typography>
              <hr />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to cancel this reservation?
              </Typography>

              <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Bungalow:</strong>{" "}
                  {getBungalowName(selectedReservation.Feed_Banglowid)}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Check In:</strong> {selectedReservation.Check_In}
                </Typography>
                <Typography variant="body2">
                  <strong>Check Out:</strong> {selectedReservation.Check_Out}
                </Typography>
              </Box>

              <TextField
                autoFocus
                margin="dense"
                id="remarks"
                label="Cancellation Remarks"
                type="text"
                fullWidth
                variant="outlined"
                value={cancelRemarks}
                onChange={handleRemarksChange}
                placeholder="Enter reason for cancellation"
                required
                error={remarksError}
                helperText={remarksError ? "Cancellation reason is required" : ""}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={handleCancelDialogClose} variant="outlined" disabled={cancelLoading}>
            Back
          </Button>
          <Button
            onClick={handleCancellation}
            variant="contained"
            color="error"
            size="small"
            disabled={cancelLoading}
            startIcon={cancelLoading ? <CircularProgress size={20} /> : <Cancel />}
          >
            {cancelLoading ? "Processing..." : "Confirm Cancellation"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CaretakerModal;