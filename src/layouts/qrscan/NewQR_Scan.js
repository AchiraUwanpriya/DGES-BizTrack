//------------------------------------------------------------------------

// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import QrScanner from "react-qr-scanner";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import DialogContentText from "@mui/material/DialogContentText";
// import {
//   Grid,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { SendEWODetails, QRScan } from "../../action/QRScan";
// import QRService from "../../service/QRService";
// import { Card, CardContent, Typography } from "@mui/material";
// import {
//   LaptopMac,
//   Person,
//   Keyboard,
//   Mouse,
//   Monitor,
//   Laptop,
//   Memory,
//   BatteryChargingFull,
//   DesktopWindows,
// } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
//   const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
//   const { data, loading } = useSelector((state) => state.userbyServiceNo);
//   const [qrCode, setQRCode] = useState("");
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [qrDetails, setQRDetails] = useState(null);
//   const [receivedDate, setReceivedDate] = useState("");
//   const [issuedBy, setIssuedBy] = useState("");
//   const [issuedDate, setIssuedDate] = useState(null);
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   const now = new Date();
//   //   setReceivedDate(now.toLocaleString()); // Customize the format as needed
//   //   setIssuedDate(now);
//   // }, []);
//   useEffect(() => {
//     // Set the current date and time when the component mounts
//     const now = new Date();
//     setIssuedDate(now);
//     setReceivedDate(
//       now.toLocaleString("en-US", {
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true, // Use 12-hour format
//       })
//     );
//   }, []);

//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
//       getCameraOptions();
//     }
//   }, []);

//   const handleClose = () => {
//     dispatch({ type: "IS_CLOSE" });
//   };

//   // const handleScan = async (scanData) => {
//   //   if (scanData) {
//   //     setQRCode(scanData.text.trim());
//   //     const ewoNo = parseInt(scanData.text.trim());
//   //     dispatch(QRScan(ewoNo, data[0].ServiceNo));
//   //   }
//   // };

//   const handleScan = async (scanData) => {
//     if (scanData) {
//       const ewoNo = scanData.text.trim();
//       setQRCode(ewoNo);
//       dispatch(QRScan(ewoNo, data[0]?.ServiceNo));

//       if (/^\d+$/.test(ewoNo)) {
//         dispatch({ type: "SHOW_QR_DETAILS_MODAL" });
//       } else if (/[A-Za-z]/.test(ewoNo)) {
//         const response = await QRService.GetEWODetails(ewoNo);
//         if (response.data.StatusCode === 200) {
//           setQRDetails(response.data.ResultSet);
//           setOpenDetailsModal(true);
//         }
//       }
//     }
//   };

//   // const handleScan = async (scanData) => {
//   //   if (scanData) {
//   //     const ewoNo = scanData.text.trim();
//   //     setQRCode(ewoNo);
//   //     dispatch(QRScan(ewoNo, data[0]?.ServiceNo));

//   //     if (/^\d+$/.test(ewoNo)) {
//   //       dispatch({ type: "SHOW_QR_DETAILS_MODAL" });
//   //     } else if (/[A-Za-z]/.test(ewoNo)) {
//   //       setOpenDetailsModal(true);
//   //     }
//   //   }
//   // };

//   const handleViewDetails = () => {
//     setOpenDetailsModal(true);
//   };
//   const handleCloseDetailsModal = () => {
//     setOpenDetailsModal(false);
//   };
//   const handleError = (error) => {
//     console.error(error);
//   };
//   const getCameraOptions = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     const rearCamera = videoDevices.find(
//       (device) => device.label.includes("back") || device.label.includes("rear")
//     );
//   };
//   const previewStyle = {
//     width: "100%",
//     height: "auto",
//   };
//   const issuedByOptions = [
//     { value: "person1", label: "Person 1" },
//     { value: "person2", label: "Person 2" },
//     { value: "person3", label: "Person 3" },
//     // Add more options as needed
//   ];
//   return (
//     <div>
//       <div>
//         <BootstrapDialog
//           onClose={handleClose}
//           aria-labelledby="customized-dialog-title"
//           open={isOpen}
//         >
//           <BootstrapDialogTitle
//             id="customized-dialog-title"
//             onClose={handleClose}
//           >
//             Scan Your QR Code
//           </BootstrapDialogTitle>
//           <DialogContent dividers>
//             {/* <QrScanner
//               delay={1000}
//               onError={handleError}
//               onScan={handleScan}
//               style={previewStyle}
//               constraints={{
//                 audio: false,
//                 video: { facingMode: "environment", autoFocus: true },
//               }}
//             /> */}
//             <QrScanner
//               delay={1000}
//               onError={handleError}
//               onScan={handleScan}
//               style={previewStyle}
//               constraints={{
//                 audio: false,
//                 video: {
//                   facingMode: "environment",
//                   autoFocus: true,
//                   torch: false,
//                 },
//               }}
//             />
//           </DialogContent>
//           <DialogActions>
//             {/* <Button variant="outlined" onClick={handleViewDetails}>
//               View
//             </Button> */}
//             <Button
//               autoFocus
//               onClick={() => {
//                 handleClose();
//               }}
//             >
//               Scan Again
//             </Button>
//           </DialogActions>
//         </BootstrapDialog>
//       </div>
//       <div>
//         {/* QR Code EWO Details Modal */}
//         <BootstrapDialog
//           onClose={handleClose}
//           aria-labelledby="customized-dialog-title"
//           open={isOpenDetailScreen}
//         >
//           <BootstrapDialogTitle
//             id="customized-dialog-title"
//             onClose={handleClose}
//           >
//             EWO Details
//           </BootstrapDialogTitle>
//           <DialogContent dividers>
//             <DialogContentText
//               id="scroll-dialog-description"
//               tabIndex={-1}
//               marginLeft={-2}
//             >
//               <Grid
//                 container
//                 spacing={0}
//                 direction="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 padding={1}
//               >
//                 <Box
//                   sx={{
//                     "& .MuiTextField-root": { m: 1, width: "100%" },
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   justifyContent={"center"}
//                   alignItems={"center"}
//                 >
//                   <div style={{ textAlign: "center" }}>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         EWO No:
//                       </Typography>

//                       <Typography variant="body2">
//                         {responseBody !== null ? responseBody.EwoNo : "N/A"}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Authorize Person:
//                       </Typography>

//                       <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
//                         {responseBody !== null
//                           ? responseBody.AuthorizePerson
//                           : "N/A"}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Estimate Amount:
//                       </Typography>

//                       <Typography variant="body2">
//                         {responseBody !== null
//                           ? responseBody.EstimatedAmount
//                           : "N/A"}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Billed Amount:
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Workdone Receive Amount:
//                       </Typography>

//                       <Typography variant="body2">
//                         {responseBody !== null
//                           ? responseBody.authorize_person
//                           : "N/A"}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Certified By:
//                       </Typography>

//                       <Typography variant="body2">
//                         {responseBody !== null
//                           ? responseBody.ApprovedBy
//                           : "N/A"}
//                       </Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Evaluated By:
//                       </Typography>

//                       <Typography variant="body2">
//                         {responseBody !== null
//                           ? responseBody.EvaluationBy
//                           : "N/A"}
//                       </Typography>
//                     </Box>
//                     <TextField
//                       id="outlined-read-only-input"
//                       inputProps={{
//                         style: {
//                           color:
//                             responseBody !== null
//                               ? responseBody.StatusTxtcolor
//                               : "",
//                         },
//                       }}
//                       defaultValue={
//                         responseBody !== null ? responseBody.EwoStatus : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                       style={{
//                         backgroundColor:
//                           responseBody !== null
//                             ? responseBody.StatusBckcolor
//                             : "",
//                         borderRadius: 5,
//                       }}
//                     />
//                     <Box mt={2} mb={2}>
//                       <hr style={{ border: "5px solid #ccc" }} />
//                     </Box>
//                     <TextField
//                       id="outlined-read-only-input"
//                       label="Recieved By:"
//                       defaultValue={
//                         responseBody !== null ? responseBody.RecievedBy : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                     <TextField
//                       id="outlined-read-only-input"
//                       label="Received Date"
//                       value={receivedDate} // Use the state value
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                     {/* <TextField
//                       id="outlined-read-only-input"
//                       label="Issued By:"
//                       defaultValue={
//                         responseBody !== null ? responseBody.IssuedBy : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     /> */}

//                     {/* <FormControl variant="outlined" fullWidth sx={{ m: 1 }}>
//                       <InputLabel id="issued-by-label">Issued By</InputLabel>
//                       <Select
//                         labelId="issued-by-label"
//                         value={issuedBy}
//                         onChange={(e) => setIssuedBy(e.target.value)}
//                         label="Issued By"
//                         sx={{ textAlign: "left" }} // ensures left alignment
//                       >
//                         {issuedByOptions.map((option) => (
//                           <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl> */}

//                     <FormControl variant="outlined" fullWidth sx={{ m: 1 }}>
//                       <Autocomplete
//                         options={issuedByOptions}
//                         getOptionLabel={(option) => option.label} // Display label in dropdown
//                         value={
//                           issuedByOptions.find(
//                             (option) => option.value === issuedBy
//                           ) || null
//                         } // Set current value
//                         onChange={(event, newValue) =>
//                           setIssuedBy(newValue ? newValue.value : "")
//                         } // Update value
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Issued By"
//                             variant="outlined"
//                             placeholder="Select or Type here to Search"
//                             sx={{ textAlign: "left" }} // ensures left alignment
//                           />
//                         )}
//                         sx={{ width: "100%" }} // Full width
//                       />
//                     </FormControl>

//                     {/* <TextField
//                       id="outlined-read-only-input"
//                       label="Issued Date"
//                       defaultValue={
//                         responseBody !== null ? responseBody.IssuedDate : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     /> */}
//                     <LocalizationProvider dateAdapter={AdapterDateFns}>
//                       <DateTimePicker
//                         label="Issued Date"
//                         value={issuedDate} // Use the state value
//                         onChange={(newValue) => setIssuedDate(newValue)}
//                         renderInput={(params) => (
//                           <TextField {...params} fullWidth />
//                         )}
//                       />
//                     </LocalizationProvider>
//                     {/* <TextField
//                       id="outlined-read-only-input"
//                       label="Serial No:"
//                       defaultValue={
//                         responseBody !== null ? responseBody.SerialNo : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                     <TextField
//                       id="outlined-read-only-input"
//                       label="DocType"
//                       defaultValue={
//                         responseBody !== null ? responseBody.DocType : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     /> */}
//                     <TextField
//                       id="outlined-read-only-input"
//                       label="Remarks"
//                       defaultValue={
//                         responseBody !== null ? responseBody.Remarks : ""
//                       }
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                   </div>
//                 </Box>
//               </Grid>
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             {isButtonVisible && (
//               <Button
//                 variant="contained"
//                 endIcon={<SendIcon />}
//                 autoFocus
//                 onClick={() => {
//                   handleClose();
//                   dispatch(SendEWODetails(responseBody));
//                 }}
//               >
//                 Send Doc
//               </Button>
//             )}
//             <Button
//               variant="contained"
//               endIcon={<CloseIcon />}
//               color="error"
//               autoFocus
//               onClick={() => {
//                 handleClose();
//               }}
//             >
//               Close
//             </Button>
//           </DialogActions>
//         </BootstrapDialog>

//         {/* QR Code Details Modal */}
//         <BootstrapDialog
//           onClose={handleCloseDetailsModal}
//           aria-labelledby="qr-code-details-title"
//           open={openDetailsModal}
//         >
//           <BootstrapDialogTitle
//             id="qr-code-details-title"
//             onClose={handleCloseDetailsModal}
//           >
//             CDPLC QR
//           </BootstrapDialogTitle>
//           <DialogContent dividers>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Card
//                   sx={{
//                     border: "1px solid #b1a9a9",
//                     borderRadius: 5,
//                     padding: 2,
//                     marginBottom: 2,
//                   }}
//                 >
//                   <CardContent>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Typography
//                         variant="h6"
//                         fontWeight="bold"
//                         fontSize={18}
//                         mb={2}
//                       >
//                         QR Code Details
//                       </Typography>

//                       {/* Device Icon Selection */}
//                       {qrCode?.includes("S") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <Monitor sx={{ fontSize: 50, color: "black" }} />
//                         </IconButton>
//                       )}
//                       {qrCode?.includes("K") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <Keyboard sx={{ fontSize: 50, color: "black" }} />
//                         </IconButton>
//                       )}
//                       {qrCode?.includes("M") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <Mouse sx={{ fontSize: 50, color: "black" }} />
//                         </IconButton>
//                       )}
//                       {qrCode?.includes("L") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <LaptopMac sx={{ fontSize: 50, color: "black" }} />
//                         </IconButton>
//                       )}
//                       {qrCode?.includes("U") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <BatteryChargingFull
//                             sx={{ fontSize: 50, color: "black" }}
//                           />
//                         </IconButton>
//                       )}
//                       {qrCode?.includes("P") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <DesktopWindows
//                             sx={{ fontSize: 50, color: "black" }}
//                           />
//                         </IconButton>
//                       )}
//                       {/* {qrCode?.includes("O") && null} */}
//                       {qrCode?.includes("O") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <Memory sx={{ fontSize: 50, color: "black" }} />
//                         </IconButton>
//                       )}
//                       {/* {qrCode?.includes("C") && null} */}
//                       {qrCode?.includes("C") && (
//                         <IconButton sx={{ color: "black", fontSize: 30 }}>
//                           <DesktopWindows
//                             sx={{ fontSize: 50, color: "black" }}
//                           />
//                         </IconButton>
//                       )}
//                     </Box>
//                     {/* QR Code: */}
//                     <Grid container spacing={2}>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" fontWeight="bold">
//                           QR Code:
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2">
//                           {qrCode || "Not Available"}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" fontWeight="bold">
//                           Device:
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2">
//                           {qrCode?.includes("S")
//                             ? "Screen"
//                             : qrCode?.includes("K")
//                             ? "Keyboard"
//                             : qrCode?.includes("M")
//                             ? "Mouse"
//                             : qrCode?.includes("L")
//                             ? "Laptop"
//                             : qrCode?.includes("U")
//                             ? "UPS"
//                             : qrCode?.includes("P")
//                             ? "Computer"
//                             : qrCode?.includes("O")
//                             ? "Other"
//                             : qrCode?.includes("C")
//                             ? "Machine"
//                             : "N/A"}
//                         </Typography>
//                       </Grid>
//                       {/* Other fields */}
//                       <Grid item xs={6}>
//                         <Typography variant="body2" fontWeight="bold">
//                           Make:
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2">
//                           {qrDetails?.ICT_ScreenModels[0]?.Mon_Make || "N/A"}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" fontWeight="bold">
//                           Model:
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2">
//                           {qrDetails?.ICT_ScreenModels[0]?.Mon_Model || "N/A"}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" fontWeight="bold">
//                           Status:
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2">
//                           {qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "A"
//                             ? "Active"
//                             : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "I"
//                             ? "Inactive"
//                             : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "D"
//                             ? "Disposable"
//                             : "N/A"}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>

//             {/* Associated User Section */}

//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Associated User Details
//                     </Typography>
//                     <IconButton sx={{ color: "black", fontSize: 30 }}>
//                       <Person sx={{ fontSize: 50 }} />
//                     </IconButton>
//                   </Box>

//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Service No:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Service_No || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Computer Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Email Address:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Email || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Extension:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Exte || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Physical Location:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Loc || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Status === "A"
//                           ? "Active"
//                           : qrDetails?.Status === "I"
//                           ? "Inactive"
//                           : qrDetails?.Status === "D"
//                           ? "Disposable"
//                           : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>

//             {/* Associated Devices Section */}
//             <Grid item xs={12}>
//               <Card
//                 // sx={{ border: "1px solid #000", borderRadius: 0, padding: 2 }}
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Other Associated Devices
//                     </Typography>
//                   </Box>

//                   {[
//                     { title: "Laptop", prefix: "Lap", icon: <Laptop /> },
//                     { title: "Machine", prefix: "Mac", icon: <Memory /> },
//                     { title: "Keyboard", prefix: "Key", icon: <Keyboard /> },
//                     { title: "Mouse", prefix: "Mou", icon: <Mouse /> },
//                   ].map((device, index) => {
//                     // Check if the code is "N/A"
//                     const deviceCode =
//                       qrDetails?.[`${device.prefix}_Code`] || "N/A";
//                     if (deviceCode === "N/A") {
//                       return null; // Skip rendering this device block if code is "N/A"
//                     }

//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           border: "1px solid #b1a9a9",
//                           padding: 2,
//                           marginBottom: 2,
//                           borderRadius: 3,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="h6"
//                             fontWeight="bold"
//                             fontSize={16}
//                             mb={1}
//                           >
//                             {device.title}
//                           </Typography>
//                           {device.icon}
//                         </Box>
//                         <Grid container spacing={2}>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Code:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {deviceCode}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Make:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Make`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Model:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Model`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Status:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Status`] === "A"
//                                 ? "Active"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "I"
//                                 ? "Inactive"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "D"
//                                 ? "Disposable"
//                                 : "N/A"}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     );
//                   })}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="contained" onClick={handleCloseDetailsModal}>
//               Close
//             </Button>
//           </DialogActions>
//         </BootstrapDialog>
//       </div>
//     </div>
//   );
// }

//-----------------------------------------------

// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import QrScanner from "react-qr-scanner";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import DialogContentText from "@mui/material/DialogContentText";
// import {
//   Grid,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import {
//   SendEWODetails,
//   QRScan,
//   GetEmployeeDetails,
// } from "../../action/QRScan";
// import QRService from "../../service/QRService";
// import { Card, CardContent, Typography } from "@mui/material";
// import {
//   LaptopMac,
//   Person,
//   Keyboard,
//   Mouse,
//   Monitor,
//   Laptop,
//   Memory,
//   BatteryChargingFull,
//   DesktopWindows,
// } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
//   const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
//   const { data, loading } = useSelector((state) => state.userbyServiceNo);
//   const { employees, employeeLoading } = useSelector(
//     (state) => state.employee || { employees: [], employeeLoading: false }
//   );
//   const [qrCode, setQRCode] = useState("");
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [qrDetails, setQRDetails] = useState(null);
//   const [receivedDate, setReceivedDate] = useState("");
//   const [issuedBy, setIssuedBy] = useState("");
//   const [issuedDate, setIssuedDate] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const now = new Date();
//     setIssuedDate(now);
//     setReceivedDate(
//       now.toLocaleString("en-US", {
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       })
//     );
//   }, []);

