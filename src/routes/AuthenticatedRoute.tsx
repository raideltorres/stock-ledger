import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthenticatedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/auth/sign-in"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
}
