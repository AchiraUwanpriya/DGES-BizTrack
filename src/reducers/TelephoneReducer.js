import {
  TELEPHONE_REQUEST,
  TELEPHONE_SUCCESS,
  TELEPHONE_FAIL,
} from "../constants/TelephoneContant";

const initialState = {
  responseBody: [],
  loading: false,
  msg: null,
};

export const GetTelephoneCard = (state = initialState, action) => {
  switch (action.type) {
    case TELEPHONE_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case TELEPHONE_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        msg: null,
      };
    case TELEPHONE_FAIL:
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
