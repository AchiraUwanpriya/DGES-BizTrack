import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Grid,
  Paper,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import NoteIcon from "@mui/icons-material/Note";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Swal from "sweetalert2";
import ReservationCancelModal from "../../components/Utility/Reservations/ReservationCancelModal";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { format, isSameDay } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { UpdateResStatus } from "../../action/Reservation";
import BuildIcon from '@mui/icons-material/Build';
import BlockIcon from '@mui/icons-material/Block';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
  p: 0,
};

const PointsEarnedIcon = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderRadius: 2,
        background: "linear-gradient(135deg, #fff9c4 0%, #fff176 100%)",
        mb: 2,
      }}
    >
      <EmojiEventsIcon sx={{ color: "#f57c00", fontSize: 36, mr: 2 }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f57c00" }}>
          12 Points
        </Typography>
        <Typography variant="body2" sx={{ color: "#7e57c2" }}>
          You'll earn with this reservation
        </Typography>
      </Box>
    </Paper>
  );
};

// const CountdownTimer = ({ secondsRemaining, totalSeconds }) => {
//   const progress = (secondsRemaining / totalSeconds) * 100;
//   const minutes = Math.floor(secondsRemaining / 60);
//   const seconds = secondsRemaining % 60;

//   const getTimerColor = () => {
//     if (secondsRemaining > 300) return "primary";
//     if (secondsRemaining > 60) return "warning";
//     return "error";
//   };

//   return (
//     <Box sx={{ width: "100%", mb: 2 }}>
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
//         <Typography variant="body2" sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
//           <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
//           Time remaining to complete booking:
//         </Typography>
//         <Typography
//           variant="body2"
//           sx={{
//             fontWeight: "bold",
//             color: secondsRemaining <= 60 ? "error.main" : secondsRemaining <= 300 ? "warning.main" : "primary.main"
//           }}
//         >
//           {minutes}:{seconds.toString().padStart(2, '0')}
//         </Typography>
//       </Box>
//       <LinearProgress
//         variant="determinate"
//         value={progress}
//         color={getTimerColor()}
//         sx={{
//           height: 6,
//           borderRadius: 3,
//           backgroundColor: '#f0f0f0'
//         }}
//       />
//     </Box>
//   );
// };

const MaintenanceDay = ({ day, isSelected, isMaintenance }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isMaintenance && (
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: 'warning.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <BuildIcon sx={{ fontSize: 10, color: 'white' }} />
        </Box>
      )}
      <Typography
        variant="body2"
        sx={{
          color: isMaintenance ? 'warning.main' : (isSelected ? 'white' : 'text.primary'),
          fontWeight: isMaintenance ? 'bold' : 'normal',
          opacity: isMaintenance ? 0.7 : 1,
        }}
      >
        {day.getDate()}
      </Typography>
    </Box>
  );
};