//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
//       getCameraOptions();
//     }
//   }, []);

//   useEffect(() => {
//     console.log("Fetching employee details...");
//     dispatch(GetEmployeeDetails());
//   }, [dispatch]);

//   const handleClose = () => {
//     dispatch({ type: "IS_CLOSE" });
//     setOpenDetailsModal(false);
//   };

//   // const handleScan = async (scanData) => {
//   //   if (scanData) {
//   //     const scannedText = scanData.text.trim();
//   //     setQRCode(scannedText);

//   //     if (/^\d+$/.test(scannedText)) {
//   //       // Numeric QR code - handle EWO details
//   //       const ewoNo = parseInt(scannedText);
//   //       dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//   //     } else if (/[A-Za-z]/.test(scannedText)) {
//   //       // Alphabetic QR code - handle device details
//   //       try {
//   //         const response = await QRService.GetEWODetails(scannedText);
//   //         if (response.data.StatusCode === 200) {
//   //           setQRDetails(response.data.ResultSet);
//   //           setOpenDetailsModal(true);
//   //           dispatch({ type: "IS_CLOSE" });
//   //         }
//   //       } catch (error) {
//   //         console.error("Error fetching QR details:", error);
//   //       }
//   //     }
//   //   }
//   // };

//   const handleScan = async (scanData) => {
//     let scannedText;

//     if (scanData) {
//       scannedText = scanData.text.trim();
//       setQRCode(scannedText);
//     } else {
//       // QR scan එකක් නැත්නම් 305616 එකක් hardcoded එකක් ලෙස assign කරන්න
//       scannedText = "305616";
//       setQRCode(scannedText);
//     }

//     if (/^\d+$/.test(scannedText)) {
//       // Numeric QR code - handle EWO details
//       const ewoNo = parseInt(scannedText);
//       dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//     } else if (/[A-Za-z]/.test(scannedText)) {
//       // Alphabetic QR code - handle device details
//       try {
//         const response = await QRService.GetEWODetails(scannedText);
//         if (response.data.StatusCode === 200) {
//           setQRDetails(response.data.ResultSet);
//           setOpenDetailsModal(true);
//           dispatch({ type: "IS_CLOSE" });
//         }
//       } catch (error) {
//         console.error("Error fetching QR details:", error);
//       }
//     }
//   };

//   const handleCloseDetailsModal = () => {
//     setOpenDetailsModal(false);
//   };

//   const handleError = (error) => {
//     console.error(error);
//   };

//   const getCameraOptions = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     const rearCamera = videoDevices.find(
//       (device) => device.label.includes("back") || device.label.includes("rear")
//     );
//   };

//   const previewStyle = {
//     width: "100%",
//     height: "auto",
//   };

//   return (
//     <div>
//       {/* QR Scanner Modal */}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpen}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           Scan Your QR Code
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <QrScanner
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             style={previewStyle}
//             constraints={{
//               audio: false,
//               video: {
//                 facingMode: "environment",
//                 autoFocus: true,
//                 torch: false,
//               },
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             autoFocus
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Scan Again
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/* EWO Details Modal */}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpenDetailScreen}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           EWO Details
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <DialogContentText
//             id="scroll-dialog-description"
//             tabIndex={-1}
//             marginLeft={-2}
//           >
//             <Grid
//               container
//               spacing={0}
//               direction="column"
//               alignItems="center"
//               justifyContent="center"
//               padding={1}
//             >
//               <Box
//                 sx={{
//                   "& .MuiTextField-root": { m: 1, width: "100%" },
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//               >
//                 <div style={{ textAlign: "center" }}>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       EWO No:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null ? responseBody.EwoNo : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Authorize Person:
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
//                       {responseBody !== null
//                         ? responseBody.AuthorizePerson
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Estimate Amount:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.EstimatedAmount
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Billed Amount:
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Workdone Receive Amount:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.authorize_person
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Certified By:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null ? responseBody.ApprovedBy : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Evaluated By:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.EvaluationBy
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <TextField
//                     id="outlined-read-only-input"
//                     inputProps={{
//                       style: {
//                         color:
//                           responseBody !== null
//                             ? responseBody.StatusTxtcolor
//                             : "",
//                       },
//                     }}
//                     defaultValue={
//                       responseBody !== null ? responseBody.EwoStatus : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                     style={{
//                       backgroundColor:
//                         responseBody !== null
//                           ? responseBody.StatusBckcolor
//                           : "",
//                       borderRadius: 5,
//                     }}
//                   />
//                   <Box mt={2} mb={2}>
//                     <hr style={{ border: "5px solid #ccc" }} />
//                   </Box>
//                   <TextField
//                     id="outlined-read-only-input"
//                     label="Recieved By:"
//                     defaultValue={
//                       responseBody !== null ? responseBody.RecievedBy : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                   {/* <TextField
//                     id="outlined-read-only-input"
//                     label="Received Date"
//                     // value={receivedDate}
//                     defaultValue={
//                       responseBody !== null ? responseBody.RecievedDate : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   /> */}
//                   <TextField
//                     id="outlined-read-only-input"
//                     label="Received Date"
//                     defaultValue={
//                       responseBody !== null
//                         ? responseBody.RecievedDate.split(" ")[0] // Split by space and take first segment
//                         : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                   <FormControl variant="outlined" fullWidth sx={{ m: 1 }}>
//                     <Autocomplete
//                       options={employees || []}
//                       getOptionLabel={(option) => option.EmpName}
//                       value={
//                         employees.find((emp) => emp.EmpName === issuedBy) ||
//                         null
//                       }
//                       onChange={(event, newValue) => {
//                         setIssuedBy(newValue ? newValue.EmpName : "");
//                       }}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Issued By"
//                           variant="outlined"
//                           defaultValue={
//                             responseBody !== null
//                               ? responseBody.P_ISERVICE_NO
//                               : ""
//                           }
//                           fullWidth
//                           sx={{ m: 1 }}
//                         />
//                       )}
//                       disabled={employeeLoading}
//                       loading={employeeLoading}
//                       noOptionsText={
//                         employeeLoading ? "Loading..." : "No employees found"
//                       }
//                       disablePortal={true}
//                       componentsProps={{
//                         popper: {
//                           placement: "bottom-start",
//                           modifiers: [
//                             {
//                               name: "flip",
//                               enabled: false,
//                             },
//                           ],
//                         },
//                       }}
//                     />
//                   </FormControl>
//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <DateTimePicker
//                       label="Issued Date"
//                       value={issuedDate}
//                       onChange={(newValue) => setIssuedDate(newValue)}
//                       renderInput={(params) => (
//                         <TextField {...params} fullWidth />
//                       )}
//                     />
//                   </LocalizationProvider>
//                   <TextField
//                     id="outlined-read-only-input"
//                     label="Remarks"
//                     defaultValue={
//                       responseBody !== null ? responseBody.Remarks : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                 </div>
//               </Box>
//             </Grid>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           {isButtonVisible && (
//             <Button
//               variant="contained"
//               endIcon={<SendIcon />}
//               autoFocus
//               onClick={() => {
//                 handleClose();
//                 dispatch(SendEWODetails(responseBody));
//               }}
//             >
//               Send Doc
//             </Button>
//           )}
//           <Button
//             variant="contained"
//             endIcon={<CloseIcon />}
//             color="error"
//             autoFocus
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/* QR Code Details Modal */}
//       <BootstrapDialog
//         onClose={handleCloseDetailsModal}
//         aria-labelledby="qr-code-details-title"
//         open={openDetailsModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <BootstrapDialogTitle
//           id="qr-code-details-title"
//           onClose={handleCloseDetailsModal}
//         >
//           CDPLC QR
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       QR Code Details
//                     </Typography>

//                     {qrCode?.includes("S") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Monitor sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("K") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Keyboard sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("M") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Mouse sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("L") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <LaptopMac sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("U") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <BatteryChargingFull
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("P") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <DesktopWindows sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("O") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Memory sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("C") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <DesktopWindows sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                   </Box>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         QR Code:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrCode || "Not Available"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Device:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrCode?.includes("S")
//                           ? "Screen"
//                           : qrCode?.includes("K")
//                           ? "Keyboard"
//                           : qrCode?.includes("M")
//                           ? "Mouse"
//                           : qrCode?.includes("L")
//                           ? "Laptop"
//                           : qrCode?.includes("U")
//                           ? "UPS"
//                           : qrCode?.includes("P")
//                           ? "Computer"
//                           : qrCode?.includes("O")
//                           ? "Other"
//                           : qrCode?.includes("C")
//                           ? "Machine"
//                           : "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Make:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Make || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Model:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Model || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "A"
//                           ? "Active"
//                           : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "I"
//                           ? "Inactive"
//                           : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "D"
//                           ? "Disposable"
//                           : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Associated User Details
//                     </Typography>
//                     <IconButton sx={{ color: "black", fontSize: 30 }}>
//                       <Person sx={{ fontSize: 50 }} />
//                     </IconButton>
//                   </Box>

//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Service No:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Service_No || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Computer Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Email Address:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Email || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Extension:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Exte || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Physical Location:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Loc || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Status === "A"
//                           ? "Active"
//                           : qrDetails?.Status === "I"
//                           ? "Inactive"
//                           : qrDetails?.Status === "D"
//                           ? "Disposable"
//                           : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Other Associated Devices
//                     </Typography>
//                   </Box>

//                   {[
//                     { title: "Laptop", prefix: "Lap", icon: <Laptop /> },
//                     { title: "Machine", prefix: "Mac", icon: <Memory /> },
//                     { title: "Keyboard", prefix: "Key", icon: <Keyboard /> },
//                     { title: "Mouse", prefix: "Mou", icon: <Mouse /> },
//                   ].map((device, index) => {
//                     const deviceCode =
//                       qrDetails?.[`${device.prefix}_Code`] || "N/A";
//                     if (deviceCode === "N/A") {
//                       return null;
//                     }

//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           border: "1px solid #b1a9a9",
//                           padding: 2,
//                           marginBottom: 2,
//                           borderRadius: 3,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="h6"
//                             fontWeight="bold"
//                             fontSize={16}
//                             mb={1}
//                           >
//                             {device.title}
//                           </Typography>
//                           {device.icon}
//                         </Box>
//                         <Grid container spacing={2}>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Code:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {deviceCode}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Make:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Make`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Model:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Model`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Status:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Status`] === "A"
//                                 ? "Active"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "I"
//                                 ? "Inactive"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "D"
//                                 ? "Disposable"
//                                 : "N/A"}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     );
//                   })}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleCloseDetailsModal}>
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }


//--------------------------------------------------------------2025/11/21------------------------------------------

// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import QrScanner from "react-qr-scanner";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import DialogContentText from "@mui/material/DialogContentText";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Grid,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { SendEWODetails, QRScan, GetEmployeeDetails } from "../../action/QRScan";
// import QRService from "../../service/QRService";
// import { Card, CardContent, Typography } from "@mui/material";
// import {
//   LaptopMac,
//   Person,
//   Keyboard,
//   Mouse,
//   Monitor,
//   Laptop,
//   Memory,
//   BatteryChargingFull,
//   DesktopWindows,
// } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
//   const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
//   const { data, loading } = useSelector((state) => state.userbyServiceNo);
//   const { employees, employeeLoading } = useSelector((state) => state.employee || { employees: [], employeeLoading: false });
//   const [qrCode, setQRCode] = useState("");
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [qrDetails, setQRDetails] = useState(null);
//   const [receivedDate, setReceivedDate] = useState("");
//   const [issuedBy, setIssuedBy] = useState("");
//   const [issuedDate, setIssuedDate] = useState(null);
//   const dispatch = useDispatch();
//   //const [serviceNo, setServiceNo] = useState('');
//   const [remarks, setRemarks] = useState("");
//   const [serviceNo, setServiceNo] = useState(data?.[0]?.ServiceNo || '');

//   useEffect(() => {
//     const now = new Date();
//     setIssuedDate(now);
//     setReceivedDate(
//       now.toLocaleString("en-US", {
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       })
//     );
//   }, []);

//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
//       getCameraOptions();
//     }
//   }, []);

//   useEffect(() => {

//     console.log("Fetching employee details...");
//     dispatch(GetEmployeeDetails());
//   }, [dispatch]);

//   const handleClose = () => {
//     dispatch({ type: "IS_CLOSE" });
//     setOpenDetailsModal(false);
//   };


//   const handleScan = async (scanData) => {
//     if (scanData) {
//       const scannedText = scanData.text.trim();
//       setQRCode(scannedText);

//       if (/^\d+$/.test(scannedText)) {
//         // Numeric QR code - handle EWO details
//         const ewoNo = parseInt(scannedText);
//         dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//       } else if (/[A-Za-z]/.test(scannedText)) {
//         // Alphabetic QR code - handle device details
//         try {
//           const response = await QRService.GetEWODetails(scannedText);
//           if (response.data.StatusCode === 200) {
//             setQRDetails(response.data.ResultSet);
//             setOpenDetailsModal(true);
//             dispatch({ type: "IS_CLOSE" });
//           }
//         } catch (error) {
//           console.error("Error fetching QR details:", error);
//         }
//       }
//     }
//   };

//   // const handleScan = async (scanData) => {
//   //   let scannedText;
//   //   if (scanData) {
//   //     scannedText = scanData.text.trim();
//   //     setQRCode(scannedText);
//   //   } else {
//   //     scannedText = "305571";
//   //     setQRCode(scannedText);
//   //   }
//   //   if (/^\d+$/.test(scannedText)) {
//   //     // Numeric QR code - handle EWO details
//   //     const ewoNo = parseInt(scannedText);
//   //     dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//   //   } else if (/[A-Za-z]/.test(scannedText)) {
//   //     // Alphabetic QR code - handle device details
//   //     try {
//   //       const response = await QRService.GetEWODetails(scannedText);
//   //       if (response.data.StatusCode === 200) {
//   //         setQRDetails(response.data.ResultSet);
//   //         setOpenDetailsModal(true);
//   //         dispatch({ type: "IS_CLOSE" });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching QR details:", error);
//   //     }
//   //   }
//   // };



