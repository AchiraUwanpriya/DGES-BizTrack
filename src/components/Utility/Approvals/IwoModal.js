import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";

function IwoModal({ open, row, onClose, onStatusUpdate, onSave, appName }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onSave();
        Swal.fire({
          title: "Success!",
          text: "Status updated successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
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
          p: 2,
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
                    <Grid item xs={4}>
                      <TextField
                        label="IWO No"
                        value={row.IWONO}
                        fullWidth
                        variant="filled"
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        label="Job No"
                        value={`${row.IWOJcat} / ${row.IWOJmain} / ${row.IWOSub}/ ${row.Spec}/ ${row.IWOExtc}`}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Start Date"
                        variant="filled"
                        value={row.StartDate}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        label="End Date"
                        value={row.EndDate}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Org By"
                        value={row.OrgBy}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Org Loc Code"
                        value={row.OrgLocCode}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="IWO Create Date"
                        value={row.IWOCreatedDate}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="IWO Spec."
                        value={row.IWOSpec || "Not Available"}
                        variant="filled"
                        fullWidth
                        multiline 
                        rows={4}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            {/* <Box
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
            </Box> */}
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default IwoModal;
