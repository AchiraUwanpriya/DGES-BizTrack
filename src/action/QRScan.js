// import {
//   QR_REQUEST,
//   QR_SUCCESS,
//   QR_FAIL,
//   GET_EWO_DETAILS_REQUEST,
//   GET_EWO_DETAILS_SUCCESS,
//   GET_EWO_DETAILS_FAIL,
//   RECEIVE_EWO_DETAILS_REQUEST,
//   RECEIVE_EWO_DETAILS_SUCCESS,
//   RECEIVE_EWO_DETAILS_FAIL,
//   SEND_EWO_DETAILS_REQUEST,
//   SEND_EWO_DETAILS_SUCCESS,
//   SEND_EWO_DETAILS_FAIL,
// } from "../constants/qrConstants";
// import QRService from "../service/QRService";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const QRScan = (ewoNo, serviceNumber) => async (dispatch) => {
//   dispatch({
//     type: QR_REQUEST,
//     payload: {
//       EWONo: ewoNo,
//     },
//   });

//   dispatch({
//     type: GET_EWO_DETAILS_REQUEST,
//   });

//   return await QRService.GetEWODetails(ewoNo).then(
//     (data) => {
//       if (data.data.StatusCode === 200) {
//         dispatch({
//           type: GET_EWO_DETAILS_SUCCESS,
//           payload: { user: data },
//         });
//         console.log(data.data.ResultSet);
//         if (data.data.ResultSet.IssuedBy !== "") {
//           console.log("1");
//           let formData = new FormData();
//           formData.append("P_EWO_NO", ewoNo);
//           formData.append("P_REMARKS", data.data.ResultSet.Remarks);
//           formData.append(
//             "P_SERIAL_NO",
//             data.data.ResultSet.SerialNo ? data.data.ResultSet.SerialNo : "1"
//           );

//           dispatch({
//             type: RECEIVE_EWO_DETAILS_REQUEST,
//           });

//           //need to uncomment
//           // return QRService.RecieveEWODetails(formData).then(
//           //   (data) => {
//           //     if (data.data.StatusCode === 200) {
//           //       dispatch({
//           //         type: RECEIVE_EWO_DETAILS_SUCCESS,
//           //         payload: { responseBody: data.data },
//           //       });

//           //       dispatch({
//           //         type: GET_EWO_DETAILS_REQUEST,
//           //       });

//           //       return QRService.GetEWODetails(ewoNo).then(
//           //         (data) => {
//           //           dispatch({
//           //             type: GET_EWO_DETAILS_SUCCESS,
//           //             payload: { user: data },
//           //           });
//           //           dispatch({
//           //             type: QR_SUCCESS,
//           //             payload: {
//           //               isButtonVisible: true,
//           //               EWONo: ewoNo,
//           //               responseBody: data.data.ResultSet,
//           //               msg: null,
//           //               loading: false,
//           //               error: null,
//           //             },
//           //           });
//           //           dispatch({
//           //             type: "IS_OPEN",
//           //             payload: { isOpen: false, isOpenDetailScreen: true },
//           //           });
//           //           return Promise.resolve();
//           //         },
//           //         (error) => {
//           //           const message =
//           //             (error.response &&
//           //               error.response.data &&
//           //               error.response.data.message) ||
//           //             error.message ||
//           //             error.toString();

//           //           dispatch({
//           //             type: GET_EWO_DETAILS_FAIL,
//           //           });
//           //           toast.error("GetEWODetails ", message);
//           //           return Promise.reject();
//           //         }
//           //       );
//           //     } else {
//           //       dispatch({
//           //         type: RECEIVE_EWO_DETAILS_FAIL,
//           //       });
//           //     }
//           //     return Promise.resolve();
//           //   },
//           //   (error) => {
//           //     const message =
//           //       (error.response &&
//           //         error.response.data &&
//           //         error.response.data.message) ||
//           //       error.message ||
//           //       error.toString();

