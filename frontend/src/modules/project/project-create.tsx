import { useState } from "react";
import { DialogFooter, DialogHeader } from "@/components/dialog";
import { Input } from "@/components/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { useAddOptimistic } from "@/hooks/useAddOptimistic";
import { Project } from "@/types/schemas";
import { projectApi } from "./project-api";

export function ProjectCreate() {
  const { session } = useAuth();
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const addProjectMutation = useAddOptimistic<Project>({
    mutationFn: () =>
      projectApi.addProject(
        { name: projectName },
        session?.access_token,
        session?.user.id
      ),
    queryKey: ["user-projects", { session }],
    newEntity: { name: projectName },
  });
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
            <Button
              onClick={addProjectMutation.mutate}
              size="sm"
              disabled={projectName === ""}
            >
              Confirm
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
