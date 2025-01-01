import styles from "../Sidebar.module.css";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuth } from "@/features/auth/hooks/useAuth";
import { deleteProject } from "@/api/deleteProject";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useDeleteOptimistic } from "@/hooks/useDeleteOptimistic";
import { updateProject } from "@/api/updateProject";
import { Project } from "@/types/schemas";
import { useUpdateOptimistic } from "@/hooks/useUpdateOptimistic";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/cn";

interface SidebarProjectProps {
  id: string;
  adminId: string;
  name: string;
  isActive: boolean;
}

export function SidebarProject({
  isActive,
  id,
  adminId,
  name,
}: SidebarProjectProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [updateName, setUpdateName] = useState("");
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteOptimistic<Project>({
    mutationFn: () =>
      deleteProject({ id, adminId, accToken: session?.access_token }),
    queryKey: ["user-projects", { session }],
    id,
  });
  const updateMutation = useUpdateOptimistic<Project>({
    mutationFn: () =>
      updateProject({ id, name: updateName, accToken: session?.access_token }),
    queryKey: ["user-projects", { session }],
    id,
    updateList: { name: updateName },
    onSettledCallback: () =>
      queryClient.invalidateQueries({ queryKey: ["projectId", id] }),
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
          open={open}
          onOpenChange={() => {
            setOpen((prev) => !prev);
            setUpdateName("");
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "[&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground/80",
                styles.child
              )}
            >
              <Ellipsis />
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
                  onClick={() => {
                    navigate("/app");
                    deleteMutation.mutate(id);
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
                  onClick={() => {
                    setOpen(false);
                    updateMutation.mutate(id);
                    queryClient.invalidateQueries({
                      queryKey: ["projectId", id],
                    });
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
