import axios from "axios";

const GetTelephoneCard = async () => {
  let config = {
    method: "post",
    url: "PhoneDirectory/DGESGetTelephoneCard",
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

export default {
  GetTelephoneCard,
};
