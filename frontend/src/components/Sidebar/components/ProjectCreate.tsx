import { useState } from "react";
import { DialogFooter, DialogHeader } from "@/components/Dialog";
import { Input } from "@/components/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "@/api/addProject";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function ProjectCreate() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [projectName, setProjectName] = useState("");
  const [open, setOpen] = useState(false);
  const { mutateAsync: addProjectMutation } = useMutation({
    mutationFn: () =>
      addProject(projectName, session?.access_token, session?.user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
    },
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
          <Button
            onClick={async () => {
              try {
                await addProjectMutation();
                setOpen(false);
                setProjectName("");
              } catch (e) {
                console.log(e);
              }
            }}
            size="sm"
            disabled={projectName === ""}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
