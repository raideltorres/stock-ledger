import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Toaster } from "../ui/sonner";

export function VerticalLayout() {
  return (
    <div className="size-full flex flex-col">
      <Navigation />

      <div className="relative min-h-screen size-full flex overflow-hidden">
        <Outlet />
        <Toaster />
      </div>

      <Footer />
    </div>
  );
}
