import { useLoginStore } from "../store/loginStore";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const userLogins = useLoginStore((state) => state.logins);
  const location = useLocation();
  return (
    userLogins?.roles?.find(role => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : userLogins?.accessToken ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  )
};

export default RequireAuth;
