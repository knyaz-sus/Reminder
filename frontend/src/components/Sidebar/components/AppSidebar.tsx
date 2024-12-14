import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/Sidebar/components/Sidebar";
import { SidebarRoutes } from "./SidebarRoutes";
import { SidebarProjects } from "./SidebarProjects";
import { SidebarUserMenu } from "./SidebarUserMenu";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarUserMenu />
      </SidebarHeader>
      <SidebarContent>
        <SidebarRoutes />
        <SidebarProjects />
      </SidebarContent>
    </Sidebar>
  );
}
