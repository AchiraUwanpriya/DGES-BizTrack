import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import welcomeScript from "./welcomeNew.js";

const Welcome = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = welcomeScript;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: "#F8F9FA",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <img
            width={"60%"}
            src={require("../../assets/images/BT.png")}
            alt="First slide"
            style={{ backgroundColor: "white" }}
          />
        </div>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginBottom: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <img
            width={"50%"}
            src={require("../../assets/icons/a.png")}
            alt="First slide"
          />
        </div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "10%",
          }}
        >
          <Typography
            variant="h7"
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
        </Box>
      </Box>
    </Container>
  );
};

export default Welcome;
