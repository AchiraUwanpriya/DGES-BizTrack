import {
  LEAVE_BALANCE_FAIL,
  LEAVE_BALANCE_REQUEST,
  LEAVE_BALANCE_SUCCESS,
  NOT_ENTERED_LEAVE_FAIL,
  NOT_ENTERED_LEAVE_REQUEST,
  NOT_ENTERED_LEAVE_SUCCESS,
  PUNCTUALITY_FAIL,
  PUNCTUALITY_REQUEST,
  PUNCTUALITY_SUCCESS,
  LEAVE_SUMMERY_FAIL,
  LEAVE_SUMMERY_REQUEST,
  LEAVE_SUMMERY_SUCCESS,
} from "../constants/LeaveContant";

const initialState = {
  requestBody: null,
  responseBody: [
    {
      description: "Annual Leave",
      total: 0,
      taken: 0,
      balance: 0,
    },
    {
      description: "Casual Leave",
      total: 0,
      taken: 0,
      balance: 0,
    },
    {
      description: "Sick Leave",
      total: 0,
      taken: 0,
      balance: 0,
    },
  ],
  error: null,
  msg: null,
  loading: false,
  total_Leave: 0,
  total_Leave_Pcn: 0,
};

export const GetLeaveBalance = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_BALANCE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LEAVE_BALANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        total_Leave: action.payload.total_Leave,
        total_Leave_Pcn: action.payload.total_Leave_Pcn,
        msg: null,
      };
    case LEAVE_BALANCE_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        error: action.payload.error,
        responseBody: initialState.responseBody,
        total_Leave: 0,
        total_Leave_Pcn: 0,
      };
    default:
      return state;
  }
};

export const GetNotEnteredLeave = (
  state = {
    requestBody: null,
    responseBody: [],
    error: null,
    msg: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case NOT_ENTERED_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case NOT_ENTERED_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        msg: null,
      };
    case NOT_ENTERED_LEAVE_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        responseBody: [],
      };
    default:
      return state;
  }
};

export const GetPunctuality = (
  state = {
    requestBody: null,
    responseBody: [],
    error: null,
    msg: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case PUNCTUALITY_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case PUNCTUALITY_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        msg: null,
      };
    case PUNCTUALITY_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        responseBody: [],
      };
    default:
      return state;
  }
};

export const GetLeaveSummary = (
  state = {
    requestBody: null,
    responseBody: [],
    error: null,
    msg: null,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case LEAVE_SUMMERY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LEAVE_SUMMERY_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
      };
    case LEAVE_SUMMERY_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        responseBody: [],
      };
    default:
      return state;
  }
};
