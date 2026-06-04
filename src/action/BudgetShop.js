import {
  BUDGET_SHOP_FAIL,
  BUDGET_SHOP_REQUEST,
  BUDGET_SHOP_SUCCESS,
  BUDGET_SHOP_SEARCH_FAIL,
  BUDGET_SHOP_SEARCH_REQUEST,
  BUDGET_SHOP_SEARCH_SUCCESS,
} from "../constants/BudgetShopContant";
import BudgetShopService from "../service/BudgetShopService";

export const getGetBudgetShopPriceList = (query) => async (dispatch) => {
  dispatch({
    type: BUDGET_SHOP_REQUEST,
  });
  // console.log(query);
  if (query === "") {
    return await BudgetShopService.SearchBudgetShop("").then(
      (data) => {
        //  console.log(data);
        if (data.data.StatusCode === 200) {
          dispatch({
            type: BUDGET_SHOP_SUCCESS,
            payload: {
              responseBody: data.data.ResultSet,
            },
          });
        } else if (data.data.StatusCode === 404) {
          dispatch({
            type: BUDGET_SHOP_FAIL,
            payload: {
              error: "No Data found",
            },
          });
        } else {
          dispatch({
            type: BUDGET_SHOP_FAIL,
            payload: {
              error: "Failed to load budget shop items",
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
          type: BUDGET_SHOP_FAIL,
          payload: {
            error: message,
          },
        });
        return Promise.reject();
      }
    );
  } else {
    return await BudgetShopService.SearchBudgetShop(query).then(
      (data) => {
        //  console.log(data);
        if (data.data.StatusCode === 200) {
          dispatch({
            type: BUDGET_SHOP_SUCCESS,
            payload: {
              responseBody: data.data.ResultSet,
            },
          });
        } else if (data.data.StatusCode === 404) {
          dispatch({
            type: BUDGET_SHOP_FAIL,
            payload: {
              error: "No Data found",
            },
          });
        }else {
          dispatch({
            type: BUDGET_SHOP_FAIL,
            payload: {
              error: "Failed to load budget shop items",
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
          type: BUDGET_SHOP_FAIL,
          payload: {
            error: message,
          },
        });
        return Promise.reject();
      }
    );
  }
};

export const SearchBudgetShop = (key) => async (dispatch) => {
  dispatch({
    type: BUDGET_SHOP_SEARCH_REQUEST,
  });
};
