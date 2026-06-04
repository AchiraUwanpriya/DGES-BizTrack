// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   Menu,
//   MenuItem,
//   Divider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { logOut } from "../../action/Login";

// const Header = ({ title }) => {
//   const { data } = useSelector((state) => state.userbyServiceNo);
//   const [hasImage, setHasImage] = useState(false);
//   const authKey = JSON.parse(localStorage.getItem("token"));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [inTime, setInTime] = useState(""); // State to hold In Time
//   let navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch In Time from API
//     const fetchInTime = async () => {
//       const currentDate = new Date();
//       const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
//         .toString()
//         .padStart(2, "0")}`;

//       try {
//         const response = await axios.get(
//           `Attendance/GetAttendanceCard?P_MONTH=${month}`
//         );

//         if (response.data.StatusCode === 200) {
//           const resultSet = response.data.ResultSet;
//           const today = currentDate.toLocaleDateString(); // Format to match API response

//           // Find today's attendance record
//           const todayRecord = resultSet.find((record) => {
//             const recordDate = new Date(record.Date).toLocaleDateString();
//             return recordDate === today;
//           });

//           // Set In Time if it exists
//           if (todayRecord) {
//             setInTime(todayRecord.InTime || "Unvailable"); // Default message if InTime is empty
//           } else {
//             setInTime("Unvailable"); // Default message if no record found
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching In Time:", error);
//       }
//     };

//     fetchInTime();

//     // Image loading logic remains unchanged
//     try {
//       const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//       if (metaThemeColor) {
//         metaThemeColor.setAttribute("content", "#004AAD");
//       }
//       const img = new Image();
//       img.onload = function () {
//         setHasImage(true);
//       };
//       img.onerror = function () {
//         setHasImage(false);
//       };
//       if (data && data[0] && data[0].ServiceNo) {
//         img.src = `${axios.defaults.baseURL}Home/DGESGetUserImg?serviceNo=${
//           data[0].ServiceNo
//         }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "");
//       }
//     } catch (error) {
//       console.error("Error loading image:", error);
//     }
//   }, [navigate, dispatch, authKey, data]);

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logOut(navigate));
//   };

//   const handleProfile = () => {
//     handleClose();
//     navigate("/userprofile");
//   };

//   const greet = () => {
//     var d = new Date();
//     var time = d.getHours();

//     if (time < 12) {
//       return "Good Morning...";
//     } else if (time >= 12 && time <= 16) {
//       return "Good Afternoon...";
//     } else {
//       return "Good Evening...";
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         display: "flex",
//         justifyContent: "space-between",
//         padding: 1,
//         top: 0,
//         zIndex: 999,
//       }}
//     >
//       <Box sx={{ display: "flex", flexDirection: "column" }}>
//         <div style={{ maxWidth: "400px" }}>
//           <img
//             width={"60%"}
//             src={require("../../assets/icons/a.png")}
//             alt="First slide"
//           />
//         </div>
//         <Typography fontSize={12} fontWeight={550}>
//           {greet()}
//         </Typography>
//       </Box>
//       <Box sx={{ alignItems: "center" }}>
//         <IconButton onClick={handleMenu}>
//           <Avatar
//             variant="rounded"
//             src={
//               hasImage
//                 ? `${axios.defaults.baseURL}Home/DGESGetUserImg?serviceNo=${
//                     data[0].ServiceNo
//                   }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "")
//                 : require("../../assets/images/man.png")
//             }
//             sx={{
//               width: 40,
//               height: "20%",
//               borderRadius: 2,
//             }}
//           />
//         </IconButton>
//         <Typography sx={{ color: "green", fontSize: 12, marginLeft: -7 }}>
//           In Time : {inTime}
//         </Typography>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "right",
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleProfile}>Profile</MenuItem>
//           <Divider sx={{ my: 0.5 }} />
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default Header;


import React, { useEffect, useState } from "react";
import ForceUpdateButton from '../ForceUpdateButton';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logOut } from "../../action/Login";

const Header = ({ title }) => {
  const { data } = useSelector((state) => state.userbyServiceNo);
  const [hasImage, setHasImage] = useState(false);
  const authKey = JSON.parse(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [inTime, setInTime] = useState("");  
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInTime = async () => {
      const currentDate = new Date();
      const month = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      try {
        const response = await axios.get(
          `Attendance/DGESGetAttendanceCard?P_MONTH=${month}`
        );

        if (response.data.StatusCode === 200) {
          const resultSet = response.data.ResultSet;
          const today = currentDate.toLocaleDateString();

          const todayRecord = resultSet.find((record) => {
            const recordDate = new Date(record.Date).toLocaleDateString();
            return recordDate === today;
          });

          // Set In Time if it exists
          if (todayRecord) {
            setInTime(todayRecord.InTime || "Unavailable");  
          } else {
            setInTime("Unavailable");   
          }
        }
      } catch (error) {
        console.error("Error fetching In Time:", error);
      }
    };

    fetchInTime();

     
    try {
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", "#004AAD");
      }
      const img = new Image();
      img.onload = function () {
        setHasImage(true);
      };
      img.onerror = function () {
        setHasImage(false);
      };
      if (data && data[0] && data[0].ServiceNo) {
        img.src = `${axios.defaults.baseURL}home/DGESGetUserImg?serviceNo=${
          data[0].ServiceNo
        }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "");
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }, [navigate, dispatch, authKey, data]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logOut(navigate));
  };

  const handleProfile = () => {
    handleClose();
    navigate("/userprofile");
  };

  const greet = () => {
    var d = new Date();
    var time = d.getHours();

    if (time < 12) {
      return "Good Morning...";
    } else if (time >= 12 && time <= 16) {
      return "Good Afternoon...";
    } else {
      return "Good Evening...";
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        padding: 1,
        top: 0,
        zIndex: 999,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div style={{ maxWidth: "400px" }}>
          <img
            width={"60%"}
            src={require("../../assets/icons/a.png")}
            alt="First slide"
          />
        </div>
        <Typography fontSize={12} fontWeight={550}>
          {greet()}
        </Typography>
        
      </Box>
      
      <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    {/* Force update button */}
    <ForceUpdateButton
      onClick={(e) => {
        e.stopPropagation();  
        
      }}
    />

    {/* ONLY avatar opens menu */}
    <IconButton
  onClick={(e) => {
    
      handleMenu(e);  
    
  }}
>
  <Avatar
    variant="rounded"
    src={
      hasImage
        ? `${axios.defaults.baseURL}Home/DGESGetUserImg?serviceNo=${
            data[0].ServiceNo
          }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "")
        : require("../../assets/images/man.png")
    }
    sx={{
      width: 40,
      height: 50,
      borderRadius: 2,
      cursor: hasImage ? "pointer" : "default",
    }}
  />
</IconButton>

  </Box>

  {inTime && inTime !== "Unavailable" && (
    <Typography
      sx={{
        color: "green",
        fontSize: 12,
        mt: 0.3,
        textAlign: "right",
      }}
    >
      In Time: {inTime}
    </Typography>
  )}

  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <MenuItem onClick={handleProfile}>Profile</MenuItem>
    <Divider sx={{ my: 0.5 }} />
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  </Menu>
</Box>

    </Box>
  );
};

export default Header;



 