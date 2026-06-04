import React from "react";
import { useRef, useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import bgImage from "../../assets/images/custom/newBg2.jpg";
import bgImage2 from "../../assets/images/custom/newBg3.jpg";
import { green } from "@mui/material/colors";
import OtpInput from "react-otp-input";
import logo from "../../assets/images/logo2.png";
import PublishIcon from "@mui/icons-material/Publish";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
const Verification = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [activeCamera, setActiveCamera] = useState("environment");
  const qrScannerRef = useRef(null);
  const [cameraOptions, setCameraOptions] = useState([]);
  const [qrCode, setQRCode] = useState("");
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: "environment", 
    autoFocus: true,  
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      getCameraOptions();
    }
  }, []);

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const timer = useRef();
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        if (otp == user.OTP) {
          navigate("/");
        }

        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

  const handleScan = (data) => {
    if (data) {
      // Handle scanned QR code data
      setQRCode(data.text);
      console.log(data.text);
    }
  };

  const switchToEnvironmentCamera = () => {
    setActiveCamera("environment");
  };

  const switchToUserCamera = () => {
    setActiveCamera("user");
  };

  const handleError = (error) => {
    console.error(error);
  };

  const openImageDialog = () => {
    qrScannerRef.current.openImageDialog();
  };

  const switchCamera = (event) => {
    const selectedCamera = event.target.value;
    setVideoConstraints({
      facingMode: { exact: selectedCamera },
      autoFocus: true,
    });
  };

  const getCameraOptions = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    const rearCamera = videoDevices.find(
      (device) => device.label.includes("back") || device.label.includes("rear")
    );
    if (rearCamera) {
      setVideoConstraints({
        facingMode: { exact: rearCamera.deviceId },
        autoFocus: true,
      });
    }
  };

  const previewStyle = {
    width: "100%",
    height: "auto",
  };

  return (
    <>
      <Box
        position="absolute"
        width="100%"
        minHeight="100vh"
        display="flex"
        //justifyContent="center"
        // alignItems="center"
        padding={"3%"}
        backgroundImage={`url(${bgImage})`}
        sx={{
          overflowX: "hidden",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backgroundColor: "#005A9C",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 100,
              height: 100,
              borderRadius: 5,
            },
            marginTop: "10%",
          }}
        >
          <Paper elevation={24}>
            <IconButton
              style={{ width: 100, height: 100 }}
              onClick={handleClickOpen}
            >
              <QrCodeScannerIcon
                style={{ width: 80, height: 80 }}
              ></QrCodeScannerIcon>
            </IconButton>
          </Paper>
        </Box>

        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Modal title
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div>
              <select onChange={switchCamera}>{cameraOptions}</select>
            </div>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={previewStyle}
              constraints={{
                audio: false,
                video: { facingMode: activeCamera, autoFocus: true },
              }}
            />
            <button onClick={openImageDialog}>Upload QR Code Image</button>
            <button onClick={switchToEnvironmentCamera}>
              {" "}
              Switch to Environment Camera
            </button>
            <button onClick={switchToUserCamera}> Switch to User Camera</button>
            <p>{qrCode}</p>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>
    </>
  );
};

export default Verification;
