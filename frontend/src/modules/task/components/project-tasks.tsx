import { Task as TaskType } from "@/types/schemas";
import { Task } from "./task";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useUpdateTaskOrder } from "../hooks/use-update-task-order";
import { CreateTask } from "./create-task";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/separator";
import { useQuery } from "@tanstack/react-query";
import { taskApi } from "../task-api";
import { useEffect, useState } from "react";
import { useTaskSensors } from "../hooks/use-task-sensors";

interface ProjectTasksProps {
  projectName: string | undefined;
  param: string;
  isCreating: boolean;
  toggleCreating: () => void;
}

export type TaskProps = Omit<TaskType & { projectName?: string }, "date"> & {
  date?: Date;
};

export function ProjectTasks({
  param,
  projectName,
  isCreating,
  toggleCreating,
}: ProjectTasksProps) {
  const sensors = useTaskSensors();

  const { data, isFetching } = useQuery({
    ...taskApi.getProjectTasksQueryOptions(param),
    select(data) {
      return data?.sort((a, b) => a.order - b.order);
    },
  });

  const [tasks, setTasks] = useState(data);
  useEffect(() => setTasks(data), [data, isFetching]);

  const { handleUpdateOrder } = useUpdateTaskOrder(param);

  if (!tasks) return <div>Loading...</div>;

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const updatedTasks = arrayMove(tasks, oldIndex, newIndex).map(
        (task, i) => {
          task.order = i + 1;
          return task;
        }
      );

      setTasks(updatedTasks);
      handleUpdateOrder(updatedTasks);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col">
          {tasks.map((task) => {
            const taskState: TaskProps = {
              ...task,
              projectName,
              date: task.date ? new Date(task.date) : undefined,
            };
            return <Task key={task.id} {...taskState} />;
          })}
          {isCreating ? (
            <CreateTask
              order={tasks.length + 1}
              toggleCreating={toggleCreating}
            />
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
        </div>
      </SortableContext>
    </DndContext>
  );
}