//           //     dispatch({
//           //       type: RECEIVE_EWO_DETAILS_FAIL,
//           //     });
//           //     toast.error("RecieveEWODetails ", message);
//           //     return Promise.reject();
//           //   }
//           // );
//         } else if (data.data.ResultSet.RecievedBy !== serviceNumber) {
//           console.log("2");
//           if (data.data.ResultSet.IssuedBy === "") {
//             toast.info(
//               "Work order must be sent by " +
//                 data.data.ResultSet.RecievedBy +
//                 " first"
//             );
//             dispatch({
//               type: QR_SUCCESS,
//               payload: {
//                 isButtonVisible: false,
//                 EWONo: ewoNo,
//                 responseBody: data.data.ResultSet,
//                 msg: null,
//                 loading: false,
//                 error: null,
//               },
//             });
//             dispatch({
//               type: "IS_OPEN",
//               payload: { isOpen: false, isOpenDetailScreen: true },
//             });
//           }
//         } else if (data.data.ResultSet.RecievedBy === serviceNumber) {
//           console.log("3");
//           if (data.data.ResultSet.IssuedBy === "") {
//             dispatch({
//               type: QR_SUCCESS,
//               payload: {
//                 isButtonVisible: true,
//                 EWONo: ewoNo,
//                 responseBody: data.data.ResultSet,
//                 msg: null,
//                 loading: false,
//                 error: null,
//               },
//             });
//             dispatch({
//               type: "IS_OPEN",
//               payload: { isOpen: false, isOpenDetailScreen: true },
//             });
//           } else {
//             dispatch({
//               type: QR_SUCCESS,
//               payload: {
//                 isButtonVisible: false,
//                 EWONo: ewoNo,
//                 responseBody: data.data.ResultSet,
//                 msg: "3",
//                 loading: false,
//                 error: null,
//               },
//             });
//             dispatch({
//               type: "IS_OPEN",
//               payload: { isOpen: false, isOpenDetailScreen: true },
//             });
//           }
//         } else {
//           console.log("end");
//         }
//       } else {
//         toast.info("No data for this EWO Number. Please try again.");
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: QR_FAIL,
//       });
//       toast.error("GetEWODetails " + message);
//       return Promise.reject();
//     }
//   );
// };

// export const SendEWODetails = (responseBody) => async (dispatch) => {
//   dispatch({
//     type: SEND_EWO_DETAILS_REQUEST,
//   });
//   // const data = {
//   //   // ewo_no: responseData.ewo_no,
//   //   // issued_by: serviceNumber,
//   //   // issued_date: issueDate,
//   //   // serial_no: responseData.serial_no,
//   // };

//   let formData = new FormData();
//   formData.append("P_EWO_NO", responseBody.EwoNo);
//   formData.append("P_SERIAL_NO", responseBody.EwoNo);

//   return await QRService.SendEWODetails(formData).then(
//     (data) => {
//       dispatch({
//         type: SEND_EWO_DETAILS_SUCCESS,
//         payload: { user: data },
//       });
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: SEND_EWO_DETAILS_FAIL,
//       });
//       toast.error(message);
//       return Promise.reject();
//     }
//   );
// };

// import {
//   QR_REQUEST,
//   QR_SUCCESS,
//   QR_FAIL,
//   GET_EWO_DETAILS_REQUEST,
//   GET_EWO_DETAILS_SUCCESS,
//   GET_EWO_DETAILS_FAIL,
//   RECEIVE_EWO_DETAILS_REQUEST,
//   RECEIVE_EWO_DETAILS_SUCCESS,
//   RECEIVE_EWO_DETAILS_FAIL,
//   SEND_EWO_DETAILS_REQUEST,
//   SEND_EWO_DETAILS_SUCCESS,
//   SEND_EWO_DETAILS_FAIL,
//   GET_EMPLOYEE_DETAILS_REQUEST,
//   GET_EMPLOYEE_DETAILS_SUCCESS,
//   GET_EMPLOYEE_DETAILS_FAIL,
// } from "../constants/qrConstants";
// import QRService from "../service/QRService";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const GetEmployeeDetails = () => async (dispatch) => {
//   dispatch({
//     type: GET_EMPLOYEE_DETAILS_REQUEST,
//   });

//   return await QRService.GetEmployeeDetails().then(
//     (data) => {
//       if (data.data.StatusCode === 200) {
//         dispatch({
//           type: GET_EMPLOYEE_DETAILS_SUCCESS,
//           payload: { employees: data.data.ResultSet },
//         });
//         return Promise.resolve(data.data.ResultSet);
//       } else {
//         dispatch({
//           type: GET_EMPLOYEE_DETAILS_FAIL,
//           payload: { error: "Failed to fetch employee details" },
//         });
//         toast.error("Failed to fetch employee details");
//         return Promise.reject();
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: GET_EMPLOYEE_DETAILS_FAIL,
//         payload: { error: message },
//       });
//       toast.error("GetEmployeeDetails " + message);
//       return Promise.reject();
//     }
//   );
// };

