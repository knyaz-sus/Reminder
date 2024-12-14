import { deleteProject } from "@/api/deleteProject";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, Ellipsis, PencilLine, Trash2 } from "lucide-react";

interface ProjectsDropdownProps {
  projectId: string;
  adminId: string;
}

export function ProjectsDropdown({
  projectId,
  adminId,
}: ProjectsDropdownProps) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const { mutateAsync: deleteProjectMutation } = useMutation({
    mutationFn: async () => {
      await deleteProject(projectId, adminId, session?.access_token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
    },
  });
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="[&>svg]:size-4 [&>svg]:shrink-0 p-1 hover:text-sidebar-foreground">
          <Ellipsis />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="gap-4">
          <PencilLine />
          <span>Change project</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4">
          <Archive />
          <span>Archive</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            try {
              await deleteProjectMutation();
            } catch (e) {
              console.log(e);
            }
          }}
          className="gap-4 bg-destructive text-destructive-foreground"
        >
          <Trash2 />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
