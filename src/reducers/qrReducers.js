import {
  QR_REQUEST,
  QR_SUCCESS,
  CLEAR_ERRORS,
  QR_FAIL,
  SET_MESSAGE,
  GET_EWO_DETAILS_REQUEST,
  GET_EWO_DETAILS_SUCCESS,
  GET_EWO_DETAILS_FAIL,
  RECEIVE_EWO_DETAILS_REQUEST,
  RECEIVE_EWO_DETAILS_SUCCESS,
  RECEIVE_EWO_DETAILS_FAIL,
  SEND_EWO_DETAILS_REQUEST,
  SEND_EWO_DETAILS_SUCCESS,
  SEND_EWO_DETAILS_FAIL,
  IS_OPEN,
  IS_CLOSE,
  GET_EMPLOYEE_DETAILS_REQUEST,
    GET_EMPLOYEE_DETAILS_SUCCESS,
    GET_EMPLOYEE_DETAILS_FAIL,
} from "../constants/qrConstants";

const initialState = {
  EWONo: null,
  requestBody: null,
  responseBody: null,
  error: null,
  msg: null,
  loading: false,
  isButtonVisible: false,
};

export const qrIsOpenClose = (
  state = { isOpen: false, isOpenDetailScreen: false },
  action
) => {
  switch (action.type) {
    case IS_OPEN:
      return {
        ...state,
        isOpen: action.payload.isOpen,
        isOpenDetailScreen: action.payload.isOpenDetailScreen,
      };
    case IS_CLOSE:
      return {
        ...state,
        isOpen: false,
        isOpenDetailScreen: false,
      };
    default:
      return state;
  }
};

export const qrScanReducer = (state = initialState, action) => {
  switch (action.type) {
    case QR_REQUEST:
      return {
        ...state,
        loading: true,
        isButtonVisible: false,
        EWONo: action.payload.EWONo,
      };
    case QR_SUCCESS:
      return {
        ...state,
        EWONo: action.payload.EWONo,
        responseBody: action.payload.responseBody,
        msg: action.payload.msg,
        loading: false,
        isButtonVisible: action.payload.isButtonVisible,
        error: null,
      };
    case QR_FAIL:
      return {
        ...state,
        loading: false,
        isButtonVisible: false,
        msg: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const GetEWODetailsReducer = (state = { isloading: false }, action) => {
  switch (action.type) {
    case GET_EWO_DETAILS_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case GET_EWO_DETAILS_SUCCESS:
      return {
        ...state,
        isloading: false,
      };
    case GET_EWO_DETAILS_FAIL:
      return {
        ...state,
        isloading: true,
      };
    default:
      return state;
  }
};
export const RecieveEWODetailsReducer = (
  state = { isloading: false },
  action
) => {
  switch (action.type) {
    case RECEIVE_EWO_DETAILS_REQUEST:
      return {
        ...state,
      };
    case RECEIVE_EWO_DETAILS_SUCCESS:
      return {
        ...state,
      };
    case RECEIVE_EWO_DETAILS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const SendEWODetailsReducer = (state = { isloading: false }, action) => {
  switch (action.type) {
    case SEND_EWO_DETAILS_REQUEST:
      return {
        ...state,
      };
    case SEND_EWO_DETAILS_SUCCESS:
      return {
        ...state,
      };
    case SEND_EWO_DETAILS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};




export const getEmployeeDetails  = (state = { isloading: false }, action) => {
  switch (action.type) {
case GET_EMPLOYEE_DETAILS_REQUEST:
  return {
    ...state,
    loading: true,
  };
case GET_EMPLOYEE_DETAILS_SUCCESS:
  return {
    ...state,
    loading: false,
    employees: action.payload,
  };
case GET_EMPLOYEE_DETAILS_FAIL:
  return {
    ...state,
    loading: false,
    error: action.payload,
  };
    }
};