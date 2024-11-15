import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible";
import { SidebarGroup, SidebarGroupContent } from "./Sidebar";
import { ChevronDown, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebarProjects() {
  return (
    <SidebarGroup>
      <Collapsible defaultOpen className="group/collapsible">
        <div
          className="flex justify-between items-center gap-2
          w-full rounded-md p-1 overflow-hidden outline-none 
          text-sidebar-foreground/80 text-left text-sm font-semibold
          hover:bg-sidebar-accent"
        >
          <Link className="flex-auto" to="/app">
            My projects
          </Link>
          <button
            className="[&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground"
            onClick={() => console.log("add project")}
          >
            <Plus strokeWidth={3} />
          </button>
          <CollapsibleTrigger className="[&>svg]:size-4 [&>svg]:shrink-0 p-1">
            <ChevronDown
              strokeWidth={3}
              className="ml-auto transition-transform 
            group-data-[state=open]/collapsible:rotate-180
            hover:text-sidebar-foreground"
            />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <SidebarGroupContent>тут будут проекты</SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
