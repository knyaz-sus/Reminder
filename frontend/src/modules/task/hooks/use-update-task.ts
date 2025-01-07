import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../task-api";
import {
  UpdateTaskRequestSchema,
  updateTaskRequestSchema,
} from "@/types/schemas";

export const useUpdateTask = (projectId: string) => {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: taskApi.updateTask,

    async onMutate(updatedProperties) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey,
        (old = []) =>
          old.map((el) => {
            if (el.id === updatedProperties.id) {
              return { ...el, ...updatedProperties };
            }
            return el;
          })
      );

      return previousData;
    },

    onError(_, __, previousData) {
      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey,
        previousData
      );
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: taskApi.baseKey });
    },
  });

  const handleUpdate = (updateProperties: UpdateTaskRequestSchema) => {
    const { data, success } =
      updateTaskRequestSchema.safeParse(updateProperties);
    if (success) mutate(data);
  };

  return { handleUpdate, error };
};
