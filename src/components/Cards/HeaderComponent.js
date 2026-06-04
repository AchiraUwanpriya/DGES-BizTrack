import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Grow, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
 
export default function HeaderComponent() {
  const [ads, setAds] = useState([]);
  const [currentAd, setCurrentAd] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const { loading, headComponent } = useSelector(
    (state) => state.headComponent
  );
  let navigate = useNavigate();

  const isComponentIdAvailable = (componentId) => {
    return headComponent.some((item) => item.ComponentId === componentId);
  };

  // useEffect(() => {
  //   const fetchAds = async () => {
  //     try {
  //       const response = await axios.get(`${axios.defaults.baseURL}/Notification/GetNews`);
  //       const fetchedAds = response.data.ResultSet.map((ad) => ad.Message);
  //       setAds(fetchedAds);
  //     } catch (error) {
  //       console.error("Error fetching ads:", error);
  //     }
  //   };

  //   fetchAds();
  // }, []);

  
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          `${axios.defaults.baseURL}Notification/DGESGetNews`
        );

        const validAds = response.data.ResultSet.map((ad) => ad.Message).filter(
          (message) => message && message.trim() !== ""
        );

        setAds(validAds); 
      } catch (error) { 
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentAd((prev) => (prev + 1) % ads.length);
        setFadeIn(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [ads]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflow: "auto",
        }}
      >
        {/* <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ marginLeft: 6 }}
        >
          Service
        </Typography> */}
        <div style={{ height: "5px" }}></div>
        <Box
          sx={{
            width: "100%",
            background: "linear-gradient(90deg, #F0F8FF 0%, #E6E6FA 100%)",
            padding: "12px",
            textAlign: "center",
            
            borderRadius: 2,
            marginBottom: 2,
            minHeight: "50px",
            display: ads.length > 0 ? "block" : "none",
            border: "1px solid #dcdcf5",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          {ads.length > 0 && (
            <Fade in={fadeIn} timeout={500}>
              <Typography
                variant="body1"
                sx={{
                  color: "#4b3d8f",
                  fontSize: 14,
                  fontWeight: 600,

                }}
              >
                {ads[currentAd]}
              </Typography>
            </Fade>
          )}
        </Box>

        <Grid container rowSpacing={0.1}>
          {isComponentIdAvailable("EMOBCI0002") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0002")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0002")
                ? { timeout: 1600 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/personal");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/user.png")}
                        alt="Personal"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" , marginTop: "8px"}}
                      >
                        Personal
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0011") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0011")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0011")
                ? { timeout: 2800 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/Telephone");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/telephonedirectory.png")}
                        alt="Telephone"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" , marginTop: "8px"}}
                      >
                        Telephone
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {/* {isComponentIdAvailable("EMOBCI0006") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0006")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0006")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 100,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/budgetshop");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/store.png")}
                        alt="Sahanasala"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%", marginTop: "8px" }}
                      >
                        Sahanasala
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}
          {isComponentIdAvailable("EMOBCE0002") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0002")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0002")
                ? { timeout: 1900 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/approvals");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/approval.png")}
                        alt="Approvals"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%", marginTop: "8px" }}
                      >
                        Approvals
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}

          {isComponentIdAvailable("EMOBCI0013") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0013")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0013")
                ? { timeout: 1900 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/inquery.png")}
                        alt="Approvals"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%", marginTop: "8px" }}
                      >
                        Attendance Inquery
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0013") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0013")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0013")
                ? { timeout: 1900 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/VehicalTracking");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/car-tracker.png")}
                        alt="Approvals"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%", marginTop: "8px" }}
                      >
                        Tracker
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {/* {isComponentIdAvailable("EMOBCE0001") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0001")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0001")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/Jobs");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/briefcase.png")}
                        alt="Job Allocation"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        align="center"
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Job Allocation
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}
          {/* {isComponentIdAvailable("EMOBCI0010") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0010")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0010")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/reservation");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/reservation.png")}
                        alt="NEHB Reservation"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        NEHB Reservation
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}
          
          {/* {isComponentIdAvailable("EMOBCI0011") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0011")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0011")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 120,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/nwhb-reservation");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/booking.png")}
                        alt="NWHB Reservation"
                        style={{ opacity: "80%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        gutterBottom
                        align="center"
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        NWHB Reservation
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}


          {/* {isComponentIdAvailable("EMOBCI0012") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0012")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0012")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/rfid-attendence");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/user-check.png")}
                        alt="Remote Attendance"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Remote Attendance
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}
          {isComponentIdAvailable("EMOBCE0003") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0003")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0003")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card
                  sx={{
                    padding: 2,
                    boxShadow: 0,
                    borderRadius: 2,
                    height: 110,
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/file-attachments");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 90,
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/gallery.png")}
                        alt="Gallery"
                        style={{ opacity: "70%", maxHeight: 70, maxWidth: 70 }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" , marginTop: "8px" }}
                      >
                        Gallery
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}


          
          {/* {isComponentIdAvailable("EMOBCE0001") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0001")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0001")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/MaintenancePage"); 
                    }}
                  >
                    <div
                      style={{
                        height: 90,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/maintenance.png")}
                        alt="Maintain"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Maintain
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )} */}
        </Grid>
      </Box>
    </>
  );
}











