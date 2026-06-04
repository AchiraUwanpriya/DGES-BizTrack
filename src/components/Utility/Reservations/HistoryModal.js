import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useDispatch, useSelector } from "react-redux";
import { GetResDetailsHistory } from "../../../action/Reservation";
import axios from "axios";
import Swal from "sweetalert2";
import FeedbackModal from "./FeedbackModal";

const HistoryModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { responseBody, loading, msg, error } = useSelector(
    (state) => state.resDetailsHistory
  );

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [cancelRemarks, setCancelRemarks] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [remarksError, setRemarksError] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackReservation, setFeedbackReservation] = useState(null);

  const resultSet = responseBody?.ResultSet || [];

  useEffect(() => {
    if (open) {
      dispatch(GetResDetailsHistory());
    }
  }, [dispatch, open]);

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setCancelRemarks("");
    setRemarksError(false);
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
    setSelectedReservation(null);
    setRemarksError(false);
  };

  const handleFeedbackClick = (reservation) => {
    setFeedbackReservation(reservation);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setFeedbackModalOpen(false);
    setFeedbackReservation(null);
  };

  const handleCancellation = async () => {
    if (!selectedReservation) return;

    if (!cancelRemarks.trim()) {
      setRemarksError(true);
      return;
    }

    setCancelLoading(true);
    const today = new Date();
    const cancelDate = today.toISOString().split("T")[0];

    try {
      const response = await axios.get(`Reservation/CancelBooking`, {
        params: {
          P_RESNO: selectedReservation.Res_no,
          P_STATUS: "C",
          P_CANCELLED_DATE: cancelDate,
          P_REMARKS: cancelRemarks,
        },
      });

      if (response.data && response.data.StatusCode === 200) {
        Swal.fire({
          title: "Success!",
          text: "Reservation cancelled successfully!",
          icon: "success",
          confirmButtonColor: "#1976d2",
        });
        dispatch(GetResDetailsHistory());
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data?.Message || "Failed to cancel reservation",
          icon: "error",
          confirmButtonColor: "#1976d2",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Error cancelling reservation. Please try again.",
        icon: "error",
        confirmButtonColor: "#1976d2",
      });
    } finally {
      setCancelLoading(false);
      handleCancelDialogClose();
    }
  };

  const handleRemarksChange = (e) => {
    setCancelRemarks(e.target.value);
    if (e.target.value.trim()) {
      setRemarksError(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: "80%" },
            maxWidth: "1000px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
            Reservation History
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>

          <Paper
            elevation={5}
            sx={{
              borderRadius: 2,
              width: "100%",
              overflow: "auto",
              maxHeight: "60vh",
              mt: 2,
            }}
          >
            <Box sx={{ minWidth: "50px" }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
                      Bungalow Type
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
                      Check In
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
                      Check Out
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
                      Actions
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>
                      Feedback
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                        <CircularProgress size={24} />
                        <Typography sx={{ ml: 2, display: "inline" }}>Loading...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                        {msg || "Error loading data"}
                      </TableCell>
                    </TableRow>
                  ) : responseBody && responseBody.length > 0 ? (
                    responseBody
                      .slice()
                      .sort((a, b) => b.Res_no - a.Res_no)
                      .map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                          }}
                        >
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Res_Bang_Id == 1
                              ? "Main bungalow"
                              : item.Res_Bang_Id == 2
                              ? "Family bungalow"
                              : "Unknown"}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Res_Check_In}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Res_Check_Out}
                          </TableCell>
                          {/* <TableCell
                            sx={{
                              textAlign: "center",
                              color:
                                item.Res_Status === "Confirm"
                                  ? "blue"
                                  : item.Res_Status === "Cancelled"
                                  ? "red"
                                  : "orange",
                            }}
                          >
                            {item.Res_Status === "Cancelled"
                              ? "Cancelled"
                              : item.Res_Status === "Confirm"
                              ? "Confirmed"
                              : "Pending"}
                          </TableCell> */}

                          <TableCell
                            sx={{
                              textAlign: "center",
                              color:
                                item.Res_Status?.toLowerCase() === "confirmed"
                                  ? "blue"
                                  : item.Res_Status?.toLowerCase() === "cancelled"
                                    ? "red"
                                    : "orange",
                            }}
                          >
                            {item.Res_Status?.toLowerCase() === "cancelled"
                              ? "Cancelled"
                              : item.Res_Status?.toLowerCase() === "confirmed"
                                ? "Confirmed"
                                : "Pending"}
                          </TableCell>

                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Res_Status === "Confirmed" ? (
                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<CancelIcon />}
                                onClick={() => handleCancelClick(item)}
                                sx={{ textTransform: "none", borderRadius: 1.5 }}
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
                                No actions available
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {item.Res_Status === "Confirmed" ? (
                              <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                startIcon={<RateReviewIcon />}
                                onClick={() => handleFeedbackClick(item)}
                                sx={{ textTransform: "none", borderRadius: 1.5 }}
                              >
                                Feedback
                              </Button>
                            ) : (
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px" }}>
                                Not available
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: "center", py: 4 }}>
                        No reservation history found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Paper>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: "#f44336", color: "white", fontWeight: "bold" }}>
          Cancellation Policy
          <IconButton
            aria-label="close"
            onClick={handleCancelDialogClose}
            sx={{ color: "white", position: "absolute", right: 16 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedReservation && (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <p>
                  The following cancellation fee will be applied unless there is
                  an order for cancellation by the superior on an essential
                  official commitment.
                </p>
                <p>
                  From occupancy date: <br />
                </p>
                <p>
                  <b>
                    • 30 days before - No fee <br />
                    • 15 days before - 50% of full occupancy fee <br />
                    • Less than 15 days – 100% of full occupancy fee
                  </b>
                </p>
              </Typography>
              <hr />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to cancel this reservation?
              </Typography>

              <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Bungalow:</strong>{" "}
                  {selectedReservation.Res_Bang_Id == 1
                    ? "Main bungalow"
                    : selectedReservation.Res_Bang_Id == 2
                    ? "Family bungalow"
                    : "Unknown"}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Check In:</strong> {selectedReservation.Res_Check_In}
                </Typography>
                <Typography variant="body2">
                  <strong>Check Out:</strong> {selectedReservation.Res_Check_Out}
                </Typography>
              </Box>

              <TextField
                autoFocus
                margin="dense"
                id="remarks"
                label="Cancellation Remarks"
                type="text"
                fullWidth
                variant="outlined"
                value={cancelRemarks}
                onChange={handleRemarksChange}
                placeholder="Enter reason for cancellation"
                required
                error={remarksError}
                helperText={remarksError ? "Cancellation reason is required" : ""}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={handleCancelDialogClose} variant="outlined" disabled={cancelLoading}>
            Back
          </Button>
          <Button
            onClick={handleCancellation}
            variant="contained"
            color="error"
            size="small"
            disabled={cancelLoading}
            startIcon={cancelLoading ? <CircularProgress size={20} /> : <CancelIcon />}
          >
            {cancelLoading ? "Processing..." : "Confirm Cancellation"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Modal */}
      {feedbackReservation && (
        <FeedbackModal
          open={feedbackModalOpen}
          handleClose={handleFeedbackModalClose}
          reservation={feedbackReservation}
        />
      )}
    </>
  );
};

export default HistoryModal;
