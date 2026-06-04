import axios from "axios";

const GetEWODetails = async (ewoNo) => {
  let formData = new FormData();
  formData.append("P_EWO_NO", ewoNo);

  let config = {
    method: "post",
    url: "EWODetails/GetEWODetails",
    data: formData,
  };
  return axios.request(config).then((response) => {
    return response;
  });
};
const RecieveEWODetails = async (formData) => {
  let config = {
    method: "post",
    url: "EWODetails/RecieveEWODetails",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};
const SendEWODetails = async (requestBody) => {
  return axios
    .post(`EWODetails/SendEWODetails`, requestBody)
    .then((response) => {
      return response;
    });
};

const GetEmployeeDetails = async () => {
  let config = {
    method: "post",
    url: "EWODetails/DGESEmployeeDetails",
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const LoadResDetailsByServiceNo  = async () => {
  let config = {
    method: "get",
    url: "Reservation/LoadResDetailsByServiceNo",
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  GetEWODetails,
  RecieveEWODetails,
  SendEWODetails,
  GetEmployeeDetails,
  LoadResDetailsByServiceNo,
};
