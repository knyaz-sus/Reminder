import { Button } from "@/components/button";
import { StaticEditor } from "@/components/editor/static-editor";
import { Separator } from "@/components/separator";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useDeleteOptimistic } from "@/hooks/useDeleteOptimistic";
import { Ellipsis, GripVertical, Calendar } from "lucide-react";
import { useState } from "react";
import { UpdateTaskModal } from "./update-task-dialog";
import { useTaskState } from "@/hooks/use-task-state";
import { TaskCheck } from "./task-check";
import { taskApi } from "../task-api";

export function Task() {
  const { session } = useAuth();
  const taskState = useTaskState();
  const [open, setOpen] = useState(false);
  const { id, projectId, title, description, priority, date } = taskState;
  const deleteTaskMutation = useDeleteOptimistic({
    mutationFn: () => taskApi.deleteTask(id, session?.access_token),
    queryKey: ["user-tasks", projectId, session?.access_token],
    id,
  });
  return (
    <>
      <div className="flex relative cursor-pointer group flex-col">
        <div className="flex justify-between">
          <div className="flex w-full gap-2">
            <div className="h-full pt-2.5">
              <TaskCheck priority={priority} />
            </div>
            <div
              onClick={() => setOpen(true)}
              className="flex flex-col gap-1 w-full py-2"
            >
              <StaticEditor content={title} />
              {description && description !== "<p></p>" && (
                <StaticEditor
                  className="text-xs text-foreground/80"
                  content={description ? description : undefined}
                />
              )}
              {!!date && (
                <button className="flex items-start gap-1 text-xs">
                  <Calendar size={14} />
                  <span>{date.toDateString()}</span>
                </button>
              )}
            </div>
          </div>
          <div className="pt-2">
            <Button
              className="opacity-0 self-end group-hover:opacity-100"
              size="xs"
              variant="ghost"
            >
              <Ellipsis />
            </Button>
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
      <UpdateTaskModal
        deleteHandler={deleteTaskMutation.mutate}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}