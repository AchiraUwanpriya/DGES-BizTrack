import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid, Grow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeaderComponent() {
  const { loading, headComponent } = useSelector(
    (state) => state.headComponent
  );
  let navigate = useNavigate();

  const isComponentIdAvailable = (componentId) => {
    return headComponent.some((item) => item.ComponentId === componentId);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          // flexWrap: "wrap",
          flexDirection: "column",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{ marginLeft: 6 }}
        >
          Service
        </Typography>
        <Grid
          container
          rowSpacing={0.1}
        
        >
          {}

          {isComponentIdAvailable("EMOBCE0002") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0002")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0002")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/personal");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/approval.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%", marginBottom: "25px" }}
                      >
                        Personal
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}

         
          {isComponentIdAvailable("EMOBCI0003") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0003")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0003")
                ? { timeout: 2800 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Leave");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/exit.png")}
                        alt="First slide"
                        style={{ opacity: "70%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Leave
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          
          {isComponentIdAvailable("EMOBCI0011") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0011")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0011")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Telephone");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/telephonedirectory.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Telephone
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCE0001") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0001")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0001")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/Jobs");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/briefcase.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Job Allocation
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          
          {isComponentIdAvailable("EMOBCE0002") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCE0002")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCE0002")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/approvals");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/approval.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%", marginBottom: "25px" }}
                      >
                        Approvals
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0009") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0009")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0009")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/reservation");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/reservation.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        NEHB Reservation
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0009") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0009")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0009")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      // navigate("/reservation");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/booking.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        NWHB Reservation
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
          {isComponentIdAvailable("EMOBCI0012") ? (
            <Grow
              in={isComponentIdAvailable("EMOBCI0012")}
              style={{ transformOrigin: "0 0 0" }}
              {...(isComponentIdAvailable("EMOBCI0012")
                ? { timeout: 2500 }
                : {})}
            >
              <Grid
                item
                xs={4}
                sx={{
                  padding: 1,
                }}
              >
                <Card sx={{ padding: 2, boxShadow: 0, borderRadius: 2 }}>
                  <CardActionArea
                    onClick={() => {
                      navigate("/rfid-attendence");
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        className="d-block w-50"
                        src={require("../../assets/icons/user-check.png")}
                        alt="First slide"
                        style={{ opacity: "80%" }}
                      />
                      <Typography
                        align="center"
                        gutterBottom
                        fontSize={14}
                        fontWeight={600}
                        component="div"
                        style={{ opacity: "40%" }}
                      >
                        Remote Attendence
                      </Typography>
                    </div>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grow>
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </>
  );
}
