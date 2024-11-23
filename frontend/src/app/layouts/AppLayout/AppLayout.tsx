import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserRow } from "@/types/database";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getUserById } from "@/features/auth/api/getUserById";
import { SidebarProvider } from "@/features/sidebar/SideBarProvider";
import { AppSidebar } from "@/features/sidebar/components/AppSidebar";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  const { authUser, isAuthLoading } = useAuth();
  const { data: user } = useQuery<UserRow>({
    queryKey: ["user"],
    queryFn: () => getUserById(authUser?.id),
    enabled: !!authUser && !isAuthLoading,
    refetchOnWindowFocus: false,
  });

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
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
