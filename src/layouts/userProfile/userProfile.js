import React, { useState, useEffect } from "react";
import "./userProfile.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BiometricService from "../../service/BiometricService";
import { removeBiometric } from "../../action/Biometric";
import { toast } from "react-toastify";

const BiometricDisablePrompt = ({ closeToast, onConfirm }) => {
  return (
    <div style={{ fontFamily: "Roboto, sans-serif", padding: "4px" }}>
      <div style={{ fontWeight: 600, fontSize: "15px", color: "#EF4444", marginBottom: "6px" }}>
        Disable Biometric Login?
      </div>
      <div style={{ fontSize: "13px", color: "#555", marginBottom: "12px", lineHeight: "1.4" }}>
        Are you sure you want to disable biometric login for this device? You will have to sign in manually next time.
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button
          onClick={closeToast}
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
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            closeToast();
          }}
          style={{
            backgroundColor: "#EF4444",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)",
            outline: "none",
          }}
        >
          Yes, Disable
        </button>
      </div>
    </div>
  );
};

function UserProfile() {
  const { data } = useSelector((state) => state.userbyServiceNo);
  const [hasImage, setHasImage] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const authKey = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const img = new Image();
      img.onload = function () {
        setHasImage(true);
      };
      img.onerror = function () {
        setHasImage(false);
      };
      if (data && data[0] && data[0].ServiceNo) {
        img.src = `${axios.defaults.baseURL}Home/DGESGetUserImg?serviceNo=${
          data[0].ServiceNo
        }&authKey=${authKey.replace("+", "%2B")}`.replace(/"/g, "");
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }, [authKey, data]);

  useEffect(() => {
    const checkBiometric = async () => {
      const available = await BiometricService.isBiometricAvailable();
      setBiometricSupported(available);
      setBiometricEnabled(BiometricService.hasEnrolledCredentials());
    };
    checkBiometric();
  }, []);

  return (
    <div className="full-container">
      <div className="upper-part">
        <div className="profile">Profile</div>
      </div>
      <div className="divider-box">
        <div className="img-box">
          <img
            src={
              hasImage
                ? `${axios.defaults.baseURL}Home/DGESGetUserImg?serviceNo=${data[0].ServiceNo}`.replace(
                    /"/g,
                    ""
                  )
                : require("../../assets/images/man.png")
            }
            className="hash"
            alt="User profile"
          />
        </div>
        <div className="us">{data[0].ReportName}</div>
      </div>

      <div className="eight-boxes">
        <div className="b">
          <h2>Designation</h2>
          <p>{data[0].Designation}</p>
        </div>
        <div className="b">
          <h2>Service Number</h2>
          <p>{data[0].ServiceNo}</p>
        </div>
        <div className="row-container">
          <div className="b mobile-card">
            <h2>Mobile Number</h2>
            <p>{data[0].MobileNo}</p>
          </div>
          <div className="b email-card">
            <h2>Email</h2>
            <p>{data[0].Email}</p>
          </div>
        </div>
        <div className="b">
          <h2>Division</h2>
          <p>{data[0].Division}</p>
        </div>
        <div className="b">
          <h2>Department</h2>
          <p>{data[0].Department}</p>
        </div>
        <div className="b">
          <h2>Physical Location</h2>
          <p>{data[0].Location}</p>
        </div>
        <div className="row-container">
          <div className="b recruitment-card">
            <h2>Recruitment Date</h2>
            <p>{data[0].RecruitmentDate}</p>
          </div>
          {/* <div className="b permanent-card">
            <h2>Permanent Date</h2>
            <p>{data[0].PermanantDate}</p>
          </div> */}
          <div className="b permanent-card">
          <h2>Leaving Date</h2>
          <p>{data[0].LeavingDate}</p>
        </div>
        </div>
        
        {/* <div className="b-1">
          <h2 className="report-officer-title">Report Officer</h2>
          <div className="reporting-officer-container">
            <div className="reporting-officer-name">
              <p>{data[0].ReportingOfficerDetails.ReportName}</p>
            </div>
            <div className="reporting-officer-img">
              <img
                src={
                  hasImage
                    ? `${axios.defaults.baseURL}Home/DGESGetUserImg?serviceNo=${
                        data[0].ReportingOfficerDetails.ServiceNo
                      }&authKey=${authKey.replace("+", "%2B")}`.replace(
                        /"/g,
                        ""
                      )
                    : require("../../assets/images/man.png")
                }
                alt="Reporting Officer"
                className="reporting-officer-img"
              />
            </div>
          </div>
          <h2>Service No</h2>
          <p>{data[0].ReportingOfficerDetails.ServiceNo}</p>
          <h2>Designation</h2>
          <p>{data[0].ReportingOfficerDetails.Designation}</p>
        </div> */}

        {biometricSupported && (
          <div className="b" style={{ cursor: "pointer" }} onClick={() => {
            if (biometricEnabled) {
              toast(
                ({ closeToast }) => (
                  <BiometricDisablePrompt
                    closeToast={closeToast}
                    onConfirm={() => {
                      dispatch(removeBiometric());
                      setBiometricEnabled(false);
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
            } else {
              toast.info("To enable biometric login, please log out and sign in again. You will be prompted to enable it after OTP verification.");
            }
          }}>
            <h2>Biometric Login</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ margin: 0 }}>{biometricEnabled ? "Enabled" : "Disabled"}</p>
              <div style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                backgroundColor: biometricEnabled ? "#0049AF" : "#ccc",
                position: "relative",
                transition: "background-color 0.3s",
                flexShrink: 0,
              }}>
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 2,
                  left: biometricEnabled ? 22 : 2,
                  transition: "left 0.3s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
