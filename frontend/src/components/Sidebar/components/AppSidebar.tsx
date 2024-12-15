import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/Sidebar/components/Sidebar";
import { SidebarRoutes } from "./SidebarRoutes";
import { SidebarProjects } from "./SidebarProjects";
import { SidebarUserMenu } from "./SidebarUserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarUserMenu />
      <SidebarContent>
        <SidebarRoutes />
        <SidebarProjects />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
