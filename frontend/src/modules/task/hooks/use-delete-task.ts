import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../task-api";

export const useDeleteTask = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: taskApi.deleteTask,

    async onMutate(id) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey,
        (old = []) => old.filter((el) => el.id !== id)
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

  return { mutate, error };
};
