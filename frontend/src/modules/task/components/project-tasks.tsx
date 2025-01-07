import { Task as TaskType, Tasks } from "@/types/schemas";
import { Task } from "./task";

interface ProjectTasksProps {
  tasks: Tasks | undefined;
  projectName: string | undefined;
}

export type TaskProps = Omit<TaskType & { projectName?: string }, "date"> & {
  date?: Date;
};

export function ProjectTasks({ tasks, projectName }: ProjectTasksProps) {
  return (
    <div className="flex flex-col gap-2 mb-2">
      {tasks?.map((task) => {
        const taskState: TaskProps = {
          ...task,
          projectName,
          date: task.date ? new Date(task.date) : undefined,
        };
        return <Task key={task.id} {...taskState} />;
      })}
    </div>
  );
}
