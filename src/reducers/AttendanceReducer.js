// In your reducer file (attendanceCard reducer)
import {
  ATTENDANCE_REQUEST,
  ATTENDANCE_SUCCESS,
  ATTENDANCE_FAIL,
  GET_LOAD_BA_ATTENDANCE_SUCCESS,
  GET_LOAD_BA_ATTENDANCE_REQUEST,
  GET_LOAD_BA_ATTENDANCE_FAIL,
} from "../constants/AttendanceContant";

const initialState = {
  requestBody: null,
  responseBody: [],
  divisionData: [],
  weeklyAttendance: [],
  traineeTypes: [],
  traineeDivision: [],
  allAttendance: [],
  allAttendance1: [],
  cdplcData: [],
  loadBaAttendance: [], // Make sure this is initialized as empty array
  error: null,
  msg: null,
  loading: false,
};

export const GetAttendanceCard = (state = initialState, action) => {
  switch (action.type) {
    case ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody || state.responseBody,
        divisionData: action.payload.divisionData || state.divisionData,
        weeklyAttendance: action.payload.weeklyAttendance || state.weeklyAttendance,
        traineeTypes: action.payload.traineeTypes || state.traineeTypes,
        traineeDivision: action.payload.traineeDivision || state.traineeDivision,
        allAttendance: action.payload.allAttendance || state.allAttendance,
        allAttendance1: action.payload.allAttendance1 || state.allAttendance1,
        cdplcData: action.payload.cdplcData || state.cdplcData,
        msg: null,
      };
    case ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        responseBody: [],
      };
    
    // Add these cases for Load BA Attendance
    case GET_LOAD_BA_ATTENDANCE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case GET_LOAD_BA_ATTENDANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadBaAttendance: action.payload, // Directly set the array, not action.payload.loadBaAttendance
        msg: null,
      };
    case GET_LOAD_BA_ATTENDANCE_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        loadBaAttendance: [],
      };
    
    default:
      return state;
  }
};