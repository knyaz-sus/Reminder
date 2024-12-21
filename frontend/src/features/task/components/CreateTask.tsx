import { addTask } from "@/api/addTask";
import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { Separator } from "@/components/Separator";
import { RichEditor } from "@/components/Editor/RichEditor";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAddOptimistic } from "@/hooks/useAddOptimistic";
import { Task } from "@/types/schemas";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function CreateTask({ toggleCreating }: { toggleCreating: () => void }) {
  const [title, setTitle] = useState("<p></p>");
  const [description, setDescription] = useState("<p></p>");
  const { session } = useAuth();
  const { id } = useParams();
  const createTaskMutation = useAddOptimistic<Task>({
    mutationFn: () => addTask(session?.access_token, id, title, description),
    queryKey: ["user-tasks", { session }, id],
    newEntity: { title, description, date: null },
  });
  return (
    <div
      className="flex flex-col justify-center px-3 pt-3
                 border-border border rounded-md"
    >
      <div className="flex flex-col gap-1 mb-1">
        <RichEditor
          content={title}
          handleSave={setTitle}
          autofocus
          placeholder="Provide title..."
        />
        <RichEditor
          content={description}
          handleSave={setDescription}
          autofocus={false}
          placeholder="Provide description..."
        />
      </div>
      <Separator />
      <div className="flex items-center justify-between py-2 gap-2">
        <DatePicker />
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleCreating}
            className="text-xs"
            size="sm"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              createTaskMutation.mutate(session?.user.id);
              toggleCreating();
            }}
            className="text-xs"
            size="sm"
          >
            Add task
          </Button>
        </div>
      </div>
    </div>
  );
}
