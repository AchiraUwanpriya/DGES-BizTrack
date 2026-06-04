import {
        HISTORY_REQUEST,
        HISTORY_SUCCESS,
        HISTORY_FAIL,
        RESDETAILS_REQUEST,
        RESDETAILS_SUCCESS,
        RESDETAILS_FAIL,
        LOG_RESERVATION_FAIL,
        LOG_RESERVATION_REQUEST,
        LOG_RESERVATION_SUCCESS,
        CANCEL_RESERVATION_FAIL,
        CANCEL_RESERVATION_SUCCESS,
        CANCEL_RESERVATION_REQUEST
} from "../constants/ReservationContant";


const initialState = {
    responseBody: [],
    loading: false,
    msg: null,
    error: false
};

export const resDetailsHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case HISTORY_REQUEST:
            return { ...state, loading: true };
        case HISTORY_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                responseBody: action.payload.responseBody,
                error: false
            };
        case HISTORY_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: true,
                msg: action.payload.msg
            };
        default:
            return state;
    }
};


export const loadResDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESDETAILS_REQUEST:
            return { ...state, loading: true };
        case RESDETAILS_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                responseBody: action.payload.responseBody,
                error: false
            };
        case RESDETAILS_FAIL:
            return { 
                ...state, 
                loading: false, 
                error: true,
                msg: action.payload.msg
            };
        default:
            return state;
    }
};

export const logReservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_RESERVATION_REQUEST:   
            return { ...state, loading: true };
        case LOG_RESERVATION_SUCCESS:
            return {    
                ...state,     
                loading: false, 
                responseBody: action.payload.responseBody,
                error: false
            };
        case LOG_RESERVATION_FAIL:
            return {
                ...state,     
                loading: false, 
                error: true,
                msg: action.payload.msg
            };
        default:
            return state;
    }
};

export const cancelReservationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CANCEL_RESERVATION_REQUEST:        
            return { ...state, loading: true };
        case CANCEL_RESERVATION_SUCCESS:
            return {
                ...state,
                loading: false,
                responseBody: action.payload.responseBody,
                error: false
            };
        case CANCEL_RESERVATION_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                msg: action.payload.msg
            };
        default:
            return state;
    }
};