import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { selectUserSlice } from "@/store/slices";
import { useAuth } from "@/hooks/useAuth";

export default function AdministrativeRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const userState = useSelector(selectUserSlice);

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/auth/sign-in"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return userState.user.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" />
  );
}
