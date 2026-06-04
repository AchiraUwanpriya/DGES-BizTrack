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

const initialState = {
    requestBody: null,
    responseBody: [
        {
            description: "All Allocations",
            total: 0,
            usage: 0,
            balance: 0,
        },
        {
            description: "Allocation Usage",
            total: 0,
            usage: 0,
            balance: 0,
        },
        {
            description: "Allocation Balance",
            total: 0,
            usage: 0,
            balance: 0,
        },
    ],
    error: null,
    msg: null,
    loading: false,
};

export const GetUserMedicalDetails = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_MEDICAL_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_MEDICAL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                msg: null,
            };
        case GET_USER_MEDICAL_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                msg: action.payload.msg,
                error: action.payload.error,
                responseBody: initialState.responseBody,
            };
        default:
            return state;
    }
};

export const GetMedicalIndoorUsageDetails = (
    state = {
        requestBody: null,
        responseBody: [],
        error: null,
        msg: null,
        loading: false,
    },
    action
) => {
    switch (action.type) {
        case GET_MEDICAL_INDOOR_USAGE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GET_MEDICAL_INDOOR_USAGE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                msg: null,
            };
        case GET_MEDICAL_INDOOR_USAGE_DETAILS_FAIL:
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

export const GetMedicalOutdoorUsageDetails = (
    state = {
        requestBody: null,
        responseBody: [],
        error: null,
        msg: null,
        loading: false,
    },
    action
) => {
    switch (action.type) {
        case GET_MEDICAL_OUTDOOR_USAGE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                msg: null,
            };
        case GET_MEDICAL_OUTDOOR_USAGE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                msg: null,
            };
        case GET_MEDICAL_OUTDOOR_USAGE_DETAILS_FAIL:
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


