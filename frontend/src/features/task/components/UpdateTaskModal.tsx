import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";
import { RichEditor } from "@/components/Editor/RichEditor";
import { Separator } from "@/components/Separator";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTaskState } from "@/hooks/useTaskState";
import { Task } from "@/types/schemas";
import { UseMutateFunction } from "@tanstack/react-query";
import { Hash, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PrioritySelect } from "./PrioritySelect";
import { updateTask } from "@/api/updateTask";
import { useUpdateOptimistic } from "@/hooks/useUpdateOptimistic";

type UpdateTaskModalProps = {
  open: boolean;
  onOpenChange: (arg: boolean) => void;
  deleteHandler: UseMutateFunction<Task, Error, unknown, { previous: Task[] }>;
  priority: number;
};

export function UpdateTaskModal({
  open,
  onOpenChange,
  deleteHandler,
}: UpdateTaskModalProps) {
  const { session } = useAuth();
  const taskState = useTaskState();
  const { title, description, projectName, date, id, projectId } = taskState;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [controlledDate, setControlledDate] = useState<Date | undefined>(date);
  const updateTaskMutation = useUpdateOptimistic({
    mutationFn: () =>
      updateTask({
        id,
        updatedProperties: {
          title: updatedTitle,
          description: updatedDescription,
          date: controlledDate?.toISOString(),
        },
        accToken: session?.access_token,
      }),
    queryKey: ["user-tasks", projectId, session?.access_token],
    id,
    updateList: { title: updatedTitle, description: updatedDescription },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        customClose
        className="gap-0 items-center p-0 md:max-w-3xl w-full"
      >
        <DialogHeader className="flex items-center flex-row py-2 pr-3 pl-2">
          <Button
            className="text-foreground/80"
            asChild
            variant="ghost"
            size="sm"
          >
            <Link
              onClick={() => onOpenChange(false)}
              to={`/app/projects/${projectId}`}
            >
              <Hash />
              <span>{projectName}</span>
            </Link>
          </Button>
          <div className="flex w-full justify-end gap-2">
            <Button variant="ghost" size="xs" onClick={deleteHandler}>
              <Trash2 />
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="xs">
                <X />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        <Separator />
        <div className="flex flex-auto overflow-hidden">
          <div className="flex flex-col gap-2 p-4 w-2/3">
            <div className="flex flex-col gap-1 mb-2">
              <RichEditor
                content={title}
                handleSave={setUpdatedTitle}
                autofocus
                placeholder="Provide title..."
              />
              <RichEditor
                content={description ? description : undefined}
                handleSave={setUpdatedDescription}
                autofocus={false}
                placeholder="Provide description..."
              />
            </div>
            <Button
              className="self-start text-xs text-foreground/80"
              variant="ghost"
              size="sm"
            >
              <Plus />
              <span>Add subtask</span>
            </Button>
          </div>
          <div className="flex flex-col gap-2 bg-secondary/40 text-secondary-foreground p-4 w-1/3">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-foreground/80">Time</span>
              <DatePicker
                controlledDate={controlledDate}
                setControlledDate={setControlledDate}
              />
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-xs text-foreground/80">Priority</span>
              <PrioritySelect />
            </div>
            <Button
              size="sm"
              onClick={() => {
                updateTaskMutation.mutate({});
                onOpenChange(false);
              }}
            >
              Save changes
            </Button>
          </div>
        </div>
        <DialogTitle className="sr-only">Change task</DialogTitle>
        <DialogDescription className="sr-only">
          Change your task here
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}