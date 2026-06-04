import React, { useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Box, CardActionArea, Grid } from "@mui/material";
import { GetOutstandingToolsDetails } from "../../action/Outstanding_Tools";
import Loader from "../Utility/Loader";
import NotFound from "../Utility/NotFound";

export default function ToolsCard() {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.tools
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetOutstandingToolsDetails());
  }, [dispatch]);

  const mappedItems = useMemo(() => {
    return responseBody.map((item, index) => (
      <Grid
        item
        xs={12}
        sx={{
          padding: 1,
        }}
        key={index}
      >
        <Card sx={{ padding: 1, boxShadow: 3 }}>
          <CardActionArea>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  padding: 1,
                }}
              >
                <img
                  src={require("../../assets/icons/settings.png")}
                  alt="First slide"
                  style={{ borderRadius: "10px", height: 50 }}
                />
                {/* <Typography gutterBottom fontSize={8} component="div">
                  {item.MaterialCode}
                </Typography> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    paddingTop: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <Typography
                    gutterBottom
                    fontSize={12}
                    fontWeight={600}
                    component="div"
                  >
                    {item.MaterialCode} / {item.MaterialDescription}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Typography gutterBottom fontSize={12} component="div">
                       Qty : {item.IssuedQuantity}
                    </Typography>
                    &nbsp;
                    <Typography gutterBottom fontSize={12} component="div">
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Typography
                      gutterBottom
                      fontSize={15}
                      fontWeight={600}
                      component="div"
                    >
                      Price: {item.Value} Rs
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </Grid>
    ));
  }, [responseBody]);

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
          }}
        >
          <Grid container rowSpacing={0.1}>
            {responseBody.length > 0 ? mappedItems : <NotFound text={msg} />}
          </Grid>
        </Box>
      )}
    </>
  );
}
