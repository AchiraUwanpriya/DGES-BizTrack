import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";
import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import IndoorAllocationCard from "../../components/Cards/IndoorAllocationCard";
import Loader from "../../components/Utility/Loader";
import NotFound from "../../components/Utility/NotFound";
import "./indoorAllocations.css";
import Swal from "sweetalert2";

function IndoorAllocations({ allocationName }) {
  const {
    responseBody: allocationData,
    msg,
    loading,
  } = useSelector((state) => state.userMedicalDetails);
  const {
    responseBody: IndoorCardData,
    msg: IndoorCardMsg,
    loading: IndoorCardLoading,
  } = useSelector((state) => state.medicalIndoorUsageDetails);

  const {
    responseBody: OutdoorCardData,
    msg: OutdoorCardMsg,
    loading: OutdoorCardLoading,
  } = useSelector((state) => state.medicalOutdoorUsageDetails);

  useEffect(() => {
    if (
      !IndoorCardLoading &&
      allocationName === "Indoor" &&
      IndoorCardData.length === 0
    ) {
      // Swal.fire({
      //   icon: "info",
      //   title: "INDOOR Allocation not available",
      //   text: "No INDOOR Allocation  for selected Year",
      // });
    } else if (
      !OutdoorCardLoading &&
      allocationName === "Outdoor" &&
      OutdoorCardData.length === 0
    )
     {
      // Swal.fire({
      //   icon: "info",
      //   title: "OUTDOOR Allocation not available",
      //   text: "No OUTDOOR Allocation  for selected Year",
      // });
    }
  }, [
    IndoorCardLoading,
    OutdoorCardLoading,
    IndoorCardData,
    OutdoorCardData,
    allocationName,
  ]);

  const mappedItems = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          marginBottom: "10%",
          //backgroundColor:'red'
        }}
      >
        {allocationName === "Indoor"
          ? IndoorCardData.map((item, index) => (
              <IndoorAllocationCard
                key={index}
                dataList={item}
              ></IndoorAllocationCard>
            ))
          : OutdoorCardData.map((item, index) => (
              <IndoorAllocationCard
                key={index}
                dataList={item}
              ></IndoorAllocationCard>
            ))}
      </div>
    );
  }, [IndoorCardData, OutdoorCardData, allocationName]);
  const allocationValues =
    allocationName === "Indoor"
      ? {
          Allocation: allocationData.IndoorAllocation,
          Usage: allocationData.IndoorUsage,
          Balance: allocationData.IndoorBalance,
        }
      : {
          Allocation: allocationData.OutdoorAllocation,
          Usage: allocationData.OutdoorUsage,
          Balance: allocationData.OutdoorBalance,
        };

  const formatNumber = (value) => {
    const num = Number(value);
    return isNaN(num) ? "N/A" : num.toLocaleString();
  };

  return (
    <div class="box-container">
      <TableContainer component={Paper}>
        <Table aria-label="allocation table">
          {/* <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white",fontSize: "12px",fontWeight: "bold" }}>
                All Allocation
              </TableCell>
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white",fontSize: "12px",fontWeight: "bold" }}>
                Allocation Usage
              </TableCell>
              <TableCell sx={{ backgroundColor: "#1976D2", color: "white",fontSize: "12px",fontWeight: "bold" }}>
                Allocation Balance
              </TableCell>
            </TableRow>
          </TableHead> */}

          <TableHead>
  <TableRow>
    <TableCell
      sx={{
        backgroundColor: "#1976D2",
        color: "white",
        fontSize: "11px",       
        fontWeight: 600,
        padding: "6px 8px",    
        lineHeight: 1.2,
      }}
    >
      All Allocation
    </TableCell>

    <TableCell
      sx={{
        backgroundColor: "#1976D2",
        color: "white",
        fontSize: "11px",
        fontWeight: 600,
        padding: "6px 8px",
        lineHeight: 1.2,
      }}
    >
      Allocation Usage
    </TableCell>

    <TableCell
      sx={{
        backgroundColor: "#1976D2",
        color: "white",
        fontSize: "11px",
        fontWeight: 600,
        padding: "6px 8px",
        lineHeight: 1.2,
      }}
    >
      Allocation Balance
    </TableCell>
  </TableRow>
</TableHead>

          <TableBody>
            <TableRow>
              <TableCell sx={{fontSize: "12px",}}>{formatNumber(allocationValues.Allocation)}</TableCell>
              <TableCell sx={{fontSize: "12px",}}>{formatNumber(allocationValues.Usage)}</TableCell>
              <TableCell sx={{fontSize: "12px",}}>{formatNumber(allocationValues.Balance)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="history">Allocations History</div>

      {allocationName === "Indoor" ? (
        <div>
          {IndoorCardLoading ? (
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
              {/* <Grid container rowSpacing={0.1}>
                {IndoorCardData.length > 0 ? (
                  mappedItems
                ) : (
                  <NotFound text={msg} />
                )}
              </Grid> */}

              <Grid container rowSpacing={0.1}>
  {IndoorCardData.length > 0 ? (
    mappedItems
  ) : (
    <Grid item xs={12}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 4,
          fontStyle: "italic",
        }}
      >
        Indoor Allocation History not available
      </Typography>
    </Grid>
  )}
</Grid>

            </Box>
          )}
        </div>
      ) : (
        <div>
          {OutdoorCardLoading ? (
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
              {/* <Grid container rowSpacing={0.1}>
                {OutdoorCardData.length > 0 ? (
                  mappedItems
                ) : (
                  <NotFound text={msg} />
                )}
              </Grid> */}
              <Grid container rowSpacing={0.1}>
  {IndoorCardData.length > 0 ? (
    mappedItems
  ) : (
    <Grid item xs={12}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          width: "100%",
          textAlign: "center",
          mt: 4,
          fontStyle: "italic",
        }}
      >
        Outdoor Allocation History not available
      </Typography>
    </Grid>
  )}
</Grid>

            </Box>
          )}
        </div>
      )}
    </div>
  );
}

export default IndoorAllocations;
