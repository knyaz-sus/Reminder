import { SidebarGroup, SidebarGroupContent, SidebarMenu } from "./Sidebar";
import {
  CalendarDays,
  CircleCheckBig,
  Inbox,
  Plus,
  Search,
  SquareChartGantt,
} from "lucide-react";
import { AppSidebarNavItem } from "./AppSidebarNavItem";

export function AppSidebarNav() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <AppSidebarNavItem className="text-sidebar-foreground/80">
            <Plus strokeWidth={3} />
            <span className="font-bold">Add new todo</span>
          </AppSidebarNavItem>
          <AppSidebarNavItem>
            <Search />
            <span>Search</span>
          </AppSidebarNavItem>
          <AppSidebarNavItem to="/app/inbox">
            <Inbox />
            <span>Inbox</span>
          </AppSidebarNavItem>
          <AppSidebarNavItem to="/app/today">
            <SquareChartGantt />
            <span>Today</span>
          </AppSidebarNavItem>
          <AppSidebarNavItem to="/app/upcoming">
            <CalendarDays />
            <span>Upcoming</span>
          </AppSidebarNavItem>
          <AppSidebarNavItem to="/app/done">
            <CircleCheckBig />
            <span>Done</span>
          </AppSidebarNavItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
