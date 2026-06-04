import React from "react";
import { Box, Typography, Grid, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  ConstructionOutlined, 
  EngineeringOutlined, 
  DynamicFormOutlined, 
  MonitorHeartOutlined, 
  CalendarMonthOutlined, 
  AccessTimeOutlined, 
  InsertDriveFileOutlined, 
  HandshakeOutlined 
} from "@mui/icons-material";

const Approvals = () => {
  const navigate = useNavigate();

  const categories = [
    // {
    //   id: "iwo",
    //   name: "IWO",
    //   fullName: "Internal Work Orders",
    //   icon: <ConstructionOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/iwo"
    // },
    // {
    //   id: "ewo",
    //   name: "EWO",
    //   fullName: "External Work Orders",
    //   icon: <EngineeringOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/ewo"
    // },
    // {
    //   id: "moc",
    //   name: "MOC",
    //   fullName: "Management of Change",
    //   icon: <DynamicFormOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/moc"
    // },
    // {
    //   id: "umr",
    //   name: "UMR",
    //   fullName: "Unit Modification Request",
    //   icon: <MonitorHeartOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/umr"
    // },
    // {
    //   id: "leave",
    //   name: "Leave",
    //   fullName: "Leave Requests",
    //   icon: <CalendarMonthOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/leave"
    // },
    // {
    //   id: "ot",
    //   name: "OT",
    //   fullName: "Overtime",
    //   icon: <AccessTimeOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/ot"
    // },
    // {
    //   id: "efile",
    //   name: "E-File",
    //   fullName: "Electronic Files",
    //   icon: <InsertDriveFileOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/efile"
    // },

     {
      id: "Attendance",
      name: "Attendance",
      fullName: "Check in / Check out",
      icon: <InsertDriveFileOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
      path: "/approvals/Attendance"
    },
    // {
    //   id: "agreement",
    //   name: "Agreement",
    //   fullName: "Agreements & Contracts",
    //   icon: <HandshakeOutlined fontSize="large" sx={{ opacity: 0.7 }} />,
    //   path: "/approvals/agreement"
    // }
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, textAlign: "center" }}>
        Approvals
      </Typography>
      
      <Grid container spacing={1}>
        {categories.map((category) => (
          <Grid item xs={4} key={category.id} sx={{ padding: 1 }}>
            <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
              <CardActionArea onClick={() => navigate(category.path)}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column"
                }}>
                  {category.icon}
                  <Typography
                    gutterBottom
                    fontSize={14}
                    fontWeight={600}
                    component="div"
                    style={{ opacity: "40%" }}
                  >
                    {category.name}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Approvals;











// //------------------------------------------Update V2---------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, Fade } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { 
//   ConstructionOutlined, 
//   EngineeringOutlined, 
//   AccessTimeOutlined 
// } from "@mui/icons-material";

// // ─── Accent color palette per card ───────────────────────────────────────────
// const cardAccents = [
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
// ];

// // ─── ServiceCard Component ────────────────────────────────────────────────────
// function ServiceCard({ name, fullName, icon, onClick, accentIndex = 0, delay = 0 }) {
//   const [visible, setVisible] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const accent = cardAccents[accentIndex % cardAccents.length];
  
//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), delay);
//     return () => clearTimeout(t);
//   }, [delay]);
  
//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         width: "100%",
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
//         transition: "opacity 0.45s ease, transform 0.45s ease",
//         cursor: "pointer",
//         borderRadius: 20,
//         background: "#ffffff",
//         border: `1.5px solid ${hovered ? accent.border : "#F1F5F9"}`,
//         boxShadow: hovered
//           ? `0 12px 30px rgba(37,40,231,0.12), 0 0 0 3px ${accent.border}`
//           : "0 4px 12px rgba(0,0,0,0.03)",
//         padding: "20px 8px 16px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 12,
//         height: 140,
//         boxSizing: "border-box",
//         userSelect: "none",
//         transform: hovered
//           ? "translateY(-4px) scale(1.02)"
//           : visible
//           ? "translateY(0) scale(1)"
//           : "translateY(16px) scale(0.95)",
//       }}
//     >
//       {/* Icon bubble */}
//       <div
//         style={{
//           width: 60,
//           height: 60,
//           borderRadius: 18,
//           background: accent.bg,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: accent.icon,
//           transition: "all 0.3s ease",
//           transform: hovered ? "scale(1.1) rotate(-5deg)" : "scale(1)",
//         }}
//       >
//         {React.cloneElement(icon, { 
//           sx: { 
//             fontSize: 32,
//             color: accent.icon,
//             transition: "transform 0.3s ease",
//           } 
//         })}
//       </div>
      
//       {/* Label and full name */}
//       <div style={{ textAlign: "center", width: "100%" }}>
//         <span
//           style={{
//             fontSize: 15,
//             fontWeight: 700,
//             color: "#1e293b",
//             letterSpacing: "-0.01em",
//             display: "block",
//             lineHeight: 1.3,
//             fontFamily: "'Inter', 'DM Sans', 'Segoe UI', sans-serif",
//             marginBottom: 4,
//           }}
//         >
//           {name}
//         </span>
//         <span
//           style={{
//             fontSize: 11,
//             fontWeight: 500,
//             color: "#64748b",
//             letterSpacing: "0.02em",
//             display: "block",
//             fontFamily: "'Inter', 'DM Sans', sans-serif",
//             opacity: hovered ? 1 : 0.7,
//             transition: "opacity 0.2s ease",
//           }}
//         >
//           {fullName}
//         </span>
//       </div>
//     </div>
//   );
// }

// // ─── Main Approvals Component ─────────────────────────────────────────────────────
// export default function Approvals() {
//   const navigate = useNavigate();
  
//   const categories = [
//     { 
//       id: "iwo", 
//       name: "IWO", 
//       fullName: "Internal Work Orders", 
//       icon: <ConstructionOutlined />, 
//       path: "/approvals/iwo", 
//       accent: 0 
//     },
//     { 
//       id: "ewo", 
//       name: "EWO", 
//       fullName: "External Work Orders", 
//       icon: <EngineeringOutlined />, 
//       path: "/approvals/ewo", 
//       accent: 1 
//     },
//     { 
//       id: "ot", 
//       name: "OT", 
//       fullName: "Overtime", 
//       icon: <AccessTimeOutlined />, 
//       path: "/approvals/ot", 
//       accent: 2 
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "900px",
//         margin: "0 auto",
//         padding: { xs: 2, sm: 3 },
//         fontFamily: "'Inter', 'DM Sans', 'Segoe UI', sans-serif",
//         minHeight: "100vh",
//         background: "linear-gradient(145deg, #ffffff 0%, #fafaff 100%)",
//       }}
//     >
//       {/* Header with decorative elements */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: 32,
//           position: "relative",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//           <div
//             style={{
//               width: 8,
//               height: 40,
//               background: "linear-gradient(180deg, #2528e7 0%, #6366F1 100%)",
//               borderRadius: 8,
//             }}
//           />
//           <div>
//             <Typography
//               variant="h4"
//               sx={{
//                 fontWeight: 700,
//                 color: "#0f172a",
//                 fontSize: { xs: "1.75rem", sm: "2rem" },
//                 letterSpacing: "-0.02em",
//                 lineHeight: 1.2,
//               }}
//             >
//               Approvals
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#64748b",
//                 fontSize: "0.9rem",
//                 fontWeight: 500,
//                 marginTop: 0.5,
//               }}
//             >
//               Manage and review pending requests
//             </Typography>
//           </div>
//         </div>
        
//         {/* Decorative badge */}
//         <div
//           style={{
//             background: "#EEF2FF",
//             padding: "6px 16px",
//             borderRadius: 40,
//             border: "1px solid #C7D2FE",
//           }}
//         >
//           <span style={{ color: "#2528e7", fontWeight: 600, fontSize: "0.85rem" }}>
//             {categories.length} Categories
//           </span>
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <Grid container spacing={2}>
//         {categories.map((category, index) => (
//           <Grid item xs={12} sm={6} md={4} key={category.id} sx={{ display: "flex" }}>
//             <ServiceCard
//               name={category.name}
//               fullName={category.fullName}
//               icon={category.icon}
//               onClick={() => navigate(category.path)}
//               accentIndex={category.accent}
//               delay={index * 100}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Optional footer with stats or info */}
//       <Box
//         sx={{
//           marginTop: 4,
//           padding: 3,
//           background: "#ffffff",
//           borderRadius: 3,
//           border: "1px solid #F1F5F9",
//           display: "flex",
//           justifyContent: "space-around",
//           flexWrap: "wrap",
//           gap: 2,
//         }}
//       >
//         {[
//           { label: "Pending IWO", value: "12", color: "#2528e7" },
//           { label: "Pending EWO", value: "8", color: "#2528e7" },
//           { label: "Pending OT", value: "23", color: "#2528e7" },
//         ].map((item, idx) => (
//           <div key={idx} style={{ textAlign: "center" }}>
//             <span style={{ fontSize: "1.5rem", fontWeight: 700, color: item.color }}>
//               {item.value}
//             </span>
//             <span style={{ fontSize: "0.85rem", color: "#64748b", display: "block" }}>
//               {item.label}
//             </span>
//           </div>
//         ))}
//       </Box>
//     </Box>
//   );
// }









//------------------------------------------Update V2---------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { 
//   ConstructionOutlined, 
//   EngineeringOutlined, 
//   AccessTimeOutlined 
// } from "@mui/icons-material";

// // ─── Accent color palette per card ───────────────────────────────────────────
// const cardAccents = [
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
//   { bg: "#EEF2FF", icon: "#2528e7", border: "#C7D2FE" },
// ];

// // ─── ServiceCard Component ────────────────────────────────────────────────────
// function ServiceCard({ label, fullName, icon, onClick, accentIndex = 0, delay = 0 }) {
//   const [visible, setVisible] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const accent = cardAccents[accentIndex % cardAccents.length];
  
//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), delay);
//     return () => clearTimeout(t);
//   }, [delay]);
  
//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         width: "100%",
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
//         transition: "opacity 0.45s ease, transform 0.45s ease",
//         cursor: "pointer",
//         borderRadius: 16,
//         background: "#fffffff3",
//         border: `1.5px solid ${hovered ? accent.border : "#F1F5F9"}`,
//         boxShadow: hovered
//           ? `0 8px 30px rgba(0,0,0,0.10), 0 0 0 3px ${accent.border}`
//           : "0 2px 8px rgba(0,0,0,0.05)",
//         padding: "20px 8px 16px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: 10,
//         height: 120,
//         boxSizing: "border-box",
//         userSelect: "none",
//         transform: hovered
//           ? "translateY(-3px) scale(1.02)"
//           : visible
//           ? "translateY(0) scale(1)"
//           : "translateY(16px) scale(0.95)",
//       }}
//     >
//       {/* Icon bubble */}
//       <div
//         style={{
//           width: 52,
//           height: 52,
//           borderRadius: 14,
//           background: accent.bg,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           color: accent.icon,
//           transition: "transform 0.25s ease",
//           transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1)",
//         }}
//       >
//         {React.cloneElement(icon, { 
//           sx: { 
//             fontSize: 32,
//             color: accent.icon,
//             opacity: 1
//           } 
//         })}
//       </div>
//       {/* Label */}
//       <div style={{ textAlign: "center" }}>
//         <span
//           style={{
//             fontSize: 14,
//             fontWeight: 600,
//             color: "#374151",
//             letterSpacing: "0.01em",
//             lineHeight: 1.3,
//             fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//             display: "block",
//           }}
//         >
//           {label}
//         </span>
//         {fullName && (
//           <span
//             style={{
//               fontSize: 10,
//               fontWeight: 400,
//               color: "#6B7280",
//               letterSpacing: "0.01em",
//               lineHeight: 1.2,
//               fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//               display: "block",
//               marginTop: 2,
//             }}
//           >
//             {fullName}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main Approvals Component ─────────────────────────────────────────────────────
// export default function Approvals() {
//   const navigate = useNavigate();

//   const categories = [
//     {
//       id: "iwo",
//       name: "IWO",
//       fullName: "Internal Work Orders",
//       icon: <ConstructionOutlined />,
//       path: "/approvals/iwo",
//       accent: 0
//     },
//     {
//       id: "ewo",
//       name: "EWO",
//       fullName: "External Work Orders",
//       icon: <EngineeringOutlined />,
//       path: "/approvals/ewo",
//       accent: 1
//     },
//     {
//       id: "ot",
//       name: "OT",
//       fullName: "Overtime",
//       icon: <AccessTimeOutlined />,
//       path: "/approvals/ot",
//       accent: 2
//     }
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "800px",
//         margin: "0 auto",
//         padding: 2,
//         fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//       }}
//     >
//       {/* Header with subtle accent line */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 12,
//           marginBottom: 20,
//         }}
//       >
//         <div
//           style={{
//             width: 4,
//             height: 24,
//             background: "#2528e7",
//             borderRadius: 4,
//           }}
//         />
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 600,
//             color: "#1e293b",
//             fontSize: "1.5rem",
//             letterSpacing: "-0.02em",
//           }}
//         >
//           Approvals
//         </Typography>
//       </div>

//       {/* Cards Grid */}
//       <Grid container spacing={1.5}>
//         {categories.map((category, index) => (
//           <Grid item xs={4} key={category.id} sx={{ display: "flex" }}>
//             <ServiceCard
//               label={category.name}
//               fullName={category.fullName}
//               icon={category.icon}
//               onClick={() => navigate(category.path)}
//               accentIndex={category.accent}
//               delay={index * 80}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }