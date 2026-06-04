import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CartHistoryModal = ({ open, handleClose }) => {
  // Sample test data for cartItems
  const cartItems = [
    { date: "2025-04-01", itemName: "WATANA", quantity: 2, SellingPrice: 160 },
    {
      date: "2025-04-02",
      itemName: "JAM - WOOD APPLE (450G)",
      quantity: 1,
      SellingPrice: 410,
    },
    {
      date: "2025-04-03",
      itemName: "SIGNAL (120G)",
      quantity: 3,
      SellingPrice: 118,
    },
    {
      date: "2025-04-04",
      itemName: "MALIBAN - HAWAIIAN COOKIES - 200G",
      quantity: 2,
      SellingPrice: 125,
    },
    {
      date: "2025-04-05",
      itemName: "LANKA SOY - CUTTLE FISH 90G",
      quantity: 1,
      SellingPrice: 77,
    },
    {
      date: "2025-04-06",
      itemName: "LANKA SOY - CURRY 90G",
      quantity: 3,
      SellingPrice: 65.5,
    },
  ];

  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.SellingPrice;
  }, 0);

  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "fixed",
          width: { xs: "100%", sm: "600px" }, // Adjusted width for better display
          height: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          p: 2,
        }}
      >
        <Typography variant="h6" mb={1.5} sx={{ fontWeight: "bold" }}>
          History Details
        </Typography>

        {cartItems.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        backgroundColor: "#1976d2",
                        color: theme.palette.common.white,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#1976d2",
                        color: theme.palette.common.white,
                        fontSize: 12,
                        fontWeight: "bold",
                        width: "40%", // Increased width for the Item column
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#1976d2",
                        color: theme.palette.common.white,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#1976d2",
                        color: theme.palette.common.white,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: "#1976d2",
                        color: theme.palette.common.white,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">
                        {item.SellingPrice.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        {(item.quantity * item.SellingPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography>No Items Selected</Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CartHistoryModal;
