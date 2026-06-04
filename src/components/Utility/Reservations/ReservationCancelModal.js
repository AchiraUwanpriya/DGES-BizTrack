// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Modal,
//   TextField,
//   Button,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Swal from "sweetalert2";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// const ReservationCancelModal = ({ open, handleClose }) => {
//   const [cancelRemark, setCancelRemark] = useState("");

//   const handleSaveClick = () => {
//     Swal.fire({
//       icon: "success",
//       title: "Saved!",
//       text: "Your Cancellation Remark has been saved.",
//       showConfirmButton: false,
//       timer: 1500,
//     }).then(() => {
//       handleClose();
//     });
//   };

//   const handleCancelClick = () => {
//     handleClose();
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{ position: "absolute", top: 8, right: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Cancel Reservation
//         </Typography>
//         <Box>
//           <TextField
//             fullWidth
//             label="Remark"
//             variant="outlined"
//             margin="normal"
//             value={cancelRemark}
//             onChange={(e) => setCancelRemark(e.target.value)}
//             multiline
//             rows={4}
//           />
//           <Typography
//             variant="body2"
//             sx={{
//               color: "red",
//               fontWeight: "bold",
//               mt: 2,
//               textAlign: "justify",
//             }}
//           >
//             <p>* Cancel Policy Apply.</p>
//             <p>
//               Our cancellation policy allows customers to make adjustments to
//               their bookings or reservations within a specified timeframe. To
//               ensure fairness for all parties, cancellations made within the
//               outlined period will either result in a full or partial refund,
//               depending on the terms of the policy. However, cancellations made
//               outside of this period may incur a fee or be non-refundable.
//               Please review our cancellation terms carefully before making any
//               changes to your booking.
//             </p>
//           </Typography>

//           <Box
//             sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSaveClick}
//             >
//               Save
//             </Button>
//             <Button variant="outlined" onClick={handleCancelClick}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default ReservationCancelModal;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ReservationCancelModal = ({ open, handleClose }) => {
  const [cancelRemark, setCancelRemark] = useState("");

  const handleSaveClick = () => {
    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Your Cancellation Remark has been saved.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      handleClose();
    });
  };

  const handleCancelClick = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cancel Reservation
        </Typography>
        <Box>
          <TextField
            fullWidth
            label="Remark"
            variant="outlined"
            margin="normal"
            value={cancelRemark}
            onChange={(e) => setCancelRemark(e.target.value)}
            multiline
            rows={4}
          />
          <Typography
            variant="body2"
            sx={{
              color: "red",
              fontWeight: "bold",
              mt: 2,
              textAlign: "justify",
            }}
          >
            <p>* Cancel Policy Apply.</p>
            <p>
              Our cancellation policy allows customers to make adjustments to
              their bookings or reservations within a specified timeframe. To
              ensure fairness for all parties, cancellations made within the
              outlined period will either result in a full or partial refund,
              depending on the terms of the policy. However, cancellations made
              outside of this period may incur a fee or be non-refundable.
              Please review our cancellation terms carefully before making any
              changes to your booking.
            </p>
          </Typography>

          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReservationCancelModal;
