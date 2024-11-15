import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./Sidebar";
import { LogOut, Settings } from "lucide-react";
import { UserRow } from "@/types/database";
import { signOut } from "@/features/auth/api/signOut";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";

export function AppSidebarHeader({ user }: { user?: UserRow }) {
  return (
    <SidebarHeader>
      <SidebarGroup>
        <SidebarGroupContent>
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
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarHeader>
  );
}
