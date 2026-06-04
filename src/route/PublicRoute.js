import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { number } = useSelector((state) => state.auth);
  return number ? <Outlet /> : <Navigate to="/login" />;
};

export default PublicRoute;
