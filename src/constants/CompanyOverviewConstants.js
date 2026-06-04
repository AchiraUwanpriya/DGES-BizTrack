// ─── Strategic (Type: C) ──────────────────────────────────────────────────────
export const FETCH_STRATEGIC_REQUEST = 'FETCH_STRATEGIC_REQUEST';
export const FETCH_STRATEGIC_SUCCESS = 'FETCH_STRATEGIC_SUCCESS';
export const FETCH_STRATEGIC_FAILURE = 'FETCH_STRATEGIC_FAILURE';

// ─── Revenue (Type: R) ────────────────────────────────────────────────────────
export const FETCH_REVENUE_REQUEST = 'FETCH_REVENUE_REQUEST';
export const FETCH_REVENUE_SUCCESS = 'FETCH_REVENUE_SUCCESS';
export const FETCH_REVENUE_FAILURE = 'FETCH_REVENUE_FAILURE';

// ─── Other (Type: S) ─────────────────────────────────────────────────────────
export const FETCH_OTHER_REQUEST = 'FETCH_OTHER_REQUEST';
export const FETCH_OTHER_SUCCESS = 'FETCH_OTHER_SUCCESS';
export const FETCH_OTHER_FAILURE = 'FETCH_OTHER_FAILURE';

// ─── PDF Status ───────────────────────────────────────────────────────────────
export const SET_PDF_STATUS_STRATEGIC = 'SET_PDF_STATUS_STRATEGIC';
export const SET_PDF_STATUS_REVENUE   = 'SET_PDF_STATUS_REVENUE';
export const SET_PDF_STATUS_OTHER     = 'SET_PDF_STATUS_OTHER';

// ─── Sub Items & Dropdowns ────────────────────────────────────────────────────
export const SET_SUB_ITEMS        = 'SET_SUB_ITEMS';
export const SET_PARENT_KEY_MAP   = 'SET_PARENT_KEY_MAP';
export const SET_DROPDOWN_OPTIONS = 'SET_DROPDOWN_OPTIONS';
export const SET_SELECTED_OPTIONS = 'SET_SELECTED_OPTIONS';
export const UPDATE_SELECTED_OPTION = 'UPDATE_SELECTED_OPTION';

// ─── Year Selection ───────────────────────────────────────────────────────────
export const SET_SELECTED_YEAR_STRATEGIC = 'SET_SELECTED_YEAR_STRATEGIC';
export const SET_SELECTED_YEAR_REVENUE   = 'SET_SELECTED_YEAR_REVENUE';
export const SET_SELECTED_YEAR_OTHER     = 'SET_SELECTED_YEAR_OTHER';
export const SET_AVAILABLE_YEARS         = 'SET_AVAILABLE_YEARS';

// ─── Multi-Year Chart Data ────────────────────────────────────────────────────
// key: `${serialNo}_${type}_${baseYear}`  →  value: array of { year, pct, expVal, statVal }
export const FETCH_CHART_DATA_REQUEST = 'FETCH_CHART_DATA_REQUEST';
export const FETCH_CHART_DATA_SUCCESS = 'FETCH_CHART_DATA_SUCCESS';
export const FETCH_CHART_DATA_FAILURE = 'FETCH_CHART_DATA_FAILURE';

// ─── UI ───────────────────────────────────────────────────────────────────────
export const SET_EXPANDED_ROW = 'SET_EXPANDED_ROW';
export const SET_SNACKBAR     = 'SET_SNACKBAR';
export const CLOSE_SNACKBAR   = 'CLOSE_SNACKBAR';