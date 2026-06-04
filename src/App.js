// import React, { Fragment, useEffect, useState, useContext } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import "./App.css";
// import Signin from "./layouts/authentication/sign-in";
// import Verification from "./layouts/authentication/verification";
// import Home from "./layouts/other/Home";
// import QR from "./layouts/qrscan/QR";
// import NewQR_Scan from "./layouts/qrscan/NewQR_Scan";
// // import NotFound from "./components/Utility/NotFound";
// import BudgetShop from "./layouts/budget_shop/BudgetShop";
// import Outstanding_Tools from "./layouts/outstanding_tools/Outstanding_Tools";
// import Attendance from "./layouts/attendance/Attendance";
// import Leave from "./layouts/leave";
// import Medical from "./layouts/medical";
// import PublicRoute from "./route/PublicRoute";
// import { useAuth } from "./context/AuthContext";
// import { ToastContainer } from "react-toastify";
// import { loadUser } from "./action/Login";
// import { GetAccessHeadComponent } from "./action/Common";
// import store from "./store";

// import { useSelector } from "react-redux";
// import Footer from "./route/BottomNavigation";
// import Header from "./components/Header/Header";
// import Loader from "./components/Utility/Loader";
// import UserProfile from "./layouts/userProfile/userProfile";
// import Telephone from "./layouts/telephone_directory/Telephone";
// import Jobs from "./layouts/job_allocation/Job_Allocation";
// import EMPDetails from "./layouts/job_allocation/EMPDetails";
// import Approvals from "./layouts/approvals/Approvals";
// import Reservations from "./layouts/reservations/Reservations";
// import Rfid_Attendence from "./layouts/rfid_attendence/Rfid_Attendence";

// // import useMediaQuery from "@material-ui/core/useMediaQuery";
// // const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

// function App() {
//   const { isLoggedIn, loading } = useSelector((state) => state.auth);
//   const { isOpen, isOpenDetailScreen } = useSelector(
//     (state) => state.qrVisible
//   );

//   const { isOnline, isAuthenticated } = useAuth();
//   console.log(isOnline);
//   useEffect(() => {
//     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//     if (isOnline) {
//       metaThemeColor.setAttribute("content", "#F2F2F2");
//     } else {
//       metaThemeColor.setAttribute("content", "#004AAD");
//     }
//   }, [isOnline]);

//   return (
//     <div>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       {isOnline ? (
//         <Fragment>
//           {loading ? (
//             <Loader text={"Validating user token. Please wait.."}></Loader>
//           ) : (
//             <>
//               {isLoggedIn ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100vh",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <Header />
//                   <NewQR_Scan
//                     isOpen={isOpen}
//                     isOpenDetailScreen={isOpenDetailScreen}
//                   ></NewQR_Scan>
//                   <div
//                     style={{
//                       flex: 1,
//                       overflowY: "scroll",
//                       backgroundColor: "#F2F3F4",
//                       borderRadius: 15,
//                       m: 1,
//                     }}
//                   >
//                     <Routes>
//                       <Route element={<Home />} path="/*" />
//                       <Route element={<BudgetShop />} path="/budgetshop" />
//                       <Route element={<Leave />} path="/leave" />
//                       <Route element={<Attendance />} path="/attendance" />
//                       <Route element={<Medical />} path="/medical" />
//                       <Route element={<Telephone />} path="/telephone" />
//                       <Route element={<Jobs />} path="/jobs" />
//                       <Route element={<EMPDetails />} path="/empdetails" />
//                       <Route element={<Outstanding_Tools />} path="/tools" />
//                       <Route element={<UserProfile />} path="/userProfile" />
//                       <Route element={<Approvals />} path="/approvals" />
//                       <Route element={<Reservations />} path="/reservation" />
//                       <Route
//                         element={<Rfid_Attendence />}
//                         path="/rfid-attendence"
//                       />
//                     </Routes>
//                   </div>
//                   <div
//                     style={{
//                       position: "sticky",
//                       bottom: 0,
//                       width: "100%",
//                       padding: 2,
//                     }}
//                   >
//                     <Footer />
//                   </div>
//                 </div>
//               ) : (
//                 <Routes>
//                   <Route element={<Signin />} path="/*" />
//                   <Route element={<Signin />} path="/login" />
//                   <Route element={<PublicRoute />}>
//                     <Route element={<Verification />} path="/Verification" />
//                   </Route>
//                 </Routes>
//               )}
//             </>
//           )}
//         </Fragment>
//       ) : (
//         <Fragment>
//           <Loader></Loader>
//         </Fragment>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { Fragment, useEffect, useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Signin from "./layouts/authentication/sign-in";
import Verification from "./layouts/authentication/verification";
import Home from "./layouts/other/Home";
import Dashboard from "./layouts/other/Dashboard";
import QR from "./layouts/qrscan/QR";
import NewQR_Scan from "./layouts/qrscan/NewQR_Scan";
// import NotFound from "./components/Utility/NotFound";
import BudgetShop from "./layouts/budget_shop/BudgetShop";
import Outstanding_Tools from "./layouts/outstanding_tools/Outstanding_Tools";
import Attendance from "./layouts/attendance/Attendance";
import Leave from "./layouts/leave";
import Extra_Hours from "./layouts/extra_hours/Extra_Hours";
import Time_Endoresement from "./layouts/time_endoresement/Time_Endoresement";
import Medical from "./layouts/medical";
import PublicRoute from "./route/PublicRoute";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./action/Login";
import { GetAccessHeadComponent } from "./action/Common";
import store from "./store";
import versionInfo from "./version.json";

