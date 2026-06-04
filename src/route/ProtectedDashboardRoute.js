import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedDashboardRoute = ({ children }) => {
  const { number, isLoggedIn, user, data } = useSelector((state) => state.auth);
  const { headComponent } = useSelector((state) => state.headComponent);
  
  const serviceNo = String(
    user?.ServiceNo || data?.[0]?.ServiceNo || number || "",
  ).trim();
   
  const hasDashboardAccess = headComponent?.some(
    (component) => component.ComponentId === "EMOBCI0013"
  ); 
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
 
  if (!hasDashboardAccess) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedDashboardRoute;