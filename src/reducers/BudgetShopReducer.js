import {
  BUDGET_SHOP_REQUEST,
  BUDGET_SHOP_SUCCESS,
  BUDGET_SHOP_FAIL,
  BUDGET_SHOP_SEARCH_FAIL,
  BUDGET_SHOP_SEARCH_REQUEST,
  BUDGET_SHOP_SEARCH_SUCCESS,
} from "../constants/BudgetShopContant";

const initialState = {
  requestBody: null,
  responseBody: [],
  error: null,
  msg: null,
  loading: false,
};

export const getGetBudgetShopPriceList = (state = initialState, action) => {
  switch (action.type) {
    case BUDGET_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case BUDGET_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
        msg: null,
      };
    case BUDGET_SHOP_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        error: action.payload.error,
        responseBody: null,
      };
    default:
      return state;
  }
};

export const SearchBudgetShop = (state = {}, action) => {
  switch (action.type) {
    case BUDGET_SHOP_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        msg: null,
      };
    case BUDGET_SHOP_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        responseBody: action.payload.responseBody,
      };
    case BUDGET_SHOP_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        msg: action.payload.msg,
        responseBody: null,
      };
    default:
      return state;
  }
};
