import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";

export function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "text-xs justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" alignOffset={5} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => {
            setIsOpen(false);
            setDate(day);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
