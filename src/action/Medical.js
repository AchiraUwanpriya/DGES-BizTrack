import {
    GET_USER_MEDICAL_DETAILS_REQUEST,
    GET_USER_MEDICAL_DETAILS_SUCCESS,
    GET_USER_MEDICAL_DETAILS_FAIL,
    GET_MEDICAL_INDOOR_USAGE_DETAILS_REQUEST,
    GET_MEDICAL_INDOOR_USAGE_DETAILS_SUCCESS,
    GET_MEDICAL_INDOOR_USAGE_DETAILS_FAIL,
    GET_MEDICAL_OUTDOOR_USAGE_DETAILS_REQUEST,
    GET_MEDICAL_OUTDOOR_USAGE_DETAILS_SUCCESS,
    GET_MEDICAL_OUTDOOR_USAGE_DETAILS_FAIL,
} from "../constants/MedicalConstant";

import MedicalService from "../service/MedicalService";

export const GetUserMedicalDetails = (year) => async (dispatch) => {
    dispatch({
        type: GET_USER_MEDICAL_DETAILS_REQUEST,
    });
    return await MedicalService.GetUserMedicalDetails(year).then(
        (data) => {
            if (data.data.StatusCode === 200) {
                dispatch({
                    type: GET_USER_MEDICAL_DETAILS_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet,
                    },
                });
            } else {
                dispatch({
                    type: GET_USER_MEDICAL_DETAILS_FAIL,
                    payload: {
                        msg: "Sorry couldn't find your details. Please try again soon!"
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
                type: GET_MEDICAL_INDOOR_USAGE_DETAILS_REQUEST,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();
        }
    );
};

export const GetMedicalIndoorUsageDetails = (year) => async (dispatch) => {
    dispatch({
        type: GET_MEDICAL_INDOOR_USAGE_DETAILS_REQUEST,
    });

    return await MedicalService.GetMedicalIndoorUsageDetails(year).then(
        (data) => {
            if (data.data.StatusCode === 200) {
                dispatch({
                    type: GET_MEDICAL_INDOOR_USAGE_DETAILS_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet,
                    },
                });
            } else {
                dispatch({
                    type: GET_MEDICAL_INDOOR_USAGE_DETAILS_FAIL,
                    payload: {
                        msg: "Sorry we couldn't find your details. Please try again soon!"
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
                type: GET_MEDICAL_INDOOR_USAGE_DETAILS_FAIL,
                payload: {
                    msg: message,
                },

            });

            return Promise.reject();
        }
    );
};


export const GetMedicalOutdoorUsageDetails = (year) => async (dispatch) => {
    dispatch({
        type: GET_MEDICAL_OUTDOOR_USAGE_DETAILS_REQUEST,
    });
    

    return await MedicalService.GetMedicalOutdoorUsageDetails(year).then(
        (data) => {
            if (data.data.StatusCode === 200) {
                dispatch({
                    type: GET_MEDICAL_OUTDOOR_USAGE_DETAILS_SUCCESS,
                    payload: {
                        responseBody: data.data.ResultSet,
                    },
                });
            } else {
                dispatch({
                    type: GET_MEDICAL_OUTDOOR_USAGE_DETAILS_FAIL,
                    payload: {
                        msg: "Sorry we couldn't find your details. Please try again soon!",

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
                type: GET_MEDICAL_OUTDOOR_USAGE_DETAILS_FAIL,
                payload: {
                    msg: message,
                },
            });
            return Promise.reject();
        }
    );
};
