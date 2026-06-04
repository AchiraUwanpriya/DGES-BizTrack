import {
  BANNER_FAIL,
  BANNER_REQUEST,
  BANNER_SUCCESS,
} from "../constants/commonContant";
import {
  HEAD_ACCESS_FAIL,
  HEAD_ACCESS_REQUEST,
  HEAD_ACCESS_SUCCESS,
} from "../constants/HeadAccessContant";

import CommonService from "../service/CommonService";
export const getBannerImages = () => async (dispatch) => {
  dispatch({
    type: BANNER_REQUEST,
  });

  return await CommonService.getBannerImages().then(
    (data) => {
      //  console.log(data);
      if (data.status === 200) {
        dispatch({
          type: BANNER_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: BANNER_FAIL,
          payload: {
            msg: "Failed to load banner images",
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: BANNER_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};

export const GetAccessHeadComponent = () => async (dispatch) => {
  dispatch({
    type: HEAD_ACCESS_REQUEST,
  });

  return await CommonService.GetAccessHeadComponent().then(
    (data) => {
      //  console.log(data);
      if (data.status === 200) {
        dispatch({
          type: HEAD_ACCESS_SUCCESS,
          payload: {
            headComponent: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: HEAD_ACCESS_FAIL,
          payload: {
            msg: "Failed to load header component",
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: HEAD_ACCESS_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};
