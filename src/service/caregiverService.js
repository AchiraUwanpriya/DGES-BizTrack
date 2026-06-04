import axios from "axios";

const getCheckDetails = async () => {
  let config = {
    method: "get",
    url: `/Reservation/GetCheckDetils`,
  };

  return axios.request(config);
};

const markCheckStatus = async (reservationNo, checkStatus) => {
  let config = {
    method: "get",
    url: `/Reservation/MarkCheckStatus?P_RESERVATION_NO=${reservationNo}&P_CHECK_STATUS=${checkStatus}`,
  };

  return axios.request(config);
};

const addCaretFeedback = async (reservationNo, caretReport, caretStatus ) => {
  let config = {
    method: "get",
    // url: `/Reservation/AddCaretFeedback?P_RESERVATION_NO=${reservationNo}&P_CARET_REPORT=${encodeURIComponent(caretReport)}&P_CARET_STATUS=${caretStatus}`,
    url: `/Reservation/AddCaretFeedback?P_RESERVATION_NO=${reservationNo}&P_CARET_STATUS=${caretStatus}`,
  };

  return axios.request(config);
};

const getCaretFeedbackDetails = async (reservationNo) => {
  let config = {
    method: "get",
    url: `/Reservation/GetCaretFeeDetails?P_RESERVATION_NO=${reservationNo}`,
  };

  return axios.request(config);
};

export default {
  getCheckDetails,
  markCheckStatus,
  addCaretFeedback,
  getCaretFeedbackDetails,
};