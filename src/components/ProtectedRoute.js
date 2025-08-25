import { useEffect } from "react";
import { fetchUserProfile } from "../store/user/thunkCreators";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isSignedIn } = useSelector((state) => state.sessions);
  const userDetails = useSelector((state) => state.user);

   const {
    user: { role },
    isLoading,
  } = userDetails;


  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ Don’t check role until we’ve finished loading user data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