//   const handleCloseDetailsModal = () => {
//     setOpenDetailsModal(false);
//   };

//   const handleError = (error) => {
//     console.error(error);
//   };

//   const getCameraOptions = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     const rearCamera = videoDevices.find(
//       (device) => device.label.includes("back") || device.label.includes("rear")
//     );
//   };

//   const previewStyle = {
//     width: "100%",
//     height: "auto",
//   };

//   return (
//     <div>
//       {/* QR Scanner Modal */}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpen}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           Scan Your QR Code
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <QrScanner
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             style={previewStyle}
//             constraints={{
//               audio: false,
//               video: {
//                 facingMode: "environment",
//                 autoFocus: true,
//                 torch: false,
//               },
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             autoFocus
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Scan Again
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/*------------------------------------------------- EWO Details Modal ---------------------------------------------------*/}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpenDetailScreen}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           EWO Details
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <DialogContentText
//             id="scroll-dialog-description"
//             tabIndex={-1}
//             marginLeft={-2}
//           >
//             <Grid
//               container
//               spacing={0}
//               direction="column"
//               alignItems="center"
//               justifyContent="center"
//               padding={1}
//             >
//               <Box
//                 sx={{
//                   "& .MuiTextField-root": { m: 1, width: "100%" },
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//                 justifyContent={"center"}
//                 alignItems={"center"}
//               >
//                 <div style={{ textAlign: "center" }}>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       EWO No:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null ? responseBody.EwoNo : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Authorize Person:
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
//                       {responseBody !== null
//                         ? responseBody.AuthorizePerson
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Estimate Amount:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.EstimatedAmount
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Billed Amount:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.BilledAmount
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   {/* <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Workdone Receive Amount:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.authorize_person
//                         : "N/A"}
//                     </Typography>
//                   </Box> */}
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Certified By:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.ApprovedBy
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       Evaluated By:
//                     </Typography>
//                     <Typography variant="body2">
//                       {responseBody !== null
//                         ? responseBody.EvaluationBy
//                         : "N/A"}
//                     </Typography>
//                   </Box>
//                   <TextField
//                     id="outlined-read-only-input"
//                     inputProps={{
//                       style: {
//                         color:
//                           responseBody !== null
//                             ? responseBody.StatusTxtcolor
//                             : "",
//                       },
//                     }}
//                     defaultValue={
//                       responseBody !== null ? responseBody.EwoStatus : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                     style={{
//                       backgroundColor:
//                         responseBody !== null
//                           ? responseBody.StatusBckcolor
//                           : "",
//                       borderRadius: 5,
//                     }}
//                   />
//                   <Box mt={2} mb={2}>
//                     <hr style={{ border: "5px solid #ccc" }} />
//                   </Box>
//                   <TextField
//                     id="outlined-read-only-input"
//                     label="Recieved By:"
//                     value={data?.[0]?.ReportName || ''}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                   <TextField
//                     id="outlined-read-only-input"
//                     label="Service Number"
//                     value={data?.[0]?.ServiceNo || ''}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                   {/* <TextField
//                     id="outlined-read-only-input"
//                     label="Recieved By:"
//                     defaultValue={
//                       responseBody !== null ? responseBody.RecievedBy : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   /> */}
//                   {/* <TextField
//                     id="outlined-read-only-input"
//                     label="Received Date"
//                     value={receivedDate}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   /> */}

//                   <FormControl variant="outlined" fullWidth sx={{ m: 0 }}>
//                     <Autocomplete
//                       options={employees || []}
//                       getOptionLabel={(option) => `${option.EmpName} (${option.ServiceNo})`}
//                       value={employees.find(emp => emp.ServiceNo === serviceNo) || null}
//                       onChange={(event, newValue) => {
//                         setIssuedBy(newValue ? newValue.EmpName : '');
//                         setServiceNo(newValue ? newValue.ServiceNo : '');
//                       }}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Issued By"
//                           variant="outlined"
//                           fullWidth
//                           sx={{ m: 1 }}
//                         />
//                       )}
//                       renderOption={(props, option) => (
//                         <li {...props}>
//                           {option.EmpName} ({option.ServiceNo})
//                         </li>
//                       )}
//                       disabled={employeeLoading}
//                       loading={employeeLoading}
//                       noOptionsText={employeeLoading ? "Loading..." : "No employees found"}
//                       disablePortal={true}
//                       componentsProps={{
//                         popper: {
//                           placement: 'bottom-start',
//                           modifiers: [
//                             {
//                               name: 'flip',
//                               enabled: false,
//                             },
//                           ],
//                         },
//                       }}
//                     />
//                   </FormControl>
//                   <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     <DateTimePicker
//                       label="Issued Date"
//                       value={issuedDate}
//                       onChange={(newValue) => setIssuedDate(newValue)}
//                       renderInput={(params) => (
//                         <TextField {...params} fullWidth />
//                       )}
//                     />
//                   </LocalizationProvider>
//                   {/* <TextField
//                     id="outlined-remarks-input"
//                     label="Remarks"
//                     value={remarks}
//                     onChange={(e) => setRemarks(e.target.value)}
//                     fullWidth
//                     defaultValue={
//                       responseBody !== null ? responseBody.Remarks : ""
//                     }
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   /> */}
//                 </div>
//               </Box>
//             </Grid>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           {isButtonVisible && (
//             <Button
//               variant="contained"
//               endIcon={<SendIcon />}
//               autoFocus
//               onClick={async () => {
//                 try {
//                   await dispatch(SendEWODetails(responseBody, serviceNo, remarks));
//                   toast.success("Document sent successfully!");
//                   handleClose();
//                 } catch (error) {
//                   toast.error("Failed to send document");
//                 }
//               }}
//             >
//               Send Doc
//             </Button>
//           )}
//           <Button
//             variant="contained"
//             endIcon={<CloseIcon />}
//             color="error"
//             autoFocus
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/* QR Code Details Modal */}
//       <BootstrapDialog
//         onClose={handleCloseDetailsModal}
//         aria-labelledby="qr-code-details-title"
//         open={openDetailsModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <BootstrapDialogTitle
//           id="qr-code-details-title"
//           onClose={handleCloseDetailsModal}
//         >
//           CDPLC QR
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             {/* <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       QR Code Details
//                     </Typography>

//                     {qrCode?.includes("S") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Monitor sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("K") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Keyboard sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("M") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Mouse sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("L") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <LaptopMac sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("U") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <BatteryChargingFull
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("P") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <DesktopWindows
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("O") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Memory sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("C") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <DesktopWindows
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                   </Box>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         QR Code:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrCode || "Not Available"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Device:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrCode?.includes("S")
//                           ? "Screen"
//                           : qrCode?.includes("K")
//                             ? "Keyboard"
//                             : qrCode?.includes("M")
//                               ? "Mouse"
//                               : qrCode?.includes("L")
//                                 ? "Laptop"
//                                 : qrCode?.includes("U")
//                                   ? "UPS"
//                                   : qrCode?.includes("P")
//                                     ? "Computer"
//                                     : qrCode?.includes("O")
//                                       ? "Other"
//                                       : qrCode?.includes("C")
//                                         ? "Machine"
//                                         : "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Make:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Make || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Model:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Model || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "A"
//                           ? "Active"
//                           : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "I"
//                             ? "Inactive"
//                             : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "D"
//                               ? "Disposable"
//                               : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid> */}


//             {/* QR Code Details */}
//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="bold" fontSize={18} mb={2}>
//                       QR Code Details
//                     </Typography>

//                     {/* Device Icon based on QR */}
//                     {qrCode?.includes("S") && <Monitor sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("K") && <Keyboard sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("M") && <Mouse sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("L") && <LaptopMac sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("U") && <BatteryChargingFull sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("P") && <DesktopWindows sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("O") && <Memory sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("C") && <DesktopWindows sx={{ fontSize: 50 }} />}
//                   </Box>

//                   {(() => {
//                     let deviceData = {
//                       Code: "N/A",
//                       Sno: "N/A",
//                       Make: "N/A",
//                       Device: "N/A",
//                       Model: "N/A",
//                       Status: "N/A",
//                     };

//                     if (qrCode?.includes("S")) {
//                       deviceData = {
//                         Device: "Screen",
//                         Code: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Code,
//                         Sno: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Sno,
//                         Make: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Make,
//                         Model: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Model,
//                         Status: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Status,
//                       };
//                     } else if (qrCode?.includes("K")) {
//                       deviceData = {
//                         Device: "Keyboard",
//                         Code: qrDetails?.Key_Code,
//                         Sno: qrDetails?.Key_Sno,
//                         Make: qrDetails?.Key_Make,
//                         Model: qrDetails?.Key_Model,
//                         Status: qrDetails?.Key_Status,
//                       };
//                     } else if (qrCode?.includes("M")) {
//                       deviceData = {
//                         Device: "Mouse",
//                         Code: qrDetails?.Mou_Code,
//                         Make: qrDetails?.Mou_Make,
//                         Sno: qrDetails?.Mou_Sno,
//                         Model: qrDetails?.Mou_Model,
//                         Status: qrDetails?.Mou_Status,
//                       };
//                     } else if (qrCode?.includes("L")) {
//                       deviceData = {
//                         Device: "Laptop",
//                         Code: qrDetails?.Lap_Code,
//                         Sno: qrDetails?.Lap_Sno,
//                         Make: qrDetails?.Lap_Make,
//                         Model: qrDetails?.Lap_Model,
//                         Status: qrDetails?.Lap_Status,
//                       };
//                     }

//                     //// this line has some problem ------------------------------------------------------------------///


//                     else if (qrCode?.includes("P")) {
//                       deviceData = {
//                         Device: "Computer",
//                         Code: qrDetails?.Com_Code,
//                         Sno: qrDetails?.Mac_Sno,
//                         Make: qrDetails?.Mac_Make,
//                         Model: qrDetails?.Mac_Model,
//                         Status: qrDetails?.Mac_Status,
//                       };
//                     } else if (qrCode?.includes("C")) {
//                       deviceData = {
//                         Device: "Machine",
//                         Code: qrDetails?.Mac_Code,
//                         Sno: qrDetails?.Mac_Sno,
//                         Make: qrDetails?.Mac_Make,
//                         Model: qrDetails?.Mac_Model,
//                         Status: qrDetails?.Mac_Status,
//                       };
//                     } else if (qrCode?.includes("U")) {
//                       deviceData = {
//                         Device: "UPS",
//                         Code: qrDetails?.Ups_Code,
//                         Sno: qrDetails?.Ups_Sno,
//                         Make: qrDetails?.Ups_Make,
//                         Model: qrDetails?.Ups_Model,
//                         Status: qrDetails?.Ups_Status,
//                       };
//                     }

//                     return (
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">QR Code:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Code || "N/A"}</Typography>
//                         </Grid>

//                         {/* <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Serial No:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Sno || "N/A"}</Typography>
//                         </Grid> */}

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Serial No:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               wordBreak: "break-all",
//                               whiteSpace: "normal",
//                             }}
//                           >
//                             {deviceData.Sno || "N/A"}
//                           </Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Device:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Device || "N/A"}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Make:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Make || "N/A"}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Model:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Model || "N/A"}</Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Status:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">
//                             {deviceData.Status === "A"
//                               ? "Active"
//                               : deviceData.Status === "I"
//                                 ? "Inactive"
//                                 : deviceData.Status === "D"
//                                   ? "Disposable"
//                                   : "N/A"}
//                           </Typography>
//                         </Grid>
//                       </Grid>
//                     );
//                   })()}
//                 </CardContent>
//               </Card>
//             </Grid>


//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Associated User Details
//                     </Typography>
//                     <IconButton sx={{ color: "black", fontSize: 30 }}>
//                       <Person sx={{ fontSize: 50 }} />
//                     </IconButton>
//                   </Box>

//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Service No:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Service_No || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Computer Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Email Address:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Email || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Extension:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Exte || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Location Code:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Loc || "N/A"}
//                       </Typography>
//                     </Grid>

//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Location Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_LocName || "N/A"}
//                       </Typography>
//                     </Grid>


//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Status === "A"
//                           ? "Active"
//                           : qrDetails?.Status === "I"
//                             ? "Inactive"
//                             : qrDetails?.Status === "D"
//                               ? "Disposable"
//                               : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Other Associated Devices
//                     </Typography>
//                   </Box>

//                   {[
//                     { title: "Laptop", prefix: "Lap", icon: <Laptop /> },
//                     { title: "Machine", prefix: "Mac", icon: <Memory /> },
//                     { title: "Keyboard", prefix: "Key", icon: <Keyboard /> },
//                     { title: "Mouse", prefix: "Mou", icon: <Mouse /> },
//                   ].map((device, index) => {
//                     const deviceCode =
//                       qrDetails?.[`${device.prefix}_Code`] || "N/A";
//                     if (deviceCode === "N/A") {
//                       return null;
//                     }

//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           border: "1px solid #b1a9a9",
//                           padding: 2,
//                           marginBottom: 2,
//                           borderRadius: 3,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="h6"
//                             fontWeight="bold"
//                             fontSize={16}
//                             mb={1}
//                           >
//                             {device.title}
//                           </Typography>
//                           {device.icon}
//                         </Box>
//                         <Grid container spacing={2}>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Code:
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {deviceCode}
//                             </Typography>
//                           </Grid>


//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} SerialNo:
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2" 
//                             sx={{
//                               wordBreak: "break-all",
//                               whiteSpace: "normal",
//                             }}
//                             >
//                               {qrDetails?.[`${device.prefix}_Sno`] || "N/A"}
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Make:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" >
//                               {qrDetails?.[`${device.prefix}_Make`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Model:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Model`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Status:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Status`] === "A"
//                                 ? "Active"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "I"
//                                   ? "Inactive"
//                                   : qrDetails?.[`${device.prefix}_Status`] === "D"
//                                     ? "Disposable"
//                                     : "N/A"}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     );
//                   })}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleCloseDetailsModal}>
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }









// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import QrScanner from "react-qr-scanner";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import DialogContentText from "@mui/material/DialogContentText";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { Divider } from "@mui/material";
// import {
//   Grid,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { SendEWODetails, QRScan, GetEmployeeDetails } from "../../action/QRScan";
// import QRService from "../../service/QRService";
// import { Card, CardContent, Typography } from "@mui/material";
// import {
//   LaptopMac,
//   Person,
//   Keyboard,
//   Mouse,
//   Monitor,
//   Laptop,
//   Memory,
//   BatteryChargingFull,
//   DesktopWindows,
// } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
//   const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
//   const { data, loading } = useSelector((state) => state.userbyServiceNo);
//   const { employees, employeeLoading } = useSelector((state) => state.employee || { employees: [], employeeLoading: false });
//   const [qrCode, setQRCode] = useState("");
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [qrDetails, setQRDetails] = useState(null);
//   const [receivedDate, setReceivedDate] = useState("");
//   const [issuedBy, setIssuedBy] = useState("");
//   const [issuedDate, setIssuedDate] = useState(null);
//   const dispatch = useDispatch();
//   //const [serviceNo, setServiceNo] = useState('');
//   const [remarks, setRemarks] = useState("");
//   const [serviceNo, setServiceNo] = useState(data?.[0]?.ServiceNo || '');

//   useEffect(() => {
//     const now = new Date();
//     setIssuedDate(now);
//     setReceivedDate(
//       now.toLocaleString("en-US", {
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       })
//     );
//   }, []);

//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
//       getCameraOptions();
//     }
//   }, []);

//   useEffect(() => {

//     console.log("Fetching employee details...");
//     dispatch(GetEmployeeDetails());
//   }, [dispatch]);

//   const handleClose = () => {
//     dispatch({ type: "IS_CLOSE" });
//     setOpenDetailsModal(false);
//   };


//   const handleScan = async (scanData) => {
//     if (scanData) {
//       const scannedText = scanData.text.trim();
//       setQRCode(scannedText);

//       if (/^\d+$/.test(scannedText)) {

