import { TaskState, TaskStateProvider } from "@/context/TaskStateProvider";
import { Tasks } from "@/types/schemas";
import { Task } from "./Task";

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
          console.log(task.title, Number(new Date(task.createdAt)));
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
