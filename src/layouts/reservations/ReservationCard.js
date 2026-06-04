// --------------------------------with manager portal


// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardActionArea,
//   useTheme,
//   useMediaQuery
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   HomeWorkOutlined,
//   HandymanOutlined,
//   PersonOutline
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import SupervisorAccountOutlined from "@mui/icons-material/SupervisorAccountOutlined";


// const Approvals = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const categories = [
//     {
//       id: "Bungalow",
//       name: "Bungalow",
//       fullName: "Book your stay",
//       icon: <HomeWorkOutlined fontSize="large" />,
//       path: "/reservations",
//       color: theme.palette.primary.main
//     },
//     {
//       id: "Maintainers",
//       name: "Maintainers",
//       fullName: "maintenance requests",
//       icon: <HandymanOutlined fontSize="large" />,
//       path: "/MaintenancePage",
//       color: theme.palette.secondary.main
//     },
//     {
//       id: "Manager",
//       name: "Manager",
//       fullName: "Manager Page",
//       icon: <SupervisorAccountOutlined fontSize="large" />,
//       path: "/ManagerPage",
//       color: theme.palette.warning.main
//     },
//     {
//       id: "Caretaker",
//       name: "Caretaker",
//       fullName: "View bungalow status",
//       icon: <PersonOutline fontSize="large" />,
//       path: "/caretaker-view",
//       color: theme.palette.success.main
//     },
//   ];

//   const cardVariants = {
//     hover: {
//       y: -5,
//       boxShadow: theme.shadows[6],
//       transition: { duration: 0.2 }
//     },
//     tap: {
//       scale: 0.98
//     }
//   };

//   return (
//     <Box sx={{
//       width: "100%",
//       maxWidth: "800px",
//       margin: "0 auto",
//       padding: isMobile ? 1 : 3,
//       background: theme.palette.background.default
//     }}>
//       <Typography
//         variant="h4"
//         sx={{
//           mb: 4,
//           fontWeight: 600,
//           textAlign: "center",
//           color: theme.palette.text.primary,
//           fontSize: isMobile ? "1.8rem" : "2.2rem"
//         }}
//       >
//         NEHB Portal
//       </Typography>
//       <Typography
//         variant="subtitle1"
//         sx={{
//           mb: 4,
//           textAlign: "center",
//           color: theme.palette.text.secondary
//         }}
//       >
//         Select an option below to get started
//       </Typography>

//       <Grid container spacing={isMobile ? 1 : 3} justifyContent="center">
//         {categories.map((category) => (
//           <Grid item xs={6} sm={4} key={category.id}>
//             <motion.div
//               whileHover="hover"
//               whileTap="tap"
//               variants={cardVariants}
//             >
//               <Card
//                 sx={{
//                   borderRadius: 2,
//                   background: `linear-gradient(135deg, ${category.color}20, ${theme.palette.background.paper})`,
//                   border: `1px solid ${theme.palette.divider}`,
//                   transition: "all 0.3s ease",
//                   '&:hover': {
//                     borderColor: category.color
//                   }
//                 }}
//               >
//                 <CardActionArea
//                   onClick={() => navigate(category.path)}
//                   sx={{ p: 3, height: "100%" }}
//                 >
//                   <Box sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     textAlign: "center",
//                     gap: 2
//                   }}>
//                     <Box sx={{
//                       width: 60,
//                       height: 60,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backgroundColor: `${category.color}20`,
//                       color: category.color
//                     }}>
//                       {React.cloneElement(category.icon, { fontSize: "large" })}
//                     </Box>
//                     <Typography
//                       variant="h6"
//                       component="div"
//                       sx={{
//                         fontWeight: 600,
//                         color: theme.palette.text.primary
//                       }}
//                     >
//                       {category.name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         fontSize: "0.8rem"
//                       }}
//                     >
//                       {category.fullName}
//                     </Typography>
//                   </Box>
//                 </CardActionArea>
//               </Card>
//             </motion.div>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Approvals;





//--------------------------------Update V2---------------------------------


// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   HomeWorkOutlined,
//   HandymanOutlined,
//   PersonOutline,
//   SupervisorAccountOutlined
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
//   const theme = useTheme();
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
//         height: 140,
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
//               textTransform: "capitalize",
//             }}
//           >
//             {fullName}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Main NEHB Portal Component ─────────────────────────────────────────────────────
// export default function NEHBPortal() {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const categories = [
//     {
//       id: "Bungalow",
//       name: "Bungalow",
//       fullName: "Book your stay",
//       icon: <HomeWorkOutlined />,
//       path: "/reservations",
//       accent: 0
//     },
//     {
//       id: "Maintainers",
//       name: "Maintainers",
//       fullName: "maintenance requests",
//       icon: <HandymanOutlined />,
//       path: "/MaintenancePage",
//       accent: 1
//     },
//     {
//       id: "Manager",
//       name: "Manager",
//       fullName: "Manager Page",
//       icon: <SupervisorAccountOutlined />,
//       path: "/ManagerPage",
//       accent: 2
//     },
//     {
//       id: "Caretaker",
//       name: "Caretaker",
//       fullName: "View bungalow status",
//       icon: <PersonOutline />,
//       path: "/caretaker-view",
//       accent: 3
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "800px",
//         margin: "0 auto",
//         padding: isMobile ? 2 : 3, 
//         fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//       }}
//     >
//       {/* Header with subtle accent line */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 12,
//           marginBottom: 16,
//         }}
//       >
//         <div
//           style={{
//             width: 4,
//             height: 28,
//             background: "#2528e7",
//             borderRadius: 4,
//           }}
//         />
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 600,
//             color: "#1e293b",
//             fontSize: isMobile ? "1.8rem" : "2.2rem",
//             letterSpacing: "-0.02em",
//           }}
//         >
//           NEHB Portal
//         </Typography>
//         <div
//           style={{
//             width: 4,
//             height: 28,
//             background: "#2528e7",
//             borderRadius: 4,
//           }}
//         />
//       </div>

//       {/* Subtitle */}
//       <Typography
//         variant="subtitle1"
//         sx={{
//           mb: 4,
//           textAlign: "center",
//           color: "#6B7280",
//           fontSize: isMobile ? "0.9rem" : "1rem",
//           fontWeight: 400,
//         }}
//       >
//         Select an option below to get started
//       </Typography>

//       {/* Cards Grid */}
//       <Grid container spacing={isMobile ? 1.5 : 2}>
//         {categories.map((category, index) => (
//           <Grid item xs={6} sm={4} key={category.id} sx={{ display: "flex" }}>
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






import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  HomeWorkOutlined,
  HandymanOutlined,
  PersonOutline
} from "@mui/icons-material";
import { motion } from "framer-motion";
import api from "../../service/CommonService";

const TARGET_COMPONENT_ID = "EMOBCI0010";

const Approvals = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [accessLevel, setAccessLevel] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .GetAccessHeadComponent()
      .then((res) => {
        const list = res.data?.ResultSet ?? [];

        const row = list.find((x) => x?.ComponentId === TARGET_COMPONENT_ID);

        const level = row?.AccessLevel != null ? String(row.AccessLevel) : "";

        setAccessLevel(level);
      })
      .catch((err) => {
        console.error("Access level fetch failed", err);
        setAccessLevel("");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!accessLevel) {
      navigate("/reservations", { replace: true });
      return;
    }

    if (accessLevel === "2") {
      navigate("/caretaker-view", { replace: true });
      return;
    }
  }, [accessLevel, loading, navigate]);

  const categories = [
    {
      id: "Bungalow",
      name: "Bungalow",
      fullName: "Book your stay",
      icon: <HomeWorkOutlined />,
      path: "/reservations",
      color: theme.palette.primary.main
    },
    {
      id: "Maintainers",
      name: "Maintainers",
      fullName: "Maintenance requests",
      icon: <HandymanOutlined />,
      path: "/MaintenancePage",
      color: theme.palette.secondary.main
    },
    {
      id: "Caretaker",
      name: "Caretaker",
      fullName: "View bungalow status",
      icon: <PersonOutline />,
      path: "/caretaker-view",
      color: theme.palette.success.main
    }
  ];

  const getFilteredCategories = () => {
    switch (accessLevel) {
      case "1":
        return categories.filter(
          (c) => c.id === "Bungalow" || c.id === "Maintainers"
        );
      case "2":
        return categories.filter((c) => c.id === "Caretaker");
      case "3":
        return categories;
      default:
        return categories.filter((c) => c.id === "Bungalow");
    }
  };

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: theme.shadows[6],
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!accessLevel) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: isMobile ? 1 : 3,
        background: theme.palette.background.default
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: "center",
          color: theme.palette.text.primary,
          fontSize: isMobile ? "1.8rem" : "2.2rem"
        }}
      >
        NEHB Portal
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mb: 4,
          textAlign: "center",
          color: theme.palette.text.secondary
        }}
      >
        Select an option below to get started
      </Typography>

      <Grid container spacing={isMobile ? 1 : 3} justifyContent="center">
        {getFilteredCategories().map((category) => (
          <Grid item xs={6} sm={4} key={category.id}>
            <motion.div whileHover="hover" whileTap="tap" variants={cardVariants}>
              <Card
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${category.color}20, ${theme.palette.background.paper})`,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  "&:hover": { borderColor: category.color }
                }}
              >
                <CardActionArea
                  onClick={() => navigate(category.path)}
                  sx={{ p: 3, height: "100%" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: `${category.color}20`,
                        color: category.color
                      }}
                    >
                      {React.cloneElement(category.icon, { fontSize: "large" })}
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {category.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.8rem"
                      }}
                    >
                      {category.fullName}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Approvals;