// export const QRScan = (ewoNo, serviceNumber) => async (dispatch) => {
//   dispatch({
//     type: QR_REQUEST,
//     payload: {
//       EWONo: ewoNo,
//     },
//   });

//   dispatch({
//     type: GET_EWO_DETAILS_REQUEST,
//   });

//   return await QRService.GetEWODetails(ewoNo).then(
//     async (data) => {
//       if (data.data.StatusCode === 200) {
//         const result = data.data.ResultSet || {};
//         const issuedBy = result.IssuedBy || "";
//         const receivedBy = result.RecievedBy || "";
//         const serialNo = result.SerialNo || "1";
//         const remarks = result.Remarks || "";

//         dispatch({
//           type: GET_EWO_DETAILS_SUCCESS,
//           payload: { user: data },
//         });

//         console.log(result);

//         if (issuedBy !== "") {
//           console.log("1");
//           let formData = new FormData();
//           formData.append("P_EWO_NO", ewoNo);
//           formData.append("P_REMARKS", remarks);
//           formData.append("P_SERIAL_NO", serialNo);

//           dispatch({
//             type: RECEIVE_EWO_DETAILS_REQUEST,
//           });

//           return QRService.RecieveEWODetails(formData).then(
//             async (res) => {
//               if (res.data.StatusCode === 200) {
//                 dispatch({
//                   type: RECEIVE_EWO_DETAILS_SUCCESS,
//                   payload: { responseBody: res.data },
//                 });

//                 dispatch({
//                   type: GET_EWO_DETAILS_REQUEST,
//                 });

//                 return QRService.GetEWODetails(ewoNo).then(
//                   (data) => {
//                     dispatch({
//                       type: GET_EWO_DETAILS_SUCCESS,
//                       payload: { user: data },
//                     });
//                     dispatch({
//                       type: QR_SUCCESS,
//                       payload: {
//                         isButtonVisible: true,
//                         EWONo: ewoNo,
//                         responseBody: data.data.ResultSet,
//                         msg: null,
//                         loading: false,
//                         error: null,
//                       },
//                     });
//                     dispatch({
//                       type: "IS_OPEN",
//                       payload: { isOpen: false, isOpenDetailScreen: true },
//                     });
//                     return Promise.resolve();
//                   },
//                   (error) => {
//                     const message =
//                       (error.response &&
//                         error.response.data &&
//                         error.response.data.message) ||
//                       error.message ||
//                       error.toString();

//                     dispatch({
//                       type: GET_EWO_DETAILS_FAIL,
//                     });
//                     toast.error("GetEWODetails " + message);
//                     return Promise.reject();
//                   }
//                 );
//               } else {
//                 dispatch({
//                   type: RECEIVE_EWO_DETAILS_FAIL,
//                 });
//               }
//               return Promise.resolve();
//             },
//             (error) => {
//               const message =
//                 (error.response &&
//                   error.response.data &&
//                   error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//               dispatch({
//                 type: RECEIVE_EWO_DETAILS_FAIL,
//               });
//               toast.error("RecieveEWODetails " + message);
//               return Promise.reject();
//             }
//           );
//         }
//          else if (receivedBy !== serviceNumber) {
//           console.log("2");
//           if (issuedBy === "") {
//             toast.info("Work order must be sent by " + receivedBy + " first");

//             dispatch({
//               type: QR_SUCCESS,
//               payload: {
//                 // isButtonVisible: false,
//                 isButtonVisible: true,
//                 EWONo: ewoNo,
//                 responseBody: result,
//                 msg: null,
//                 loading: false,
//                 error: null,
//               },
//             });

//             dispatch({
//               type: "IS_OPEN",
//               payload: { isOpen: false, isOpenDetailScreen: true },
//             });
//           }
//         }
//         else if (receivedBy === serviceNumber) {
//           console.log("3");

//           dispatch({
//             type: QR_SUCCESS,
//             payload: {
//               // isButtonVisible: issuedBy === "" ? true : false,
//               isButtonVisible: issuedBy === "" ? true : undefined,
//               EWONo: ewoNo,
//               responseBody: result,
//               msg: issuedBy === "" ? null : "3",
//               loading: false,
//               error: null,
//             },
//           });

