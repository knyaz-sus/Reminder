import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./Sidebar";
import { LogOut, Settings } from "lucide-react";
import { UserRow } from "@/types/database";
import { signOut } from "@/features/auth/api/signOut";

export function SidebarUserMenu({ user }: { user?: UserRow }) {
  return (
    <SidebarMenu className="flex-row justify-between items-center">
      <SidebarMenuItem className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage />
          <AvatarFallback>
            {user?.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span>{user?.name}</span>
      </SidebarMenuItem>
      <div className="flex">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Settings />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <LogOut onClick={signOut} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </SidebarMenu>
  );
}
