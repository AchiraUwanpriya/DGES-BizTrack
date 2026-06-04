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

import LeaveService from "../service/LeaveService";

export const GetLeaveBalance = (month) => async (dispatch) => {
  dispatch({
    type: LEAVE_BALANCE_REQUEST,
  });
  let total_Leave = 0;
  let total_Leave_Pcn = 0;
  return await LeaveService.GetLeaveBalance(month).then(
    (data) => {
      //  console.log(data);
      if (data.data.StatusCode === 200) {
        data.data.ResultSet.map((filterItem, index) => {
          total_Leave = total_Leave + parseFloat(filterItem.Taken);
        });
        total_Leave_Pcn = (100 / 42) * total_Leave;
        dispatch({
          type: LEAVE_BALANCE_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
            total_Leave: 42 - total_Leave,
            total_Leave_Pcn: total_Leave_Pcn,
          },
        });
      } else {
        dispatch({
          type: LEAVE_BALANCE_FAIL,
          payload: {
            msg: "Sorry we could not find leave balance result for your search query. Please try again!",
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
        type: LEAVE_BALANCE_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};

export const GetNotEnteredLeave = (month) => async (dispatch) => {
  dispatch({
    type: NOT_ENTERED_LEAVE_REQUEST,
  });

  return await LeaveService.GetNotEnteredLeave(month).then(
    (data) => {
      //  console.log(data);
      if (data.data.StatusCode === 200) {
        dispatch({
          type: NOT_ENTERED_LEAVE_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: NOT_ENTERED_LEAVE_FAIL,
          payload: {
            msg: "Sorry we could not find not entered leave result for your search query. Please try again!",
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
        type: NOT_ENTERED_LEAVE_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};

export const GetPunctuality = (month) => async (dispatch) => {
  dispatch({
    type: PUNCTUALITY_REQUEST,
  });

  return await LeaveService.GetPunctuality(month).then(
    (data) => {
      //  console.log(data);
      if (data.data.StatusCode === 200) {
        dispatch({
          type: PUNCTUALITY_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: PUNCTUALITY_FAIL,
          payload: {
            msg: "Sorry we could not find punctuality result for your search query. Please try again!",
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
        type: PUNCTUALITY_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};

export const GetLeaveSummary = (month) => async (dispatch) => {
  dispatch({
    type: LEAVE_SUMMERY_REQUEST,
  });

  return await LeaveService.GetLeaveSummary(month).then(
    (data) => {
      //  console.log(data);
      if (data.data.StatusCode === 200) {
        dispatch({
          type: LEAVE_SUMMERY_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: LEAVE_SUMMERY_FAIL,
          payload: {
            msg: "Sorry we could not find leave summery result for your search query. Please try again!",
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
        type: LEAVE_SUMMERY_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};
