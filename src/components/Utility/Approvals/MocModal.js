import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Snackbar,
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


function MocModal({ open, row, onClose, onStatusUpdate, onSave, appName }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const handleSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save it!",
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
  const tableData = [
    {
      col1: "Row 1 - Col 1",
      col2: "Row 1 - Col 2",
      col3: "Row 1 - Col 3",
      col4: "Row 1 - Col 4",
    },
    {
      col1: "Row 2 - Col 1",
      col2: "Row 2 - Col 2",
      col3: "Row 2 - Col 3",
      col4: "Row 2 - Col 4",
    },
    {
      col1: "Row 3 - Col 1",
      col2: "Row 3 - Col 2",
      col3: "Row 3 - Col 3",
      col4: "Row 3 - Col 4",
    },
    {
      col1: "Row 3 - Col 1",
      col2: "Row 3 - Col 2",
      col3: "Row 3 - Col 3",
      col4: "Row 3 - Col 4",
    },
  ];
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
                        label="MOC NO"
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
                        label="Job No"
                        value={row.jobNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Created Date"
                        variant="filled"
                        value={row.startDate}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={row.status}
                          onChange={(event) =>
                            onStatusUpdate(event.target.value)
                          }
                          label="Status"
                        >
                          <MenuItem value="Stand By">Stand By</MenuItem>
                          <MenuItem value="In Progress">In Progress</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Location"
                        // value={row.jobNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Indent Cleark"
                        // value={row.jobNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Created By"
                        // value={row.jobNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Prepared By"
                        // value={row.jobNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Checked By"
                        // value={row.jobNo}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Authrized By"
                        variant="filled"
                        // value={row.startDate}
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
              sx={{ maxHeight: 200, mt: 2,   overflowY: "auto" }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      Material Code
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      Unit
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontSize: 12,
                      }}
                    >
                      Qty
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{fontSize: 12}}>{row.col1}</TableCell>
                      <TableCell sx={{fontSize: 12}}>{row.col2}</TableCell>
                      <TableCell sx={{fontSize: 12}}>{row.col3}</TableCell>
                      <TableCell sx={{fontSize: 12}}>{row.col4}</TableCell>
                    </TableRow>
                  ))}
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

export default MocModal;
