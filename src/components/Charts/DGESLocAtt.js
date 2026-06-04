// import React, { useCallback, useEffect, useRef, useState } from "react";
// import CommonService from "../../service/CommonService";
// import {
//   Avatar, Box, Button, Chip, Collapse, Dialog, DialogContent, IconButton, Paper,
//   SwipeableDrawer, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Typography, useMediaQuery, useTheme, CircularProgress, Tab, Tabs
// } from "@mui/material";
// import {
//   Business, CheckCircle, Close, KeyboardArrowDown, KeyboardArrowUp,
//   Cancel, LocationOn, Visibility, AccountTree, ArrowBack,
//   Person, Email, Phone, Work, CalendarToday, AttachMoney,
//   ReceiptLong, AccessTime, InfoOutlined, EventNote, Search,
// } from "@mui/icons-material";

// /* ─── Helpers ─────────────────────────────────────────────────────────────── */
// const isPresent = (emp) => emp.inn && emp.inn !== "NR" && emp.inn !== "";

// const normalizeRow = (item) => ({
//   division: (item?.Division || item?.division || "").trim() || "Unknown",
//   loc:      (item?.Location || item?.location || "").trim() || "Unknown",
//   sno:      item?.Sno  || item?.sno  || "",
//   repname:  item?.Name || item?.name || "",
//   des:      item?.Desc || item?.des  || "",
//   inn:      item?.CIN  || item?.inn  || "",
//   pout:     item?.COUT || item?.pout || "",
//   cno:      item?.CNO  || item?.cno  || "",
// });

// /* ─── InfoCard ────────────────────────────────────────────────────────────── */
// const iconBoxColors = {
//   blue:   { bg: "#e6f1fb", color: "#185FA5" },
//   purple: { bg: "#EEEDFE", color: "#534AB7" },
//   red:    { bg: "#FCEBEB", color: "#D85A30" },
//   teal:   { bg: "#E1F5EE", color: "#0F6E56" },
//   amber:  { bg: "#FAEEDA", color: "#854F0B" },
//   green:  { bg: "#EAF3DE", color: "#3B6D11" },
// };

// const InfoCard = ({ icon, label, value, colorKey = "blue", action }) => {
//   const c = iconBoxColors[colorKey] || iconBoxColors.blue;
//   return (
//     <Box
//       sx={{
//         display: "flex", alignItems: "center", gap: 1.5,
//         py: 1.4, borderBottom: "0.5px solid #e2e8f0",
//         "&:last-child": { borderBottom: "none" },
//       }}
//     >
//       <Box
//         sx={{
//           width: 38, height: 38, borderRadius: "10px",
//           background: c.bg, display: "flex", alignItems: "center",
//           justifyContent: "center", flexShrink: 0,
//           "& svg": { fontSize: 19, color: c.color },
//         }}
//       >
//         {icon}
//       </Box>
//       <Box sx={{ flex: 1, minWidth: 0 }}>
//         <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", mb: "1px", fontWeight: 600 }}>
//           {label}
//         </Typography>
//         <Typography sx={{ fontSize: "0.88rem", color: "#1e293b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//           {value || "-"}
//         </Typography>
//       </Box>
//       {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
//     </Box>
//   );
// };

// /* ─── PlaceholderTab ──────────────────────────────────────────────────────── */
// const PlaceholderTab = ({ icon, message }) => (
//   <Box sx={{ textAlign: "center", py: 7 }}>
//     <Box sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }}>{icon}</Box>
//     <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>{message}</Typography>
//   </Box>
// );

// /* ─── OtherInfoTab ────────────────────────────────────────────────────────── */
// const OtherInfoTab = ({ sno }) => {
//   const [data, setData]       = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     if (!sno) return;
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await CommonService.GetEmployeeOtherInfo(sno);
//         if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
//           const sorted = [...response.data.ResultSet].sort(
//             (a, b) => new Date(b.date) - new Date(a.date)
//           );
//           setData(sorted);
//         } else {
//           setData([]);
//         }
//       } catch (e) {
//         console.error("OtherInfo fetch error:", e);
//         setError("Failed to load other information.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [sno]);

//   const formatDate = (raw) => {
//     if (!raw) return "-";
//     const d = new Date(raw);
//     if (isNaN(d)) return raw;
//     const yyyy = d.getFullYear();
//     const mm   = String(d.getMonth() + 1).padStart(2, "0");
//     const dd   = String(d.getDate()).padStart(2, "0");
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//         <CircularProgress sx={{ color: "#004AAD" }} size={32} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", py: 6 }}>
//         <InfoOutlined sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
//         <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
//       </Box>
//     );
//   }

//   if (!data.length) {
//     return (
//       <PlaceholderTab
//         icon={<InfoOutlined sx={{ fontSize: 44 }} />}
//         message="No other information available"
//       />
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "36px 110px 1fr",
//           px: 1.5, py: 1,
//           bgcolor: "#f1f5f9",
//           borderRadius: "10px",
//           mb: 0.5,
//         }}
//       >
//         {["#", "DATE", "EVALUATION"].map((h) => (
//           <Typography key={h} sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>
//             {h}
//           </Typography>
//         ))}
//       </Box>

//       {data.map((item, idx) => (
//         <Box
//           key={idx}
//           sx={{
//             display: "grid",
//             gridTemplateColumns: "36px 110px 1fr",
//             px: 1.5, py: 1.4,
//             borderBottom: idx < data.length - 1 ? "0.5px solid #e2e8f0" : "none",
//             alignItems: "flex-start",
//             bgcolor: "#fff",
//             "&:hover": { bgcolor: "#f8faff" },
//           }}
//         >
//           <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, pt: "1px" }}>
//             {data.length - idx}
//           </Typography>
//           <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", pt: "1px" }}>
//             {formatDate(item.date)}
//           </Typography>
//           <Typography sx={{ fontSize: "0.7rem", color: "#334155", lineHeight: 1.55, wordBreak: "break-word" }}>
//             {item.evaluation || "-"}
//           </Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// /* ─── AttendanceTab ───────────────────────────────────────────────────────── */
// const AttendanceTab = ({ sno }) => {
//   const [attData, setAttData]   = useState([]);
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState(null);

//   useEffect(() => {
//     if (!sno) return;
//     const fetchAtt = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await CommonService.GetEmployeeAttSummary(sno);
//         if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
//           const sorted = [...response.data.ResultSet].sort((a, b) => Number(b.year) - Number(a.year));
//           setAttData(sorted);
//         } else {
//           setAttData([]);
//         }
//       } catch (e) {
//         console.error("Attendance fetch error:", e);
//         setError("Failed to load attendance data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAtt();
//   }, [sno]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//         <CircularProgress sx={{ color: "#004AAD" }} size={32} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: "center", py: 6 }}>
//         <AccessTime sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
//         <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
//       </Box>
//     );
//   }

//   if (!attData.length) {
//     return (
//       <PlaceholderTab
//         icon={<AccessTime sx={{ fontSize: 44 }} />}
//         message="No attendance records found"
//       />
//     );
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "40px 1fr 1fr",
//           px: 1.5, py: 1,
//           bgcolor: "#f1f5f9",
//           borderRadius: "10px",
//           mb: 0.5,
//         }}
//       >
//         {["#", "YEAR", "PERCENTAGE"].map((h) => (
//           <Typography
//             key={h}
//             sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}
//           >
//             {h}
//           </Typography>
//         ))}
//       </Box>

//       {attData.map((item, idx) => {
//         const pct      = parseFloat(item.pres_Percentage) || 0;
//         const pctText  = `${pct.toFixed(0)}%`;
//         const txtColor =
//           pct >= 75 ? "#0d28c5" :
//           pct >= 50 ? "#d9c406" : "#dc2626";

//         return (
//           <Box
//             key={idx}
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "40px 1fr 1fr",
//               px: 1.5, py: 1.4,
//               borderBottom: idx < attData.length - 1 ? "0.5px solid #e2e8f0" : "none",
//               alignItems: "center",
//               bgcolor: "#fff",
//               "&:hover": { bgcolor: "#f8faff" },
//             }}
//           >
//             <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
//               {idx + 1}
//             </Typography>
//             <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>
//               {item.year}
//             </Typography>
//             <Typography sx={{ textAlign: "center", fontSize: "0.88rem", fontWeight: 700, color: txtColor }}>
//               {pctText}
//             </Typography>
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// /* ─── EmployeeDetailsPopup ────────────────────────────────────────────────── */
// const EmployeeDetailsPopup = ({ open, onClose, employee, currentYear }) => {
//   const [employeeDetails, setEmployeeDetails] = useState(null);
//   const [noPayData, setNoPayData]             = useState([]);
//   const [loading, setLoading]                 = useState(false);
//   const [tabValue, setTabValue]               = useState(0);
//   const [imageError, setImageError]           = useState(false);
//   const [selectedYear, setSelectedYear]       = useState(currentYear || new Date().getFullYear().toString());
//   const [noPayLoading, setNoPayLoading]       = useState(false);
//   const [noPayError, setNoPayError]           = useState(null);

//   useEffect(() => {
//     if (open && employee && tabValue === 2 && employeeDetails?.barcode_no) {
//       fetchNoPayData();
//     }
//   }, [open, employee, selectedYear, tabValue, employeeDetails?.barcode_no]);

//   useEffect(() => {
//     if (open && employee) {
//       fetchEmployeeData();
//       setTabValue(0);
//       setImageError(false);
//       setSelectedYear(
//         currentYear
//           ? (parseInt(currentYear) - 1).toString()
//           : (new Date().getFullYear() - 1).toString()
//       );
//     }
//   }, [open, employee, currentYear]);

//   const fetchEmployeeData = async () => {
//     if (!employee?.sno) return;
//     setLoading(true);
//     try {
//       const detailsResponse = await CommonService.GetEmployeeDetails(employee.sno);
//       if (detailsResponse?.data?.StatusCode === 200) {
//         const details = detailsResponse.data.ResultSet?.[0] || null;
//         setEmployeeDetails(details);
//       }
//     } catch (error) {
//       console.error("Error fetching employee details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchNoPayData = async () => {
//     const barcodeNo = employeeDetails?.barcode_no
//                       || employee?.cno
//                       || employee?.barcode_no;

//     if (!barcodeNo) {
//       setNoPayError("Barcode number not found for this employee");
//       setNoPayData([]);
//       return;
//     }

//     if (!selectedYear) {
//       setNoPayError("No year selected");
//       return;
//     }

//     setNoPayLoading(true);
//     setNoPayError(null);

