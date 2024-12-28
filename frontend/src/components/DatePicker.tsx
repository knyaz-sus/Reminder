import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";

export function DatePicker({
  controlledDate,
  setControlledDate,
}: {
  controlledDate?: Date;
  setControlledDate?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const getDayString = () => {
    if (controlledDate) return format(controlledDate, "PPP");
    else if (date) format(date, "PPP");
    return "Pick a date";
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "text-xs justify-start text-left font-normal",
            !controlledDate && !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          <span>{getDayString()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" alignOffset={5} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={controlledDate ? controlledDate : date}
          onSelect={(day) => {
            setIsOpen(false);
            if (setControlledDate) setControlledDate(day);
            else setDate(day);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
