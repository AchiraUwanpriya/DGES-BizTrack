// import React from "react";
// import { Modal, Box, Typography, Button } from "@mui/material";

// const CartModal = ({ open, handleClose, cartItems }) => {
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: 400,
//           bgcolor: "background.paper",
//           borderRadius: 2,
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" mb={2}>
//           Cart Items
//         </Typography>
//         {cartItems.length > 0 ? (
//           cartItems.map((item, idx) => (
//             <Box key={idx} sx={{ mb: 2 }}>
//               <Typography fontSize={14} fontWeight={500}>
//                 {item.MaterialDescription}
//               </Typography>
//               <Typography fontSize={12}>
//                 Qty: {item.quantity} {item.Unit}
//               </Typography>
//               <Typography fontSize={12}>Price: Rs {item.SellingPrice}</Typography>
//             </Box>
//           ))
//         ) : (
//           <Typography>No Items Selected</Typography>
//         )}
//         <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
//           Close
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default CartModal;

//Cart Modal with Table

// import React from "react";
// import { Modal, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// const CartModal = ({ open, handleClose, cartItems }) => {
//     // Calculate total amount
//     const totalAmount = cartItems.reduce((acc, item) => {
//         return acc + (item.quantity * item.SellingPrice);
//     }, 0);

//     const theme = useTheme();

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     width: "100%",
//                     bgcolor: "background.paper",
//                     borderRadius: 2,
//                     boxShadow: 24,
//                     p: 2,
//                 }}
//             >
//                 <Typography variant="h6" mb={1.5} sx={{fontWeight:"bold"}}>
//                     Cart Items
//                 </Typography>

//                 {cartItems.length > 0 ? (
//                     <>
//                         <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//                             <Table stickyHeader size="small">
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12 ,fontWeight:"bold"}}>
//                                             Item
//                                         </TableCell>
//                                         <TableCell align="center" sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12,fontWeight:"bold" }}>
//                                             Qty
//                                         </TableCell>
//                                         <TableCell align="center" sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12,fontWeight:"bold" }}>
//                                             Price
//                                         </TableCell>
//                                         <TableCell align="center" sx={{ backgroundColor: "#1976d2", color: theme.palette.common.white, fontSize: 12,fontWeight:"bold" }}>
//                                         Total
//                                         </TableCell>
//                                     </TableRow>
//                                 </TableHead>

//                                 <TableBody>
//                                     {cartItems.map((item) => (
//                                         <TableRow >
//                                             <TableCell sx={{ fontSize: 12, color: "black" }}>
//                                                 {item.MaterialDescription}
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ fontSize: 12, color: "black" }}>
//                                                 {item.quantity} {item.Unit}
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ fontSize: 12, color: "black" }}>
//                                                 Rs {item.SellingPrice}
//                                             </TableCell>
//                                             <TableCell align="center" sx={{ fontSize: 12, color: "black" }}>
//                                                 Rs {item.quantity * item.SellingPrice}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>

//                         {/* Grand Total */}
//                         <Box sx={{ mt: 1, textAlign: "right", mr: 0.5 }}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Grand Total: Rs {totalAmount}
//                             </Typography>
//                         </Box>
//                     </>
//                 ) : (
//                     <Typography>No Items Selected</Typography>
//                 )}

//                 <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{ mt: 2 }}
//                     onClick={handleClose}
//                 >
//                     Close
//                 </Button>
//             </Box>
//         </Modal>
//     );
// };

// export default CartModal;

// import React from "react";
// import {
//     Modal,
//     Box,
//     Typography,
//     IconButton,
//     Divider,
//     Button,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";

// const CartModal = ({ open, handleClose, cartItems }) => {
//     const subtotal = cartItems.reduce(
//         (sum, item) => sum + item.quantity * item.SellingPrice,
//         0
//     );

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box
//                 sx={{
//                     position: "fixed",
//                     top: 0,
//                     right: 0,
//                     width: { xs: "100%", sm: "400px" },
//                     height: "100%",
//                     bgcolor: "background.paper",
//                     boxShadow: 24,
//                     display: "flex",
//                     flexDirection: "column",
//                     overflow: "auto",
//                 }}
//             >
//                 {/* Header */}
//                 <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Typography variant="h6" fontWeight="bold" sx={{ mb: -3 }}>
//                         Cart Items ({cartItems.length})
//                     </Typography>
//                     <IconButton onClick={handleClose} sx={{ mb: -3 }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </Box>

//                 {/* Free Shipping Notice */}
//                 {/* <Typography sx={{ px: 2, py: 1, fontSize: "14px" }}>
//                     You are eligible for free shipping.
//                 </Typography> */}
//                 <Divider sx={{ my: 1 }} />

//                 {/* Cart Items */}
//                 <Box
//                     sx={{
//                         flexGrow: 1,
//                         px: 2,
//                         overflowY: "auto",
//                     }}
//                 >
//                     {cartItems.length > 0 ? (
//                         cartItems.map((item, idx) => (
//                             <Box
//                                 key={idx}
//                                 sx={{
//                                     display: "flex",
//                                     justifyContent: "space-between",
//                                     alignItems: "center",
//                                     flexWrap: "wrap",
//                                     mb: 1,
//                                     gap: 2,
//                                     backgroundColor: "#f0f0f0",
//                                     p: 2,
//                                     borderRadius: 2,
//                                 }}
//                             >
//                                 <Box sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
//                                     <Box>
//                                         <img
//                                             src={require("../../assets/icons/food.png")}
//                                             alt="item"
//                                             style={{ borderRadius: "10px", height: 60 }}
//                                         />
//                                         <Typography fontSize={8} sx={{ ml: 2 }}>
//                                             {item.MaterialCode}
//                                         </Typography>
//                                     </Box>

