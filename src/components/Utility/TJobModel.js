import React from "react";
import { Modal, Box, Typography, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";

const modalStyle = {
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 366,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
  textAlign: "left",
  fontFamily: "Arial, sans-serif",
};

const TJobModal = ({ open, onClose, selectedRow }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="job-modal-title"
      aria-describedby="job-modal-description"
    >
      <Box sx={modalStyle}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          id="job-modal-title"
          variant="h6"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Temporary Job Details
        </Typography>

        {selectedRow ? (
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>TWO No :</strong>{" "}
                {"T" + selectedRow.TEMP_EWONO.toString().padStart(7, "0")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Start Date :</strong>{" "}
                {dayjs(selectedRow.TEMP_SDATE).format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>End Date :</strong>{" "}
                {dayjs(selectedRow.TEMP_EDATE).format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Job No :</strong> {selectedRow.TEMP_JOBNO}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Specification :</strong> {selectedRow.TEMP_SPEC}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Location :</strong> {selectedRow.TEMP_LOC}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>Remarks :</strong> {selectedRow.TEMP_REMARK}
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                <strong>EWO No :</strong> {selectedRow.EWONO || "N/A"}
              </Typography>
            </Grid> */}
          </Grid>
        ) : (
          <Typography variant="body2" sx={{ fontSize: "0.875rem", mt: 2 }}>
            No details available.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default TJobModal;
