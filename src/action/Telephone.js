import {
  TELEPHONE_REQUEST,
  TELEPHONE_SUCCESS,
  TELEPHONE_FAIL,
} from "../constants/TelephoneContant";

import TelephoneService from "../service/TelephoneService";

export const GetTelephoneCard = () => async (dispatch) => {
  dispatch({
    type: TELEPHONE_REQUEST,
  });

  return await TelephoneService.GetTelephoneCard().then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: TELEPHONE_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: TELEPHONE_FAIL,
          payload: {
            msg: "Sorry, we could not find the result for your search query. Please try again!",
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
        type: TELEPHONE_FAIL,
        payload: {
          msg: message,
        },
      });
      return Promise.reject();
    }
  );
};