//                                     <Box sx={{ ml: 1, minWidth: 0 }}>
//                                         <Typography fontWeight="bold" sx={{ wordBreak: "break-word" }}>
//                                             Item: {item.MaterialDescription}
//                                         </Typography>
//                                         <Typography variant="body2" color="text.secondary">
//                                             QTY: {item.Unit || "Qty"} x {item.quantity}
//                                         </Typography>
//                                         <Typography mt={1}>
//                                             Price: Rs {item.SellingPrice.toLocaleString("en-US")}.00
//                                         </Typography>
//                                     </Box>
//                                 </Box>

//                                 {/* Item total on the right */}
//                                 <Box sx={{ minWidth: "fit-content" }}>
//                                     <Typography fontWeight="bold" textAlign="right">
//                                         Rs {(item.quantity * item.SellingPrice).toLocaleString("en-US", {
//                                             minimumFractionDigits: 2,
//                                             maximumFractionDigits: 2,
//                                         })}
//                                     </Typography>
//                                 </Box>

//                             </Box>
//                         ))
//                     ) : (
//                         <Typography sx={{ textAlign: "center", mt: 4 }}>
//                             No items selected
//                         </Typography>
//                     )}
//                 </Box>

//                 {/* Bottom Section */}
//                 <Box sx={{ borderTop: "1px solid #ccc", p: 2 }}>
//                     {/* <Typography variant="body2" sx={{ mb: 1 }}>
//                         Taxes included and shipping calculated at checkout.
//                     </Typography> */}
//                     <Typography fontWeight="bold" sx={{ mb: 1, textAlign: "right" }}>
//                         Subtotal: Rs {subtotal.toLocaleString("en-US", {
//                             minimumFractionDigits: 2,
//                             maximumFractionDigits: 2,
//                         })} LKR
//                     </Typography>

//                     {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                         <Button
//                             variant="contained"
//                             fullWidth
//                             sx={{
//                                 bgcolor: "black",
//                                 "&:hover": { bgcolor: "#333" },
//                                 borderRadius: 10,
//                                 textTransform: "none",
//                                 fontSize: "16px",
//                                 py: 1,
//                             }}
//                         >
//                             Checkout
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             fullWidth
//                             sx={{
//                                 borderRadius: 10,
//                                 textTransform: "none",
//                                 fontSize: "16px",
//                                 py: 1,
//                             }}
//                         >
//                             View Cart
//                         </Button>
//                     </Box> */}
//                 </Box>
//             </Box>
//         </Modal>
//     );
// };

// export default CartModal;

//cart modal with cards
import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const CartModal = ({ open, handleClose, cartItems, handleRemoveItem }) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.SellingPrice,
    0
  );

  const handleProceed = () => {
    Swal.fire({
      // title: "Proceed to History?",
      text: "Do you want to Place Order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClose();
      }
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: { xs: "100%", sm: "400px" },
          height: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {/* Header section */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: -3 }}>
            Cart Items ({cartItems.length})
          </Typography>
          <IconButton onClick={handleClose} sx={{ mb: -3 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Cart Items */}
        <Box sx={{ flexGrow: 1, px: 2, overflowY: "auto" }}>
          {cartItems.length > 0 ? (
            cartItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mb: 1,
                  gap: 2,
                  backgroundColor: "#f0f0f0",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                {/* Image and Item Information */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Box>
                    <img
                      src={require("../../assets/icons/food.png")}
                      alt="item"
                      style={{ borderRadius: "10px", height: 60 }}
                    />
                    <Typography fontSize={8} sx={{ ml: 2 }}>
                      {item.MaterialCode}
                    </Typography>
                  </Box>

                  <Box sx={{ ml: 1, minWidth: 0 }}>
                    <Typography
                      fontWeight="bold"
                      sx={{ wordBreak: "break-word" }}
                    >
                      Item: {item.MaterialDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      QTY: {item.Unit || "Qty"} x {item.quantity}
                    </Typography>
                    <Typography mt={1}>
                      Price: Rs {item.SellingPrice.toLocaleString("en-US")}.00
                    </Typography>
                  </Box>
                </Box>

                {/* Total and Remove Button for each otem */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    minWidth: "fit-content",
                  }}
                >
                  <Typography fontWeight="bold">
                    Rs{" "}
                    {(item.quantity * item.SellingPrice).toLocaleString(
                      "en-US",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ mt: 1, borderRadius: 2, textTransform: "none" }}
                    onClick={() => handleRemoveItem(item.MaterialCode)}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", mt: 4 }}>
              No items selected
            </Typography>
          )}
        </Box>

        {/* Bottom Section */}
        <Box sx={{ borderTop: "1px solid #ccc", p: 2 }}>
          <Typography fontWeight="bold" sx={{ textAlign: "right" }}>
            Subtotal: Rs{" "}
            {subtotal.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: 14,
            }}
            onClick={handleProceed}
            disabled={cartItems.length === 0}
          >
            Proceed
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CartModal;
