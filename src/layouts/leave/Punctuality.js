// import React, { useMemo } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useSelector } from "react-redux";
// import { Box, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Loader from "../../components/Utility/Loader";
// import NotFound from "../../components/Utility/NotFound"; 

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#1976d2",
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme, bgColor }) => ({
//   backgroundColor: bgColor !== "" ? bgColor : theme.palette.action.hover,

//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function Punctuality() {
//   const { responseBody, loading, msg } = useSelector(
//     (state) => state.punctuality
//   );

//   const mappedItems = useMemo(() => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     return (
//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           marginBottom: "10%",
//         }}
//       >
//         <TableContainer component={Paper}>
//           <Table sx={{}} aria-label="simple table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="center">Month</StyledTableCell>
//                 <StyledTableCell align="center"> Type</StyledTableCell>
//                 <StyledTableCell align="center"> Description</StyledTableCell>
//                 <StyledTableCell align="center">Cnt</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {responseBody.map((row, index) => (
//                 <StyledTableRow
//                   key={index}
//                   //isWeekEnd={row.day.toString().substring(0, 3)}
//                   bgColor={row.background_color}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell
//                     component="th"
//                     scope="row"
//                     sx={{
//                       padding: 1,
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         backgroundColor: "#B5E8FF",
//                         padding: 1,
//                         borderRadius: 8,
//                       }}
//                     >
//                       <Typography fontSize={12} fontWeight={400} p={1}>
//                         {months[new Date(row.Month).getMonth()]}
//                       </Typography>
//                     </div>
//                   </TableCell>
//                   <TableCell align="center">
//                     {" "}
//                     <Typography fontSize={14} fontWeight={400} p={1}>
//                       {row.RuleType}
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="center">
//                     {" "}
//                     <Typography fontSize={10} fontWeight={400} p={1}>
//                       {row.RuleDescription}
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Typography fontSize={14} fontWeight={400} p={1}>
//                       {row.Cnt}
//                     </Typography>
//                   </TableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   }, [responseBody]);

//   return (
//     <>
//       {loading ? (
//         <Loader></Loader>
//       ) : (
//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             width: "100%",
//             overflow: "auto",
//           }}
//         >
//           <Grid container rowSpacing={0.1}>
//             {responseBody.length > 0 ? mappedItems : <NotFound text={msg} />}
//           </Grid>
//         </Box>
//       )}
//     </>
//   );
// }








import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Loader from "../../components/Utility/Loader";

/* =======================
   Styled Components
======================= */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, bgColor }) => ({
  backgroundColor: bgColor || theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/* =======================
   Component
======================= */

export default function Punctuality() {
  const { responseBody, loading } = useSelector(
    (state) => state.punctuality
  );

  const mappedItems = useMemo(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <TableContainer component={Paper}>
        <Table aria-label="punctuality table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Month</StyledTableCell>
              <StyledTableCell align="center">Type</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Cnt</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {responseBody.map((row, index) => (
              <StyledTableRow
                key={index}
                bgColor={row.background_color}
              >
                <TableCell align="center" sx={{ p: 1 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B5E8FF",
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                    }}
                  >
                    <Typography fontSize={12}>
                      {months[new Date(row.Month).getMonth()]}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell align="center">
                  <Typography fontSize={14}>
                    {row.RuleType}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography fontSize={12}>
                    {row.RuleDescription}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography fontSize={14}>
                    {row.Cnt}
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }, [responseBody]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
          }}
        >
          <Grid container>
            {responseBody.length > 0 ? (
              <Grid item xs={12}>
                {mappedItems}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      px: 6,
                      py: 5,
                      textAlign: "center",
                      borderRadius: 3,
                      border: "1px dashed #d0d7e2",
                      backgroundColor: "#fafbff",
                      maxWidth: 420,
                    }}
                  >
                    <EventBusyIcon
                      sx={{
                        fontSize: 48,
                        color: "primary.main",
                        mb: 1,
                      }}
                    />

                    <Typography font={14} fontWeight={600}>
                      Punctuality summary not available
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      There is no punctuality data available at the moment.
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </>
  );
}
