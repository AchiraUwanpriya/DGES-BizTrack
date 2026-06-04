// // import { useState, useContext, useEffect } from "react";
// // import { Box, Card, Container, Typography } from "@mui/material";
// // import TextField from "@mui/material/TextField";
// // import { useSelector } from "react-redux";
// // import imge from "../../../assets/images/NewBGImage.jpg";
// // import Textlogo from "../../../assets/images/Textlogo.png";
// // import LoadingButton from "@mui/lab/LoadingButton";
// // import LoginIcon from "@mui/icons-material/Login";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { useAuth } from "../../../context/AuthContext";

// // const SignIn = () => {
// //   const [serviceNo, setserviceNo] = useState("");
// //   const [password, setpassword] = useState("");
// //   const { loading } = useSelector((state) => state.auth);
// //   const { handleLogin } = useAuth();

// //   useEffect(() => {
// //     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
// //     metaThemeColor.setAttribute("content", "#004AAD");
// //   }, []);

// //   const validate = () => {
// //     let isValid = true;
// //     if (serviceNo.trim() === "" || password.trim() === "") {
// //       isValid = false;
// //       toast.error("Please Enter Valid UserID & Password.");
// //     }
// //     return isValid;
// //   };

// //   const handleButtonClick = (e) => {
// //     if (validate() && !loading) {
// //       handleLogin(serviceNo, password);
// //     }
// //   };

// //   const onServiceNoChanged = (e) => {
// //     setserviceNo(e.target.value);
// //   };

// //   const onPasswordChanged = (e) => {
// //     setpassword(e.target.value);
// //   };

// //   return (
// //     <Container
// //       sx={{
// //         display: "flex",
// //         flexDirection: "column",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         minHeight: "100vh",
// //         //height: 800,
// //         backgroundColor: "#F8F9FA",
// //         backgroundImage: `url(${imge})`,
// //         backgroundSize: "cover",
// //         backgroundRepeat: "no-repeat",
// //         backgroundPosition: "center",
// //       }}
// //     >
// //       <Box
// //         component="img"
// //         sx={{
// //           height: "20%",
// //           width: "50%",
// //           maxHeight: { xs: 233, md: 167 },
// //           maxWidth: { xs: 350, md: 250 },
// //         }}
// //         src={Textlogo}
// //       />
// //       <Typography
// //         variant="h5"
// //         fontWeight={300}
// //         sx={{ my: 2, color: "#fff", marginBottom: "30%" }}
// //       >
// //         Cooperate Mobile App
// //       </Typography>

// //       <Card sx={{ borderRadius: 5, boxShadow: 8 }}>
// //         <Box p={3} textAlign="center">
// //           <Typography variant="h4" fontWeight={600} sx={{ my: 2 }}>
// //             Sign in
// //           </Typography>
// //         </Box>
// //         <Box px={2} pb={3} textAlign="center">
// //           <Typography
// //             variant="h6"
// //             color="#646464"
// //             fontWeight={500}
// //             sx={{ mb: 3 }}
// //           >
// //             Enter your registered User Id & Password
// //           </Typography>
// //           <Box>
// //             <Box mb={1}>
// //               <TextField
// //                 id="outlined-basic"
// //                 label="User ID"
// //                 variant="outlined"
// //                 InputProps={{ sx: { borderRadius: 3 } }}
// //                 sx={{
// //                   input: { textAlign: "center", fontSize: 20 },
// //                   label: {
// //                     right: "1.75rem",
// //                     transformOrigin: "center",
// //                     fontSize: "1rem",
// //                   },
// //                   legend: { textAlign: "center", fontSize: "0.7rem" },
// //                 }}
// //                 fullWidth
// //                 type="text"
// //                 onChange={onServiceNoChanged}
// //               />
// //             </Box>
// //             <Box mb={1}>
// //               <TextField
// //                 id="outlined-basic"
// //                 label="Password"
// //                 variant="outlined"
// //                 InputProps={{ sx: { borderRadius: 3 } }}
// //                 sx={{
// //                   input: { textAlign: "center", fontSize: 20 },
// //                   label: {
// //                     right: "1.75rem",
// //                     transformOrigin: "center",
// //                     fontSize: "1rem",
// //                   },
// //                   legend: { textAlign: "center", fontSize: "0.7rem" },
// //                 }}
// //                 fullWidth
// //                 type="password"
// //                 onChange={onPasswordChanged}
// //               />
// //             </Box>
// //             <Box mt={4} mb={1}>
// //               {/* <Button color="info" fullWidth>
// //                 Sign In
// //               </Button> */}
// //               <LoadingButton
// //                 onClick={handleButtonClick}
// //                 endIcon={<LoginIcon />}
// //                 loading={loading}
// //                 loadingPosition="center"
// //                 variant="contained"
// //                 sx={{
// //                   width: "90%",
// //                   maxWidth: { xs: 350, md: 250 },
// //                   backgroundColor: "#0049AF",
// //                   textTransform: "capitalize",
// //                   borderRadius: 3,
// //                 }}
// //               >
// //                 <span style={{ color: "#fff", fontSize: 18, fontWeight: 400 }}>
// //                   Sign In
// //                 </span>
// //               </LoadingButton>
// //             </Box>
// //           </Box>
// //         </Box>
// //       </Card>
// //       <Box
// //         sx={{
// //           display: "flex",
// //           flexDirection: "column",
// //           justifyContent: "flex-end",
// //           alignItems: "center",

