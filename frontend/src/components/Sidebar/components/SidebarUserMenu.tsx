import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./Sidebar";
import { LogOut, Settings } from "lucide-react";

import { signOut } from "@/features/auth/api/signOut";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/api/fetchUser";

export function SidebarUserMenu() {
  const { session, isAuthLoading } = useAuth();
  const { data: user } = useQuery({
    queryKey: ["user", { session }],
    queryFn: () => fetchUser(session?.user.id, session?.access_token),
    enabled: !!session?.user && !isAuthLoading,
    refetchOnWindowFocus: false,
  });
  return (
    <SidebarMenu className="flex-row justify-between items-center">
      <SidebarMenuItem className="flex gap-2 items-center text-sm">
        <Avatar>
          <AvatarImage />
          <AvatarFallback className="bg-secondary text-secondary-foreground p-1 rounded-full">
            {user?.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold">{user?.name}</span>
      </SidebarMenuItem>
      <div className="flex">
        <SidebarMenuItem>
          <SidebarMenuButton size="sm">
            <Settings />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton size="sm">
            <LogOut onClick={signOut} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </SidebarMenu>
  );
}
