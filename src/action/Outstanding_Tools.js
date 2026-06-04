import {
  OUTSTANDING_TOOL_REQUEST,
  OUTSTANDING_TOOL_SUCCESS,
  OUTSTANDING_TOOL_FAIL,
} from "../constants/OutstandingToolsContant";
import Outstanding_ToolsService from "../service/Outstanding_ToolsService";

export const GetOutstandingToolsDetails = () => async (dispatch) => {
  dispatch({ type: OUTSTANDING_TOOL_REQUEST });

  return await Outstanding_ToolsService.GetOutstandingToolsDetails().then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: OUTSTANDING_TOOL_SUCCESS,
          payload: {
            responseBody: data.data.ResultSet,
          },
        });
      } else if (data.data.StatusCode === 401) {
        dispatch({
          type: OUTSTANDING_TOOL_FAIL,
          payload: { error: "No data found!" },
        });
      } else {
        dispatch({
          type: OUTSTANDING_TOOL_FAIL,
          payload: { error: "Failed to load data!" },
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
        type: OUTSTANDING_TOOL_FAIL,
        payload: {
          error: message,
        },
      });
      return Promise.reject();
    }
  );
};
