// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Checkbox,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Chip,
//   IconButton,
//   Tooltip,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PendingIcon from "@mui/icons-material/Pending";
// import axios from "axios";

// function Attendance() {
//   const navigate = useNavigate();
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [approving, setApproving] = useState(false);

//   const getAuthKey = () => {
//     const token = localStorage.getItem("token");
//     return token ? token.replace(/['"]+/g, '') : "";
//   };

//   const fetchAttendanceRecords = async () => {
//     setLoading(true);
//     try {
//       const authKey = getAuthKey();
//       const sno = localStorage.getItem('ServiceNo')
//       const response = await axios.get(
//         `Attendance/GetDGESAttendancebyofficer?p_reporting_officer=${sno}`,
//         {
//           headers: {
//             "auth-key": authKey,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.StatusCode === 200 && response.data.ResultSet) { 
//         const pendingRecords = response.data.ResultSet.filter(
//           (record) => record.HBL_STATUS === "P"  
//         );
//         setAttendanceRecords(pendingRecords);
//       }  
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//       setSnackbar({
//         open: true,
//         message: "Failed to fetch attendance records",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAttendanceRecords();
//   }, []);


//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       const allIds = attendanceRecords.map((record) => record.HBL_ID);
//       setSelectedRecords(allIds);
//     } else {
//       setSelectedRecords([]);
//     }
//   };


//   const handleSelectRecord = (recordId) => {
//     setSelectedRecords((prev) =>
//       prev.includes(recordId)
//         ? prev.filter((id) => id !== recordId)
//         : [...prev, recordId]
//     );
//   };


//   const handleApproveSelected = async () => {
//     if (selectedRecords.length === 0) {
//       setSnackbar({
//         open: true,
//         message: "Please select at least one record to approve",
//         severity: "warning",
//       });
//       return;
//     }

//     setApproving(true);
//     let successCount = 0;
//     let errorCount = 0;

  
//     const recordsToApprove = attendanceRecords.filter((record) =>
//       selectedRecords.includes(record.HBL_ID)
//     );

//     for (const record of recordsToApprove) {
//       try {
//         const response = await axios.put(
//           `Attendance/DGESUpdateAttendancestatus`,
//           {
//             p_ID: record.HBL_ID,        
//             p_barcode_no: record.HBL_BARCODE_NO,
//             p_hstatus: "I",               
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "auth-key": getAuthKey(),
//             },
//           }
//         );

//         if (response.data.StatusCode === 200) {
//           successCount++;
//         } else {
//           errorCount++;
//         }
//       } catch (error) {
//         console.error(`Error approving record ${record.HBL_BARCODE_NO}:`, error);
//         errorCount++;
//       }
//     }


//     await fetchAttendanceRecords();
//     setSelectedRecords([]);
//     setApproving(false);

//     setSnackbar({
//       open: true,
//       message: `Approved: ${successCount} records, Failed: ${errorCount} records`,
//       severity: successCount > 0 ? "success" : "error",
//     });
//   };


//   const handleApproveSingle = async (record) => {
//     setApproving(true);
//     try {
//       const response = await axios.put(
//         `Attendance/DGESUpdateAttendancestatus`,
//         {
//           p_ID: record.HBL_ID,           
//           p_barcode_no: record.HBL_BARCODE_NO,
//           p_hstatus: "I",                
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "auth-key": getAuthKey(),
//           },
//         }
//       );

//       if (response.data.StatusCode === 200) {
//         setSnackbar({
//           open: true,
//           message: `Successfully approved attendance for ${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}`,
//           severity: "success",
//         });
//         // Refresh the list
//         await fetchAttendanceRecords();
//         setSelectedRecords([]);
//       } else {
//         setSnackbar({
//           open: true,
//           message: "Failed to approve attendance",
//           severity: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error approving record:", error);
//       setSnackbar({
//         open: true,
//         message: "Error occurred while approving",
//         severity: "error",
//       });
//     } finally {
//       setApproving(false);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   // Get status chip color
//   const getStatusChip = (status) => {
//     switch (status) {
//       case "P":
//         return <Chip label="Pending" color="warning" size="small" icon={<PendingIcon />} />;
//       case "I":
//         return <Chip label="Approved" color="success" size="small" icon={<CheckCircleIcon />} />;
//       default:
//         return <Chip label={status} size="small" />;
//     }
//   };

//   return (
//     <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: 2 }}>
//       {/* Header */}
//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
//             Attendance Approvals
//           </Typography>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={() => navigate(-1)}
//             sx={{ textTransform: "none" }}
//           >
//             Back
//           </Button>
//         </Box>
//       </Paper>

