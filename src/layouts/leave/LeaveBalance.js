import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import CircularProgressWithLabel from "../../components/Prograss";

import { useSelector } from "react-redux";
import Loader from "../../components/Utility/Loader";
import NotFound from "../../components/Utility/NotFound";

function FacebookCircularProgress({ total_Leave, total_Leave_Pcn }) {
  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column" } },
    React.createElement(
      Box,
      {
        sx: {
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      React.createElement(CircularProgress, {
        variant: "determinate",
        sx: {
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        },
        size: 250,
        thickness: 4,
        // ...props,
        value: 100,
      }),
      React.createElement(CircularProgress, {
        //variant: "indeterminate",
        variant: "determinate",
        value: total_Leave_Pcn,
        disableShrink: true,
        sx: {
          color: (theme) =>
            theme.palette.mode === "light" ? "#FAD7A0" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
        },
        size: 250,
        thickness: 4,
        // ...props,
      }),
      React.createElement(
        Box,
        {
          sx: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          },
        },
        React.createElement(Typography, {
          variant: "caption",
          component: "div",
          color: "text.secondary",
          fontSize: 25,
          fontWeight: 600,
          // children: `${total_Leave}/42`,
          children: `${total_Leave}`,
        }),
        React.createElement(Typography, {
          variant: "caption",
          component: "div",
          color: "text.secondary",
          fontSize: 14,
          fontWeight: 600,
          children: "Leave Balance",
        })
      )
    )
  );
}

export default function LeaveBalance() {
  const { responseBody, total_Leave, total_Leave_Pcn, msg, loading } =
    useSelector((state) => state.leaveBalance);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            overflow: "auto",
            justifyContent: "center",

            // backgroundColor:'blue'
          }}
        >
          <Card>
            <CardContent>
              <Grid container rowSpacing={0.1}>
                {msg === null ? (
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      //  marginBottom:5
                    }}
                  >
                    <FacebookCircularProgress
                      total_Leave={total_Leave}
                      total_Leave_Pcn={total_Leave_Pcn}
                    />

                    <Grid
                      marginTop={"10%"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      gap={3}
                    >
                      <Grid
                        item
                        xs={4}
                        sx={{
                          padding: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgressWithLabel
                            value={
                              responseBody === null
                                ? 0
                                : (100 / 14) * responseBody[0].Taken
                            }
                            size={80}
                            bgcolor={"#9ACD32"}
                          >
                            {responseBody[0].Taken}
                          </CircularProgressWithLabel>
                          <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                            fontSize={12}
                            fontWeight={400}
                          >
                            Annual Leaves Taken
                          </Typography>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          padding: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgressWithLabel
                            value={
                              responseBody === null
                                ? 0
                                : (100 / 7) * responseBody[1].Taken
                            }
                            size={80}
                            bgcolor={"#40E0D0"}
                          >
                            {responseBody[1].Taken}
                          </CircularProgressWithLabel>
                          <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                            fontSize={12}
                            fontWeight={400}
                          >
                            Casual Leaves Taken
                          </Typography>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          padding: 1,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgressWithLabel
                            value={
                              responseBody === null
                                ? 0
                                : (100 / 21) * responseBody[2].Taken
                            }
                            size={80}
                            bgcolor={"#BDB76B"}
                          >
                            {responseBody[2].Taken}
                          </CircularProgressWithLabel>
                          <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                            fontSize={12}
                            fontWeight={400}
                          >
                            Sick Leaves Taken
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <NotFound text={msg} />
                )}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}
