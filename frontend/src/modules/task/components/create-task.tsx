import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/separator";
import { RichEditor } from "@/components/editor/rich-editor";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useAddOptimistic } from "@/hooks/useAddOptimistic";
import { Task } from "@/types/schemas";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PrioritySelect } from "./priority-select";
import { priorities } from "@/constants/ui";
import { taskApi } from "../task-api";

export function CreateTask({ toggleCreating }: { toggleCreating: () => void }) {
  const { id } = useParams();
  const [title, setTitle] = useState("<p></p>");
  const [description, setDescription] = useState("<p></p>");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<(typeof priorities)[number]>("4");
  const { session } = useAuth();
  const createTaskMutation = useAddOptimistic<Task>({
    mutationFn: () =>
      taskApi.addTask(session?.access_token, {
        id,
        title,
        description,
        date: date?.toISOString(),
      }),
    queryKey: ["user-tasks", id, session?.access_token],
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
        <div className="flex gap-2">
          <DatePicker controlledDate={date} setControlledDate={setDate} />
          <PrioritySelect priority={priority} onSelectChange={setPriority} />
        </div>
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
            disabled={title === "<p></p>"}
          >
            Add task
          </Button>
        </div>
      </div>
    </div>
  );
}
