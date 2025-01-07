import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../project-api";
import { v4 as uuid } from "uuid";
import { useAuth } from "@/modules/auth/hooks/use-auth";
import { createProjectRequestSchema } from "@/types/schemas";
import { useNavigate } from "react-router-dom";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const navigate = useNavigate();
  const newProjectId = uuid();

  const { mutate, error } = useMutation({
    mutationFn: projectApi.addProject,

    async onMutate(newProject) {
      await queryClient.cancelQueries({ queryKey: projectApi.baseKey });

      const previousData = queryClient.getQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey
      );

      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
        (old = []) => {
          return [
            {
              ...newProject,
              id: newProjectId,
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
            ...old,
          ];
        }
      );

      return previousData;
    },
    onError(_, __, previousData) {
      queryClient.setQueryData(
        projectApi.getAllProjectsQueryOptions(session?.user.id).queryKey,
        previousData
      );
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: projectApi.baseKey });
    },
  });

  const handleCreate = (name: string) => {
    const newProject = {
      id: newProjectId,
      name,
      adminId: session?.user.id,
    };

    const { success, data } = createProjectRequestSchema.safeParse(newProject);

    if (success) mutate(data);
    if (newProjectId) navigate(`/app/projects/${newProjectId}`);
  };

  return { handleCreate, error };
};
