import * as constants from '../constants/caregiverConstants';

const initialState = {
  loading: false,
  data: [],
  error: null,
  statusUpdateLoading: false,
  feedbackLoading: false,
  feedbackData: {}, // Store feedback data by reservation number
  feedbackLoadingById: {}, // Track loading state per reservation
  feedbackErrorById: {}, // Track errors per reservation
};

const caregiverReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.CAREGIVER_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case constants.CAREGIVER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    
    case constants.CAREGIVER_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: []
      };
    
    case constants.CAREGIVER_UPDATE_STATUS_REQUEST:
      return {
        ...state,
        statusUpdateLoading: true
      };
    
    case constants.CAREGIVER_UPDATE_STATUS_SUCCESS: 
      const updatedData = state.data.map(item => 
        item.Res_no === action.payload.reservationNo 
          ? { ...item, Res_CheckStatus: action.payload.checkStatus }
          : item
      );
      
      return {
        ...state,
        statusUpdateLoading: false,
        data: updatedData
      };
    
    case constants.CAREGIVER_UPDATE_STATUS_FAILURE:
      return {
        ...state,
        statusUpdateLoading: false,
        error: action.payload
      };
    
    case constants.CAREGIVER_ADD_FEEDBACK_REQUEST:
      return {
        ...state,
        feedbackLoading: true
      };
    
    case constants.CAREGIVER_ADD_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbackLoading: false
      };
    
    case constants.CAREGIVER_ADD_FEEDBACK_FAILURE:
      return {
        ...state,
        feedbackLoading: false,
        error: action.payload
      };
    
    case constants.CAREGIVER_FETCH_FEEDBACK_REQUEST:
      return {
        ...state,
        feedbackLoadingById: {
          ...state.feedbackLoadingById,
          [action.payload]: true
        },
        feedbackErrorById: {
          ...state.feedbackErrorById,
          [action.payload]: null
        }
      };
    
    case constants.CAREGIVER_FETCH_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedbackData: {
          ...state.feedbackData,
          [action.payload.reservationNo]: action.payload.feedbackData
        },
        feedbackLoadingById: {
          ...state.feedbackLoadingById,
          [action.payload.reservationNo]: false
        },
        feedbackErrorById: {
          ...state.feedbackErrorById,
          [action.payload.reservationNo]: null
        }
      };
    
    case constants.CAREGIVER_FETCH_FEEDBACK_FAILURE:
      return {
        ...state,
        feedbackLoadingById: {
          ...state.feedbackLoadingById,
          [action.payload.reservationNo]: false
        },
        feedbackErrorById: {
          ...state.feedbackErrorById,
          [action.payload.reservationNo]: action.payload
        }
      };
    
    default:
      return state;
  }
};

export default caregiverReducer;