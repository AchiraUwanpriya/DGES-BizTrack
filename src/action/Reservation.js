import {
    HISTORY_REQUEST,
    HISTORY_SUCCESS,
    HISTORY_FAIL,
    RESDETAILS_REQUEST,
    RESDETAILS_SUCCESS,
    RESDETAILS_FAIL,
    PRIORITY_LIST_REQUEST,
    PRIORITY_LIST_SUCCESS,
    PRIORITY_LIST_FAIL,
    LOG_RESERVATION_REQUEST,
    LOG_RESERVATION_SUCCESS,
    LOG_RESERVATION_FAIL,
    CANCEL_RESERVATION_FAIL,
    CANCEL_RESERVATION_SUCCESS,
    CANCEL_RESERVATION_REQUEST

    
} from "../constants/ReservationContant";

import ReservationService from "../service/ReservationService";

export const GetResDetailsHistory = () => async (dispatch) => {
    dispatch({ type: HISTORY_REQUEST });

    try {
        const response = await ReservationService.GetResDetailsHistory();
        
        if (response.data.StatusCode === 200) {
            dispatch({
                type: HISTORY_SUCCESS,
                payload: {
                    responseBody: response.data.ResultSet,
                },
            });
        } else {
            dispatch({
                type: HISTORY_FAIL,
                payload: {
                    msg: response.data.Message || "No data found",
                },
            });
        }
        return Promise.resolve();
    } catch (error) {
        const message = 
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: HISTORY_FAIL,
            payload: { msg: message }
        });
        return Promise.reject(error);
    }
};



export const GetPriorityListByDate = (bungalowId, date) => async (dispatch) => {
    dispatch({ type: PRIORITY_LIST_REQUEST });

    try {
        const response = await ReservationService.GetPriorityListByDate(bungalowId, date);
        
        if (response.data.StatusCode === 200) {
            dispatch({
                type: PRIORITY_LIST_SUCCESS,
                payload: {
                    responseBody: response.data.ResultSet,
                    bungalowId,
                    date
                },
            });
        } else {
            dispatch({
                type: PRIORITY_LIST_FAIL,
                payload: {
                    msg: response.data.Message || "No priority list data found",
                },
            });
        }
        return Promise.resolve(response.data.ResultSet);
    } catch (error) {
        const message = 
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: PRIORITY_LIST_FAIL,
            payload: { msg: message }
        });
        return Promise.reject(error);
    }
};




export const GetLoadResDetails = () => async (dispatch) => {
    dispatch({ type: RESDETAILS_REQUEST });

    try {
        const response = await ReservationService.GetLoadResDetails(); 
        
        if (response.data.StatusCode === 200) {
            dispatch({
                type: RESDETAILS_SUCCESS,
                payload: {
                    responseBody: response.data.ResultSet,
                },
            });
        } else {
            dispatch({
                type: RESDETAILS_FAIL,
                payload: {
                    msg: response.data.Message || "No data found",
                },
            });
        }
        return Promise.resolve();
    } catch (error) {
        const message = 
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: RESDETAILS_FAIL,
            payload: { msg: message }
        });
        return Promise.reject(error);
    }
};



export const PostResvationLog = () => async (dispatch) => {
    dispatch({ type: LOG_RESERVATION_REQUEST });
    try {
        const response = await ReservationService.PostResvationLog();
        
        if (response.data.StatusCode === 200) {
            dispatch({
                type: LOG_RESERVATION_SUCCESS,
                payload: {
                    responseBody: response.data.ResultSet,
                },
            }); 
            return { success: true, data: response.data };
        } else { 
            const errorObj = {
                response: {
                    data: response.data
                }
            };
            
            dispatch({
                type: LOG_RESERVATION_FAIL,
                payload: {
                    msg: response.data.Message || "Failed to log reservation",
                },
            });
             
            throw errorObj;
        }
    } catch (error) {
        const message = 
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        
        dispatch({
            type: LOG_RESERVATION_FAIL,
            payload: { msg: message }
        });
         
        throw error;
    }
};

export const UpdateResStatus = () => async (dispatch) => {
    dispatch({ type: CANCEL_RESERVATION_REQUEST });     
    try {
        const response = await ReservationService.UpdateResStatus();
        if (response.data.StatusCode === 200) {
            dispatch({
                type: CANCEL_RESERVATION_SUCCESS,
                payload: {
                    responseBody: response.data.ResultSet,
                },
            }); 
            return { success: true, data: response.data };
        } else { 
            const errorObj = {
                response: {
                    data: response.data
                }
            };  
            dispatch({
                type: CANCEL_RESERVATION_FAIL,
                payload: {
                    msg: response.data.Message || "Failed to update reservation status",
                },
            });
             
            throw errorObj;
        }
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        dispatch({
            type: CANCEL_RESERVATION_FAIL,
            payload: { msg: message }
        });
         
        throw error;
    }   
};