//       {/* Action Bar */}
//       {attendanceRecords.length > 0 && (
//         <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: "#f5f5f5" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
//             <Typography variant="body1">
//               Selected: <strong>{selectedRecords.length}</strong> of {attendanceRecords.length} records
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => setSelectedRecords([])}
//                 disabled={selectedRecords.length === 0}
//                 sx={{ textTransform: "none" }}
//               >
//                 Clear Selection
//               </Button>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={handleApproveSelected}
//                 disabled={approving || selectedRecords.length === 0}
//                 startIcon={!approving && <CheckCircleIcon />}
//                 sx={{ textTransform: "none" }}
//               >
//                 {approving ? <CircularProgress size={24} /> : "Approve Selected"}
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Table */}
//       <Paper elevation={3}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
//             <CircularProgress />
//           </Box>
//         ) : attendanceRecords.length > 0 ? (
//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead sx={{ bgcolor: "#1976d2" }}>
//                 <TableRow>
//                   <TableCell padding="checkbox" sx={{ color: "white" }}>
//                     <Checkbox
//                       checked={
//                         selectedRecords.length === attendanceRecords.length &&
//                         attendanceRecords.length > 0
//                       }
//                       onChange={handleSelectAll}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>ID</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Barcode No</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Service No</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Reson</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Officer Name</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Date & Time</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>In/Out Status</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Approval Status</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Action</strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {attendanceRecords.map((record) => (
//                   <TableRow
//                     key={record.HBL_ID}
//                     hover
//                     selected={selectedRecords.includes(record.HBL_ID)}
//                     sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedRecords.includes(record.HBL_ID)}
//                         onChange={() => handleSelectRecord(record.HBL_ID)}
//                       />
//                     </TableCell>
//                     <TableCell>{record.HBL_ID}</TableCell>
//                     <TableCell>{record.HBL_BARCODE_NO}</TableCell>
//                     <TableCell>{record.CED_SERVICE_NO}</TableCell>
//                     <TableCell>{record.HBL_REASON}</TableCell>
//                     <TableCell>
//                       {record.CED_FIRST_NAME} {record.CED_LAST_NAME}
//                     </TableCell>
//                     <TableCell>{formatDate(record.HBL_BARCODE_DATE)}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={record.HBL_INOUT_STATUS === "I" ? "IN" : "OUT"}
//                         color={record.HBL_INOUT_STATUS === "I" ? "primary" : "default"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>{getStatusChip(record.HBL_STATUS)}</TableCell>
//                     <TableCell>
//                       <Tooltip title="Approve">
//                         <IconButton
//                           color="success"
//                           onClick={() => handleApproveSingle(record)}
//                           disabled={approving}
//                           size="small"
//                         >
//                           <CheckCircleIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         ) : (
//           <Box sx={{ textAlign: "center", p: 5 }}>
//             <img
//               src={require("../../assets/icons/404-error.png")}
//               alt="No data"
//               style={{ maxWidth: "200px", opacity: 0.6 }}
//             />
//             <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
//               No pending attendance records found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               All attendance records have been processed
//             </Typography>
//           </Box>
//         )}
//       </Paper>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default Attendance;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Checkbox,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Chip,
//   IconButton,
//   Tooltip,
//   Tab,
//   Tabs,
// } from "@mui/material";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import PendingIcon from "@mui/icons-material/Pending";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import axios from "axios";

// function Attendance() {
//   const navigate = useNavigate();
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [manualRecords, setManualRecords] = useState([]);
//   const [locationRecords, setLocationRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedRecords, setSelectedRecords] = useState([]);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [approving, setApproving] = useState(false);
//   const [tabValue, setTabValue] = useState(0);
//   const [divisionHead, setDivisionHead] = useState(null);

//   const getAuthKey = () => {
//     const token = localStorage.getItem("token");
//     return token ? token.replace(/['"]+/g, '') : "";
//   };

//   const fetchAttendanceRecords = async () => {
//     setLoading(true);
//     try {
//       const authKey = getAuthKey();
//       const sno = localStorage.getItem('ServiceNo');
//       const response = await axios.get(
//         `Attendance/GetDGESAttendancebyofficer?p_reporting_officer=${sno}`,
//         {
//           headers: {
//             "auth-key": authKey,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.StatusCode === 200 && response.data.ResultSet) {
//         const allRecords = response.data.ResultSet;
        
//         if (allRecords.length > 0 && divisionHead === null) {
//           setDivisionHead(allRecords[0].Division_head);
//         }
        
//         if (allRecords[0]?.Division_head === "1") {
//           const manual = allRecords.filter(record => 
//             record.HBL_STATUS === "P" || record.HBL_STATUS === "Q"
//           );
//           const location = allRecords.filter(record => 
//             record.HBL_STATUS === "B" || record.HBL_STATUS === "C"
//           );
//           setManualRecords(manual);
//           setLocationRecords(location);
//         } else {
//           const manual = allRecords.filter(record => 
//             record.HBL_STATUS === "P"
//           );
//           const location = allRecords.filter(record => 
//             record.HBL_STATUS === "B"
//           );
//           setManualRecords(manual);
//           setLocationRecords(location);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//       setSnackbar({
//         open: true,
//         message: "Failed to fetch attendance records",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAttendanceRecords();
//   }, []);

//   const getCurrentRecords = () => {
//     return tabValue === 0 ? manualRecords : locationRecords;
//   };

//   const handleSelectAll = (event) => {
//     const currentRecords = getCurrentRecords();
//     if (event.target.checked) {
//       const allIds = currentRecords.map((record) => record.HBL_ID);
//       setSelectedRecords(allIds);
//     } else {
//       setSelectedRecords([]);
//     }
//   };

//   const handleSelectRecord = (recordId) => {
//     setSelectedRecords((prev) =>
//       prev.includes(recordId)
//         ? prev.filter((id) => id !== recordId)
//         : [...prev, recordId]
//     );
//   };