//         const ewoNo = parseInt(scannedText);
//         dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//       } else if (/[A-Za-z]/.test(scannedText)) {

//         try {
//           const response = await QRService.GetEWODetails(scannedText);
//           if (response.data.StatusCode === 200) {
//             setQRDetails(response.data.ResultSet);
//             setOpenDetailsModal(true);
//             dispatch({ type: "IS_CLOSE" });
//           }
//         } catch (error) {
//           console.error("Error fetching QR details:", error);
//         }
//       }
//     }
//   };

//   // const handleScan = async (scanData) => {
//   //   let scannedText;
//   //   if (scanData) {
//   //     scannedText = scanData.text.trim();
//   //     setQRCode(scannedText);
//   //   } else {
//   //     scannedText = "305571";
//   //     setQRCode(scannedText);
//   //   }
//   //   if (/^\d+$/.test(scannedText)) {
//   //     // Numeric QR code - handle EWO details
//   //     const ewoNo = parseInt(scannedText);
//   //     dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//   //   } else if (/[A-Za-z]/.test(scannedText)) {
//   //     // Alphabetic QR code - handle device details
//   //     try {
//   //       const response = await QRService.GetEWODetails(scannedText);
//   //       if (response.data.StatusCode === 200) {
//   //         setQRDetails(response.data.ResultSet);
//   //         setOpenDetailsModal(true);
//   //         dispatch({ type: "IS_CLOSE" });
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching QR details:", error);
//   //     }
//   //   }
//   // };



//   const handleCloseDetailsModal = () => {
//     setOpenDetailsModal(false);
//   };

//   const handleError = (error) => {
//     console.error(error);
//   };

//   const getCameraOptions = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     const rearCamera = videoDevices.find(
//       (device) => device.label.includes("back") || device.label.includes("rear")
//     );
//   };

//   const previewStyle = {
//     width: "100%",
//     height: "auto",
//   };

//   return (
//     <div>
//       {/* QR Scanner Modal */}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpen}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           Scan Your QR Code
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <QrScanner
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             style={previewStyle}
//             constraints={{
//               audio: false,
//               video: {
//                 facingMode: "environment",
//                 autoFocus: true,
//                 torch: false,
//               },
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             autoFocus
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Scan Again
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/*----------------------------------------------------------------------- EWO Details Modal ----------------------------------------------------*/}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpenDetailScreen}
//         PaperProps={{
//           sx: {
//             borderRadius: '16px',
//             overflow: 'hidden',
//             maxWidth: '480px',
//             width: '100%',
//           }
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             backgroundColor: "primary.main",
//             px: 3,
//             py: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Box
//               sx={{
//                 bgcolor: 'rgba(255,255,255,0.2)',
//                 p: 1,
//                 borderRadius: 2,
//                 display: 'flex',
//               }}
//             >
//               {/* <DescriptionIcon sx={{ color: 'white' }} /> */}
//             </Box>
//             <Box>
//               <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
//                 EWO Details
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
//                 EWO No: {responseBody?.EwoNo || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={handleClose} sx={{ color: 'white' }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <DialogContent sx={{ p: 3 }}>
//           {/* Status Badge */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//             <Box
//               sx={{
//                 px: 2,
//                 py: 1,
//                 borderRadius: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 bgcolor: responseBody?.StatusBckcolor || '#e0e0e0',
//                 color: responseBody?.StatusTxtcolor || '#424242',
//               }}
//             >
//               <CheckCircleIcon sx={{ fontSize: 18 }} />
//               <Typography variant="body2" fontWeight={500}>
//                 {responseBody?.EwoStatus || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Financial Summary */}
//           <Box
//             sx={{
//               background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
//               borderRadius: 3,
//               p: 2,
//               mb: 3,
//               border: '1px solid #e2e8f0',
//             }}
//           >
//             <Typography
//               variant="caption"
//               sx={{
//                 color: '#64748b',
//                 fontWeight: 600,
//                 textTransform: 'uppercase',
//                 letterSpacing: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 2,
//               }}
//             >
//               {/* <AttachMoneyIcon sx={{ fontSize: 16 }} /> */}
//               Financial Summary
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Estimated Amount
//                   </Typography>
//                   <Typography variant="h6" fontWeight={700} color="text.primary">
//                     {responseBody?.EstimatedAmount || '0.00'}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Billed Amount
//                   </Typography>
//                   <Typography variant="h6" fontWeight={700} sx={{ color: '#059669' }}>
//                     {responseBody?.BilledAmount || '0.00'}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Personnel Info */}
//           <Box sx={{ mb: 3 }}>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: '#64748b',
//                 fontWeight: 600,
//                 textTransform: 'uppercase',
//                 letterSpacing: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 1,
//               }}
//             >
//               <Person sx={{ fontSize: 16 }} />
//               Personnel
//             </Typography>
//             {[
//               { label: 'Authorized By', value: responseBody?.AuthorizeBy },
//               { label: 'Approved By', value: responseBody?.ApprovedBy },
//               { label: 'Evaluated By', value: responseBody?.EvaluationBy },
//             ].map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   py: 1.5,
//                   borderBottom: index < 2 ? '1px solid # ' : 'none',
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary">
//                   {item.label}
//                 </Typography>
//                 <Typography variant="body2" fontWeight={500}>
//                   {item.value || 'N/A'}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>

//           {/* Divider */}
//           <Box sx={{ position: 'relative', my: 3 }}>
//             <Divider sx={{ borderStyle: 'dashed' }} />
//             <Typography
//               variant="caption"
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 bgcolor: 'white',
//                 px: 2,
//                 color: '#94a3b8',
//                 textTransform: 'uppercase',
//                 fontWeight: 500,
//               }}
//             >
//               Receipt Details
//             </Typography>
//           </Box>

//           {/* Receiver Info */}
//           <Box
//             sx={{
//               bgcolor: '#eff6ff',
//               borderRadius: 3,
//               p: 2,
//               mb: 3,
//               border: '1px solid #bfdbfe',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//               <Box
//                 sx={{
//                   bgcolor: '#dbeafe',
//                   p: 1,
//                   borderRadius: '50%',
//                   display: 'flex',
//                 }}
//               >
//                 <Person sx={{ color: '#2563eb', fontSize: 20 }} />
//               </Box>
//               <Box>
//                 <Typography variant="caption" sx={{ color: '#2563eb' }}>
//                   Received By
//                 </Typography>
//                 <Typography variant="body1" fontWeight={600}>
//                   {data?.[0]?.ReportName || 'N/A'}
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ bgcolor: 'white', borderRadius: 2, px: 2, py: 1.5 }}>
//               <Typography variant="caption" color="text.secondary">
//                 Service Number
//               </Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
//                 {data?.[0]?.ServiceNo || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Issued By */}
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <Autocomplete
//               options={employees || []}
//               getOptionLabel={(option) => `${option.EmpName} (${option.ServiceNo})`}
//               value={employees?.find((emp) => emp.ServiceNo === serviceNo) || null}
//               onChange={(event, newValue) => {
//                 setIssuedBy(newValue ? newValue.EmpName : '');
//                 setServiceNo(newValue ? newValue.ServiceNo : '');
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Issued By"
//                   variant="outlined"
//                   fullWidth
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 3,
//                     },
//                   }}
//                 />
//               )}
//               renderOption={(props, option) => (
//                 <li {...props}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//                     <Typography fontWeight={500}>{option.EmpName}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {option.ServiceNo}
//                     </Typography>
//                   </Box>
//                 </li>
//               )}
//               disabled={employeeLoading}
//               loading={employeeLoading}
//               noOptionsText={employeeLoading ? 'Loading...' : 'No employees found'}
//               disablePortal
//             />
//           </FormControl>

//           {/* Issued Date */}
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateTimePicker
//               label="Issued Date"
//               value={issuedDate}
//               onChange={(newValue) => setIssuedDate(newValue)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 3,
//                     },
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>
//         </DialogContent>

//         {/* Footer */}
//         <Box
//           sx={{
//             px: 3,
//             py: 2,
//             bgcolor: '#f8fafc',
//             borderTop: '1px solid #e2e8f0',
//             display: 'flex',
//             gap: 1.5,
//           }}
//         >
//           <Button
//             variant="outlined"
//             startIcon={<CloseIcon />}
//             onClick={handleClose}
//             sx={{
//               flex: 1,
//               borderRadius: 3,
//               py: 1.5,
//               textTransform: 'none',
//               fontWeight: 500,
//               borderColor: '#cbd5e1',
//               color: '#475569',
//             }}
//           >
//             Close
//           </Button>
//           {isButtonVisible && (
//             <Button
//               variant="contained"
//               startIcon={<SendIcon />}
//               onClick={async () => {
//                 try {
//                   await dispatch(SendEWODetails(responseBody, serviceNo, remarks));
//                   toast.success('Document sent successfully!');
//                   handleClose();
//                 } catch (error) {
//                   toast.error('Failed to send document');
//                 }
//               }}
//               sx={{
//                 flex: 1,
//                 borderRadius: 3,
//                 py: 1.5,
//                 textTransform: 'none',
//                 fontWeight: 500,
//                 backgroundColor: "primary.main",
//                 boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
//                 },
//               }}
//             >
//               Send Doc
//             </Button>
//           )}
//         </Box>
//       </BootstrapDialog>

//       {/* QR Code Details Modal */}
//       <BootstrapDialog
//         onClose={handleCloseDetailsModal}
//         aria-labelledby="qr-code-details-title"
//         open={openDetailsModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <BootstrapDialogTitle
//           id="qr-code-details-title"
//           onClose={handleCloseDetailsModal}
//         >
//           CDPLC QR
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             {/* <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       QR Code Details
//                     </Typography>

//                     {qrCode?.includes("S") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Monitor sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("K") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Keyboard sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("M") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Mouse sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("L") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <LaptopMac sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("U") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <BatteryChargingFull
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("P") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <DesktopWindows
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("O") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <Memory sx={{ fontSize: 50, color: "black" }} />
//                       </IconButton>
//                     )}
//                     {qrCode?.includes("C") && (
//                       <IconButton sx={{ color: "black", fontSize: 30 }}>
//                         <DesktopWindows
//                           sx={{ fontSize: 50, color: "black" }}
//                         />
//                       </IconButton>
//                     )}
//                   </Box>
//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         QR Code:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrCode || "Not Available"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Device:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrCode?.includes("S")
//                           ? "Screen"
//                           : qrCode?.includes("K")
//                             ? "Keyboard"
//                             : qrCode?.includes("M")
//                               ? "Mouse"
//                               : qrCode?.includes("L")
//                                 ? "Laptop"
//                                 : qrCode?.includes("U")
//                                   ? "UPS"
//                                   : qrCode?.includes("P")
//                                     ? "Computer"
//                                     : qrCode?.includes("O")
//                                       ? "Other"
//                                       : qrCode?.includes("C")
//                                         ? "Machine"
//                                         : "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Make:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Make || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Model:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Model || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "A"
//                           ? "Active"
//                           : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "I"
//                             ? "Inactive"
//                             : qrDetails?.ICT_ScreenModels[0]?.Mon_Status === "D"
//                               ? "Disposable"
//                               : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid> */}


//             {/* QR Code Details */}
//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="bold" fontSize={18} mb={2}>
//                       QR Code Details
//                     </Typography>

//                     {/* Device Icon based on QR */}
//                     {qrCode?.includes("S") && <Monitor sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("K") && <Keyboard sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("M") && <Mouse sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("L") && <LaptopMac sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("U") && <BatteryChargingFull sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("P") && <DesktopWindows sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("O") && <Memory sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("C") && <DesktopWindows sx={{ fontSize: 50 }} />}
//                   </Box>

//                   {(() => {
//                     let deviceData = {
//                       Code: "N/A",
//                       Sno: "N/A",
//                       Make: "N/A",
//                       Device: "N/A",
//                       Model: "N/A",
//                       Status: "N/A",
//                     };

//                     if (qrCode?.includes("S")) {
//                       deviceData = {
//                         Device: "Screen",
//                         Code: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Code,
//                         Sno: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Sno,
//                         Make: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Make,
//                         Model: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Model,
//                         Status: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Status,
//                       };
//                     } else if (qrCode?.includes("K")) {
//                       deviceData = {
//                         Device: "Keyboard",
//                         Code: qrDetails?.Key_Code,
//                         Sno: qrDetails?.Key_Sno,
//                         Make: qrDetails?.Key_Make,
//                         Model: qrDetails?.Key_Model,
//                         Status: qrDetails?.Key_Status,
//                       };
//                     } else if (qrCode?.includes("M")) {
//                       deviceData = {
//                         Device: "Mouse",
//                         Code: qrDetails?.Mou_Code,
//                         Make: qrDetails?.Mou_Make,
//                         Sno: qrDetails?.Mou_Sno,
//                         Model: qrDetails?.Mou_Model,
//                         Status: qrDetails?.Mou_Status,
//                       };
//                     } else if (qrCode?.includes("L")) {
//                       deviceData = {
//                         Device: "Laptop",
//                         Code: qrDetails?.Lap_Code,
//                         Sno: qrDetails?.Lap_Sno,
//                         Make: qrDetails?.Lap_Make,
//                         Model: qrDetails?.Lap_Model,
//                         Status: qrDetails?.Lap_Status,
//                       };
//                     }

//                     //// this line has some problem ------------------------------------------------------------------///


//                     else if (qrCode?.includes("P")) {
//                       deviceData = {
//                         Device: "Computer",
//                         Code: qrDetails?.Com_Code,
//                         Sno: qrDetails?.Mac_Sno,
//                         Make: qrDetails?.Mac_Make,
//                         Model: qrDetails?.Mac_Model,
//                         Status: qrDetails?.Mac_Status,
//                       };
//                     } else if (qrCode?.includes("C")) {
//                       deviceData = {
//                         Device: "Machine",
//                         Code: qrDetails?.Mac_Code,
//                         Sno: qrDetails?.Mac_Sno,
//                         Make: qrDetails?.Mac_Make,
//                         Model: qrDetails?.Mac_Model,
//                         Status: qrDetails?.Mac_Status,
//                       };
//                     } else if (qrCode?.includes("U")) {
//                       deviceData = {
//                         Device: "UPS",
//                         Code: qrDetails?.Ups_Code,
//                         Sno: qrDetails?.Ups_Sno,
//                         Make: qrDetails?.Ups_Make,
//                         Model: qrDetails?.Ups_Model,
//                         Status: qrDetails?.Ups_Status,
//                       };
//                     }

//                     return (
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">QR Code:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Code || "N/A"}</Typography>
//                         </Grid>

//                         {/* <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Serial No:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Sno || "N/A"}</Typography>
//                         </Grid> */}

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Serial No:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               wordBreak: "break-all",
//                               whiteSpace: "normal",
//                             }}
//                           >
//                             {deviceData.Sno || "N/A"}
//                           </Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Device:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Device || "N/A"}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Make:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Make || "N/A"}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Model:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Model || "N/A"}</Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Status:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">
//                             {deviceData.Status === "A"
//                               ? "Active"
//                               : deviceData.Status === "I"
//                                 ? "Inactive"
//                                 : deviceData.Status === "D"
//                                   ? "Disposable"
//                                   : "N/A"}
//                           </Typography>
//                         </Grid>
//                       </Grid>
//                     );
//                   })()}
//                 </CardContent>
//               </Card>
//             </Grid>


//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Associated User Details
//                     </Typography>
//                     <IconButton sx={{ color: "black", fontSize: 30 }}>
//                       <Person sx={{ fontSize: 50 }} />
//                     </IconButton>
//                   </Box>

//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Service No:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Service_No || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Computer Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Email Address:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Email || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Extension:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Exte || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Location Code:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Loc || "N/A"}
//                       </Typography>
//                     </Grid>

//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Location Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_LocName || "N/A"}
//                       </Typography>
//                     </Grid>


//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Status === "A"
//                           ? "Active"
//                           : qrDetails?.Status === "I"
//                             ? "Inactive"
//                             : qrDetails?.Status === "D"
//                               ? "Disposable"
//                               : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Other Associated Devices
//                     </Typography>
//                   </Box>

