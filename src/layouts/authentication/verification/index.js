import { useState, useEffect } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import imge from "../../../assets/images/NewBGImage.jpg";
import Textlogo from "../../../assets/images/Textlogo.png";
import LoadingButton from "@mui/lab/LoadingButton";
import OtpInput from "react-otp-input";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Verification = () => {
  const [userInptOTP, setuserInptOTP] = useState("");
  const { useData, loading, token, OTP } = useSelector((state) => state.auth);
  const { handleVerification } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    metaThemeColor.setAttribute("content", "#004AAD");
  }, []);

  // useEffect(() => {
  //   const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  //   metaThemeColor.setAttribute("content", "#004AAD");
  // }, []);
  // // Autofill OTP
  // useEffect(() => {
  //   if (OTP) {
  //     setuserInptOTP(OTP.toString());
  //   }
  // }, [OTP]);

  function handleClick() {
    
    if (OTP === userInptOTP) {
      handleVerification(useData, token, navigate);
    } else {
      toast.error("Invalid OTP. Please try again!");
    }
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        //height: 800,
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
          <Typography variant="h4" fontWeight={550} sx={{ my: 2 }}>
            Enter 5 digit verification code
          </Typography>
        </Box>
        <Box px={2} pb={3} textAlign="center">
          <Typography variant="h7" color="#646464" fontWeight={500}>
            Code send to your mobile realOTP. This code will expired in 01:30
          </Typography>
          <Box>
            <Box
              mb={1}
              mt={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OtpInput
                value={userInptOTP}
                onChange={setuserInptOTP}
                numInputs={5}
                renderSeparator={<span>&nbsp; &nbsp; </span>}
                renderInput={(props) => <input {...props} type="tel" />}
                separator={<span style={{ width: "8px" }}></span>}
                isInputNum={true}
                shouldAutoFocus={true}
                inputType="tel"
                inputStyle={{
                  border: "1px solid transparent",
                  borderRadius: "8px",
                  width: "20%",
                  height: "50px",
                  fontSize: "20px",
                  color: "#0f0f0",
                  fontWeight: "600",
                  caretColor: "#005A9C",
                  borderColor: "#005A9C",
                  maxWidth: 50,
                }}
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none",
                }}
              />
            </Box>
            <Box mt={4} mb={1}>
              {/* <Button color="info" fullWidth>
                Sign In
              </Button> */}
              <LoadingButton
                onClick={handleClick}
                // endIcon={<LoginIcon />}
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
                  Continue
                </span>
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Card>

      <Box
        sx={{
          my: 2,
          // backgroundColor: "red",
          display: "flex",
          flex: 0.5,
          alignItems: "flex-end",
        }}
      >
        <Typography>© 2023 BizTrack. All Rights Reserved.</Typography>
      </Box>
    </Container>
  );
};

export default Verification;
