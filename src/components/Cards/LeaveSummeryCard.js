// import React, { useState } from "react";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Box, Grid } from "@mui/material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard({ dataList }) {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   const formatDate = (inputDate) => {
//     const options = { weekday: "short", day: "2-digit", month: "short" };
//     const date = new Date(inputDate);
//     return date.toLocaleDateString("en-US", options);
//   };

//   return (
//     <Card sx={{ margin: 1 }}>
//       <CardContent
//         sx={{
//           padding: 1,
//         }}
//       >
//         <Box sx={{}}>
//           <Grid container direction="row">
//             <Box sx={{ display: "flex", zIndex: 999, width: "100%" }}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   flex: 1,
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     width: "100%",
//                     paddingLeft: 8,
//                     paddingRight: 8,
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: 10,
//                         fontWeight: 400,
//                         fontFamily: "sans-serif",
//                         opacity: "60%",
//                       }}
//                     >
//                       {dataList.NoDays === "1"
//                         ? "Full Day Application"
//                         : "Half Day Application"}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         fontSize: 14,
//                         fontWeight: 600,
//                         fontFamily: "sans-serif",
//                       }}
//                     >
//                       {formatDate(dataList.Date)}
//                     </Typography>
//                   </div>

//                   <div
//                     style={{
//                       display: "flex",
//                       backgroundColor:
//                         dataList.ApprovedDate !== ""
//                           ? dataList.LeaveType === "CS"
//                             ? "#40E0D0"
//                             : dataList.LeaveType === "AL"
//                             ? "#9ACD32"
//                             : dataList.LeaveType === "SK"
//                             ? "#BDB76B"
//                             : "#fff"
//                           : "#FF8066",
//                       padding: 5,
//                       borderRadius: 5,
//                       width: "40%",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: 14,
//                         fontWeight: 400,
//                         fontFamily: "sans-serif",
//                         color: "#646464",
//                       }}
//                     >
//                       {dataList.ApprovedDate !== ""
//                         ? "Approved"
//                         : "Not Approved"}
//                     </Typography>
//                   </div>
//                 </div>
//               </Box>
//             </Box>
//           </Grid>
//         </Box>
//       </CardContent>
//       <CardActions
//         disableSpacing
//         sx={{ padding: 0 }}
//         onClick={handleExpandClick}
//       >
//         <Typography
//           sx={{
//             fontSize: 12,
//             fontWeight: 600,
//             marginLeft: 2,
//             fontFamily: "sans-serif",
//             color:
//               dataList.LeaveType === "CS"
//                 ? "#40E0D0"
//                 : dataList.LeaveType === "AL"
//                 ? "#9ACD32"
//                 : dataList.LeaveType === "SK"
//                 ? "#BDB76B"
//                 : "#fff",
//           }}
//         >
//           {dataList.LeaveType === "CS"
//             ? "Casual "
//             : dataList.LeaveType === "AL"
//             ? "Annual "
//             : dataList.LeaveType === "SK"
//             ? "Sick "
//             : dataList.LeaveType === "SP"
//             ? "SPECIAL LEAVE "
//             : "Other"}
//         </Typography>

//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto">
//         <CardContent sx={{ padding: 0, paddingBottom: 0 }}>
//           <Box
//             sx={{
//               padding: 0,
//             }}
//           >
//             <Grid
//               container
//               spacing={0}
//               sx={{
//                 padding: 2,
//                 paddingBottom: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Form No{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.LeaveFormNo}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Leave Type{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   :{" "}
//                   {dataList.LeaveType === "CS"
//                     ? "Casual Leave"
//                     : dataList.LeaveType === "AL"
//                     ? "Annual Leave"
//                     : dataList.LeaveType === "SK"
//                     ? "Sick Leave"
//                     : dataList.LeaveType === "SP"
//                     ? "Special Leave "
//                     : "Other"}
//                 </Typography>
//               </Grid>

//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Reason{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.Reason}
//                 </Typography>
//               </Grid>

//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   {" "}
//                   No of Days
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.NoDays}
//                 </Typography>
//               </Grid>

//               <Grid
//                 item
//                 xs={4}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   Approved Date{" "}
//                 </Typography>
//               </Grid>
//               <Grid
//                 item
//                 xs={8}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "center",
//                 }}
//               >
//                 <Typography
//                   paragraph
//                   sx={{
//                     fontWeight: 600,
//                     fontFamily: "sans-serif",
//                     color: "#646464",
//                   }}
//                 >
//                   : {dataList.ApprovedDate}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// }

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

export default function RecipeReviewCard({ dataList }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const formatDate = (inputDate) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card sx={{ margin: 1 }}>
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
                        fontSize: 10,
                        fontWeight: 400,
                        fontFamily: "sans-serif",
                        opacity: "60%",
                      }}
                    >
                      {dataList.NoDays === "1"
                        ? "Full Day Application"
                        : "Half Day Application"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "sans-serif",
                      }}
                    >
                      {formatDate(dataList.Date)}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      // backgroundColor:
                      //   dataList.ApprovedDate !== ""
                      //     ? dataList.LeaveType === "CS"
                      //       ? "#40E0D0"
                      //       : dataList.LeaveType === "AL"
                      //         ? "#9ACD32"
                      //         : dataList.LeaveType === "SK"
                      //           ? "#BDB76B"
                      //           : "#fff"
                      //     : "#FF8066",

                      padding: 5,
                      borderRadius: 5,
                      width: "40%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "sans-serif",
                        color:
                          dataList.ApprovedDate !== "" //Approved and Not Aprroved font color based on the Leave type
                            ? dataList.LeaveType === "CS"
                              ? "#40E0D0"
                              : dataList.LeaveType === "AL"
                              ? "#9ACD32"
                              : dataList.LeaveType === "SK"
                              ? "#BDB76B"
                              : "#fff"
                            : "#FF8066",
                      }}
                    >
                      {dataList.ApprovedDate !== ""
                        ? "Approved"
                        : "Not Approved"}
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
            color:
              dataList.LeaveType === "CS"
                ? "#40E0D0"
                : dataList.LeaveType === "AL"
                ? "#9ACD32"
                : dataList.LeaveType === "SK"
                ? "#BDB76B"
                : "#fff",
          }}
        >
          {dataList.LeaveType === "CS"
            ? "Casual "
            : dataList.LeaveType === "AL"
            ? "Annual "
            : dataList.LeaveType === "SK"
            ? "Sick "
            : dataList.LeaveType === "SP"
            ? "SPECIAL LEAVE "
            : "Other"}
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
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -2, //Reduce the gap between details+
                  }}
                >
                  Form No{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -2, //Reduce the gap between details
                  }}
                >
                  : {dataList.LeaveFormNo}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  Leave Type{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  :{" "}
                  {dataList.LeaveType === "CS"
                    ? "Casual Leave"
                    : dataList.LeaveType === "AL"
                    ? "Annual Leave"
                    : dataList.LeaveType === "SK"
                    ? "Sick Leave"
                    : dataList.LeaveType === "SP"
                    ? "Special Leave "
                    : "Other"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  Reason{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  : {dataList.Reason}
                </Typography>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  {" "}
                  No of Days
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  : {dataList.NoDays}
                </Typography>
              </Grid>

              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600, //Remove the bold of the details in dropdown
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  Approved Date{" "}
                </Typography>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Typography
                  paragraph
                  sx={{
                    // fontWeight: 600,
                    fontFamily: "sans-serif",
                    color: "#646464",
                    mt: -1, //Reduce the gap between details
                  }}
                >
                  : {dataList.ApprovedDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}