//                   {[
//                     { title: "Laptop", prefix: "Lap", icon: <Laptop /> },
//                     { title: "Machine", prefix: "Mac", icon: <Memory /> },
//                     { title: "Keyboard", prefix: "Key", icon: <Keyboard /> },
//                     { title: "Mouse", prefix: "Mou", icon: <Mouse /> },
//                   ].map((device, index) => {
//                     const deviceCode =
//                       qrDetails?.[`${device.prefix}_Code`] || "N/A";
//                     if (deviceCode === "N/A") {
//                       return null;
//                     }

//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           border: "1px solid #b1a9a9",
//                           padding: 2,
//                           marginBottom: 2,
//                           borderRadius: 3,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="h6"
//                             fontWeight="bold"
//                             fontSize={16}
//                             mb={1}
//                           >
//                             {device.title}
//                           </Typography>
//                           {device.icon}
//                         </Box>
//                         <Grid container spacing={2}>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Code:
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {deviceCode}
//                             </Typography>
//                           </Grid>


//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} SerialNo:
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2"
//                               sx={{
//                                 wordBreak: "break-all",
//                                 whiteSpace: "normal",
//                               }}
//                             >
//                               {qrDetails?.[`${device.prefix}_Sno`] || "N/A"}
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Make:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" >
//                               {qrDetails?.[`${device.prefix}_Make`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Model:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Model`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Status:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Status`] === "A"
//                                 ? "Active"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "I"
//                                   ? "Inactive"
//                                   : qrDetails?.[`${device.prefix}_Status`] === "D"
//                                     ? "Disposable"
//                                     : "N/A"}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     );
//                   })}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleCloseDetailsModal}>
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }













//----------------------------------------------2026-01-26--------------------------------------------

// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import QrScanner from "react-qr-scanner";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import DialogContentText from "@mui/material/DialogContentText";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import DescriptionIcon from "@mui/icons-material/Description";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { Divider } from "@mui/material";
// import {
//   Grid,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Autocomplete,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import { SendEWODetails, QRScan, GetEmployeeDetails } from "../../action/QRScan";
// import QRService from "../../service/QRService";
// import { Card, CardContent, Typography } from "@mui/material";
// import {
//   LaptopMac,
//   Person,
//   Keyboard,
//   Mouse,
//   Monitor,
//   Laptop,
//   Memory,
//   BatteryChargingFull,
//   DesktopWindows,
//   Hotel,
//   MeetingRoom,
//   CalendarToday,
//   ArrowForward,
//   ArrowBack,
//   AccessTime,
//   EventAvailable,
//   EventBusy,
// } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// export interface DialogTitleProps {
//   id: string;
//   children?: React.ReactNode;
//   onClose: () => void;
// }

// function BootstrapDialogTitle(props: DialogTitleProps) {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// }

// export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
//   const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
//   const { data, loading } = useSelector((state) => state.userbyServiceNo);
//   const { employees, employeeLoading } = useSelector((state) => state.employee || { employees: [], employeeLoading: false });
//   const [qrCode, setQRCode] = useState("");
//   const [openDetailsModal, setOpenDetailsModal] = useState(false);
//   const [qrDetails, setQRDetails] = useState(null);
//   const [receivedDate, setReceivedDate] = useState("");
//   const [issuedBy, setIssuedBy] = useState("");
//   const [issuedDate, setIssuedDate] = useState(null);
//   const [reservationData, setReservationData] = useState([]);  
//   const [selectedReservation, setSelectedReservation] = useState(null);
//   const [openReservationModal, setOpenReservationModal] = useState(false);
//   const [reservationAction, setReservationAction] = useState(""); 
//   const [reservationRemarks, setReservationRemarks] = useState("");
//   const dispatch = useDispatch();
//   const [serviceNo, setServiceNo] = useState(data?.[0]?.ServiceNo || '');
//   const [remarks, setRemarks] = useState("");
//   const [openReservationListModal, setOpenReservationListModal] = useState(false);
//   const [filteredReservations, setFilteredReservations] = useState([]);

//   useEffect(() => {
//     const now = new Date();
//     setIssuedDate(now);
//     setReceivedDate(
//       now.toLocaleString("en-US", {
//         year: "numeric",
//         month: "numeric",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//       })
//     );
//   }, []);

//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
//       getCameraOptions();
//     }
//   }, []);

//   useEffect(() => {
//     console.log("Fetching employee details...");
//     dispatch(GetEmployeeDetails());
//   }, [dispatch]);

//   const handleClose = () => {
//     dispatch({ type: "IS_CLOSE" });
//     setOpenDetailsModal(false);
//     setOpenReservationModal(false);
//     setOpenReservationListModal(false);
//   };

//   const loadReservationData = async (serviceNumber) => {
//     try {
//       const response = await QRService.LoadResDetailsByServiceNo(serviceNumber);
//       if (response.data.StatusCode === 200) {
//         const allReservations = response.data.ResultSet || [];
//         setReservationData(allReservations);
//         console.log("Loaded all reservations:", allReservations);
//         return allReservations;
//       }
//     } catch (error) {
//       console.error("Error fetching reservation data:", error);
//       toast.error("Failed to load reservation data");
//       return [];
//     }
//   };


//   const formatDateForComparison = (dateString) => {
//     if (!dateString) return null;
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         if (dateString.includes('/')) {
//           const parts = dateString.split('/');
//           if (parts.length === 3) {
//             const month = parseInt(parts[0], 10);
//             const day = parseInt(parts[1], 10);
//             const year = parseInt(parts[2], 10);

//             if (month > 12) {
//               return `${parts[1]}/${parts[0]}/${parts[2]}`;
//             }
//           }
//         } else if (dateString.includes('-')) {
//           const parts = dateString.split('-');
//           if (parts.length === 3) {
//             return `${parts[1]}/${parts[2]}/${parts[0]}`;
//           }
//         }
//         return null;
//       }
//       return date.toLocaleDateString("en-US", {
//         month: "numeric",
//         day: "numeric",
//         year: "numeric"
//       });
//     } catch (error) {
//       console.error("Error formatting date:", dateString, error);
//       return null;
//     }
//   };

//   const findMatchingReservation = (reservations, qrPrefix, currentDateString) => {
//     console.log("Looking for matching reservations...");
//     console.log("QR Prefix:", qrPrefix);
//     console.log("Today's date:", currentDateString);
//     console.log("Total reservations:", reservations.length);

//     const matchingReservations = [];

//     reservations.forEach((reservation, index) => {
//       const resCheckInDate = formatDateForComparison(reservation.Res_Check_In);
//       const resCheckOutDate = formatDateForComparison(reservation.Res_Check_Out);
//       const currentStatus = reservation.Res_CheckStatus;

//       console.log(`\nReservation ${index + 1}:`);
//       console.log("Reservation No:", reservation.Res_no);
//       console.log("Check-in Date (formatted):", resCheckInDate);
//       console.log("Check-out Date (formatted):", resCheckOutDate);
//       console.log("Current Status:", currentStatus);

//       let isMatch = false;
//       let action = "";

//       if (qrPrefix === "I") {
//         if (resCheckInDate === currentDateString && 
//             (!currentStatus || currentStatus === null || currentStatus === "")) {
//           isMatch = true;
//           action = "checkin";
//           console.log("✓ Match for Check In");
//         }
//       } else if (qrPrefix === "O") {
//         if (resCheckOutDate === currentDateString && 
//             currentStatus === "Check In") {
//           isMatch = true;
//           action = "checkout";
//           console.log("✓ Match for Check Out");
//         }
//       } else if (qrPrefix === "B") {
//         if (resCheckInDate === currentDateString && 
//             (!currentStatus || currentStatus === null || currentStatus === "")) {
//           isMatch = true;
//           action = "checkin";
//           console.log("✓ Match for Both (Check In)");
//         } else if (resCheckOutDate === currentDateString && 
//                   currentStatus === "Check In") {
//           isMatch = true;
//           action = "checkout";
//           console.log("✓ Match for Both (Check Out)");
//         }
//       }

//       if (isMatch) {
//         matchingReservations.push({
//           ...reservation,
//           action: action,
//           originalIndex: index
//         });
//       }
//     });

//     console.log("\nTotal matching reservations found:", matchingReservations.length);
//     return matchingReservations;
//   };



//   const handleScan = async (scanData) => {
//     if (scanData) {
//       const scannedText = scanData.text.trim();
//       setQRCode(scannedText);

//       if (/^[IOB]/.test(scannedText)) {
//         const qrPrefix = scannedText.charAt(0);
//         const serviceNumber = scannedText.substring(1);

//         const allReservations = await loadReservationData(serviceNumber);

//         if (allReservations && allReservations.length > 0) {
//           const currentDateString = new Date().toLocaleDateString("en-US", {
//             month: "numeric",
//             day: "numeric",
//             year: "numeric"
//           });

//           const matchingReservations = findMatchingReservation(allReservations, qrPrefix, currentDateString);

//           if (matchingReservations.length === 1) {
//             // Only one match - open modal directly
//             const matchingRes = matchingReservations[0];
//             setReservationAction(matchingRes.action);
//             setSelectedReservation(matchingRes);
//             setOpenReservationModal(true);
//           } else if (matchingReservations.length > 1) {
//             // Multiple matches - show list to select
//             setFilteredReservations(matchingReservations);
//             setOpenReservationListModal(true);
//           } else {
//             // No matches found
//             if (qrPrefix === "I") {
//               toast.error("No pending check-in reservations for today");
//             } else if (qrPrefix === "O") {
//               toast.error("No check-in reservations ready for check-out today");
//             } else if (qrPrefix === "B") {
//               toast.error("No valid reservations for check-in/check-out today");
//             }
//           }
//         } else {
//           toast.error("No reservations found for this service number");
//         }

//         return;
//       }

//       // Existing QR handling logic for non-reservation QR codes
//       if (/^\d+$/.test(scannedText)) {
//         const ewoNo = parseInt(scannedText);
//         dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
//       } else if (/[A-Za-z]/.test(scannedText)) {
//         try {
//           const response = await QRService.GetEWODetails(scannedText);
//           if (response.data.StatusCode === 200) {
//             setQRDetails(response.data.ResultSet);
//             setOpenDetailsModal(true);
//             dispatch({ type: "IS_CLOSE" });
//           }
//         } catch (error) {
//           console.error("Error fetching QR details:", error);
//         }
//       }
//     }
//   };

//   const handleSelectReservation = (reservation) => {
//     setSelectedReservation(reservation);
//     setReservationAction(reservation.action);
//     setOpenReservationListModal(false);
//     setOpenReservationModal(true);
//   };

//   const handleCloseDetailsModal = () => {
//     setOpenDetailsModal(false);
//   };

//   const handleCloseReservationModal = () => {
//     setOpenReservationModal(false);
//     setSelectedReservation(null);
//     setReservationRemarks("");
//   };

//   const handleCloseReservationListModal = () => {
//     setOpenReservationListModal(false);
//     setFilteredReservations([]);
//   };

//   const handleError = (error) => {
//     console.error(error);
//   };

//   const getCameraOptions = async () => {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const videoDevices = devices.filter(
//       (device) => device.kind === "videoinput"
//     );
//     const rearCamera = videoDevices.find(
//       (device) => device.label.includes("back") || device.label.includes("rear")
//     );
//   };

//   const previewStyle = {
//     width: "100%",
//     height: "auto",
//   };

//   return (
//     <div>
//       {/* QR Scanner Modal */}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpen}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           Scan Your QR Code
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <QrScanner
//             delay={1000}
//             onError={handleError}
//             onScan={handleScan}
//             style={previewStyle}
//             constraints={{
//               audio: false,
//               video: {
//                 facingMode: "environment",
//                 autoFocus: true,
//                 torch: false,
//               },
//             }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             autoFocus
//             onClick={() => {
//               handleClose();
//             }}
//           >
//             Scan Again
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/*----------------------------------------------------------------------- EWO Details Modal ----------------------------------------------------*/}
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={isOpenDetailScreen}
//         PaperProps={{
//           sx: {
//             borderRadius: '16px',
//             overflow: 'hidden',
//             maxWidth: '480px',
//             width: '100%',
//           }
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             backgroundColor: "primary.main",
//             px: 3,
//             py: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Box
//               sx={{
//                 bgcolor: 'rgba(255,255,255,0.2)',
//                 p: 1,
//                 borderRadius: 2,
//                 display: 'flex',
//               }}
//             >
//               {/* <DescriptionIcon sx={{ color: 'white' }} /> */}
//             </Box>
//             <Box>
//               <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
//                 EWO Details
//               </Typography>
//               <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
//                 EWO No: {responseBody?.EwoNo || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <IconButton onClick={handleClose} sx={{ color: 'white' }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <DialogContent sx={{ p: 3 }}>
//           {/* Status Badge */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
//             <Box
//               sx={{
//                 px: 2,
//                 py: 1,
//                 borderRadius: '20px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 bgcolor: responseBody?.StatusBckcolor || '#e0e0e0',
//                 color: responseBody?.StatusTxtcolor || '#424242',
//               }}
//             >
//               <CheckCircleIcon sx={{ fontSize: 18 }} />
//               <Typography variant="body2" fontWeight={500}>
//                 {responseBody?.EwoStatus || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Financial Summary */}
//           <Box
//             sx={{
//               background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
//               borderRadius: 3,
//               p: 2,
//               mb: 3,
//               border: '1px solid #e2e8f0',
//             }}
//           >
//             <Typography
//               variant="caption"
//               sx={{
//                 color: '#64748b',
//                 fontWeight: 600,
//                 textTransform: 'uppercase',
//                 letterSpacing: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 2,
//               }}
//             >
//               {/* <AttachMoneyIcon sx={{ fontSize: 16 }} /> */}
//               Financial Summary
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Estimated Amount
//                   </Typography>
//                   <Typography variant="h6" fontWeight={700} color="text.primary">
//                     {responseBody?.EstimatedAmount || '0.00'}
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={6}>
//                 <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
//                   <Typography variant="caption" color="text.secondary">
//                     Billed Amount
//                   </Typography>
//                   <Typography variant="h6" fontWeight={700} sx={{ color: '#059669' }}>
//                     {responseBody?.BilledAmount || '0.00'}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Personnel Info */}
//           <Box sx={{ mb: 3 }}>
//             <Typography
//               variant="caption"
//               sx={{
//                 color: '#64748b',
//                 fontWeight: 600,
//                 textTransform: 'uppercase',
//                 letterSpacing: 1,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 1,
//               }}
//             >
//               <Person sx={{ fontSize: 16 }} />
//               Personnel
//             </Typography>
//             {[
//               { label: 'Authorized By', value: responseBody?.AuthorizeBy },
//               { label: 'Approved By', value: responseBody?.ApprovedBy },
//               { label: 'Evaluated By', value: responseBody?.EvaluationBy },
//             ].map((item, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   py: 1.5,
//                   borderBottom: index < 2 ? '1px solid # ' : 'none',
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary">
//                   {item.label}
//                 </Typography>
//                 <Typography variant="body2" fontWeight={500}>
//                   {item.value || 'N/A'}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>

//           {/* Divider */}
//           <Box sx={{ position: 'relative', my: 3 }}>
//             <Divider sx={{ borderStyle: 'dashed' }} />
//             <Typography
//               variant="caption"
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 bgcolor: 'white',
//                 px: 2,
//                 color: '#94a3b8',
//                 textTransform: 'uppercase',
//                 fontWeight: 500,
//               }}
//             >
//               Receipt Details
//             </Typography>
//           </Box>

//           {/* Receiver Info */}
//           <Box
//             sx={{
//               bgcolor: '#eff6ff',
//               borderRadius: 3,
//               p: 2,
//               mb: 3,
//               border: '1px solid #bfdbfe',
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//               <Box
//                 sx={{
//                   bgcolor: '#dbeafe',
//                   p: 1,
//                   borderRadius: '50%',
//                   display: 'flex',
//                 }}
//               >
//                 <Person sx={{ color: '#2563eb', fontSize: 20 }} />
//               </Box>
//               <Box>
//                 <Typography variant="caption" sx={{ color: '#2563eb' }}>
//                   Received By
//                 </Typography>
//                 <Typography variant="body1" fontWeight={600}>
//                   {data?.[0]?.ReportName || 'N/A'}
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ bgcolor: 'white', borderRadius: 2, px: 2, py: 1.5 }}>
//               <Typography variant="caption" color="text.secondary">
//                 Service Number
//               </Typography>
//               <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
//                 {data?.[0]?.ServiceNo || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>

