import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/context/SideBarProvider";
import { AppSidebar } from "@/components/Sidebar/components/AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
 
  return (
    <SidebarProvider>
      <AppSidebar />
      <div
        className="flex flex-auto flex-col 
                   min-h-screen pl-6 pt-3 pb-3 pr-6"
      >
        <AppHeader />
        <main className="flex justify-center">
          <div className="flex flex-col flex-auto max-w-3xl">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
