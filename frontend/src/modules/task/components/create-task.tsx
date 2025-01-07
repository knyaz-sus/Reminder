import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/date-picker";
import { Separator } from "@/components/separator";
import { RichEditor } from "@/components/editor/rich-editor";
import { PrioritySelect } from "./priority-select";
import { Priorities } from "@/constants/ui";
import { useCreateTask } from "../hooks/use-create-task";

export function CreateTask({ toggleCreating }: { toggleCreating: () => void }) {
  const { id } = useParams();
  const [title, setTitle] = useState("<p></p>");
  const [description, setDescription] = useState("<p></p>");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState<Priorities>("4");
  const { handleCreate } = useCreateTask(id);
  if (!id) {
    throw new Error("Can't use CreateTask component outside of project page");
  }
  const addTask = () => {
    handleCreate({
      title,
      projectId: id,
      description,
      date: date?.toISOString(),
      priority,
    });
    toggleCreating();
  };
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
            onClick={addTask}
            disabled={title === "<p></p>"}
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
