import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Approvals = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: "EMOBCI0002",
      label: "Attendance",
      path: "/Attendance",
      icon: "attendance.png",
    },
    {
      id: "EMOBCI0002",
      label: "InOut",
      path: "/attendance-entry",
      icon: "arrived.png",
    },
    
    // { id: "EMOBCI0003", label: "Leave", path: "/Leave", icon: "exit.png" },
    // {
    //   id: "EMOBCI0005",
    //   label: "Extra Hours",
    //   path: "/ex_hours",
    //   icon: "ex_hours.png",
    // },

    // {
    //   id: "EMOBCI0005",
    //   label: "Time Endoresement",
    //   path: "/time_endoresement",
    //   icon: "time_endoresement.png",
    // },

    // {
    //   id: "EMOBCI0005",
    //   label: "Welfare",
    //   path: "/Welfare",
    //   icon: "welfare.png",
    // },

    // {
    //   id: "EMOBCI0006",
    //   label: "Sahanasala",
    //   path: "/budgetshop",
    //   icon: "store.png",
    // },
    // {
    //   id: "EMOBCI0007",
    //   label: "Medical",
    //   path: "/Medical",
    //   icon: "healthcare.png",
    // },
    
    // {
    //   id: "EMOBCI0009",
    //   label: "Outstanding Tools",
    //   path: "/tools",
    //   icon: "tools.png",
    // },
  ];

  return (
    <Box
      sx={{ width: "100%", maxWidth: "800px", margin: "0 auto", padding: 2 }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 500, textAlign: "center" }}
      >
        Personal
      </Typography>
      <Grid container spacing={1}>
        {categories.map((category) => (
          <Grid item xs={4} key={category.id} sx={{ padding: 1 }}>
            <Card
              sx={{
                padding: 2,
                boxShadow: 0,
                borderRadius: 2,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardActionArea
                onClick={() => navigate(category.path)}
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <img
                    className="d-block"
                    src={require(`../../assets/icons/${category.icon}`)}
                    alt={category.label}
                    style={{ opacity: "70%", width: "40px", height: "40px" }}
                  />
                  <Typography
                    gutterBottom
                    fontSize={14}
                    fontWeight={600}
                    component="div"
                    style={{
                      opacity: "40%",
                      textAlign: "center",
                      marginTop: 8,
                      width: "100%",
                    }}
                  >
                    {category.label}
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




//---------------------------------------------------------Update V2---------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, Fade } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// // ─── Inline SVG Icons ────────────────────────────────────────────────────────
// const Icons = {
//   Attendance: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <circle cx="12" cy="8" r="4" />
//       <path d="M5.5 20v-2a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5v2" />
//       <path d="M16 5l2 2 4-4" />
//     </svg>
//   ),
//   Leave: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <rect x="3" y="4" width="18" height="18" rx="2" />
//       <line x1="16" y1="2" x2="16" y2="6" />
//       <line x1="8" y1="2" x2="8" y2="6" />
//       <line x1="3" y1="10" x2="21" y2="10" />
//       <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2" />
//     </svg>
//   ),
//   Medical: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
//     </svg>
//   ),
//   Tools: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//     </svg>
//   ),
// };

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
// function ServiceCard({ label, IconComponent, onClick, accentIndex = 0, delay = 0 }) {
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
//         <IconComponent />
//       </div>
//       {/* Label */}
//       <span
//         style={{
//           fontSize: 12,
//           fontWeight: 600,
//           color: "#374151",
//           letterSpacing: "0.01em",
//           textAlign: "center",
//           lineHeight: 1.3,
//           fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//         }}
//       >
//         {label}
//       </span>
//     </div>
//   );
// }

// // ─── Main Approvals Component ─────────────────────────────────────────────────────
// export default function Approvals() {
//   const navigate = useNavigate();
  
//   const categories = [
//     { id: "EMOBCI0002", label: "Attendance", path: "/Attendance", Icon: Icons.Attendance, accent: 0 },
//     { id: "EMOBCI0003", label: "Leave", path: "/Leave", Icon: Icons.Leave, accent: 1 },
//     { id: "EMOBCI0007", label: "Medical", path: "/Medical", Icon: Icons.Medical, accent: 2 },
//     { id: "EMOBCI0009", label: "Outstanding Tools", path: "/tools", Icon: Icons.Tools, accent: 3 },
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
//           Personal
//         </Typography>
//       </div>

//       {/* Cards Grid */}
//       <Grid container spacing={1.5}>
//         {categories.map((category, index) => (
//           <Grid item xs={4} key={category.id} sx={{ display: "flex" }}>
//             <ServiceCard
//               label={category.label}
//               IconComponent={category.Icon}
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