//   const handleApproveSelected = async () => {
//     if (selectedRecords.length === 0) {
//       setSnackbar({
//         open: true,
//         message: "Please select at least one record to approve",
//         severity: "warning",
//       });
//       return;
//     }

//     setApproving(true);
//     let successCount = 0;
//     let errorCount = 0;

//     const currentRecords = getCurrentRecords();
//     const recordsToApprove = currentRecords.filter((record) =>
//       selectedRecords.includes(record.HBL_ID)
//     );

//     for (const record of recordsToApprove) {
//       try {
//         let newStatus = "";
        
       
//         if (divisionHead === "1") {
          
//           newStatus = "I";
//         } else {
          
//           if (record.HBL_STATUS === "B") {
//             newStatus = "C";
//           } else if (record.HBL_STATUS === "P") {
//             newStatus = "Q";
//           } else {
//             newStatus = "I"; 
//           }
//         }

//         const response = await axios.put(
//           `Attendance/DGESUpdateAttendancestatus`,
//           {
//             p_ID: record.HBL_ID,
//             p_barcode_no: record.HBL_BARCODE_NO,
//             p_hstatus: newStatus,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "auth-key": getAuthKey(),
//             },
//           }
//         );

//         if (response.data.StatusCode === 200) {
//           successCount++;
//         } else {
//           errorCount++;
//         }
//       } catch (error) {
//         console.error(`Error approving record ${record.HBL_BARCODE_NO}:`, error);
//         errorCount++;
//       }
//     }

//     await fetchAttendanceRecords();
//     setSelectedRecords([]);
//     setApproving(false);

//     setSnackbar({
//       open: true,
//       message: `Approved: ${successCount} records, Failed: ${errorCount} records`,
//       severity: successCount > 0 ? "success" : "error",
//     });
//   };

//   const handleApproveSingle = async (record) => {
//     setApproving(true);
//     try {
//       let newStatus = "";
      
//       if (divisionHead === "1") {
//         newStatus = "I";
//       } else {
//         if (record.HBL_STATUS === "B") {
//           newStatus = "C";
//         } else if (record.HBL_STATUS === "P") {
//           newStatus = "Q";
//         } else {
//           newStatus = "I"; 
//         }
//       }

//       const response = await axios.put(
//         `Attendance/DGESUpdateAttendancestatus`,
//         {
//           p_ID: record.HBL_ID,
//           p_barcode_no: record.HBL_BARCODE_NO,
//           p_hstatus: newStatus,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "auth-key": getAuthKey(),
//           },
//         }
//       );

//       if (response.data.StatusCode === 200) {
//         const statusMessage = divisionHead === "1" 
//           ? "approved" 
//           : `updated from ${record.HBL_STATUS} to ${newStatus}`;
        
//         setSnackbar({
//           open: true,
//           message: `Successfully ${statusMessage} attendance for ${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}`,
//           severity: "success",
//         });
//         await fetchAttendanceRecords();
//         setSelectedRecords([]);
//       } else {
//         setSnackbar({
//           open: true,
//           message: "Failed to approve attendance",
//           severity: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error approving record:", error);
//       setSnackbar({
//         open: true,
//         message: "Error occurred while approving",
//         severity: "error",
//       });
//     } finally {
//       setApproving(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   const getStatusChip = (status) => {
//     switch (status) {
//       case "P":
//         return <Chip label="Pending - Manual" color="warning" size="small" icon={<PendingIcon />} />;
//       case "Q":
//         return <Chip label="Pending Level 2" color="info" size="small" icon={<PendingIcon />} />;
//       case "B":
//         return <Chip label="Pending - Location" color="warning" size="small" icon={<LocationOnIcon />} />;
//       case "C":
//         return <Chip label="Pending Level 2" color="info" size="small" icon={<LocationOnIcon />} />;
//       case "I":
//         return <Chip label="Approved" color="success" size="small" icon={<CheckCircleIcon />} />;
//       default:
//         return <Chip label={status} size="small" />;
//     }
//   };

//   const getActionButtonText = (record) => {
//     if (divisionHead === "1") {
//       return "Approve";
//     } else {
//       if (record.HBL_STATUS === "P") return "Send to Q";
//       if (record.HBL_STATUS === "B") return "Send to C";
//       return "Approve";
//     }
//   };

//   const currentRecords = getCurrentRecords();

//   return (
//     <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: 2 }}>
//       {/* Header */}
//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
//             Attendance Approvals
//             {divisionHead && (
//               <Chip 
//                 label={divisionHead === "1" ? "Division Head" : "Regular User"} 
//                 color={divisionHead === "1" ? "primary" : "default"}
//                 size="small"
//                 sx={{ ml: 2 }}
//               />
//             )}
//           </Typography>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={() => navigate(-1)}
//             sx={{ textTransform: "none" }}
//           >
//             Back
//           </Button>
//         </Box>
//       </Paper>

