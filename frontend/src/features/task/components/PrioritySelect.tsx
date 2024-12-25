import { Button } from "@/components/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { priorities } from "@/constants/ui";
import { useTaskState } from "@/hooks/useTaskState";
import { Flag } from "lucide-react";
import { useState } from "react";

export function PrioritySelect() {
  const [open, setOpen] = useState(false);
  const { priority } = useTaskState();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs justify-start text-left font-normal"
        >
          <Flag />
          <span>P{priority}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent alignOffset={5} className="w-auto p-0">
        <ul className="flex flex-col rounded-xl bg-background">
          {priorities.map((priority) => (
            <li key={priority}>
              <button
                className="flex gap-2 py-2 px-3 text-sm items-center"
                onClick={() => setOpen(false)}
              >
                <Flag size={18} />
                <span>Priority {priority}</span>
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
