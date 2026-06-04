import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; 

const LeaveDetailsModal = ({ open, onClose, rowData, modalTitle }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {modalTitle}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ maxHeight: 400, overflowY: "auto" }}>
        {rowData && rowData.length > 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <TableCell sx={{ fontWeight: "bold", color: "white",fontSize: "12px", }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white",fontSize: "12px", }}>
                  Reason
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white",fontSize: "12px", }}>
                  Days
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white",fontSize: "12px", }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontSize: "12px",}}>{item.Date}</TableCell>
                  <TableCell sx={{fontSize: "12px",}}>{item.Reason}</TableCell>
                  <TableCell sx={{fontSize: "12px",}}>{item.NoDays}</TableCell>
                  <TableCell sx={{fontSize: "12px",}}>
                    {item.ApprovedDate ? "Approved" : "Not Approved"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No data available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveDetailsModal;