//     try {
//       const noPayResponse = await CommonService.GetEmployeeNoPay(barcodeNo, selectedYear);
//       if (noPayResponse?.data?.StatusCode === 200) {
//         const resultSet = noPayResponse.data.ResultSet || [];
//         setNoPayData(resultSet);
//         if (resultSet.length === 0) {
//           setNoPayError(`No pay records found for ${selectedYear}`);
//         }
//       } else {
//         setNoPayData([]);
//         setNoPayError(noPayResponse?.data?.Message || `No Pay data is not available for ${selectedYear}`);
//       }
//     } catch (error) {
//       console.error("No Pay fetch error:", error);
//       setNoPayError(error?.response?.data?.Message || error?.message || "Network error - Failed to load No Pay data");
//       setNoPayData([]);
//     } finally {
//       setNoPayLoading(false);
//     }
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//     setNoPayError(null);
//   };

//   const getInitials = (name) => {
//     if (!name) return "?";
//     return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
//   };

//   const getEmployeeImageUrl = () => {
//     if (!employee?.sno) return null;
//     return `https://esystems.cdl.lk/backendDGES/BizTrack/Home/DGESGetUserImg?serviceNo=${employee.sno}`;
//   };

//   const getYearOptions = () => {
//     const currentYearNum = new Date().getFullYear();
//     const years = [];
//     for (let i = 0; i <= 5; i++) {
//       years.push((currentYearNum - i).toString());
//     }
//     return years;
//   };

//   const noPayTotal = noPayData.reduce(
//     (sum, item) => sum + (parseFloat(item.Nopay_Count || item.nopay_count) || 0),
//     0
//   );

//   const TABS = [
//     { label: "Profile",    icon: <Person sx={{ fontSize: 17 }} /> },
//     { label: "Other Info", icon: <InfoOutlined sx={{ fontSize: 17 }} /> },
//     { label: "No Pay",     icon: <ReceiptLong sx={{ fontSize: 17 }} /> },
//     { label: "Attendance", icon: <AccessTime sx={{ fontSize: 17 }} /> },
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "24px",
//           maxHeight: "92vh",
//           overflow: "hidden",
//           boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
//         },
//       }}
//     >
//       {/* Header */}
//       <Box sx={{ position: "relative", bgcolor: "#004AAD", p: "20px" }}>
//         <IconButton
//           onClick={onClose}
//           size="small"
//           sx={{
//             position: "absolute", right: 14, top: 14,
//             color: "#fff", bgcolor: "rgba(255,255,255,0.15)",
//             "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
//             width: 32, height: 32,
//           }}
//         >
//           <Close sx={{ fontSize: 18 }} />
//         </IconButton>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
//           <Avatar
//             src={!imageError ? getEmployeeImageUrl() : undefined}
//             onError={() => setImageError(true)}
//             sx={{
//               width: 68, height: 68,
//               bgcolor: "#d0dff5", color: "#004AAD",
//               fontSize: "1.5rem", fontWeight: 500,
//               border: "3px solid rgba(255,255,255,0.85)",
//               flexShrink: 0,
//             }}
//           >
//             {getInitials(employee?.repname)}
//           </Avatar>

//           <Box sx={{ minWidth: 0 }}>
//             <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, fontSize: "1rem", lineHeight: 1.3 }}>
//               {employee?.repname || "-"}
//             </Typography>
//             <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.78rem", mb: 0.8 }}>
//               {employee?.des || "No Designation"}
//             </Typography>
//             <Box sx={{ display: "flex", gap: 0.7, flexWrap: "wrap" }}>
//               {employee?.sno && (
//                 <Chip label={employee.sno} size="small"
//                   sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
//               )}
//               {employeeDetails?.barcode_no && (
//                 <Chip label={`BC: ${employeeDetails.barcode_no}`} size="small"
//                   sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Tabs */}
//       <Tabs
//         value={tabValue}
//         onChange={(_, v) => setTabValue(v)}
//         variant="fullWidth"
//         sx={{
//           borderBottom: "0.5px solid #e2e8f0",
//           minHeight: 44,
//           "& .MuiTab-root": {
//             textTransform: "none", fontWeight: 600, fontSize: "0.72rem",
//             minHeight: 44, py: 0, gap: "4px", color: "#94a3b8",
//           },
//           "& .Mui-selected": { color: "#004AAD" },
//           "& .MuiTabs-indicator": { backgroundColor: "#004AAD", height: 2 },
//         }}
//       >
//         {TABS.map((t, i) => (
//           <Tab key={i} icon={t.icon} iconPosition="start" label={t.label} />
//         ))}
//       </Tabs>
//       {/* Body */}
//       <DialogContent sx={{ p: 0, overflow: "auto" }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
//             <CircularProgress sx={{ color: "#004AAD" }} />
//           </Box>
//         ) : (
//           <>
//             {/* ── Profile Tab ── */}
//             {tabValue === 0 && (
//               <Box sx={{ px: 2, py: 0.5 }}>
//                 {employeeDetails ? (
//                   <>
//                     <InfoCard colorKey="blue"   icon={<Work />}          label="W.Category"     value={employeeDetails.work_category} />
//                     <InfoCard colorKey="purple" icon={<Phone />}         label="Mobile"         value={employeeDetails.mobile_no}
//                       action={
//                         employeeDetails.mobile_no ? (
//                           <Box component="a" href={`tel:${employeeDetails.mobile_no}`}
//                             sx={{ width: 34, height: 34, borderRadius: "10px", background: "#eaf3de", display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 18, color: "#3B6D11" } }}>
//                             <Phone />
//                           </Box>
//                         ) : null
//                       }
//                     />
//                     <InfoCard colorKey="teal"  icon={<Business />}      label="Division"       value={employeeDetails.division} />
//                     <InfoCard colorKey="amber" icon={<AccountTree />}   label="Department"     value={employeeDetails.department} />
//                     <InfoCard colorKey="blue"  icon={<Email />}         label="Email"          value={employeeDetails.email} />
//                     <InfoCard colorKey="teal"  icon={<CalendarToday />} label="Permanant Date" value={employeeDetails.permanant_date} />
//                     <InfoCard colorKey="amber" icon={<EventNote />}     label="Retirement Date" value={employeeDetails.retirement_date} />
//                   </>
//                 ) : (
//                   <PlaceholderTab icon={<Person sx={{ fontSize: 44 }} />} message="No profile data available" />
//                 )}
//               </Box>
//             )}

//             {/* ── Other Info Tab ── */}
//             {tabValue === 1 && <OtherInfoTab sno={employee?.sno} />}

//             {/* ── No Pay Tab ── */}
//             {tabValue === 2 && (
//               <Box sx={{ p: 2 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                   <Typography sx={{ fontWeight: 700, color: "#004AAD", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 0.8 }}>
//                     <AttachMoney sx={{ fontSize: 16 }} />
//                     No Pay Summary
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>Year:</Typography>
//                     <Box
//                       component="select"
//                       value={selectedYear}
//                       onChange={handleYearChange}
//                       sx={{
//                         px: 1.5, py: 0.6,
//                         fontSize: "0.75rem", fontWeight: 600,
//                         border: "1px solid #e2e8f0", borderRadius: "8px",
//                         backgroundColor: "#fff", color: "#004AAD",
//                         cursor: "pointer", outline: "none",
//                         "&:focus": { borderColor: "#004AAD", boxShadow: "0 0 0 2px rgba(0,74,173,0.1)" },
//                       }}
//                     >
//                       {getYearOptions().map((year) => (
//                         <option key={year} value={year}>{year}</option>
//                       ))}
//                     </Box>
//                   </Box>
//                 </Box>

//                 {noPayLoading ? (
//                   <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
//                     <CircularProgress sx={{ color: "#004AAD" }} size={32} />
//                   </Box>
//                 ) : noPayError ? (
//                   <Box sx={{ textAlign: "center", py: 4 }}>
//                     <ReceiptLong sx={{ fontSize: 44, color: "#918e8e", mb: 1 }} />
//                     <Typography sx={{ color: "#918e8e", fontSize: "0.82rem", mb: 1 }}>{noPayError}</Typography>
//                   </Box>
//                 ) : noPayData.length === 0 ? (
//                   <PlaceholderTab
//                     icon={<ReceiptLong sx={{ fontSize: 44 }} />}
//                     message={`No pay records found for ${selectedYear}`}
//                   />
//                 ) : (
//                   <Box sx={{ border: "0.5px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
//                     <Box
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "36px 1fr auto",
//                         px: 2, py: 1.2,
//                         bgcolor: "#f1f5f9",
//                       }}
//                     >
//                       {[
//                         { label: "#",      align: "left"  },
//                         { label: "MONTH",  align: "left"  },
//                         { label: "COUNT",  align: "right" },
//                       ].map(({ label, align }) => (
//                         <Typography
//                           key={label}
//                           sx={{
//                             fontSize: "0.65rem", fontWeight: 700,
//                             color: "#64748b", letterSpacing: "0.07em",
//                             textAlign: align,
//                           }}
//                         >
//                           {label}
//                         </Typography>
//                       ))}
//                     </Box>

//                     {noPayData.map((item, index) => {
//                       let monthName = item.Month || "-";
//                       try {
//                         if (item.Month?.includes("-")) {
//                           const [y, m] = item.Month.split("-");
//                           monthName = new Date(parseInt(y), parseInt(m) - 1)
//                             .toLocaleString("default", { month: "long" });
//                         } else {
//                           const d = new Date(item.Month);
//                           if (!isNaN(d)) {
//                             monthName = d.toLocaleString("default", { month: "long" });
//                           }
//                         }
//                       } catch (_) {}

//                       const count = parseFloat(item.Nopay_Count || item.nopay_count) || 0;

//                       return (
//                         <Box
//                           key={index}
//                           sx={{
//                             display: "grid",
//                             gridTemplateColumns: "36px 1fr auto",
//                             px: 2, py: 1.4,
//                             borderTop: "0.5px solid #e2e8f0",
//                             bgcolor: "#fff",
//                             alignItems: "center",
//                             "&:hover": { bgcolor: "#f8faff" },
//                           }}
//                         >
//                           <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
//                             {index + 1}
//                           </Typography>
//                           <Typography sx={{ fontSize: "0.88rem", color: "#1e293b" }}>
//                             {monthName}
//                           </Typography>
//                           <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b", textAlign: "right" }}>
//                             {count.toFixed(2)}
//                           </Typography>
//                         </Box>
//                       );
//                     })}

