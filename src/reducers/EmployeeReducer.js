import {
  GET_EMPLOYEE_DETAILS_REQUEST,
  GET_EMPLOYEE_DETAILS_SUCCESS,
  GET_EMPLOYEE_DETAILS_FAIL,
} from "../constants/qrConstants";

const initialState = {
  employees: [],
  employeeLoading: false,
  employeeError: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_DETAILS_REQUEST:
      return {
        ...state,
        employeeLoading: true,
        employeeError: null,
      };
    case GET_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        employeeLoading: false,
        employees: action.payload.employees,
        employeeError: null,
      };
    case GET_EMPLOYEE_DETAILS_FAIL:
      return {
        ...state,
        employeeLoading: false,
        employeeError: action.payload?.error || "Failed to fetch employees",
      };
    default:
      return state;
  }
};