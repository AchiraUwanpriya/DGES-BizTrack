import axios from "axios";

const getGetBudgetShopPriceList = async () => {
  return axios.post(`BudgetShop/GetBudgetShopPriceList`).then((response) => {
    return response;
  });
};

const SearchBudgetShop = async (key) => {
  let formData = new FormData();
  formData.append("P_SERCH_KEY", key !== "" ? key.toUpperCase() : "");
  // formData.append("P_SEARCH_KEY", "");

  let config = {
    method: "post",
    url: "BudgetShop/SearchBudgetShop",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });

  // return axios
  //   .get(`BudgetShop/SearchBudgetShop?key=${key}`)
  //   .then((response) => {
  //     // console.log(response);
  //     return response;
  //   });
};

export default {
  getGetBudgetShopPriceList,
  SearchBudgetShop,
};
