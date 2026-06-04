// import {
//   Box,
//   Grid,
//   Button,
//   Typography,
//   TextField,
//   styled,
//   Dialog,
//   DialogContent,
// } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import JobCard from "../../components/Cards/JobCard";
// import WorkOrderModal from "../../components/Utility/WorkOrderModal";
// import JobAllocationService from "../../service/JobAllocationService";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const Job_Allocation = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [jobData, setJobData] = useState([]);
//   const [unassignedList, setUnassignedList] = useState([]);

//   useEffect(() => {
//     const fetchJobData = async () => {
//       const formattedDate = selectedDate.format("YYYY-MM-DD");

//       try {
//         const jobCardResponse = await JobAllocationService.GetJobCard(
//           formattedDate
//         );
//         if (jobCardResponse.data.StatusCode === 200) {
//           setJobData(jobCardResponse.data.ResultSet);
//         } else {
//           setJobData([]);
//         }

//         const unassignedListResponse =
//           await JobAllocationService.GetUnAssignedList(formattedDate);
//         if (unassignedListResponse.data.StatusCode === 200) {
//           setUnassignedList(unassignedListResponse.data.ResultSet);
//         } else {
//           setUnassignedList([]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setJobData([]);
//         setUnassignedList([]);
//       }
//     };

//     fetchJobData();
//   }, [selectedDate]);

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   const handleDateChange = async (newValue) => {
//     setSelectedDate(newValue);
//   };

//   return (
//     <div>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           p: 2,
//           backgroundColor: "#f5f5f5",
//           borderBottom: "1px solid #ccc",
//           mb: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1 }}>
//             Date
//           </Typography>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker
//               value={selectedDate}
//               onChange={handleDateChange}
//               renderInput={(params) => (
//                 <TextField {...params} size="small" sx={{ width: 150 }} />
//               )}
//             />
//           </LocalizationProvider>
//         </Box>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpenModal}
//           sx={{
//             backgroundColor: "#007bff",
//             color: "white",
//             textTransform: "none",
//           }}
//         >
//           New
//         </Button>
//       </Box>

//       {/* <Grid container rowSpacing={0}> */}
//         <JobCard
//           jobData={jobData}
//           unassignedList={unassignedList}
//           selectedDate={selectedDate}
//         />
//       {/* </Grid> */}

//       {/* Dialog */}
//       <BootstrapDialog
//         onClose={handleCloseModal}
//         aria-labelledby="customized-dialog-title"
//         open={openModal}
//       >
//         <DialogContent>
//           <WorkOrderModal onClose={handleCloseModal} />
//         </DialogContent>
//       </BootstrapDialog>
//     </div>
//   );
// };

// export default Job_Allocation;



import {
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  styled,
  Dialog,
  DialogContent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import JobCard from "../../components/Cards/JobCard";
import JobAllocationAttendence from "../../components/Utility/JobAllocationAttendence";
import WorkOrderModal from "../../components/Utility/WorkOrderModal";
import JobAllocationService from "../../service/JobAllocationService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Job_Allocation = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [jobData, setJobData] = useState([]);
  const [unassignedList, setUnassignedList] = useState([]);

  useEffect(() => {
    const fetchJobData = async () => {
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      try {
        const jobCardResponse = await JobAllocationService.GetJobCard(
          formattedDate
        );
        if (jobCardResponse.data.StatusCode === 200) {
          setJobData(jobCardResponse.data.ResultSet);
        } else {
          setJobData([]);
        }

        const unassignedListResponse =
          await JobAllocationService.GetUnAssignedList(formattedDate);
        if (unassignedListResponse.data.StatusCode === 200) {
          setUnassignedList(unassignedListResponse.data.ResultSet);
        } else {
          setUnassignedList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setJobData([]);
        setUnassignedList([]);
      }
    };

    fetchJobData();
  }, [selectedDate]);

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDateChange = async (newValue) => {
    setSelectedDate(newValue);
  };

  const [modalType, setModalType] = useState("");

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ccc",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1 }}>
            Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} size="small" sx={{ width: 120 }} />
              )}
            />
          </LocalizationProvider>
        </Box>

        <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("attendance")}
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              textTransform: "none",
            }}
          >
            Attendance
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal("new")}
            sx={{
              backgroundColor: "#007bff",
              color: "white",
              textTransform: "none",
            }}
          >
            New
          </Button>
        </Box>
      </Box>

      <JobCard
        jobData={jobData}
        unassignedList={unassignedList}
        selectedDate={selectedDate}
      />

      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogContent>
          {/* {modalType === 'attendance' && <JobAllocationAttendence />} */}
          {modalType === "attendance" && (
            <JobAllocationAttendence
              onClose={handleCloseModal}
              selectedDate={selectedDate.format("YYYY-MM-DD")}
            />
          )}
          {modalType === "new" && <WorkOrderModal onClose={handleCloseModal} />}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default Job_Allocation;
