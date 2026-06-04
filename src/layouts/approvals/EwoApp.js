// import React, { useState, useEffect } from "react";
// import { Visibility } from "@mui/icons-material";
// import {
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import EwoModal from "../../components/Utility/Approvals/EwoModal";
// import axios from "axios";

// function EwoApp() {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [ewoData, setEwoData] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchEwoDetails = async () => {
//       try {
//         const response = await axios.get("Approvals/GetEWODetails");
//         const resultSet = response.data.ResultSet;
//         if (resultSet) {
//           const formattedData = resultSet.map((item) => ({
//             id: item.EWONO,
//             jobNo: `${item.EWOJcat}-${item.EWOJmain}-${item.EWOSub}`,
//             status: item.EWOStatus || "Not Available",
//             startDate: item.StartDate,
//             endDate: item.EndDate,
//             spec: item.Spec,
//             extc: item.EWOExtc,
//             appby: item.AppBy,
//             appdate: item.AppDate,
//             amount: item.Ammount,
//             condetails: `${item.ConCode}-${item.ConName}`,
//             ewospec: item.EWOSpec,
//           }));
//           setEwoData(formattedData);
//         }
//       } catch (error) {
//         console.error("Error fetching EWO data", error);
//       }
//     };
//     fetchEwoDetails();
//   }, []);

//   const handleOpenModal = (row) => {
//     setSelectedRow(row);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedRow(null);
//     setOpenModal(false);
//   };

//   const handleStatusUpdate = (newStatus) => {
//     setSelectedRow({ ...selectedRow, status: newStatus });
//   };

//   const handleSaveStatus = () => {
//     console.log("Updated EWO Row:", selectedRow);
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <Box sx={{ mt: 2, maxWidth: "95%", mx: "auto" }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             EWO Details
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate(-1)}
//             sx={{ textTransform: "none", height: "40px" }}
//           >
//             Back
//           </Button>
//         </Box>

//         <Box sx={{ mt: 2 }}>
//           <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                     color: "white",
//                     textAlign: "center",
//                     padding: "8px",
//                   }}
//                 >
//                   EWO No
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                     color: "white",
//                     textAlign: "center",
//                     padding: "8px",
//                   }}
//                 >
//                   Job No
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                     color: "white",
//                     textAlign: "center",
//                     padding: "8px",
//                   }}
//                 >
//                   Status
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                     color: "white",
//                     textAlign: "center",
//                     padding: "8px",
//                   }}
//                 >
//                   Start Date
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                     color: "white",
//                     textAlign: "center",
//                     padding: "8px",
//                   }}
//                 >
//                   End Date
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     fontWeight: "bold",
//                     fontSize: "12px",
//                     color: "white",
//                     textAlign: "center",
//                     padding: "8px",
//                   }}
//                 >
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {ewoData.length > 0 ? (
//                 ewoData.map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
//                       {row.id}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
//                       {row.jobNo}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
//                       {row.status}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
//                       {row.startDate}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
//                       {row.endDate}
//                     </TableCell>
//                     <TableCell sx={{ textAlign: "center", padding: "8px",fontSize: "12px", }}>
//                       <Button
//                         variant="outlined"
//                         sx={{
//                           backgroundColor: "#5ac8fa",
//                           "&:hover": { backgroundColor: "#5ac8fa" },
//                           color: "white",
//                           borderColor: "#5ac8fa",
//                           padding: "4px",
//                           minWidth: "auto",
//                           borderRadius: "50%",
//                         }}
//                         onClick={() => handleOpenModal(row)}
//                       >
//                         <Visibility sx={{ fontSize: "16px" }} />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} sx={{ textAlign: "center" }}>
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </Box>


//         <EwoModal
//           open={openModal}
//           appName="EWO"
//           row={selectedRow}
//           onClose={handleCloseModal}
//           onStatusUpdate={handleStatusUpdate}
//           onSave={handleSaveStatus}
//         />
//       </Box>
//     </div>
//   );
// }

// export default EwoApp;



import React, { useState, useEffect } from "react";
import { Visibility } from "@mui/icons-material";
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EwoModal from "../../components/Utility/Approvals/EwoModal";
import axios from "axios";

function EwoApp() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [ewoData, setEwoData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch EWO details
  const fetchEwoDetails = async () => {
    try {
      const response = await axios.get("Approvals/GetEWODetails");
      const resultSet = response.data.ResultSet;
      if (resultSet) {
        const formattedData = resultSet.map((item) => ({
          id: item.EWONO,
          jobNo: `${item.EWOJcat}-${item.EWOJmain}-${item.EWOSub}`,
          status: item.EWOStatus || "Not Available",
          startDate: item.StartDate,
          endDate: item.EndDate,
          spec: item.Spec,
          extc: item.EWOExtc,
          appby: item.AppBy,
          appdate: item.AppDate,
          amount: item.Ammount,
          condetails: `${item.ConCode}-${item.ConName}`,
          ewospec: item.EWOSpec,
        }));
        setEwoData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching EWO data", error);
    }
  };

  useEffect(() => {
    fetchEwoDetails();
  }, []);

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setOpenModal(false);
  };

  const handleStatusUpdate = (newStatus) => {
    setSelectedRow((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSaveStatus = () => {
    // ✅ reload data after approve
    fetchEwoDetails();
    setOpenModal(false);
  };

  return (
    <div>
      <Box sx={{ mt: 2, maxWidth: "95%", mx: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            EWO Details
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ textTransform: "none", height: "40px" }}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Table size="small" sx={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2", color: "white" }}>
                {["EWO No", "Job No", "Status", "Start Date", "End Date", "Action"].map(
                  (head, i) => (
                    <TableCell
                      key={i}
                      sx={{
                        fontWeight: "bold",
                        fontSize: "12px",
                        color: "white",
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {ewoData.length > 0 ? (
                ewoData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}>
                      {row.jobNo}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}>
                      {row.status === "P"
                      ? "Pending"
                      :row.status === "R"
                      ? "Return"
                      :row.status
                      
                      }
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}>
                      {row.startDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}>
                      {row.endDate}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", padding: "8px", fontSize: "12px" }}>
                      <Button
                        variant="outlined"
                        sx={{
                          backgroundColor: "#5ac8fa",
                          "&:hover": { backgroundColor: "#5ac8fa" },
                          color: "white",
                          borderColor: "#5ac8fa",
                          padding: "4px",
                          minWidth: "auto",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleOpenModal(row)}
                      >
                        <Visibility sx={{ fontSize: "16px" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <EwoModal
          open={openModal}
          appName="EWO"
          row={selectedRow}
          onClose={handleCloseModal}
          onStatusUpdate={handleStatusUpdate}
          onSave={handleSaveStatus}
        />
      </Box>
    </div>
  );
}

export default EwoApp;