import { useSelector } from "react-redux";
import Footer from "./route/BottomNavigation";
import Header from "./components/Header/Header";
import Loader from "./components/Utility/Loader";
import UserProfile from "./layouts/userProfile/userProfile";
import Telephone from "./layouts/telephone_directory/Telephone";
import Jobs from "./layouts/job_allocation/Job_Allocation";
import EMPDetails from "./layouts/job_allocation/EMPDetails";
import Approvals from "./layouts/approvals/Approvals";
import Reservations from "./layouts/reservations/ReservationCard";
import Reservations1 from "./layouts/reservations/Reservations";
import Rfid_Attendence from "./layouts/rfid_attendence/Rfid_Attendence";
import Personal from "./layouts/personal/personal";

// Import all approval component files
import IwoApp from "./layouts/approvals/IwoApp";
import EwoApp from "./layouts/approvals/EwoApp";
import MocApp from "./layouts/approvals/MocApp";
import UmrApp from "./layouts/approvals/UmrApp";
import LeaveApp from "./layouts/approvals/LeaveApp";
import OTApp from "./layouts/approvals/OTApp";
import EFileApp from "./layouts/approvals/EFileApp";
import AttendanceA from "./layouts/approvals/Attendance";
import AgrementApp from "./layouts/approvals/AgrementApp";
import File_Attachments from "./layouts/file_attachments/File_Attachments";
import Notifications from "./layouts/notifications/Notifications";
import NotificationMessage from "./layouts/notifications/NotificationMessage";
import MaintenancePage from "../src/components/Cards/maintenance";
import Caregiver from "../src/components/Cards/CareGiver";
import Manager from "../src/layouts/reservations/Managers";
import ProtectedDashboardRoute from "./route/ProtectedDashboardRoute";
import AttendanceEntry from "./layouts/mark_attendance/AttendanceEntry";
import VehicalTracking from "./layouts/vehical_tracking/VehicalTracking"

// import useMediaQuery from "@material-ui/core/useMediaQuery";
// const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

