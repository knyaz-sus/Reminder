import { Button } from "@/components/Button";
import { StaticEditor } from "@/components/Editor/StaticEditor";
import { Separator } from "@/components/Separator";
import { Task as TaskType } from "@/types/schemas";
import { Ellipsis, Circle, GripVertical } from "lucide-react";

export function Task({ title, description }: TaskType) {
  return (
    <div className="flex relative group flex-col gap-2">
      <Separator />
      <div className="flex justify-between">
        <div className="flex w-full items-center  gap-2">
          <div className="h-full pt-1">
            <Circle size={18} />
          </div>
          <div>
            <StaticEditor content={title} />
            {description && <StaticEditor content={description} />}
          </div>
        </div>
        <Button
          className="opacity-0 self-end group-hover:opacity-100"
          size="xs"
          variant="ghost"
        >
          <Ellipsis />
        </Button>
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
      <Separator />
    </div>
  );
}