//           {/* Issued By */}
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <Autocomplete
//               options={employees || []}
//               getOptionLabel={(option) => `${option.EmpName} (${option.ServiceNo})`}
//               value={employees?.find((emp) => emp.ServiceNo === serviceNo) || null}
//               onChange={(event, newValue) => {
//                 setIssuedBy(newValue ? newValue.EmpName : '');
//                 setServiceNo(newValue ? newValue.ServiceNo : '');
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   label="Issued By"
//                   variant="outlined"
//                   fullWidth
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 3,
//                     },
//                   }}
//                 />
//               )}
//               renderOption={(props, option) => (
//                 <li {...props}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
//                     <Typography fontWeight={500}>{option.EmpName}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {option.ServiceNo}
//                     </Typography>
//                   </Box>
//                 </li>
//               )}
//               disabled={employeeLoading}
//               loading={employeeLoading}
//               noOptionsText={employeeLoading ? 'Loading...' : 'No employees found'}
//               disablePortal
//             />
//           </FormControl>

//           {/* Issued Date */}
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DateTimePicker
//               label="Issued Date"
//               value={issuedDate}
//               onChange={(newValue) => setIssuedDate(newValue)}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 3,
//                     },
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>
//         </DialogContent>

//         {/* Footer */}
//         <Box
//           sx={{
//             px: 3,
//             py: 2,
//             bgcolor: '#f8fafc',
//             borderTop: '1px solid #e2e8f0',
//             display: 'flex',
//             gap: 1.5,
//           }}
//         >
//           <Button
//             variant="outlined"
//             startIcon={<CloseIcon />}
//             onClick={handleClose}
//             sx={{
//               flex: 1,
//               borderRadius: 3,
//               py: 1.5,
//               textTransform: 'none',
//               fontWeight: 500,
//               borderColor: '#cbd5e1',
//               color: '#475569',
//             }}
//           >
//             Close
//           </Button>
//           {isButtonVisible && (
//             <Button
//               variant="contained"
//               startIcon={<SendIcon />}
//               onClick={async () => {
//                 try {
//                   await dispatch(SendEWODetails(responseBody, serviceNo, remarks));
//                   toast.success('Document sent successfully!');
//                   handleClose();
//                 } catch (error) {
//                   toast.error('Failed to send document');
//                 }
//               }}
//               sx={{
//                 flex: 1,
//                 borderRadius: 3,
//                 py: 1.5,
//                 textTransform: 'none',
//                 fontWeight: 500,
//                 backgroundColor: "primary.main",
//                 boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
//                 },
//               }}
//             >
//               Send Doc
//             </Button>
//           )}
//         </Box>
//       </BootstrapDialog>

//       {/* Reservation List Modal (When multiple matches found) */}
//       <BootstrapDialog
//         onClose={handleCloseReservationListModal}
//         aria-labelledby="reservation-list-modal-title"
//         open={openReservationListModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <BootstrapDialogTitle
//           id="reservation-list-modal-title"
//           onClose={handleCloseReservationListModal}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Hotel sx={{ color: '#2196f3' }} />
//             <Typography variant="h6">
//               Select Reservation
//             </Typography>
//           </Box>
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//             Multiple reservations found for today. Please select one:
//           </Typography>