//                     <Box
//                       sx={{
//                         display: "grid",
//                         gridTemplateColumns: "36px 1fr auto",
//                         px: 2, py: 1.3,
//                         borderTop: "0.5px solid #e2e8f0",
//                         bgcolor: "#f8faff",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box />
//                       <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>
//                         TOTAL
//                       </Typography>
//                       <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#dc2626", textAlign: "right" }}>
//                         {noPayTotal.toFixed(2)}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             )}

//             {/* ── Attendance Tab ── */}
//             {tabValue === 3 && <AttendanceTab sno={employee?.sno} />}
//           </>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// /* ─── STEP 1: Division Cards ──────────────────────────────────────────────── */
// const DivisionStep = ({ divisions, data, onSelect }) => {
//   const divStats = divisions.map((div) => {
//     const emps    = data.filter((d) => d.division === div);
//     const present = emps.filter(isPresent).length;
//     const locs    = [...new Set(emps.map((e) => e.loc))].length;
//     const rate    = emps.length > 0 ? Math.round((present / emps.length) * 100) : 0;
//     const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
//     return { div, total: emps.length, present, locs, rate, rateColor };
//   });

//   return (
//     <Box>
//       <Typography sx={{ mb: 1.5, fontWeight: 600, color: "#64748b", fontSize: "0.8rem" }}>
//         Select a division to view locations
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         {divStats.map(({ div, total, present, locs, rate, rateColor }) => (
//           <Box key={div} onClick={() => onSelect(div)}
//             sx={{
//               display: "flex", alignItems: "center", gap: 1.5,
//               px: 2, py: 1.25, border: "1.5px solid #e2e8f0",
//               borderRadius: "12px", cursor: "pointer", bgcolor: "#fff",
//               transition: "all 0.18s ease",
//               "&:hover": { borderColor: "#004AAD", bgcolor: "#f0f5ff" },
//             }}
//           >
//             <Avatar sx={{ width: 34, height: 34, bgcolor: "#e8f0fe", flexShrink: 0 }}>
//               <AccountTree sx={{ fontSize: 17, color: "#004AAD" }} />
//             </Avatar>
//             <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.3, wordBreak: "break-word" }}>
//               {div}
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
//               <Chip label={`${locs} loc`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#e8f0fe", color: "#004AAD" }} />
//               <Chip label={`${present}/${total}`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#dcfce7", color: "#16a34a" }} />
//               <Chip label={`${rate}%`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 700, bgcolor: `${rateColor}18`, color: rateColor, minWidth: 42 }} />
//               <KeyboardArrowDown sx={{ fontSize: 18, color: "#94a3b8", transform: "rotate(-90deg)" }} />
//             </Box>
//           </Box>
//         ))}
//         {divStats.length === 0 && (
//           <Box sx={{ textAlign: "center", py: 5 }}>
//             <Search sx={{ fontSize: 40, color: "#cbd5e1", mb: 1 }} />
//             <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No divisions match your search</Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// /* ─── STEP 2: Mobile Location Panel ──────────────────────────────────────── */
// const MobileLocationPanel = React.memo(({ location, employees, isExpanded, onToggle, onViewAll }) => {
//   const strength = employees.length;
//   const present  = employees.filter(isPresent).length;
//   const absent   = strength - present;
//   const rate     = strength > 0 ? Math.round((present / strength) * 100) : 0;
//   const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";

//   return (
//     <Box sx={{ mb: 1.5 }}>
//       <Box onClick={() => onToggle(location)}
//         sx={{
//           display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.5,
//           bgcolor: isExpanded ? "#004AAD" : "#fff",
//           border: "1.5px solid", borderColor: isExpanded ? "#004AAD" : "#e2e8f0",
//           borderRadius: isExpanded ? "14px 14px 0 0" : "14px",
//           cursor: "pointer", transition: "all 0.25s ease", userSelect: "none",
//         }}
//       >
//         <Avatar sx={{ width: 36, height: 36, bgcolor: isExpanded ? "rgba(255,255,255,0.2)" : "#e8f0fe", flexShrink: 0 }}>
//           <LocationOn sx={{ fontSize: 18, color: isExpanded ? "#fff" : "#004AAD" }} />
//         </Avatar>
//         <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "0.88rem", color: isExpanded ? "#fff" : "#1e293b", lineHeight: 1.3 }}>
//           {location}
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
//           <Chip label={`${present} / ${strength}`} size="small"
//             sx={{ height: 24, fontSize: "0.72rem", fontWeight: 700, bgcolor: isExpanded ? "rgba(255,255,255,0.18)" : "#e8f0fe", color: isExpanded ? "#fff" : "#004AAD" }} />
//           <Chip label={`${rate}%`} size="small"
//             sx={{ height: 24, fontSize: "0.72rem", fontWeight: 700, bgcolor: isExpanded ? "rgba(255,255,255,0.18)" : `${rateColor}18`, color: isExpanded ? "#fff" : rateColor }} />
//         </Box>
//         <Box sx={{ flexShrink: 0, transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", color: isExpanded ? "#fff" : "#94a3b8" }}>
//           <KeyboardArrowDown />
//         </Box>
//       </Box>

//       <Collapse in={isExpanded} timeout={250} unmountOnExit>
//         <Box sx={{ border: "1.5px solid #004AAD", borderTop: "none", borderRadius: "0 0 14px 14px", overflow: "hidden", bgcolor: "#f8faff" }}>
//           <Box sx={{ display: "flex", borderBottom: "1px solid #e2e8f0", bgcolor: "#fff" }}>
//             {[{ label: "Strength", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }]
//               .map((s) => (
//                 <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
//                   <Typography sx={{ fontSize: "0.65rem", color: "#64748b", mb: 0.3 }}>{s.label}</Typography>
//                   <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
//                 </Box>
//               ))}
//           </Box>
//           <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
//             <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr", gap: 0.5, px: 1, py: 0.75, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 0.5 }}>
//               {["Service No", "Name", "Designation", "IN Time"].map((h) => (
//                 <Typography key={h} sx={{ fontSize: "0.62rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
//               ))}
//             </Box>
//             {employees.map((emp, idx) => {
//               const p = isPresent(emp);
//               return (
//                 <Box key={emp.sno || idx}
//                   sx={{
//                     display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr", gap: 0.5,
//                     px: 1, py: 0.9, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
//                     borderRadius: "6px", mb: 0.25, alignItems: "center",
//                     cursor: "pointer", transition: "all 0.2s ease",
//                     "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
//                   }}
//                   onClick={() => onViewAll(emp)}
//                 >
//                   <Typography sx={{ fontSize: "0.68rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
//                   <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.repname || "-"}</Typography>
//                   <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.des || "-"}</Typography>
//                   <Typography sx={{ fontSize: "0.68rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#f30a0a" }}>{p ? emp.inn : "NR"}</Typography>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Box>
//       </Collapse>
//     </Box>
//   );
// });

// /* ─── Desktop Location Table ──────────────────────────────────────────────── */
// const DesktopLocationTable = ({ locationGroups, expandedRow, onExpand, onViewDetails, onEmployeeClick }) => (
//   <TableContainer>
//     <Table>
//       <TableHead sx={{ bgcolor: "#004AAD" }}>
//         <TableRow>
//           <TableCell sx={{ color: "white", fontWeight: "bold", width: "35%" }}>Location</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Strength</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Present</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Attendance</TableCell>
//           <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {Object.entries(locationGroups).map(([location, employees]) => {
//           const strength  = employees.length;
//           const present   = employees.filter(isPresent).length;
//           const absent    = strength - present;
//           const rate      = strength > 0 ? Math.round((present / strength) * 100) : 0;
//           const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
//           const expanded  = expandedRow === location;
//           return (
//             <React.Fragment key={location}>
//               <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(0,74,173,0.04)" } }}>
//                 <TableCell>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Business sx={{ color: "#004AAD" }} />
//                     <Typography fontWeight={500}>{location}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="center"><Chip label={strength} size="small" sx={{ bgcolor: "#e8f0fe", color: "#004AAD", fontWeight: "bold" }} /></TableCell>
//                 <TableCell align="center"><Chip label={present}  size="small" sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: "bold" }} /></TableCell>
//                 <TableCell align="center"><Chip label={`${rate}%`} size="small" sx={{ bgcolor: `${rateColor}18`, color: rateColor, fontWeight: "bold" }} /></TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small" onClick={() => onExpand(location)} sx={{ color: "#004AAD" }}>
//                     {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
//                   </IconButton>
//                   <Button size="small" variant="outlined" startIcon={<Visibility />}
//                     onClick={() => onViewDetails({ location, employees, strength, present, absent, rate })}
//                     sx={{ ml: 1, borderColor: "#004AAD", color: "#004AAD", textTransform: "none" }}>
//                     View
//                   </Button>
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell colSpan={5} sx={{ py: 0 }}>
//                   <Collapse in={expanded} timeout="auto" unmountOnExit>
//                     <Box sx={{ m: 2, bgcolor: "#f8faff", borderRadius: "12px", p: 2 }}>
//                       <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", color: "#004AAD" }}>
//                         Employee List - {location}
//                       </Typography>
//                       <Table size="small">
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#e8f0fe" }}>
//                             {["Service No", "Name", "Designation", "Clock No", "IN Time", "Prev. OUT", "Status"].map((h) => (
//                               <TableCell key={h}><b>{h}</b></TableCell>
//                             ))}
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {employees.map((emp, idx) => {
//                             const p = isPresent(emp);
//                             return (
//                               <TableRow key={emp.sno || idx} hover sx={{ cursor: "pointer" }} onClick={() => onEmployeeClick(emp)}>
//                                 <TableCell>{emp.sno || "-"}</TableCell>
//                                 <TableCell>{emp.repname || "-"}</TableCell>
//                                 <TableCell>{emp.des || "-"}</TableCell>
//                                 <TableCell>{emp.cno || "-"}</TableCell>
//                                 <TableCell>
//                                   <Chip label={p ? emp.inn : "NR"} size="small"
//                                     sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
//                                 </TableCell>
//                                 <TableCell>{emp.pout || "-"}</TableCell>
//                                 <TableCell>
//                                   <Chip label={p ? "Present" : "Absent"} size="small"
//                                     icon={p ? <CheckCircle sx={{ fontSize: "12px !important" }} /> : <Cancel sx={{ fontSize: "12px !important" }} />}
//                                     sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
//                                 </TableCell>
//                               </TableRow>
//                             );
//                           })}
//                         </TableBody>
//                       </Table>
//                     </Box>
//                   </Collapse>
//                 </TableCell>
//               </TableRow>
//             </React.Fragment>
//           );
//         })}
//         {Object.keys(locationGroups).length === 0 && (
//           <TableRow>
//             <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
//               <Search sx={{ fontSize: 40, color: "#cbd5e1", display: "block", mx: "auto", mb: 1 }} />
//               <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   </TableContainer>
// );

// /* ─── Detail Drawer ───────────────────────────────────────────────────────── */
// const DetailDrawer = ({ open, onClose, data, onEmployeeClick }) => {
//   if (!data) return null;
//   const { location, employees, strength, present, absent, rate } = data;
//   const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
//   return (
//     <SwipeableDrawer anchor="bottom" open={open} onClose={onClose} onOpen={() => {}} disableSwipeToOpen
//       sx={{ "& .MuiDrawer-paper": { borderTopLeftRadius: "24px", borderTopRightRadius: "24px", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" } }}>
//       <Box sx={{ pt: 1.5, pb: 0.5, display: "flex", justifyContent: "center" }}>
//         <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: "#cbd5e1" }} />
//       </Box>
//       <Box sx={{ px: 2.5, py: 2, bgcolor: "#004AAD", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
//         <Box>
//           <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{location}</Typography>
//           <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", mt: 0.3 }}>{strength} employees</Typography>
//         </Box>
//         <IconButton onClick={onClose} sx={{ color: "#fff" }}><Close /></IconButton>
//       </Box>
//       <Box sx={{ display: "flex", flexShrink: 0, borderBottom: "1px solid #f1f5f9" }}>
//         {[{ label: "Total", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }, { label: "Rate", value: `${rate}%`, color: rateColor }]
//           .map((s) => (
//             <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
//               <Typography sx={{ fontSize: "0.63rem", color: "#64748b" }}>{s.label}</Typography>
//               <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
//             </Box>
//           ))}
//       </Box>
//       <Box sx={{ overflowY: "auto", flex: 1, px: 2, py: 1.5 }}>
//         <Box sx={{ display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5, px: 1, py: 0.8, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 1, position: "sticky", top: 0, zIndex: 1 }}>
//           {["Svc No", "Name", "Designation", "IN Time", "Status"].map((h) => (
//             <Typography key={h} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
//           ))}
//         </Box>
//         {employees.map((emp, idx) => {
//           const p = isPresent(emp);
//           return (
//             <Box key={emp.sno || idx}
//               sx={{
//                 display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5,
//                 px: 1, py: 1, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
//                 borderRadius: "8px", mb: 0.5, alignItems: "center", border: "1px solid #f1f5f9",
//                 cursor: "pointer", transition: "all 0.2s ease",
//                 "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
//               }}
//               onClick={() => onEmployeeClick(emp)}
//             >
//               <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
//               <Box>
//                 <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>{emp.repname || "-"}</Typography>
//                 <Typography sx={{ fontSize: "0.6rem", color: "#94a3b8" }}>{emp.cno ? `Clk: ${emp.cno}` : ""}</Typography>
//               </Box>
//               <Typography sx={{ fontSize: "0.62rem", color: "#64748b", lineHeight: 1.2 }}>{emp.des || "-"}</Typography>
//               <Box>
//                 <Typography sx={{ fontSize: "0.7rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#94a3b8" }}>{p ? emp.inn : "NR"}</Typography>
//                 {emp.pout && <Typography sx={{ fontSize: "0.58rem", color: "#94a3b8" }}>OUT: {emp.pout}</Typography>}
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 {p ? <CheckCircle sx={{ fontSize: 16, color: "#16a34a" }} /> : <Cancel sx={{ fontSize: 16, color: "#dc2626" }} />}
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>
//     </SwipeableDrawer>
//   );
// };

// /* ─── Breadcrumb ──────────────────────────────────────────────────────────── */
// const Breadcrumb = ({ division, onBack }) => (
//   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
//     <IconButton size="small" onClick={onBack}
//       sx={{ color: "#004AAD", bgcolor: "#e8f0fe", borderRadius: "8px", "&:hover": { bgcolor: "#d0e2ff" } }}>
//       <ArrowBack fontSize="small" />
//     </IconButton>
//     <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
//       <Typography onClick={onBack}
//         sx={{ fontSize: "0.8rem", color: "#004AAD", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
//         All Divisions
//       </Typography>
//       <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>/</Typography>
//       <Chip label={division} size="small" sx={{ height: 22, fontSize: "0.72rem", fontWeight: 700, bgcolor: "#004AAD", color: "#fff" }} />
//     </Box>
//   </Box>
// );

// /* ─── SearchBar ───────────────────────────────────────────────────────────── */
// const SearchBar = ({ value, onChange, placeholder }) => (
//   <Box
//     sx={{
//       display: "flex", alignItems: "center", gap: 1,
//       mb: 2, px: 1.5, py: 0.85,
//       border: "1.5px solid #e2e8f0",
//       borderRadius: "12px",
//       bgcolor: "#fff",
//       transition: "border-color 0.18s ease, box-shadow 0.18s ease",
//       "&:focus-within": {
//         borderColor: "#004AAD",
//         boxShadow: "0 0 0 3px rgba(0,74,173,0.08)",
//       },
//     }}
//   >
//     <Search sx={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }} />
//     <Box
//       component="input"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder || "Search…"}
//       sx={{
//         flex: 1, border: "none", outline: "none",
//         fontSize: "0.85rem", color: "#1e293b",
//         bgcolor: "transparent", fontFamily: "inherit",
//         "&::placeholder": { color: "#94a3b8" },
//       }}
//     />
//     {value && (
//       <IconButton
//         size="small"
//         onClick={() => onChange("")}
//         sx={{
//           color: "#94a3b8", p: 0.3,
//           "&:hover": { color: "#004AAD", bgcolor: "#e8f0fe" },
//           borderRadius: "6px",
//         }}
//       >
//         <Close sx={{ fontSize: 16 }} />
//       </IconButton>
//     )}
//   </Box>
// );

// /* ─── DGESatt (inner) ─────────────────────────────────────────────────────── */
// const DGESatt = ({ data = [], loading = false }) => {
//   const theme    = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const currentYear = new Date().getFullYear().toString();

//   const [selectedDivision,  setSelectedDivision]  = useState(null);
//   const [expandedRow,       setExpandedRow]        = useState(null);
//   const [drawerOpen,        setDrawerOpen]         = useState(false);
//   const [selectedLocation,  setSelectedLocation]   = useState(null);
//   const [employeePopupOpen, setEmployeePopupOpen]  = useState(false);
//   const [selectedEmployee,  setSelectedEmployee]   = useState(null);
//   /* ── NEW: search state ── */
//   const [searchTerm,        setSearchTerm]         = useState("");

//   const scrollRef = useRef(null);

//   const handleDivisionSelect = useCallback((div) => {
//     setSelectedDivision(div);
//     setExpandedRow(null);
//     setSearchTerm("");        
//   }, []);

//   const handleBack = useCallback(() => {
//     setSelectedDivision(null);
//     setExpandedRow(null);
//     setSearchTerm("");        
//   }, []);

//   const handleToggle      = useCallback((loc) => setExpandedRow((prev) => (prev === loc ? null : loc)), []);
//   const handleViewDetails = useCallback((locData) => { setSelectedLocation(locData); setDrawerOpen(true); }, []);
//   const handleEmployeeClick = useCallback((emp) => { setSelectedEmployee(emp); setEmployeePopupOpen(true); }, []);

//   if (loading) {
//     return (
//       <Paper sx={{ p: 3, borderRadius: "20px" }}>
//         <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
//           <Typography>Loading CDPLC location attendance...</Typography>
//         </Box>
//       </Paper>
//     );
//   }

//   /* ── Filtered data ── */
//   const term = searchTerm.toLowerCase().trim();
//   const filteredData = term
//     ? data.filter((d) =>
//         d.repname?.toLowerCase().includes(term) ||
//         d.sno?.toLowerCase().includes(term) ||
//         d.des?.toLowerCase().includes(term) ||
//         d.division?.toLowerCase().includes(term) ||
//         d.loc?.toLowerCase().includes(term)
//       )
//     : data;

//   const divisions = [...new Set(filteredData.map((d) => d.division).filter(Boolean))].sort();

//   const locationGroups = {};
//   if (selectedDivision) {
//     filteredData.filter((d) => d.division === selectedDivision).forEach((item) => {
//       const loc = item.loc?.trim() || "Unknown";
//       if (!locationGroups[loc]) locationGroups[loc] = [];
//       locationGroups[loc].push(item);
//     });
//   }

//   const totalLocations = Object.keys(locationGroups).length;
//   const divEmployees   = selectedDivision ? filteredData.filter((d) => d.division === selectedDivision) : [];
//   const totalPresent   = divEmployees.filter(isPresent).length;

//   /* ── Subtitle text ── */
//   const subtitle = selectedDivision
//     ? `${totalLocations} locations · ${divEmployees.length} employees · ${totalPresent} present${term ? ` · filtered by "${searchTerm}"` : ""}`
//     : `${divisions.length} divisions · ${filteredData.length} employees total${term ? ` · filtered by "${searchTerm}"` : ""}`;

//   /* ── Search placeholder ── */
//   const searchPlaceholder = selectedDivision
//     ? "Search by name, service no, designation, location…"
//     : "Search by name, service no, designation, division…";

//   return (
//     <>
//       <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,74,173,0.06)" }}>
//         <Box sx={{ mb: 2 }}>
//           <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: "#004AAD", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
//             DGES Employee Strength - Division
//           </Typography>
//           <Typography sx={{ color: "#64748b", fontSize: "0.8rem" }}>
//             {subtitle}
//           </Typography>
//         </Box>

//         {/* ── Search Bar ── */}
//         <SearchBar
//           value={searchTerm}
//           onChange={setSearchTerm}
//           placeholder={searchPlaceholder}
//         />

//         {!selectedDivision && (
//           <DivisionStep divisions={divisions} data={filteredData} onSelect={handleDivisionSelect} />
//         )}

//         {selectedDivision && (
//           <>
//             <Breadcrumb division={selectedDivision} onBack={handleBack} />
//             {isMobile ? (
//               <Box ref={scrollRef}
//                 sx={{
//                   maxHeight: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden", pr: 0.5,
//                   "&::-webkit-scrollbar": { width: 4 },
//                   "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
//                   "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 4 },
//                 }}
//               >
//                 {Object.entries(locationGroups).map(([location, employees]) => (
//                   <MobileLocationPanel
//                     key={location}
//                     location={location}
//                     employees={employees}
//                     isExpanded={expandedRow === location}
//                     onToggle={handleToggle}
//                     onViewAll={handleEmployeeClick}
//                   />
//                 ))}
//                 {Object.keys(locationGroups).length === 0 && (
//                   <Box sx={{ textAlign: "center", py: 6 }}>
//                     <Search sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }} />
//                     <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
//                   </Box>
//                 )}
//                 <Box sx={{ height: 80 }} />
//               </Box>
//             ) : (
//               <DesktopLocationTable
//                 locationGroups={locationGroups}
//                 expandedRow={expandedRow}
//                 onExpand={handleToggle}
//                 onViewDetails={handleViewDetails}
//                 onEmployeeClick={handleEmployeeClick}
//               />
//             )}
//           </>
//         )}
//       </Paper>

//       <DetailDrawer
//         open={drawerOpen}
//         onClose={() => { setDrawerOpen(false); setTimeout(() => setSelectedLocation(null), 300); }}
//         data={selectedLocation}
//         onEmployeeClick={handleEmployeeClick}
//       />

//       <EmployeeDetailsPopup
//         open={employeePopupOpen}
//         onClose={() => { setEmployeePopupOpen(false); setTimeout(() => setSelectedEmployee(null), 300); }}
//         employee={selectedEmployee}
//         currentYear={currentYear}
//       />
//     </>
//   );
// };

// /* ─── Data Wrapper (exported) ─────────────────────────────────────────────── */
// export const CDLLocBaseAttendance = () => {
//   const [data,    setData]    = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error,   setError]   = useState(null);

//   useEffect(() => {
//     let active = true;
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response  = await CommonService.GetCdllocbaseAttendance();
//         const resultSet = response?.data?.ResultSet || [];
//         const normalized = resultSet.map(normalizeRow);
//         if (active) setData(normalized);
//       } catch (err) {
//         if (active) setError("Failed to load CDPLC location attendance.");
//       } finally {
//         if (active) setLoading(false);
//       }
//     };
//     fetchData();
//     return () => { active = false; };
//   }, []);

//   if (error) {
//     return (
//       <Paper sx={{ p: 3, borderRadius: "20px" }}>
//         <Typography sx={{ color: "#dc2626", fontWeight: 600 }}>{error}</Typography>
//       </Paper>
//     );
//   }

//   return <DGESatt data={data} loading={loading} />;
// };








import React, { useCallback, useEffect, useRef, useState } from "react";
import CommonService from "../../service/CommonService";
import {
  Avatar, Box, Button, Chip, Collapse, Dialog, DialogContent, IconButton, Paper,
  SwipeableDrawer, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, useMediaQuery, useTheme, CircularProgress, Tab, Tabs
} from "@mui/material";
import {
  Business, CheckCircle, Close, KeyboardArrowDown, KeyboardArrowUp,
  Cancel, LocationOn, Visibility, AccountTree, ArrowBack,
  Person, Email, Phone, Work, CalendarToday, AttachMoney,
  ReceiptLong, AccessTime, InfoOutlined, EventNote, Search,
} from "@mui/icons-material";

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const isPresent = (emp) => emp.inn && emp.inn !== "NR" && emp.inn !== "";

// ✅ CHANGE 1: capture DivName and LocName from the API response
const normalizeRow = (item) => ({
  division: (item?.Division || item?.division || "").trim() || "Unknown",
  divName: (item?.DivName || item?.divName || "").trim(),
  loc: (item?.Location || item?.location || "").trim() || "Unknown",
  locName: (item?.LocName || item?.locName || "").trim(),
  sno: item?.Sno || item?.sno || "",
  repname: item?.Name || item?.name || "",
  des: item?.Desc || item?.des || "",
  inn: item?.CIN || item?.inn || "",
  pout: item?.COUT || item?.pout || "",
  cno: item?.CNO || item?.cno || "",
});

/* ─── InfoCard ────────────────────────────────────────────────────────────── */
const iconBoxColors = {
  blue: { bg: "#e6f1fb", color: "#185FA5" },
  purple: { bg: "#EEEDFE", color: "#534AB7" },
  red: { bg: "#FCEBEB", color: "#D85A30" },
  teal: { bg: "#E1F5EE", color: "#0F6E56" },
  amber: { bg: "#FAEEDA", color: "#854F0B" },
  green: { bg: "#EAF3DE", color: "#3B6D11" },
};

const InfoCard = ({ icon, label, value, colorKey = "blue", action }) => {
  const c = iconBoxColors[colorKey] || iconBoxColors.blue;
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        py: 1.4, borderBottom: "0.5px solid #e2e8f0",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Box
        sx={{
          width: 38, height: 38, borderRadius: "10px",
          background: c.bg, display: "flex", alignItems: "center",
          justifyContent: "center", flexShrink: 0,
          "& svg": { fontSize: 19, color: c.color },
        }}
      >
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: "0.68rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", mb: "1px", fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: "0.88rem", color: "#1e293b", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || "-"}
        </Typography>
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Box>
  );
};

/* ─── PlaceholderTab ──────────────────────────────────────────────────────── */
const PlaceholderTab = ({ icon, message }) => (
  <Box sx={{ textAlign: "center", py: 7 }}>
    <Box sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }}>{icon}</Box>
    <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>{message}</Typography>
  </Box>
);

/* ─── OtherInfoTab ────────────────────────────────────────────────────────── */
const OtherInfoTab = ({ sno }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sno) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CommonService.GetEmployeeOtherInfo(sno);
        if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
          const sorted = [...response.data.ResultSet].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setData(sorted);
        } else {
          setData([]);
        }
      } catch (e) {
        console.error("OtherInfo fetch error:", e);
        setError("Failed to load other information.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sno]);

  const formatDate = (raw) => {
    if (!raw) return "-";
    const d = new Date(raw);
    if (isNaN(d)) return raw;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress sx={{ color: "#004AAD" }} size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <InfoOutlined sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
        <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
      </Box>
    );
  }

  if (!data.length) {
    return (
      <PlaceholderTab
        icon={<InfoOutlined sx={{ fontSize: 44 }} />}
        message="No other information available"
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "36px 110px 1fr",
          px: 1.5, py: 1,
          bgcolor: "#f1f5f9",
          borderRadius: "10px",
          mb: 0.5,
        }}
      >
        {["#", "DATE", "EVALUATION"].map((h) => (
          <Typography key={h} sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>
            {h}
          </Typography>
        ))}
      </Box>

      {data.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            display: "grid",
            gridTemplateColumns: "36px 110px 1fr",
            px: 1.5, py: 1.4,
            borderBottom: idx < data.length - 1 ? "0.5px solid #e2e8f0" : "none",
            alignItems: "flex-start",
            bgcolor: "#fff",
            "&:hover": { bgcolor: "#f8faff" },
          }}
        >
          <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600, pt: "1px" }}>
            {data.length - idx}
          </Typography>
          <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e293b", pt: "1px" }}>
            {formatDate(item.date)}
          </Typography>
          <Typography sx={{ fontSize: "0.7rem", color: "#334155", lineHeight: 1.55, wordBreak: "break-word" }}>
            {item.evaluation || "-"}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

