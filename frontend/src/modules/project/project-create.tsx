import { useState } from "react";
import { DialogFooter, DialogHeader } from "@/components/dialog";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
// import { useCreateProject } from "./hooks/use-create-todo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/dialog";

export function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  // const createProjectMutation = useCreateProject();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="[&>svg]:size-4 [&>svg]:shrink-0  hover:text-sidebar-foreground">
        <Plus strokeWidth={3} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
          <DialogDescription>
            Provide please neccesary information.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Name
            </label>
            <Input
              id="link"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex w-full gap-1 ">
          <DialogClose asChild>
            <Button size="sm" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogTrigger asChild>
            {/* <Button
              onClick={() => createProjectMutation.handleCreate(projectName)}
              size="sm"
              disabled={projectName === ""}
            >
              Confirm
            </Button> */}
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