// //           marginTop: 10,
// //         }}
// //       >
// //         <Typography
// //           variant="h8"
// //           color="#646464"
// //           fontWeight={500}
// //           textAlign={"center"}
// //           paddingLeft={3}
// //           paddingRight={3}
// //         >
// //           Copyrights © Colombo Dockyard PLC.
// //         </Typography>
// //         <Typography variant="h7" color="#646464" fontWeight={500}>
// //           All Rights Reserved.
// //         </Typography>
// //         <Typography fontSize={8} color="#646464" fontWeight={500}>
// //           Powered By Dockyard Total Solution (Pvt) Ltd.
// //         </Typography>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default SignIn;



// import { useState, useContext, useEffect } from "react";
// import { Box, Card, Container, Typography } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { useSelector } from "react-redux";
// import imge from "../../../assets/images/NewBGImage.jpg";
// import Textlogo from "../../../assets/images/Textlogo.png";
// import LoadingButton from "@mui/lab/LoadingButton";
// import LoginIcon from "@mui/icons-material/Login";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../../../context/AuthContext";

// const SignIn = () => {
//   const [serviceNo, setserviceNo] = useState("");
//   const [password, setpassword] = useState("");
//   const { loading } = useSelector((state) => state.auth);
//   const { handleLogin } = useAuth();

//   useEffect(() => {
//     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//     metaThemeColor.setAttribute("content", "#004AAD");
//   }, []);

//   const getDeviceInfo = () => {
//     const userAgent = navigator.userAgent;
//     let device = "Unknown Device";
    
//     // Detect device type
//     if (/Android/i.test(userAgent)) {
//       device = "Android Mobile";
//     } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
//       device = "iOS Device";
//     } else if (/Windows/i.test(userAgent)) {
//       device = "Windows PC";
//     } else if (/Mac/i.test(userAgent)) {
//       device = "Mac Computer";
//     } else if (/Linux/i.test(userAgent)) {
//       device = "Linux Computer";
//     }
    
//     // Add browser info
//     if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) {
//       device += " (Chrome)";
//     } else if (/Firefox/i.test(userAgent)) {
//       device += " (Firefox)";
//     } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
//       device += " (Safari)";
//     } else if (/Edg/i.test(userAgent)) {
//       device += " (Edge)";
//     }
    
//     return device;
//   };

//   const getIPAddress = async () => {
//     try {
//       const response = await fetch('https://api.ipify.org?format=json');
//       const data = await response.json();
//       return data.ip || "Unknown IP";
//     } catch (error) {
//       console.error("Failed to get IP address:", error);
//       return "Unknown IP";
//     }
//   };

//   const validate = () => {
//     let isValid = true;
//     if (serviceNo.trim() === "" || password.trim() === "") {
//       isValid = false;
//       toast.error("Please Enter Valid UserID & Password.");
//     }
//     return isValid;
//   };

//   const handleButtonClick = async (e) => {
//     if (validate() && !loading) {
//       try {
//         // Get device and IP information
//         const device = getDeviceInfo();
//         const ip = await getIPAddress();
        
//         // Pass device and IP to handleLogin
//         handleLogin(serviceNo, password, device, ip);
//       } catch (error) {
//         toast.error("Failed to get device information");
//       }
//     }
//   };

//   const onServiceNoChanged = (e) => {
//     setserviceNo(e.target.value);
//   };

//   const onPasswordChanged = (e) => {
//     setpassword(e.target.value);
//   };

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#F8F9FA",
//         backgroundImage: `url(${imge})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundPosition: "center",
//       }}
//     >
//       <Box
//         component="img"
//         sx={{
//           height: "20%",
//           width: "50%",
//           maxHeight: { xs: 233, md: 167 },
//           maxWidth: { xs: 350, md: 250 },
//         }}
//         src={Textlogo}
//       />
//       <Typography
//         variant="h5"
//         fontWeight={300}
//         sx={{ my: 2, color: "#fff", marginBottom: "30%" }}
//       >
//         Corporate Mobile App
//       </Typography>