function App() {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const { isOpen, isOpenDetailScreen } = useSelector(
    (state) => state.qrVisible,
  );

  const { isOnline, isAuthenticated } = useAuth();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (isOnline) {
      metaThemeColor.setAttribute("content", "#F2F2F2");
    } else {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
  }, [isOnline]);

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await fetch("/version.json?t=" + Date.now());
        const data = await response.json();

        if (data.version !== versionInfo.version) {
          if (
            window.confirm(
              "A new version is available! Would you like to update?",
            )
          ) {
            if ("caches" in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map((name) => caches.delete(name)));
            }

            if ("serviceWorker" in navigator) {
              const registrations =
                await navigator.serviceWorker.getRegistrations();
              await Promise.all(registrations.map((reg) => reg.unregister()));
            }

            window.location.reload(true);
          }
        }
      } catch (error) {
        console.error("Version check failed:", error);
      }
    };

    checkVersion();
    const interval = setInterval(checkVersion, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isOnline ? (
        <Fragment>
          {loading ? (
            <Loader text={"Validating user token. Please wait.."}></Loader>
          ) : (
            <>
              {isLoggedIn ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    backgroundColor: "white",
                  }}
                >
                  <Header />
                  <NewQR_Scan
                    isOpen={isOpen}
                    isOpenDetailScreen={isOpenDetailScreen}
                  ></NewQR_Scan>
                  <div
                    style={{
                      flex: 1,
                      overflowY: "scroll",
                      backgroundColor: "#F2F3F4",
                      borderRadius: 15,
                      m: 1,
                    }}
                  >
                    <Routes>
                      <Route element={<Home />} path="/home" />
                      {/* <Route element={<ProtectedDashboardRoute><Dashboard /></ProtectedDashboardRoute>} path="/*" /> */}
                      <Route element={<Dashboard />} path="/*" />
                      <Route element={<BudgetShop />} path="/budgetshop" />
                      <Route element={<Leave />} path="/leave" />
                      <Route element={<Extra_Hours />} path="/ex_hours" />
                      <Route
                        element={<Time_Endoresement />}
                        path="/time_endoresement"
                      />
                      <Route element={<Attendance />} path="/attendance" />
                      <Route element={<Medical />} path="/medical" />
                      <Route element={<Telephone />} path="/telephone" />
                      <Route element={<Jobs />} path="/jobs" />
                      <Route
                        element={<MaintenancePage />}
                        path="/MaintenancePage"
                      />
                      <Route element={<Manager />} path="/ManagerPage" />

                      <Route element={<EMPDetails />} path="/empdetails" />
                      <Route element={<Outstanding_Tools />} path="/tools" />
                      <Route element={<UserProfile />} path="/userProfile" />
                      <Route element={<Approvals />} path="/approvals" />
                      <Route element={<Reservations />} path="/reservation" />
                      <Route element={<Reservations1 />} path="/reservations" />
                      <Route element={<Caregiver />} path="/caretaker-view" />
                      <Route element={<Personal />} path="/personal" />
                      {/* Add new approval routes */}
                      <Route element={<IwoApp />} path="/approvals/iwo" />
                      <Route element={<EwoApp />} path="/approvals/ewo" />
                      <Route element={<MocApp />} path="/approvals/moc" />
                      <Route element={<UmrApp />} path="/approvals/umr" />
                      <Route element={<LeaveApp />} path="/approvals/leave" />
                      <Route element={<OTApp />} path="/approvals/ot" />
                      <Route element={<EFileApp />} path="/approvals/efile" />
                      <Route element={<AttendanceA />} path="/approvals/Attendance" />
                      <Route element={<AttendanceEntry />} path="/attendance-entry" />
                      <Route element={<VehicalTracking />} path="/VehicalTracking" />
                      <Route
                        element={<AgrementApp />}
                        path="/approvals/agreement"
                      />
                      {/* <Route element={<Reservations />} path="/reservation" /> */}
                      <Route
                        element={<Rfid_Attendence />}
                        path="/rfid-attendence"
                      />
                      <Route
                        element={<File_Attachments />}
                        path="/file-attachments"
                      />
                      <Route
                        element={<Notifications />}
                        path="/notifications"
                      />
                      <Route
                        path="/notifications/NotificationMessage"
                        element={<NotificationMessage />}
                      />
                    </Routes>
                  </div>
                  <div
                    style={{
                      position: "sticky",
                      bottom: 0,
                      width: "100%",
                      padding: 2,
                    }}
                  >
                    <Footer />
                  </div>
                </div>
              ) : (
                <Routes>
                  <Route element={<Signin />} path="/*" />
                  <Route element={<Signin />} path="/login" />
                  <Route element={<PublicRoute />}>
                    <Route element={<Verification />} path="/Verification" />
                  </Route>
                </Routes>
              )}
            </>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <Loader></Loader>
        </Fragment>
      )}
    </div>
  );
}

export default App;





