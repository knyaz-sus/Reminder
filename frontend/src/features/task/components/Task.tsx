import { deleteTask } from "@/api/deleteTask";
import { Button } from "@/components/Button";
import { StaticEditor } from "@/components/Editor/StaticEditor";
import { Separator } from "@/components/Separator";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDeleteOptimistic } from "@/hooks/useDeleteOptimistic";
import { Ellipsis, Circle, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { UpdateTaskModal } from "./UpdateTaskModal";
import { useTaskState } from "@/hooks/useTaskState";

export function Task() {
  const { session } = useAuth();
  const taskState = useTaskState();
  const { id, projectId, title, description, priority } = taskState;
  const deleteTaskMutation = useDeleteOptimistic({
    mutationFn: () => deleteTask(id, session?.access_token),
    queryKey: ["user-tasks", projectId, session?.access_token],
    id,
  });
  useEffect(() => {
    console.log("Данные обновились в конкретной таске", taskState);
  }, [taskState]);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex relative cursor-pointer group flex-col">
        <div className="flex justify-between">
          <div className="flex w-full gap-2">
            <div className="h-full pt-2.5">
              <button>
                <Circle size={18} />
              </button>
            </div>
            <div
              onClick={() => setOpen(true)}
              className="flex flex-col w-full py-2"
            >
              <StaticEditor content={title} />
              {description && description !== "<p></p>" && (
                <StaticEditor content={description ? description : undefined} />
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
        priority={priority}
        deleteHandler={deleteTaskMutation.mutate}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