//______________________________________________________________________2026-03-13_____________________________________________________________

// import React, { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import Typography from "@mui/material/Typography";
// import { Box, CardActionArea, Grid, Grow, Fade } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
 
// // Modified version with reduced spacing
// export default function HeaderComponent() {
//   const [ads, setAds] = useState([]);
//   const [currentAd, setCurrentAd] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);
//   const { loading, headComponent } = useSelector(
//     (state) => state.headComponent
//   );
//   let navigate = useNavigate();

//   const isComponentIdAvailable = (componentId) => {
//     return headComponent.some((item) => item.ComponentId === componentId);
//   };

//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const response = await axios.get(
//           `${axios.defaults.baseURL}Notification/GetNews`
//         );

//         // Check the null messages
//         const validAds = response.data.ResultSet.map((ad) => ad.Message).filter(
//           (message) => message && message.trim() !== ""
//         );

//         setAds(validAds); // Update ads with valid messages only
//       } catch (error) {
//         console.error("Error fetching ads:", error);
//       }
//     };

//     fetchAds();
//   }, []);

//   useEffect(() => {
//     if (ads.length === 0) return;

//     const interval = setInterval(() => {
//       setFadeIn(false);
//       setTimeout(() => {
//         setCurrentAd((prev) => (prev + 1) % ads.length);
//         setFadeIn(true);
//       }, 500);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [ads]);

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           width: "100%",
//           overflow: "auto",
//         }}
//       >
//         <div style={{ height: "5px" }}></div>
        
//         {/* Ad Banner with reduced padding and margin */}
//         <Box
//           sx={{
//             width: "100%",
//             background: "linear-gradient(90deg, #F0F8FF 0%, #E6E6FA 100%)",
//             padding: "6px 12px",  
//             textAlign: "center",
//             borderRadius: 2,
//             marginBottom: 1, 
//             minHeight: "40px",  
//             display: ads.length > 0 ? "block" : "none",
//             border: "1px solid #dcdcf5",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//           }}
//         >
//           {ads.length > 0 && (
//             <Fade in={fadeIn} timeout={500}>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: "#4b3d8f", 
//                   fontSize: 14,
//                   fontWeight: 600,
//                   lineHeight: 1.3, // Tighter line height
//                 }}
//               >
//                 {ads[currentAd]}
//               </Typography>
//             </Fade>
//           )}
//         </Box>

        
//         <Grid container spacing={0.5}>  
//           {isComponentIdAvailable("EMOBCI0002") && (
//             <Grow
//               in={true}
//               style={{ transformOrigin: "0 0 0" }}
//               timeout={1600}
//             >
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   p: 0.5, // Reduced padding from 1 to 0.5
//                 }}
//               >
//                 <Card
//                   sx={{
//                     p: 1.5, // Reduced padding from 2 to 1.5
//                     boxShadow: 0,
//                     borderRadius: 2,
//                     height: 100, // Reduced height from 120 to 100
//                   }}
//                 >
//                   <CardActionArea
//                     onClick={() => {
//                       navigate("/personal");
//                     }}
//                     sx={{ height: '100%' }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flexDirection: "column",
//                         height: '100%',
//                       }}
//                     >
//                       <img
//                         className="d-block w-50"
//                         src={require("../../assets/icons/user.png")}
//                         alt="Personal"
//                         style={{ 
//                           opacity: "70%", 
//                           maxHeight: 45, // Reduced from 70
//                           maxWidth: 45, // Reduced from 70
//                           marginBottom: 2 // Added small margin between icon and text
//                         }}
//                       />
//                       <Typography
//                         fontSize={12} // Reduced from 14
//                         fontWeight={600}
//                         component="div"
//                         sx={{ opacity: "40%", lineHeight: 1.2 }}
//                       >
//                         Personal
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}

