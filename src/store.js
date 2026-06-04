import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import message from "./reducers/message";
import { authReducer } from "./reducers/userReducers";
import {
  qrScanReducer,
  qrIsOpenClose,
  GetEWODetailsReducer,
  RecieveEWODetailsReducer,
  SendEWODetailsReducer,
} from "./reducers/qrReducers";
import {
  getBannerImages,
  GetAccessHeadComponent,
  GetUserByServiceNo,
} from "./reducers/publicReducer";

import {
  getGetBudgetShopPriceList,
  SearchBudgetShop,
} from "./reducers/BudgetShopReducer";
import { GetAttendanceCard } from "./reducers/AttendanceReducer";
import { GetTelephoneCard } from "./reducers/TelephoneReducer";
import {
  GetLeaveBalance,
  GetNotEnteredLeave,
  GetPunctuality,
  GetLeaveSummary,
} from "./reducers/LeaveReducer";
import {
  GetUserMedicalDetails,
  GetMedicalIndoorUsageDetails,
  GetMedicalOutdoorUsageDetails,
} from "./reducers/MedicalReducer";
import { GetOutstandingToolsDetails } from "./reducers/Outstanding_ToolsReducer";
import { GetJobCard , GetUnAssignedList } from "./reducers/JobAllocationReducer";
import {resDetailsHistoryReducer , loadResDetailsReducer ,logReservationReducer,cancelReservationReducer} from "./reducers/ReservationReducer";
import { employeeReducer } from "./reducers/EmployeeReducer";
import caregiverReducer from './reducers/caregiverReducer';
import kpiReducer from './reducers/CompanyOverviewReducer';

const reducer = combineReducers({
  message: message,
  auth: authReducer,
  qr: qrScanReducer,
  resDetailsHistory: resDetailsHistoryReducer,
  loadResDetails: loadResDetailsReducer,
  logReservation: logReservationReducer,
  cancelReservation: cancelReservationReducer,
  getEWO: GetEWODetailsReducer,
  receiveEWO: RecieveEWODetailsReducer,
  sendEWO: SendEWODetailsReducer,
  qrVisible: qrIsOpenClose,
  banner: getBannerImages,
  budgetItem: getGetBudgetShopPriceList,
  // budgetItemSearch: SearchBudgetShop,
  attendanceCard: GetAttendanceCard,
  employee: employeeReducer,
  telephoneCard: GetTelephoneCard,
  leaveBalance: GetLeaveBalance,
  notEnteredLeave: GetNotEnteredLeave,
  punctuality: GetPunctuality,
  headComponent: GetAccessHeadComponent,
  userbyServiceNo: GetUserByServiceNo,
  leaveSummery: GetLeaveSummary,
  userMedicalDetails: GetUserMedicalDetails,
  medicalIndoorUsageDetails: GetMedicalIndoorUsageDetails,
  medicalOutdoorUsageDetails: GetMedicalOutdoorUsageDetails,
  tools: GetOutstandingToolsDetails,
  JobCard: GetJobCard,
  UnAssignedList: GetUnAssignedList,
  caregiver: caregiverReducer,
  kpi: kpiReducer,
});

const middlware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
