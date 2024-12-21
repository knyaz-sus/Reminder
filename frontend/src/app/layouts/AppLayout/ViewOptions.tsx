import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Layers } from "lucide-react";

export function ViewOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-7 w-7">
          <Layers />
          <span className="sr-only">View options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem>System</DropdownMenuItem>
        <DropdownMenuItem>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