//       <Card sx={{ borderRadius: 5, boxShadow: 8 }}>
//         <Box p={3} textAlign="center">
//           <Typography variant="h4" fontWeight={600} sx={{ my: 2 }}>
//             Sign in
//           </Typography>
//         </Box>
//         <Box px={2} pb={3} textAlign="center">
//           <Typography
//             variant="h6"
//             color="#646464"
//             fontWeight={500}
//             sx={{ mb: 3 }}
//           >
//             Enter your registered User Id & Password
//           </Typography>
//           <Box>
//             <Box mb={1}>
//               <TextField
//                 id="outlined-basic"
//                 label="User ID"
//                 variant="outlined"
//                 InputProps={{ sx: { borderRadius: 3 } }}
//                 sx={{
//                   input: { textAlign: "center", fontSize: 20 },
//                   label: {
//                     right: "1.75rem",
//                     transformOrigin: "center",
//                     fontSize: "1rem",
//                   },
//                   legend: { textAlign: "center", fontSize: "0.7rem" },
//                 }}
//                 fullWidth
//                 type="text"
//                 onChange={onServiceNoChanged}
//               />
//             </Box>
//             <Box mb={1}>
//               <TextField
//                 id="outlined-basic"
//                 label="Password"
//                 variant="outlined"
//                 InputProps={{ sx: { borderRadius: 3 } }}
//                 sx={{
//                   input: { textAlign: "center", fontSize: 20 },
//                   label: {
//                     right: "1.75rem",
//                     transformOrigin: "center",
//                     fontSize: "1rem",
//                   },
//                   legend: { textAlign: "center", fontSize: "0.7rem" },
//                 }}
//                 fullWidth
//                 type="password"
//                 onChange={onPasswordChanged}
//               />
//             </Box>
//             <Box mt={4} mb={1}>
//               <LoadingButton
//                 onClick={handleButtonClick}
//                 endIcon={<LoginIcon />}
//                 loading={loading}
//                 loadingPosition="center"
//                 variant="contained"
//                 sx={{
//                   width: "90%",
//                   maxWidth: { xs: 350, md: 250 },
//                   backgroundColor: "#0049AF",
//                   textTransform: "capitalize",
//                   borderRadius: 3,
//                 }}
//               >
//                 <span style={{ color: "#fff", fontSize: 18, fontWeight: 400 }}>
//                   Sign In
//                 </span>
//               </LoadingButton>
//             </Box>
//           </Box>
//         </Box>
//       </Card>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-end",
//           alignItems: "center",
//           marginTop: 10,
//         }}
//       >
//         <Typography
//           variant="h8"
//           color="#646464"
//           fontWeight={500}
//           textAlign={"center"}
//           paddingLeft={3}
//           paddingRight={3}
//         >
//           Copyrights © Colombo Dockyard PLC.
//         </Typography>
//         <Typography variant="h7" color="#646464" fontWeight={500}>
//           All Rights Reserved.
//         </Typography>
//         <Typography fontSize={8} color="#646464" fontWeight={500}>
//           Powered By Dockyard Total Solution (Pvt) Ltd.
//         </Typography>
//       </Box>
//     </Container>
//   );
// };

// export default SignIn;


import { useState, useContext, useEffect } from "react";
import { Box, Card, Container, Typography, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import imge from "../../../assets/images/NewBGImage.jpg";
import Textlogo from "../../../assets/images/Textlogo.png";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkBiometricAvailability, biometricLogin } from "../../../action/Biometric";