//       {/* Tabs */}
//       <Paper elevation={2} sx={{ mb: 3 }}>
//         <Tabs
//           value={tabValue}
//           onChange={(e, newValue) => {
//             setTabValue(newValue);
//             setSelectedRecords([]);
//           }}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//         >
//           <Tab 
//             icon={<AssignmentIcon />} 
//             label="Manual Attendance" 
//             iconPosition="start"
//             sx={{ textTransform: "none", fontWeight: "bold" }}
//           />
//           <Tab 
//             icon={<LocationOnIcon />} 
//             label="Location Attendance" 
//             iconPosition="start"
//             sx={{ textTransform: "none", fontWeight: "bold" }}
//           />
//         </Tabs>
//       </Paper>

//       {/* Action Bar */}
//       {currentRecords.length > 0 && (
//         <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: "#f5f5f5" }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
//             <Typography variant="body1">
//               Selected: <strong>{selectedRecords.length}</strong> of {currentRecords.length} records
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={() => setSelectedRecords([])}
//                 disabled={selectedRecords.length === 0}
//                 sx={{ textTransform: "none" }}
//               >
//                 Clear Selection
//               </Button>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={handleApproveSelected}
//                 disabled={approving || selectedRecords.length === 0}
//                 startIcon={!approving && <CheckCircleIcon />}
//                 sx={{ textTransform: "none" }}
//               >
//                 {approving ? <CircularProgress size={24} /> : "Approve Selected"}
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       )}

//       {/* Table */}
//       <Paper elevation={3}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
//             <CircularProgress />
//           </Box>
//         ) : currentRecords.length > 0 ? (
//           <Box sx={{ overflowX: "auto" }}>
//             <Table>
//               <TableHead sx={{ bgcolor: "#1976d2" }}>
//                 <TableRow>
//                   <TableCell padding="checkbox" sx={{ color: "white" }}>
//                     <Checkbox
//                       checked={
//                         selectedRecords.length === currentRecords.length &&
//                         currentRecords.length > 0
//                       }
//                       onChange={handleSelectAll}
//                       sx={{ color: "white" }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Service No</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Reason</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Employee Name</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Date & Time</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Approval Status</strong></TableCell>
//                   <TableCell sx={{ color: "white" }}><strong>Action</strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentRecords.map((record) => (
//                   <TableRow
//                     key={record.HBL_ID}
//                     hover
//                     selected={selectedRecords.includes(record.HBL_ID)}
//                     sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedRecords.includes(record.HBL_ID)}
//                         onChange={() => handleSelectRecord(record.HBL_ID)}
//                       />
//                     </TableCell>
//                     <TableCell>{record.CED_SERVICE_NO}</TableCell>
//                     <TableCell>{record.HBL_REASON}</TableCell>
//                     <TableCell>
//                       {record.CED_FIRST_NAME} {record.CED_LAST_NAME}
//                     </TableCell>
//                     <TableCell>{formatDate(record.HBL_BARCODE_DATE)}</TableCell>
                    
//                     <TableCell>{getStatusChip(record.HBL_STATUS)}</TableCell>
//                     <TableCell>
//                       <Tooltip title={getActionButtonText(record)}>
//                         <IconButton
//                           color="success"
//                           onClick={() => handleApproveSingle(record)}
//                           disabled={approving}
//                           size="small"
//                         >
//                           <CheckCircleIcon />
//                         </IconButton>
//                       </Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         ) : (
//           <Box sx={{ textAlign: "center", p: 5 }}>
//             <img
//               src={require("../../assets/icons/404-error.png")}
//               alt="No data"
//               style={{ maxWidth: "200px", opacity: 0.6 }}
//             />
//             <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
//               No pending {tabValue === 0 ? "manual" : "location"} attendance records found
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               All {tabValue === 0 ? "manual" : "location"} attendance records have been processed
//             </Typography>
//           </Box>
//         )}
//       </Paper>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default Attendance;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  Checkbox,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Card,
  CardContent,
  CardActions,
  Grid,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Fab,
  useMediaQuery,
  useTheme,
  Divider
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";