//           dispatch({
//             type: "IS_OPEN",
//             payload: { isOpen: false, isOpenDetailScreen: true },
//           });
//         }
//          else {
//           console.log("end");
//         }
//       } else {
//         toast.info("No data for this EWO Number. Please try again.");
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: QR_FAIL,
//       });
//       toast.error("GetEWODetails " + message);
//       return Promise.reject();
//     }
//   );
// };

// export const SendEWODetails = (responseBody) => async (dispatch) => {
//   dispatch({
//     type: SEND_EWO_DETAILS_REQUEST,
//   });

//   let formData = new FormData();
//   formData.append("P_EWO_NO", responseBody.EwoNo);
//   formData.append("P_SERIAL_NO", responseBody.SerialNo || "1");

//   return await QRService.SendEWODetails(formData).then(
//     (data) => {
//       dispatch({
//         type: SEND_EWO_DETAILS_SUCCESS,
//         payload: { user: data },
//       });
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: SEND_EWO_DETAILS_FAIL,
//       });
//       toast.error(message);
//       return Promise.reject();
//     }
//   );
// };



///----------------------------------------------------------
// import {
//   QR_REQUEST,
//   QR_SUCCESS,
//   QR_FAIL,
//   GET_EWO_DETAILS_REQUEST,
//   GET_EWO_DETAILS_SUCCESS,
//   GET_EWO_DETAILS_FAIL,
//   RECEIVE_EWO_DETAILS_REQUEST,
//   RECEIVE_EWO_DETAILS_SUCCESS,
//   RECEIVE_EWO_DETAILS_FAIL,
//   SEND_EWO_DETAILS_REQUEST,
//   SEND_EWO_DETAILS_SUCCESS,
//   SEND_EWO_DETAILS_FAIL,
//   GET_EMPLOYEE_DETAILS_REQUEST,
//   GET_EMPLOYEE_DETAILS_SUCCESS,
//   GET_EMPLOYEE_DETAILS_FAIL,
// } from "../constants/qrConstants";
// import QRService from "../service/QRService";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const GetEmployeeDetails = () => async (dispatch) => {
//   dispatch({
//     type: GET_EMPLOYEE_DETAILS_REQUEST,
//   });

//   return await QRService.GetEmployeeDetails().then(
//     (data) => {
//       if (data.data.StatusCode === 200) {
//         dispatch({
//           type: GET_EMPLOYEE_DETAILS_SUCCESS,
//           payload: { employees: data.data.ResultSet },
//         });
//         return Promise.resolve(data.data.ResultSet);
//       } else {
//         dispatch({
//           type: GET_EMPLOYEE_DETAILS_FAIL,
//           payload: { error: "Failed to fetch employee details" },
//         });
//         toast.error("Failed to fetch employee details");
//         return Promise.reject();
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: GET_EMPLOYEE_DETAILS_FAIL,
//         payload: { error: message },
//       });
//       toast.error("GetEmployeeDetails " + message);
//       return Promise.reject();
//     }
//   );
// };

// export const QRScan = (ewoNo, serviceNumber) => async (dispatch) => {
//   dispatch({
//     type: QR_REQUEST,
//     payload: {
//       EWONo: ewoNo,
//     },
//   });

//   dispatch({
//     type: GET_EWO_DETAILS_REQUEST,
//   });

//   return await QRService.GetEWODetails(ewoNo).then(
//     async (data) => {
//       if (data.data.StatusCode === 200) {
//         const result = data.data.ResultSet || {};
//         const issuedBy = result.IssuedBy || "";
//         const receivedBy = result.RecievedBy || "";
//         const serialNo = result.SerialNo || "1";
//         const remarks = result.Remarks || "";

//         dispatch({
//           type: GET_EWO_DETAILS_SUCCESS,
//           payload: { user: data },
//         });

//         console.log(result);

//         if (issuedBy !== "") {
//           console.log("1");
//           let formData = new FormData();
//           formData.append("P_EWO_NO", ewoNo);
//           formData.append("P_REMARKS", remarks);
//           formData.append("P_SERIAL_NO", serialNo);

//           dispatch({
//             type: RECEIVE_EWO_DETAILS_REQUEST,
//           });

//           return QRService.RecieveEWODetails(formData).then(
//             async (res) => {
//               if (res.data.StatusCode === 200) {
//                 dispatch({
//                   type: RECEIVE_EWO_DETAILS_SUCCESS,
//                   payload: { responseBody: res.data },
//                 });

