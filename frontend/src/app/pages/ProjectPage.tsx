import { Button } from "@/components/Button";
import { CreateTask } from "@/features/task/components/CreateTask";
import { Separator } from "@/components/Separator";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/fetchTasks";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { fetchProject } from "@/api/fetchProject";
import { Task } from "@/features/task/components/Task";

export function ProjectPage() {
  const { id } = useParams();
  const { session } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => fetchTasks(id, session?.access_token),
    queryKey: ["user-tasks", { session }, id],
  });
  const { data: project } = useQuery({
    queryFn: () => fetchProject(id, session?.access_token),
    queryKey: ["projectId", id],
  });
  const toggleCreating = () => setIsCreating((prev) => !prev);
  if (isError) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center">
        <span>Can't acceess tasks</span>
        <Button onClick={() => refetch()} variant="destructive" size="sm">
          Retry
        </Button>
      </div>
    );
  }
  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }
  return (
    <>
      <h1 className="mb-4">{project?.name}</h1>
      <div className="flex flex-col gap-2 mb-2">
        {tasks?.map((task) => (
          <Task {...task} key={task.id} />
        ))}
      </div>
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
  );
}
