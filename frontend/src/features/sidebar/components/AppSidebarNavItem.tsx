import { Link } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "./Sidebar";
import { ReactNode } from "react";

interface AppSidebarNavItemProps {
  children: ReactNode;
  to?: string;
  className?: string;
}

export function AppSidebarNavItem({
  children,
  to,
  className,
}: AppSidebarNavItemProps) {
  return (
    <SidebarMenuItem className={className}>
      <SidebarMenuButton asChild={!!to}>
        {to ? <Link to={to}>{children}</Link> : children}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