//           {/* Telephone Icon */}
//           {isComponentIdAvailable("EMOBCI0011") && (
//             <Grow
//               in={true}
//               style={{ transformOrigin: "0 0 0" }}
//               timeout={2800}
//             >
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   p: 0.5,
//                 }}
//               >
//                 <Card
//                   sx={{
//                     p: 1.5,
//                     boxShadow: 0,
//                     borderRadius: 2,
//                     height: 100,
//                   }}
//                 >
//                   <CardActionArea
//                     onClick={() => {
//                       navigate("/Telephone");
//                     }}
//                     sx={{ height: '100%' }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flexDirection: "column",
//                         height: '100%',
//                       }}
//                     >
//                       <img
//                         className="d-block w-50"
//                         src={require("../../assets/icons/telephonedirectory.png")}
//                         alt="Telephone"
//                         style={{ 
//                           opacity: "70%", 
//                           maxHeight: 45,
//                           maxWidth: 45,
//                           marginBottom: 2
//                         }}
//                       />
//                       <Typography
//                         fontSize={12}
//                         fontWeight={600}
//                         component="div"
//                         sx={{ opacity: "40%", lineHeight: 1.2 }}
//                       >
//                         Telephone
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}
 
//           {/* For brevity, I'm showing the pattern. Apply to all remaining icons */}
          
//           {/* Sahanasala Icon */}
//           {isComponentIdAvailable("EMOBCI0006") && (
//             <Grow in={true} timeout={2500}>
//               <Grid item xs={4} sx={{ p: 0.5 }}>
//                 <Card sx={{ p: 1.5, boxShadow: 0, borderRadius: 2, height: 100 }}>
//                   <CardActionArea onClick={() => navigate("/budgetshop")} sx={{ height: '100%' }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: '100%' }}>
//                       <img
//                         src={require("../../assets/icons/store.png")}
//                         alt="Sahanasala"
//                         style={{ opacity: "70%", maxHeight: 45, maxWidth: 45, marginBottom: 2 }}
//                       />
//                       <Typography fontSize={12} fontWeight={600} sx={{ opacity: "40%", lineHeight: 1.2 }}>
//                         Sahanasala
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}

//           {/* Approvals Icon */}
//           {isComponentIdAvailable("EMOBCE0002") && (
//             <Grow in={true} timeout={1900}>
//               <Grid item xs={4} sx={{ p: 0.5 }}>
//                 <Card sx={{ p: 1.5, boxShadow: 0, borderRadius: 2, height: 100 }}>
//                   <CardActionArea onClick={() => navigate("/approvals")} sx={{ height: '100%' }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: '100%' }}>
//                       <img
//                         src={require("../../assets/icons/approval.png")}
//                         alt="Approvals"
//                         style={{ opacity: "70%", maxHeight: 45, maxWidth: 45, marginBottom: 2 }}
//                       />
//                       <Typography fontSize={12} fontWeight={600} sx={{ opacity: "40%", lineHeight: 1.2 }}>
//                         Approvals
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}

//           {/* Job Allocation Icon */}
//           {isComponentIdAvailable("EMOBCE0001") && (
//             <Grow in={true} timeout={2500}>
//               <Grid item xs={4} sx={{ p: 0.5 }}>
//                 <Card sx={{ p: 1.5, boxShadow: 0, borderRadius: 2, height: 100 }}>
//                   <CardActionArea onClick={() => navigate("/Jobs")} sx={{ height: '100%' }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: '100%' }}>
//                       <img
//                         src={require("../../assets/icons/briefcase.png")}
//                         alt="Job Allocation"
//                         style={{ opacity: "70%", maxHeight: 45, maxWidth: 45, marginBottom: 2 }}
//                       />
//                       <Typography align="center" fontSize={12} fontWeight={600} sx={{ opacity: "40%", lineHeight: 1.2 }}>
//                         Job Allocation
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}

//           {/* NEHB Reservation Icon */}
//           {isComponentIdAvailable("EMOBCI0010") && (
//             <Grow in={true} timeout={2500}>
//               <Grid item xs={4} sx={{ p: 0.5 }}>
//                 <Card sx={{ p: 1.5, boxShadow: 0, borderRadius: 2, height: 100 }}>
//                   <CardActionArea onClick={() => navigate("/reservation")} sx={{ height: '100%' }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: '100%' }}>
//                       <img
//                         src={require("../../assets/icons/reservation.png")}
//                         alt="NEHB Reservation"
//                         style={{ opacity: "70%", maxHeight: 45, maxWidth: 45, marginBottom: 2 }}
//                       />
//                       <Typography align="center" fontSize={12} fontWeight={600} sx={{ opacity: "40%", lineHeight: 1.2 }}>
//                         NEHB Reservation
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}

