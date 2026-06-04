import * as React from "react";
import { useState, useEffect } from "react";
import QrScanner from "react-qr-scanner";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
import { Grid, Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useDispatch } from "react-redux";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
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

export default function CustomizedDialogs({ isOpen, handleCloseFromMain }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = React.useState(isOpen);
  const [responseData, setResponseData] = React.useState({});
  const [scndopen, setScndOpen] = React.useState(false);
  const [activeCamera, setActiveCamera] = useState("environment");
  const [cameraOptions, setCameraOptions] = useState([]);
  const [qrCode, setQRCode] = useState("");
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: "environment", // Use the back camera
    autoFocus: true, // Enable auto-focus
  });
  let ButtonVisible = false;
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  let res = {};
  const dispatch = useDispatch();
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      getCameraOptions();
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(isOpen);
  };
  const handleClose = () => {
    dispatch({ type: "IS_CLOSE" });
    setOpen(false);
  };
  const switchToEnvironmentCamera = () => {
    setActiveCamera("environment");
  };
  const switchToUserCamera = () => {
    setActiveCamera("user");
  };
  const handleScan = async (data) => {
    if (data) {
      // Handle scanned QR code data
      setQRCode(data.text);
      // console.log(data.text);

      ////////////////////////////////////////////////////////////////
      const ewdNo = parseInt(data.text.trim());
      const serviceNumber = "3000452";
      // const serviceNumber = await localStorage.getItem("ServiceNo");
      axios
        .get(
          `https://esystems.cdl.lk/backend-test/BizTrack/EWODetails/GetEWODetails?EWONo=${ewdNo}`
        )
        .then((response) => {
          console.log(response);
          if (response.data.StatusCode === 200) {
            setResponseData(response.data.ResultSet);
            res = response.data.ResultSet;
            // console.log(response.data.ResultSet);
            let updateRes = null;

            const currentDate = new Date();
            const receivedDate = currentDate.toISOString();
            const requestBody = {
              ewo_no: ewdNo,
              recieved_by: serviceNumber,
              recieved_date: receivedDate,
              remarks: response.data.ResultSet.remarks,
            };
            if (!res) {
              alert("No data for this EWO Number. Please try again.");
            } else {
              //  console.log("iss " + res.issued_by);
              //  console.log("res " + res.recieved_by);
              /////1st condition ////////////////////
              if (res.issued_by != "") {
                //  console.log("call reecive API");
                axios
                  .post(
                    `https://esystems.cdl.lk/backend-test/BizTrack/EWODetails/RecieveEWODetails`,
                    requestBody
                  )
                  .then((response) => {
                    //    console.log("requestBODY", requestBody);
                    axios
                      .get(
                        `https://esystems.cdl.lk/backend-test/BizTrack/EWODetails/GetEWODetails?EWONo=${ewdNo}`
                      )
                      .then((response) => {
                        setResponseData(response.data.ResultSet);
                        //   console.log("upres " + res.serial_no);
                        ButtonVisible = true;
                        //  console.log(res);
                        alert("Button Visible true 1");
                        // navigation.navigate("details", {
                        //   apiResponse: responseData,
                        //   buttonStatus: ButtonVisible,
                        // });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              // console.log("serviceNumber " + serviceNumber);
              //// 2nd condition /////////
              if (res.recieved_by !== serviceNumber) {
                //  console.log("call 2nd API");
                if (res.issued_by === "") {
                  alert(
                    "Work order must be sent by " + res.recieved_by + " first"
                  );
                }
              }
              ///////3rd condition /////////////

              if (res.recieved_by === serviceNumber) {
                if (res.issued_by === null || res.issued_by === "") {
                  ButtonVisible = true;
                  console.log("Here");
                  setResponseData(res);
                  console.log(res.ewo_no);
                  handleScndClickOpen();
                  // alert("Button Visible true 2");
                  // navigation.navigate("details", {
                  //   apiResponse: responseData,
                  //   buttonStatus: ButtonVisible,
                  // });
                } else {
                  ButtonVisible = false;
                  //console.log("yyyyyyyyyyyyyyy");
                  console.log(res);
                  setResponseData(res);
                  alert("Button Visible false");
                  // navigation.navigate("details", {
                  //   apiResponse: responseData,
                  //   buttonStatus: ButtonVisible,
                  // });
                }
              }
            }
          } else {
            alert("Check the QR Again");
          }
        });
      //////////////////////////////////////////////////////////////
    }
  };

  const handleSaveChanges = async () => {
    // const serviceNumber = await AsyncStorage.getItem("ServiceNo");
    const serviceNumber = "3000452";
    const currentDate = new Date();
    const issueDate = currentDate.toISOString();

    const data = {
      ewo_no: responseData.ewo_no,
      issued_by: serviceNumber,
      issued_date: issueDate,
      serial_no: responseData.serial_no,
    };

    axios
      .post(
        `https://esystems.cdl.lk/backend-test/BizTrack/EWODetails/SendEWODetails`,
        data
      )
      .then((response) => {
        alert("Data saved successfully!");
        axios
          .get(
            `https://esystems.cdl.lk/backend-test/BizTrack/EWODetails/GetEWODetails?EWONo=${responseData.ewo_no}`
          )
          .then((res) => {
            setResponseData(res);
            console.log("Done");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  const switchCamera = (event) => {
    const selectedCamera = event.target.value;
    setVideoConstraints({
      facingMode: { exact: selectedCamera },
      autoFocus: true,
    });
  };
  const handleError = (error) => {
    console.error(error);
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

  const handleScndClickOpen = () => {
    setScndOpen(true);
  };

  const handleScndClose = () => {
    setScndOpen(false);
  };

  return (
    <div>
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isOpen}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Scan Your QR Code
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {/* <div>
              <select onChange={switchCamera}>{cameraOptions}</select>
            </div> */}
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

            {/* <button onClick={switchToEnvironmentCamera}>
              Switch to Environment Camera
            </button>
            <button onClick={switchToUserCamera}> Switch to User Camera</button> */}
            <p>{qrCode}</p>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                handleClose();
                handleScndClickOpen();
              }}
            >
              Scan Again
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <div>
        <BootstrapDialog
          onClose={handleScndClose}
          aria-labelledby="customized-dialog-title"
          open={scndopen}
          // TransitionComponent={Transition}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleScndClose}
          >
            Contact Details
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              //ref={descriptionElementRef}
              tabIndex={-1}
              //marginRight={10}
              marginLeft={-2}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                padding={1}
                //sx={{ minHeight: '100vh' }}
              >
                {/* <Grid item xs={3}> */}
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "100%" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <div style={{ textAlign: "center" }}>
                    <TextField
                      id="outlined-read-only-input"
                      label="EWO No:"
                      defaultValue={responseData.ewo_no}
                      InputProps={{
                        readOnly: true,
                      }}
                      // value={responseData.authorize_person}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Authorize Person"
                      defaultValue={responseData.authorize_person}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      //label="Status"
                      inputProps={{
                        style: { color: responseData.status_txtcolor },
                      }}
                      defaultValue={responseData.ewo_status}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{
                        backgroundColor: responseData.status_bckcolor,
                        borderRadius: 5,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Estimate Amount"
                      defaultValue={responseData.estimated_amount}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Billed Amount"
                      defaultValue={responseData.billed_amount}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Workdone Receive Amount"
                      // defaultValue={responseData.authorize_person}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Authorize By:"
                      defaultValue={responseData.authorize_by}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Evaluated By:"
                      defaultValue={responseData.evaluation_by}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Recieved By:"
                      defaultValue={responseData.recieved_by}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Issued By:"
                      defaultValue={responseData.issued_by}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Issued Date"
                      defaultValue={responseData.issued_date}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Serial No:"
                      defaultValue={responseData.serial_no}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="DocType"
                      defaultValue={responseData.doc_type}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-read-only-input"
                      label="Remarks"
                      defaultValue={responseData.remarks}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                </Box>
                {/* </Grid> */}
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              autoFocus
              onClick={() => {
                handleScndClose();
                handleSaveChanges();
              }}
            >
              Send Document
            </Button>

            <Button
              variant="contained"
              endIcon={<CloseIcon />}
              color="error"
              autoFocus
              onClick={() => {
                handleScndClose();
                // handleSaveChanges();
              }}
            >
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}
