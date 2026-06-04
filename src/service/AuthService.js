import axios from "axios";

const login = async (service_no,password,device, ip) => {
  let formData = new FormData();
  formData.append("P_SERVICE_NO", service_no);
  formData.append("P_PASSWORD", password);
  formData.append("P_DEVICE", device);
  formData.append("P_IP", ip);

  let config = {
    method: "post",
    url: "Login/DGESLogin",
    data: formData,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};



export default {
  login,

};