//           {/* Remote Attendance Icon */}
//           {isComponentIdAvailable("EMOBCI0012") && (
//             <Grow in={true} timeout={2500}>
//               <Grid item xs={4} sx={{ p: 0.5 }}>
//                 <Card sx={{ p: 1.5, boxShadow: 0, borderRadius: 2, height: 100 }}>
//                   <CardActionArea onClick={() => navigate("/rfid-attendence")} sx={{ height: '100%' }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: '100%' }}>
//                       <img
//                         src={require("../../assets/icons/user-check.png")}
//                         alt="Remote Attendance"
//                         style={{ opacity: "70%", maxHeight: 45, maxWidth: 45, marginBottom: 2 }}
//                       />
//                       <Typography align="center" fontSize={12} fontWeight={600} sx={{ opacity: "40%", lineHeight: 1.2 }}>
//                         Remote Attendance
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}

//           {/* Gallery Icon */}
//           {isComponentIdAvailable("EMOBCE0003") && (
//             <Grow in={true} timeout={2500}>
//               <Grid item xs={4} sx={{ p: 0.5 }}>
//                 <Card sx={{ p: 1.5, boxShadow: 0, borderRadius: 2, height: 100 }}>
//                   <CardActionArea onClick={() => navigate("/file-attachments")} sx={{ height: '100%' }}>
//                     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: '100%' }}>
//                       <img
//                         src={require("../../assets/icons/gallery.png")}
//                         alt="Gallery"
//                         style={{ opacity: "70%", maxHeight: 45, maxWidth: 45, marginBottom: 2 }}
//                       />
//                       <Typography align="center" fontSize={12} fontWeight={600} sx={{ opacity: "40%", lineHeight: 1.2 }}>
//                         Gallery
//                       </Typography>
//                     </Box>
//                   </CardActionArea>
//                 </Card>
//               </Grid>
//             </Grow>
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// }







