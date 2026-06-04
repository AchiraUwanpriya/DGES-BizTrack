// import React, { useState, useEffect } from "react";
// import {
//   Alert,
//   Box,
//   Button,
//   DialogContent,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Modal,
//   Select,
//   Snackbar,
//   TextField,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import Swal from "sweetalert2";
// import CloseIcon from "@mui/icons-material/Close";
// import axios from "axios";

// function EwoModal({ open, row, onClose, onStatusUpdate, onSave, appName }) {
//   const [successMessage, setSuccessMessage] = useState(false);
//   const [modalData, setModalData] = useState(null);

//   useEffect(() => {
//     if (open && row) {
//       const fetchModalData = async () => {
//         try {
//           const response = await axios.post(
//             "Approvals/LoadEWOMoreDetails",
//             {
//               EWONO: row.id,
//             }
//           );
//           const resultSet = response.data.ResultSet;
//           if (resultSet && resultSet.length > 0) {
//             setModalData(resultSet[0]);
//           }
//         } catch (error) {
//           console.error("Error fetching modal data", error);
//         }
//       };
//       fetchModalData();
//     }
//   }, [open, row]);

//   const handleSave = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to update the status?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Save it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         onSave();
//         Swal.fire({
//           title: "Success!",
//           text: "Status updated successfully!",
//           icon: "success",
//           confirmButtonColor: "#3085d6",
//         });
//       }
//     });
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
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
//           p: 2,
//         }}
//       >
//         {modalData && (
//           <div>
//             <Box
//               display="flex"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "bold", color: "#2196F3" }}
//               >
//                 {appName} Details
//               </Typography>
//               <IconButton onClick={onClose} sx={{ color: "gray" }}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//             <DialogContent dividers>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Grid container spacing={2}>
//                     <Grid item xs={3}>
//                       <TextField
//                         label="EWO No"
//                         value={modalData.EWONO || "Not Available"}
//                         fullWidth
//                         variant="filled"
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={9}>
//                       <TextField
//                         label="Job No"
//                         value={`${modalData.EWOJcat}-${modalData.EWOJmain}-${modalData.EWOSub} / ${modalData.Spec} / ${modalData.EWOExtc}`}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField
//                         label="Start Date"
//                         value={modalData.StartDate || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField
//                         label="End Date"
//                         value={modalData.EndDate || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField
//                         label="App By"
//                         value={modalData.AppBy || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField
//                         label="App Date"
//                         value={modalData.AppDate || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField
//                         label="Amount"
//                         value={modalData.Ammount || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={6}>
//                       <TextField
//                         label="EWO Status"
//                         value={modalData.EWOStatus || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         label="Con. Details"
//                         value={
//                           modalData.ConCode && modalData.ConName
//                             ? `${modalData.ConCode} - ${modalData.ConName}`
//                             : "Not Available"
//                         }
//                         variant="filled"
//                         fullWidth
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         label="EWO Spec."
//                         value={modalData.EWOSpec || "Not Available"}
//                         variant="filled"
//                         fullWidth
//                         multiline
//                         rows={4} 
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
//   <Button
//     variant="contained"
//     color="primary"
//     onClick={handleSave}
//   >
//     Approve
//   </Button>
//   <Button
//     variant="outlined"
//     color="secondary"
//     onClick={onClose}
//   >
//     Cancel
//   </Button>
// </Box>
//           </div>
//         )}
//       </Box>
//     </Modal>
//   );
// }

// export default EwoModal;



import React, { useState, useEffect } from "react";
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
  Select,
  Snackbar,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

function EwoModal({ open, row, onClose, onStatusUpdate, onSave, appName }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Extracted fetch logic into a function so we can reuse it
  // const fetchModalData = async () => {
  //   if (!row || !row.id) return;
  //   try {
  //     const response = await axios.post("Approvals/LoadEWOMoreDetails", {
  //       EWONO: row.id,
  //     }
  //   );
  //     const resultSet = response.data.ResultSet;
  //     if (resultSet && resultSet.length > 0) {
  //       setModalData(resultSet[0]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching modal data", error);
  //   }
  // };



  const fetchModalData = async () => {
  if (!row || !row.id) return;
  try {
    const response = await axios.get(
      "Approvals/LoadEWOMoreDetails",
      {
        params: {
          P_IWONO: row.id, 
        },
      }
    );

    const resultSet = response.data.ResultSet;
    if (resultSet && resultSet.length > 0) {
      setModalData(resultSet[0]);
    }
  } catch (error) {
    console.error("Error fetching modal data", error);
  }
};

  useEffect(() => {
    if (open && row) {
      fetchModalData();
    }
  }, [open, row]);

  const handleApprove = async () => {
    if (!row || !row.id) {
      Swal.fire({
        title: "Error!",
        text: "No EWO number found!",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this EWO?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
         const logid = localStorage.getItem("logId");
        try {
          const response = await axios.get(
            `Approvals/EWOStatusApp?P_IWONO=${row.id}&P_LOGID=${logid}`
          );

          if (response.data) {
            Swal.fire({
              title: "Success!",
              text: "EWO approved successfully!",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });

            // ✅ Re-fetch updated details
            await fetchModalData();

            if (onSave) onSave();
            if (onStatusUpdate) onStatusUpdate();
          }
        } catch (error) {
          console.error("Error approving EWO", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to approve EWO. Please try again.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        } finally {
          setLoading(false);
        }
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
        {modalData && (
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        label="EWO No"
                        value={modalData.EWONO || "Not Available"}
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
                        value={`${modalData.EWOJcat}-${modalData.EWOJmain}-${modalData.EWOSub} / ${modalData.Spec} / ${modalData.EWOExtc}`}
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
                        value={modalData.StartDate || "Not Available"}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="End Date"
                        value={modalData.EndDate || "Not Available"}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="App By"
                        value={modalData.AppBy || "Not Available"}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="App Date"
                        value={modalData.AppDate || "Not Available"}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Amount"
                        value={modalData.Ammount || "Not Available"}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="EWO Status"
                        value={modalData.EWOStatus || "Not Available"}
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Con. Details"
                        value={
                          modalData.ConCode && modalData.ConName
                            ? `${modalData.ConCode} - ${modalData.ConName}`
                            : "Not Available"
                        }
                        variant="filled"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="EWO Spec."
                        value={modalData.EWOSpec || "Not Available"}
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
            <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApprove}
                disabled={loading}
              >
                {loading ? "Approving..." : "Approve"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default EwoModal;