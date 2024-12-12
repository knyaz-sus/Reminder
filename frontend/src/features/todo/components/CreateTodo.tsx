import { Button } from "@/components/Button";
import { DatePicker } from "@/components/DatePicker";
import { Editor } from "@/components/Editor";
import { Separator } from "@/components/Separator";

export function CreateTodo() {
  return (
    <div
      className="flex flex-col justify-center px-3 pt-3
                 border-border border rounded-md"
    >
      <Editor placeholder="Todo title" />
      <Editor placeholder="Description" />

      <Separator />
      <div className="flex items-center justify-between py-2 gap-2">
        <DatePicker />
        <div className="flex items-center gap-2">
          <Button className="text-sm" size="sm" variant="secondary">
            Cancel
          </Button>
          <Button size="sm">Add todo</Button>
        </div>
      </div>
    </div>
  );
}
