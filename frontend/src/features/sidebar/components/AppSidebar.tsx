import { Sidebar, SidebarContent } from "@/features/sidebar/components/Sidebar";
import { UserRow } from "@/types/database";
import { AppSidebarNav } from "./AppSidebarNav";
import { AppSidebarHeader } from "./AppSidebarHeader";
import { AppSidebarProjects } from "./AppSidebarProjects";

export function AppSidebar({ user }: { user?: UserRow }) {
  return (
    <Sidebar>
      <AppSidebarHeader user={user} />
      <SidebarContent>
        <AppSidebarNav />
        <AppSidebarProjects />
      </SidebarContent>
    </Sidebar>
  );
}
