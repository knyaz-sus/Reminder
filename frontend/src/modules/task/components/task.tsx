import { StaticEditor } from "@/components/editor/static-editor";
import { Separator } from "@/components/separator";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { UpdateTaskModal } from "./update-task-dialog";
import { TaskCheck } from "./task-check";
import { useUpdateTask } from "../hooks/use-update-task";
import { formatTaskDate } from "../utils/format-task-date";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task as TaskType } from "@/types/schemas";

export function Task(props: TaskType & { isSortable: boolean; param: string }) {
  const [open, setOpen] = useState(false);
  const { handleDone } = useUpdateTask(props.param);
  const toggleDone = () => handleDone(props.id, !props.isDone);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      disabled: props.isSortable,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="flex flex-col gap-2 mb-2 bg-background touch-none"
    >
      <div className="flex cursor-pointer group flex-col">
        <div className="flex items-start w-full py-1 gap-2">
          <TaskCheck
            className="mt-[2px]"
            priority={props.priority}
            onClick={toggleDone}
            isDone={props.isDone}
          />
          <div
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1 w-full "
          >
            <StaticEditor content={props.title} />
            {!!props.description && props.description !== "<p></p>" && (
              <StaticEditor
                className="text-xs text-foreground/80"
                content={props.description ? props.description : undefined}
              />
            )}
            {!!props.date && (
              <button className="flex items-start gap-1 text-xs">
                <Calendar size={14} />
                <span>{formatTaskDate(props.date)}</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <Separator />
      <UpdateTaskModal open={open} onOpenChange={setOpen} {...props} />
    </div>
  );
}