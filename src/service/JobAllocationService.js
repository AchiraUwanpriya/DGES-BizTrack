import axios from "axios";

const GetJobCard = async (date) => {

  let formData = new FormData();
  formData.append("P_DATE", date);

  let config = {
    method: "post",
    url: "JobAllocation/GetJobCard",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetUnAssignedList = async (date) => {

  let formData = new FormData();
  formData.append("P_DATE", date);

  let config = {
    method: "post",
    url: "JobAllocation/GetUnAssignedList",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
    GetJobCard,
    GetUnAssignedList,
};
