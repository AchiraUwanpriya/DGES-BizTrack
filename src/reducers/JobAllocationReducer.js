import {
    JOBALLOCATION_REQUEST,
    JOBALLOCATION_SUCCESS,
    JOBALLOCATION_FAIL,

    UNASSIGNLIST_REQUEST,
    UNASSIGNLIST_SUCCESS,
    UNASSIGNLIST_FAIL,

  } from "../constants/JobAllocationContant";
  
  const initialState = {
    requestBody: null,
    responseBody: [],
    error: null,
    msg: null,
    loading: false,
  };
  
  export const GetJobCard = (state = initialState, action) => {
    switch (action.type) {
      case JOBALLOCATION_REQUEST:
        return {
          ...state,
          loading: true,
          msg: null,
        };
      case JOBALLOCATION_SUCCESS:
        return {
          ...state,
          loading: false,
          responseBody: action.payload.responseBody,
          msg: null,
        };
      case JOBALLOCATION_FAIL:
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

  export const GetUnAssignedList = (state = initialState, action) => {
    switch (action.type) {
      case UNASSIGNLIST_REQUEST:
        return {
          ...state,
          loading: true,
          msg: null,
        };
      case UNASSIGNLIST_SUCCESS:
        return {
          ...state,
          loading: false,
          responseBody: action.payload.responseBody,
          msg: null,
        };
      case UNASSIGNLIST_FAIL:
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
  