/* ─── AttendanceTab ───────────────────────────────────────────────────────── */
const AttendanceTab = ({ sno }) => {
  const [attData, setAttData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sno) return;
    const fetchAtt = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CommonService.GetEmployeeAttSummary(sno);
        if (response?.data?.StatusCode === 200 && Array.isArray(response.data.ResultSet)) {
          const sorted = [...response.data.ResultSet].sort((a, b) => Number(b.year) - Number(a.year));
          setAttData(sorted);
        } else {
          setAttData([]);
        }
      } catch (e) {
        console.error("Attendance fetch error:", e);
        setError("Failed to load attendance data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAtt();
  }, [sno]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress sx={{ color: "#004AAD" }} size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <AccessTime sx={{ fontSize: 40, color: "#fca5a5", mb: 1 }} />
        <Typography sx={{ color: "#dc2626", fontSize: "0.82rem" }}>{error}</Typography>
      </Box>
    );
  }

  if (!attData.length) {
    return (
      <PlaceholderTab
        icon={<AccessTime sx={{ fontSize: 44 }} />}
        message="No attendance records found"
      />
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "40px 1fr 1fr",
          px: 1.5, py: 1,
          bgcolor: "#f1f5f9",
          borderRadius: "10px",
          mb: 0.5,
        }}
      >
        {["#", "YEAR", "PERCENTAGE"].map((h) => (
          <Typography
            key={h}
            sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}
          >
            {h}
          </Typography>
        ))}
      </Box>

      {attData.map((item, idx) => {
        const pct = parseFloat(item.pres_Percentage) || 0;
        const pctText = `${pct.toFixed(0)}%`;
        const txtColor =
          pct >= 75 ? "#0d28c5" :
            pct >= 50 ? "#d9c406" : "#dc2626";

        return (
          <Box
            key={idx}
            sx={{
              display: "grid",
              gridTemplateColumns: "40px 1fr 1fr",
              px: 1.5, py: 1.4,
              borderBottom: idx < attData.length - 1 ? "0.5px solid #e2e8f0" : "none",
              alignItems: "center",
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#f8faff" },
            }}
          >
            <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
              {idx + 1}
            </Typography>
            <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b" }}>
              {item.year}
            </Typography>
            <Typography sx={{ textAlign: "center", fontSize: "0.88rem", fontWeight: 700, color: txtColor }}>
              {pctText}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

/* ─── EmployeeDetailsPopup ────────────────────────────────────────────────── */
const EmployeeDetailsPopup = ({ open, onClose, employee, currentYear }) => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [noPayData, setNoPayData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear || new Date().getFullYear().toString());
  const [noPayLoading, setNoPayLoading] = useState(false);
  const [noPayError, setNoPayError] = useState(null);

  useEffect(() => {
    if (open && employee && tabValue === 2 && employeeDetails?.barcode_no) {
      fetchNoPayData();
    }
  }, [open, employee, selectedYear, tabValue, employeeDetails?.barcode_no]);

  useEffect(() => {
    if (open && employee) {
      fetchEmployeeData();
      setTabValue(0);
      setImageError(false);
      setSelectedYear(
        currentYear
          ? (parseInt(currentYear) - 1).toString()
          : (new Date().getFullYear() - 1).toString()
      );
    }
  }, [open, employee, currentYear]);

  const fetchEmployeeData = async () => {
    if (!employee?.sno) return;
    setLoading(true);
    try {
      const detailsResponse = await CommonService.GetEmployeeDetails(employee.sno);
      if (detailsResponse?.data?.StatusCode === 200) {
        const details = detailsResponse.data.ResultSet?.[0] || null;
        setEmployeeDetails(details);
      }
    } catch (error) {
      console.error("Error fetching employee details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNoPayData = async () => {
    const barcodeNo = employeeDetails?.barcode_no
      || employee?.cno
      || employee?.barcode_no;

    if (!barcodeNo) {
      setNoPayError("Barcode number not found for this employee");
      setNoPayData([]);
      return;
    }

    if (!selectedYear) {
      setNoPayError("No year selected");
      return;
    }

    setNoPayLoading(true);
    setNoPayError(null);

    try {
      const noPayResponse = await CommonService.GetEmployeeNoPay(barcodeNo, selectedYear);
      if (noPayResponse?.data?.StatusCode === 200) {
        const resultSet = noPayResponse.data.ResultSet || [];
        setNoPayData(resultSet);
        if (resultSet.length === 0) {
          setNoPayError(`No pay records found for ${selectedYear}`);
        }
      } else {
        setNoPayData([]);
        setNoPayError(noPayResponse?.data?.Message || `No Pay data is not available for ${selectedYear}`);
      }
    } catch (error) {
      console.error("No Pay fetch error:", error);
      setNoPayError(error?.response?.data?.Message || error?.message || "Network error - Failed to load No Pay data");
      setNoPayData([]);
    } finally {
      setNoPayLoading(false);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setNoPayError(null);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getEmployeeImageUrl = () => {
    if (!employee?.sno) return null;
    return `https://esystems.cdl.lk/backendDGES/BizTrack/Home/DGESGetUserImg?serviceNo=${employee.sno}`;
  };

  const getYearOptions = () => {
    const currentYearNum = new Date().getFullYear();
    const years = [];
    for (let i = 0; i <= 5; i++) {
      years.push((currentYearNum - i).toString());
    }
    return years;
  };

  const noPayTotal = noPayData.reduce(
    (sum, item) => sum + (parseFloat(item.Nopay_Count || item.nopay_count) || 0),
    0
  );

  const TABS = [
    { label: "Profile", icon: <Person sx={{ fontSize: 17 }} /> },
    { label: "Other Info", icon: <InfoOutlined sx={{ fontSize: 17 }} /> },
    { label: "No Pay", icon: <ReceiptLong sx={{ fontSize: 17 }} /> },
    { label: "Attendance", icon: <AccessTime sx={{ fontSize: 17 }} /> },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          maxHeight: "92vh",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ position: "relative", bgcolor: "#004AAD", p: "20px" }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute", right: 14, top: 14,
            color: "#fff", bgcolor: "rgba(255,255,255,0.15)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
            width: 32, height: 32,
          }}
        >
          <Close sx={{ fontSize: 18 }} />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
          <Avatar
            src={!imageError ? getEmployeeImageUrl() : undefined}
            onError={() => setImageError(true)}
            sx={{
              width: 68, height: 68,
              bgcolor: "#d0dff5", color: "#004AAD",
              fontSize: "1.5rem", fontWeight: 500,
              border: "3px solid rgba(255,255,255,0.85)",
              flexShrink: 0,
            }}
          >
            {getInitials(employee?.repname)}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600, fontSize: "1rem", lineHeight: 1.3 }}>
              {employee?.repname || "-"}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.78rem", mb: 0.8 }}>
              {employee?.des || "No Designation"}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.7, flexWrap: "wrap" }}>
              {employee?.sno && (
                <Chip label={employee.sno} size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
              )}
              {employeeDetails?.barcode_no && (
                <Chip label={`BC: ${employeeDetails.barcode_no}`} size="small"
                  sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.68rem", fontWeight: 600, height: 22, borderRadius: "20px" }} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
        variant="fullWidth"
        sx={{
          borderBottom: "0.5px solid #e2e8f0",
          minHeight: 44,
          "& .MuiTab-root": {
            textTransform: "none", fontWeight: 600, fontSize: "0.72rem",
            minHeight: 44, py: 0, gap: "4px", color: "#94a3b8",
          },
          "& .Mui-selected": { color: "#004AAD" },
          "& .MuiTabs-indicator": { backgroundColor: "#004AAD", height: 2 },
        }}
      >
        {TABS.map((t, i) => (
          <Tab key={i} icon={t.icon} iconPosition="start" label={t.label} />
        ))}
      </Tabs>

      {/* Body */}
      <DialogContent sx={{ p: 0, overflow: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "#004AAD" }} />
          </Box>
        ) : (
          <>
            {/* ── Profile Tab ── */}
            {tabValue === 0 && (
              <Box sx={{ px: 2, py: 0.5 }}>
                {employeeDetails ? (
                  <>
                    <InfoCard colorKey="blue" icon={<Work />} label="W.Category" value={employeeDetails.work_category} />
                    <InfoCard colorKey="purple" icon={<Phone />} label="Mobile" value={employeeDetails.mobile_no}
                      action={
                        employeeDetails.mobile_no ? (
                          <Box component="a" href={`tel:${employeeDetails.mobile_no}`}
                            sx={{ width: 34, height: 34, borderRadius: "10px", background: "#eaf3de", display: "flex", alignItems: "center", justifyContent: "center", "& svg": { fontSize: 18, color: "#3B6D11" } }}>
                            <Phone />
                          </Box>
                        ) : null
                      }
                    />
                    <InfoCard colorKey="teal" icon={<Business />} label="Division" value={employeeDetails.division} />
                    <InfoCard colorKey="amber" icon={<AccountTree />} label="Department" value={employeeDetails.department} />
                    <InfoCard colorKey="blue" icon={<Email />} label="Email" value={employeeDetails.email} />
                    <InfoCard colorKey="teal" icon={<CalendarToday />} label="Permanant Date" value={employeeDetails.permanant_date} />
                    <InfoCard colorKey="amber" icon={<EventNote />} label="Retirement Date" value={employeeDetails.retirement_date} />
                  </>
                ) : (
                  <PlaceholderTab icon={<Person sx={{ fontSize: 44 }} />} message="No profile data available" />
                )}
              </Box>
            )}

            {/* ── Other Info Tab ── */}
            {tabValue === 1 && <OtherInfoTab sno={employee?.sno} />}

            {/* ── No Pay Tab ── */}
            {tabValue === 2 && (
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, color: "#004AAD", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 0.8 }}>
                    <AttachMoney sx={{ fontSize: 16 }} />
                    No Pay Summary
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontSize: "0.7rem", color: "#64748b" }}>Year:</Typography>
                    <Box
                      component="select"
                      value={selectedYear}
                      onChange={handleYearChange}
                      sx={{
                        px: 1.5, py: 0.6,
                        fontSize: "0.75rem", fontWeight: 600,
                        border: "1px solid #e2e8f0", borderRadius: "8px",
                        backgroundColor: "#fff", color: "#004AAD",
                        cursor: "pointer", outline: "none",
                        "&:focus": { borderColor: "#004AAD", boxShadow: "0 0 0 2px rgba(0,74,173,0.1)" },
                      }}
                    >
                      {getYearOptions().map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {noPayLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress sx={{ color: "#004AAD" }} size={32} />
                  </Box>
                ) : noPayError ? (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <ReceiptLong sx={{ fontSize: 44, color: "#918e8e", mb: 1 }} />
                    <Typography sx={{ color: "#918e8e", fontSize: "0.82rem", mb: 1 }}>{noPayError}</Typography>
                  </Box>
                ) : noPayData.length === 0 ? (
                  <PlaceholderTab
                    icon={<ReceiptLong sx={{ fontSize: 44 }} />}
                    message={`No pay records found for ${selectedYear}`}
                  />
                ) : (
                  <Box sx={{ border: "0.5px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "36px 1fr auto",
                        px: 2, py: 1.2,
                        bgcolor: "#f1f5f9",
                      }}
                    >
                      {[
                        { label: "#", align: "left" },
                        { label: "MONTH", align: "left" },
                        { label: "COUNT", align: "right" },
                      ].map(({ label, align }) => (
                        <Typography
                          key={label}
                          sx={{
                            fontSize: "0.65rem", fontWeight: 700,
                            color: "#64748b", letterSpacing: "0.07em",
                            textAlign: align,
                          }}
                        >
                          {label}
                        </Typography>
                      ))}
                    </Box>

                    {noPayData.map((item, index) => {
                      let monthName = item.Month || "-";
                      try {
                        if (item.Month?.includes("-")) {
                          const [y, m] = item.Month.split("-");
                          monthName = new Date(parseInt(y), parseInt(m) - 1)
                            .toLocaleString("default", { month: "long" });
                        } else {
                          const d = new Date(item.Month);
                          if (!isNaN(d)) {
                            monthName = d.toLocaleString("default", { month: "long" });
                          }
                        }
                      } catch (_) { }

                      const count = parseFloat(item.Nopay_Count || item.nopay_count) || 0;

                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "36px 1fr auto",
                            px: 2, py: 1.4,
                            borderTop: "0.5px solid #e2e8f0",
                            bgcolor: "#fff",
                            alignItems: "center",
                            "&:hover": { bgcolor: "#f8faff" },
                          }}
                        >
                          <Typography sx={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 600 }}>
                            {index + 1}
                          </Typography>
                          <Typography sx={{ fontSize: "0.88rem", color: "#1e293b" }}>
                            {monthName}
                          </Typography>
                          <Typography sx={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b", textAlign: "right" }}>
                            {count.toFixed(2)}
                          </Typography>
                        </Box>
                      );
                    })}

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "36px 1fr auto",
                        px: 2, py: 1.3,
                        borderTop: "0.5px solid #e2e8f0",
                        bgcolor: "#f8faff",
                        alignItems: "center",
                      }}
                    >
                      <Box />
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.07em" }}>
                        TOTAL
                      </Typography>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#dc2626", textAlign: "right" }}>
                        {noPayTotal.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* ── Attendance Tab ── */}
            {tabValue === 3 && <AttendanceTab sno={employee?.sno} />}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ─── STEP 1: Division Cards ──────────────────────────────────────────────── */
