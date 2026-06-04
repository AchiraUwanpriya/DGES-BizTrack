// import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { login, logOut, OTPVerify } from "../action/Login";
// import { loadUser } from "../action/Login";
// import { useDispatch } from "react-redux";
// import { GetAccessHeadComponent } from "../action/Common";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import store from "../store";
// import { toast } from "react-toastify";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   // let authKey = "gkqyA1dPw/ZQ/z61Mvu2oFbQa4YTTTjA8pheytCNw0I="; // Hardcoded for testing
//    let authKey = JSON.parse(localStorage.getItem("token"));
//   const { isLoggedIn } = useSelector((state) => state.auth);
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     if (authKey) {
//       axios.defaults.headers.common["auth-key"] = authKey;
//       dispatch(loadUser()); 
//       return authKey;
//     }
//     return false;
//   });

//   const handleLogin = async (serviceNo, password) => {
//     try {
//       await dispatch(login(serviceNo, password, navigate));
//     } catch (error) {
//       // console.error("Login failed:", error);
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   const handleVerification = (useData, token) => {
//     dispatch(OTPVerify(useData, token, navigate));
//   };

//   const handleLogout = () => {
//     logOut(navigate);
//   };

//   useEffect(() => {
//     setIsAuthenticated(isLoggedIn);
//     if (isLoggedIn) {
//       axios.defaults.headers.common["auth-key"] = authKey;

//       dispatch(GetAccessHeadComponent());
//     }

//     const handleOnlineStatusChange = () => {
//       setIsOnline(navigator.onLine);
//       if (navigator.onLine) {
//         if (authKey) {
//           store.dispatch(loadUser());
//         }
//       }
//     };
//     window.addEventListener("online", handleOnlineStatusChange);
//     window.addEventListener("offline", handleOnlineStatusChange);

//     return () => {
//       window.removeEventListener("online", handleOnlineStatusChange);
//       window.removeEventListener("offline", handleOnlineStatusChange);
//     };
//   }, [isLoggedIn, authKey, dispatch]);

//   return (
//     <>
//       <AuthContext.Provider
//         value={{
//           isOnline,
//           isAuthenticated,
//           handleLogin,
//           handleLogout,
//           handleVerification,
//           setIsAuthenticated,
//           authKey,
//         }}
//       >
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// };

// export default AuthContext;




import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, logOut, OTPVerify } from "../action/Login";
import { loadUser } from "../action/Login";
import { enrollBiometric } from "../action/Biometric";
import BiometricService from "../service/BiometricService";
import { useDispatch } from "react-redux";
import { GetAccessHeadComponent } from "../action/Common";
import axios from "axios";
import { useSelector } from "react-redux";
import store from "../store";
import { toast } from "react-toastify";

const BiometricEnrollPrompt = ({ closeToast, onConfirm, onCancel }) => {
  return (
    <div style={{ fontFamily: "Roboto, sans-serif", padding: "4px" }}>
      <div style={{ fontWeight: 600, fontSize: "15px", color: "#0049AF", marginBottom: "6px" }}>
        Enable Biometric Login?
      </div>
      <div style={{ fontSize: "13px", color: "#555", marginBottom: "12px", lineHeight: "1.4" }}>
        Would you like to use Face ID or Fingerprint for faster access next time?
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button
          onClick={() => {
            onCancel();
            closeToast();
          }}
          style={{
            backgroundColor: "#F3F4F6",
            border: "1px solid #E5E7EB",
            borderRadius: "6px",
            color: "#374151",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
          }}
        >
          Maybe Later
        </button>
        <button
          onClick={() => {
            onConfirm();
            closeToast();
          }}
          style={{
            backgroundColor: "#0049AF",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0, 73, 175, 0.2)",
            outline: "none",
          }}
        >
          Yes, Enable
        </button>
      </div>
    </div>
  );
};

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // let authKey = "gkqyA1dPw/ZQ/z61Mvu2oFbQa4YTTTjA8pheytCNw0I="; // Hardcoded for testing
   let authKey = JSON.parse(localStorage.getItem("token"));
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (authKey) {
      axios.defaults.headers.common["auth-key"] = authKey;
      dispatch(loadUser()); 
      return authKey;
    }
    return false;
  });

  const handleLogin = async (serviceNo, password) => {
    try {
      // Store credentials temporarily for biometric enrollment after OTP
      sessionStorage.setItem("_bio_tmp_sn", serviceNo);
      sessionStorage.setItem("_bio_tmp_pw", password);
      await dispatch(login(serviceNo, password, navigate));
    } catch (error) {
      // console.error("Login failed:", error);
      sessionStorage.removeItem("_bio_tmp_sn");
      sessionStorage.removeItem("_bio_tmp_pw");
      toast.error("Login failed. Please try again.");
    }
  };

  const handleVerification = async (useData, token) => {
    dispatch(OTPVerify(useData, token, navigate));
  };

  const handleLogout = () => {
    logOut(navigate);
  };

  useEffect(() => {
    setIsAuthenticated(isLoggedIn);
    if (isLoggedIn) {
      axios.defaults.headers.common["auth-key"] = authKey;

      dispatch(GetAccessHeadComponent());

      // Check if biometric enrollment prompt is pending
      const checkBiometricEnrollment = async () => {
        try {
          const isAvailable = await BiometricService.isBiometricAvailable();
          const hasCredentials = BiometricService.hasEnrolledCredentials();

          if (isAvailable && !hasCredentials) {
            const serviceNo = sessionStorage.getItem("_bio_tmp_sn");
            const password = sessionStorage.getItem("_bio_tmp_pw");

            if (serviceNo && password) {
              setTimeout(() => {
                const currentSn = sessionStorage.getItem("_bio_tmp_sn");
                const currentPw = sessionStorage.getItem("_bio_tmp_pw");
                if (currentSn && currentPw) {
                  toast(
                    ({ closeToast }) => (
                      <BiometricEnrollPrompt
                        closeToast={closeToast}
                        onConfirm={() => {
                          dispatch(enrollBiometric(currentSn, currentPw));
                        }}
                        onCancel={() => {
                          // No actions needed
                        }}
                      />
                    ),
                    {
                      position: "top-center",
                      autoClose: false,
                      closeOnClick: false,
                      draggable: true,
                      draggablePercent: 60,
                      closeButton: false,
                    }
                  );
                  sessionStorage.removeItem("_bio_tmp_sn");
                  sessionStorage.removeItem("_bio_tmp_pw");
                }
              }, 1500);
            }
          } else {
            sessionStorage.removeItem("_bio_tmp_sn");
            sessionStorage.removeItem("_bio_tmp_pw");
          }
        } catch (error) {
          console.error("Biometric enrollment check failed:", error);
          sessionStorage.removeItem("_bio_tmp_sn");
          sessionStorage.removeItem("_bio_tmp_pw");
        }
      };

      checkBiometricEnrollment();
    }

    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        if (authKey) {
          store.dispatch(loadUser());
        }
      }
    };
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, [isLoggedIn, authKey, dispatch]);

  return (
    <>
      <AuthContext.Provider
        value={{
          isOnline,
          isAuthenticated,
          handleLogin,
          handleLogout,
          handleVerification,
          setIsAuthenticated,
          authKey,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