function Attendance() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [manualRecords, setManualRecords] = useState([]);
  const [locationRecords, setLocationRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [approving, setApproving] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [divisionHead, setDivisionHead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileViewMode, setMobileViewMode] = useState("card"); // "card" or "table"

  const getAuthKey = () => {
    const token = localStorage.getItem("token");
    return token ? token.replace(/['"]+/g, '') : "";
  };
 
  const refreshPage = () => {
    window.location.reload();
  };
 
  const showConfirmationAlert = async (recordCount, isBulk = false, recordDetails = null, action = "approve") => {
    let title, text, confirmButtonText, confirmButtonColor;
    
    if (action === "reject") {
      if (isBulk) {
        title = 'Confirm Bulk Rejection';
        text = `Are you sure you want to reject ${recordCount} attendance record${recordCount > 1 ? 's' : ''}?`;
        confirmButtonText = `Yes, Reject ${recordCount} Record${recordCount > 1 ? 's' : ''}`;
        confirmButtonColor = '#d33';
      } else {
        const employeeName = recordDetails ? `${recordDetails.CED_FIRST_NAME} ${recordDetails.CED_LAST_NAME}` : 'this record';
        title = 'Confirm Rejection';
        text = `Are you sure you want to reject attendance for ${employeeName}?`;
        confirmButtonText = 'Yes, Reject';
        confirmButtonColor = '#d33';
      }
    } else {
      if (isBulk) {
        title = 'Confirm Bulk Approval';
        text = `Are you sure you want to approve ${recordCount} attendance record${recordCount > 1 ? 's' : ''}?`;
        confirmButtonText = `Yes, Approve ${recordCount} Record${recordCount > 1 ? 's' : ''}`;
        confirmButtonColor = '#3085d6';
      } else {
        const employeeName = recordDetails ? `${recordDetails.CED_FIRST_NAME} ${recordDetails.CED_LAST_NAME}` : 'this record';
        title = 'Confirm Approval';
        text = `Are you sure you want to approve attendance for ${employeeName}?`;
        confirmButtonText = 'Yes, Approve';
        confirmButtonColor = '#3085d6';
      }
    }

    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      background: '#fff',
      allowOutsideClick: false,
      allowEscapeKey: true,
    });

    return result.isConfirmed;
  };
 
  const showSuccessAlert = (message, isBulk = false, successCount = null, errorCount = null, shouldRefresh = true, action = "approve") => {
    if (isBulk && errorCount > 0) {
      Swal.fire({
        title: 'Partial Success',
        html: `
          <div style="text-align: left;">
            <p>✅ Successfully processed: <strong>${successCount}</strong> records</p>
            <p>❌ Failed: <strong>${errorCount}</strong> records</p>
            <p style="margin-top: 10px;">Please check the records and try again for failed ones.</p>
          </div>
        `,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed && shouldRefresh) {
          refreshPage();
        }
      });
    } else if (isBulk) {
      Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          refreshPage();
        }
      });
    } else {
      Swal.fire({
        title: action === "reject" ? 'Rejected!' : 'Approved!',
        text: message,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          refreshPage();
        }
      });
    }
  };
 
  const showErrorAlert = (message, error = null) => {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      ...(error && { footer: `<span style="font-size: 12px;">${error}</span>` })
    });
  };

  const showLoadingAlert = (message) => {
    Swal.fire({
      title: 'Processing',
      text: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  };

  const fetchAttendanceRecords = async () => {
    setLoading(true);
    try {
      const authKey = getAuthKey();
      const sno = localStorage.getItem('ServiceNo');
      const response = await axios.get(
        `Attendance/GetDGESAttendancebyofficer?p_reporting_officer=${sno}`,
        {
          headers: {
            "auth-key": authKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.StatusCode === 200 && response.data.ResultSet) {
        const allRecords = response.data.ResultSet;
        
        if (allRecords.length > 0 && divisionHead === null) {
          setDivisionHead(allRecords[0].Division_head);
        }
        
        if (allRecords[0]?.Division_head === "1") {
          const manual = allRecords.filter(record => 
            record.HBL_STATUS === "P" || record.HBL_STATUS === "Q"
          );
          const location = allRecords.filter(record => 
            record.HBL_STATUS === "B" || record.HBL_STATUS === "C"
          );
          setManualRecords(manual);
          setLocationRecords(location);
        } else {
          const manual = allRecords.filter(record => 
            record.HBL_STATUS === "P"
          );
          const location = allRecords.filter(record => 
            record.HBL_STATUS === "B"
          );
          setManualRecords(manual);
          setLocationRecords(location);
        }
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      showErrorAlert("Failed to fetch attendance records", error.message);
      setSnackbar({
        open: true,
        message: "Failed to fetch attendance records",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const getCurrentRecords = () => {
    let records = tabValue === 0 ? manualRecords : locationRecords;
    
    // Apply search filter
    if (searchTerm) {
      records = records.filter(record => 
        record.CED_SERVICE_NO?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}`?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.HBL_REASON?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      records = records.filter(record => record.HBL_STATUS === statusFilter);
    }
    
    return records;
  };

  const handleSelectAll = (event) => {
    const currentRecords = getCurrentRecords();
    if (event.target.checked) {
      const allIds = currentRecords.map((record) => record.HBL_ID);
      setSelectedRecords(allIds);
    } else {
      setSelectedRecords([]);
    }
  };

  const handleSelectRecord = (recordId) => {
    setSelectedRecords((prev) =>
      prev.includes(recordId)
        ? prev.filter((id) => id !== recordId)
        : [...prev, recordId]
    );
  };

  const updateAttendanceStatus = async (record, newStatus, actionType) => {
    const response = await axios.put(
      `Attendance/DGESUpdateAttendancestatus`,
      {
        p_ID: record.HBL_ID,
        p_barcode_no: record.HBL_BARCODE_NO,
        p_hstatus: newStatus,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-key": getAuthKey(),
        },
      }
    );
    return response;
  };

  const handleApproveSelected = async () => {
    if (selectedRecords.length === 0) {
      showErrorAlert("Please select at least one record to approve");
      return;
    }

    const confirmed = await showConfirmationAlert(selectedRecords.length, true, null, "approve");
    if (!confirmed) return;

    setApproving(true);
    showLoadingAlert(`Approving ${selectedRecords.length} record(s)...`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    const currentRecords = getCurrentRecords();
    const recordsToApprove = currentRecords.filter((record) =>
      selectedRecords.includes(record.HBL_ID)
    );

    for (const record of recordsToApprove) {
      try {
        let newStatus = "";
        
        if (divisionHead === "1") {
          newStatus = "I";
        } else {
          if (record.HBL_STATUS === "B") {
            newStatus = "C";
          } else if (record.HBL_STATUS === "P") {
            newStatus = "Q";
          } else {
            newStatus = "I";
          }
        }

        const response = await updateAttendanceStatus(record, newStatus, "approve");

        if (response.data.StatusCode === 200) {
          successCount++;
        } else {
          errorCount++;
          errors.push(`${record.CED_SERVICE_NO} - ${response.data.Message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error(`Error approving record ${record.HBL_BARCODE_NO}:`, error);
        errorCount++;
        errors.push(`${record.CED_SERVICE_NO} - ${error.message}`);
      }
    }

    Swal.close();

    if (successCount > 0 && errorCount === 0) {
      showSuccessAlert(`Successfully approved ${successCount} record(s)`, true, successCount, errorCount, true, "approve");
    } else if (successCount > 0 && errorCount > 0) {
      showSuccessAlert(`Partial completion`, true, successCount, errorCount, true, "approve");
    } else {
      showErrorAlert("Failed to approve records. Please try again.");
      setApproving(false);
      return;
    }

    setSelectedRecords([]);
    setApproving(false);
  };

  const handleRejectSelected = async () => {
    if (selectedRecords.length === 0) {
      showErrorAlert("Please select at least one record to reject");
      return;
    }

    const confirmed = await showConfirmationAlert(selectedRecords.length, true, null, "reject");
    if (!confirmed) return;

    setApproving(true);
    showLoadingAlert(`Rejecting ${selectedRecords.length} record(s)...`);

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    const currentRecords = getCurrentRecords();
    const recordsToReject = currentRecords.filter((record) =>
      selectedRecords.includes(record.HBL_ID)
    );

    for (const record of recordsToReject) {
      try {
        const response = await updateAttendanceStatus(record, "N", "reject");

        if (response.data.StatusCode === 200) {
          successCount++;
        } else {
          errorCount++;
          errors.push(`${record.CED_SERVICE_NO} - ${response.data.Message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error(`Error rejecting record ${record.HBL_BARCODE_NO}:`, error);
        errorCount++;
        errors.push(`${record.CED_SERVICE_NO} - ${error.message}`);
      }
    }

    Swal.close();

    if (successCount > 0 && errorCount === 0) {
      showSuccessAlert(`Successfully rejected ${successCount} record(s)`, true, successCount, errorCount, true, "reject");
    } else if (successCount > 0 && errorCount > 0) {
      showSuccessAlert(`Partial completion`, true, successCount, errorCount, true, "reject");
    } else {
      showErrorAlert("Failed to reject records. Please try again.");
      setApproving(false);
      return;
    }

    setSelectedRecords([]);
    setApproving(false);
  };

  const handleApproveSingle = async (record) => {
    const confirmed = await showConfirmationAlert(1, false, record, "approve");
    if (!confirmed) return;

    setApproving(true);
    showLoadingAlert(`Processing approval for ${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}...`);

    try {
      let newStatus = "";
      
      if (divisionHead === "1") {
        newStatus = "I";
      } else {
        if (record.HBL_STATUS === "B") {
          newStatus = "C";
        } else if (record.HBL_STATUS === "P") {
          newStatus = "Q";
        } else {
          newStatus = "I";
        }
      }

      const response = await updateAttendanceStatus(record, newStatus, "approve");

      Swal.close();

      if (response.data.StatusCode === 200) {
        const statusMessage = divisionHead === "1" 
          ? "approved" 
          : `updated from ${record.HBL_STATUS} to ${newStatus}`;
        
        showSuccessAlert(
          `Successfully ${statusMessage} attendance for ${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}`,
          false,
          null,
          null,
          true,
          "approve"
        );
        
        setSelectedRecords([]);
      } else {
        showErrorAlert(
          "Failed to approve attendance",
          response.data.Message || "Unknown error occurred"
        );
        setApproving(false);
      }
    } catch (error) {
      Swal.close();
      console.error("Error approving record:", error);
      showErrorAlert(
        "Error occurred while approving",
        error.message
      );
      setApproving(false);
    }
  };

  const handleRejectSingle = async (record) => {
    const confirmed = await showConfirmationAlert(1, false, record, "reject");
    if (!confirmed) return;

    setApproving(true);
    showLoadingAlert(`Processing rejection for ${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}...`);

    try {
      const response = await updateAttendanceStatus(record, "N", "reject");

      Swal.close();

      if (response.data.StatusCode === 200) {
        showSuccessAlert(
          `Successfully rejected attendance for ${record.CED_FIRST_NAME} ${record.CED_LAST_NAME}`,
          false,
          null,
          null,
          true,
          "reject"
        );
        
        setSelectedRecords([]);
      } else {
        showErrorAlert(
          "Failed to reject attendance",
          response.data.Message || "Unknown error occurred"
        );
        setApproving(false);
      }
    } catch (error) {
      Swal.close();
      console.error("Error rejecting record:", error);
      showErrorAlert(
        "Error occurred while rejecting",
        error.message
      );
      setApproving(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isMobile) {
      return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleString();
  };

  const getStatusChip = (status) => {
    const chipProps = {
      size: isMobile ? "small" : "small",
      sx: { fontSize: isMobile ? '0.7rem' : '0.75rem' }
    };
    
    switch (status) {
      case "P":
        return <Chip label="Manual" color="warning" icon={<PendingIcon />} {...chipProps} />;
      case "Q":
        return <Chip label="Level 2" color="info" icon={<PendingIcon />} {...chipProps} />;
      case "B":
        return <Chip label="Location" color="warning" icon={<LocationOnIcon />} {...chipProps} />;
      case "C":
        return <Chip label="Level 2" color="info" icon={<LocationOnIcon />} {...chipProps} />;
      case "I":
        return <Chip label="Approved" color="success" icon={<CheckCircleIcon />} {...chipProps} />;
      case "N":
        return <Chip label="Rejected" color="error" icon={<CancelIcon />} {...chipProps} />;
      default:
        return <Chip label={status} {...chipProps} />;
    }
  };

  const getActionButtonText = (record, actionType) => {
    if (actionType === "reject") {
      return "Reject";
    }
    
    if (divisionHead === "1") {
      return "Approve";
    } else {
      if (record.HBL_STATUS === "P") return "Send to Q";
      if (record.HBL_STATUS === "B") return "Send to C";
      return "Approve";
    }
  };

  // Mobile Card View Component
  const MobileAttendanceCard = ({ record }) => (
    <Card 
      sx={{ 
        mb: 2, 
        position: 'relative',
        borderLeft: selectedRecords.includes(record.HBL_ID) ? '4px solid #1976d2' : 'none',
        bgcolor: selectedRecords.includes(record.HBL_ID) ? '#f0f7ff' : 'white'
      }}
      elevation={1}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Checkbox
              checked={selectedRecords.includes(record.HBL_ID)}
              onChange={() => handleSelectRecord(record.HBL_ID)}
              size="small"
              sx={{ p: 0.5 }}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {record.CED_SERVICE_NO}
            </Typography>
          </Box>
          {getStatusChip(record.HBL_STATUS)}
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Grid container spacing={1.5}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Employee Name</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {record.CED_FIRST_NAME} {record.CED_LAST_NAME}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">Date & Time</Typography>
            <Typography variant="body2">{formatDate(record.HBL_BARCODE_DATE)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">Reason</Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {record.HBL_REASON || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      
      <CardActions sx={{ p: 1.5, pt: 0, gap: 1 }}>
  <Button
    variant="contained"
    size="small"
    fullWidth
    onClick={() => handleApproveSingle(record)}
    disabled={approving}
    startIcon={<CheckCircleIcon sx={{ fontSize: 20 }} />}
    sx={{ 
      textTransform: 'none',
      py: 0.75,
      backgroundColor: '#2e7d32',
      '&:hover': { backgroundColor: '#1b5e20' }
    }}
  >
    {getActionButtonText(record, "approve")}
  </Button>
  
  <Button
    variant="contained"
    size="small"
    fullWidth
    onClick={() => handleRejectSingle(record)}
    disabled={approving}
    startIcon={<CancelIcon sx={{ fontSize: 20 }} />}
    sx={{ 
      textTransform: 'none',
      py: 0.75,
      backgroundColor: '#d32f2f',
      '&:hover': { backgroundColor: '#b71c1c' }
    }}
  >
    Reject
  </Button>
</CardActions>
    </Card>
  );

  // Search and Filter Bar Component
  const SearchFilterBar = () => (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      mb: 2,
      flexDirection: isMobile ? 'column' : 'row'
    }}>
      {/* <TextField
        size="small"
        placeholder="Search by name, service no, or reason..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearchTerm("")}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
        }}
      /> */}
      
      {/* {!isMobile && (
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          size="small"
        >
          Filter {statusFilter !== "all" && `(${statusFilter})`}
        </Button>
      )} */}
      
      {/* {isMobile && (
        <IconButton 
          onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          color={statusFilter !== "all" ? "primary" : "default"}
        >
          <FilterListIcon />
        </IconButton>
      )} */}
      
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
      >
        <MenuItem onClick={() => { setStatusFilter("all"); setFilterAnchorEl(null); }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {statusFilter === "all" && <CheckBoxIcon fontSize="small" color="primary" />}
            All Status
          </Box>
        </MenuItem>
        <MenuItem onClick={() => { setStatusFilter("P"); setFilterAnchorEl(null); }}>
          Pending - Manual
        </MenuItem>
        <MenuItem onClick={() => { setStatusFilter("B"); setFilterAnchorEl(null); }}>
          Pending - Location
        </MenuItem>
        <MenuItem onClick={() => { setStatusFilter("Q"); setFilterAnchorEl(null); }}>
          Level 2 (Manual)
        </MenuItem>
        <MenuItem onClick={() => { setStatusFilter("C"); setFilterAnchorEl(null); }}>
          Level 2 (Location)
        </MenuItem>
      </Menu>
    </Box>
  );

  // Bulk Action Bar for Mobile
  const BulkActionBar = ({ selectedCount, totalCount }) => {
    if (selectedCount === 0) return null;
    
    return (
      <Paper 
        elevation={3} 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          left: 16, 
          right: 16,
          zIndex: 1000,
          p: 1.5,
          bgcolor: '#1976d2',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            {selectedCount} selected
          </Typography>
          <IconButton size="small" onClick={() => setSelectedRecords([])} sx={{ color: 'white' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="small"
            onClick={handleApproveSelected}
            disabled={approving}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
          >
            Approve All
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="small"
            onClick={handleRejectSelected}
            disabled={approving}
          >
            Reject All
          </Button>
        </Box>
      </Paper>
    );
  };

  const currentRecords = getCurrentRecords();
  const selectedCount = selectedRecords.length;

  return (
    <Box sx={{ 
      width: "100%", 
      maxWidth: "1200px", 
      margin: "0 auto", 
      padding: isMobile ? 1 : 2,
      pb: selectedCount > 0 && isMobile ? 10 : 2
    }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: isMobile ? 1.5 : 2, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: "bold", color: "#1976d2" }}>
            Attendance Approvals
            {/* {divisionHead && (
              <Chip 
                label={divisionHead === "1" ? "Division Head" : "Regular User"} 
                color={divisionHead === "1" ? "primary" : "default"}
                size="small"
                sx={{ ml: 1 }}
              />
            )} */}
            
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
            size={isMobile ? "small" : "medium"}
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={2} sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue);
            setSelectedRecords([]);
            setSearchTerm("");
          }}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "fullWidth" : "standard"}
          centered={isMobile}
        >
          <Tab 
            icon={<AssignmentIcon />} 
            label={!isMobile ? "Manual Attendance" : "Manual"} 
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: "bold", minHeight: 48 }}
          />
          <Tab 
            icon={<LocationOnIcon />} 
            label={!isMobile ? "Location Attendance" : "Location"} 
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: "bold", minHeight: 48 }}
          />
        </Tabs>
      </Paper>

      {/* Search and Filter */}
      {currentRecords.length > 0 && <SearchFilterBar />}

      {/* Selected Count Indicator for Desktop */}
      {currentRecords.length > 0 && !isMobile && (
        <Paper elevation={2} sx={{ p: 1.5, mb: 2, bgcolor: "#f5f5f5" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <Typography variant="body1">
              Selected: <strong>{selectedRecords.length}</strong> of {currentRecords.length} records
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setSelectedRecords([])}
                disabled={selectedRecords.length === 0}
                size="small"
                sx={{ textTransform: "none" }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleApproveSelected}
                disabled={approving || selectedRecords.length === 0}
                size="small"
                sx={{ textTransform: "none" }}
              >
                {approving ? <CircularProgress size={20} /> : "Approve Selected"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleRejectSelected}
                disabled={approving || selectedRecords.length === 0}
                size="small"
                sx={{ textTransform: "none" }}
              >
                {approving ? <CircularProgress size={20} /> : "Reject Selected"}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Main Content */}
      <Paper elevation={3}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress />
          </Box>
        ) : currentRecords.length > 0 ? (
          <>
            {/* Mobile Card View */}
            {isMobile && (
              <Box sx={{ p: 1 }}>
                {currentRecords.map((record) => (
                  <MobileAttendanceCard key={record.HBL_ID} record={record} />
                ))}
              </Box>
            )}
            
            {/* Desktop Table View */}
            {!isMobile && (
              <Box sx={{ overflowX: "auto" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#1976d2" }}>
                    <TableRow>
                      <TableCell padding="checkbox" sx={{ color: "white" }}>
                        <Checkbox
                          checked={
                            selectedRecords.length === currentRecords.length &&
                            currentRecords.length > 0
                          }
                          onChange={handleSelectAll}
                          sx={{ color: "white" }}
                        />
                      </TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service No</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Reason</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Employee Name</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date & Time</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRecords.map((record) => (
                      <TableRow
                        key={record.HBL_ID}
                        hover
                        selected={selectedRecords.includes(record.HBL_ID)}
                        sx={{ "&:hover": { bgcolor: "#f5f5f5" } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedRecords.includes(record.HBL_ID)}
                            onChange={() => handleSelectRecord(record.HBL_ID)}
                          />
                        </TableCell>
                        <TableCell>{record.CED_SERVICE_NO}</TableCell>
                        <TableCell sx={{ maxWidth: 200 }}>{record.HBL_REASON}</TableCell>
                        <TableCell>
                          {record.CED_FIRST_NAME} {record.CED_LAST_NAME}
                        </TableCell>
                        <TableCell>{formatDate(record.HBL_BARCODE_DATE)}</TableCell>
                        <TableCell>{getStatusChip(record.HBL_STATUS)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Tooltip title={getActionButtonText(record, "approve")}>
                              <IconButton
                                color="success"
                                onClick={() => handleApproveSingle(record)}
                                disabled={approving}
                                size="small"
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton
                                color="error"
                                onClick={() => handleRejectSingle(record)}
                                disabled={approving}
                                size="small"
                              >
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Typography variant={isMobile ? "subtitle1" : "h6"} color="text.secondary">
              No pending {tabValue === 0 ? "manual" : "location"} attendance records found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {searchTerm ? "Try adjusting your search or filter criteria" : "All records have been processed"}
            </Typography>
            {searchTerm && (
              <Button size="small" onClick={() => setSearchTerm("")} sx={{ mt: 2 }}>
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Paper>

      {/* Mobile Bulk Action Bar */}
      {isMobile && selectedCount > 0 && (
        <BulkActionBar selectedCount={selectedCount} totalCount={currentRecords.length} />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Attendance;