// import React, { Fragment, useEffect, useState, useContext } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import "./App.css";
// import Signin from "./layouts/authentication/sign-in";
// import Verification from "./layouts/authentication/verification";
// import Home from "./layouts/other/Home";
// import Dashboard from "./layouts/other/Dashboard";
// import QR from "./layouts/qrscan/QR";
// import NewQR_Scan from "./layouts/qrscan/NewQR_Scan";
// // import NotFound from "./components/Utility/NotFound";
// import BudgetShop from "./layouts/budget_shop/BudgetShop";
// import Outstanding_Tools from "./layouts/outstanding_tools/Outstanding_Tools";
// import Attendance from "./layouts/attendance/Attendance";
// import Leave from "./layouts/leave";
// import Extra_Hours from "./layouts/extra_hours/Extra_Hours";
// import Time_Endoresement from "./layouts/time_endoresement/Time_Endoresement";
// import Medical from "./layouts/medical";
// import PublicRoute from "./route/PublicRoute";
// import { useAuth } from "./context/AuthContext";
// import { ToastContainer } from "react-toastify";
// import { loadUser } from "./action/Login";
// import { GetAccessHeadComponent } from "./action/Common";
// import store from "./store";
// import versionInfo from "./version.json";

// import { useSelector } from "react-redux";
// import Footer from "./route/BottomNavigation";
// import Header from "./components/Header/Header";
// import Loader from "./components/Utility/Loader";
// import UserProfile from "./layouts/userProfile/userProfile";
// import Telephone from "./layouts/telephone_directory/Telephone";
// import Jobs from "./layouts/job_allocation/Job_Allocation";
// import EMPDetails from "./layouts/job_allocation/EMPDetails";
// import Approvals from "./layouts/approvals/Approvals";
// import Reservations from "./layouts/reservations/ReservationCard";
// import Reservations1 from "./layouts/reservations/Reservations";
// import Rfid_Attendence from "./layouts/rfid_attendence/Rfid_Attendence";
// import Personal from "./layouts/personal/personal";

// // Import all approval component files
// import IwoApp from "./layouts/approvals/IwoApp";
// import EwoApp from "./layouts/approvals/EwoApp";
// import MocApp from "./layouts/approvals/MocApp";
// import UmrApp from "./layouts/approvals/UmrApp";
// import LeaveApp from "./layouts/approvals/LeaveApp";
// import OTApp from "./layouts/approvals/OTApp";
// import EFileApp from "./layouts/approvals/EFileApp";
// import AgrementApp from "./layouts/approvals/AgrementApp";
// import File_Attachments from "./layouts/file_attachments/File_Attachments";
// import Notifications from "./layouts/notifications/Notifications";
// import NotificationMessage from "./layouts/notifications/NotificationMessage";
// import MaintenancePage from "../src/components/Cards/maintenance";
// import Caregiver from "../src/components/Cards/CareGiver";
// import Manager from "../src/layouts/reservations/Managers";
// import ProtectedDashboardRoute from "./route/ProtectedDashboardRoute";
// import AttendanceEntry from "./layouts/mark_attendance/AttendanceEntry";

// // import useMediaQuery from "@material-ui/core/useMediaQuery";
// // const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

// function App() {
//   const { isLoggedIn, loading } = useSelector((state) => state.auth);
//   const { isOpen, isOpenDetailScreen } = useSelector(
//     (state) => state.qrVisible,
//   );

//   const { isOnline, isAuthenticated } = useAuth();
//   useEffect(() => {
//     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//     if (isOnline) {
//       metaThemeColor.setAttribute("content", "#F2F2F2");
//     } else {
//       metaThemeColor.setAttribute("content", "#004AAD");
//     }
//   }, [isOnline]);

//   useEffect(() => {
//     const checkVersion = async () => {
//       try {
//         const response = await fetch("/version.json?t=" + Date.now());
//         const data = await response.json();

//         if (data.version !== versionInfo.version) {
//           if (
//             window.confirm(
//               "A new version is available! Would you like to update?",
//             )
//           ) {
//             if ("caches" in window) {
//               const cacheNames = await caches.keys();
//               await Promise.all(cacheNames.map((name) => caches.delete(name)));
//             }

//             if ("serviceWorker" in navigator) {
//               const registrations =
//                 await navigator.serviceWorker.getRegistrations();
//               await Promise.all(registrations.map((reg) => reg.unregister()));
//             }

//             window.location.reload(true);
//           }
//         }
//       } catch (error) {
//         console.error("Version check failed:", error);
//       }
//     };