const CloseModal = ({ open, handleClose, maintenanceDates = new Set() }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bungalowType, setBungalowType] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const [countdownActive, setCountdownActive] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600);
  const countdownIntervalRef = useRef(null);
  const lastResetTimeRef = useRef(0);
  const RESET_COOLDOWN = 5000;
  const { authKey } = useAuth();
  
  const addMonths = (date, months) => {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  };

  // --------------------------- calendar checkin & checkout date limit--------------------
  const today = new Date();
  const maxSelectableDate = new Date(
    today.getFullYear(),
    today.getMonth() + 4,
    0
  );

  const getMaxStayDays = (checkIn) => {
    if (!checkIn) return 3;

    const month = new Date(checkIn).getMonth() + 1;

    if (month === 4 || month === 12) {
      return 2;
    }

    return 3;
  };

 const maxStayDays = getMaxStayDays(checkInDate);

  const maxCheckoutDate = checkInDate
    ? (() => {
      const d = new Date(checkInDate);
      d.setDate(d.getDate() + maxStayDays);
      return d;
    })()
    : null;

  const bungalowOptions = [
    {
      value: 1,
      label: "Main Bungalow",
      maxCapacity: 16,
      description: "Maximum 16 guests (adults + children)"
    },
  ];

   
  const isDateUnderMaintenance = useCallback((date) => {
    if (!date || maintenanceDates.size === 0) return false;
    
    const dateStr = format(date, "yyyy-MM-dd");
    return maintenanceDates.has(dateStr);
  }, [maintenanceDates]);

   
  const isDateRangeUnderMaintenance = useCallback((startDate, endDate) => {
    if (!startDate || !endDate || maintenanceDates.size === 0) return false;
    
    const currentDate = new Date(startDate);
    const targetDate = new Date(endDate);
    
    while (currentDate <= targetDate) {
      if (isDateUnderMaintenance(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return false;
  }, [isDateUnderMaintenance]);

  
  const shouldDisableDate = useCallback((date) => {
     
    if (isDateUnderMaintenance(date)) {
      return true;
    }
    
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (checkDate < today) {
      return true;
    }
    
    return false;
  }, [isDateUnderMaintenance]);

  const stopCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    setCountdownActive(false);
    setSecondsRemaining(600);
  }, []);

  const startCountdown = useCallback(() => {
    stopCountdown();

    setSecondsRemaining(600);
    setCountdownActive(true);

    countdownIntervalRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          handleAutoClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopCountdown]);

  const resetCountdown = useCallback(() => {
    const now = Date.now();
    if (now - lastResetTimeRef.current > RESET_COOLDOWN) {
      stopCountdown();
      startCountdown();
      lastResetTimeRef.current = now;
    }
  }, [startCountdown, stopCountdown]);

  const handleAutoClose = useCallback(() => {
    Swal.fire({
      icon: "warning",
      title: "Time's Up!",
      text: "Your booking session has expired. Please start over.",
      confirmButtonColor: "#3f51b5",
    }).then(() => {
      handleCloseModal();
    });
  }, []);

  const handleCloseModal = useCallback((event, reason) => {
    if (isClosing) return;

    setIsClosing(true);

    stopCountdown();

    if (reason === 'backdropClick' && countdownActive) {
      setIsClosing(false);
      return;
    }

    setCheckInDate(null);
    setCheckOutDate(null);
    setBungalowType("");
    setAdults(1);
    setChildren(0);
    setGuestName("");
    setRemarks("");
    setCapacityError("");
    handleClose();
    setIsClosing(false);
  }, [stopCountdown, countdownActive, handleClose, isClosing]);

  const handleCancel = useCallback(() => {
    Swal.fire({
      icon: "question",
      title: "Cancellation",
      text: "Are you sure you want to cancel this?",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No, Go Back",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#3f51b5",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);

          const res = await dispatch(UpdateResStatus());

          if (res?.success) {
            Swal.fire({
              icon: "success",
              title: "Cancelled!",
              text: "cancelled successfully.",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            }).then(() => {
              handleCloseModal();
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Cancellation Failed",
            text:
              error?.response?.data?.Result ||
              "Unable to cancel reservation",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  }, [dispatch, handleCloseModal]);

  useEffect(() => {
    return () => {
      stopCountdown();
    };
  }, [stopCountdown]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      stopCountdown();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      stopCountdown();
    };
  }, [stopCountdown]);

  useEffect(() => {
    if (open) {
      setCheckInDate(null);
      setCheckOutDate(null);
      setBungalowType("");
      setAdults(1);
      setChildren(0);
      setGuestName("");
      setRemarks("");
      setCapacityError("");
      setLoading(false);

      const timer = setTimeout(() => {
        startCountdown();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      stopCountdown();
    }
  }, [open, startCountdown, stopCountdown]);

  const handleBungalowChange = (e) => {
    setBungalowType(e.target.value);
  };

  const handleAdultsChange = (e) => {
    setAdults(parseInt(e.target.value));
  };

  const handleChildrenChange = (e) => {
    setChildren(parseInt(e.target.value));
  };

  const handleCheckInChange = (newValue) => {
    setCheckInDate(newValue);
    setCheckOutDate(null);
  };

  const handleCheckOutChange = (newValue) => {
    setCheckOutDate(newValue);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

 
  const selectedBungalow = bungalowOptions.find(option => option.value === bungalowType);

  useEffect(() => {
    if (selectedBungalow) {
      const totalGuests = adults + children;
      if (totalGuests > selectedBungalow.maxCapacity) {
        setCapacityError(`Exceeds maximum capacity of ${selectedBungalow.maxCapacity} guests for ${selectedBungalow.label}`);
      } else if (totalGuests === 0) {
        setCapacityError("At least 1 guest is required");
      } else {
        setCapacityError("");
      }
    }
  }, [bungalowType, adults, children, selectedBungalow]);

  const handleBookClick = async () => {
    stopCountdown();

     
    if (!checkInDate || !checkOutDate || !bungalowType) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please select Check-in Date, Check-out Date and Bungalow Type.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    
    if (checkInDate > checkOutDate) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Dates",
        text: "Check-out date must be after check-in date.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

     
    if (checkInDate && isDateUnderMaintenance(checkInDate)) {
      Swal.fire({
        icon: "warning",
        title: "Maintenance Period",
        text: "Check-in date is during maintenance period. Please select another date.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    if (checkOutDate && isDateUnderMaintenance(checkOutDate)) {
      Swal.fire({
        icon: "warning",
        title: "Maintenance Period",
        text: "Check-out date is during maintenance period. Please select another date.",
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    
    if (checkInDate && checkOutDate) {
      const hasMaintenance = isDateRangeUnderMaintenance(checkInDate, checkOutDate);
      
      if (hasMaintenance) {
        Swal.fire({
          icon: "warning",
          title: "Maintenance Period",
          text: "Selected date range includes maintenance period. Please select different dates.",
          confirmButtonColor: "#3f51b5",
        });
        startCountdown();
        return;
      }
    }

    
    if (capacityError) {
      Swal.fire({
        icon: "warning",
        title: "Capacity Exceeded",
        text: capacityError,
        confirmButtonColor: "#3f51b5",
      });
      startCountdown();
      return;
    }

    const confirmation = await Swal.fire({
      icon: "question",
      title: "Closed",
      text: "Are you sure you  ?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Not Yet",
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#f44336",
    });

    if (confirmation.isConfirmed) {
      try {
        setLoading(true);
        const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
        const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");
        const sno = localStorage.getItem("sno");
        const logId = localStorage.getItem("logId");

        const response = await axios.post(
          `Reservation/PostBooking?P_BUNGALOW_ID=${bungalowType}&P_CHECK_IN=${formattedCheckIn}&P_CHECK_OUT=${formattedCheckOut}&P_LOG_ID=${logId}&P_SERIAL_NO=${sno}&P_STATUS=B`,
          {},
          {
            headers: {
              "auth-key": authKey,
            },
          }
        );

        if (response.data.StatusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Closed",
            text: "success",
            confirmButtonColor: "#4caf50",
          }).then(() => {
            handleCloseModal();
            window.location.reload();
          });
        } else {
          throw new Error(response.data.Result || "Booking Failed");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: error.message || error.Result || "Booking already exists for this period.",
          confirmButtonColor: "#f44336",
        });

        startCountdown();
      } finally {
        setLoading(false);
      }
    } else {
      startCountdown();
    }
  };

  const handleCancelModalClose = () => {
    setCancelModalOpen(false);
  };

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return null;
  };

  const nights = calculateNights();
  const totalGuests = adults + children;

   
  const renderDay = (day, _value, DayComponentProps) => {
    const isMaintenance = isDateUnderMaintenance(day);
    const isSelected = DayComponentProps.selected;
    
    return (
      <PickersDay
        {...DayComponentProps}
        disabled={isMaintenance || DayComponentProps.disabled}
        sx={{
          ...(isMaintenance && {
            backgroundColor: '#FFF3E0 !important',
            color: '#FF9800 !important',
            fontWeight: 'bold',
            opacity: 0.7,
            '&:hover': {
              backgroundColor: '#FFE0B2 !important',
            },
            '&.Mui-selected': {
              backgroundColor: '#FF9800 !important',
              color: 'white !important',
            },
          }),
        }}
      >
        <MaintenanceDay 
          day={day} 
          isSelected={isSelected} 
          isMaintenance={isMaintenance} 
        />
      </PickersDay>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (
            countdownActive &&
            (reason === "backdropClick" || reason === "escapeKeyDown")
          ) {
            return;
          }

          handleCloseModal(event, reason);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown={countdownActive}
      >
        <Box sx={style}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#1976d2",
              color: "white",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              position: "relative",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "500" }}>
               Reservation Closed
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCancel}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "white",
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              disabled={isClosing}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Countdown Timer */}
          {/* {countdownActive && (
            <Box sx={{ px: 3, pt: 2 }}>
              <CountdownTimer
                secondsRemaining={secondsRemaining}
                totalSeconds={600}
              />
            </Box>
          )} */}

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {/* Bungalow Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  color: "#1976d2",
                }}
              >
                <HomeIcon sx={{ mr: 1 }} /> Select Bungalow
              </Typography>
              <TextField
                select
                fullWidth
                variant="outlined"
                placeholder="Select a bungalow type"
                value={bungalowType}
                onChange={handleBungalowChange}
                required
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                {bungalowOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box>
                      <Typography variant="body1">{option.label}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {option.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            {/* Dates Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "500",
                  color: "#1976d2",
                }}
              >
                <CalendarMonthIcon sx={{ mr: 1 }} /> Select Dates
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    value={checkInDate}
                    onChange={handleCheckInChange}
                    disabled={loading}
                    minDate={today}
                    //maxDate={maxSelectableDate}
                   // shouldDisableDate={shouldDisableDate}
                    renderDay={renderDay}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: checkInDate && isDateUnderMaintenance(checkInDate),
                        helperText: checkInDate && isDateUnderMaintenance(checkInDate) 
                          ? "Date is under maintenance"
                          : "",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="End Date"
                    value={checkOutDate}
                    onChange={handleCheckOutChange}
                    disabled={loading || !checkInDate}
                    minDate={checkInDate || today}
                   // maxDate={maxCheckoutDate}
                   // shouldDisableDate={shouldDisableDate}
                    renderDay={renderDay}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: checkOutDate && isDateUnderMaintenance(checkOutDate),
                        helperText: checkOutDate && isDateUnderMaintenance(checkOutDate)
                          ? "Date is under maintenance"
                          : "",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Maintenance warnings */}
              {checkInDate && isDateUnderMaintenance(checkInDate) && (
                <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <BlockIcon sx={{ mr: 1 }} />
                  Selected check-in date is under maintenance. Please choose another date.
                </Alert>
              )}

              {checkOutDate && isDateUnderMaintenance(checkOutDate) && (
                <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <BlockIcon sx={{ mr: 1 }} />
                  Selected check-out date is under maintenance. Please choose another date.
                </Alert>
              )}

              {checkInDate && checkOutDate && isDateRangeUnderMaintenance(checkInDate, checkOutDate) && (
                <Alert severity="warning" sx={{ mt: 1, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
                  <BlockIcon sx={{ mr: 1 }} />
                  Selected date range includes maintenance period. Please select different dates.
                </Alert>
              )}

              {/* {nights && (
                <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                  <Chip
                    label={`${nights} ${nights === 1 ? "night" : "nights"}`}
                    color="primary"
                    size="small"
                  />
                </Box>
              )} */}
            </Box>

            {/* Points Section (Optional) */}
            {/* <PointsEarnedIcon /> */}

            <ReservationCancelModal
              open={cancelModalOpen}
              handleClose={handleCancelModalClose}
            />
          </Box>

          {/* Footer with Actions */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#f5f5f5",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              borderTop: "1px solid #e0e0e0",
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleBookClick}
              disabled={loading || !!capacityError || isClosing || 
                (checkInDate && isDateUnderMaintenance(checkInDate)) ||
                (checkOutDate && isDateUnderMaintenance(checkOutDate)) ||
                (checkInDate && checkOutDate && isDateRangeUnderMaintenance(checkInDate, checkOutDate))
              }
              startIcon={
                loading && <CircularProgress size={20} color="inherit" />
              }
              sx={{
                borderRadius: 2,
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#303f9f",
                },
                "&:disabled": {
                  bgcolor: "#cccccc",
                },
                minWidth: '140px',
              }}
            >
              {loading ? "Booking..." : "Confirm"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={loading || isClosing}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default CloseModal;