//           <Grid container spacing={2}>
//             {filteredReservations.map((reservation, index) => (
//               <Grid item xs={12} key={index}>
//                 <Card
//                   sx={{
//                     cursor: 'pointer',
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                       transform: 'translateY(-2px)',
//                       boxShadow: 3,
//                       borderColor: reservation.action === 'checkin' ? '#4caf50' : '#f44336'
//                     },
//                     border: '2px solid',
//                     borderColor: reservation.action === 'checkin' ? '#c8e6c9' : '#ffcdd2',
//                   }}
//                   onClick={() => handleSelectReservation(reservation)}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                       <Box>
//                         <Typography variant="h6" fontWeight={700}>
//                           Reservation #{reservation.Res_no}
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Service No: {reservation.Res_Service_no}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ 
//                         bgcolor: reservation.action === 'checkin' ? '#4caf50' : '#f44336',
//                         color: 'white',
//                         px: 2,
//                         py: 1,
//                         borderRadius: '20px',
//                         fontWeight: 600,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 1
//                       }}>
//                         {reservation.action === 'checkin' ? (
//                           <>
//                             <ArrowForward sx={{ fontSize: 16 }} />
//                             Check In
//                           </>
//                         ) : (
//                           <>
//                             <ArrowBack sx={{ fontSize: 16 }} />
//                             Check Out
//                           </>
//                         )}
//                       </Box>
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     <Grid container spacing={2}>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <EventAvailable sx={{ color: '#4caf50', fontSize: 18 }} />
//                           <Box>
//                             <Typography variant="caption" color="text.secondary">
//                               Check-in Date
//                             </Typography>
//                             <Typography variant="body2" fontWeight={500}>
//                               {reservation.Res_Check_In || 'N/A'}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <EventBusy sx={{ color: '#f44336', fontSize: 18 }} />
//                           <Box>
//                             <Typography variant="caption" color="text.secondary">
//                               Check-out Date
//                             </Typography>
//                             <Typography variant="body2" fontWeight={500}>
//                               {reservation.Res_Check_Out || 'N/A'}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="caption" color="text.secondary">
//                           Bungalow ID
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500}>
//                           {reservation.Res_Bang_Id || 'N/A'}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="caption" color="text.secondary">
//                           Status
//                         </Typography>
//                         <Typography variant="body2" fontWeight={500} sx={{ 
//                           color: reservation.Res_CheckStatus === 'Check In' ? '#4caf50' :
//                                  reservation.Res_CheckStatus === 'Check Out' ? '#f44336' : '#ff9800'
//                         }}>
//                           {reservation.Res_CheckStatus || 'Pending'}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="outlined"
//             onClick={handleCloseReservationListModal}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/* Reservation Check-in/Check-out Modal */}
//       <BootstrapDialog
//         onClose={handleCloseReservationModal}
//         aria-labelledby="reservation-modal-title"
//         open={openReservationModal}
//         maxWidth="sm"
//         fullWidth
//       >
//         <BootstrapDialogTitle
//           id="reservation-modal-title"
//           onClose={handleCloseReservationModal}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {reservationAction === "checkin" ? (
//               <ArrowForward sx={{ color: '#4caf50' }} />
//             ) : (
//               <ArrowBack sx={{ color: '#f44336' }} />
//             )}
//             <Typography variant="h6">
//               {reservationAction === "checkin" ? "Check In" : "Check Out"} - Reservation
//             </Typography>
//           </Box>
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           {selectedReservation && (
//             <Grid container spacing={2}>
//               {/* Reservation Summary Card */}
//               <Grid item xs={12}>
//                 <Card
//                   sx={{
//                     background: reservationAction === "checkin" 
//                       ? 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
//                       : 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
//                     borderRadius: 3,
//                     border: reservationAction === "checkin" 
//                       ? '1px solid #a5d6a7' 
//                       : '1px solid #ef9a9a',
//                   }}
//                 >
//                   <CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Hotel sx={{ 
//                           fontSize: 40, 
//                           color: reservationAction === "checkin" ? '#388e3c' : '#d32f2f' 
//                         }} />
//                         <Box>
//                           <Typography variant="h6" fontWeight={700}>
//                             Reservation #{selectedReservation.Res_no}
//                           </Typography>

//                         </Box>
//                       </Box>
//                       <Box sx={{ 
//                         bgcolor: reservationAction === "checkin" ? '#4caf50' : '#f44336',
//                         color: 'white',
//                         px: 2,
//                         py: 1,
//                         borderRadius: '20px',
//                         fontWeight: 600
//                       }}>
//                         {reservationAction === "checkin" ? "CHECK IN" : "CHECK OUT"}
//                       </Box>
//                     </Box>

//                     <Divider sx={{ my: 2 }} />

//                     {/* Reservation Details */}
//                     <Grid container spacing={2}>  
//                           <Grid item xs={6}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                           Service No :
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {selectedReservation.Res_Service_no || 'N/A'}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                           Bungalow :
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {selectedReservation.Res_Bang_Id === "1"
//                             ? "Main Bungalow"
//                             : selectedReservation.Res_Bang_Id === "2"
//                               ? "Lower Garden Suite"
//                               : "N/A"}
//                         </Typography>
//                       </Grid>

//                       <Grid item xs={6}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                           Check-in Date:
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {selectedReservation.Res_Check_In
//                             ? new Date(selectedReservation.Res_Check_In).toLocaleDateString()
//                             : "Not checked out yet"}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                           Check-out Date:
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {selectedReservation.Res_Check_Out
//                             ? new Date(selectedReservation.Res_Check_Out).toLocaleDateString()
//                             : "Not checked out yet"}
//                         </Typography>
//                       </Grid>

//                       <Grid item xs={6}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                           Adults:
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {selectedReservation.Res_AdultCount || '0'}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={6}>
//                         <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                           Children:
//                         </Typography>
//                         <Typography variant="body1" fontWeight={600}>
//                           {selectedReservation.Res_ChildCount || '0'}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Grid>

//               {/* Current Date Display */}
//               <Grid item xs={12}>
//                 <Box sx={{ 
//                   bgcolor: '#e3f2fd', 
//                   p: 2, 
//                   borderRadius: 2,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between'
//                 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <CalendarToday sx={{ color: '#1976d2' }} />
//                     <Typography variant="body1" fontWeight={600}>
//                       {reservationAction === "checkin" ? "Check-in Date:" : "Check-out Date:"}
//                     </Typography>
//                   </Box>
//                   <Typography variant="h6" fontWeight={700} color="primary">
//                     {new Date().toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                     })}
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="outlined"
//             onClick={handleCloseReservationModal}
//             sx={{ mr: 1 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: reservationAction === "checkin" ? '#4caf50' : '#f44336',
//               '&:hover': {
//                 bgcolor: reservationAction === "checkin" ? '#388e3c' : '#d32f2f',
//               }
//             }}
//           >
//             {reservationAction === "checkin" ? "Confirm Check In" : "Confirm Check Out"}
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>

//       {/* QR Code Details Modal */}
//       <BootstrapDialog
//         onClose={handleCloseDetailsModal}
//         aria-labelledby="qr-code-details-title"
//         open={openDetailsModal}
//         maxWidth="md"
//         fullWidth
//       >
//         <BootstrapDialogTitle
//           id="qr-code-details-title"
//           onClose={handleCloseDetailsModal}
//         >
//           CDPLC QR
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <Grid container spacing={2}>
//             {/* QR Code Details */}
//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography variant="h6" fontWeight="bold" fontSize={18} mb={2}>
//                       QR Code Details
//                     </Typography>

//                     {/* Device Icon based on QR */}
//                     {qrCode?.includes("S") && <Monitor sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("K") && <Keyboard sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("M") && <Mouse sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("L") && <LaptopMac sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("U") && <BatteryChargingFull sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("P") && <DesktopWindows sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("O") && <Memory sx={{ fontSize: 50 }} />}
//                     {qrCode?.includes("C") && <DesktopWindows sx={{ fontSize: 50 }} />}
//                   </Box>

//                   {(() => {
//                     let deviceData = {
//                       Code: "N/A",
//                       Sno: "N/A",
//                       Make: "N/A",
//                       Device: "N/A",
//                       Model: "N/A",
//                       Status: "N/A",
//                     };

//                     if (qrCode?.includes("S")) {
//                       deviceData = {
//                         Device: "Screen",
//                         Code: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Code,
//                         Sno: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Sno,
//                         Make: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Make,
//                         Model: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Model,
//                         Status: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Status,
//                       };
//                     } else if (qrCode?.includes("K")) {
//                       deviceData = {
//                         Device: "Keyboard",
//                         Code: qrDetails?.Key_Code,
//                         Sno: qrDetails?.Key_Sno,
//                         Make: qrDetails?.Key_Make,
//                         Model: qrDetails?.Key_Model,
//                         Status: qrDetails?.Key_Status,
//                       };
//                     } else if (qrCode?.includes("M")) {
//                       deviceData = {
//                         Device: "Mouse",
//                         Code: qrDetails?.Mou_Code,
//                         Make: qrDetails?.Mou_Make,
//                         Sno: qrDetails?.Mou_Sno,
//                         Model: qrDetails?.Mou_Model,
//                         Status: qrDetails?.Mou_Status,
//                       };
//                     } else if (qrCode?.includes("L")) {
//                       deviceData = {
//                         Device: "Laptop",
//                         Code: qrDetails?.Lap_Code,
//                         Sno: qrDetails?.Lap_Sno,
//                         Make: qrDetails?.Lap_Make,
//                         Model: qrDetails?.Lap_Model,
//                         Status: qrDetails?.Lap_Status,
//                       };
//                     } else if (qrCode?.includes("P")) {
//                       deviceData = {
//                         Device: "Computer",
//                         Code: qrDetails?.Com_Code,
//                         Sno: qrDetails?.Mac_Sno,
//                         Make: qrDetails?.Mac_Make,
//                         Model: qrDetails?.Mac_Model,
//                         Status: qrDetails?.Mac_Status,
//                       };
//                     } else if (qrCode?.includes("C")) {
//                       deviceData = {
//                         Device: "Machine",
//                         Code: qrDetails?.Mac_Code,
//                         Sno: qrDetails?.Mac_Sno,
//                         Make: qrDetails?.Mac_Make,
//                         Model: qrDetails?.Mac_Model,
//                         Status: qrDetails?.Mac_Status,
//                       };
//                     } else if (qrCode?.includes("U")) {
//                       deviceData = {
//                         Device: "UPS",
//                         Code: qrDetails?.Ups_Code,
//                         Sno: qrDetails?.Ups_Sno,
//                         Make: qrDetails?.Ups_Make,
//                         Model: qrDetails?.Ups_Model,
//                         Status: qrDetails?.Ups_Status,
//                       };
//                     }

//                     return (
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">QR Code:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Code || "N/A"}</Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Serial No:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography
//                             variant="body2"
//                             sx={{
//                               wordBreak: "break-all",
//                               whiteSpace: "normal",
//                             }}
//                           >
//                             {deviceData.Sno || "N/A"}
//                           </Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Device:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Device || "N/A"}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Make:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Make || "N/A"}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Model:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">{deviceData.Model || "N/A"}</Typography>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <Typography variant="body2" fontWeight="bold">Status:</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="body2">
//                             {deviceData.Status === "A"
//                               ? "Active"
//                               : deviceData.Status === "I"
//                                 ? "Inactive"
//                                 : deviceData.Status === "D"
//                                   ? "Disposable"
//                                   : "N/A"}
//                           </Typography>
//                         </Grid>
//                       </Grid>
//                     );
//                   })()}
//                 </CardContent>
//               </Card>
//             </Grid>


//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Associated User Details
//                     </Typography>
//                     <IconButton sx={{ color: "black", fontSize: 30 }}>
//                       <Person sx={{ fontSize: 50 }} />
//                     </IconButton>
//                   </Box>

//                   <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Service No:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Service_No || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Computer Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Name || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Email Address:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Email || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Extension:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Emp_Exte || "N/A"}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Location Code:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_Loc || "N/A"}
//                       </Typography>
//                     </Grid>

//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Location Name:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Com_LocName || "N/A"}
//                       </Typography>
//                     </Grid>


//                     <Grid item xs={6}>
//                       <Typography variant="body2" fontWeight="bold">
//                         Status:
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2">
//                         {qrDetails?.Status === "A"
//                           ? "Active"
//                           : qrDetails?.Status === "I"
//                             ? "Inactive"
//                             : qrDetails?.Status === "D"
//                               ? "Disposable"
//                               : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card
//                 sx={{
//                   border: "1px solid #b1a9a9",
//                   borderRadius: 5,
//                   padding: 2,
//                   marginBottom: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       fontWeight="bold"
//                       fontSize={18}
//                       mb={2}
//                     >
//                       Other Associated Devices
//                     </Typography>
//                   </Box>

//                   {[
//                     { title: "Laptop", prefix: "Lap", icon: <Laptop /> },
//                     { title: "Machine", prefix: "Mac", icon: <Memory /> },
//                     { title: "Keyboard", prefix: "Key", icon: <Keyboard /> },
//                     { title: "Mouse", prefix: "Mou", icon: <Mouse /> },
//                   ].map((device, index) => {
//                     const deviceCode =
//                       qrDetails?.[`${device.prefix}_Code`] || "N/A";
//                     if (deviceCode === "N/A") {
//                       return null;
//                     }

//                     return (
//                       <Box
//                         key={index}
//                         sx={{
//                           border: "1px solid #b1a9a9",
//                           padding: 2,
//                           marginBottom: 2,
//                           borderRadius: 3,
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="h6"
//                             fontWeight="bold"
//                             fontSize={16}
//                             mb={1}
//                           >
//                             {device.title}
//                           </Typography>
//                           {device.icon}
//                         </Box>
//                         <Grid container spacing={2}>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Code:
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {deviceCode}
//                             </Typography>
//                           </Grid>


//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} SerialNo:
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2"
//                               sx={{
//                                 wordBreak: "break-all",
//                                 whiteSpace: "normal",
//                               }}
//                             >
//                               {qrDetails?.[`${device.prefix}_Sno`] || "N/A"}
//                             </Typography>
//                           </Grid>

//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Make:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" >
//                               {qrDetails?.[`${device.prefix}_Make`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Model:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Model`] || "N/A"}
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2" fontWeight="bold">
//                               {device.title} Status:
//                             </Typography>
//                           </Grid>
//                           <Grid item xs={6}>
//                             <Typography variant="body2">
//                               {qrDetails?.[`${device.prefix}_Status`] === "A"
//                                 ? "Active"
//                                 : qrDetails?.[`${device.prefix}_Status`] === "I"
//                                   ? "Inactive"
//                                   : qrDetails?.[`${device.prefix}_Status`] === "D"
//                                     ? "Disposable"
//                                     : "N/A"}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     );
//                   })}
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleCloseDetailsModal}>
//             Close
//           </Button>
//         </DialogActions>
//       </BootstrapDialog>
//     </div>
//   );
// }













import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QrScanner from "react-qr-scanner";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Divider } from "@mui/material";
import {
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SendEWODetails, QRScan, GetEmployeeDetails } from "../../action/QRScan";
import QRService from "../../service/QRService";
import { Card, CardContent, Typography } from "@mui/material";
import {
  LaptopMac,
  Person,
  Keyboard,
  Mouse,
  Monitor,
  Laptop,
  Memory,
  BatteryChargingFull,
  DesktopWindows,
  Hotel,
  MeetingRoom,
  CalendarToday,
  ArrowForward,
  ArrowBack,
  AccessTime,
  EventAvailable,
  EventBusy,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs({ isOpen, isOpenDetailScreen }) {
  const { responseBody, isButtonVisible } = useSelector((state) => state.qr);
  const { data, loading } = useSelector((state) => state.userbyServiceNo);
  const { employees, employeeLoading } = useSelector((state) => state.employee || { employees: [], employeeLoading: false });
  const [qrCode, setQRCode] = useState("");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [qrDetails, setQRDetails] = useState(null);
  const [receivedDate, setReceivedDate] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issuedDate, setIssuedDate] = useState(null);
  const [reservationData, setReservationData] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [openReservationModal, setOpenReservationModal] = useState(false);
  const [reservationAction, setReservationAction] = useState("");
  const [reservationRemarks, setReservationRemarks] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const [serviceNo, setServiceNo] = useState(data?.[0]?.ServiceNo || '');
  const [remarks, setRemarks] = useState("");
  const [openReservationListModal, setOpenReservationListModal] = useState(false);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [isScanning, setIsScanning] = useState(true);
  const [hasShownNoReservationMsg, setHasShownNoReservationMsg] = useState(false);


  useEffect(() => {
    const now = new Date();
    setIssuedDate(now);
    setReceivedDate(
      now.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      getCameraOptions();
    }
  }, []);

  useEffect(() => {
    console.log("Fetching employee details...");
    dispatch(GetEmployeeDetails());
  }, [dispatch]);


  const markCheckStatus = async (reservationNo, checkStatus) => {
    try {
      const response = await axios({
        method: "get",
        url: `/Reservation/MarkCheckStatus?P_RESERVATION_NO=${reservationNo}&P_CHECK_STATUS=${checkStatus}`,
      });
      return response.data;
    } catch (error) {
      console.error("Error in markCheckStatus:", error);
      throw error;
    }
  };

  const addCaretFeedback = async (reservationNo, caretReport, caretStatus) => {
    try {
      const response = await axios({
        method: "get",
        url: `/Reservation/AddCaretFeedback?P_RESERVATION_NO=${reservationNo}&P_CARET_STATUS=${caretStatus}`,
      });
      return response.data;
    } catch (error) {
      console.error("Error in addCaretFeedback:", error);
      throw error;
    }
  };

  const handleClose = () => {
    dispatch({ type: "IS_CLOSE" });
    setOpenDetailsModal(false);
    setOpenReservationModal(false);
    setOpenReservationListModal(false);

    setIsScanning(true);
    setHasShownNoReservationMsg(false);
  };

  const loadReservationData = async (serviceNumber) => {
    try {
      const response = await QRService.LoadResDetailsByServiceNo(serviceNumber);
      if (response.data.StatusCode === 200) {
        const allReservations = response.data.ResultSet || [];
        setReservationData(allReservations);
        console.log("Loaded all reservations:", allReservations);
        return allReservations;
      }
    } catch (error) {
      return [];
    }
  };

  const formatDateForComparison = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        if (dateString.includes('/')) {
          const parts = dateString.split('/');
          if (parts.length === 3) {
            const month = parseInt(parts[0], 10);
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);

            if (month > 12) {
              return `${parts[1]}/${parts[0]}/${parts[2]}`;
            }
          }
        } else if (dateString.includes('-')) {
          const parts = dateString.split('-');
          if (parts.length === 3) {
            return `${parts[1]}/${parts[2]}/${parts[0]}`;
          }
        }
        return null;
      }
      return date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return null;
    }
  };

  const findMatchingReservation = (reservations, qrPrefix, currentDateString) => {

    const matchingReservations = [];

    reservations.forEach((reservation, index) => {
      const resCheckInDate = formatDateForComparison(reservation.Res_Check_In);
      const resCheckOutDate = formatDateForComparison(reservation.Res_Check_Out);
      const currentStatus = reservation.Res_CheckStatus;
      let isMatch = false;
      let action = "";

      if (qrPrefix === "I") {
        if (resCheckInDate === currentDateString &&
          (!currentStatus || currentStatus === null || currentStatus === "")) {
          isMatch = true;
          action = "checkin";
          console.log("✓ Match for Check In");
        }
      } else if (qrPrefix === "O") {
        if (resCheckOutDate === currentDateString &&
          currentStatus === "I") {
          isMatch = true;
          action = "checkout";
          console.log("✓ Match for Check Out");
        }
      } else if (qrPrefix === "B") {
        if (resCheckOutDate === currentDateString &&
          currentStatus === "I") {
          isMatch = true;
          action = "checkout";
          console.log("✓ Match for Both checkout");
        } else if (resCheckOutDate === currentDateString &&
          currentStatus === "I") {
          isMatch = true;
          action = "checkout";
          console.log("✓ Match for Both (Check Out)");
        }
      }

      if (isMatch) {
        matchingReservations.push({
          ...reservation,
          action: action,
          originalIndex: index
        });
      }
    });

    console.log("\nTotal matching reservations found:", matchingReservations.length);
    return matchingReservations;
  };

  const handleConfirmReservationAction = async () => {
    if (!selectedReservation) {
      toast.error("No reservation selected");
      return;
    }

    setProcessing(true);
    const reservationNo = selectedReservation.Res_no;
    const qrPrefix = qrCode.charAt(0);


    let actualPrefix = qrPrefix;
    if (qrCode === "NEHBI001") actualPrefix = "I";
    if (qrCode === "NEHBO001") actualPrefix = "O";
    if (qrCode === "NEHBO002") actualPrefix = "B";

    try {
      let result1, result2;

      if (reservationAction === "checkin") {
        console.log("Processing check-in for reservation:", reservationNo);

         
        result1 = await markCheckStatus(reservationNo, "I");
        console.log("Check-in API response:", result1);

        if (result1 && result1.StatusCode === 200) {
          toast.success("Check-in successful!");
          handleCloseReservationModal();
          handleClose(); 
        } else {
          toast.error(result1?.Message || "Check-in failed. Please try again.");
        }
      }
      else if (reservationAction === "checkout") {
        console.log("Processing checkout for reservation:", reservationNo);
        console.log("QR Prefix:", actualPrefix);

        if (actualPrefix === "O" || actualPrefix === "B") {
        
          result1 = await markCheckStatus(reservationNo, "O");
          console.log("Check-out API response:", result1);

          if (result1 && result1.StatusCode === 200) {
             
            if (actualPrefix === "B") {
              result2 = await addCaretFeedback(reservationNo, reservationRemarks || "Checked out", "B");
              console.log("Caret feedback API response:", result2);

              if (result2 && result2.StatusCode === 200) {
                toast.success("Check-out and caret feedback submitted successfully!");
              } else {
                toast.warning("Check-out successful but caret feedback submission failed.");
              }
            } else {
              toast.success("Check-out successful!");
            }

            handleCloseReservationModal();
            handleClose();  
          } else {
            toast.error(result1?.Message || "Check-out failed. Please try again.");
          }
        } else {
          toast.error("Invalid QR code for check-out");
        }
      }
    } catch (error) {
      console.error("Error processing reservation:", error);
      toast.error("An error occurred: " + (error.message || "Please try again."));
    } finally {
      setProcessing(false);
    }
  };
  // const handleScan = async (scanData) => {
  //   if (scanData) {
  //     const scannedText = scanData.text.trim();
  //     setQRCode(scannedText);

  //     if (/^[IOB]/.test(scannedText)) {
  //       const qrPrefix = scannedText.charAt(0);
  //       const serviceNumber = scannedText.substring(1);

  //       const allReservations = await loadReservationData(serviceNumber);

  //       if (allReservations && allReservations.length > 0) {
  //         const currentDateString = new Date().toLocaleDateString("en-US", {
  //           month: "numeric",
  //           day: "numeric",
  //           year: "numeric"
  //         });

  //         const matchingReservations = findMatchingReservation(allReservations, qrPrefix, currentDateString);

  //         if (matchingReservations.length === 1) {
  //           const matchingRes = matchingReservations[0];
  //           setReservationAction(matchingRes.action);
  //           setSelectedReservation(matchingRes);
  //           setOpenReservationModal(true);
  //         } else if (matchingReservations.length > 1) {
  //           setFilteredReservations(matchingReservations);
  //           setOpenReservationListModal(true);
  //         } else {
  //           if (qrPrefix === "I") {
  //             toast.error("No pending check-in reservations for today");
  //           } else if (qrPrefix === "O") {
  //             toast.error("No check-in reservations ready for check-out today");
  //           } else if (qrPrefix === "B") {
  //             toast.error("No valid reservations for check-in/check-out today");
  //           }
  //         }
  //       } else {
  //         toast.error("No reservations found for this service number");
  //       }

  //       return;
  //     }


  //     if (/^\d+$/.test(scannedText)) {
  //       const ewoNo = parseInt(scannedText);
  //       dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
  //     } else if (/[A-Za-z]/.test(scannedText)) {
  //       try {
  //         const response = await QRService.GetEWODetails(scannedText);
  //         if (response.data.StatusCode === 200) {
  //           setQRDetails(response.data.ResultSet);
  //           setOpenDetailsModal(true);
  //           dispatch({ type: "IS_CLOSE" });
  //         }
  //       } catch (error) {
  //         console.error("Error fetching QR details:", error);
  //       }
  //     }
  //   }
  // };


  const handleScan = async (scanData) => {
    if (!scanData || !isScanning) return;

    setIsScanning(false);  

    const scannedText = scanData.text.trim();
    setQRCode(scannedText);

    // ---------------- I / O / B RESERVATION QR ----------------

    if (scannedText === "NEHBI001" || scannedText === "NEHBO001" || scannedText === "NEHBO002") {
       
      let qrPrefix;
      if (scannedText === "NEHBI001") {
        qrPrefix = "I";
      } else if (scannedText === "NEHBO001") {
        qrPrefix = "O";
      } else if (scannedText === "NEHBO002") {
        qrPrefix = "B";
      }

       
      const serviceNumber = data?.[0]?.ServiceNo;  

      if (!serviceNumber) {
        toast.error("Service number not found");
        return;
      }

      const allReservations = await loadReservationData(serviceNumber);

      if (allReservations && allReservations.length > 0) {
        const currentDateString = new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        });

        const matchingReservations = findMatchingReservation(
          allReservations,
          qrPrefix,
          currentDateString
        );

        if (matchingReservations.length === 1) {
          setReservationAction(matchingReservations[0].action);
          setSelectedReservation(matchingReservations[0]);
          setOpenReservationModal(true);
        } else if (matchingReservations.length > 1) {
          setFilteredReservations(matchingReservations);
          setOpenReservationListModal(true);
        } else {
          if (!hasShownNoReservationMsg) {
            toast.error("No reservations found for today");
            setHasShownNoReservationMsg(true);
          }
        }
      } else {
        if (!hasShownNoReservationMsg) {
          toast.error("No reservations found for this service number");
          setHasShownNoReservationMsg(true);
        }
      }

      return;
    }

    // ---------------- EWO NUMBER QR ----------------
    if (/^\d+$/.test(scannedText)) {
      const ewoNo = parseInt(scannedText);
      dispatch(QRScan(ewoNo, data[0]?.ServiceNo));
      return;
    }

    // ---------------- DEVICE QR ----------------
    if (/[A-Za-z]/.test(scannedText)) {
      try {
        const response = await QRService.GetEWODetails(scannedText);
        if (response.data.StatusCode === 200) {
          setQRDetails(response.data.ResultSet);
          setOpenDetailsModal(true);
          dispatch({ type: "IS_CLOSE" });
        }
      } catch (error) {
        console.error("Error fetching QR details:", error);
      }
    }
  };




  const handleSelectReservation = (reservation) => {
    setSelectedReservation(reservation);
    setReservationAction(reservation.action);
    setOpenReservationListModal(false);
    setOpenReservationModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
  };

  const handleCloseReservationModal = () => {
    setOpenReservationModal(false);
    setSelectedReservation(null);
    setReservationRemarks("");
    setProcessing(false);
  };

  const handleCloseReservationListModal = () => {
    setOpenReservationListModal(false);
    setFilteredReservations([]);
  };

  const handleError = (error) => {
    console.error(error);
  };

  const getCameraOptions = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    const rearCamera = videoDevices.find(
      (device) => device.label.includes("back") || device.label.includes("rear")
    );
  };

  const previewStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <div>
      {/* QR Scanner Modal */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Scan Your QR Code
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <QrScanner
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
            constraints={{
              audio: false,
              video: {
                facingMode: "environment",
                autoFocus: true,
                torch: false,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
            }}
          >
            Scan Again
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/*----------------------------------------------------------------------- EWO Details Modal ----------------------------------------------------*/}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpenDetailScreen}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            maxWidth: '480px',
            width: '100%',
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: "primary.main",
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                p: 1,
                borderRadius: 2,
                display: 'flex',
              }}
            >
              {/* <DescriptionIcon sx={{ color: 'white' }} /> */}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                EWO Details
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                EWO No: {responseBody?.EwoNo || 'N/A'}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ p: 3 }}>
          {/* Status Badge */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: responseBody?.StatusBckcolor || '#e0e0e0',
                color: responseBody?.StatusTxtcolor || '#424242',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" fontWeight={500}>
                {responseBody?.EwoStatus || 'N/A'}
              </Typography>
            </Box>
          </Box>

          {/* Financial Summary */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: 3,
              p: 2,
              mb: 3,
              border: '1px solid #e2e8f0',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
              }}
            >
              {/* <AttachMoneyIcon sx={{ fontSize: 16 }} /> */}
              Financial Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <Typography variant="caption" color="text.secondary">
                    Estimated Amount
                  </Typography>
                  <Typography variant="h6" fontWeight={700} color="text.primary">
                    {responseBody?.EstimatedAmount || '0.00'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <Typography variant="caption" color="text.secondary">
                    Billed Amount
                  </Typography>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#059669' }}>
                    {responseBody?.BilledAmount || '0.00'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Personnel Info */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1,
              }}
            >
              <Person sx={{ fontSize: 16 }} />
              Personnel
            </Typography>
            {[
              { label: 'Authorized By', value: responseBody?.AuthorizeBy },
              { label: 'Approved By', value: responseBody?.ApprovedBy },
              { label: 'Evaluated By', value: responseBody?.EvaluationBy },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: index < 2 ? '1px solid # ' : 'none',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {item.value || 'N/A'}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Divider */}
          <Box sx={{ position: 'relative', my: 3 }}>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'white',
                px: 2,
                color: '#94a3b8',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              Receipt Details
            </Typography>
          </Box>

          {/* Receiver Info */}
          <Box
            sx={{
              bgcolor: '#eff6ff',
              borderRadius: 3,
              p: 2,
              mb: 3,
              border: '1px solid #bfdbfe',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  bgcolor: '#dbeafe',
                  p: 1,
                  borderRadius: '50%',
                  display: 'flex',
                }}
              >
                <Person sx={{ color: '#2563eb', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#2563eb' }}>
                  Received By
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {data?.[0]?.ReportName || 'N/A'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, px: 2, py: 1.5 }}>
              <Typography variant="caption" color="text.secondary">
                Service Number
              </Typography>
              <Typography variant="body2" fontWeight={500} sx={{ fontFamily: 'monospace' }}>
                {data?.[0]?.ServiceNo || 'N/A'}
              </Typography>
            </Box>
          </Box>

          {/* Issued By */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Autocomplete
              options={employees || []}
              getOptionLabel={(option) => `${option.EmpName} (${option.ServiceNo})`}
              value={employees?.find((emp) => emp.ServiceNo === serviceNo) || null}
              onChange={(event, newValue) => {
                setIssuedBy(newValue ? newValue.EmpName : '');
                setServiceNo(newValue ? newValue.ServiceNo : '');
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Issued By"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography fontWeight={500}>{option.EmpName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.ServiceNo}
                    </Typography>
                  </Box>
                </li>
              )}
              disabled={employeeLoading}
              loading={employeeLoading}
              noOptionsText={employeeLoading ? 'Loading...' : 'No employees found'}
              disablePortal
            />
          </FormControl>

          {/* Issued Date */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Issued Date"
              value={issuedDate}
              onChange={(newValue) => setIssuedDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </DialogContent>

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={handleClose}
            sx={{
              flex: 1,
              borderRadius: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              borderColor: '#cbd5e1',
              color: '#475569',
            }}
          >
            Close
          </Button>
          {isButtonVisible && (
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={async () => {
                try {
                  await dispatch(SendEWODetails(responseBody, serviceNo, remarks));
                  toast.success('Document sent successfully!');
                  handleClose();
                } catch (error) {
                  toast.error('Failed to send document');
                }
              }}
              sx={{
                flex: 1,
                borderRadius: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: "primary.main",
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
                },
              }}
            >
              Send Doc
            </Button>
          )}
        </Box>
      </BootstrapDialog>

      {/* Reservation List Modal (When multiple matches found) */}
      <BootstrapDialog
        onClose={handleCloseReservationListModal}
        aria-labelledby="reservation-list-modal-title"
        open={openReservationListModal}
        maxWidth="md"
        fullWidth
      >
        <BootstrapDialogTitle
          id="reservation-list-modal-title"
          onClose={handleCloseReservationListModal}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Hotel sx={{ color: '#2196f3' }} />
            <Typography variant="h6">
              Select Reservation
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Multiple reservations found for today. Please select one:
          </Typography>

          <Grid container spacing={2}>
            {filteredReservations.map((reservation, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                      borderColor: reservation.action === 'checkin' ? '#4caf50' : '#f44336'
                    },
                    border: '2px solid',
                    borderColor: reservation.action === 'checkin' ? '#c8e6c9' : '#ffcdd2',
                  }}
                  onClick={() => handleSelectReservation(reservation)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          Reservation #{reservation.Res_no}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Service No: {reservation.Res_Service_no}
                        </Typography>
                      </Box>

                      <Box sx={{
                        bgcolor: reservation.action === 'checkin' ? '#4caf50' : '#f44336',
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: '20px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        {reservation.action === 'checkin' ? (
                          <>
                            <ArrowForward sx={{ fontSize: 16 }} />
                            Check In
                          </>
                        ) : (
                          <>
                            <ArrowBack sx={{ fontSize: 16 }} />
                            Check Out
                          </>
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EventAvailable sx={{ color: '#4caf50', fontSize: 18 }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Check-in Date
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                              {reservation.Res_Check_In || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <EventBusy sx={{ color: '#f44336', fontSize: 18 }} />
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Check-out Date
                            </Typography>
                            <Typography variant="body2" fontWeight={500}>
                              {reservation.Res_Check_Out || 'N/A'}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Bungalow ID
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {reservation.Res_Bang_Id || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{
                          color: reservation.Res_CheckStatus === 'Check In' ? '#4caf50' :
                            reservation.Res_CheckStatus === 'Check Out' ? '#f44336' : '#ff9800'
                        }}>
                          {reservation.Res_CheckStatus || 'Pending'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseReservationListModal}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* Reservation Check-in/Check-out Modal */}
      <BootstrapDialog
        onClose={handleCloseReservationModal}
        aria-labelledby="reservation-modal-title"
        open={openReservationModal}
        maxWidth="sm"
        fullWidth
      >
        <BootstrapDialogTitle
          id="reservation-modal-title"
          onClose={handleCloseReservationModal}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {reservationAction === "checkin" ? (
              <ArrowForward sx={{ color: '#4caf50' }} />
            ) : (
              <ArrowBack sx={{ color: '#f44336' }} />
            )}
            <Typography variant="h6">
              {reservationAction === "checkin" ? "Check In" : "Check Out"} - Reservation
            </Typography>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {selectedReservation && (
            <Grid container spacing={2}>
              {/* Reservation Summary Card */}
              <Grid item xs={12}>
                <Card
                  sx={{
                    background: reservationAction === "checkin"
                      ? 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
                      : 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)',
                    borderRadius: 3,
                    border: reservationAction === "checkin"
                      ? '1px solid #a5d6a7'
                      : '1px solid #ef9a9a',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Hotel sx={{
                          fontSize: 40,
                          color: reservationAction === "checkin" ? '#388e3c' : '#d32f2f'
                        }} />
                        <Box>
                          <Typography variant="h6" fontWeight={700}>
                            Reservation #{selectedReservation.Res_no}
                          </Typography>

                        </Box>
                      </Box>
                      <Box sx={{
                        bgcolor: reservationAction === "checkin" ? '#4caf50' : '#f44336',
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: '20px',
                        fontWeight: 600
                      }}>
                        {reservationAction === "checkin" ? "CHECK IN" : "CHECK OUT"}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Reservation Details */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Service No :
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedReservation.Res_Service_no || 'N/A'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Bungalow :
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedReservation.Res_Bang_Id === "1"
                            ? "Main Bungalow"
                            : selectedReservation.Res_Bang_Id === "2"
                              ? "Lower Garden Suite"
                              : "N/A"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Check-in Date:
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedReservation.Res_Check_In
                            ? new Date(selectedReservation.Res_Check_In).toLocaleDateString()
                            : "Not checked out yet"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Check-out Date:
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedReservation.Res_Check_Out
                            ? new Date(selectedReservation.Res_Check_Out).toLocaleDateString()
                            : "Not checked out yet"}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Adults:
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedReservation.Res_AdultCount || '0'}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          Children:
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedReservation.Res_ChildCount || '0'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Current Date Display */}
              <Grid item xs={12}>
                <Box sx={{
                  bgcolor: '#e3f2fd',
                  p: 2,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday sx={{ color: '#1976d2' }} />
                    <Typography variant="body1" fontWeight={600}>
                      {reservationAction === "checkin" ? "Check-in Date:" : "Check-out Date:"}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight={700} color="primary">
                    {new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseReservationModal}
            sx={{ mr: 1 }}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmReservationAction}
            disabled={processing}
            sx={{
              bgcolor: reservationAction === "checkin" ? '#4caf50' : '#f44336',
              '&:hover': {
                bgcolor: reservationAction === "checkin" ? '#388e3c' : '#d32f2f',
              },
              '&.Mui-disabled': {
                bgcolor: reservationAction === "checkin" ? '#a5d6a7' : '#ef9a9a',
              }
            }}
          >
            {processing ? (
              "Processing..."
            ) : reservationAction === "checkin" ? (
              "Confirm Check In"
            ) : (
              "Confirm Check Out"
            )}
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* QR Code Details Modal */}
      <BootstrapDialog
        onClose={handleCloseDetailsModal}
        aria-labelledby="qr-code-details-title"
        open={openDetailsModal}
        maxWidth="md"
        fullWidth
      >
        <BootstrapDialogTitle
          id="qr-code-details-title"
          onClose={handleCloseDetailsModal}
        >
          CDPLC QR
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* QR Code Details */}
            <Grid item xs={12}>
              <Card
                sx={{
                  border: "1px solid #b1a9a9",
                  borderRadius: 5,
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" fontSize={18} mb={2}>
                      QR Code Details
                    </Typography>

                    {/* Device Icon based on QR */}
                    {qrCode?.includes("S") && <Monitor sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("K") && <Keyboard sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("M") && <Mouse sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("L") && <LaptopMac sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("U") && <BatteryChargingFull sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("P") && <DesktopWindows sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("O") && <Memory sx={{ fontSize: 50 }} />}
                    {qrCode?.includes("C") && <DesktopWindows sx={{ fontSize: 50 }} />}
                  </Box>

                  {(() => {
                    let deviceData = {
                      Code: "N/A",
                      Sno: "N/A",
                      Make: "N/A",
                      Device: "N/A",
                      Model: "N/A",
                      Status: "N/A",
                    };

                    if (qrCode?.includes("S")) {
                      deviceData = {
                        Device: "Screen",
                        Code: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Code,
                        Sno: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Sno,
                        Make: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Make,
                        Model: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Model,
                        Status: qrDetails?.ICT_ScreenModels?.[0]?.Mon_Status,
                      };
                    } else if (qrCode?.includes("K")) {
                      deviceData = {
                        Device: "Keyboard",
                        Code: qrDetails?.Key_Code,
                        Sno: qrDetails?.Key_Sno,
                        Make: qrDetails?.Key_Make,
                        Model: qrDetails?.Key_Model,
                        Status: qrDetails?.Key_Status,
                      };
                    } else if (qrCode?.includes("M")) {
                      deviceData = {
                        Device: "Mouse",
                        Code: qrDetails?.Mou_Code,
                        Make: qrDetails?.Mou_Make,
                        Sno: qrDetails?.Mou_Sno,
                        Model: qrDetails?.Mou_Model,
                        Status: qrDetails?.Mou_Status,
                      };
                    } else if (qrCode?.includes("L")) {
                      deviceData = {
                        Device: "Laptop",
                        Code: qrDetails?.Lap_Code,
                        Sno: qrDetails?.Lap_Sno,
                        Make: qrDetails?.Lap_Make,
                        Model: qrDetails?.Lap_Model,
                        Status: qrDetails?.Lap_Status,
                      };
                    } else if (qrCode?.includes("P")) {
                      deviceData = {
                        Device: "Computer",
                        Code: qrDetails?.Com_Code,
                        Sno: qrDetails?.Mac_Sno,
                        Make: qrDetails?.Mac_Make,
                        Model: qrDetails?.Mac_Model,
                        Status: qrDetails?.Mac_Status,
                      };
                    } else if (qrCode?.includes("C")) {
                      deviceData = {
                        Device: "Machine",
                        Code: qrDetails?.Mac_Code,
                        Sno: qrDetails?.Mac_Sno,
                        Make: qrDetails?.Mac_Make,
                        Model: qrDetails?.Mac_Model,
                        Status: qrDetails?.Mac_Status,
                      };
                    } else if (qrCode?.includes("U")) {
                      deviceData = {
                        Device: "UPS",
                        Code: qrDetails?.Ups_Code,
                        Sno: qrDetails?.Ups_Sno,
                        Make: qrDetails?.Ups_Make,
                        Model: qrDetails?.Ups_Model,
                        Status: qrDetails?.Ups_Status,
                      };
                    }

                    return (
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">QR Code:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{deviceData.Code || "N/A"}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">Serial No:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            sx={{
                              wordBreak: "break-all",
                              whiteSpace: "normal",
                            }}
                          >
                            {deviceData.Sno || "N/A"}
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">Device:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{deviceData.Device || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">Make:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{deviceData.Make || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">Model:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">{deviceData.Model || "N/A"}</Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="body2" fontWeight="bold">Status:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            {deviceData.Status === "A"
                              ? "Active"
                              : deviceData.Status === "I"
                                ? "Inactive"
                                : deviceData.Status === "D"
                                  ? "Disposable"
                                  : "N/A"}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })()}
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={12}>
              <Card
                sx={{
                  border: "1px solid #b1a9a9",
                  borderRadius: 5,
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      fontSize={18}
                      mb={2}
                    >
                      Associated User Details
                    </Typography>
                    <IconButton sx={{ color: "black", fontSize: 30 }}>
                      <Person sx={{ fontSize: 50 }} />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Service No:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Service_No || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Emp_Name || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Computer Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Com_Name || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Email Address:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Emp_Email || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Extension:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Emp_Exte || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Location Code:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Com_Loc || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Location Name:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Com_LocName || "N/A"}
                      </Typography>
                    </Grid>


                    <Grid item xs={6}>
                      <Typography variant="body2" fontWeight="bold">
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        {qrDetails?.Status === "A"
                          ? "Active"
                          : qrDetails?.Status === "I"
                            ? "Inactive"
                            : qrDetails?.Status === "D"
                              ? "Disposable"
                              : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card
                sx={{
                  border: "1px solid #b1a9a9",
                  borderRadius: 5,
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      fontSize={18}
                      mb={2}
                    >
                      Other Associated Devices
                    </Typography>
                  </Box>

                  {[
                    { title: "Laptop", prefix: "Lap", icon: <Laptop /> },
                    { title: "Machine", prefix: "Mac", icon: <Memory /> },
                    { title: "Keyboard", prefix: "Key", icon: <Keyboard /> },
                    { title: "Mouse", prefix: "Mou", icon: <Mouse /> },
                  ].map((device, index) => {
                    const deviceCode =
                      qrDetails?.[`${device.prefix}_Code`] || "N/A";
                    if (deviceCode === "N/A") {
                      return null;
                    }

                    return (
                      <Box
                        key={index}
                        sx={{
                          border: "1px solid #b1a9a9",
                          padding: 2,
                          marginBottom: 2,
                          borderRadius: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            fontSize={16}
                            mb={1}
                          >
                            {device.title}
                          </Typography>
                          {device.icon}
                        </Box>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                              {device.title} Code:
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {deviceCode}
                            </Typography>
                          </Grid>


                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                              {device.title} SerialNo:
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <Typography variant="body2"
                              sx={{
                                wordBreak: "break-all",
                                whiteSpace: "normal",
                              }}
                            >
                              {qrDetails?.[`${device.prefix}_Sno`] || "N/A"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                              {device.title} Make:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" >
                              {qrDetails?.[`${device.prefix}_Make`] || "N/A"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                              {device.title} Model:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {qrDetails?.[`${device.prefix}_Model`] || "N/A"}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">
                              {device.title} Status:
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              {qrDetails?.[`${device.prefix}_Status`] === "A"
                                ? "Active"
                                : qrDetails?.[`${device.prefix}_Status`] === "I"
                                  ? "Inactive"
                                  : qrDetails?.[`${device.prefix}_Status`] === "D"
                                    ? "Disposable"
                                    : "N/A"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDetailsModal}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}