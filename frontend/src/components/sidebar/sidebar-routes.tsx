import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { sidebarMenuRoutes } from "./constants";

export function SidebarRoutes() {
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Search />
              <span>Search</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {sidebarMenuRoutes.map((route, index) => {
            const { path, name, Icon } = route;
            return (
              <SidebarMenuItem key={path + index}>
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
