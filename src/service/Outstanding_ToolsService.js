import axios from "axios";

 const GetOutstandingToolsDetails = async () => {
  //   let formData = new FormData();
  let config = {
    method: "post",
    url: "Tools/GetOutstandingToolsDetails",
  };
  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  GetOutstandingToolsDetails
};