//     checkVersion();
//     const interval = setInterval(checkVersion, 30 * 60 * 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       {isOnline ? (
//         <Fragment>
//           {loading ? (
//             <Loader text={"Validating user token. Please wait.."}></Loader>
//           ) : (
//             <>
//               {isLoggedIn ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     height: "100vh",
//                     backgroundColor: "white",
//                   }}
//                 >
//                   <Header />
//                   <NewQR_Scan
//                     isOpen={isOpen}
//                     isOpenDetailScreen={isOpenDetailScreen}
//                   ></NewQR_Scan>
//                   <div
//                     style={{
//                       flex: 1,
//                       overflowY: "scroll",
//                       backgroundColor: "#F2F3F4",
//                       borderRadius: 15,
//                       m: 1,
//                     }}
//                   >
//                     <Routes>
//                       <Route element={<Home />} path="/home" />
//                       {/* Default to Home on app load instead of Dashboard. */}
//                       <Route element={<Home />} path="/*" />
//                       {/* Previously defaulted to Dashboard:
//                         <Route element={<ProtectedDashboardRoute><Dashboard /></ProtectedDashboardRoute>} path="/*" />
//                       */}
//                       <Route element={<BudgetShop />} path="/budgetshop" />
//                       <Route element={<Leave />} path="/leave" />
//                       <Route element={<Extra_Hours />} path="/ex_hours" />
//                       <Route
//                         element={<Time_Endoresement />}
//                         path="/time_endoresement"
//                       />
//                       <Route element={<Attendance />} path="/attendance" />
//                       <Route element={<Medical />} path="/medical" />
//                       <Route element={<Telephone />} path="/telephone" />
//                       <Route element={<Jobs />} path="/jobs" />
//                       <Route
//                         element={<MaintenancePage />}
//                         path="/MaintenancePage"
//                       />
//                       <Route element={<Manager />} path="/ManagerPage" />

//                       <Route element={<EMPDetails />} path="/empdetails" />
//                       <Route element={<Outstanding_Tools />} path="/tools" />
//                       <Route element={<UserProfile />} path="/userProfile" />
//                       <Route element={<Approvals />} path="/approvals" />
//                       <Route element={<Reservations />} path="/reservation" />
//                       <Route element={<Reservations1 />} path="/reservations" />
//                       <Route element={<Caregiver />} path="/caretaker-view" />
//                       <Route element={<Personal />} path="/personal" />
//                       {/* Add new approval routes */}
//                       <Route element={<IwoApp />} path="/approvals/iwo" />
//                       <Route element={<EwoApp />} path="/approvals/ewo" />
//                       <Route element={<MocApp />} path="/approvals/moc" />
//                       <Route element={<UmrApp />} path="/approvals/umr" />
//                       <Route element={<LeaveApp />} path="/approvals/leave" />
//                       <Route element={<OTApp />} path="/approvals/ot" />
//                       <Route element={<EFileApp />} path="/approvals/efile" />
//                       <Route element={<AttendanceEntry />} path="/attendance-entry" />
//                       <Route
//                         element={<AgrementApp />}
//                         path="/approvals/agreement"
//                       />
//                       {/* <Route element={<Reservations />} path="/reservation" /> */}
//                       <Route
//                         element={<Rfid_Attendence />}
//                         path="/rfid-attendence"
//                       />
//                       <Route
//                         element={<File_Attachments />}
//                         path="/file-attachments"
//                       />
//                       <Route
//                         element={<Notifications />}
//                         path="/notifications"
//                       />
//                       <Route
//                         path="/notifications/NotificationMessage"
//                         element={<NotificationMessage />}
//                       />
//                     </Routes>
//                   </div>
//                   <div
//                     style={{
//                       position: "sticky",
//                       bottom: 0,
//                       width: "100%",
//                       padding: 2,
//                     }}
//                   >
//                     <Footer />
//                   </div>
//                 </div>
//               ) : (
//                 <Routes>
//                   <Route element={<Signin />} path="/*" />
//                   <Route element={<Signin />} path="/login" />
//                   <Route element={<PublicRoute />}>
//                     <Route element={<Verification />} path="/Verification" />
//                   </Route>
//                 </Routes>
//               )}
//             </>
//           )}
//         </Fragment>
//       ) : (
//         <Fragment>
//           <Loader></Loader>
//         </Fragment>
//       )}
//     </div>
//   );
// }

// export default App;
