import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function UmrModal({
  open,
  row,
  year,
  onClose,
  onStatusUpdate,
  onSave,
  appName,
}) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (open && row && year) {
      axios
        .get(`Approvals/GetUMRMATDetails?P_YEAR=${year}&P_REQUESTNO=${row.id}`)
        .then((response) => {
          if (response.data.StatusCode === 200) {
            setTableData(response.data.ResultSet);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [open, row, year]);

  // const handleSave = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to save the changes?",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Save it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const params = {
  //         P_STATUS: row.sts,
  //         P_REQUESTNO: row.id,
  //         P_IWONO: row.iwoNo,
  //       };

  //       axios
  //         .get("Approvals/SaveUMRDetails", { params })
  //         .then((response) => {
  //           if (response.data.StatusCode === 200) {
  //             Swal.fire({
  //               title: "Success!",
  //               text: "UMR status changed successfully!",
  //               icon: "success",
  //               confirmButtonColor: "#3085d6",
  //             });
  //             onSave();
  //           } else {
  //             Swal.fire({
  //               title: "Error!",
  //               text: "Failed to save data. Please try again.",
  //               icon: "error",
  //               confirmButtonColor: "#3085d6",
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error saving data: ", error);
  //           Swal.fire({
  //             title: "Error!",
  //             text: "An error occurred while saving data.",
  //             icon: "error",
  //             confirmButtonColor: "#3085d6",
  //           });
  //         });
  //     }
  //   });
  // };

  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!",
    }).then((result) => {
      const logid = localStorage.getItem("logId");
      if (result.isConfirmed) {
        const params = {
          P_STATUS: row.sts,
          P_REQUESTNO: row.id,
          P_IWONO: row.iwoNo,
          P_LOGID: logid,
        };

        axios.get("Approvals/SaveUMRDetails", { params })
          .then((response) => {
            if (response.data.StatusCode === 200) {
              Swal.fire({
                title: "Success!",
                text: "UMR status changed successfully!",
                icon: "success",
                confirmButtonColor: "#3085d6",
              }).then(() => {
                window.location.reload(); // Reload the page
              });
              onSave();
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to save data. Please try again.",
                icon: "error",
                confirmButtonColor: "#3085d6",
              });
            }
          })
          .catch((error) => {
            console.error("Error saving data: ", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while saving data.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          });
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 1,
        }}
      >
        {row && (
          <div>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2196F3" }}
              >
                {appName} Details
              </Typography>
              <IconButton onClick={onClose} sx={{ color: "gray" }}>
                <CloseIcon />
              </IconButton>
            </Box>

            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="UMR No"
                        value={row.id}
                        fullWidth
                        variant="filled"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Date"
                        variant="filled"
                        value={row.startDate}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="UMR IWO No"
                        value={row.iwoNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    {/* <Grid item xs={6}>
                      <TextField
                        label="UMR Status"
                        value={row.sts}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid> */}
                    <Grid item xs={6}>
                      <TextField
                        label="UMR Status"
                        value={
                          row.sts === "P1"
                            ? "Pending"
                            : row.sts === "P2"
                            ? "Confirmed"
                            : row.sts
                        }
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={15}>
                      <TextField
                        label="Job No"
                        value={`${row.jobNo || ""} / ${
                          row.specification || ""
                        } / ${row.extc || ""}`}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={15}>
                      <TextField
                        label="Prepared By"
                        value={`${row.serviceno || ""} - ${row.name || ""}`}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>

            <TableContainer
              component={Paper}
              sx={{ maxHeight: 200, mt: 2, overflowY: "auto" }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                      }}
                    >
                      Material Code
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                      }}
                    >
                      Req. No
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                      }}
                    >
                      UM
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                      }}
                    >
                      Req. QTY
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.length > 0 ? (
                    tableData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.MatCode}</TableCell>
                        <TableCell>{row.MatDescrip}</TableCell>
                        <TableCell>{row.ReqNo}</TableCell>
                        <TableCell>{row.Um}</TableCell>
                        <TableCell>{row.ReqQun}</TableCell>
                        <TableCell>{row.MatStatus}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default UmrModal;
