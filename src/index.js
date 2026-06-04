import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext"; 
 
axios.defaults.baseURL = "https://esystems.cdl.lk/backendDGES/BizTrack/";

// axios.defaults.baseURL = "https://esystems.cdl.lk/backendDGES-Test/BizTrack/";

//  axios.defaults.baseURL = "http://localhost:51976/";

// axios.defaults.baseURL = "/";
// axios.defaults.baseURL = "https://esystems.cdl.lk/backend-test/BizTrack/";
//axios.defaults.baseURL = "http://172.30.30.96:2500";
//  axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.get["Accept"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);

serviceWorkerRegistration.register();
reportWebVitals();
