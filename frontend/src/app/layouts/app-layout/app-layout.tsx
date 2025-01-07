import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/context/sidebar-provider";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "./app-header";

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppHeader />
      <main className="flex justify-center pb-6 pt-16 flex-auto ">
        <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
