import styles from "../Sidebar.module.css";
import { Link } from "react-router-dom";
import { SidebarMenuButton } from "./Sidebar";
import { Ellipsis, Hash, PencilLine, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { deleteProject } from "@/api/deleteProject";
import { updateProject } from "@/api/updateProject";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function SidebarProject({
  id,
  adminId,
  name,
  isActive,
}: {
  id: string;
  adminId: string;
  name: string;
  isActive: boolean;
}) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [updateName, setUpdateName] = useState("");
  const { mutateAsync: deleteProjectMutation } = useMutation({
    mutationFn: async () => {
      await deleteProject(id, adminId, session?.access_token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
    },
  });
  const { mutateAsync: updateProjectMutation } = useMutation({
    mutationFn: async () => {
      await updateProject(id, name, session?.access_token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
    },
  });
  return (
    <SidebarMenuButton className={styles.parent} isActive={isActive} asChild>
      <div className="flex justify-between pr-0">
        <Link
          className="flex flex-auto items-center max-w-full ml-1 overflow-hidden gap-2 [&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground"
          to={`/app/projects/${id}`}
        >
          <Hash />
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">
            {name}
          </span>
        </Link>
        <Dialog
          onOpenChange={() => {
            setUpdateName("");
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild className={styles.child}>
              <button className="[&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground">
                <Ellipsis />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent>
                <DialogTrigger>
                  <DropdownMenuItem className="gap-3">
                    <PencilLine />
                    <span>Change project</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem
                  className="gap-3"
                  onClick={async () => {
                    try {
                      await deleteProjectMutation();
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <Trash2 />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
          <DialogPortal>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update "{name}" project</DialogTitle>
                <DialogDescription>
                  Provide please neccesary information.
                </DialogDescription>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <label htmlFor="link" className="sr-only">
                      Name
                    </label>
                    <Input
                      id="link"
                      value={updateName}
                      onChange={(e) => setUpdateName(e.target.value)}
                    />
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter className="flex w-full gap-1">
                <DialogClose asChild>
                  <Button size="sm" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  onClick={async () => {
                    try {
                      await updateProjectMutation();
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  size="sm"
                  disabled={updateName === ""}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </SidebarMenuButton>
  );
}
