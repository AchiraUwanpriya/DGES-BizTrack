import axios from "axios";
import { method } from "lodash";

const GetResDetailsHistory = async () => {
    let config = {
        method: "get",
        url: "Reservation/ResDetailsHistory",
    };

    return axios.request(config).then((response) => {
        return response;
    });
};

const GetLoadResDetails = async () => {
    let config = {
        method: "get",
        url: "Reservation/LoadResDetails",
    };

    return axios.request(config).then((response) => {
        return response;
    });
};

const UpdateCaretakerReport = async (data) => {
  let config = {
    method: "post",
    url: "Reservation/UpdateCaretakerReport",
    data: data
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const GetGuestFeeDetails = async (reservationNo) => {
  let config = {
    method: "get",
    url: `Reservation/GetGuestFeeDetails?P_RESNO=${reservationNo}`,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};


const GetPriorityListByDate = async (bungalowId, date) => {
  let config = {
    method: "get",
    url: `Reservation/GetPriortyListbydate?P_BUNGALOW_ID=${bungalowId}&P_CHECK_IN=${date}`,
  };

  return axios.request(config).then((response) => {
    return response;
  });
};

const PostResvationLog = async () => {
  const logId = localStorage.getItem("logId");
  let config = {
    method: "post",
    url: `EntryLog/PostResvationLog?P_LOGID=${logId}`, 
  };
 return axios.request(config).then((response) => {
    if (response?.data?.StatusCode === 200) {
      const resultText = response.data.Result;  
 
      const snoMatch = resultText.match(/sno:\s*(\d+)/);

      if (snoMatch && snoMatch[1]) {
        const sno = snoMatch[1];
        localStorage.setItem("sno", sno);
        console.log("sno saved to localStorage:", sno);
      }
    }

    return response;
  });
}


const UpdateResStatus = async () => {
    const logId = localStorage.getItem("logId");
    const serialNo = localStorage.getItem("sno");
  let config = {

    method: "post",
    url: `EntryLog/UpdateResStatus?P_LOGID=${logId}&P_SERIAL_NO=${serialNo}`, 
  };
  return axios.request(config).then((response) => {
    return response;
  });
};



export default {
    GetResDetailsHistory,
    GetLoadResDetails,
    GetGuestFeeDetails,
    UpdateCaretakerReport ,
    GetPriorityListByDate,
    PostResvationLog,
    UpdateResStatus
};