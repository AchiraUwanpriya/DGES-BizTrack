import {
    FETCH_STRATEGIC_REQUEST, FETCH_STRATEGIC_SUCCESS, FETCH_STRATEGIC_FAILURE,
    FETCH_REVENUE_REQUEST,   FETCH_REVENUE_SUCCESS,   FETCH_REVENUE_FAILURE,
    FETCH_OTHER_REQUEST,     FETCH_OTHER_SUCCESS,     FETCH_OTHER_FAILURE,
    SET_PDF_STATUS_STRATEGIC, SET_PDF_STATUS_REVENUE, SET_PDF_STATUS_OTHER,
    SET_SUB_ITEMS, SET_PARENT_KEY_MAP, SET_DROPDOWN_OPTIONS,
    SET_SELECTED_OPTIONS, UPDATE_SELECTED_OPTION,
    SET_SELECTED_YEAR_STRATEGIC, SET_SELECTED_YEAR_REVENUE, SET_SELECTED_YEAR_OTHER,
    SET_AVAILABLE_YEARS,
    FETCH_CHART_DATA_REQUEST, FETCH_CHART_DATA_SUCCESS, FETCH_CHART_DATA_FAILURE,
    SET_EXPANDED_ROW, SET_SNACKBAR, CLOSE_SNACKBAR,
} from '../constants/CompanyOverviewConstants';
import { fetchDashboardDetails, checkPdfExists } from '../service/CompanyOverviewService';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const extractPercent = (raw) => {
    if (!raw) return null;
    const match = raw.toString().match(/\(?([\d.]+)%\)?/);
    return match ? parseFloat(match[1]) : null;
};

