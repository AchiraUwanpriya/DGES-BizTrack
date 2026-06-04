// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import axios from "axios";
// import dayjs from "dayjs";
// import Loader from "../../components/Utility/Loader";

// const Rfid_Attendence = () => {
//   const [selectedTab, setSelectedTab] = useState("Tab1");
//   const [selectedDate, setSelectedDate] = useState(
//     dayjs().format("YYYY-MM-DD")
//   );
//   const [deviceNumber, setDeviceNumber] = useState("");
//   const [rfidData, setRfidData] = useState([]);
//   const [subcontractData, setSubcontractData] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("Hambanthota");
//   const [loading, setLoading] = useState(true);

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleDeviceNumberChange = (event) => {
//     const value = event.target.value.replace(/\D/g, "");
//     setDeviceNumber(value);
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       const fetchRfidDetails = async () => {
//         if (selectedDate) {
//           let P_IN, P_OUT;

//           switch (selectedLocation) {
//             case "Hambanthota":
//               P_IN = "28";
//               P_OUT = "29";
//               break;
//             case "Trincomalee":
//               P_IN = "30";
//               P_OUT = "31";
//               break;
//             case "KRY":
//               P_IN = "32";
//               P_OUT = "33";
//               break;
//             default:
//               P_IN = "01";
//               P_OUT = "02";
//           }

//           try {
//             const response = await axios.get(
//               `Rfid/GetRfidDetails?P_DATE=${selectedDate}&P_IN=${P_IN}&P_OUT=${P_OUT}`
//             );
//             setRfidData(response.data.ResultSet || []);
//           } catch (error) {
//             console.error("Error fetching RFID data", error);
//             setRfidData([]);
//           }
//         }
//       };

//       const fetchSubcontractDetails = async () => {
//         if (selectedDate) {
//           try {
//             const response = await axios.get(
//               `Rfid/GetSubDetails?P_DATE=${selectedDate}`
//             );
//             setSubcontractData(response.data.ResultSet || []);
//           } catch (error) {
//             console.error("Error fetching subcontract data", error);
//             setSubcontractData([]);
//           }
//         }
//       };

//       try {
//         if (selectedTab === "Tab1") {
//           await fetchRfidDetails();
//         } else if (selectedTab === "Tab2") {
//           await fetchSubcontractDetails();
//         }
//       } catch (error) {
//         console.error("Data fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedDate, selectedTab, selectedLocation]);

//   const renderComponent = () => {
//     if (loading) {
//       return <Loader text="Loading Attendance Data..." />;
//     }

//     switch (selectedTab) {
//       case "Tab1":
//         return (
//           <Box>
//             <Box
//               sx={{
//                 marginBottom: 2,
//                 marginTop: 4,
//                 display: "flex",
//                 alignItems: "center",
//                 position: "sticky",
//                 top: 0,
//                 backgroundColor: "white",
//                 zIndex: 1,
//                 padding: "16px 0",
//               }}
//             >
//               <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 InputLabelProps={{ shrink: true }}
//                 sx={{ marginRight: 2 }}
//               />
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel id="location-select-label">Location</InputLabel>
//                 <Select
//                   labelId="location-select-label"
//                   value={selectedLocation}
//                   onChange={handleLocationChange}
//                   label="Location"
//                 >
//                   <MenuItem value="Hambanthota">Hambanthota</MenuItem>
//                   <MenuItem value="Trincomalee">Trincomalee</MenuItem>
//                   <MenuItem value="KRY">KRY</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//             <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
//               <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
//                 <TableHead
//                   sx={{
//                     position: "sticky",
//                     top: 0,
//                     backgroundColor: "#1976d2",
//                     zIndex: 1,
//                   }}
//                 >
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "5px",
//                       }}
//                     >
//                       #
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "10px",
//                       }}
//                     >
//                       Service No
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "10px",
//                       }}
//                     >
//                       Card No
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "40px",
//                       }}
//                     >
//                       Name
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "45px",
//                       }}
//                     >
//                       In Time
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "45px",
//                       }}
//                     >
//                       Out Time
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rfidData.length > 0 ? (
//                     rfidData.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {index + 1}
//                         </TableCell>
//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {row.Service_no}
//                         </TableCell>
//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {row.Prox_no}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "left", fontSize: "12px" }}>
//                           {row.Name}
//                         </TableCell>

//                         <TableCell
//                           sx={{ textAlign: "Center", fontSize: "12px" }}
//                         >
//                           {row.Intime
//                             ? dayjs(row.Intime).format("MM/DD HH:mm")
//                             : "-"}
//                         </TableCell>

//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {row.OutTime
//                             ? dayjs(row.OutTime).format("MM/DD HH:mm")
//                             : "-"}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={5}
//                         sx={{ textAlign: "center", padding: "16px" }}
//                       >
//                         <Typography
//                           variant="body1"
//                           sx={{ color: "text.secondary" }}
//                         >
//                           No data found
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Box>
//         );

//         //-----------------------------------------------Tab 2------------------------------------------------------
//       case "Tab2":
//         return (
//           <Box>
//             <Box
//               sx={{
//                 marginBottom: 2,
//                 marginTop: 4,
//                 display: "flex",
//                 alignItems: "center",
//                 position: "sticky",
//                 top: 0,
//                 backgroundColor: "white",
//                 zIndex: 1,
//                 padding: "16px 0",
//               }}
//             >
//               <TextField
//                 label="Date"
//                 type="date"
//                 value={selectedDate}
//                 onChange={handleDateChange}
//                 InputLabelProps={{ shrink: true }}
//                 sx={{ marginRight: 2 }}
//               />
//             </Box>
//             <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
//               <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
//                 <TableHead
//                   sx={{
//                     position: "sticky",
//                     top: 0,
//                     backgroundColor: "#1976d2",
//                     zIndex: 1,
//                   }}
//                 >
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "5px",
//                       }}
//                     >
//                       #
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "10px",
//                       }}
//                     >
//                       User ID
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "40px",
//                       }}
//                     >
//                       Name
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "45px",
//                       }}
//                     >
//                       In Time
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "45px",
//                       }}
//                     >
//                       Out Time
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {subcontractData.length > 0 ? (
//                     subcontractData.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {index + 1}
//                         </TableCell>
//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {row.Sub_UID}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "left", fontSize: "12px" }}>
//                           {row.Sub_Name}
//                         </TableCell>
//                         <TableCell
//                           sx={{ textAlign: "Center", fontSize: "12px" }}
//                         >
//                           {row.Sub_InTime
//                             ? dayjs(row.Sub_InTime).format("MM/DD HH:mm")
//                             : "-"}
//                         </TableCell>

//                         <TableCell
//                           sx={{ textAlign: "center", fontSize: "12px" }}
//                         >
//                           {row.Sub_OutTime
//                             ? dayjs(row.Sub_OutTime).format("MM/DD HH:mm")
//                             : "-"}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={4}
//                         sx={{ textAlign: "center", padding: "16px" }}
//                       >
//                         <Typography
//                           variant="body1"
//                           sx={{ color: "text.secondary" }}
//                         >
//                           No data found
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box
//       sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(2, 1fr)",
//           gap: "2px",
//           marginTop: 2,
//           width: "100%",
//           maxWidth: "500px",
//         }}
//       >
//         {["Tab1", "Tab2"].map((tab, index) => (
//           <Button
//             key={tab}
//             variant={selectedTab === tab ? "contained" : "outlined"}
//             onClick={() => handleTabChange(tab)}
//             sx={{
//               borderRadius:
//                 index % 2 === 0
//                   ? "8px 0 0 8px"
//                   : index % 2 === 1
//                   ? "0 8px 8px 0"
//                   : 0,
//               backgroundColor: selectedTab === tab ? "#5ac8fa" : "transparent",
//               "&:hover": {
//                 backgroundColor: selectedTab === tab ? "#5ac8fa" : "#f1f1f1",
//               },
//               padding: "14px 34px",
//               fontSize: "16px",
//               width: "100%",
//             }}
//           >
//             {tab === "Tab1" ? "CDPLC" : "SUBCONTRACT"}
//           </Button>
//         ))}
//       </Box>

//       <Paper
//         elevation={1}
//         sx={{ padding: 1, marginTop: 2, width: "100%", maxWidth: "800px" }}
//       >
//         <Box sx={{ marginTop: 2 }}>
//           <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
//             {selectedTab === "Tab1"
//               ? "RFID Attendance"
//               : "FACE Recognition Attendance"}
//           </Typography>
//           {renderComponent()}
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Rfid_Attendence;




//-------------------------------------------------------2025-08-21-------------------------------------->


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   IconButton,
//   Collapse,
// } from "@mui/material";
// import axios from "axios";
// import dayjs from "dayjs";
// import Loader from "../../components/Utility/Loader";
// import SearchIcon from "@mui/icons-material/Search";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// const Rfid_Attendence = () => {
//   const [selectedTab, setSelectedTab] = useState("Tab1");
//   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [startDate, setStartDate] = useState(dayjs().startOf('month').format("YYYY-MM-DD"));
//   const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [serviceNumber, setServiceNumber] = useState("");
//   const [rfidData, setRfidData] = useState([]);
//   const [subcontractData, setSubcontractData] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState("Hambanthota");
//   const [loading, setLoading] = useState(true);
//   const [searchMode, setSearchMode] = useState(false);
//   const [expandedSearch, setExpandedSearch] = useState(false);

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     setSearchMode(false);
//     setExpandedSearch(false);
//   };

//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };

//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };

//   const handleServiceNumberChange = (event) => {
//     setServiceNumber(event.target.value);
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const toggleSearchMode = () => {
//     setSearchMode(!searchMode);
//     if (!searchMode) {
//       setExpandedSearch(true);
//     }
//   };

//   const toggleExpandSearch = () => {
//     setExpandedSearch(!expandedSearch);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       const fetchRfidDetails = async () => {
//         if (selectedDate) {
//           let P_IN, P_OUT;

//           switch (selectedLocation) {
//             case "Hambanthota":
//               P_IN = "28";
//               P_OUT = "29";
//               break;
//             case "Trincomalee":
//               P_IN = "30";
//               P_OUT = "31";
//               break;
//             case "KRY":
//               P_IN = "32";
//               P_OUT = "33";
//               break;
//             default:
//               P_IN = "01";
//               P_OUT = "02";
//           }

//           try {
//             const response = await axios.get(
//               `Rfid/GetRfidDetails?P_DATE=${selectedDate}&P_IN=${P_IN}&P_OUT=${P_OUT}`
//             );
//             setRfidData(response.data.ResultSet || []);
//           } catch (error) {
//             console.error("Error fetching RFID data", error);
//             setRfidData([]);
//           }
//         }
//       };

//       const fetchRfidDetailsById = async () => {
//         if (serviceNumber && startDate && endDate) {
//           let P_IN, P_OUT;

//           switch (selectedLocation) {
//             case "Hambanthota":
//               P_IN = "28";
//               P_OUT = "29";
//               break;
//             case "Trincomalee":
//               P_IN = "30";
//               P_OUT = "31";
//               break;
//             case "KRY":
//               P_IN = "32";
//               P_OUT = "33";
//               break;
//             default:
//               P_IN = "01";
//               P_OUT = "02";
//           }

//           try {
//             const response = await axios.get(
//               `Rfid/GetRfidDetailsbyid?P_SDATE=${startDate}&P_EDATE=${endDate}&P_SNO=${serviceNumber}&P_IN=${P_IN}&P_OUT=${P_OUT}`
//             );
//             setRfidData(response.data.ResultSet || []);
//           } catch (error) {
//             console.error("Error fetching RFID data by ID", error);
//             setRfidData([]);
//           }
//         }
//       };

//       const fetchSubcontractDetails = async () => {
//         if (selectedDate) {
//           try {
//             const response = await axios.get(
//               `Rfid/GetSubDetails?P_DATE=${selectedDate}`
//             );
//             setSubcontractData(response.data.ResultSet || []);
//           } catch (error) {
//             console.error("Error fetching subcontract data", error);
//             setSubcontractData([]);
//           }
//         }
//       };

//       const fetchSubcontractDetailsById = async () => {
//         if (serviceNumber && startDate && endDate) {
//           try {
//             const response = await axios.get(
//               `Rfid/GetSubDetailsbyId?P_SDATE=${startDate}&P_EDATE=${endDate}&P_SNO=${serviceNumber}`
//             );
//             setSubcontractData(response.data.ResultSet || []);
//           } catch (error) {
//             console.error("Error fetching subcontract data by ID", error);
//             setSubcontractData([]);
//           }
//         }
//       };

//       try {
//         if (selectedTab === "Tab1") {
//           if (searchMode && serviceNumber) {
//             await fetchRfidDetailsById();
//           } else {
//             await fetchRfidDetails();
//           }
//         } else if (selectedTab === "Tab2") {
//           if (searchMode && serviceNumber) {
//             await fetchSubcontractDetailsById();
//           } else {
//             await fetchSubcontractDetails();
//           }
//         }
//       } catch (error) {
//         console.error("Data fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedDate, selectedTab, selectedLocation, searchMode, serviceNumber, startDate, endDate]);

//   const renderSearchControls = () => {
//     return (
//       <Box sx={{ mb: 2, width: '100%' }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Button
//             variant="outlined"
//             onClick={toggleSearchMode}
//             startIcon={<SearchIcon />}
//             sx={{ mr: 2 }}
//           >
//             {searchMode ? 'Show Daily View' : 'Search by Employee'}
//           </Button>
          
//           {searchMode && (
//             <IconButton onClick={toggleExpandSearch}>
//               {expandedSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </IconButton>
//           )}
//         </Box>

//         <Collapse in={expandedSearch && searchMode}>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="Start Date"
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label="End Date"
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 InputLabelProps={{ shrink: true }}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 label={selectedTab === "Tab1" ? "Service Number" : "User ID"}
//                 value={serviceNumber}
//                 onChange={handleServiceNumberChange}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//         </Collapse>
//       </Box>
//     );
//   };

//   const renderComponent = () => {
//     if (loading) {
//       return <Loader text="Loading Attendance Data..." />;
//     }

//     switch (selectedTab) {
//       case "Tab1":
//         return (
//           <Box>
//             {renderSearchControls()}
            
//             {!searchMode && (
//               <Box
//                 sx={{
//                   marginBottom: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   position: "sticky",
//                   top: 0,
//                   backgroundColor: "white",
//                   zIndex: 1,
//                   padding: "16px 0",
//                 }}
//               >
//                 <TextField
//                   label="Date"
//                   type="date"
//                   value={selectedDate}
//                   onChange={handleDateChange}
//                   InputLabelProps={{ shrink: true }}
//                   sx={{ marginRight: 2 }}
//                 />
//                 <FormControl sx={{ minWidth: 120 }}>
//                   <InputLabel id="location-select-label">Location</InputLabel>
//                   <Select
//                     labelId="location-select-label"
//                     value={selectedLocation}
//                     onChange={handleLocationChange}
//                     label="Location"
//                   >
//                     <MenuItem value="Hambanthota">Hambanthota</MenuItem>
//                     <MenuItem value="Trincomalee">Trincomalee</MenuItem>
//                     <MenuItem value="KRY">KRY</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//             )}
            
//             <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
//               <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
//                 <TableHead
//                   sx={{
//                     position: "sticky",
//                     top: 0,
//                     backgroundColor: "#1976d2",
//                     zIndex: 1,
//                   }}
//                 >
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                         width: "5px",
//                       }}
//                     >
//                       #
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Service No
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Card No
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Name
//                     </TableCell>
//                     {searchMode && (
//                       <TableCell
//                         sx={{
//                           fontWeight: "bold",
//                           fontSize: "12px",
//                           color: "white",
//                           textAlign: "center",
//                         }}
//                       >
//                         Date
//                       </TableCell>
//                     )}
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       In Time
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Out Time
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {rfidData.length > 0 ? (
//                     rfidData.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {index + 1}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.Service_no}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.Prox_no}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "left", fontSize: "12px" }}>
//                           {row.Name}
//                         </TableCell>
//                         {searchMode && (
//                           <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                             {row.Intime ? dayjs(row.Intime).format("MM/DD") : "-"}
//                           </TableCell>
//                         )}
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.Intime ? dayjs(row.Intime).format("HH:mm") : "-"}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.OutTime ? dayjs(row.OutTime).format("HH:mm") : "-"}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={searchMode ? 7 : 6}
//                         sx={{ textAlign: "center", padding: "16px" }}
//                       >
//                         <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                           No data found
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Box>
//         );

//       case "Tab2":
//         return (
//           <Box>
//             {renderSearchControls()}
            
//             {!searchMode && (
//               <Box
//                 sx={{
//                   marginBottom: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   position: "sticky",
//                   top: 0,
//                   backgroundColor: "white",
//                   zIndex: 1,
//                   padding: "16px 0",
//                 }}
//               >
//                 <TextField
//                   label="Date"
//                   type="date"
//                   value={selectedDate}
//                   onChange={handleDateChange}
//                   InputLabelProps={{ shrink: true }}
//                   sx={{ marginRight: 2 }}
//                 />
//               </Box>
//             )}
            
//             <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
//               <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
//                 <TableHead
//                   sx={{
//                     position: "sticky",
//                     top: 0,
//                     backgroundColor: "#1976d2",
//                     zIndex: 1,
//                   }}
//                 >
//                   <TableRow>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       #
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       User ID
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Name
//                     </TableCell>
//                     {searchMode && (
//                       <TableCell
//                         sx={{
//                           fontWeight: "bold",
//                           fontSize: "12px",
//                           color: "white",
//                           textAlign: "center",
//                         }}
//                       >
//                         Date
//                       </TableCell>
//                     )}
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       In Time
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         color: "white",
//                         textAlign: "center",
//                       }}
//                     >
//                       Out Time
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {subcontractData.length > 0 ? (
//                     subcontractData.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {index + 1}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.Sub_UID}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "left", fontSize: "12px" }}>
//                           {row.Sub_Name}
//                         </TableCell>
//                         {searchMode && (
//                           <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                             {row.Sub_InTime ? dayjs(row.Sub_InTime).format("MM/DD") : "-"}
//                           </TableCell>
//                         )}
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.Sub_InTime ? dayjs(row.Sub_InTime).format("HH:mm") : "-"}
//                         </TableCell>
//                         <TableCell sx={{ textAlign: "center", fontSize: "12px" }}>
//                           {row.Sub_OutTime ? dayjs(row.Sub_OutTime).format("HH:mm") : "-"}
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell
//                         colSpan={searchMode ? 6 : 5}
//                         sx={{ textAlign: "center", padding: "16px" }}
//                       >
//                         <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                           No data found
//                         </Typography>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "repeat(2, 1fr)",
//           gap: "2px",
//           marginTop: 2,
//           width: "100%",
//           maxWidth: "500px",
//         }}
//       >
//         {["Tab1", "Tab2"].map((tab, index) => (
//           <Button
//             key={tab}
//             variant={selectedTab === tab ? "contained" : "outlined"}
//             onClick={() => handleTabChange(tab)}
//             sx={{
//               borderRadius:
//                 index % 2 === 0
//                   ? "8px 0 0 8px"
//                   : index % 2 === 1
//                   ? "0 8px 8px 0"
//                   : 0,
//               backgroundColor: selectedTab === tab ? "#5ac8fa" : "transparent",
//               "&:hover": {
//                 backgroundColor: selectedTab === tab ? "#5ac8fa" : "#f1f1f1",
//               },
//               padding: "14px 34px",
//               fontSize: "16px",
//               width: "100%",
//             }}
//           >
//             {tab === "Tab1" ? "CDPLC" : "SUBCONTRACT"}
//           </Button>
//         ))}
//       </Box>

//       <Paper
//         elevation={1}
//         sx={{ padding: 2, marginTop: 2, width: "100%", maxWidth: "1000px" }}
//       >
//         <Box sx={{ marginTop: 2 }}>
//           <Typography variant="h6" sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
//             {selectedTab === "Tab1"
//               ? "RFID Attendance"
//               : "FACE Recognition Attendance"}
//           </Typography>
//           {renderComponent()}
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Rfid_Attendence;




import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Collapse,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import Loader from "../../components/Utility/Loader";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Rfid_Attendence = () => {
  const [selectedTab, setSelectedTab] = useState("Tab1");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [serviceNumber, setServiceNumber] = useState("");
  const [rfidData, setRfidData] = useState([]);
  const [subcontractData, setSubcontractData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Hambanthota");
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [expandedSearch, setExpandedSearch] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false);  

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSearchMode(false);
    setExpandedSearch(false);
  };

  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);
  const handleServiceNumberChange = (event) => setServiceNumber(event.target.value);
  const handleLocationChange = (event) => setSelectedLocation(event.target.value);

  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
    if (!searchMode) setExpandedSearch(true);
  };
  const toggleExpandSearch = () => setExpandedSearch(!expandedSearch);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const fetchRfidDetails = async () => {
        if (selectedDate) {
          let P_IN, P_OUT;
          switch (selectedLocation) {
            case "Hambanthota":
              P_IN = "28"; P_OUT = "29"; break;
            case "Trincomalee":
              P_IN = "30"; P_OUT = "31"; break;
            case "KRY":
              P_IN = "32"; P_OUT = "33"; break;
            default:
              P_IN = "01"; P_OUT = "02";
          }
          try {
            const res = await axios.get(
              `Rfid/GetRfidDetails?P_DATE=${selectedDate}&P_IN=${P_IN}&P_OUT=${P_OUT}`
            );
            setRfidData(res.data.ResultSet || []);
          } catch {
            setRfidData([]);
          }
        }
      };

      const fetchRfidDetailsById = async () => {
        if (serviceNumber && startDate && endDate) {
          let P_IN, P_OUT;
          switch (selectedLocation) {
            case "Hambanthota":
              P_IN = "28"; P_OUT = "29"; break;
            case "Trincomalee":
              P_IN = "30"; P_OUT = "31"; break;
            case "KRY":
              P_IN = "32"; P_OUT = "33"; break;
            default:
              P_IN = "01"; P_OUT = "02";
          }
          try {
            const res = await axios.get(
              `Rfid/GetRfidDetailsbyid?P_SDATE=${startDate}&P_EDATE=${endDate}&P_SNO=${serviceNumber}&P_IN=${P_IN}&P_OUT=${P_OUT}`
            );
            setRfidData(res.data.ResultSet || []);
          } catch {
            setRfidData([]);
          }
        }
      };

      const fetchSubcontractDetails = async () => {
        if (selectedDate) {
          try {
            const res = await axios.get(`Rfid/GetSubDetails?P_DATE=${selectedDate}`);
            setSubcontractData(res.data.ResultSet || []);
          } catch {
            setSubcontractData([]);
          }
        }
      };

      const fetchSubcontractDetailsById = async () => {
        if (serviceNumber && startDate && endDate) {
          try {
            const res = await axios.get(
              `Rfid/GetSubDetailsbyId?P_SDATE=${startDate}&P_EDATE=${endDate}&P_SNO=${serviceNumber}`
            );
            setSubcontractData(res.data.ResultSet || []);
          } catch {
            setSubcontractData([]);
          }
        }
      };

      try {
        if (selectedTab === "Tab1") {
          if (searchMode && serviceNumber) {
            await fetchRfidDetailsById();
          } else {
            await fetchRfidDetails();
          }
        } else if (selectedTab === "Tab2") {
          if (searchMode && serviceNumber) {
            await fetchSubcontractDetailsById();
          } else {
            await fetchSubcontractDetails();
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, selectedTab, selectedLocation, searchMode, startDate, endDate, triggerSearch]); 
  const renderSearchControls = () => (
    <Box sx={{ mb: 2, width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={toggleSearchMode}
          startIcon={<SearchIcon />}
          sx={{ mr: 2 }}
        >
          {searchMode ? "Show Daily View" : "Search by Employee"}
        </Button>
        {searchMode && (
          <IconButton onClick={toggleExpandSearch}>
            {expandedSearch ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>

      <Collapse in={expandedSearch && searchMode}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              label={selectedTab === "Tab1" ? "Service Number" : "User ID"}
              value={serviceNumber}
              onChange={handleServiceNumberChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") setTriggerSearch((prev) => !prev);
              }}
              fullWidth
            />
            <IconButton color="primary" onClick={() => setTriggerSearch((prev) => !prev)}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );

  const renderComponent = () => {
    if (loading) return <Loader text="Loading Attendance Data..." />;

    switch (selectedTab) {
      case "Tab1":
        return (
          <Box>
            {renderSearchControls()}
            {!searchMode && (
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <TextField
                  label="Date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mr: 2 }}
                />
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="location-select-label">Location</InputLabel>
                  <Select
                    labelId="location-select-label"
                    value={selectedLocation}
                    onChange={handleLocationChange}
                  >
                    <MenuItem value="Hambanthota">Hambanthota</MenuItem>
                    <MenuItem value="Trincomalee">Trincomalee</MenuItem>
                    <MenuItem value="KRY">KRY</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
            <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
              <Table size="small">
                <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>#</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Service No</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Card No</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Name</TableCell>
                    {searchMode && (
                      <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Date</TableCell>
                    )}
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>In Time</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Out Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rfidData.length > 0 ? (
                    rfidData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{row.Service_no}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{row.Prox_no}</TableCell>
                        <TableCell>{row.Name}</TableCell>
                        {searchMode && (
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.Intime ? dayjs(row.Intime).format("MM/DD") : "-"}
                          </TableCell>
                        )}
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.Intime ? dayjs(row.Intime).format("HH:mm") : "-"}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.OutTime ? dayjs(row.OutTime).format("HH:mm") : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={searchMode ? 7 : 6} sx={{ textAlign: "center" }}>
                        <Typography>No data found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Box>
        );

      case "Tab2":
        return (
          <Box>
            {renderSearchControls()}
            {!searchMode && (
              <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                <TextField
                  label="Date"
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            )}
            <Box sx={{ maxHeight: "400px", overflow: "auto" }}>
              <Table size="small">
                <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#1976d2" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>#</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>User ID</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Name</TableCell>
                    {searchMode && (
                      <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Date</TableCell>
                    )}
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>In Time</TableCell>
                    <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Out Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subcontractData.length > 0 ? (
                    subcontractData.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>{row.Sub_UID}</TableCell>
                        <TableCell>{row.Sub_Name}</TableCell>
                        {searchMode && (
                          <TableCell sx={{ textAlign: "center" }}>
                            {row.Sub_InTime ? dayjs(row.Sub_InTime).format("MM/DD") : "-"}
                          </TableCell>
                        )}
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.Sub_InTime ? dayjs(row.Sub_InTime).format("HH:mm") : "-"}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {row.Sub_OutTime ? dayjs(row.Sub_OutTime).format("HH:mm") : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={searchMode ? 6 : 5} sx={{ textAlign: "center" }}>
                        <Typography>No data found</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", mt: 2, width: "100%", maxWidth: "500px" }}>
        {["Tab1", "Tab2"].map((tab, idx) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "contained" : "outlined"}
            onClick={() => handleTabChange(tab)}
            sx={{
              borderRadius: idx % 2 === 0 ? "8px 0 0 8px" : "0 8px 8px 0",
              backgroundColor: selectedTab === tab ? "#5ac8fa" : "transparent",
              "&:hover": { backgroundColor: selectedTab === tab ? "#5ac8fa" : "#f1f1f1" },
              p: "14px 34px",
              fontSize: "16px",
              width: "100%",
            }}
          >
            {tab === "Tab1" ? "CDPLC" : "SUBCONTRACT"}
          </Button>
        ))}
      </Box>

      <Paper elevation={1} sx={{ p: 2, mt: 2, width: "100%", maxWidth: "1000px" }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
            {selectedTab === "Tab1" ? "RFID Attendance" : "FACE Recognition Attendance"}
          </Typography>
          {renderComponent()}
        </Box>
      </Paper>
    </Box>
  );
};

export default Rfid_Attendence;
