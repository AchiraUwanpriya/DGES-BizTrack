import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HouseIcon from "@mui/icons-material/House";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SmsIcon from "@mui/icons-material/Sms";
import { Link, useLocation } from "react-router-dom";
import { Box, Badge, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Footer() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(null);

  const location = useLocation();

  const getActiveValue = (path) => {
    if (!path) return null;
    if (path === "/" || path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/home")) return "Home";
    if (path.startsWith("/userProfile") || path.startsWith("/userProfile"))
      return "Profile";
    if (path.startsWith("/notifications")) return "Notification";
    // common QR/Scan routes
    if (
      path.startsWith("/qr") ||
      path.startsWith("/scan") ||
      path.startsWith("/qrcode")
    )
      return "QR";
    return null;
  };

  React.useEffect(() => {
    setValue(getActiveValue(location.pathname));
  }, [location.pathname]);

  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.userbyServiceNo);
  const { headComponent } = useSelector((state) => state.headComponent);
  const [unreadCount, setUnreadCount] = React.useState(0);
 
  
  const hasDashboardAccess = headComponent?.some(
    (component) => component.ComponentId === "EMOBCI0014"
  );


  const fetchUnseenCount = async () => {
    try {
      const userResponse = await axios.get(
        `${axios.defaults.baseURL}/login/DGESGetUserByServiceNo`,
      );
      const userData = userResponse.data.ResultSet[0];
      const mobileNo = userData.MobileNo;

      const countResponse = await axios.get(
        `${axios.defaults.baseURL}Notification/GetUnSeenCount?P_PHONENO=${mobileNo}`,
      );

      setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
    } catch (error) {
      console.error("Error fetching unseen count:", error);
    }
  };

  React.useEffect(() => {
    fetchUnseenCount();
    const interval = setInterval(fetchUnseenCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === "QR") {
      dispatch({
        type: "IS_OPEN",
        payload: { isOpen: true, isOpenDetailScreen: false },
      });
    } else {
      dispatch({ type: "IS_CLOSE" });
    }
  };

  return (
    <Box
      sx={{ 
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%", 
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          background: "linear-gradient(135deg, #5B52B3 0%, #004AAD 100%)",
        }}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            background: "transparent",
            width: "100%",
            height: "75px",
            "& .MuiBottomNavigationAction-root": {
              color: "white",
              fontSize: "13px",
              paddingTop: "12px",
              paddingBottom: "12px",
            },
            "& .MuiBottomNavigationAction-label": {
              fontSize: "12px",
            },
            "& svg": {
              fontSize: "28px",
            }, 
            "& .MuiBottomNavigationAction-root.Mui-selected": {
              background: "#ffffff",
              color: "#004AAD",
              fontWeight: 700,
              borderRadius: "8px",
              padding: "8px 12px",
              margin: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              transition: "transform 150ms ease, box-shadow 150ms ease",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "12px",
                fontWeight: 700,
                color: "#004AAD",
              },
              "& svg": {
                transform: "scale(1.15)",
                color: "#004AAD",
              },
            },
          }}
        >
          {/* Home */}
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="Home"
            value="Home"
            icon={<HouseIcon />}
          />

          {/* Dashboard or Profile - Now using dynamic access control */}
          {hasDashboardAccess ? (
            <BottomNavigationAction
              component={Link}
              to="/dashboard"
              label="Dashboard"
              value="Dashboard"
              icon={<DashboardIcon />}
            />
          ) : (
            <BottomNavigationAction
              component={Link}
              to="/userProfile"
              label="Profile"
              value="Profile"
              icon={<PersonIcon />}
            />
          )}


            

          {/* QR */}
          <BottomNavigationAction
            label="Scan"
            value="QR"
            icon={<QrCodeScannerIcon />}
          />

          {/* Notifications */}
          <BottomNavigationAction
            component={Link}
            to="/notifications"
            label="Messages"
            value="Notification"
            icon={
              <Badge
                badgeContent={unreadCount}
                color="error"
                invisible={unreadCount === 0}
                max={999}
              >
                <SmsIcon />
              </Badge>
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


//------------------2026-04-29----


// import * as React from "react";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import HouseIcon from "@mui/icons-material/House";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonIcon from "@mui/icons-material/Person";
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
// import SmsIcon from "@mui/icons-material/Sms";
// import { Link, useLocation } from "react-router-dom";
// import { Box, Badge, Paper } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// export default function Footer() {
//   const dispatch = useDispatch();
//   const [value, setValue] = React.useState(null);

//   const location = useLocation();

//   const getActiveValue = (path) => {
//     if (!path) return null;
//     if (path === "/" || path.startsWith("/dashboard")) return "Dashboard";
//     if (path.startsWith("/home")) return "Home";
//     if (path.startsWith("/userProfile") || path.startsWith("/userProfile"))
//       return "Profile";
//     if (path.startsWith("/notifications")) return "Notification";

//     if (
//       path.startsWith("/qr") ||
//       path.startsWith("/scan") ||
//       path.startsWith("/qrcode")
//     )
//       return "QR";
//     return null;
//   };

//   React.useEffect(() => {
//     setValue(getActiveValue(location.pathname));
//   }, [location.pathname]);

//   const { user } = useSelector((state) => state.auth);
//   const { data } = useSelector((state) => state.userbyServiceNo);
//   const [unreadCount, setUnreadCount] = React.useState(0);

//   const ALLOWED_USER_IDS = ["0004086", "0003595","8000048"];
//   const serviceNo = user?.ServiceNo || (data && data[0]?.ServiceNo);
//   const canAccessDashboard =
//     serviceNo && ALLOWED_USER_IDS.includes(String(serviceNo).trim());

//   const fetchUnseenCount = async () => {
//     try {
//       const userResponse = await axios.get(
//         `${axios.defaults.baseURL}/login/DGESGetUserByServiceNo`,
//       );
//       const userData = userResponse.data.ResultSet[0];
//       const mobileNo = userData.MobileNo;

//       const countResponse = await axios.get(
//         `${axios.defaults.baseURL}Notification/DGESGetUnSeenCount?P_PHONENO=${mobileNo}`,
//       );

//       setUnreadCount(parseInt(countResponse.data.ResultSet.Count) || 0);
//     } catch (error) {
//       console.error("Error fetching unseen count:", error);
//     }
//   };

//   React.useEffect(() => {
//     fetchUnseenCount();
//     const interval = setInterval(fetchUnseenCount, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);

//     if (newValue === "QR") {
//       dispatch({
//         type: "IS_OPEN",
//         payload: { isOpen: true, isOpenDetailScreen: false },
//       });
//     } else {
//       dispatch({ type: "IS_CLOSE" });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         bottom: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         width: "100%",
//       }}
//     >
//       <Paper
//         elevation={10}
//         sx={{
//           width: "100%",
//           borderTopLeftRadius: "20px",
//           borderTopRightRadius: "20px",
//           borderBottomLeftRadius: 0,
//           borderBottomRightRadius: 0,
//           background: "linear-gradient(135deg, #5B52B3 0%, #004AAD 100%)",
//         }}
//       >
//         <BottomNavigation
//           value={value}
//           onChange={handleChange}
//           showLabels
//           sx={{
//             background: "transparent",
//             width: "100%",
//             height: "75px",
//             "& .MuiBottomNavigationAction-root": {
//               color: "white",
//               fontSize: "13px",
//               paddingTop: "12px",
//               paddingBottom: "12px",
//             },
//             "& .MuiBottomNavigationAction-label": {
//               fontSize: "12px",
//             },
//             "& svg": {
//               fontSize: "28px",
//             },
//             "& .MuiBottomNavigationAction-root.Mui-selected": {
//               background: "#FFFFFF",
//               color: "#004AAD",
//               fontWeight: 700,
//               borderRadius: "8px",
//               padding: "8px 12px",
//               margin: "8px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
//               transition: "transform 150ms ease, box-shadow 150ms ease",
//               "& .MuiBottomNavigationAction-label": {
//                 fontSize: "12px",
//                 fontWeight: 700,
//                 color: "#004AAD",
//               },
//               "& svg": {
//                 transform: "scale(1.15)",
//                 color: "#004AAD",
//               },
//             },
//           }}
//         >
//           {/* Home */}
//           <BottomNavigationAction
//             component={Link}
//             to="/home"
//             label="Home"
//             value="Home"
//             icon={<HouseIcon />}
//           />

//           Dashboard was previously shown for allowed users. Commented out per request.
//             {canAccessDashboard ? (
//               <BottomNavigationAction
//                 component={Link}
//                 to="/dashboard"
//                 label="Dashboard"
//                 value="Dashboard"
//                 icon={<DashboardIcon />}
//               />
//             ) : (
//               <BottomNavigationAction
//                 component={Link}
//                 to="/userProfile"
//                 label="Profile"
//                 value="Profile"
//                 icon={<PersonIcon />}
//               />
//             )}
//           

//           {/* Always show Profile icon (click navigates to user profile) */}
//           <BottomNavigationAction
//             component={Link}
//             to="/userProfile"
//             label="Profile"
//             value="Profile"
//             icon={<PersonIcon />}
//           />

//           {/* QR */}
//           <BottomNavigationAction
//             label="Scan"
//             value="QR"
//             icon={<QrCodeScannerIcon />}
//           />

//           {/* Notifications */}
//           <BottomNavigationAction
//             component={Link}
//             to="/notifications"
//             label="Messages"
//             value="Notification"
//             icon={
//               <Badge
//                 badgeContent={unreadCount}
//                 color="error"
//                 invisible={unreadCount === 0}
//                 max={999}
//               >
//                 <SmsIcon />
//               </Badge>
//             }
//           />
//         </BottomNavigation>
//       </Paper>
//     </Box>
//   );
// }