import { Button } from "@/components/button";
import { StaticEditor } from "@/components/editor/static-editor";
import { Separator } from "@/components/separator";
import { GripVertical, Calendar } from "lucide-react";
import { useState } from "react";
import { UpdateTaskModal } from "./update-task-dialog";
import { TaskCheck } from "./task-check";
import { TaskProps } from "./project-tasks";

export function Task(props: TaskProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex relative cursor-pointer group flex-col">
        <div className="flex justify-between">
          <div className="flex w-full gap-2">
            <div className="h-full pt-2.5">
              <TaskCheck priority={props.priority} />
            </div>
            <div
              onClick={() => setOpen(true)}
              className="flex flex-col gap-1 w-full py-2"
            >
              <StaticEditor content={props.title} />
              {props.description && props.description !== "<p></p>" && (
                <StaticEditor
                  className="text-xs text-foreground/80"
                  content={props.description ? props.description : undefined}
                />
              )}
              {!!props.date && (
                <button className="flex items-start gap-1 text-xs">
                  <Calendar size={14} />
                  <span>{props.date.toDateString()}</span>
                </button>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="xs"
            className="flex items-center cursor-move 
                 opacity-0 group-hover:opacity-100
                 absolute -left-10 top-1.5"
          >
            <GripVertical />
          </Button>
        </div>
      </div>
      <Separator />
      <UpdateTaskModal open={open} onOpenChange={setOpen} {...props} />
    </>
  );
}
