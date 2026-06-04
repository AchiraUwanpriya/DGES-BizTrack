import {
  BANNER_REQUEST,
  BANNER_SUCCESS,
  BANNER_FAIL,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../constants/commonContant";
import {
  HEAD_ACCESS_FAIL,
  HEAD_ACCESS_REQUEST,
  HEAD_ACCESS_SUCCESS,
} from "../constants/HeadAccessContant";

const initialState = {
  requestBody: null,
  responseBody: [],
  error: null,
  msg: null,
  loading: false,
};

export const getBannerImages = (state = initialState, action) => {
  switch (action.type) {
    case BANNER_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case BANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        msg: null,
      };
    case BANNER_FAIL:
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

const HeadComponentInitialState = {
  headComponent: [],
  error: null,
  msg: null,
  loading: false,
};

export const GetAccessHeadComponent = (
  state = HeadComponentInitialState,
  action
) => {
  switch (action.type) {
    case HEAD_ACCESS_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case HEAD_ACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        headComponent: action.payload.headComponent,
        msg: null,
      };
    case HEAD_ACCESS_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        headComponent: [],
      };
    default:
      return state;
  }
};

export const GetUserByServiceNo = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        data: null,
      };
    default:
      return state;
  }
};
