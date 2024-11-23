import { Editor } from "@/components/Editor/Editor";

export function CreateTodo() {
  return (
    <div
      className="flex flex-col justify-center p-4 border-border
                 rounded-md border"
    >
      <Editor />
    </div>
  );
}
