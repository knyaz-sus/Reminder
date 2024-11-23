import { Link, useLocation } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./Sidebar";
import { sidebarMenuRoutes } from "../constants";

export function SidebarRoutes() {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="text-sidebar-foreground/80 hover:text-none">
            <SidebarMenuButton className="hover:text-none">
              <Plus strokeWidth={3} />
              <span className="font-semibold">Add new todo</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Search />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {sidebarMenuRoutes.map((route) => {
            const { path, name, Icon } = route;
            return (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === path}
                >
                  <Link to={path}>
                    <Icon />
                    <span>{name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
