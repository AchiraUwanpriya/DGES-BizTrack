// import React, { useState, useEffect } from "react";
// import {
//     Box,
//     Typography,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Paper,
//     Modal,
//     IconButton,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     CircularProgress,
//     FormControl,
//     Select,
//     MenuItem,
//     Chip,
//     Tooltip,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MaintenanceModal = ({ open, handleClose }) => {
//     const [loading, setLoading] = useState(false);
//     const [maintenanceData, setMaintenanceData] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [editValues, setEditValues] = useState({});

//     const [editForm, setEditForm] = useState({
//         status: "",
//         comment: "",
//     });

//     useEffect(() => {
//         if (open) {
//             fetchMaintenanceData();
//         }
//     }, [open]);

//     const fetchMaintenanceData = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 "Reservation/GetFeedbackList"
//             );
//             if (response.data && response.data.ResultSet) {
//                 setMaintenanceData(response.data.ResultSet);
//             }
//         } catch (error) {
//             console.error("Error fetching maintenance data:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Failed to load maintenance data. Please try again.",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (item) => {
//         setEditingId(item.Feed_Id);
//         setEditForm({
//             status: item.Feed_MatStatus || "P",
//             comment: item.Feed_EmpComm || "",
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditForm({
//             ...editForm,
//             [name]: value,
//         });
//     };

//     const handleSave = async (item) => {
//         if (!editForm.status) {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Warning",
//                 text: "Please select a status before saving.",
//             });
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.get(
//                 `Reservation/AddEMPFeedback?P_MATC_STATUS=${editForm.status}&P_RESERVATION_NO=${item.Res_no}&P_EMP_COMMENT=${editForm.comment}&P_FEEDBACK_ID=${item.Feed_Id}`
//             );

//             if (response.data) {
//                 Swal.fire({
//                     icon: "success",
//                     title: "Success",
//                     text: "Maintenance record updated successfully",
//                     timer: 1500,
//                     showConfirmButton: false,
//                 });
//                 setEditingId(null);
//                 fetchMaintenanceData();
//             }
//         } catch (error) {
//             console.error("Error updating maintenance record:", error);
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "Failed to update maintenance record. Please try again.",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelEdit = () => {
//         setEditingId(null);
//     };

//     const getBungalowType = (id) => {
//         const types = {
//             "1": "Main Bungalow",
//             "2": "Family Bungalow",
//         };
//         return types[id] || "Unknown";
//     };

//     const getStatusChip = (status) => {
//         const statusMap = {
//             "P": { color: "warning", label: "Pending" },
//             "C": { color: "success", label: "Completed" },
//             "I": { color: "secondary", label: "In Progress" },
//             "D": { color: "primary", label: "Complete Done" },
//         };

//         const { color = "default", label = "Pending" } = statusMap[status] || {};
//         return <Chip label={label} color={color} size="small" />;
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: "absolute",
//                     top: "48%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     width: { xs: "95%", sm: "90%", md: "80%" },
//                     maxWidth: "1000px",
//                     bgcolor: "background.paper",
//                     boxShadow: 24,
//                     p: { xs: 2, sm: 3 },
//                     borderRadius: 2,
//                 }}
//             >
//                 <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
//                     Maintenance Management
//                 </Typography>
//                 <IconButton
//                     aria-label="close"
//                     onClick={handleClose}
//                     sx={{
//                         position: "absolute",
//                         top: 8,
//                         right: 8,
//                         color: "black",
//                     }}
//                 >
//                     <CloseIcon />
//                 </IconButton>

//                 <Paper
//                     elevation={5}
//                     sx={{
//                         borderRadius: 2,
//                         width: "100%",
//                         overflow: "auto",
//                         maxHeight: "60vh",
//                         mt: 2,
//                     }}
//                 >
//                     <Box sx={{ minWidth: "50px" }}>
//                         <Table size="small">
//                             <TableHead>
//                                 <TableRow sx={{ backgroundColor: "#1976d2" }}>
//                                     <TableCell
//                                         sx={{
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                                             textAlign: "center",
//                                             padding: "12px",
//                                             fontSize: "12px"
//                                         }}
//                                     >
//                                         Bungalow Type
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                                             textAlign: "center",
//                                             padding: "12px",
//                                             fontSize: "12px"
//                                         }}
//                                     >
//                                         Maintenance Report
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                                             textAlign: "center",
//                                             padding: "12px",
//                                             fontSize: "12px"
//                                         }}
//                                     >
//                                         Status
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                                             textAlign: "center",
//                                             padding: "12px",
//                                             fontSize: "12px"
//                                         }}
//                                     >
//                                         Employee comment
//                                     </TableCell>
//                                     <TableCell
//                                         sx={{
//                                             fontWeight: "bold",
//                                             color: "white",
//                                             textAlign: "center",
//                                             padding: "12px",
//                                             fontSize: "12px"
//                                         }}
//                                     >
//                                         Actions
//                                     </TableCell>
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow>
//                                         <TableCell
//                                             colSpan={5}
//                                             sx={{ textAlign: "center", py: 4 }}
//                                         >
//                                             <CircularProgress size={24} />
//                                             <Typography sx={{ ml: 2, display: "inline" }}>
//                                                 Loading...
//                                             </Typography>
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : maintenanceData.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell
//                                             colSpan={5}
//                                             sx={{ textAlign: "center", py: 4 }}
//                                         >
//                                             No maintenance records found
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     maintenanceData.map((item, index) => (
//                                         <TableRow
//                                             key={index}
//                                             sx={{
//                                                 "&:hover": { backgroundColor: "#f5f5f5" },
//                                                 backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
//                                             }}
//                                         >
//                                             <TableCell
//                                                 sx={{ textAlign: "center", padding: "12px", fontSize: "12px" }}
//                                             >
//                                                 {getBungalowType(item.Feed_Banglowid)}
//                                             </TableCell>
//                                             <TableCell
//                                                 sx={{ textAlign: "center", padding: "12px", fontSize: "12px" }}
//                                             >
//                                                 {item.Feed_MatReport || "N/A"}
//                                             </TableCell>
//                                             <TableCell
//                                                 sx={{ textAlign: "center", padding: "12px", fontSize: "12px" }}
//                                             >
//                                                 {editingId === item.Feed_Id ? (
//                                                     <FormControl fullWidth size="small">
//                                                         <Select
//                                                             name="status"
//                                                             value={editForm.status || "P"}
//                                                             onChange={handleChange}
//                                                             displayEmpty
//                                                             sx={{
//                                                                 minWidth: "120px",
//                                                                 "& .MuiSelect-select": {
//                                                                     py: 0.8,
//                                                                     fontSize: "12px"
//                                                                 }
//                                                             }}
//                                                         >
//                                                             <MenuItem value="P"><Chip label="Pending" color="warning" size="small" sx={{ mr: 1 }} /></MenuItem>
//                                                             <MenuItem value="I"><Chip label="In Progress" color="secondary" size="small" sx={{ mr: 1 }} /></MenuItem>
//                                                             <MenuItem value="C"><Chip label="Completed" color="success" size="small" sx={{ mr: 1 }} /></MenuItem>
//                                                             <MenuItem value="D"><Chip label="Complete Done" color="primary" size="small" sx={{ mr: 1 }} /> </MenuItem>
//                                                         </Select>
//                                                     </FormControl>
//                                                 ) : (
//                                                     getStatusChip(item.Feed_MatStatus)
//                                                 )}
//                                             </TableCell>
//                                             <TableCell
//                                                 sx={{ textAlign: "center", padding: "12px", fontSize: "12px" }}
//                                             >
//                                                 {editingId === item.Feed_Id ? (
//                                                     <TextField
//                                                         name="comment"
//                                                         value={editForm.comment}
//                                                         onChange={handleChange}
//                                                         variant="outlined"
//                                                         size="small"
//                                                         placeholder="Enter employee comment"
//                                                         sx={{
//                                                             minWidth: "150px",
//                                                             "& .MuiInputBase-input": {
//                                                                 fontSize: "12px",
//                                                                 py: 0.8
//                                                             }
//                                                         }}
//                                                     />
//                                                 ) : (
//                                                     item.Feed_EmpComm || "N/A"
//                                                 )}
//                                             </TableCell>

//                                             <TableCell
//                                                 sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}
//                                             >
//                                                 {editingId === item.Feed_Id ? (
//                                                     <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
//                                                         <Tooltip title="Save">
//                                                             <IconButton
//                                                                 size="small"
//                                                                 color="primary"
//                                                                 onClick={() => handleSave(item)}
//                                                                 sx={{
//                                                                     backgroundColor: "#e3f2fd",
//                                                                     "&:hover": {
//                                                                         backgroundColor: "#bbdefb",
//                                                                     }
//                                                                 }}
//                                                             >
//                                                                 <SaveIcon fontSize="small" />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                         <Tooltip title="Cancel">
//                                                             <IconButton
//                                                                 size="small"
//                                                                 color="error"
//                                                                 onClick={cancelEdit}
//                                                                 sx={{
//                                                                     backgroundColor: "#ffebee",
//                                                                     "&:hover": {
//                                                                         backgroundColor: "#ffcdd2",
//                                                                     }
//                                                                 }}
//                                                             >
//                                                                 <CloseIcon fontSize="small" />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                     </Box>
//                                                 ) : (
//                                                     <Tooltip title="Edit">
//                                                         <IconButton
//                                                             size="small"
//                                                             color="primary"
//                                                             onClick={() => handleEdit(item)}
//                                                             sx={{
//                                                                 backgroundColor: "#e3f2fd",
//                                                                 "&:hover": {
//                                                                     backgroundColor: "#bbdefb",
//                                                                 }
//                                                             }}
//                                                         >
//                                                             <EditIcon fontSize="small" />
//                                                         </IconButton>
//                                                     </Tooltip>
//                                                 )}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </Box>
//                 </Paper>
//                 <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//                     <Button
//                         variant="contained"
//                         onClick={handleClose}
//                     >
//                         Close
//                     </Button>
//                 </Box>
//             </Box>
//         </Modal>
//     );
// };

// export default MaintenanceModal;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Modal,
//   IconButton,
//   Button,
//   TextField,
//   CircularProgress,
//   FormControl,
//   Select,
//   MenuItem,
//   Chip,
//   Tooltip,
//   Card,
//   CardContent,
//   Grid,
//   Avatar,
//   Link,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import HomeIcon from "@mui/icons-material/Home";
// import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import axios from "axios";
// import Swal from "sweetalert2";

// const ReadMoreText = ({ text, wordLimit = 20 }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   if (!text) return "N/A";

//   const words = text.split(" ");

//   if (words.length <= wordLimit) {
//     return text;
//   }

//   const toggleExpand = (e) => {
//     e.preventDefault();
//     setIsExpanded(!isExpanded);
//   };

//   return isExpanded ? (
//     <span>
//       {text}{" "}
//       <Link
//         href="#"
//         onClick={toggleExpand}
//         sx={{
//           color: "#1976d2",
//           fontSize: "11px",
//           fontWeight: 500,
//           ml: 0.5,
//         }}
//       >
//         See less
//       </Link>
//     </span>
//   ) : (
//     <span>
//       {words.slice(0, wordLimit).join(" ")}{" "}
//       <Link
//         href="#"
//         onClick={toggleExpand}
//         sx={{
//           color: "#1976d2",
//           fontSize: "11px",
//           fontWeight: 500,
//           ml: 0.5,
//         }}
//       >
//         See more
//       </Link>
//     </span>
//   );
// };

// const MaintenanceModal = ({ open, handleClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [maintenanceData, setMaintenanceData] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     status: "",
//     comment: "",
//   });
//   const [selectedBungalowType, setSelectedBungalowType] = useState(null);
//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     if (open) {
//       fetchMaintenanceData();
//     } else {
//       setSelectedBungalowType(null);
//     }
//   }, [open]);

//   const fetchMaintenanceData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("Reservation/GetFeedbackList");
//       if (response.data && response.data.ResultSet) {
//         setMaintenanceData(response.data.ResultSet);
//       }
//     } catch (error) {
//       console.error("Error fetching maintenance data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load maintenance data. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBungalowSelect = (typeId) => {
//     setSelectedBungalowType(typeId);
//     const filtered = maintenanceData.filter(
//       (item) => item.Feed_Banglowid == typeId
//     );
//     setFilteredData(filtered);
//   };

//   const handleBackToSelection = () => {
//     setSelectedBungalowType(null);
//   };

//   const handleEdit = (item) => {
//     setEditingId(item.Feed_Id);
//     setEditForm({
//       status: item.Feed_MatStatus || "P",
//       comment: item.Feed_EmpComm || "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm({
//       ...editForm,
//       [name]: value,
//     });
//   };

//   const handleSave = async (item) => {
//     if (!editForm.status) {
//       Swal.fire({
//         icon: "warning",
//         title: "Warning",
//         text: "Please select a status before saving.",
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `Reservation/AddEMPFeedback?P_MATC_STATUS=${editForm.status}&P_RESERVATION_NO=${item.Res_no}&P_EMP_COMMENT=${editForm.comment}&P_FEEDBACK_ID=${item.Feed_Id}`
//       );

//       if (response.data) {
//         Swal.fire({
//           icon: "success",
//           title: "Success",
//           text: "Maintenance record updated successfully",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setEditingId(null);
//         fetchMaintenanceData();

//         const filtered = maintenanceData.filter(
//           (item) => item.Feed_Banglowid == selectedBungalowType
//         );
//         setFilteredData(filtered);
//       }
//     } catch (error) {
//       console.error("Error updating maintenance record:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update maintenance record. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//   };

//   const getStatusChip = (status) => {
//     const statusMap = {
//       P: { color: "warning", label: "Pending" },
//       C: { color: "success", label: "Completed" },
//       I: { color: "secondary", label: "In Progress" },
//       D: { color: "primary", label: "Complete Done" },
//     };

//     const { color = "default", label = "Pending" } = statusMap[status] || {};
//     return <Chip label={label} color={color} size="small" />;
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "48%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "95%", sm: "90%", md: "80%" },
//           maxWidth: "1000px",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: { xs: 2, sm: 3 },
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
//           Maintenance Management
//         </Typography>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             color: "black",
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//         {!selectedBungalowType ? (
//           <Box sx={{ mt: 4 }}>
//             <Typography
//               variant="h6"
//               sx={{ mb: 3, textAlign: "center", color: "#555" }}
//             >
//               Select Bungalow Type to View Maintenance
//             </Typography>
//             <Grid container spacing={3} justifyContent="center">
//               <Grid item xs={6} sm={6}>
//                 <Card
//                   sx={{
//                     cursor: "pointer",
//                     borderRadius: 3,
//                     transition: "all 0.3s ease",
//                     background:
//                       "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                   onClick={() => handleBungalowSelect("1")}
//                 >
//                   <CardContent sx={{ textAlign: "center", py: 4, px: 3 }}>
//                     <Avatar
//                       sx={{
//                         width: 60,
//                         height: 60,
//                         margin: "0 auto 15px",
//                         bgcolor: "#3f51b5",
//                       }}
//                     >
//                       <HomeIcon fontSize="large" />
//                     </Avatar>
//                     <Typography
//                       variant="h6"
//                       sx={{ mb: 1, fontWeight: 600, color: "#333" }}
//                     >
//                       Main Bungalow
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       sx={{
//                         mt: 1,
//                         borderRadius: 20,
//                         textTransform: "none",
//                         borderColor: "#3f51b5",
//                         color: "#3f51b5",
//                         "&:hover": {
//                           backgroundColor: "#3f51b5",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       View Maintenance
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               <Grid item xs={6} sm={6}>
//                 <Card
//                   sx={{
//                     cursor: "pointer",
//                     borderRadius: 3,
//                     transition: "all 0.3s ease",
//                     background:
//                       "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                   onClick={() => handleBungalowSelect("2")}
//                 >
//                   <CardContent sx={{ textAlign: "center", py: 4, px: 3 }}>
//                     <Avatar
//                       sx={{
//                         width: 60,
//                         height: 60,
//                         margin: "0 auto 15px",
//                         bgcolor: "#e91e63",
//                       }}
//                     >
//                       <FamilyRestroomIcon fontSize="large" />
//                     </Avatar>
//                     <Typography
//                       variant="h6"
//                       sx={{ mb: 1, fontWeight: 600, color: "#333" }}
//                     >
//                       Family Bungalow
//                     </Typography>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       sx={{
//                         mt: 1,
//                         borderRadius: 20,
//                         textTransform: "none",
//                         borderColor: "#e91e63",
//                         color: "#e91e63",
//                         "&:hover": {
//                           backgroundColor: "#e91e63",
//                           color: "#fff",
//                         },
//                       }}
//                     >
//                       View Maintenance
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>
//             <Typography
//               variant="caption"
//               display="block"
//               sx={{ mt: 3, textAlign: "center", color: "#888" }}
//             >
//               Click on a bungalow type to view and manage maintenance requests
//             </Typography>
//           </Box>
//         ) : (
//           <>
//             <Button
//               onClick={handleBackToSelection}
//               sx={{ mt: 1, mb: 2 }}
//               startIcon={<ArrowBackIcon />}
//               color="primary"
//             >
//               Back to Bungalow Selection
//             </Button>

//             <Typography variant="h6" sx={{ mb: 2, color: "#444" }}>
//               {selectedBungalowType === "1"
//                 ? "Main Bungalow"
//                 : "Family Bungalow"}{" "}
//               Maintenance
//             </Typography>

//             <Paper
//               elevation={5}
//               sx={{
//                 borderRadius: 2,
//                 width: "100%",
//                 overflow: "auto",
//                 maxHeight: "60vh",
//                 mt: 1,
//               }}
//             >
//               <Box sx={{ minWidth: "50px" }}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow
//                       sx={{
//                         backgroundColor: "#1976d2",
//                         "& th": {
//                           fontWeight: "bold",
//                           color: "white",
//                           borderRight: "1px solid rgba(255, 255, 255, 0.2)",
//                           textAlign: "center",
//                           padding: "12px",
//                           fontSize: "12px",
//                         },
//                       }}
//                     >
//                       <TableCell>Maintenance Report</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Employee comment</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {loading ? (
//                       <TableRow>
//                         <TableCell
//                           colSpan={4}
//                           sx={{ textAlign: "center", py: 4 }}
//                         >
//                           <CircularProgress size={24} />
//                           <Typography sx={{ ml: 2, display: "inline" }}>
//                             Loading...
//                           </Typography>
//                         </TableCell>
//                       </TableRow>
//                     ) : filteredData.length === 0 ? (
//                       <TableRow>
//                         <TableCell
//                           colSpan={4}
//                           sx={{ textAlign: "center", py: 4, color: "#666" }}
//                         >
//                           No maintenance records found for this bungalow type
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       filteredData.map((item, index) => (
//                         <TableRow
//                           key={index}
//                           sx={{
//                             "&:hover": { backgroundColor: "#f5f5f5" },
//                             backgroundColor:
//                               index % 2 === 0 ? "#fafafa" : "white",
//                           }}
//                         >
//                           <TableCell
//                             sx={{
//                               textAlign: "left",
//                               padding: "12px",
//                               fontSize: "12px",
//                             }}
//                           >
//                             <ReadMoreText
//                               text={item.Feed_MatReport || "N/A"}
//                               wordLimit={4}
//                             />
//                           </TableCell>
//                           <TableCell
//                             sx={{
//                               textAlign: "center",
//                               padding: "12px",
//                               fontSize: "12px",
//                             }}
//                           >
//                             {editingId === item.Feed_Id ? (
//                               <FormControl fullWidth size="small">
//                                 <Select
//                                   name="status"
//                                   value={editForm.status || "P"}
//                                   onChange={handleChange}
//                                   displayEmpty
//                                   sx={{
//                                     minWidth: "120px",
//                                     "& .MuiSelect-select": {
//                                       py: 0.8,
//                                       fontSize: "12px",
//                                     },
//                                   }}
//                                 >
//                                   <MenuItem value="C">
//                                     <Chip
//                                       label="Completed"
//                                       color="success"
//                                       size="small"
//                                       sx={{ mr: 1 }}
//                                     />
//                                   </MenuItem>
//                                   <MenuItem value="D">
//                                     <Chip
//                                       label="Complete Done"
//                                       color="primary"
//                                       size="small"
//                                       sx={{ mr: 1 }}
//                                     />{" "}
//                                   </MenuItem>
//                                 </Select>
//                               </FormControl>
//                             ) : (
//                               getStatusChip(item.Feed_MatStatus)
//                             )}
//                           </TableCell>
//                           <TableCell
//                             sx={{
//                               textAlign: "left",
//                               padding: "12px",
//                               fontSize: "12px",
//                             }}
//                           >
//                             {editingId === item.Feed_Id ? (
//                               <TextField
//                                 name="comment"
//                                 value={editForm.comment}
//                                 onChange={handleChange}
//                                 variant="outlined"
//                                 size="small"
//                                 placeholder="Enter employee comment"
//                                 sx={{
//                                   minWidth: "150px",
//                                   "& .MuiInputBase-input": {
//                                     fontSize: "12px",
//                                     py: 0.8,
//                                   },
//                                 }}
//                               />
//                             ) : (
//                               <ReadMoreText
//                                 text={item.Feed_EmpComm || "N/A"}
//                                 wordLimit={20}
//                               />
//                             )}
//                           </TableCell>

//                           <TableCell
//                             sx={{
//                               textAlign: "center",
//                               padding: "8px",
//                               fontSize: "12px",
//                             }}
//                           >
//                             {editingId === item.Feed_Id ? (
//                               <Box
//                                 sx={{
//                                   display: "flex",
//                                   gap: 1,
//                                   justifyContent: "center",
//                                 }}
//                               >
//                                 <Tooltip title="Save">
//                                   <IconButton
//                                     size="small"
//                                     color="primary"
//                                     onClick={() => handleSave(item)}
//                                     sx={{
//                                       backgroundColor: "#e3f2fd",
//                                       "&:hover": {
//                                         backgroundColor: "#bbdefb",
//                                       },
//                                     }}
//                                   >
//                                     <SaveIcon fontSize="small" />
//                                   </IconButton>
//                                 </Tooltip>
//                                 <Tooltip title="Cancel">
//                                   <IconButton
//                                     size="small"
//                                     color="error"
//                                     onClick={cancelEdit}
//                                     sx={{
//                                       backgroundColor: "#ffebee",
//                                       "&:hover": {
//                                         backgroundColor: "#ffcdd2",
//                                       },
//                                     }}
//                                   >
//                                     <CloseIcon fontSize="small" />
//                                   </IconButton>
//                                 </Tooltip>
//                               </Box>
//                             ) : (
//                               <Tooltip title="Edit">
//                                 <IconButton
//                                   size="small"
//                                   color="primary"
//                                   onClick={() => handleEdit(item)}
//                                   sx={{
//                                     backgroundColor: "#e3f2fd",
//                                     "&:hover": {
//                                       backgroundColor: "#bbdefb",
//                                     },
//                                   }}
//                                 >
//                                   <EditIcon fontSize="small" />
//                                 </IconButton>
//                               </Tooltip>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       ))
//                     )}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </Paper>
//             <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//               <Button
//                 variant="contained"
//                 onClick={handleClose}
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1,
//                   textTransform: "none",
//                   fontWeight: 500,
//                 }}
//               >
//                 Close
//               </Button>
//             </Box>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default MaintenanceModal;



import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Card,
  CardContent,
  Grid,
  Avatar,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import HomeIcon from "@mui/icons-material/Home";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Swal from "sweetalert2";

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

const MaintenanceModal = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    comment: "",
  });
  const [selectedBungalowType, setSelectedBungalowType] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (open) {
      fetchMaintenanceData();
    } else {
      setSelectedBungalowType(null);
    }
  }, [open]);

  const fetchMaintenanceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("Reservation/GetFeedbackList");
      if (response.data && response.data.ResultSet) {
        setMaintenanceData(response.data.ResultSet);
      }
    } catch (error) {
      console.error("Error fetching maintenance data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load maintenance data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBungalowSelect = (typeId) => {
    setSelectedBungalowType(typeId);
    const filtered = maintenanceData.filter(
      (item) => item.Feed_Banglowid == typeId
    );
    setFilteredData(filtered);
  };

  const handleBackToSelection = () => {
    setSelectedBungalowType(null);
  };

  const handleEdit = (item) => {
    setEditingId(item.Feed_Id);
    setEditForm({
      status: item.Feed_MatStatus || "P",
      comment: item.Feed_EmpComm || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSave = async (item) => {
    if (!editForm.status) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select a status before saving.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `Reservation/AddEMPFeedback?P_MATC_STATUS=${editForm.status}&P_RESERVATION_NO=${item.Res_no}&P_EMP_COMMENT=${editForm.comment}&P_FEEDBACK_ID=${item.Feed_Id}`
      );

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Maintenance record updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setEditingId(null);
        fetchMaintenanceData();

        const filtered = maintenanceData.filter(
          (item) => item.Feed_Banglowid == selectedBungalowType
        );
        setFilteredData(filtered);
      }
    } catch (error) {
      console.error("Error updating maintenance record:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update maintenance record. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const getStatusChip = (status) => {
    const statusMap = {
      P: { color: "warning", label: "Pending" },
      C: { color: "success", label: "Completed" },
      I: { color: "secondary", label: "In Progress" },
      D: { color: "primary", label: "Complete Done" },
    };

    const { color = "default", label = "Pending" } = statusMap[status] || {};
    return <Chip label={label} color={color} size="small" />;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", sm: "90%", md: "80%" },
          maxWidth: "1000px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 1, sm: 3 },
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
          Maintenance Management
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>

        {!selectedBungalowType ? (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{ mb: 3, textAlign: "center", color: "#555" }}
            >
              Select Bungalow Type to View Maintenance
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={16} sm={6}>
                {/* <Grid item xs={6} sm={6}> */}
                <Card
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => handleBungalowSelect("1")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4, px: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        margin: "0 auto 15px",
                        bgcolor: "#3f51b5",
                      }}
                    >
                      <HomeIcon fontSize="large" />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 600, color: "#333" }}
                    >
                      Main Bungalow
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        mt: 1,
                        borderRadius: 20,
                        textTransform: "none",
                        borderColor: "#3f51b5",
                        color: "#3f51b5",
                        "&:hover": {
                          backgroundColor: "#3f51b5",
                          color: "#fff",
                        },
                      }}
                    >
                      View Maintenance
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} sm={6}>
                {/* <Card
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    background:
                      "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => handleBungalowSelect("2")}
                >
                  <CardContent sx={{ textAlign: "center", py: 4, px: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        margin: "0 auto 15px",
                        bgcolor: "#e91e63",
                      }}
                    >
                      <FamilyRestroomIcon fontSize="large" />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 600, color: "#333" }}
                    >
                      Lower Garden  
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        mt: 1,
                        borderRadius: 20,
                        textTransform: "none",
                        borderColor: "#e91e63",
                        color: "#e91e63",
                        "&:hover": {
                          backgroundColor: "#e91e63",
                          color: "#fff",
                        },
                      }}
                    >
                      View Maintenance
                    </Button>
                  </CardContent>
                </Card> */}
              </Grid>
            </Grid>
            <Typography
              variant="caption"
              display="block"
              sx={{ mt: 3, textAlign: "center", color: "#888" }}
            >
              Click on a bungalow type to view and manage maintenance requests
            </Typography>
          </Box>
        ) : (
          <>
            <Button
              onClick={handleBackToSelection}
              sx={{ mt: 1, mb: 2 }}
              startIcon={<ArrowBackIcon />}
              color="primary"
            >
              Back to Bungalow Selection
            </Button>

            <Typography variant="h6" sx={{ mb: 2, color: "#444" }}>
              {selectedBungalowType === "1"
                ? "Main Bungalow"
                : "Lower Garden Suite"}{" "}
              Maintenance
            </Typography>

            <Paper
              elevation={6}
              sx={{
                borderRadius: 1,
                width: "100%",
                overflow: "auto",
                maxHeight: "60vh",
                mt: 1,
              }}
            >
              <Box sx={{ minWidth: "50px" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#1976d2",
                        "& th": {
                          fontWeight: "bold",
                          color: "white",
                          borderRight: "1px solid rgba(255, 255, 255, 0.2)",
                          textAlign: "center",
                          padding: "6px",
                          fontSize: "11px",
                        },
                      }}
                    >
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Repoter</TableCell> */}
                      <TableCell>Maintenance Report</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Employee comment</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          sx={{ textAlign: "center", py: 4 }}
                        >
                          <CircularProgress size={24} />
                          <Typography sx={{ ml: 2, display: "inline" }}>
                            Loading...
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : filteredData.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          sx={{ textAlign: "center", py: 4, color: "#666" }}
                        >
                          No maintenance records found for this bungalow type
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredData.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            backgroundColor:
                              index % 2 === 0 ? "#fafafa" : "white",
                          }}
                        >
                          <TableCell
                            sx={{
                              textAlign: "left",
                              padding: "12px",
                              fontSize: "12px",
                            }}
                          >
                            <ReadMoreText text={item.created_date || "N/A"} />
                          </TableCell>
                          {/* <TableCell
                            sx={{
                              textAlign: "left",
                              padding: "12px",
                              fontSize: "12px",
                            }}
                          >
                            <ReadMoreText
                              text={item.created_by || "N/A"}
                              wordLimit={4}
                            />
                          </TableCell> */}
                          <TableCell
                            sx={{
                              textAlign: "left",
                              padding: "12px",
                              fontSize: "12px",
                            }}
                          >
                            <Typography variant="body2">
                              <ReadMoreText
                                text={item.Feed_MatReport || "N/A"}
                                wordLimit={3}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                              padding: "12px",
                              fontSize: "12px",
                            }}
                          >
                            {editingId === item.Feed_Id ? (
                              <FormControl fullWidth size="small">
                                <Select
                                  name="status"
                                  value={editForm.status || "P"}
                                  onChange={handleChange}
                                  displayEmpty
                                  sx={{
                                    minWidth: "120px",
                                    "& .MuiSelect-select": {
                                      py: 0.8,
                                      fontSize: "12px",
                                    },
                                  }}
                                >
                                  <MenuItem value="C">
                                    <Chip
                                      label="Completed"
                                      color="success"
                                      size="small"
                                      sx={{ mr: 1 }}
                                    />
                                  </MenuItem>
                                  <MenuItem value="D">
                                    <Chip
                                      label="Complete Done"
                                      color="primary"
                                      size="small"
                                      sx={{ mr: 1 }}
                                    />{" "}
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            ) : (
                              getStatusChip(item.Feed_MatStatus)
                            )}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "left",
                              padding: "12px",
                              fontSize: "12px",
                            }}
                          >
                            {editingId === item.Feed_Id ? (
                              <TextField
                                name="comment"
                                value={editForm.comment}
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                placeholder="Enter employee comment"
                                sx={{
                                  minWidth: "150px",
                                  "& .MuiInputBase-input": {
                                    fontSize: "12px",
                                    py: 0.8,
                                  },
                                }}
                              />
                            ) : (
                              <ReadMoreText
                                text={item.Feed_MatComment || "N/A"}
                                wordLimit={20}
                              />
                            )}
                          </TableCell>

                          <TableCell
                            sx={{
                              textAlign: "center",
                              padding: "8px",
                              fontSize: "12px",
                            }}
                          >
                            {editingId === item.Feed_Id ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  justifyContent: "center",
                                }}
                              >
                                <Tooltip title="Save">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handleSave(item)}
                                    sx={{
                                      backgroundColor: "#e3f2fd",
                                      "&:hover": {
                                        backgroundColor: "#bbdefb",
                                      },
                                    }}
                                  >
                                    <SaveIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Cancel">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={cancelEdit}
                                    sx={{
                                      backgroundColor: "#ffebee",
                                      "&:hover": {
                                        backgroundColor: "#ffcdd2",
                                      },
                                    }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            ) : (
                              <Tooltip title="Edit">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => handleEdit(item)}
                                  sx={{
                                    backgroundColor: "#e3f2fd",
                                    "&:hover": {
                                      backgroundColor: "#bbdefb",
                                    },
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Close
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MaintenanceModal;
