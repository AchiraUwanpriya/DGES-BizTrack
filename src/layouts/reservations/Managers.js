import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ReservationModal from "../../components/Utility/Reservations/ReservationModal";
import FeedbackModal from "../../components/Utility/Reservations/FeedbackModal";
import TermsModal from "../../components/Utility/Reservations/TermsModal";
import HistoryModal from "../../components/Utility/Reservations/HistoryModal";
import MaintenanceModal from "../../components/Utility/Reservations/MaintainModal";
import CloseModal from "../../../src/layouts/reservations/CloseModal";
import SpecialModal from "../../../src/layouts/reservations/SpecialGuest";
import { GetLoadResDetails, GetPriorityListByDate, PostResvationLog, UpdateResStatus } from "../../action/Reservation";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PrintIcon from '@mui/icons-material/Print';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CottageSharp } from "@mui/icons-material";
import CaretakerModal from "../../components/Utility/Reservations/CaretakerModal";
import { useAuth } from "../../../src/context/AuthContext";
import Loader from "../../components/Utility/Loader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from '@mui/icons-material/Close';
import HotelIcon from '@mui/icons-material/Hotel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import BadgeIcon from '@mui/icons-material/Badge';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FilterListIcon from '@mui/icons-material/FilterList';


const Reservations = () => {
    const dispatch = useDispatch();
    const { authKey } = useAuth();
    const reservationData = useSelector((state) => state.loadResDetails);
    const { loading, error } = reservationData || {};
    const loadResDetails = reservationData?.responseBody || [];
    const navigate = useNavigate();

    const [currentUserServiceNo, setCurrentUserServiceNo] = useState("");
    const [showOnlyMyReservations, setShowOnlyMyReservations] = useState(false);

    const [reservationModalOpen, setReservationModalOpen] = useState(false);
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [maintainModalOpen, setMaintainModalOpen] = useState(false);
    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [specialModalOpen, setSpecialModalOpen] = useState(false);
    const [selectedBungalows, setSelectedBungalows] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [reserveLoading, setReserveLoading] = useState(false);
    const [startDate, setStartDate] = useState(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
    );
    const [endDate, setEndDate] = useState(
        new Date(new Date().setMonth(new Date().getMonth() + 6))
    );
    const [caretakerModalOpen, setCaretakerModalOpen] = useState(false);
    const [selectedReservationForCaretaker, setSelectedReservationForCaretaker] = useState(null);
    const [guestDetailsModalOpen, setGuestDetailsModalOpen] = useState(false);
    const [selectedGuestDetails, setSelectedGuestDetails] = useState(null);
    const [currentViewingMonth, setCurrentViewingMonth] = useState(new Date());
    const [priorityListData, setPriorityListData] = useState({});
    const [loadingPriorityList, setLoadingPriorityList] = useState(false);
    const [maintenanceDates, setMaintenanceDates] = useState(new Set());

    useEffect(() => {
        const serviceNo = localStorage.getItem("ServiceNo");
        if (serviceNo) {
            setCurrentUserServiceNo(serviceNo);
        }
    }, []);

    const isCurrentUserReservation = (reservation) => {
        if (!currentUserServiceNo || !reservation) return false;
        return reservation.Res_Service_no === currentUserServiceNo;
    };

    const getGradeFromRemarks = (remarks) => {
        if (!remarks || remarks === "N/A" || remarks.trim() === "") return null;

        const gradeMatch = remarks.match(/Grade\s*([A-Z])/i) || remarks.match(/^([A-Z])$/i);
        if (gradeMatch && gradeMatch[1]) {
            return gradeMatch[1].toUpperCase();
        }

        if (remarks.length === 1 && /^[A-Z]$/i.test(remarks)) {
            return remarks.toUpperCase();
        }

        return null;
    };

    const getGradeColor = (grade) => {
        if (!grade) return '#757575';

        switch (grade.toUpperCase()) {
            case 'A': return '#4caf50';
            case 'B': return '#2196f3';
            case 'C': return '#ff9800';
            case 'D': return '#f44336';
            case 'E': return '#9c27b0';
            case 'F': return '#607d8b';
            case 'G': return '#795548';
            case 'H': return '#009688';
            default: return '#757575';
        }
    };

    const getGradeBackgroundColor = (grade) => {
        if (!grade) return '#f5f5f5';

        switch (grade.toUpperCase()) {
            case 'A': return '#e8f5e9';
            case 'B': return '#e3f2fd';
            case 'C': return '#fff3e0';
            case 'D': return '#ffebee';
            case 'E': return '#f3e5f5';
            case 'F': return '#eceff1';
            case 'G': return '#efebe9';
            case 'H': return '#e0f2f1';
            default: return '#f5f5f5';
        }
    };

    const getGuestNamesForDate = async (bungalowId, date) => {
        try {
            setLoadingPriorityList(true);
            const priorityData = await dispatch(GetPriorityListByDate(bungalowId, date));

            if (priorityData && priorityData.length > 0) {

                const sortedGuests = [...priorityData].sort((a, b) =>
                    parseInt(a.Res_Priority) - parseInt(b.Res_Priority)
                );

                const totalCount = sortedGuests.length;


                const guestsWithGrades = sortedGuests.map((guest) => {
                    const grade = getGradeFromRemarks(guest.Res_Remarks);
                    const isCurrentUser =
                        currentUserServiceNo && guest.Res_Service_no === currentUserServiceNo;

                    let displayName = "Pending Reservation";

                    if (isCurrentUser) {
                        displayName = grade
                            ? `${guest.Res_Guest_Name} (Grade ${grade})`
                            : guest.Res_Guest_Name;
                    } else {
                        displayName = grade ? `Grade ${grade}` : "Pending Reservation";
                    }

                    return {
                        ...guest,
                        displayName,
                        grade,
                        position: parseInt(guest.Res_Priority),
                        isCurrentUser
                    };
                });


                const primaryGuestWithGrade = guestsWithGrades.find(guest => guest.position === 1);


                const currentUserGuest = guestsWithGrades.find(guest =>
                    guest.Res_Service_no === currentUserServiceNo
                );

                return {
                    primaryGuest: primaryGuestWithGrade ? {
                        name: currentUserServiceNo && primaryGuestWithGrade.Res_Service_no === currentUserServiceNo
                            ? primaryGuestWithGrade.Res_Guest_Name
                            : (primaryGuestWithGrade.grade ? `Grade ${primaryGuestWithGrade.grade}` : "Pending Reservation"),
                        originalName: primaryGuestWithGrade.Res_Guest_Name,
                        reservationNo: primaryGuestWithGrade.Res_no,
                        priority: primaryGuestWithGrade.Res_Priority,
                        grade: primaryGuestWithGrade.grade,
                        isCurrentUser: currentUserServiceNo && primaryGuestWithGrade.Res_Service_no === currentUserServiceNo
                    } : null,
                    additionalGuests: guestsWithGrades.filter(guest => guest.position !== 1),
                    allGuests: guestsWithGrades,
                    totalCount: totalCount,
                    currentUserInList: !!currentUserGuest
                };
            }

            return {
                primaryGuest: null,
                additionalGuests: [],
                allGuests: [],
                totalCount: 0,
                currentUserInList: false
            };
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load guest details',
            });
            return {
                primaryGuest: null,
                additionalGuests: [],
                allGuests: [],
                totalCount: 0,
                currentUserInList: false
            };
        } finally {
            setLoadingPriorityList(false);
        }
    };

    useEffect(() => {
        dispatch(GetLoadResDetails());
    }, [dispatch]);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const generateMonthData = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = getDaysInMonth(year, month);

        return Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const weekday = new Date(year, month, day)
                .toLocaleString("default", { weekday: "short" })
                .toUpperCase();

            const formattedMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedFullDate = `${year}-${formattedMonth}-${formattedDay}`;

            return { date: day, day: weekday, formattedFullDate };
        });
    };

    const currentMonthData = generateMonthData(currentViewingMonth);

    const processReservations = () => {

        const reservationsByDate = {};
        if (Array.isArray(loadResDetails)) {
            loadResDetails.forEach((reservation) => {
                const checkIn = new Date(reservation.Res_Check_In);
                const checkOut = new Date(reservation.Res_Check_Out);
                const bangId = reservation.Res_Bang_Id;
                const resno = reservation.R;

                for (
                    let d = new Date(checkIn);
                    d <= checkOut;
                    d.setDate(d.getDate() + 1)
                ) {
                    const dateStr = d.toISOString().split("T")[0];


                    if (!reservationsByDate[dateStr]) {
                        reservationsByDate[dateStr] = {
                            main: [],
                            family: [],
                        };
                    }

                    if (bangId === "1") {
                        reservationsByDate[dateStr].main.push(reservation);

                    }

                }
            });

            Object.keys(reservationsByDate).forEach(dateStr => {
                ['main', 'family'].forEach(bungalowType => {
                    const reservations = reservationsByDate[dateStr][bungalowType];
                    if (reservations.length > 1) {

                        reservationsByDate[dateStr][bungalowType] = reservations.sort((b, a) => {
                            const today = dateStr;
                            const aCheckInToday = new Date(a.Res_Check_In).toDateString() === new Date(today).toDateString();
                            const bCheckInToday = new Date(b.Res_Check_In).toDateString() === new Date(today).toDateString();
                            const bCheckInToday1 = new Date(b.Res_Check_In).toDateString() > new Date(today).toDateString();

                            const aCheckOutToday = new Date(a.Res_Check_Out).toDateString() === new Date(today).toDateString();
                            const bCheckOutToday = new Date(b.Res_Check_Out).toDateString() === new Date(today).toDateString();
                            const bCheckOutToday1 = new Date(b.Res_Check_Out) > new Date(today);

                            if (aCheckOutToday && bCheckOutToday) return 0;
                            if (aCheckOutToday && bCheckOutToday1) return -1;


                            if (a.seq_no !== b.seq_no) return a.seq_no - b.seq_no;


                            return a.priority - b.priority;
                        });




                    }
                });
            });
        }

        return reservationsByDate;
    };



    useEffect(() => {
        if (!loadResDetails || !Array.isArray(loadResDetails)) return;

        const newSelected = {};

        loadResDetails.forEach((reservation) => {
            const checkIn = new Date(reservation.Res_Check_In);
            const checkOut = new Date(reservation.Res_Check_Out);

            for (
                let d = new Date(checkIn);
                d <= checkOut;
                d.setDate(d.getDate() + 1)
            ) {
                const dateStr = d.toISOString().split("T")[0];

                if (!newSelected[dateStr]) {
                    newSelected[dateStr] = {
                        MainBungalow: false,
                        FamilyBungalow: false,
                    };
                }

                if (reservation.Res_Bang_Id === "1") {
                    newSelected[dateStr].MainBungalow = true;
                } else if (reservation.Res_Bang_Id === "2") {
                    newSelected[dateStr].FamilyBungalow = true;
                }
            }
        });
        setSelectedBungalows(newSelected);
    }, [loadResDetails]);

    const reservationsByDate = processReservations();

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "#FFF3E0";
            case "Confirmed":
                return "#E8F5E9";
            case "C":
                return "#FFEBEE";
            case "B":
                return "#E3F2FD";
            default:
                return "white";
        }
    };

    const getDisplayNameForReservation = (reservation) => {
        if (!reservation) return "";

        if (reservation.Res_Status === "B") {
            return "Maintenance";
        }

        const grade = getGradeFromRemarks(reservation.Res_Remarks);
        const isCurrentUser = isCurrentUserReservation(reservation);

        const filteredDates = currentMonthData.filter(
            item => item.formattedFullDate === reservation.Res_Check_In
        );

        const userFilteredDates = filterDatesByAnotherReservation(filteredDates);

        const userFilterCount = userFilteredDates.length > 0;

        if (isCurrentUser && !userFilterCount) {
            return grade
                ? `${reservation.Res_Guest_Name || "My Reservation"} (${grade})`
                : reservation.Res_Guest_Name || "My Reservation";
        } else {
            return grade ? `Reserved / Grade ${grade}` : "Pending Reservation";
        }
    };

    const getDisplayNameForCheckout = (reservation) => {
        if (!reservation) return "";


        if (reservation.Res_Status === "B") {
            return "Maintenance";
        }

        const grade = getGradeFromRemarks(reservation.Res_Remarks);
        const isCurrentUser = isCurrentUserReservation(reservation);

        if (isCurrentUser) {
            return grade
                ? `${reservation.Res_Guest_Name || "My Reservation"} (${grade})`
                : reservation.Res_Guest_Name || "My Reservation";

        }
        else {

            return grade ? `Grade ${grade}` : "Pending Reservation";
        }
    };


    const getMaintenanceDates = useCallback(() => {
        const maintenanceDates = new Set();

        if (Array.isArray(loadResDetails)) {
            loadResDetails.forEach((reservation) => {
                if (reservation.Res_Status === "B") {
                    const checkIn = new Date(reservation.Res_Check_In);
                    const checkOut = new Date(reservation.Res_Check_Out);


                    for (
                        let d = new Date(checkIn);
                        d <= checkOut;
                        d.setDate(d.getDate() + 1)
                    ) {
                        const dateStr = d.toISOString().split("T")[0];
                        maintenanceDates.add(dateStr);
                    }
                }
            });
        }

        return maintenanceDates;
    }, [loadResDetails]);


    useEffect(() => {
        if (loadResDetails && Array.isArray(loadResDetails)) {
            const dates = getMaintenanceDates();
            setMaintenanceDates(dates);
        }
    }, [loadResDetails, getMaintenanceDates]);

    const getReservationCellBackground = (reservation, isCurrentUser) => {
        if (!reservation) return "white";

        if (reservation.Res_Status === "B") {
            return "#fae9b1";
        }

        if (isCurrentUser) {
            return "#E8F5E9";
        } else {

            const grade = getGradeFromRemarks(reservation.Res_Remarks);
            if (grade) {
                return "#e4e0e0";
            }
            return "#f5f5f5";
        }
    };

    const getReservationTextColor = (reservation, isCurrentUser) => {
        if (!reservation) return "inherit";

        if (reservation.Res_Status === "B") {
            return "#757575";
        }

        if (isCurrentUser) {
            return "#2E7D32";
        } else {

            const grade = getGradeFromRemarks(reservation.Res_Remarks);
            if (grade) {
                return "#757575";
            }
            return "#757575";
        }
    };

    const getGradeForReservation = (reservation) => {
        if (!reservation) return null;
        return getGradeFromRemarks(reservation.Res_Remarks);
    };

    const handleReserveClick = async () => {
        setReserveLoading(true);
        try {
            const result = await dispatch(PostResvationLog());

            if (result && result.success) {
                setCloseModalOpen(true);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.StatusCode === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Session Error',
                    text: error.response.data.Result || 'Someone is already in the reservation session.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            }
            else if (error.response && error.response.data && error.response.data.StatusCode !== 200) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Reservation Not Available',
                    text: error.response.data.Message || 'Someone is already in the reservation session.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                });
            }

            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to check reservation availability. Please try again.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            }

        } finally {
            setReserveLoading(false);
        }
    };


        const handleSpecialGuestClick = async () => {
        setReserveLoading(true);
        try {
            const result = await dispatch(PostResvationLog());

            if (result && result.success) {
                setSpecialModalOpen(true);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.StatusCode === 500) {
                Swal.fire({
                    icon: 'error',
                    title: 'Session Error',
                    text: error.response.data.Result || 'Someone is already in the reservation session.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            }
            else if (error.response && error.response.data && error.response.data.StatusCode !== 200) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Reservation Not Available',
                    text: error.response.data.Message || 'Someone is already in the reservation session.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                });
            }

            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to check reservation availability. Please try again.',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            }

        } finally {
            setReserveLoading(false);
        }
    };

    const handleFeedbackClick = () => {
        setFeedbackModalOpen(true);
    };

    const handleTermsClick = () => {
        setTermsModalOpen(true);
    };

    const handleHistoryClick = () => {
        setHistoryModalOpen(true);
    };

    const handleMaintainClick = () => {
        setMaintainModalOpen(true);
    };
    const handleCloseClick = () => {
        setCloseModalOpen(true);
    };

    const handleSpecialClick = () => {
        setSpecialModalOpen(true);
    };


    const goToPreviousMonth = () => {
        setCurrentViewingMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentViewingMonth(prev => {
            const newDate = new Date(prev);

            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + 1);

            return newDate;
        });
    };


    const goToCurrentMonth = () => {
        setCurrentViewingMonth(new Date());
    };

    const getStatusChip = (status, customColor) => {
        let color = customColor || "default";
        let label = status;

        if (!customColor) {
            switch (status) {
                case "Pending":
                    color = "warning";
                    break;
                case "Confirmed":
                    color = "primary";
                    break;
                case "C":
                    color = "error";
                    label = "Cancelled";
                    break;
                case "B":
                    color = "default";
                    label = "Close";
                    break;
                default:
                    color = "default";
            }
        }

        return (
            <Chip
                label={label}
                color={color}
                size="small"
                sx={{
                    fontSize: "10px",
                    height: "22px",
                }}
            />
        );
    };

    const isDateInRange = (dateStr) => {
        const date = new Date(dateStr);
        return date >= startDate && date <= endDate;
    };

    const isCheckInDate = (reservation, dateStr) => {
        if (!reservation || !dateStr) return false;
        const checkInDate = new Date(reservation.Res_Check_In).toISOString().split('T')[0];
        return checkInDate === dateStr;
    };

    const isCheckOutDate = (reservation, dateStr) => {
        if (!reservation || !dateStr) return false;
        if (reservation.Res_Status === "B") return false;


        const checkOutDate = new Date(reservation.Res_Check_Out).toISOString().split('T')[0];
        return checkOutDate === dateStr;
    };

    const handleGuestNameClick = async (reservation, date, bungalowType) => {
        if (reservation.Res_Status === "B") {
            return;
        }
        try {
            const guestData = await getGuestNamesForDate(reservation.Res_Bang_Id, date);

            const currentGuestInPriorityList = guestData.allGuests.find(
                guest => guest.Res_no === reservation.Res_no
            );

            const currentGrade = currentGuestInPriorityList?.grade || null;
            const currentPriority = currentGuestInPriorityList?.Res_Priority || "1";
            const isCurrentUserInPriorityList = currentGuestInPriorityList?.isCurrentUser || false;

            setSelectedGuestDetails({
                primaryGuest: guestData.primaryGuest,
                currentGuest: {
                    name: isCurrentUserInPriorityList
                        ? currentGuestInPriorityList.Res_Guest_Name
                        : (currentGrade ? `Grade ${currentGrade}` : "Pending Reservation"),
                    originalName: reservation.Res_Guest_Name,
                    reservationNo: reservation.Res_no,
                    priority: currentPriority,
                    grade: currentGrade,
                    position: parseInt(currentPriority),
                    isCurrentUser: isCurrentUserInPriorityList
                },
                additionalGuests: guestData.additionalGuests,
                bungalowType: bungalowType,
                date: date,
                reservation: reservation,
                priorityList: guestData.allGuests,
                totalCount: guestData.totalCount,
                isCurrentUser: isCurrentUserReservation(reservation),
                currentUserInPriorityList: guestData.currentUserInList
            });
            setGuestDetailsModalOpen(true);
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load guest details',
            });
        }
    };

    const handleCaretakerClick = () => {
        setCaretakerModalOpen(true);
    };

    const filterDatesByAnotherReservation = (dates) => {


        return dates.filter(item => {

            const dateData = reservationsByDate[item.formattedFullDate] || { main: [], family: [] };

            const hasUserReservation =
                dateData.main.some(res => !isCurrentUserReservation(res) && res.Res_Check_Out != item.formattedFullDate && res.Res_Priority === "1") ||
                dateData.family.some(res => !isCurrentUserReservation(res) && res.Res_Check_Out != item.formattedFullDate && res.Res_Priority === "1");

            return hasUserReservation;
        });
    };

    const filterDatesByUserReservation = (dates) => {
        if (!showOnlyMyReservations || !currentUserServiceNo) return dates;

        return dates.filter(item => {
            const dateData = reservationsByDate[item.formattedFullDate] || { main: [], family: [] };

            const hasUserReservation =
                dateData.main.some(res => isCurrentUserReservation(res)) ||
                dateData.family.some(res => isCurrentUserReservation(res));

            return hasUserReservation;
        });
    };

    const filteredDates = currentMonthData.filter((item) =>
        isDateInRange(item.formattedFullDate)
    );

    const userFilteredDates = filterDatesByUserReservation(filteredDates);
    const displayDates = showOnlyMyReservations ? userFilteredDates : filteredDates;

    const monthYearDisplay = currentViewingMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const getReservationNumberForDate = (reservation, dateStr) => {
        const isCheckIn = isCheckInDate(reservation, dateStr);
        const isCheckOut = isCheckOutDate(reservation, dateStr);


        if (isCheckOut) {
            return `${reservation.Res_no} (Out)`;
        }


        if (isCheckIn) {
            return `${reservation.Res_no} (In)`;
        }


        return reservation.Res_no;
    };


    const formatDateCompact = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        return `${day}`;
    };

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <Container
                    maxWidth="xl"
                    sx={{
                        height: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        py: 1,
                        maxWidth: "98% !important"
                    }}
                >
                    <Card elevation={2} sx={{ mb: 1 }}>
                        <CardContent sx={{ pb: "8px !important", p: 1 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    component="h1"
                                    sx={{ fontWeight: "bold", color: "#000000" }}
                                >
                                    NEHB Reservation
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(-1)}
                                    sx={{ textTransform: "none", fontSize: '0.75rem' }}
                                    size="small"
                                >
                                    Back
                                </Button>
                            </Box>

                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end">
                                        <IconButton
                                            onClick={goToPreviousMonth}
                                            size="small"
                                            aria-label="Previous month"
                                        >
                                            <ChevronLeft />
                                        </IconButton>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                minWidth: '120px',
                                                textAlign: 'center',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {monthYearDisplay}
                                        </Typography>

                                        <IconButton
                                            onClick={goToNextMonth}
                                            size="small"
                                            aria-label="Next month"
                                        >
                                            <ChevronRight />
                                        </IconButton>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={goToCurrentMonth}
                                            sx={{ ml: 0.5, fontSize: '0.7rem' }}
                                        >
                                            Month
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            maxHeight: "calc(100vh - 120px)",
                        }}
                    >
                        <CardContent
                            sx={{
                                p: 1,
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    overflow: "hidden",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        flex: 1,
                                        overflow: "hidden",
                                        border: "1px solid #e0e0e0",
                                        borderRadius: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            overflow: "auto",
                                            flex: 1,
                                            "&::-webkit-scrollbar": {
                                                width: "4px",
                                                height: "4px",
                                            },
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: "#bdbdbd",
                                                borderRadius: "4px",
                                            },
                                            "&::-webkit-scrollbar-track": {
                                                backgroundColor: "#f5f5f5",
                                            },
                                        }}
                                    >
                                        <Table
                                            size="small"
                                            stickyHeader
                                            sx={{
                                                tableLayout: "fixed",
                                                minWidth: "100%",
                                                '& .MuiTableCell-root': {
                                                    padding: '2px 4px',
                                                    lineHeight: '1.1',
                                                    borderBottom: '0.5px solid #b9b8b8ff',
                                                },
                                                '& .MuiTableRow-root': {
                                                    height: '28px',
                                                }
                                            }}
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "10px",
                                                            width: "30px",
                                                            textAlign: "center",
                                                            backgroundColor: "#1976D2",
                                                            color: "white",
                                                            padding: '2px 1px',
                                                        }}
                                                    >
                                                        Date
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "10px",
                                                            width: "50px",
                                                            textAlign: "center",
                                                            backgroundColor: "#1976D2",
                                                            color: "white",
                                                            padding: '2px 1px',
                                                        }}
                                                    >
                                                        Bungalow
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "10px",
                                                            width: "70px",
                                                            textAlign: "center",
                                                            backgroundColor: "#1976D2",
                                                            color: "white",
                                                            padding: '2px 1px',
                                                        }}
                                                    >
                                                        Res No
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "10px",
                                                            width: "120px",
                                                            textAlign: "center",
                                                            backgroundColor: "#1976D2",
                                                            color: "white",
                                                            padding: '2px 4px',
                                                        }}
                                                    >
                                                        Reserved By
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: "bold",
                                                            fontSize: "10px",
                                                            width: "80px",
                                                            textAlign: "center",
                                                            backgroundColor: "#1976D2",
                                                            color: "white",
                                                            padding: '2px 1px',
                                                        }}
                                                    >
                                                        Status
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {displayDates.map((item, index) => {
                                                    const dateData = reservationsByDate[
                                                        item.formattedFullDate
                                                    ] || { main: [], family: [] };
                                                    const mainReservations = dateData.main || [];

                                                    const familyReservations = dateData.family || [];
                                                    const mainReserved = mainReservations.length > 0;
                                                    const familyReserved = familyReservations.length > 0;

                                                    const mainStatus = mainReserved
                                                        ? mainReservations[0].Res_Status
                                                        : null;
                                                    const familyStatus = familyReserved
                                                        ? familyReservations[0].Res_Status
                                                        : null;

                                                    const isCurrentUserMainRes = mainReserved && isCurrentUserReservation(mainReservations[0]);
                                                    const isCurrentUserFamilyRes = familyReserved && isCurrentUserReservation(familyReservations[0]);


                                                    const isMainCheckoutDate = mainReserved && isCheckOutDate(mainReservations[0], item.formattedFullDate);
                                                    const isFamilyCheckoutDate = familyReserved && isCheckOutDate(familyReservations[0], item.formattedFullDate);

                                                    const mainBgColor = isMainCheckoutDate
                                                        ? "white"
                                                        : getReservationCellBackground(mainReservations[0], isCurrentUserMainRes);

                                                    const familyBgColor = isFamilyCheckoutDate
                                                        ? "white"
                                                        : getReservationCellBackground(familyReservations[0], isCurrentUserFamilyRes);

                                                    const mainTextColor = isMainCheckoutDate
                                                        ? "inherit"
                                                        : getReservationTextColor(mainReservations[0], isCurrentUserMainRes);

                                                    const familyTextColor = isFamilyCheckoutDate
                                                        ? "inherit"
                                                        : getReservationTextColor(familyReservations[0], isCurrentUserFamilyRes);

                                                    const mainDisplayName = mainReserved
                                                        ? getDisplayNameForReservation(mainReservations[0])
                                                        : "Available";

                                                    const familyDisplayName = familyReserved
                                                        ? getDisplayNameForReservation(familyReservations[0])
                                                        : "Available";

                                                    let dateCellBgColor = "white";
                                                    if (mainReserved && familyReserved && !isMainCheckoutDate && !isFamilyCheckoutDate) {
                                                        if (
                                                            mainStatus === "Confirm" &&
                                                            familyStatus === "Confirm"
                                                        ) {
                                                            dateCellBgColor = getStatusColor("Confirm");
                                                        }
                                                    }

                                                    return (
                                                        <React.Fragment key={index}>
                                                            {/* Main Bungalow Row */}
                                                            <TableRow
                                                                sx={{
                                                                    height: "24px",
                                                                    "&:hover": {
                                                                        backgroundColor: mainReserved
                                                                            ? (isCurrentUserMainRes ? "#C8E6C9" : "#EEEEEE")
                                                                            : "#F1F8FF",
                                                                    },
                                                                    backgroundColor: mainBgColor,
                                                                    borderLeft: isCurrentUserMainRes ? "3px solid #4CAF50" : "none",
                                                                    position: "relative",
                                                                }}
                                                            >
                                                                <TableCell
                                                                    rowSpan={1}
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        borderRight: "1px solid #E0E0E0",
                                                                        fontWeight: "medium",
                                                                        backgroundColor: dateCellBgColor,
                                                                        fontSize: '9px',
                                                                        padding: '1px',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontWeight: "bold",
                                                                            fontSize: "14px",
                                                                            lineHeight: '1'
                                                                        }}
                                                                    >
                                                                        {formatDateCompact(item.formattedFullDate)}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                        sx={{ fontSize: '8px' }}
                                                                    >
                                                                        {item.day}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell
                                                                    sx={{
                                                                        borderRight: "1px solid #E0E0E0",
                                                                        backgroundColor: mainBgColor,
                                                                        fontSize: '10px',
                                                                        padding: '1px 2px',
                                                                    }}
                                                                >
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                        <Typography
                                                                            variant="body2"
                                                                            sx={{
                                                                                fontWeight: "medium",
                                                                                color: mainReserved ? "#9E9E9E" : "inherit",
                                                                                fontSize: "10px",
                                                                            }}
                                                                        >
                                                                            Main bungalow
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>

                                                                <TableCell
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        backgroundColor: mainBgColor,
                                                                        padding: '1px',
                                                                    }}
                                                                >
                                                                    {mainReserved ? (
                                                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                            {(() => {

                                                                                const checkoutReservations = loadResDetails.filter(res =>
                                                                                    res.Res_Bang_Id === "1" &&
                                                                                    res.Res_Status === "Confirmed" &&
                                                                                    isCheckOutDate(res, item.formattedFullDate)
                                                                                );


                                                                                const checkinReservations = loadResDetails.filter(res =>
                                                                                    res.Res_Bang_Id === "1" &&
                                                                                    res.Res_Status === "Confirmed" &&
                                                                                    isCheckInDate(res, item.formattedFullDate)
                                                                                );


                                                                                if (checkoutReservations.length > 0 && checkinReservations.length > 0) {

                                                                                    const checkoutRes = checkoutReservations[0];

                                                                                    const checkinRes = checkinReservations[0];

                                                                                    return (
                                                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                                            {getStatusChip(checkoutRes.Res_no, 'error')}
                                                                                            <Typography variant="caption" sx={{ fontSize: '10px', color: '#757575' }}>
                                                                                                /
                                                                                            </Typography>
                                                                                            {getStatusChip(checkinRes.Res_no, 'success')}
                                                                                        </Box>
                                                                                    );
                                                                                }


                                                                                if (checkoutReservations.length > 0) {
                                                                                    return getStatusChip(checkoutReservations[0].Res_no, 'error');
                                                                                }


                                                                                if (checkinReservations.length > 0) {
                                                                                    return getStatusChip(checkinReservations[0].Res_no, 'success');
                                                                                }


                                                                                if (mainReservations[0].Res_Status === "Confirmed") {
                                                                                    return getStatusChip(
                                                                                        mainReservations[0].Res_no,
                                                                                        null
                                                                                    );
                                                                                }

                                                                                return null;
                                                                            })()}
                                                                        </Box>
                                                                    ) : null}
                                                                </TableCell>

                                                                <TableCell
                                                                    sx={{
                                                                        borderRight: "1px solid #E0E0E0",
                                                                        fontSize: "10px",
                                                                        backgroundColor: mainBgColor,
                                                                        padding: '2px 4px !important',
                                                                        minWidth: '130px',
                                                                        maxWidth: '130px',
                                                                        width: '130px',
                                                                        overflow: 'hidden',
                                                                    }}
                                                                >
                                                                    {mainReserved ? (
                                                                        <Box sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: 0.5,
                                                                            width: '100%',
                                                                        }}>
                                                                            {/* Check if it's maintenance */}
                                                                            {mainReservations[0].Res_Status === "B" ? (
                                                                                <Typography
                                                                                    variant="body2"
                                                                                    sx={{
                                                                                        whiteSpace: "normal",
                                                                                        wordWrap: "break-word",
                                                                                        overflowWrap: "break-word",
                                                                                        fontWeight: "medium",
                                                                                        fontSize: "12px",
                                                                                        color: "#616161",
                                                                                        fontStyle: "italic",
                                                                                        display: "-webkit-box",
                                                                                        WebkitBoxOrient: "vertical",
                                                                                        WebkitLineClamp: 2,
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis",
                                                                                        lineHeight: "1.1",
                                                                                    }}
                                                                                >
                                                                                    Maintenance
                                                                                </Typography>
                                                                            ) : (
                                                                                <>
                                                                                    {/* Name row - always show the reservation name */}
                                                                                    <Typography
                                                                                        variant="body2"
                                                                                        sx={{
                                                                                            whiteSpace: "normal",
                                                                                            wordWrap: "break-word",
                                                                                            overflowWrap: "break-word",
                                                                                            fontWeight: isCurrentUserMainRes ? "bold" : "medium",
                                                                                            cursor: "pointer",
                                                                                            fontSize: "10px",
                                                                                            color: mainTextColor,
                                                                                            display: "-webkit-box",
                                                                                            WebkitBoxOrient: "vertical",
                                                                                            WebkitLineClamp: 2,
                                                                                            overflow: "hidden",
                                                                                            textOverflow: "ellipsis",
                                                                                            lineHeight: "1.1",
                                                                                            "&:hover": {
                                                                                                color: isCurrentUserMainRes ? "#1B5E20" : "#616161",
                                                                                            },
                                                                                        }}
                                                                                        onClick={() =>
                                                                                            mainReservations[0].Res_Status !== "B" &&
                                                                                            handleGuestNameClick(
                                                                                                mainReservations[0],
                                                                                                item.formattedFullDate,
                                                                                                "Main Bungalow"
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {isCheckOutDate(mainReservations[0], item.formattedFullDate)
                                                                                            ? `${getDisplayNameForCheckout(mainReservations[0])} / Available`
                                                                                            : mainDisplayName
                                                                                        }
                                                                                    </Typography>

                                                                                    {/* Indicators row */}
                                                                                    <Box sx={{
                                                                                        display: 'flex',
                                                                                        gap: 0.5,
                                                                                        flexWrap: 'wrap',
                                                                                    }}>
                                                                                        {isCheckInDate(mainReservations[0], item.formattedFullDate) && (
                                                                                            <Typography
                                                                                                variant="caption"
                                                                                                sx={{
                                                                                                    fontSize: '10px',
                                                                                                    fontWeight: 'bold',
                                                                                                    color: '#2e7d32',
                                                                                                    whiteSpace: 'nowrap',
                                                                                                }}
                                                                                            >
                                                                                                Check-In
                                                                                            </Typography>
                                                                                        )}

                                                                                        {isCheckOutDate(mainReservations[0], item.formattedFullDate) && (
                                                                                            <Typography
                                                                                                variant="caption"
                                                                                                sx={{
                                                                                                    fontSize: '10px',
                                                                                                    fontWeight: 'bold',
                                                                                                    color: '#d32f2f',
                                                                                                    whiteSpace: 'nowrap',
                                                                                                }}
                                                                                            >
                                                                                                Check-Out
                                                                                            </Typography>
                                                                                        )}
                                                                                    </Box>
                                                                                </>
                                                                            )}
                                                                        </Box>
                                                                    ) : (
                                                                        <Typography
                                                                            variant="body2"
                                                                            color="text.secondary"
                                                                            sx={{
                                                                                fontStyle: "italic",
                                                                                fontSize: "9px",
                                                                                whiteSpace: 'nowrap',
                                                                            }}
                                                                        >
                                                                            Available
                                                                        </Typography>
                                                                    )}
                                                                </TableCell>

                                                                <TableCell
                                                                    sx={{
                                                                        textAlign: "center",
                                                                        backgroundColor: mainBgColor,
                                                                        padding: '1px',
                                                                    }}
                                                                >
                                                                    {mainReserved && !isMainCheckoutDate
                                                                        ? getStatusChip(mainReservations[0].Res_Status)
                                                                        : null}
                                                                </TableCell>
                                                            </TableRow>
                                                        </React.Fragment>
                                                    );
                                                })}

                                                {showOnlyMyReservations && userFilteredDates.length === 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                                                <PersonIcon sx={{ fontSize: 40, color: 'text.secondary', opacity: 0.5 }} />
                                                                <Typography variant="body1" color="text.secondary">
                                                                    No reservations found for your service number
                                                                </Typography>
                                                                <Typography variant="caption" color="text.secondary">
                                                                    Try changing the month or disable the filter
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Paper>
                            </Box>

                            <Box
                                sx={{
                                    position: "sticky",
                                    bottom: 0,
                                    backgroundColor: "white",
                                    zIndex: 1,
                                    pt: 1,
                                    pb: 0,
                                    borderTop: "1px solid #e0e0e0",
                                }}
                            >
                                <Stack direction="row" spacing={0.5} justifyContent="center">
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={handleReserveClick}
                                        disabled={reserveLoading}
                                        sx={{
                                            textTransform: "none",
                                            fontSize: '0.7rem',
                                            minWidth: '80px'
                                        }}
                                    >
                                        {reserveLoading ? (
                                            <CircularProgress size={16} color="inherit" />
                                        ) : (
                                            'Reserve'
                                        )}
                                    </Button> */}
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        size="small"
                                        onClick={handleReserveClick}
                                        sx={{ textTransform: "none", fontSize: '0.7rem' }}
                                    >
                                        Close Maintenance
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={handleSpecialGuestClick}
                                        sx={{ textTransform: "none", fontSize: '0.7rem' }}
                                    >
                                        Special Guest Reserve
                                    </Button>

                                    {/* <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={handleMaintainClick}
                    sx={{ textTransform: "none", fontSize: '0.7rem' }}
                  >
                    Maintain
                  </Button> */}
                                    {/* <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={handleCaretakerClick}
                    sx={{ textTransform: "none", fontSize: '0.7rem' }}
                  >
                    My Reservation
                  </Button> */}
                                    {/* <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    onClick={handleTermsClick}
                    sx={{ textTransform: "none", fontSize: '0.7rem' }}
                  >
                    Terms
                  </Button> */}
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>

                    {/*======================================== Guest Details Modal ======================================= */}
                    <Dialog
                        open={guestDetailsModalOpen}
                        onClose={() => setGuestDetailsModalOpen(false)}
                        maxWidth="sm"
                        fullWidth
                        PaperProps={{
                            sx: {
                                borderRadius: 3,
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                overflow: 'hidden',
                                background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
                            }
                        }}
                    >
                        <Box
                            sx={theme => ({
                                background: theme.palette.mode === 'dark'
                                    ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`
                                    : `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                color: theme.palette.primary.contrastText,
                                p: 3,
                                position: 'relative',
                                overflow: 'hidden'
                            })}
                        >
                            <Box
                                sx={theme => ({
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 120,
                                    height: 120,
                                    borderRadius: '50%',
                                    background: theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.1)'
                                        : 'rgba(255, 255, 255, 0.15)'
                                })}
                            />
                            <Box
                                sx={theme => ({
                                    position: 'absolute',
                                    bottom: -30,
                                    left: -30,
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    background: theme.palette.mode === 'dark'
                                        ? 'rgba(255, 255, 255, 0.05)'
                                        : 'rgba(255, 255, 255, 0.08)'
                                })}
                            />

                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.5px' }}>
                                        Guest Details
                                    </Typography>
                                    <IconButton
                                        onClick={() => setGuestDetailsModalOpen(false)}
                                        size="small"
                                        sx={theme => ({
                                            color: theme.palette.primary.contrastText,
                                            background: theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.15)'
                                                : 'rgba(255, 255, 255, 0.25)',
                                            '&:hover': {
                                                background: theme.palette.mode === 'dark'
                                                    ? 'rgba(255, 255, 255, 0.25)'
                                                    : 'rgba(255, 255, 255, 0.35)'
                                            }
                                        })}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                    <Chip
                                        icon={<HotelIcon sx={{ fontSize: 16 }} />}
                                        label={selectedGuestDetails?.bungalowType}
                                        size="small"
                                        sx={theme => ({
                                            bgcolor: theme.palette.mode === 'dark'
                                                ? 'rgba(255, 255, 255, 0.15)'
                                                : 'rgba(255, 255, 255, 0.25)',
                                            color: theme.palette.primary.contrastText,
                                            fontWeight: 600,
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.3)'
                                        })}
                                    />

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <CalendarTodayIcon sx={{ fontSize: 16, opacity: 0.9 }} />
                                        <Typography variant="body2" sx={{ opacity: 0.95, fontWeight: 500 }}>
                                            {selectedGuestDetails?.date}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                                        <PeopleIcon sx={{ fontSize: 16, opacity: 0.9 }} />
                                        <Typography variant="body2" sx={{ opacity: 0.95, fontWeight: 500 }}>
                                            {selectedGuestDetails?.totalCount || 0} guests
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <DialogContent sx={{ p: 0 }}>
                            {loadingPriorityList ? (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    py: 8,
                                    gap: 3
                                }}>
                                    <Box sx={{ position: 'relative' }}>
                                        <CircularProgress
                                            size={60}
                                            thickness={4}
                                            sx={theme => ({
                                                color: theme.palette.primary.main,
                                                animationDuration: '1.5s'
                                            })}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            <PersonIcon sx={theme => ({ fontSize: 24, color: theme.palette.primary.main, opacity: 0.7 })} />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            Loading Guest Details
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
                                            Please wait while we fetch the information
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box sx={{ p: 3 }}>
                                    {/* Primary Guest Section */}
                                    {selectedGuestDetails?.primaryGuest ? (
                                        <Paper
                                            elevation={0}
                                            sx={theme => ({
                                                p: 2.5,
                                                mb: 3,
                                                background: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                    ? theme.palette.mode === 'dark'
                                                        ? 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.15) 100%)'
                                                        : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)'
                                                    : selectedGuestDetails?.primaryGuest?.grade
                                                        ? theme.palette.mode === 'dark'
                                                            ? `linear-gradient(135deg, rgba(117, 117, 117, 0.2) 0%, rgba(117, 117, 117, 0.15) 100%)`
                                                            : `linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)`
                                                        : theme.palette.mode === 'dark'
                                                            ? 'linear-gradient(135deg, rgba(120, 120, 120, 0.2) 0%, rgba(100, 100, 100, 0.15) 100%)'
                                                            : 'linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%)',
                                                borderRadius: 2.5,
                                                border: '1px solid',
                                                borderColor: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                    ? '#4caf50'
                                                    : selectedGuestDetails?.primaryGuest?.grade
                                                        ? '#757575'
                                                        : '#9e9e9e',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            })}
                                        >
                                            <Box
                                                sx={theme => ({
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    width: 60,
                                                    height: 60,
                                                    background: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                        ? 'rgba(76, 175, 80, 0.1)'
                                                        : selectedGuestDetails?.primaryGuest?.grade
                                                            ? 'rgba(117, 117, 117, 0.1)'
                                                            : theme.palette.mode === 'dark'
                                                                ? 'rgba(120, 120, 120, 0.1)'
                                                                : 'rgba(158, 158, 158, 0.1)',
                                                    borderBottomLeftRadius: 40
                                                })}
                                            />

                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                        Primary Guest
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                        Main contact & booking holder
                                                    </Typography>
                                                </Box>
                                                {selectedGuestDetails?.primaryGuest?.grade && (
                                                    <Chip
                                                        icon={<WorkspacePremiumIcon sx={{ fontSize: 14 }} />}
                                                        label={selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                            ? `Grade ${selectedGuestDetails.primaryGuest.grade}`
                                                            : `Grade ${selectedGuestDetails.primaryGuest.grade}`}
                                                        size="small"
                                                        sx={theme => ({
                                                            ml: 'auto',
                                                            bgcolor: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                                ? '#e8f5e9'
                                                                : '#f5f5f5',
                                                            color: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                                ? '#2E7D32'
                                                                : '#757575',
                                                            fontWeight: 700,
                                                            border: '1px solid',
                                                            borderColor: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                                ? '#4caf50'
                                                                : '#757575',
                                                            fontSize: '0.75rem',
                                                            height: 26
                                                        })}
                                                    />
                                                )}
                                                {!selectedGuestDetails?.primaryGuest?.grade && !selectedGuestDetails?.primaryGuest?.isCurrentUser && (
                                                    <Chip
                                                        label="Pending Reservation"
                                                        size="small"
                                                        sx={theme => ({
                                                            ml: 'auto',
                                                            bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : '#f5f5f5',
                                                            color: theme.palette.mode === 'dark' ? 'grey.300' : '#757575',
                                                            fontWeight: 500,
                                                            border: '1px solid',
                                                            borderColor: theme.palette.mode === 'dark' ? 'grey.700' : '#bdbdbd',
                                                            fontSize: '0.75rem',
                                                            height: 26
                                                        })}
                                                    />
                                                )}
                                            </Box>

                                            <Box sx={theme => ({
                                                display: 'flex',
                                                alignItems: 'center',
                                                bgcolor: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                    ? '#e8f5e9'
                                                    : selectedGuestDetails?.primaryGuest?.grade
                                                        ? '#f5f5f5'
                                                        : '#f5f5f5',
                                                p: 2,
                                                borderRadius: 1.5,
                                                border: '1px solid',
                                                borderColor: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                    ? '#4caf50'
                                                    : selectedGuestDetails?.primaryGuest?.grade
                                                        ? '#757575'
                                                        : '#9e9e9e',
                                                boxShadow: theme.palette.mode === 'dark'
                                                    ? '0 2px 8px rgba(0, 0, 0, 0.2)'
                                                    : '0 2px 8px rgba(0, 0, 0, 0.08)'
                                            })}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="body1" sx={{
                                                        fontWeight: 600,
                                                        color: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                            ? '#2E7D32'
                                                            : selectedGuestDetails?.primaryGuest?.grade
                                                                ? '#757575'
                                                                : 'text.primary',
                                                        fontSize: '1.05rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1
                                                    }}>
                                                        {selectedGuestDetails?.primaryGuest?.isCurrentUser ? (
                                                            <PersonIcon sx={{
                                                                color: '#4CAF50',
                                                                fontSize: 20
                                                            }} />
                                                        ) : selectedGuestDetails?.primaryGuest?.grade ? (
                                                            <WorkspacePremiumIcon sx={{
                                                                color: '#757575',
                                                                fontSize: 20
                                                            }} />
                                                        ) : (
                                                            <ScheduleIcon sx={{
                                                                color: '#757575',
                                                                fontSize: 20
                                                            }} />
                                                        )}
                                                        {selectedGuestDetails.primaryGuest.name}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{
                                                        color: selectedGuestDetails?.primaryGuest?.isCurrentUser
                                                            ? '#2E7D32'
                                                            : selectedGuestDetails?.primaryGuest?.grade
                                                                ? '#757575'
                                                                : 'text.secondary',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        mt: 0.5
                                                    }}>
                                                        <ScheduleIcon sx={{ fontSize: 12 }} />
                                                        Priority: {selectedGuestDetails.primaryGuest.priority}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    ) : (
                                        <Paper
                                            elevation={0}
                                            sx={theme => ({
                                                p: 2.5,
                                                mb: 3,
                                                background: theme.palette.mode === 'dark'
                                                    ? 'rgba(30, 41, 59, 0.5)'
                                                    : '#f8fafc',
                                                borderRadius: 2.5,
                                                border: '1px dashed',
                                                borderColor: theme.palette.divider,
                                                textAlign: 'center'
                                            })}
                                        >
                                            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                No primary guest found for this date
                                            </Typography>
                                        </Paper>
                                    )}

                                    {/* Additional Guests Section */}
                                    <Paper
                                        elevation={0}
                                        sx={theme => ({
                                            p: 2.5,
                                            border: '1px solid',
                                            borderColor: theme.palette.divider,
                                            borderRadius: 2.5,
                                            background: theme.palette.background.paper
                                        })}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white'
                                                }}
                                            >
                                                <GroupIcon />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                                    Additional Guests
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                    Waiting list
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={`${selectedGuestDetails?.additionalGuests?.length || 0} guests`}
                                                size="small"
                                                sx={{
                                                    bgcolor: '#f0fdf4',
                                                    color: '#059669',
                                                    fontWeight: 700,
                                                    border: '1px solid #a7f3d0',
                                                    fontSize: '0.75rem',
                                                    height: 28
                                                }}
                                            />
                                        </Box>

                                        {selectedGuestDetails?.additionalGuests &&
                                            selectedGuestDetails.additionalGuests.length > 0 ? (
                                            <Box sx={{ maxHeight: 320, overflow: 'auto', pr: 1 }}>
                                                {selectedGuestDetails.additionalGuests.map((guest, index) => {
                                                    const isCurrentGuest = selectedGuestDetails.currentGuest &&
                                                        selectedGuestDetails.currentGuest.reservationNo === guest.Res_no;
                                                    const isCurrentUserGuest = guest.isCurrentUser || false;
                                                    const gradeColor = guest.grade ? '#757575' : '#757575';
                                                    const gradeBgColor = guest.grade ? '#f5f5f5' : '#f5f5f5';

                                                    return (
                                                        <Box
                                                            key={index}
                                                            sx={theme => ({
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                p: 2,
                                                                mb: 1.5,
                                                                borderRadius: 2,
                                                                background: isCurrentUserGuest
                                                                    ? theme.palette.mode === 'dark'
                                                                        ? 'rgba(76, 175, 80, 0.3)'
                                                                        : '#e8f5e9'
                                                                    : isCurrentGuest
                                                                        ? theme.palette.mode === 'dark'
                                                                            ? 'rgba(59, 130, 246, 0.2)'
                                                                            : '#dbeafe'
                                                                        : gradeBgColor,
                                                                border: '2px solid',
                                                                borderColor: isCurrentUserGuest
                                                                    ? '#4CAF50'
                                                                    : isCurrentGuest
                                                                        ? theme.palette.primary.main
                                                                        : '#757575',
                                                                transition: 'all 0.2s ease',
                                                                '&:hover': {
                                                                    transform: 'translateY(-1px)',
                                                                    boxShadow: theme.palette.mode === 'dark'
                                                                        ? '0 4px 12px rgba(0,0,0,0.3)'
                                                                        : '0 4px 12px rgba(0,0,0,0.05)',
                                                                    borderColor: isCurrentUserGuest
                                                                        ? '#45a049'
                                                                        : isCurrentGuest
                                                                            ? theme.palette.primary.dark
                                                                            : '#616161'
                                                                }
                                                            })}
                                                        >
                                                            <Box sx={{ position: 'relative' }}>
                                                                <Avatar
                                                                    sx={{
                                                                        width: 42,
                                                                        height: 42,
                                                                        bgcolor: isCurrentUserGuest ? '#4CAF50' : (guest.grade ? '#757575' : '#757575'),
                                                                        color: 'white',
                                                                        fontWeight: 700,
                                                                        fontSize: '0.875rem',
                                                                        border: '2px solid',
                                                                        borderColor: 'background.paper',
                                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                                    }}
                                                                >
                                                                    {isCurrentUserGuest ? (
                                                                        <PersonIcon sx={{ fontSize: 20 }} />
                                                                    ) : guest.grade ? (
                                                                        guest.grade
                                                                    ) : (
                                                                        'P'
                                                                    )}
                                                                </Avatar>

                                                                {isCurrentUserGuest && (
                                                                    <Box
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            top: -6,
                                                                            right: -6,
                                                                            width: 20,
                                                                            height: 20,
                                                                            borderRadius: '50%',
                                                                            bgcolor: '#FF9800',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            border: '2px solid',
                                                                            borderColor: 'background.paper'
                                                                        }}
                                                                    >
                                                                        <PersonIcon sx={{ fontSize: 10, color: 'white' }} />
                                                                    </Box>
                                                                )}
                                                                {index === 0 && !isCurrentGuest && !isCurrentUserGuest && (
                                                                    <Box
                                                                        sx={{
                                                                            position: 'absolute',
                                                                            top: -6,
                                                                            right: -6,
                                                                            width: 20,
                                                                            height: 20,
                                                                            borderRadius: '50%',
                                                                            bgcolor: '#10b981',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            border: '2px solid',
                                                                            borderColor: 'background.paper'
                                                                        }}
                                                                    >
                                                                        <PriorityHighIcon sx={{ fontSize: 10, color: 'white' }} />
                                                                    </Box>
                                                                )}
                                                            </Box>

                                                            <Box sx={{ ml: 1.5, flex: 1 }}>
                                                                <Typography variant="body1" sx={{
                                                                    fontWeight: 600,
                                                                    color: isCurrentUserGuest ? '#2E7D32' : (isCurrentGuest ? 'primary.main' : (guest.grade ? '#757575' : 'text.primary')),
                                                                    fontSize: '0.85rem',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 1
                                                                }}>
                                                                    {isCurrentUserGuest ? (
                                                                        <PersonIcon sx={{
                                                                            fontSize: 16,
                                                                            color: '#4CAF50'
                                                                        }} />
                                                                    ) : guest.grade ? (
                                                                        <WorkspacePremiumIcon sx={{
                                                                            fontSize: 16,
                                                                            color: isCurrentGuest ? theme => theme.palette.primary.main : '#757575'
                                                                        }} />
                                                                    ) : (
                                                                        <ScheduleIcon sx={{
                                                                            fontSize: 16,
                                                                            color: isCurrentGuest ? theme => theme.palette.primary.main : '#757575'
                                                                        }} />
                                                                    )}
                                                                    {guest.displayName}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                                                                    <Typography variant="caption" sx={{
                                                                        color: isCurrentUserGuest ? '#2E7D32' : 'text.secondary',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: 0.5
                                                                    }}>
                                                                        <ScheduleIcon sx={{ fontSize: 12 }} />
                                                                        Priority {guest.Res_Priority}
                                                                    </Typography>
                                                                    {index === 0 && !isCurrentGuest && !isCurrentUserGuest && (
                                                                        <Typography variant="caption" sx={{
                                                                            color: '#059669',
                                                                            fontWeight: 600,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: 0.5
                                                                        }}>
                                                                            <ArrowUpwardIcon sx={{ fontSize: 12 }} />
                                                                            Next
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    );
                                                })}
                                            </Box>
                                        ) : (
                                            <Box sx={{
                                                textAlign: 'center',
                                                py: 5,
                                                px: 2
                                            }}>
                                                <Box
                                                    sx={theme => ({
                                                        width: 80,
                                                        height: 80,
                                                        borderRadius: '50%',
                                                        bgcolor: theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mx: 'auto',
                                                        mb: 2.5
                                                    })}
                                                >
                                                    <GroupIcon sx={theme => ({ fontSize: 36, color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.400', opacity: 0.5 })} />
                                                </Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                                    No Additional Guests
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 280, mx: 'auto', lineHeight: 1.6 }}>
                                                    Only the primary guest is booked for this date.
                                                </Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                </Box>
                            )}
                        </DialogContent>

                        <DialogActions sx={theme => ({
                            px: 3,
                            pb: 3,
                            pt: 2,
                            borderTop: '1px solid',
                            borderColor: theme.palette.divider
                        })}>
                            <Button
                                onClick={() => setGuestDetailsModalOpen(false)}
                                variant="contained"
                                sx={theme => ({
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                    boxShadow: theme.palette.mode === 'dark'
                                        ? '0 4px 14px rgba(25, 118, 210, 0.4)'
                                        : '0 4px 14px rgba(25, 118, 210, 0.3)',
                                    '&:hover': {
                                        boxShadow: theme.palette.mode === 'dark'
                                            ? '0 6px 20px rgba(25, 118, 210, 0.5)'
                                            : '0 6px 20px rgba(25, 118, 210, 0.4)',
                                        transform: 'translateY(-1px)'
                                    },
                                    transition: 'all 0.2s ease'
                                })}
                            >
                                Done
                            </Button>
                        </DialogActions>
                    </Dialog>

                     
                    <CloseModal
                        open={closeModalOpen}
                         handleClose={() => setCloseModalOpen(false)}
                         
                    />
                    <SpecialModal
                        open={specialModalOpen}
                        handleClose={() => setSpecialModalOpen(false)}
                    />
                    
                </Container>
            )}
        </div>
    );
};

export default Reservations;