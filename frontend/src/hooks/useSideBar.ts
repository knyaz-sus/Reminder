import { SidebarContext } from "../context/SideBarProvider";
import { useContextTyped } from "./useContextTyped";

export const useSidebar = () => useContextTyped(SidebarContext);