//-----------------------------------------------------------------V2---------------------------------------------
// import React, { useState, useEffect } from "react";
// import { Box, Grid, Fade, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// // ─── Inline SVG Icons ────────────────────────────────────────────────────────
// const Icons = {
//   Personal: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <circle cx="12" cy="8" r="4" />
//       <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
//     </svg>
//   ),
//   Telephone: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
//     </svg>
//   ),
//   Store: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <path d="M3 9l1-5h16l1 5" />
//       <path d="M3 9a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2" />
//       <path d="M5 20V11m14 9V11" />
//       <rect x="9" y="14" width="6" height="6" rx="1" />
//     </svg>
//   ),
//   Approvals: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <path d="M9 11l3 3L22 4" />
//       <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
//     </svg>
//   ),
//   Briefcase: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <rect x="2" y="7" width="20" height="14" rx="2" />
//       <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
//       <line x1="12" y1="12" x2="12" y2="12" strokeWidth="2" />
//       <path d="M2 13h20" />
//     </svg>
//   ),
//   Reservation: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <rect x="3" y="4" width="18" height="18" rx="2" />
//       <line x1="16" y1="2" x2="16" y2="6" />
//       <line x1="8" y1="2" x2="8" y2="6" />
//       <line x1="3" y1="10" x2="21" y2="10" />
//       <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth="2" />
//     </svg>
//   ),
//   Attendance: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <polyline points="16 11 18 13 22 9" />
//     </svg>
//   ),
//   Gallery: () => (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" width={32} height={32}>
//       <rect x="3" y="3" width="18" height="18" rx="2" />
//       <circle cx="8.5" cy="8.5" r="1.5" />
//       <polyline points="21 15 16 10 5 21" />
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
// // ─── News Ticker ──────────────────────────────────────────────────────────────
// function NewsTicker({ ads }) {
//   const [currentAd, setCurrentAd] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);
//   useEffect(() => {
//     if (ads.length === 0) return;
//     const interval = setInterval(() => {
//       setFadeIn(false);
//       setTimeout(() => {
//         setCurrentAd((prev) => (prev + 1) % ads.length);
//         setFadeIn(true);
//       }, 400);
//     }, 4500);
//     return () => clearInterval(interval);
//   }, [ads]);
//   if (ads.length === 0) return null;
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 10,
//         background: "linear-gradient(135deg, #ffef5f8c 20%, #ffef5f8c 20%)",
//         border: "1px solid #c0c7df",
//         borderRadius: 12,
//         padding: "10px 16px",
//         marginBottom: 20,
//       }}
//     >
//       {/* Live dot */}
//       <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
//         <div
//           style={{
//             width: 8,
//             height: 8,
//             borderRadius: "50%",
//             background: "#6366F1",
//             animation: "pulse 2s infinite",
//           }}
//         />
//         <span
//           style={{
//             fontSize: 10,
//             fontWeight: 700,
//             color: "#6366F1",
//             letterSpacing: "0.08em",
//             textTransform: "uppercase",
//             fontFamily: "'DM Sans', sans-serif",
//           }}
//         >
//           News
//         </span>
//       </div>
//       <div style={{ width: 1, height: 16, background: "#C7D2FE" }} />
//       <Fade in={fadeIn} timeout={400}>
//         <span
//           style={{
//             fontSize: 13,
//             fontWeight: 500,
//             color: "#4338CA",
//             fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//             flex: 1,
//           }}
//         >
//           {ads[currentAd]}
//         </span>
//       </Fade>
//       {/* Dots indicator */}
//       <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
//         {ads.map((_, i) => (
//           <div
//             key={i}
//             style={{
//               width: i === currentAd ? 16 : 6,
//               height: 6,
//               borderRadius: 3,
//               background: i === currentAd ? "#6366F1" : "#C7D2FE",
//               transition: "all 0.3s ease",
//             }}
//           />
//         ))}
//       </div>
//       <style>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(1.3); }
//         }
//       `}</style>
//     </div>
//   );
// }
// // ─── Main HeaderComponent ─────────────────────────────────────────────────────
// export default function HeaderComponent() {
//   const [ads, setAds] = useState([]);
//   const { headComponent } = useSelector((state) => state.headComponent);
//   const navigate = useNavigate();
//   const isComponentIdAvailable = (componentId) =>
//     headComponent.some((item) => item.ComponentId === componentId);
//   useEffect(() => {
//     const fetchAds = async () => {
//       try {
//         const response = await axios.get(`${axios.defaults.baseURL}Notification/GetNews`);
//         const validAds = response.data.ResultSet.map((ad) => ad.Message).filter(
//           (message) => message && message.trim() !== ""
//         );
//         setAds(validAds);
//       } catch (error) {
//         console.error("Error fetching ads:", error);
//       }
//     };
//     fetchAds();
//   }, []);
//   // Menu items config
//   const menuItems = [
//     { id: "EMOBCI0002", label: "Personal",         Icon: Icons.Personal,    path: "/personal",        accent: 0 },
//     { id: "EMOBCI0011", label: "Telephone",        Icon: Icons.Telephone,   path: "/Telephone",       accent: 1 },
//     { id: "EMOBCI0006", label: "Sahanasala",       Icon: Icons.Store,       path: "/budgetshop",      accent: 2 },
//     { id: "EMOBCE0002", label: "Approvals",        Icon: Icons.Approvals,   path: "/approvals",       accent: 3 },
//     { id: "EMOBCE0001", label: "Job Allocation",   Icon: Icons.Briefcase,   path: "/Jobs",            accent: 4 },
//     { id: "EMOBCI0010", label: "NEHB Reservation", Icon: Icons.Reservation, path: "/reservation",     accent: 5 },
//     { id: "EMOBCI0012", label: "Remote Attendance",Icon: Icons.Attendance,  path: "/rfid-attendence", accent: 6 },
//     { id: "EMOBCE0003", label: "Gallery",          Icon: Icons.Gallery,     path: "/file-attachments",accent: 7 },
//   ];
//   const visibleItems = menuItems.filter((item) => isComponentIdAvailable(item.id));
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
//         pb: 2,
//       }}
//     >
//       {/* Section label */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           marginBottom: 5,
//           paddingTop: 4,
//         }}
//       >
         
//       </div>
//       {/* News Ticker */}
//       <NewsTicker ads={ads} />
//       {/* Cards Grid */}
//       <Grid container spacing={1.5}>
//         {visibleItems.map((item, index) => (
//           <Grid item xs={4} key={item.id} sx={{ display: "flex" }}>
//             <ServiceCard
//               label={item.label}
//               IconComponent={item.Icon}
//               onClick={() => navigate(item.path)}
//               accentIndex={item.accent}
//               delay={index * 80}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

