import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { ProjectCreate } from "../../project/project-create";
import { SidebarProject } from "./sidebar-project";
import { useLocation } from "react-router-dom";
import { projectApi } from "@/modules/project/project-api";
import { SidebarGroup, SidebarGroupContent } from "../sidebar";

export function SidebarProjects() {
  const location = useLocation();
  const { session, isAuthLoading } = useAuth();
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery({
    ...projectApi.getAllProjectsQueryOptions(
      session?.user.id,
      session?.access_token
    ),
    enabled: !!session?.user && !isAuthLoading,
  });
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
