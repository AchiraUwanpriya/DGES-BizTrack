// import React, { useMemo } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useSelector } from "react-redux";
// import { Box, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Loader from "../../components/Utility/Loader";
// import NotFound from "../../components/Utility/NotFound";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 12,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme, isHighlighted }) => ({
//   backgroundColor: isHighlighted ? "lightblue" : theme.palette.action.hover,
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function LeaveSummery({ selectedYear }) {
//   const { responseBody, loading, msg } = useSelector(
//     (state) => state.notEnteredLeave
//   );

//   const groupedData = responseBody.reduce((acc, record) => {
//     const date = new Date(record.Date);
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     if (year === selectedYear) {
//       if (!acc[month]) {
//         acc[month] = [];
//       }
//       acc[month].push(record);
//     }
//     return acc;
//   }, {});

//   const formatTime = (time) => {
//     const [hour, minute] = time.split(":");
//     const suffix = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minute} ${suffix}`;
//   };

//   const mappedItems = useMemo(() => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           // backgroundColor:'red'
//           //marginBottom:20,
//         }}
//       >
//         <TableContainer component={Paper}>
//           <Table>
//             <TableBody>
//               {Object.entries(groupedData).map(([month, records]) => (
//                 <React.Fragment key={month}>
//                   <StyledTableRow isHighlighted={true}>
//                     <StyledTableCell colSpan={3}>
//                       <Typography
//                         // variant="h6"
//                         align="center"
//                         sx={{ fontWeight: "bold" }}
//                       >
//                         {new Date(selectedYear, month).toLocaleString(
//                           "default",
//                           {
//                             month: "long",
//                           }
//                         )}
//                       </Typography>
//                     </StyledTableCell>
//                   </StyledTableRow>
//                   {records.map((record, index) => (
//                     <TableRow key={index}>
//                       <StyledTableCell>
//                         <Typography variant="body1" align="center">
//                           {/* {new Date(record.date).toLocaleDateString()} */}
//                           {record.Date}
//                         </Typography>
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {record.ClockIn === "" ? (
//                           <Typography variant="body1" align="center">
//                             Not set
//                           </Typography>
//                         ) : (
//                           <Typography variant="body1" align="center">
//                             In: {formatTime(record.ClockIn)}
//                           </Typography>
//                         )}
//                       </StyledTableCell>
//                       <StyledTableCell>
//                         {record.ClockOut === "" ? (
//                           <Typography variant="body1" align="center">
//                             Not set
//                           </Typography>
//                         ) : (
//                           <Typography variant="body1" align="center">
//                             Out: {formatTime(record.ClockOut)}
//                           </Typography>
//                         )}
//                       </StyledTableCell>
//                     </TableRow>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   }, [groupedData, selectedYear]);

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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Loader from "../../components/Utility/Loader";
import EventBusyIcon from "@mui/icons-material/EventBusy";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, isHighlighted }) => ({
  backgroundColor: isHighlighted ? "lightblue" : theme.palette.action.hover,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LeaveSummery({ selectedYear }) {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.notEnteredLeave
  );

  // Group data by month
  const groupedData = responseBody.reduce((acc, record) => {
    const date = new Date(record.Date);
    const year = date.getFullYear();
    const month = date.getMonth();
    if (year === selectedYear) {
      if (!acc[month]) acc[month] = [];
      acc[month].push(record);
    }
    return acc;
  }, {});

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${suffix}`;
  };

  const mappedItems = useMemo(() => {
    return (
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
  {Object.entries(groupedData).map(([month, records]) => (
    <React.Fragment key={month}>
      {/* Month Header */}
      <StyledTableRow isHighlighted>
        <StyledTableCell colSpan={3} sx={{ backgroundColor: "#1976d2" }}>
          <Typography
            align="center"
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#e2e4eb",
            }}
          >
            {new Date(selectedYear, month).toLocaleString("default", {
              month: "long",
            })}
          </Typography>
        </StyledTableCell>
      </StyledTableRow>

      {/* Column Headers for better clarity */}
      <StyledTableRow sx={{ backgroundColor: "#ccc6c6" }}>
        <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>Date</StyledTableCell>
        <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>Clock In</StyledTableCell>
        <StyledTableCell align="center" sx={{ fontWeight: "bold" }}>Clock Out</StyledTableCell>
      </StyledTableRow>

      {/* Attendance Records */}
      {records.map((record, index) => (
        <TableRow key={index} sx={{ "&:hover": { backgroundColor: "#f5faff" } }}>
          <StyledTableCell align="center">
            <Typography variant="body2">{record.Date}</Typography>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Typography variant="body2" color={record.ClockIn ? "text.primary" : "text.secondary"}>
              {record.ClockIn ? `In: ${formatTime(record.ClockIn)}` : "Not set"}
            </Typography>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Typography variant="body2" color={record.ClockOut ? "text.primary" : "text.secondary"}>
              {record.ClockOut ? `Out: ${formatTime(record.ClockOut)}` : "Not set"}
            </Typography>
          </StyledTableCell>
        </TableRow>
      ))}
    </React.Fragment>
  ))}
</TableBody>

          </Table>
        </TableContainer>
      </div>
    );
  }, [groupedData, selectedYear]);

 
  const EmptyState = () => (
    <Grid item xs={12}>
      <Box
        sx={{
          width: "100%",
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
            sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
          />
          <Typography font={14} fontWeight={600}>
            Not Entered Leave summary not available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            There is no Leave summary data available for the selected year.
          </Typography>
        </Paper>
      </Box>
    </Grid>
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", overflow: "auto" }}>
          <Grid container rowSpacing={0.1}>
            {responseBody.length > 0 ? mappedItems : <EmptyState />}
          </Grid>
        </Box>
      )}
    </>
  );
}
