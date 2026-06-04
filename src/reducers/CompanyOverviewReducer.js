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

const currentYear = new Date().getFullYear().toString();

const initialState = {
    // ── Year ──
    availableYears:        [],
    selectedYearStrategic: currentYear,
    selectedYearRevenue:   currentYear,
    selectedYearOther:     currentYear,

    // ── Strategic (Type C) ──
    rows1:      [],
    loadingS:   false,
    errorS:     null,
    pdfStatusS: {},

    // ── Revenue (Type R) ──
    rows2:      [],
    loadingR:   false,
    errorR:     null,
    pdfStatusR: {},

    // ── Other (Type S) ──
    rows3:      [],
    loadingO:   false,
    errorO:     null,
    pdfStatusO: {},

    // ── Sub-items ──
    subItems:        {},
    parentKeyMap:    {},
    dropdownOptions: {},
    selectedOptions: {},

    // ── Multi-year chart cache ──
    // Shape: { [cacheKey]: { loading: bool, error: bool, data: Array } }
    chartData: {},

    // ── UI ──
    expandedRow: null,
    snackbar: { open: false, message: '', severity: 'info' },
};

const kpiReducer = (state = initialState, action) => {
    switch (action.type) {

        // ── Year ──────────────────────────────────────────────────────────────
        case SET_AVAILABLE_YEARS:
            return { ...state, availableYears: action.payload };
        case SET_SELECTED_YEAR_STRATEGIC:
            return { ...state, selectedYearStrategic: action.payload };
        case SET_SELECTED_YEAR_REVENUE:
            return { ...state, selectedYearRevenue: action.payload };
        case SET_SELECTED_YEAR_OTHER:
            return { ...state, selectedYearOther: action.payload };

        // ── Strategic ─────────────────────────────────────────────────────────
        case FETCH_STRATEGIC_REQUEST:
            return { ...state, loadingS: true,  errorS: null };
        case FETCH_STRATEGIC_SUCCESS:
            return { ...state, loadingS: false, rows1: action.payload };
        case FETCH_STRATEGIC_FAILURE:
            return { ...state, loadingS: false, errorS: action.payload };
        case SET_PDF_STATUS_STRATEGIC:
            return { ...state, pdfStatusS: action.payload };

        // ── Revenue ───────────────────────────────────────────────────────────
        case FETCH_REVENUE_REQUEST:
            return { ...state, loadingR: true,  errorR: null };
        case FETCH_REVENUE_SUCCESS:
            return { ...state, loadingR: false, rows2: action.payload };
        case FETCH_REVENUE_FAILURE:
            return { ...state, loadingR: false, errorR: action.payload };
        case SET_PDF_STATUS_REVENUE:
            return { ...state, pdfStatusR: action.payload };

        // ── Other ─────────────────────────────────────────────────────────────
        case FETCH_OTHER_REQUEST:
            return { ...state, loadingO: true,  errorO: null };
        case FETCH_OTHER_SUCCESS:
            return { ...state, loadingO: false, rows3: action.payload };
        case FETCH_OTHER_FAILURE:
            return { ...state, loadingO: false, errorO: action.payload };
        case SET_PDF_STATUS_OTHER:
            return { ...state, pdfStatusO: action.payload };

        // ── Sub-items ─────────────────────────────────────────────────────────
        case SET_SUB_ITEMS:
            return { ...state, subItems: action.payload };
        case SET_PARENT_KEY_MAP:
            return { ...state, parentKeyMap: action.payload };
        case SET_DROPDOWN_OPTIONS:
            return { ...state, dropdownOptions: action.payload };
        case SET_SELECTED_OPTIONS:
            return { ...state, selectedOptions: action.payload };
        case UPDATE_SELECTED_OPTION:
            return {
                ...state,
                selectedOptions: {
                    ...state.selectedOptions,
                    [action.payload.parentKey]: action.payload.value,
                },
            };

        // ── Multi-year chart cache ────────────────────────────────────────────
        case FETCH_CHART_DATA_REQUEST:
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    [action.payload.cacheKey]: { loading: true, error: false, data: [] },
                },
            };
        case FETCH_CHART_DATA_SUCCESS:
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    [action.payload.cacheKey]: { loading: false, error: false, data: action.payload.data },
                },
            };
        case FETCH_CHART_DATA_FAILURE:
            return {
                ...state,
                chartData: {
                    ...state.chartData,
                    [action.payload.cacheKey]: { loading: false, error: true, data: [] },
                },
            };

        // ── UI ────────────────────────────────────────────────────────────────
        case SET_EXPANDED_ROW:
            return { ...state, expandedRow: action.payload };
        case SET_SNACKBAR:
            return {
                ...state,
                snackbar: { open: true, message: action.payload.message, severity: action.payload.severity },
            };
        case CLOSE_SNACKBAR:
            return { ...state, snackbar: { ...state.snackbar, open: false } };

        default:
            return state;
    }
};

export default kpiReducer;