//                 dispatch({
//                   type: GET_EWO_DETAILS_REQUEST,
//                 });

//                 return QRService.GetEWODetails(ewoNo).then(
//                   (data) => {
//                     dispatch({
//                       type: GET_EWO_DETAILS_SUCCESS,
//                       payload: { user: data },
//                     });
//                     dispatch({
//                       type: QR_SUCCESS,
//                       payload: {
//                         isButtonVisible: true,
//                         EWONo: ewoNo,
//                         responseBody: data.data.ResultSet,
//                         msg: null,
//                         loading: false,
//                         error: null,
//                       },
//                     });
//                     dispatch({
//                       type: "IS_OPEN",
//                       payload: { isOpen: false, isOpenDetailScreen: true },
//                     });
//                     return Promise.resolve();
//                   },
//                   (error) => {
//                     const message =
//                       (error.response &&
//                         error.response.data &&
//                         error.response.data.message) ||
//                       error.message ||
//                       error.toString();

//                     dispatch({
//                       type: GET_EWO_DETAILS_FAIL,
//                     });
//                     toast.error("GetEWODetails " + message);
//                     return Promise.reject();
//                   }
//                 );
//               } else {
//                 dispatch({
//                   type: RECEIVE_EWO_DETAILS_FAIL,
//                 });
//               }
//               return Promise.resolve();
//             },
//             (error) => {
//               const message =
//                 (error.response &&
//                   error.response.data &&
//                   error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//               dispatch({
//                 type: RECEIVE_EWO_DETAILS_FAIL,
//               });
//               toast.error("RecieveEWODetails " + message);
//               return Promise.reject();
//             }
//           );
//         } else if (receivedBy !== serviceNumber) {
//           console.log("2");
//           if (issuedBy === "") {
//             toast.info("Work order must be sent by " + receivedBy + " first");

//             dispatch({
//               type: QR_SUCCESS,
//               payload: {
//                 // isButtonVisible: false,
//                 isButtonVisible: true,
//                 EWONo: ewoNo,
//                 responseBody: result,
//                 msg: null,
//                 loading: false,
//                 error: null,
//               },
//             });

//             dispatch({
//               type: "IS_OPEN",
//               payload: { isOpen: false, isOpenDetailScreen: true },
//             });
//           }
//         } else if (receivedBy === serviceNumber) {
//           console.log("3");

//           dispatch({
//             type: QR_SUCCESS,
//             payload: {
//               // isButtonVisible: issuedBy === "" ? true : false,
//               isButtonVisible: issuedBy === "" ? true : undefined,
//               EWONo: ewoNo,
//               responseBody: result,
//               msg: issuedBy === "" ? null : "3",
//               loading: false,
//               error: null,
//             },
//           });

//           dispatch({
//             type: "IS_OPEN",
//             payload: { isOpen: false, isOpenDetailScreen: true },
//           });
//         } else {
//           console.log("end");
//         }
//       } else {
//         toast.info("No data for this EWO Number. Please try again.");
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: QR_FAIL,
//       });
//       toast.error("GetEWODetails " + message);
//       return Promise.reject();
//     }
//   );
// };

// export const SendEWODetails =
//   (responseBody, serviceNo, remarks = "") =>
//   async (dispatch) => {
//     dispatch({
//       type: SEND_EWO_DETAILS_REQUEST,
//     });

//     if (serviceNo && serviceNo.length > 7) {
//       toast.error("Service number must be 7 characters or less");
//       dispatch({
//         type: SEND_EWO_DETAILS_FAIL,
//       });
//       return Promise.reject();
//     }

//     let formData = new FormData();
//     formData.append("P_EWO_NO", responseBody.EwoNo);
//     formData.append("P_SERIAL_NO", responseBody.SerialNo || "1");
//     formData.append("P_ISERVICE_NO", serviceNo);
//     formData.append("P_REMARKS", remarks || responseBody.Remarks || "");

//     return await QRService.SendEWODetails(formData).then(
//       (data) => {
//         dispatch({
//           type: SEND_EWO_DETAILS_SUCCESS,
//           payload: { user: data },
//         });
//         return Promise.resolve();
//       },
//       (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         dispatch({
//           type: SEND_EWO_DETAILS_FAIL,
//         });
//         toast.error(message);
//         return Promise.reject();
//       }
//     );
//   };



