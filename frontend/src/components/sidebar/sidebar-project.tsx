import { Link, useLocation } from "react-router-dom";
import { SidebarMenuButton } from "./sidebar";
import { Hash } from "lucide-react";
import { Project } from "@/types/schemas";
import { ProjectUpdateDialog } from "@/modules/project/project-update-dialog";

export function SidebarProject(project: Project) {
  const location = useLocation();
  return (
    <SidebarMenuButton
      className="hover-parent"
      isActive={location.pathname === `/app/projects/${project.id}`}
      asChild
    >
      <div className="flex justify-between pr-0">
        <Link
          className="flex flex-auto items-center max-w-full ml-1 overflow-hidden gap-2 [&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground"
          to={`/app/projects/${project.id}`}
        >
          <Hash />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {project.name}
          </span>
        </Link>
        <ProjectUpdateDialog {...project} />
      </div>
    </SidebarMenuButton>
  );
}
