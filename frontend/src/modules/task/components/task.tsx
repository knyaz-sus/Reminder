import { Button } from "@/components/button";
import { StaticEditor } from "@/components/editor/static-editor";
import { Separator } from "@/components/separator";
import { GripVertical, Calendar } from "lucide-react";
import { useState } from "react";
import { UpdateTaskModal } from "./update-task-dialog";
import { TaskCheck } from "./task-check";
import { TaskProps } from "./project-tasks";
import { useUpdateTask } from "../hooks/use-update-task";
import { formatTaskDate } from "../utils/format-task-date";

export function Task(props: TaskProps) {
  const [open, setOpen] = useState(false);
  const { handleDone } = useUpdateTask(props.projectId);
  const toggleDone = () => handleDone(props.id, !props.isDone);

  return (
    <div className="flex flex-col gap-2 mb-2">
      <div className="flex relative cursor-pointer group flex-col">
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
        <Button
          variant="ghost"
          size="xs"
          className="flex items-center cursor-move 
                 opacity-0 group-hover:opacity-100
                 absolute -left-8 top-0"
        >
          <GripVertical />
        </Button>
      </div>
      <Separator />
      <UpdateTaskModal open={open} onOpenChange={setOpen} {...props} />
    </div>
  );
}