//praveen
import {
  QR_REQUEST,
  QR_SUCCESS,
  QR_FAIL,
  GET_EWO_DETAILS_REQUEST,
  GET_EWO_DETAILS_SUCCESS,
  GET_EWO_DETAILS_FAIL,
  RECEIVE_EWO_DETAILS_REQUEST,
  RECEIVE_EWO_DETAILS_SUCCESS,
  RECEIVE_EWO_DETAILS_FAIL,
  SEND_EWO_DETAILS_REQUEST,
  SEND_EWO_DETAILS_SUCCESS,
  SEND_EWO_DETAILS_FAIL,
  GET_EMPLOYEE_DETAILS_REQUEST,
  GET_EMPLOYEE_DETAILS_SUCCESS,
  GET_EMPLOYEE_DETAILS_FAIL,
} from "../constants/qrConstants";
import QRService from "../service/QRService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const GetEmployeeDetails = () => async (dispatch) => {
  dispatch({
    type: GET_EMPLOYEE_DETAILS_REQUEST,
  });

  return await QRService.GetEmployeeDetails().then(
    (data) => {
      if (data.data.StatusCode === 200) {
        dispatch({
          type: GET_EMPLOYEE_DETAILS_SUCCESS,
          payload: { employees: data.data.ResultSet },
        });
        return Promise.resolve(data.data.ResultSet);
      } else {
        dispatch({
          type: GET_EMPLOYEE_DETAILS_FAIL,
          payload: { error: "Failed to fetch employee details" },
        });
        toast.error("Failed to fetch employee details");
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_EMPLOYEE_DETAILS_FAIL,
        payload: { error: message },
      });
      toast.error("GetEmployeeDetails " + message);
      return Promise.reject();
    }
  );
};

//Existing code for QRScan with the  issued or received the work order

// export const QRScan = (ewoNo, serviceNumber) => async (dispatch) => {
//   dispatch({
//     type: QR_REQUEST,
//     payload: {
//       EWONo: ewoNo,
//     },
//   });

//   dispatch({
//     type: GET_EWO_DETAILS_REQUEST,
//   });

//   return await QRService.GetEWODetails(ewoNo).then(
//     async (data) => {
//       if (data.data.StatusCode === 200) {
//         const result = data.data.ResultSet || {};
//         const issuedBy = result.IssuedBy || "";
//         const receivedBy = result.RecievedBy || "";
//         const serialNo = result.SerialNo || "1";
//         const remarks = result.Remarks || "";

//         dispatch({
//           type: GET_EWO_DETAILS_SUCCESS,
//           payload: { user: data },
//         });

//         console.log(result);

//         if (issuedBy !== "") {
//           console.log("1");
//           let formData = new FormData();
//           formData.append("P_EWO_NO", ewoNo);
//           formData.append("P_REMARKS", remarks);
//           formData.append("P_SERIAL_NO", serialNo);

//           dispatch({
//             type: RECEIVE_EWO_DETAILS_REQUEST,
//           });

//           return QRService.RecieveEWODetails(formData).then(
//             async (res) => {
//               if (res.data.StatusCode === 200) {
//                 dispatch({
//                   type: RECEIVE_EWO_DETAILS_SUCCESS,
//                   payload: { responseBody: res.data },
//                 });

//                 dispatch({
//                   type: GET_EWO_DETAILS_REQUEST,
//                 });

//                 return QRService.GetEWODetails(ewoNo).then(
//                   (data) => {
//                     dispatch({
//                       type: GET_EWO_DETAILS_SUCCESS,
//                       payload: { user: data },
//                     });
//                     dispatch({
//                       type: QR_SUCCESS,
//                       payload: {
//                         isButtonVisible: true,
//                         EWONo: ewoNo,
//                         responseBody: data.data.ResultSet,
//                         msg: null,
//                         loading: false,
//                         error: null,
//                       },
//                     });
//                     dispatch({
//                       type: "IS_OPEN",
//                       payload: { isOpen: false, isOpenDetailScreen: true },
//                     });
//                     return Promise.resolve();
//                   },
//                   (error) => {
//                     const message =
//                       (error.response &&
//                         error.response.data &&
//                         error.response.data.message) ||
//                       error.message ||
//                       error.toString();

