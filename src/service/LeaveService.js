import axios from "axios";

const GetLeaveBalance = async (month) => {
  let formData = new FormData();
  formData.append("P_YEAR", month);

  let config = {
    method: "post",
    url: "Leave/GetLeaveBalance",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetNotEnteredLeave = async (month) => {
  let formData = new FormData();
  formData.append("P_YEAR", month);

  let config = {
    method: "post",
    url: "Leave/GetNotEnteredLeave",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetPunctuality = async (month) => {
  let formData = new FormData();
  formData.append("P_YEAR", month);

  let config = {
    method: "post",
    url: "Leave/GetPunctuality",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetLeaveSummary = async (month) => {
  let formData = new FormData();
  formData.append("P_YEAR", month);

  let config = {
    method: "post",
    url: "Leave/GetLeaveSummary",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  GetLeaveBalance,
  GetNotEnteredLeave,
  GetPunctuality,
  GetLeaveSummary,
};
