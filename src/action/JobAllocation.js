import {
    JOBALLOCATION_REQUEST,
    JOBALLOCATION_SUCCESS,
    JOBALLOCATION_FAIL,

    UNASSIGNLIST_REQUEST,
    UNASSIGNLIST_SUCCESS,
    UNASSIGNLIST_FAIL,

  } from "../constants/JobAllocationContant";
  
  import JobAllocationService from "../service/JobAllocationService";
  
  
  export const GetJobCard = (date) => async (dispatch) => {
    dispatch({
      type: JOBALLOCATION_REQUEST,
    });
  
    return await JobAllocationService.GetJobCard(date).then(
      (data) => {
        //  console.log(data);
        if (data.data.StatusCode === 200) {
          dispatch({
            type: JOBALLOCATION_SUCCESS,
            payload: {
              responseBody: data.data.ResultSet,
            },
          });
        } else {
          dispatch({
            type: JOBALLOCATION_FAIL,
            payload: {
              msg: "Sorry we could not find result for your search query. Please try again!",
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
          type: JOBALLOCATION_FAIL,
          payload: {
            msg: message,
          },
        });
        return Promise.reject();
      }
    );
  };
  
  export const GetUnAssignedList = (date) => async (dispatch) => {
    dispatch({
      type: UNASSIGNLIST_REQUEST,
    });
  
    return await JobAllocationService.GetUnAssignedList(date).then(
      (data) => {
        //  console.log(data);
        if (data.data.StatusCode === 200) {
          dispatch({
            type: UNASSIGNLIST_SUCCESS,
            payload: {
              responseBody: data.data.ResultSet,
            },
          });
        } else {
          dispatch({
            type: UNASSIGNLIST_FAIL,
            payload: {
              msg: "Sorry we could not find result for your search query. Please try again!",
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
          type: UNASSIGNLIST_FAIL,
          payload: {
            msg: message,
          },
        });
        return Promise.reject();
      }
    );
  };