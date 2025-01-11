import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { ProjectTasks } from "@/modules/task/components/project-tasks";
import { projectApi } from "@/modules/project/project-api";

export function ProjectPage() {
  const { id } = useParams();

  const [isCreating, setIsCreating] = useState(false);
  const location = useLocation();
  useEffect(() => setIsCreating(false), [location]);

  const { data: project, isError: isProjectError } = useQuery({
    ...projectApi.getProjectQueryOptions(id),
  });
  const toggleCreating = () => setIsCreating((prev) => !prev);

  if (isProjectError) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <span>Something went wrong</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-auto max-w-[85vw] lg:max-w-3xl">
      <h1 className="mb-4">{project?.name}</h1>
      <ProjectTasks
        param={id as string}
        projectName={project?.name}
        isCreating={isCreating}
        toggleCreating={toggleCreating}
      />
    </div>
  );
}