const DivisionStep = ({ divisions, data, onSelect }) => {
  // ✅ CHANGE 2: include divName in divStats and display it below the code
  const divStats = divisions.map((div) => {
    const emps = data.filter((d) => d.division === div);
    const divName = emps[0]?.divName || "";
    const present = emps.filter(isPresent).length;
    const locs = [...new Set(emps.map((e) => e.loc))].length;
    const rate = emps.length > 0 ? Math.round((present / emps.length) * 100) : 0;
    const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
    return { div, divName, total: emps.length, present, locs, rate, rateColor };
  });

  return (
    <Box>
      <Typography sx={{ mb: 1.5, fontWeight: 600, color: "#64748b", fontSize: "0.8rem" }}>
        Select a division to view locations
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {divStats.map(({ div, divName, total, present, locs, rate, rateColor }) => (
          <Box key={div} onClick={() => onSelect(div)}
            sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              px: 2, py: 1.25, border: "1.5px solid #e2e8f0",
              borderRadius: "12px", cursor: "pointer", bgcolor: "#fff",
              transition: "all 0.18s ease",
              "&:hover": { borderColor: "#004AAD", bgcolor: "#f0f5ff" },
            }}
          >
            <Avatar sx={{ width: 34, height: 34, bgcolor: "#e8f0fe", flexShrink: 0 }}>
              <AccountTree sx={{ fontSize: 17, color: "#004AAD" }} />
            </Avatar>

            {/* ✅ Division code (bold) + full name (muted, smaller) */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#1e293b", lineHeight: 1.2 }}>
                {div}
              </Typography>
              {divName && (
                <Typography sx={{ fontSize: "0.6rem", color: "#64748b", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {divName}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
              <Chip label={`${locs} loc`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#e8f0fe", color: "#004AAD" }} />
              <Chip label={`${present}/${total}`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 600, bgcolor: "#dcfce7", color: "#16a34a" }} />
              <Chip label={`${rate}%`} size="small" sx={{ height: 22, fontSize: "0.68rem", fontWeight: 700, bgcolor: `${rateColor}18`, color: rateColor, minWidth: 42 }} />
              <KeyboardArrowDown sx={{ fontSize: 18, color: "#94a3b8", transform: "rotate(-90deg)" }} />
            </Box>
          </Box>
        ))}
        {divStats.length === 0 && (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <Search sx={{ fontSize: 40, color: "#cbd5e1", mb: 1 }} />
            <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No divisions match your search</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

/* ─── STEP 2: Mobile Location Panel ──────────────────────────────────────── */
const MobileLocationPanel = React.memo(({ location, locName, employees, isExpanded, onToggle, onViewAll }) => {
  const strength = employees.length;
  const present = employees.filter(isPresent).length;
  const absent = strength - present;
  const rate = strength > 0 ? Math.round((present / strength) * 100) : 0;
  const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";

  return (
    <Box sx={{ mb: 1.5 }}>
      <Box onClick={() => onToggle(location)}
        sx={{
          display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.5,
          bgcolor: isExpanded ? "#004AAD" : "#fff",
          border: "1.5px solid", borderColor: isExpanded ? "#004AAD" : "#e2e8f0",
          borderRadius: isExpanded ? "14px 14px 0 0" : "14px",
          cursor: "pointer", transition: "all 0.25s ease", userSelect: "none",
        }}
      >
        <Avatar sx={{ width: 36, height: 36, bgcolor: isExpanded ? "rgba(255,255,255,0.2)" : "#e8f0fe", flexShrink: 0 }}>
          <LocationOn sx={{ fontSize: 18, color: isExpanded ? "#fff" : "#004AAD" }} />
        </Avatar>

        {/* ✅ Location code + full name below */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: isExpanded ? "#fff" : "#1e293b", lineHeight: 1.2 }}>
            {location}
          </Typography>
          {locName && (
            <Typography sx={{ fontSize: "0.6rem", color: isExpanded ? "rgba(255,255,255,0.72)" : "#64748b", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {locName}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flexShrink: 0,
          }}
        >
          <Chip
            label={`${present} / ${strength}`}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.72rem",
              fontWeight: 700,
              bgcolor: isExpanded
                ? "rgba(255,255,255,0.18)"
                : "#e8f0fe",
              color: isExpanded ? "#fff" : "#004AAD",
            }}
          />

          <Chip
            label={`${rate}%`}
            size="small"
            sx={{
              height: 24,
              fontSize: "0.72rem",
              fontWeight: 700,
              bgcolor: isExpanded
                ? "rgba(255,255,255,0.18)"
                : `${rateColor}18`,
              color: isExpanded ? "#fff" : rateColor,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.25s ease",
              transform: isExpanded
                ? "rotate(180deg)"
                : "rotate(0deg)",
              color: isExpanded ? "#fff" : "#94a3b8",
              ml: -0.2,
            }}
          >
            <KeyboardArrowDown />
          </Box>
        </Box>
      </Box>

      <Collapse in={isExpanded} timeout={250} unmountOnExit>
        <Box sx={{ border: "1.5px solid #004AAD", borderTop: "none", borderRadius: "0 0 14px 14px", overflow: "hidden", bgcolor: "#f8faff" }}>
          <Box sx={{ display: "flex", borderBottom: "1px solid #e2e8f0", bgcolor: "#fff" }}>
            {[{ label: "Strength", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }]
              .map((s) => (
                <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
                  <Typography sx={{ fontSize: "0.65rem", color: "#64748b", mb: 0.3 }}>{s.label}</Typography>
                  <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
                </Box>
              ))}
          </Box>
          <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr", gap: 0.5, px: 1, py: 0.75, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 0.5 }}>
              {["Service No", "Name", "Designation", "IN Time"].map((h) => (
                <Typography key={h} sx={{ fontSize: "0.62rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
              ))}
            </Box>
            {employees.map((emp, idx) => {
              const p = isPresent(emp);
              return (
                <Box key={emp.sno || idx}
                  sx={{
                    display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr", gap: 0.5,
                    px: 1, py: 0.9, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
                    borderRadius: "6px", mb: 0.25, alignItems: "center",
                    cursor: "pointer", transition: "all 0.2s ease",
                    "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
                  }}
                  onClick={() => onViewAll(emp)}
                >
                  <Typography sx={{ fontSize: "0.68rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.repname || "-"}</Typography>
                  <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2, wordBreak: "break-word" }}>{emp.des || "-"}</Typography>
                  <Typography sx={{ fontSize: "0.68rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#f30a0a" }}>{p ? emp.inn : "NR"}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
});

/* ─── Desktop Location Table ──────────────────────────────────────────────── */
// ✅ CHANGE 4: show locName below location code in the desktop table Location cell
const DesktopLocationTable = ({ locationGroups, expandedRow, onExpand, onViewDetails, onEmployeeClick }) => (
  <TableContainer>
    <Table>
      <TableHead sx={{ bgcolor: "#004AAD" }}>
        <TableRow>
          <TableCell sx={{ color: "white", fontWeight: "bold", width: "35%" }}>Location</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Strength</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Present</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Attendance</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(locationGroups).map(([location, employees]) => {
          const strength = employees.length;
          const present = employees.filter(isPresent).length;
          const absent = strength - present;
          const rate = strength > 0 ? Math.round((present / strength) * 100) : 0;
          const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
          const expanded = expandedRow === location;
          const locName = employees[0]?.locName || "";
          return (
            <React.Fragment key={location}>
              <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(0,74,173,0.04)" } }}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Business sx={{ color: "#004AAD" }} />
                    {/* ✅ Location code bold + full name muted below */}
                    <Box>
                      <Typography fontWeight={500}>{location}</Typography>
                      {locName && (
                        <Typography sx={{ fontSize: "0.72rem", color: "#64748b", lineHeight: 1.3 }}>
                          {locName}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center"><Chip label={strength} size="small" sx={{ bgcolor: "#e8f0fe", color: "#004AAD", fontWeight: "bold" }} /></TableCell>
                <TableCell align="center"><Chip label={present} size="small" sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: "bold" }} /></TableCell>
                <TableCell align="center"><Chip label={`${rate}%`} size="small" sx={{ bgcolor: `${rateColor}18`, color: rateColor, fontWeight: "bold" }} /></TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => onExpand(location)} sx={{ color: "#004AAD" }}>
                    {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                  <Button size="small" variant="outlined" startIcon={<Visibility />}
                    onClick={() => onViewDetails({ location, locName, employees, strength, present, absent, rate })}
                    sx={{ ml: 1, borderColor: "#004AAD", color: "#004AAD", textTransform: "none" }}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 0 }}>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ m: 2, bgcolor: "#f8faff", borderRadius: "12px", p: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: "bold", color: "#004AAD" }}>
                        Employee List - {location}{locName ? ` · ${locName}` : ""}
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#e8f0fe" }}>
                            {["Service No", "Name", "Designation", "Clock No", "IN Time", "Prev. OUT", "Status"].map((h) => (
                              <TableCell key={h}><b>{h}</b></TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employees.map((emp, idx) => {
                            const p = isPresent(emp);
                            return (
                              <TableRow key={emp.sno || idx} hover sx={{ cursor: "pointer" }} onClick={() => onEmployeeClick(emp)}>
                                <TableCell>{emp.sno || "-"}</TableCell>
                                <TableCell>{emp.repname || "-"}</TableCell>
                                <TableCell>{emp.des || "-"}</TableCell>
                                <TableCell>{emp.cno || "-"}</TableCell>
                                <TableCell>
                                  <Chip label={p ? emp.inn : "NR"} size="small"
                                    sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
                                </TableCell>
                                <TableCell>{emp.pout || "-"}</TableCell>
                                <TableCell>
                                  <Chip label={p ? "Present" : "Absent"} size="small"
                                    icon={p ? <CheckCircle sx={{ fontSize: "12px !important" }} /> : <Cancel sx={{ fontSize: "12px !important" }} />}
                                    sx={{ bgcolor: p ? "#dcfce7" : "#fee2e2", color: p ? "#16a34a" : "#dc2626", fontSize: "0.7rem" }} />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
        {Object.keys(locationGroups).length === 0 && (
          <TableRow>
            <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
              <Search sx={{ fontSize: 40, color: "#cbd5e1", display: "block", mx: "auto", mb: 1 }} />
              <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

/* ─── Detail Drawer ───────────────────────────────────────────────────────── */
// ✅ CHANGE 5: show locName in drawer header
const DetailDrawer = ({ open, onClose, data, onEmployeeClick }) => {
  if (!data) return null;
  const { location, locName, employees, strength, present, absent, rate } = data;
  const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
  return (
    <SwipeableDrawer anchor="bottom" open={open} onClose={onClose} onOpen={() => { }} disableSwipeToOpen
      sx={{ "& .MuiDrawer-paper": { borderTopLeftRadius: "24px", borderTopRightRadius: "24px", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" } }}>
      <Box sx={{ pt: 1.5, pb: 0.5, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: "#cbd5e1" }} />
      </Box>
      <Box sx={{ px: 2.5, py: 2, bgcolor: "#004AAD", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <Box>
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{location}</Typography>
          {/* ✅ Full location name shown below the code */}
          {locName && (
            <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: "0.75rem", mt: 0.2, lineHeight: 1.3 }}>{locName}</Typography>
          )}
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", mt: 0.3 }}>{strength} employees</Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}><Close /></IconButton>
      </Box>
      <Box sx={{ display: "flex", flexShrink: 0, borderBottom: "1px solid #f1f5f9" }}>
        {[{ label: "Total", value: strength, color: "#004AAD" }, { label: "Present", value: present, color: "#16a34a" }, { label: "Absent", value: absent, color: "#dc2626" }, { label: "Rate", value: `${rate}%`, color: rateColor }]
          .map((s) => (
            <Box key={s.label} sx={{ flex: 1, textAlign: "center", py: 1.5, borderRight: "1px solid #f1f5f9", "&:last-child": { borderRight: "none" } }}>
              <Typography sx={{ fontSize: "0.63rem", color: "#64748b" }}>{s.label}</Typography>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: s.color }}>{s.value}</Typography>
            </Box>
          ))}
      </Box>
      <Box sx={{ overflowY: "auto", flex: 1, px: 2, py: 1.5 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5, px: 1, py: 0.8, bgcolor: "#e8f0fe", borderRadius: "8px", mb: 1, position: "sticky", top: 0, zIndex: 1 }}>
          {["Svc No", "Name", "Designation", "IN Time", "Status"].map((h) => (
            <Typography key={h} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#004AAD" }}>{h}</Typography>
          ))}
        </Box>
        {employees.map((emp, idx) => {
          const p = isPresent(emp);
          return (
            <Box key={emp.sno || idx}
              sx={{
                display: "grid", gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr", gap: 0.5,
                px: 1, py: 1, bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
                borderRadius: "8px", mb: 0.5, alignItems: "center", border: "1px solid #f1f5f9",
                cursor: "pointer", transition: "all 0.2s ease",
                "&:hover": { bgcolor: "#e8f0fe", transform: "translateX(4px)" },
              }}
              onClick={() => onEmployeeClick(emp)}
            >
              <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>{emp.sno || "-"}</Typography>
              <Box>
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>{emp.repname || "-"}</Typography>
                <Typography sx={{ fontSize: "0.6rem", color: "#94a3b8" }}>{emp.cno ? `Clk: ${emp.cno}` : ""}</Typography>
              </Box>
              <Typography sx={{ fontSize: "0.62rem", color: "#64748b", lineHeight: 1.2 }}>{emp.des || "-"}</Typography>
              <Box>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: p ? 700 : 400, color: p ? "#16a34a" : "#94a3b8" }}>{p ? emp.inn : "NR"}</Typography>
                {emp.pout && <Typography sx={{ fontSize: "0.58rem", color: "#94a3b8" }}>OUT: {emp.pout}</Typography>}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p ? <CheckCircle sx={{ fontSize: 16, color: "#16a34a" }} /> : <Cancel sx={{ fontSize: 16, color: "#dc2626" }} />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </SwipeableDrawer>
  );
};

/* ─── Breadcrumb ──────────────────────────────────────────────────────────── */
const Breadcrumb = ({ division, onBack }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
    <IconButton size="small" onClick={onBack}
      sx={{ color: "#004AAD", bgcolor: "#e8f0fe", borderRadius: "8px", "&:hover": { bgcolor: "#d0e2ff" } }}>
      <ArrowBack fontSize="small" />
    </IconButton>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
      <Typography onClick={onBack}
        sx={{ fontSize: "0.8rem", color: "#004AAD", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
        All Divisions
      </Typography>
      <Typography sx={{ fontSize: "0.8rem", color: "#94a3b8" }}>/</Typography>
      <Chip label={division} size="small" sx={{ height: 22, fontSize: "0.72rem", fontWeight: 700, bgcolor: "#004AAD", color: "#fff" }} />
    </Box>
  </Box>
);

/* ─── SearchBar ───────────────────────────────────────────────────────────── */
const SearchBar = ({ value, onChange, placeholder }) => (
  <Box
    sx={{
      display: "flex", alignItems: "center", gap: 1,
      mb: 2, px: 1.5, py: 0.85,
      border: "1.5px solid #e2e8f0",
      borderRadius: "12px",
      bgcolor: "#fff",
      transition: "border-color 0.18s ease, box-shadow 0.18s ease",
      "&:focus-within": {
        borderColor: "#004AAD",
        boxShadow: "0 0 0 3px rgba(0,74,173,0.08)",
      },
    }}
  >
    <Search sx={{ fontSize: 18, color: "#94a3b8", flexShrink: 0 }} />
    <Box
      component="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search…"}
      sx={{
        flex: 1, border: "none", outline: "none",
        fontSize: "0.85rem", color: "#1e293b",
        bgcolor: "transparent", fontFamily: "inherit",
        "&::placeholder": { color: "#94a3b8" },
      }}
    />
    {value && (
      <IconButton
        size="small"
        onClick={() => onChange("")}
        sx={{
          color: "#94a3b8", p: 0.3,
          "&:hover": { color: "#004AAD", bgcolor: "#e8f0fe" },
          borderRadius: "6px",
        }}
      >
        <Close sx={{ fontSize: 16 }} />
      </IconButton>
    )}
  </Box>
);

/* ─── DGESatt (inner) ─────────────────────────────────────────────────────── */
const DGESatt = ({ data = [], loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const currentYear = new Date().getFullYear().toString();

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [employeePopupOpen, setEmployeePopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const scrollRef = useRef(null);

  const handleDivisionSelect = useCallback((div) => {
    setSelectedDivision(div);
    setExpandedRow(null);
    setSearchTerm("");
  }, []);

  const handleBack = useCallback(() => {
    setSelectedDivision(null);
    setExpandedRow(null);
    setSearchTerm("");
  }, []);

  const handleToggle = useCallback((loc) => setExpandedRow((prev) => (prev === loc ? null : loc)), []);
  const handleViewDetails = useCallback((locData) => { setSelectedLocation(locData); setDrawerOpen(true); }, []);
  const handleEmployeeClick = useCallback((emp) => { setSelectedEmployee(emp); setEmployeePopupOpen(true); }, []);

  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <Typography>Loading CDPLC location attendance...</Typography>
        </Box>
      </Paper>
    );
  }

  /* ── Filtered data ── */
  const term = searchTerm.toLowerCase().trim();
  const filteredData = term
    ? data.filter((d) =>
      d.repname?.toLowerCase().includes(term) ||
      d.sno?.toLowerCase().includes(term) ||
      d.des?.toLowerCase().includes(term) ||
      d.division?.toLowerCase().includes(term) ||
      d.divName?.toLowerCase().includes(term) ||
      d.loc?.toLowerCase().includes(term) ||
      d.locName?.toLowerCase().includes(term)
    )
    : data;

  const divisions = [...new Set(filteredData.map((d) => d.division).filter(Boolean))].sort();

  const locationGroups = {};
  if (selectedDivision) {
    filteredData.filter((d) => d.division === selectedDivision).forEach((item) => {
      const loc = item.loc?.trim() || "Unknown";
      if (!locationGroups[loc]) locationGroups[loc] = [];
      locationGroups[loc].push(item);
    });
  }

  const totalLocations = Object.keys(locationGroups).length;
  const divEmployees = selectedDivision ? filteredData.filter((d) => d.division === selectedDivision) : [];
  const totalPresent = divEmployees.filter(isPresent).length;

  /* ── Subtitle text ── */
  const subtitle = selectedDivision
    ? `${totalLocations} locations · ${divEmployees.length} employees · ${totalPresent} present${term ? ` · filtered by "${searchTerm}"` : ""}`
    : `${divisions.length} divisions · ${filteredData.length} employees total${term ? ` · filtered by "${searchTerm}"` : ""}`;

  /* ── Search placeholder ── */
  const searchPlaceholder = selectedDivision
    ? "Search by name, service no, designation, location…"
    : "Search by name, service no, designation, division…";

  return (
    <>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,74,173,0.06)" }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: "#004AAD", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
            DGES Employee Strength - Division
          </Typography>
          <Typography sx={{ color: "#64748b", fontSize: "0.8rem" }}>
            {subtitle}
          </Typography>
        </Box>

        {/* ── Search Bar ── */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={searchPlaceholder}
        />

        {!selectedDivision && (
          <DivisionStep divisions={divisions} data={filteredData} onSelect={handleDivisionSelect} />
        )}

        {selectedDivision && (
          <>
            <Breadcrumb division={selectedDivision} onBack={handleBack} />
            {isMobile ? (
              <Box ref={scrollRef}
                sx={{
                  maxHeight: "calc(100vh - 260px)", overflowY: "auto", overflowX: "hidden", pr: 0.5,
                  "&::-webkit-scrollbar": { width: 4 },
                  "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
                  "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 4 },
                }}
              >
                {Object.entries(locationGroups).map(([location, employees]) => (
                  <MobileLocationPanel
                    key={location}
                    location={location}
                    locName={employees[0]?.locName || ""}
                    employees={employees}
                    isExpanded={expandedRow === location}
                    onToggle={handleToggle}
                    onViewAll={handleEmployeeClick}
                  />
                ))}
                {Object.keys(locationGroups).length === 0 && (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <Search sx={{ fontSize: 44, color: "#cbd5e1", mb: 1 }} />
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>No locations match your search</Typography>
                  </Box>
                )}
                <Box sx={{ height: 80 }} />
              </Box>
            ) : (
              <DesktopLocationTable
                locationGroups={locationGroups}
                expandedRow={expandedRow}
                onExpand={handleToggle}
                onViewDetails={handleViewDetails}
                onEmployeeClick={handleEmployeeClick}
              />
            )}
          </>
        )}
      </Paper>

      <DetailDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setTimeout(() => setSelectedLocation(null), 300); }}
        data={selectedLocation}
        onEmployeeClick={handleEmployeeClick}
      />

      <EmployeeDetailsPopup
        open={employeePopupOpen}
        onClose={() => { setEmployeePopupOpen(false); setTimeout(() => setSelectedEmployee(null), 300); }}
        employee={selectedEmployee}
        currentYear={currentYear}
      />
    </>
  );
};

/* ─── Data Wrapper (exported) ─────────────────────────────────────────────── */
export const CDLLocBaseAttendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await CommonService.GetCdllocbaseAttendance();
        const resultSet = response?.data?.ResultSet || [];
        const normalized = resultSet.map(normalizeRow);
        if (active) setData(normalized);
      } catch (err) {
        if (active) setError("Failed to load CDPLC location attendance.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, []);

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Typography sx={{ color: "#dc2626", fontWeight: 600 }}>{error}</Typography>
      </Paper>
    );
  }

  return <DGESatt data={data} loading={loading} />;
};