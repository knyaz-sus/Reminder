import { Button } from "@/components/button";
import { CreateTask } from "@/modules/task/components/create-task";
import { Separator } from "@/components/separator";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useParams } from "react-router-dom";
import { ProjectTasks } from "@/modules/task/components/project-tasks";
import { taskApi } from "@/modules/task/task-api";
import { projectApi } from "@/modules/project/project-api";

export function ProjectPage() {
  const [isCreating, setIsCreating] = useState(false);
  const { id } = useParams();
  const { session, isAuthLoading } = useAuth();

  const {
    data: tasks,
    isPending: isTasksPending,
    isError: isTasksError,
    refetch,
  } = useQuery({
    ...taskApi.getProjectTasksQueryOptions(id),
    enabled: !!session && !isAuthLoading,
  });

  const { data: project, isError: isProjectError } = useQuery({
    ...projectApi.getProjectQueryOptions(id),
  });

  const toggleCreating = () => setIsCreating((prev) => !prev);

  if (isTasksError || isProjectError) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <span>Something went wrong</span>
        <Button onClick={() => refetch()} variant="destructive" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-4">{project?.name}</h1>
      {isTasksPending ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProjectTasks tasks={tasks} projectName={project?.name} />
          {isCreating ? (
            <CreateTask toggleCreating={toggleCreating} />
          ) : (
            <>
              {tasks?.length === 0 && <Separator />}
              <Button
                onClick={toggleCreating}
                className="justify-start pl-0 text-foreground/60 hover:bg-inherit hover:text-foreground"
                size="sm"
                variant="ghost"
              >
                <Plus />
                <span>Add task</span>
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}
