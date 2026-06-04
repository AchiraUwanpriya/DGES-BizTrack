// import React, { useMemo } from "react";
// import { useSelector } from "react-redux";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import { Box, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import dayjs from "dayjs";
// import Loader from "../Utility/Loader";
// import NotFound from "../Utility/NotFound";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   "&.MuiTableCell-head": {
//     // backgroundColor: theme.palette.common.black,
//     backgroundColor: "#1976d2",
//     color: theme.palette.common.white,
//     fontSize: 12,
//     fontWeight: 600,
//     padding: "4px",
//     height: "30px",
//     lineHeight: "1",
//     borderRight: "1px solid #ddd",
//   },
//   "&.MuiTableCell-body": {
//     fontSize: 12,
//     color: "black",
//     padding: "2px 4px",
//     lineHeight: "1",
//     borderRight: "1px solid #ddd",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ bgcolor }) => ({
//   backgroundColor: bgcolor || "inherit",
//   "& td, & th": {
//     backgroundColor: "inherit",
//     textAlign: "center",
//     padding: "2px 4px",
//     height: "30px",
//     borderBottom: "1px solid #ddd",
//   },
// }));

// export default function AttendanceCard() {
//   const { responseBody, loading, msg } = useSelector(
//     (state) => state.attendanceCard
//   );

//   const mappedItems = useMemo(() => {
//     return (
//       <TableContainer
//         component={Paper}
//         sx={{ width: "100%", overflowX: "auto" }}
//       >
//         <Table
//           sx={{ tableLayout: "fixed", width: "100%" }}
//           aria-label="attendance table"
//         >
//           <TableHead>
//             <TableRow>
//               <StyledTableCell
//                 align="center"
//                 rowSpan={2}
//                 sx={{ width: "20%", borderRight: "1px solid #ddd" }}
//               >
//                 Day
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 colSpan={3}
//                 sx={{ borderRight: "1px solid #ddd" }}
//               >
//                 Attendance
//               </StyledTableCell>
//               <StyledTableCell align="center" colSpan={2}>
//                 Vehicle
//               </StyledTableCell>
//             </TableRow>
//             <TableRow>
//               <StyledTableCell
//                 align="center"
//                 sx={{ width: "15%", borderRight: "1px solid #ddd" }}
//               >
//                 IN
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 sx={{ width: "5%", borderRight: "1px solid #ddd" }}
//               >
//                 C
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 sx={{ width: "15%", borderRight: "1px solid #ddd" }}
//               >
//                 OUT
//               </StyledTableCell>
//               <StyledTableCell
//                 align="center"
//                 sx={{ width: "15%", borderRight: "1px solid #ddd" }}
//               >
//                 IN
//               </StyledTableCell>
//               <StyledTableCell align="center" sx={{ width: "15%" }}>
//                 OUT
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {responseBody.map((row, index) => (
//               <StyledTableRow key={index} bgcolor={row.BackgroundColor}>
//                 <StyledTableCell
//                   component="th"
//                   scope="row"
//                   align="center"
//                   sx={{ borderRight: "1px solid #ddd" }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       flexDirection: "column",
//                       justifyContent: "center",
//                       backgroundColor: "#B5E8FF",
//                       padding: "4px",
//                       borderRadius: 2,
//                       width: "100%",
//                       height: "30px",
//                     }}
//                   >
//                     <Typography
//                       fontSize={12}
//                       fontWeight={600}
//                       sx={{ color: "black", lineHeight: "1" }}
//                     >
//                       {new Date(row.Date).getDate()}
//                     </Typography>
//                     <Typography
//                       fontSize={9}
//                       fontWeight={600}
//                       sx={{ color: "black", lineHeight: "1" }}
//                     >
//                       {row.Day.toString().substring(0, 3)}
//                     </Typography>
//                   </Box>
//                 </StyledTableCell>

//                 {row.LeaveType !== "" ? (
//                   <StyledTableCell
//                     align="center"
//                     colSpan={5}
//                     sx={{
//                       fontWeight: "bold",
//                       fontSize: "14px",
//                       color: "black",
//                     }}
//                   >
//                     {row.LeaveReason}
//                   </StyledTableCell>
//                 ) : (
//                   <>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ borderRight: "1px solid #ddd" }}
//                     >
//                       {row.InTime
//                         ? dayjs(row.InTime, "hh:mm A").format("HH:mm")
//                         : ""}
//                     </StyledTableCell>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ borderRight: "1px solid #ddd" }}
//                     >
//                       {row.ContinuedStatus === "Y" ? (
//                         <Checkbox checked disabled />
//                       ) : (
//                         ""
//                       )}
//                     </StyledTableCell>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ borderRight: "1px solid #ddd" }}
//                     >
//                       {row.OutTime
//                         ? dayjs(row.OutTime, "hh:mm A").format("HH:mm")
//                         : ""}
//                     </StyledTableCell>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ borderRight: "1px solid #ddd" }}
//                     >
//                       {row.VIn && dayjs(row.VIn, ["hh:mm A", "HH:mm"]).isValid()
//                         ? dayjs(row.VIn, ["hh:mm A", "HH:mm"]).format("HH:mm")
//                         : ""}
//                     </StyledTableCell>
//                     <StyledTableCell
//                       align="center"
//                       sx={{ borderRight: "1px solid #ddd" }}
//                     >
//                       {row.VOut &&
//                       dayjs(row.VOut, ["hh:mm A", "HH:mm"]).isValid()
//                         ? dayjs(row.VOut, ["hh:mm A", "HH:mm"]).format("HH:mm")
//                         : ""}
//                     </StyledTableCell>
//                   </>
//                 )}
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }, [responseBody]);

//   return loading ? (
//     <Loader />
//   ) : (
//     <Box sx={{ width: "100%" }}>
//       {responseBody.length > 0 ? mappedItems : <NotFound text={msg} />}
//     </Box>
//   );
// }

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import Loader from "../Utility/Loader";
import NotFound from "../Utility/NotFound";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    fontSize: 12,
    fontWeight: 600,
    padding: "4px",
    height: "30px",
    lineHeight: "1",
    borderRight: "1px solid #ddd",
  },
  "&.MuiTableCell-body": {
    fontSize: 12,
    color: "black",
    padding: "2px 4px",
    lineHeight: "1",
    borderRight: "1px solid #ddd",
  },
}));