const SignIn = () => {
  const [serviceNo, setserviceNo] = useState("");
  const [password, setpassword] = useState("");
  const { loading, biometricAvailable, biometricLoading } = useSelector((state) => state.auth);
  const { handleLogin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    metaThemeColor.setAttribute("content", "#004AAD");
  }, []);

  useEffect(() => {
    dispatch(checkBiometricAvailability());
  }, [dispatch]);

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let device = "Unknown Device";
    
    // Detect device type
    if (/Android/i.test(userAgent)) {
      device = "Android Mobile";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      device = "iOS Device";
    } else if (/Windows/i.test(userAgent)) {
      device = "Windows PC";
    } else if (/Mac/i.test(userAgent)) {
      device = "Mac Computer";
    } else if (/Linux/i.test(userAgent)) {
      device = "Linux Computer";
    }
    
    // Add browser info
    if (/Chrome/i.test(userAgent) && !/Edg/i.test(userAgent)) {
      device += " (Chrome)";
    } else if (/Firefox/i.test(userAgent)) {
      device += " (Firefox)";
    } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
      device += " (Safari)";
    } else if (/Edg/i.test(userAgent)) {
      device += " (Edge)";
    }
    
    return device;
  };

  const getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || "Unknown IP";
    } catch (error) {
      console.error("Failed to get IP address:", error);
      return "Unknown IP";
    }
  };

  const validate = () => {
    let isValid = true;
    if (serviceNo.trim() === "" || password.trim() === "") {
      isValid = false;
      toast.error("Please Enter Valid UserID & Password.");
    }
    return isValid;
  };

  const handleButtonClick = async (e) => {
    if (validate() && !loading) {
      try {
        // Get device and IP information
        const device = getDeviceInfo();
        const ip = await getIPAddress();
        
        // Pass device and IP to handleLogin
        handleLogin(serviceNo, password, device, ip);
      } catch (error) {
        toast.error("Failed to get device information");
      }
    }
  };

  const onServiceNoChanged = (e) => {
    setserviceNo(e.target.value);
  };

  const onPasswordChanged = (e) => {
    setpassword(e.target.value);
  };

  const handleBiometricLogin = () => {
    dispatch(biometricLogin(navigate));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
        backgroundImage: `url(${imge})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        component="img"
        sx={{
          height: "20%",
          width: "50%",
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        src={Textlogo}
      />
      <Typography
        variant="h5"
        fontWeight={300}
        sx={{ my: 2, color: "#fff", marginBottom: "30%" }}
      >
        Corporate Mobile App
      </Typography>

      <Card sx={{ borderRadius: 5, boxShadow: 8 }}>
        <Box p={3} textAlign="center">
          <Typography variant="h4" fontWeight={600} sx={{ my: 2 }}>
            Sign in
          </Typography>
        </Box>
        <Box px={2} pb={3} textAlign="center">
          <Typography
            variant="h6"
            color="#646464"
            fontWeight={500}
            sx={{ mb: 3 }}
          >
            Enter your registered User Id & Password
          </Typography>
          <Box>
            <Box mb={1}>
              <TextField
                id="outlined-basic"
                label="User ID"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
                sx={{
                  input: { textAlign: "center", fontSize: 20 },
                  label: {
                    right: "1.75rem",
                    transformOrigin: "center",
                    fontSize: "1rem",
                  },
                  legend: { textAlign: "center", fontSize: "0.7rem" },
                }}
                fullWidth
                type="text"
                onChange={onServiceNoChanged}
              />
            </Box>
            <Box mb={1}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                InputProps={{ sx: { borderRadius: 3 } }}
                sx={{
                  input: { textAlign: "center", fontSize: 20 },
                  label: {
                    right: "1.75rem",
                    transformOrigin: "center",
                    fontSize: "1rem",
                  },
                  legend: { textAlign: "center", fontSize: "0.7rem" },
                }}
                fullWidth
                type="password"
                onChange={onPasswordChanged}
              />
            </Box>
            <Box mt={4} mb={1}>
              <LoadingButton
                onClick={handleButtonClick}
                endIcon={<LoginIcon />}
                loading={loading}
                loadingPosition="center"
                variant="contained"
                sx={{
                  width: "90%",
                  maxWidth: { xs: 350, md: 250 },
                  backgroundColor: "#0049AF",
                  textTransform: "capitalize",
                  borderRadius: 3,
                }}
              >
                <span style={{ color: "#fff", fontSize: 18, fontWeight: 400 }}>
                  Sign In
                </span>
              </LoadingButton>
            </Box>
            {biometricAvailable && (
              <Box mt={2} mb={1} textAlign="center">
                <IconButton
                  onClick={handleBiometricLogin}
                  disabled={loading || biometricLoading}
                  sx={{
                    color: "#0049AF",
                    "&:hover": {
                      backgroundColor: "rgba(0, 73, 175, 0.08)",
                    },
                  }}
                >
                  <FingerprintIcon sx={{ fontSize: 48 }} />
                </IconButton>
                <Typography variant="body2" color="#646464" fontWeight={500}>
                  Use Biometrics
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Typography
          variant="h8"
          color="#646464"
          fontWeight={500}
          textAlign={"center"}
          paddingLeft={3}
          paddingRight={3}
        >
          Copyrights © Colombo Dockyard PLC.
        </Typography>
        <Typography variant="h7" color="#646464" fontWeight={500}>
          All Rights Reserved.
        </Typography>
        <Typography fontSize={8} color="#646464" fontWeight={500}>
          Powered By Dockyard Total Solution (Pvt) Ltd.
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;