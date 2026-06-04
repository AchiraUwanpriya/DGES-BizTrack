import axios from "axios";

const readAuthKey = () => {
  const raw = localStorage.getItem("token");
  if (!raw) return "";
  try {
    const parsed = JSON.parse(raw);
    return parsed || raw;
  } catch (err) {
    return raw;
  }
};

const getBannerImages = async () => {
  return axios.get(`home/GetBannerImgList`).then((response) => {
    return response;
  });
};

const GetAccessHeadComponent = async () => {
  return axios.post(`Access/DGESGetAccessHeadComponent`).then((response) => {
    return response;
  });
};


const GetUserByServiceNo = async () => {
 
  
  return axios.post(`login/DGESGetUserByServiceNo`)
    .then((response) => {

      if (
        response.data &&
        response.data.ResultSet &&
        response.data.ResultSet.length > 0
      ) {
        const serviceNo = response.data.ResultSet[0].ServiceNo;

        localStorage.setItem("ServiceNo", serviceNo);
      }

      return response;
    });
};
const GetToDoList = async () => {
  const authKey = readAuthKey();
  return axios.get(`DailyCollect/DGESGetSupplier`, {
    headers: {
      "auth-key": authKey,
    },
  }).then((response) => {
    return response;
  });
};

const GetDailyCollect = async (params = {}) => {
  const authKey = readAuthKey();
  return axios.get(`DailyCollect/DGESGetDailyCollect`, {
    headers: {
      "auth-key": authKey,
    },
    params,
  }).then((response) => {
    return response;
  });
};

const PostDailyCollect = async (payload) => {
  const authKey = readAuthKey();
  return axios
    .post(`DailyCollect/DGESPostDailyCollect`, payload, {
      headers: {
        "auth-key": authKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    });
};

const UpdateDailyCollect = async (payload) => {
  const authKey = readAuthKey();
  return axios
    .post(`DailyCollect/DGESUpdateDailyCollect`, payload, {
      headers: {
        "auth-key": authKey,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    });
};

const GetCdllocbaseAttendance = async () => {
  return axios.get("Attendancedashboard/GetDGESlocbaseAttendance").then((response) => {
    return response;
  });
};

const GetEmployeeNoPay = async (barcodeNo, currentYear) => {
  return axios.get(`Attendancedashboard/GetDGESEmployeeNoPay`, {
    params: {
      p_barcode_no: barcodeNo,
      p_current_year: currentYear
    }
  }).then((response) => {
    return response;
  });
};

const GetEmployeeDetails = async (p_sno) => {
  return axios.get(`Attendancedashboard/GetDGESEmployeeDetails`, {
    params: {
      p_sno: p_sno
    }
  }).then((response) => {
    return response;
  });
};
const GetEmployeeAttSummary = async (p_sno) => {
  return axios.get(`Attendancedashboard/GetDGESEmployeeAttSummary`, {
    params: {
      p_sno: p_sno
    }
  }).then((response) => {
    return response;
  });
};

const GetEmployeeOtherInfo = async (p_sno) => {
  return axios.get(`Attendancedashboard/GetDGESEmployeeOtherInfo`, {
    params: {
      p_sno: p_sno
    }
  }).then((response) => {
    return response;
  });
};

export default {
  getBannerImages,
  GetAccessHeadComponent,
  GetUserByServiceNo,
  GetToDoList,
  GetDailyCollect,
  PostDailyCollect,
  UpdateDailyCollect,
  GetCdllocbaseAttendance,
  GetEmployeeNoPay,
  GetEmployeeDetails,
  GetEmployeeAttSummary,
  GetEmployeeOtherInfo
};
