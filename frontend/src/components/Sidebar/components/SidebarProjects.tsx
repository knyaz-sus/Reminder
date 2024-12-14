import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/Collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
} from "./Sidebar";
import { ChevronDown, Plus, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProjects } from "@/api/fetchProjects";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { addProject } from "@/api/addProject";
import { ProjectsDropdown } from "./ProjectsDropdown";

export function SidebarProjects() {
  const queryClient = useQueryClient();
  const { session, isAuthLoading } = useAuth();
  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-projects", { session }],
    queryFn: () => fetchProjects(session?.user.id, session?.access_token),
    enabled: !!session?.user && !isAuthLoading,
  });
  const { mutateAsync: addProjectMutation } = useMutation({
    mutationFn: () =>
      addProject(
        "sgdsgsgdsdgsgsdgdsgsdgsdgsdgdsdgsg",
        session?.access_token,
        session?.user.id
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
    },
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
            <button className="[&>svg]:size-4 [&>svg]:shrink-0 p- hover:text-sidebar-foreground">
              <Plus
                onClick={async () => {
                  try {
                    await addProjectMutation();
                  } catch (e) {
                    console.log(e);
                  }
                }}
                strokeWidth={3}
              />
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
            {isLoading && <div>Loading...</div>}
            {isError && <div>Can't get projects</div>}
            {!!projects &&
              (projects.length === 0 ? (
                <div>You don't have any projects</div>
              ) : (
                projects.map((project) => (
                  <SidebarMenuButton
                    className="justify-between pr-0"
                    key={project.id}
                    asChild
                  >
                    <div>
                      <Link
                        className="flex items-center max-w-full ml-1 overflow-hidden gap-2 [&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground"
                        to={`/app/projects/${project.id}`}
                      >
                        <Target />
                        <span className="text-ellipsis whitespace-nowrap overflow-hidden">
                          {project.name}
                        </span>
                      </Link>
                      <ProjectsDropdown
                        projectId={project.id}
                        adminId={project.admin_id}
                      />
                    </div>
                  </SidebarMenuButton>
                ))
              ))}
          </CollapsibleContent>
        </Collapsible>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
