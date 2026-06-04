import {
  ATTENDANCE_FAIL,
  ATTENDANCE_SUCCESS,
  ATTENDANCE_REQUEST,
  GET_LOAD_BA_ATTENDANCE_SUCCESS,
  GET_LOAD_BA_ATTENDANCE_FAIL,
  GET_LOAD_BA_ATTENDANCE_REQUEST,

} from "../constants/AttendanceContant";

import AttendanceService from "../service/AttendanceService";

export const GetCDLWeekAttendance = (hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetCDLWeekAttendance(hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          weeklyAttendance: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch weekly attendance data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetCDLCategoryAtt = (hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetCDLCategoryAtt(hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          cdplcData: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch CDPLC category attendance data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};
export const GetAttendanceCard = (month) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetAttendanceCard(month);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          responseBody: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Sorry we could not find result for your search query. Please try again!",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetCdlBasedDivison = (mcvDate, hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetCdlBasedDivison(mcvDate, hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          divisionData: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch division data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetTraineeBasedTypes = (hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetTraineeBasedTypes(hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          traineeTypes: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch trainee types data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetTraineeDivisionAttendance =
  (mcvDate, hadDate) => async (dispatch) => {
    dispatch({
      type: ATTENDANCE_REQUEST,
    });

    try {
      const data = await AttendanceService.GetTraineeDivisionAttendance(
        mcvDate,
        hadDate,
      );
      if (data.data.StatusCode === 200) {
        dispatch({
          type: ATTENDANCE_SUCCESS,
          payload: {
            traineeDivision: data.data.ResultSet,
          },
        });
      } else {
        dispatch({
          type: ATTENDANCE_FAIL,
          payload: {
            msg: "Failed to fetch trainee division data",
          },
        });
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: message,
        },
      });
    }
  };
export const GetAllAttendance = (mcvDate, hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetAllAttendance(mcvDate, hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          allAttendance1: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch all attendance data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetAllStrength = (mcvDate, hadDate) => async (dispatch) => {
  dispatch({
    type: ATTENDANCE_REQUEST,
  });

  try {
    const data = await AttendanceService.GetAllStrength(mcvDate, hadDate);
    if (data.data.StatusCode === 200) {
      dispatch({
        type: ATTENDANCE_SUCCESS,
        payload: {
          allAttendance: data.data.ResultSet,
        },
      });
    } else {
      dispatch({
        type: ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch all attendance data",
        },
      });
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    });
  }
};

export const GetLoadBaAttendance = () => async (dispatch) => {
  dispatch({
    type: GET_LOAD_BA_ATTENDANCE_REQUEST,
  });
  try {
    const data = await AttendanceService.GetLoadBaAttendance();
    if (data.data.StatusCode === 200) {
      dispatch({  
        type: GET_LOAD_BA_ATTENDANCE_SUCCESS,
        payload: data.data.ResultSet, // Send the array directly, not wrapped in an object
      });
    } else {
      dispatch({
        type: GET_LOAD_BA_ATTENDANCE_FAIL,
        payload: {
          msg: "Failed to fetch Load BA attendance data",
        },
      });
    } 
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch({
      type: GET_LOAD_BA_ATTENDANCE_FAIL,
      payload: {
        msg: message,
      },
    }); 
  }
};