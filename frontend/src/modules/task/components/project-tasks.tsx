import { TaskState, TaskStateProvider } from "@/context/taskstate-provider";
import { Tasks } from "@/types/schemas";
import { Task } from "./task";

interface ProjectTasksProps {
  tasks: Tasks | undefined;
  projectName: string | undefined;
}

export function ProjectTasks({ tasks, projectName }: ProjectTasksProps) {
  return (
    <div className="flex flex-col gap-2 mb-2">
      {tasks
        ?.sort((a, b) => {
          return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt));
        })
        .map((task) => {
          const taskState: TaskState = {
            ...task,
            projectName,
            date: task.date ? new Date(task.date) : undefined,
          };
          return (
            <TaskStateProvider key={task.id} {...taskState}>
              <Task />
            </TaskStateProvider>
          );
        })}
    </div>
  );
}
