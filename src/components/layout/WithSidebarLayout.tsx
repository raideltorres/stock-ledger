import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { Toaster } from "@/components/ui/sonner";

export default function WithSidebarLayout() {
  return (
    <div className="size-full flex flex-col">
      <Navigation />

      <div className="relative min-h-screen size-full flex overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <main className="relative size-full flex">
            <SidebarTrigger className="absolute top-2 left-2" />
            <Outlet />
            <Toaster />
          </main>
        </SidebarProvider>
      </div>

      <Footer />
    </div>
  );
}
