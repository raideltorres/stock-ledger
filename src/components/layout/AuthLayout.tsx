import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Outlet />
      <Toaster />
    </div>
  );
}
