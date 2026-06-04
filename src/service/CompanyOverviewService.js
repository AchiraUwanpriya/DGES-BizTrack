import axios from 'axios';

const BASE_URL = 'https://esystems.cdl.lk/backend/kpi/KPI_Dashboard';


export const fetchDashboardDetails = async (year) => {
    const res = await axios.get(`${BASE_URL}/DashboardDetails?year=${year}`);
    if (!res.data?.ResultSet) throw new Error('No ResultSet in response');
    return res.data.ResultSet;
};

export const checkPdfExists = async (year, serialNo) => {
    try {
        await axios.get(`${BASE_URL}/ViewPDF?PDFName=${year}_${serialNo}`, { responseType: 'blob' });
        return true;
    } catch {
        return false;
    }
};

export const getPdfUrl = (year, serialNo) =>
    `${BASE_URL}/ViewPDF?PDFName=${year}_${serialNo}`;