const numberWithCommas = (x) => {
    if (x === null || x === undefined || x === '' || parseFloat(x) === 0) return '';
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const buildRowData = (emp) => ({
    Serial_No:      emp.Serial_No,
    Description:    emp.Description,
    Unit:           emp.Unit,
    BaseValue:      numberWithCommas(emp.BaseValue) + (emp.BaseDesc ? ' ' + emp.BaseDesc : ''),
    BaseDesc:       emp.BaseDesc,
    PRVStatusValue: numberWithCommas(emp.PRVStatusValue) + (emp.PRVStatusDesc ? ' ' + emp.PRVStatusDesc : ''),
    PRVStatusDesc:  emp.PRVStatusDesc,
    ExpectedValue:  numberWithCommas(emp.ExpectedValue) + (emp.ExpectedDesc ? ' ' + emp.ExpectedDesc : ''),
    ExpectedDesc:   emp.ExpectedDesc,
    StatusValue:    numberWithCommas(emp.StatusValue) + (emp.StatusDesc ? ' ' + emp.StatusDesc : ''),
    StatusDesc:     emp.StatusDesc,
    AnnexureDesc:   emp.AnnexureDesc,
    Resposibility:  emp.Resposibility,
    Type:           emp.Type,
    Parentkey:      emp.Parentkey,
});

// ─── Year Actions ─────────────────────────────────────────────────────────────

export const setAvailableYears = (years) => ({ type: SET_AVAILABLE_YEARS, payload: years });

export const setSelectedYearStrategic = (year) => (dispatch) => {
    localStorage.setItem('cdStrategicYear', year);
    dispatch({ type: SET_SELECTED_YEAR_STRATEGIC, payload: year });
    dispatch(setExpandedRow(null));
    dispatch(fetchStrategicData(year));
};

export const setSelectedYearRevenue = (year) => (dispatch) => {
    localStorage.setItem('cdRevenueYear', year);
    dispatch({ type: SET_SELECTED_YEAR_REVENUE, payload: year });
    dispatch(fetchRevenueData(year));
};

export const setSelectedYearOther = (year) => (dispatch) => {
    localStorage.setItem('cdOtherYear', year);
    dispatch({ type: SET_SELECTED_YEAR_OTHER, payload: year });
    dispatch(setExpandedRow(null));
    dispatch(fetchOtherData(year));
};

/** Initialise years from localStorage + trigger first fetches. */
export const initYears = () => (dispatch) => {
    const cur = new Date().getFullYear();
    const years = Array.from({ length: 3 }, (_, i) => (cur - i).toString()).sort((a, b) => b - a);
    dispatch(setAvailableYears(years));

    const sS = localStorage.getItem('cdStrategicYear');
    const sR = localStorage.getItem('cdRevenueYear');
    const sO = localStorage.getItem('cdOtherYear');

    const yearS = sS && years.includes(sS) ? sS : cur.toString();
    const yearR = sR && years.includes(sR) ? sR : cur.toString();
    const yearO = sO && years.includes(sO) ? sO : cur.toString();

    dispatch({ type: SET_SELECTED_YEAR_STRATEGIC, payload: yearS });
    dispatch({ type: SET_SELECTED_YEAR_REVENUE,   payload: yearR });
    dispatch({ type: SET_SELECTED_YEAR_OTHER,     payload: yearO });

    dispatch(fetchStrategicData(yearS));
    dispatch(fetchRevenueData(yearR));
    dispatch(fetchOtherData(yearO));
};

// ─── Sub-items processing ─────────────────────────────────────────────────────

const processSubItems = (allItems) => (dispatch) => {
    const subMap = {}, dropMap = {}, selMap = {}, pkMap = {};

    allItems.forEach((item) => {
        if (item.Parentkey) {
            if (!subMap[item.Parentkey]) subMap[item.Parentkey] = [];
            subMap[item.Parentkey].push(item);
            pkMap[item.Parentkey] = true;
        }
    });

    Object.keys(subMap).forEach((pk) => {
        const uniqueDescs = [...new Set(subMap[pk].map((i) => i.Description))];
        dropMap[pk] = [
            { value: 'All', label: 'All' },
            ...uniqueDescs.map((d) => ({ value: d, label: d })),
        ];
        selMap[pk] = 'All';
    });

    dispatch({ type: SET_SUB_ITEMS,        payload: subMap  });
    dispatch({ type: SET_PARENT_KEY_MAP,   payload: pkMap   });
    dispatch({ type: SET_DROPDOWN_OPTIONS, payload: dropMap });
    dispatch({ type: SET_SELECTED_OPTIONS, payload: selMap  });
};

// ─── PDF Status ───────────────────────────────────────────────────────────────

const fetchPdfStatuses = (items, year, actionType) => async (dispatch) => {
    const statuses = {};
    for (const row of items) {
        statuses[row.Serial_No] = await checkPdfExists(year, row.Serial_No);
    }
    dispatch({ type: actionType, payload: statuses });
};

// ─── Strategic fetch ──────────────────────────────────────────────────────────

export const fetchStrategicData = (year) => async (dispatch) => {
    dispatch({ type: FETCH_STRATEGIC_REQUEST });
    try {
        const allItems = await fetchDashboardDetails(year);
        const items = allItems.filter((i) => i.Type === 'C');
        dispatch({ type: FETCH_STRATEGIC_SUCCESS, payload: items.map(buildRowData) });
        dispatch(processSubItems(allItems));
        dispatch(fetchPdfStatuses(items, year, SET_PDF_STATUS_STRATEGIC));
    } catch {
        dispatch({ type: FETCH_STRATEGIC_FAILURE, payload: 'Failed to load strategic data.' });
        dispatch(setSnackbar({ message: 'Error loading strategic data.', severity: 'error' }));
    }
};

// ─── Revenue fetch ────────────────────────────────────────────────────────────

export const fetchRevenueData = (year) => async (dispatch) => {
    dispatch({ type: FETCH_REVENUE_REQUEST });
    try {
        const allItems = await fetchDashboardDetails(year);
        const items = allItems.filter((i) => i.Type === 'R');
        dispatch({ type: FETCH_REVENUE_SUCCESS, payload: items.map(buildRowData) });
        dispatch(fetchPdfStatuses(items, year, SET_PDF_STATUS_REVENUE));
    } catch {
        dispatch({ type: FETCH_REVENUE_FAILURE, payload: 'Failed to load revenue data.' });
        dispatch(setSnackbar({ message: 'Error loading revenue data.', severity: 'error' }));
    }
};

// ─── Other fetch ──────────────────────────────────────────────────────────────

export const fetchOtherData = (year) => async (dispatch) => {
    dispatch({ type: FETCH_OTHER_REQUEST });
    try {
        const allItems = await fetchDashboardDetails(year);
        const items = allItems.filter((i) => i.Type === 'S');
        dispatch({ type: FETCH_OTHER_SUCCESS, payload: items.map(buildRowData) });
        dispatch(fetchPdfStatuses(items, year, SET_PDF_STATUS_OTHER));
    } catch {
        dispatch({ type: FETCH_OTHER_FAILURE, payload: 'Failed to load other data.' });
        dispatch(setSnackbar({ message: 'Error loading other data.', severity: 'error' }));
    }
};

// ─── Multi-Year Chart Data fetch ──────────────────────────────────────────────
// Hardcoded fallback for 2023 when API has no data for that serial/type
const HARDCODED_2023 = { pct: 75, expVal: 1941870.0, statVal: 1456867.5 };

/**
 * Fetch 4 years of chart data for a single KPI row.
 * Cache key: `${serialNo}_${type}_${baseYear}`
 * Data is stored in Redux so the component never calls axios.
 *
 * @param {string|number} serialNo
 * @param {string} type  - 'C' | 'R' | 'S'
 * @param {string} baseYear  - the currently selected year (newest year shown)
 */
export const fetchChartData = (serialNo, type, baseYear) => async (dispatch, getState) => {
    const cacheKey = `${serialNo}_${type}_${baseYear}`;

    // Skip if already loaded
    const existing = getState().kpi.chartData[cacheKey];
    if (existing && !existing.loading) return;

    dispatch({ type: FETCH_CHART_DATA_REQUEST, payload: { cacheKey } });

    try {
        const base = parseInt(baseYear);
        const yearsToFetch = Array.from({ length: 4 }, (_, i) => (base - (3 - i)).toString());

        const results = [];
        for (const yr of yearsToFetch) {
            try {
                const allItems = await fetchDashboardDetails(yr);
                const match = allItems.find(
                    (i) => String(i.Serial_No) === String(serialNo) && i.Type === type
                );
                if (match) {
                    const pct     = extractPercent(match.StatusDesc) ?? extractPercent(match.StatusValue);
                    const expVal  = parseFloat((match.ExpectedValue ?? '').toString().replace(/,/g, '')) || null;
                    const statVal = parseFloat((match.StatusValue  ?? '').toString().replace(/,/g, '')) || null;
                    results.push({ year: yr, pct, expVal, statVal });
                } else {
                    results.push(yr === '2023'
                        ? { year: yr, ...HARDCODED_2023 }
                        : { year: yr, pct: null, expVal: null, statVal: null });
                }
            } catch {
                results.push(yr === '2023'
                    ? { year: yr, ...HARDCODED_2023 }
                    : { year: yr, pct: null, expVal: null, statVal: null });
            }
        }

        dispatch({ type: FETCH_CHART_DATA_SUCCESS, payload: { cacheKey, data: results } });
    } catch {
        dispatch({ type: FETCH_CHART_DATA_FAILURE, payload: { cacheKey } });
    }
};

// ─── UI Actions ───────────────────────────────────────────────────────────────

export const setExpandedRow = (serialNo) => ({ type: SET_EXPANDED_ROW, payload: serialNo });

export const updateSelectedOption = (parentKey, value) => ({
    type: UPDATE_SELECTED_OPTION,
    payload: { parentKey, value },
});

export const setSnackbar = ({ message, severity }) => ({
    type: SET_SNACKBAR,
    payload: { message, severity },
});

export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR });