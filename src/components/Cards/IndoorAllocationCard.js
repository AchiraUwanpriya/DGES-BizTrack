import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { DonutLarge } from "@material-ui/icons";

export default function IndoorAllocationCard({ dataList }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <div style={{ marginTop: "1rem" }}>
      <Card sx={{ margin: 0, marginTop: 0 }}>
        <CardContent
          sx={{
            padding: 1,
          }}
        >
          <Box sx={{}}>
            <Grid container direction="row">
              <Box sx={{ display: "flex", zIndex: 999, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingLeft: 8,
                      paddingRight: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 750,
                          fontFamily: "sans-serif",
                          opacity: "120%",
                          color: "##2c3e50",

                        }}
                      >
                        Details Here
                      </Typography>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginBottom: -2,
                          marginTop: 0.5



                        }}
                      >
                        <Typography
                          paragraph
                          sx={{
                            fontWeight: 500,
                            fontFamily: "sans-serif",
                            color: "#646464",
                            fontSize: 13

                          }}
                        >
                          Reference No {" "} : {dataList.ReferenceNo}

                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginBottom: -6
                        }}
                      >
                        <Typography
                          paragraph
                          sx={{
                            fontWeight: 500,
                            fontFamily: "sans-serif",
                            color: "#646464",
                            fontSize: 13
                          }}
                        >
                          Insurance Amount {" "} : {dataList.InsuranceAmount}

                        </Typography>
                      </Grid>

                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          fontFamily: "sans-serif",
                        }}
                      >

                      </Typography>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        backgroundColor: "rgba(94, 198, 212, 0.942)",
                        padding: 5,
                        borderRadius: 5,
                        width: "35%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 400,
                          fontFamily: "sans-serif",
                          color: "#646464",
                        }}
                      >
                        Show
                      </Typography>
                    </div>
                  </div>
                </Box>
              </Box>
            </Grid>
          </Box>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{ padding: 0 }}
          onClick={handleExpandClick}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              marginLeft: 2,
              fontFamily: "sans-serif",
              color: "#40E0D0",
            }}
          >

          </Typography>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto">
          <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
            <Box
              sx={{
                padding: 0,
              }}
            >
              <Grid
                container
                spacing={0}
                sx={{
                  padding: 2,
                  paddingBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    Reference Date{" "}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.RefDate}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    Auth Date {" "}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.AuthDate}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    Admission Date {" "}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.AdmisionDate}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    Discharge Date {" "}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.DischargeDate}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    Reference No {" "}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.ReferenceNo}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    Insurance Amount {" "}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.InsuranceAmount}

                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    CDL Recovery Amount {" "}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    paragraph
                    sx={{
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      color: "#646464",
                    }}
                  >
                    : {dataList.CdlRecoveryAmount}

                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Collapse>

      </Card>

    </div>
  );
}



