import axios from "axios";

const GetUserMedicalDetails = async (year) => {
    let formData = new FormData();
    formData.append("P_YEAR", year);

    let config = {
        method: "post",
        url: "Medical/GetUserMedicalDetails",
        data: formData,
    };

    return await axios.request(config).then((response) => {
        return response;
    });
};

const GetMedicalIndoorUsageDetails = async (year) => {
    let formData = new FormData();
    formData.append("P_YEAR", year);

    let config = {
        method: "post",
        url: "Medical/GetMedicalIndoorUsageDetails",
        data : formData,
    };

    return await axios.request(config).then((response) => {
        return response;
    });
};

const GetMedicalOutdoorUsageDetails = async (year) => {
    let formData = new FormData();
    formData.append("P_YEAR", year);

    let config = {
        method: "post",
        url: "Medical/GetMedicalOutdoorUsageDetails",
        data : formData,
    };

    return await axios.request(config).then((response) => {
        return response;
    });
};

export default {
    GetUserMedicalDetails,
    GetMedicalIndoorUsageDetails,
    GetMedicalOutdoorUsageDetails,
};