import * as constants from '../constants/caregiverConstants';
import caregiverService from '../service/caregiverService';
import axios from "axios";

export const fetchCaregiverData = () => async (dispatch) => {
  try {
    dispatch({ type: constants.CAREGIVER_FETCH_REQUEST });
    const response = await caregiverService.getCheckDetails();
    dispatch({
      type: constants.CAREGIVER_FETCH_SUCCESS,
      payload: response.data.ResultSet || []
    });
  } catch (error) {
    dispatch({
      type: constants.CAREGIVER_FETCH_FAILURE,
      payload: error.response?.data?.message || error.message
    });
  }
};

export const updateCheckStatus = (reservationNo, checkStatus) => async (dispatch) => {
  try {
    dispatch({ type: constants.CAREGIVER_UPDATE_STATUS_REQUEST });
    const response = await caregiverService.markCheckStatus(reservationNo, checkStatus);
    dispatch({
      type: constants.CAREGIVER_UPDATE_STATUS_SUCCESS,
      payload: { reservationNo, checkStatus }
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: constants.CAREGIVER_UPDATE_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// export const addCaretFeedback = (caretReport) => async (dispatch) => {
//   try {
//     dispatch({ type: constants.CAREGIVER_ADD_FEEDBACK_REQUEST });
//     const response = await caregiverService.addCaretFeedback(caretReport);
//     dispatch({
//       type: constants.CAREGIVER_ADD_FEEDBACK_SUCCESS,
//       payload: response.data
//     });
//     return response.data;
//   } catch (error) {
//     dispatch({
//       type: constants.CAREGIVER_ADD_FEEDBACK_FAILURE,
//       payload: error.response?.data?.message || error.message
//     });
//     throw error;
//   }
// };




// caregiverActions.js
export const addCaretFeedback = (reservationNo, caretReport, caretStatus) => async (dispatch) => {
  try {
    dispatch({ type: constants.CAREGIVER_ADD_FEEDBACK_REQUEST });
    const response = await caregiverService.addCaretFeedback(
      reservationNo, 
      caretReport, 
      caretStatus,  
    );
    dispatch({
      type: constants.CAREGIVER_ADD_FEEDBACK_SUCCESS,
      payload: response.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: constants.CAREGIVER_ADD_FEEDBACK_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};


export const fetchCaretFeedbackDetails = (reservationNo) => async (dispatch) => {
  try {
    dispatch({ type: constants.CAREGIVER_FETCH_FEEDBACK_REQUEST });
    const response = await caregiverService.getCaretFeedbackDetails(reservationNo);
    dispatch({
      type: constants.CAREGIVER_FETCH_FEEDBACK_SUCCESS,
      payload: {
        reservationNo,
        feedbackData: response.data.ResultSet || []
      }
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: constants.CAREGIVER_FETCH_FEEDBACK_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

export const updateCaretStatus = (feedbackId, caretStatus, reservationNo) => async (dispatch) => {
  try {
    const response = await axios.put(
      `Reservation/CareTStatusUp?P_FEEDBACK_ID=${feedbackId}&P_CARET_STATUS=${caretStatus}&P_RESERVATION_NO=${reservationNo}`
    );
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update caretaker status');
  }
};