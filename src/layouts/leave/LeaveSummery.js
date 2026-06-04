// import React, { useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Box, Grid } from "@mui/material";
// import LeaveSummeryCard from "../../components/Cards/LeaveSummeryCard";
// import Loader from "../../components/Utility/Loader";
// import NotFound from "../../components/Utility/NotFound";

// export default function LeaveSummery({ selectedYear }) {
//   const { responseBody, loading, msg } = useSelector(
//     (state) => state.leaveSummery
//   );

//   const mappedItems = useMemo(() => {
//     return (
//       <div
//         style={{
//           display: "flex",
//           width: "100%",
//           flexDirection: "column",
//           marginBottom: "10%",
//           //backgroundColor:'red'
//         }}
//       >
//         {responseBody.map((item, index) => (
//           <LeaveSummeryCard key={index} dataList={item}></LeaveSummeryCard>
//         ))}
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
import { Box, Grid, Typography,Paper } from "@mui/material";
import LeaveSummeryCard from "../../components/Cards/LeaveSummeryCard";
import Loader from "../../components/Utility/Loader";
import EventBusyIcon from "@mui/icons-material/EventBusy";


export default function LeaveSummery({ selectedYear }) {
  const { responseBody, loading, msg } = useSelector(
    (state) => state.leaveSummery
  );

  const mappedItems = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          marginBottom: "10%",
        }}
      >
        {responseBody.map((item, index) => (
          <LeaveSummeryCard key={index} dataList={item} />
        ))}
      </div>
    );
  }, [responseBody]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            overflow: "auto",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Grid container rowSpacing={0.1}>
            {responseBody.length > 0 ? (
  mappedItems
) : (
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
          Leave summary not available
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          There is no leave data available for the selected year.
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