//                     dispatch({
//                       type: GET_EWO_DETAILS_FAIL,
//                     });
//                     toast.error("GetEWODetails " + message);
//                     return Promise.reject();
//                   }
//                 );
//               } else {
//                 dispatch({
//                   type: RECEIVE_EWO_DETAILS_FAIL,
//                 });
//               }
//               return Promise.resolve();
//             },
//             (error) => {
//               const message =
//                 (error.response &&
//                   error.response.data &&
//                   error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//               dispatch({
//                 type: RECEIVE_EWO_DETAILS_FAIL,
//               });
//               toast.error("RecieveEWODetails " + message);
//               return Promise.reject();
//             }
//           );
//         } else if (receivedBy !== serviceNumber) {
//           console.log("2");
//           if (issuedBy === "") {
//             toast.info("Work order must be sent by " + receivedBy + " first");

//             dispatch({
//               type: QR_SUCCESS,
//               payload: {
//                 // isButtonVisible: false,
//                 isButtonVisible: true,
//                 EWONo: ewoNo,
//                 responseBody: result,
//                 msg: null,
//                 loading: false,
//                 error: null,
//               },
//             });

//             dispatch({
//               type: "IS_OPEN",
//               payload: { isOpen: false, isOpenDetailScreen: true },
//             });
//           }
//         } else if (receivedBy === serviceNumber) {
//           console.log("3");

//           dispatch({
//             type: QR_SUCCESS,
//             payload: {
//               // isButtonVisible: issuedBy === "" ? true : false,
//               isButtonVisible: issuedBy === "" ? true : undefined,
//               EWONo: ewoNo,
//               responseBody: result,
//               msg: issuedBy === "" ? null : "3",
//               loading: false,
//               error: null,
//             },
//           });

//           dispatch({
//             type: "IS_OPEN",
//             payload: { isOpen: false, isOpenDetailScreen: true },
//           });
//         } else {
//           console.log("end");
//         }
//       } else {
//         toast.info("No data for this EWO Number. Please try again.");
//       }
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: QR_FAIL,
//       });
//       toast.error("GetEWODetails " + message);
//       return Promise.reject();
//     }
//   );
// };

//Modify Qr scan based on Anyone can now scan any QR code and see its details
export const QRScan = (ewoNo, serviceNumber) => async (dispatch) => {
  dispatch({
    type: QR_REQUEST,
    payload: {
      EWONo: ewoNo,
    },
  });

  dispatch({
    type: GET_EWO_DETAILS_REQUEST,
  });

  return await QRService.GetEWODetails(ewoNo).then(
    async (data) => {
      if (data.data.StatusCode === 200) {
        const result = data.data.ResultSet || {};
        const issuedBy = result.IssuedBy || "";
        const receivedBy = result.RecievedBy || "";
        const serialNo = result.SerialNo || "1";
        const remarks = result.Remarks || "";

        dispatch({
          type: GET_EWO_DETAILS_SUCCESS,
          payload: { user: data },
        });

        // console.log(result);
        // console.log("QR details available for everyone");
        
        dispatch({
          type: QR_SUCCESS,
          payload: {
            isButtonVisible: true, 
            EWONo: ewoNo,
            responseBody: result,
            msg: null,
            loading: false,
            error: null,
          },
        });

        dispatch({
          type: "IS_OPEN",
          payload: { isOpen: false, isOpenDetailScreen: true },
        });
      } else {
        toast.info("No data for this EWO Number. Please try again.");
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: QR_FAIL,
      });
      toast.error("GetEWODetails " + message);
      return Promise.reject();
    }
  );
};

export const SendEWODetails =
  (responseBody, serviceNo, remarks = "") =>
  async (dispatch) => {
    dispatch({
      type: SEND_EWO_DETAILS_REQUEST,
    });

    if (serviceNo && serviceNo.length > 7) {
      toast.error("Service number must be 7 characters or less");
      dispatch({
        type: SEND_EWO_DETAILS_FAIL,
      });
      return Promise.reject();
    }

    let formData = new FormData();
    formData.append("P_EWO_NO", responseBody.EwoNo);
    formData.append("P_SERIAL_NO", responseBody.SerialNo || "1");
    formData.append("P_ISERVICE_NO", serviceNo);
    formData.append("P_REMARKS", remarks || responseBody.Remarks || "");

    return await QRService.SendEWODetails(formData).then(
      (data) => {
        dispatch({
          type: SEND_EWO_DETAILS_SUCCESS,
          payload: { user: data },
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: SEND_EWO_DETAILS_FAIL,
        });
        toast.error(message);
        return Promise.reject();
      }
    );
  };
