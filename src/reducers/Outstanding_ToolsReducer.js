import {
    OUTSTANDING_TOOL_REQUEST,
    OUTSTANDING_TOOL_SUCCESS,
    OUTSTANDING_TOOL_FAIL,
  } from "../constants/OutstandingToolsContant";
  
  const initialState = {
    requestBody: null,
    responseBody: [],
    error: null,
    msg: null,
    loading: false,
  };
  
  export const GetOutstandingToolsDetails = (state = initialState, action) => {
    switch (action.type) {
      case OUTSTANDING_TOOL_REQUEST:
        return {
          ...state,
          loading: true,
          msg: null,
        };
      case OUTSTANDING_TOOL_SUCCESS:
        return {
          ...state,
          loading: false,
          responseBody: action.payload.responseBody,
          msg: null,
        };
      case OUTSTANDING_TOOL_FAIL:
        return {
          ...state,
          loading: false,
          msg: action.payload.msg,
          error: action.payload.error,
          responseBody: null,
        };
      default:
        return state;
    }
  };
  