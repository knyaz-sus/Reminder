import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible";
import { SidebarGroup, SidebarGroupContent } from "./Sidebar";
import { ChevronDown } from "lucide-react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/api/fetchProjects";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ProjectCreate } from "./ProjectCreate";
import { SidebarProject } from "./SidebarProject";
import { useLocation } from "react-router-dom";
export function SidebarProjects() {
  const location = useLocation();
  const { session } = useAuth();
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery(
    queryOptions({
      queryKey: ["user-projects", { session }],
      queryFn: () => fetchProjects(session?.user.id, session?.access_token),
    })
  );

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <Collapsible defaultOpen className="group/collapsible">
          <div
            className="flex justify-between items-center gap-2
          w-full rounded-md pl-2 py-1 overflow-hidden outline-none 
          text-sidebar-foreground/80 text-left text-sm font-semibold
          hover:bg-sidebar-accent"
          >
            <div className="flex-auto">My projects</div>
            <ProjectCreate />
            <CollapsibleTrigger className="[&>svg]:size-4 [&>svg]:shrink-0 p-1">
              <ChevronDown
                strokeWidth={3}
                className="ml-auto transition-transform 
            group-data-[state=open]/collapsible:rotate-180
            hover:text-sidebar-foreground"
              />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="overflow-auto">
            {isPending && <div>Loading...</div>}
            {isError && <div>Can't get projects</div>}
            {!!projects &&
              (projects.length === 0 ? (
                <div className="text-center p-4">
                  You don't have any projects
                </div>
              ) : (
                projects.map((project) => {
                  const { id, adminId, name } = project;
                  return (
                    <SidebarProject
                      key={id}
                      id={id}
                      adminId={adminId}
                      name={name}
                      isActive={
                        location.pathname === `/app/projects/${project.id}`
                      }
                    />
                  );
                })
              ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
