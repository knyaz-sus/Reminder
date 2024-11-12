import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserRow } from "@/types/database";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserById } from "@/features/auth/api/getUserById";
import { Button } from "@/components/Button";
import { signOut } from "@/features/auth/api/signOut";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/features/sidebar/components/Sidebar";
import { SidebarProvider } from "@/features/sidebar/context/SideBarProvider";
import { AppSidebar } from "./AppSideBar";

export function AppLayout() {
  const { authUser, isAuthLoading } = useAuth();
  const { data: user } = useQuery<UserRow>({
    queryKey: ["user"],
    queryFn: () => getUserById(authUser?.id),
    enabled: !!authUser && !isAuthLoading,
  });
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-auto flex-col min-h-screen pl-6 pt-3 pb-3 pr-6">
        <header className="flex justify-between items-center w-full pb-2">
          <SidebarTrigger />
          <ThemeToggle />
        </header>
        <main>
          <Outlet />
          <Button onClick={signOut}>{user?.name}</Button>
        </main>
      </div>
    </SidebarProvider>
  );
}