const StyledTableRow = styled(TableRow)(({ bgcolor }) => ({
  backgroundColor: bgcolor || "inherit",
  "& td, & th": {
    backgroundColor: "inherit",
    textAlign: "center",
    padding: "2px 4px",
    height: "30px",
    borderBottom: "1px solid #ddd",
  },
}));

export default function AttendanceCard() {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.attendanceCard
  );

  const mappedItems = useMemo(() => {
    return (
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        {/* Handle the Table column sizes */}
        <Table sx={{ width: "100%" }} aria-label="attendance table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                rowSpan={2}
                sx={{ width: "20%", borderRight: "1px solid #ddd" }}
              >
                Day
              </StyledTableCell>
              <StyledTableCell
                align="center"
                colSpan={3}
                sx={{ borderRight: "1px solid #ddd" }}
              >
                Attendance
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                Vehicle
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell
                align="center"
                sx={{ width: "15%", borderRight: "1px solid #ddd" }}
              >
                IN
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ width: "5%", borderRight: "1px solid #ddd" }}
              >
                C
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ width: "15%", borderRight: "1px solid #ddd" }}
              >
                OUT
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{ width: "15%", borderRight: "1px solid #ddd" }}
              >
                IN
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ width: "15%" }}>
                OUT
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {responseBody.map((row, index) => (
              <StyledTableRow key={index} bgcolor={row.BackgroundColor}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  sx={{ borderRight: "1px solid #ddd" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: "#B5E8FF",
                      padding: "4px",
                      borderRadius: 2,
                      width: "100%",
                      height: "30px",
                    }}
                  >
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      sx={{ color: "black", lineHeight: "1" }}
                    >
                      {new Date(row.Date).getDate()}
                    </Typography>
                    <Typography
                      fontSize={9}
                      fontWeight={600}
                      sx={{ color: "black", lineHeight: "1" }}
                    >
                      {row.Day.toString().substring(0, 3)}
                    </Typography>
                  </Box>
                </StyledTableCell>

                {row.LeaveType !== "" ? (
                  <StyledTableCell
                    align="center"
                    colSpan={5}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    {row.LeaveReason}
                  </StyledTableCell>
                ) : (
                  <>
                    <StyledTableCell
                      align="center"
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.InTime
                        ? dayjs(row.InTime, "hh:mm A").format("HH:mm")
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.ContinuedStatus === "Y" ? (
                        <Checkbox checked disabled />
                      ) : (
                        ""
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.OutTime
                        ? dayjs(row.OutTime, "hh:mm A").format("HH:mm")
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.VIn && dayjs(row.VIn, ["hh:mm A", "HH:mm"]).isValid()
                        ? dayjs(row.VIn, ["hh:mm A", "HH:mm"]).format("HH:mm")
                        : ""}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ borderRight: "1px solid #ddd" }}
                    >
                      {row.VOut &&
                      dayjs(row.VOut, ["hh:mm A", "HH:mm"]).isValid()
                        ? dayjs(row.VOut, ["hh:mm A", "HH:mm"]).format("HH:mm")
                        : ""}
                    </StyledTableCell>
                  </>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [responseBody]);

  return loading ? (
    <Loader />
  ) : (
    <Box sx={{ width: "100%" }}>
      {responseBody.length > 0 ? mappedItems : <NotFound text={msg} />}
    </Box>
  );
}
