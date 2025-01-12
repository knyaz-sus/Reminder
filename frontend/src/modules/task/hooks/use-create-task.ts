import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "../task-api";
import { v4 as uuid } from "uuid";
import { Priorities } from "@/constants/ui";
import {
  CreateTaskRequestSchema,
  createTaskRequestSchema,
} from "@/types/schemas";

export const useCreateTask = (projectId: string) => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: taskApi.addTask,

    async onMutate(newTask) {
      await queryClient.cancelQueries({ queryKey: taskApi.baseKey });

      const previousData = queryClient.getQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey
      );

      queryClient.setQueryData(
        taskApi.getProjectTasksQueryOptions(projectId).queryKey,
        (old = []) => [
          ...old,
          {
            id: uuid(),
            date: null,
            isDone: false,
            updatedAt: new Date().toISOString(),
            priority: "4" as Priorities,
            createdAt: new Date().toISOString(),
            ...newTask,
          },
        ]
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

  const handleCreate = (newTask: CreateTaskRequestSchema) => {
    console.log(newTask);
    const { success, data } = createTaskRequestSchema.safeParse(newTask);
    if (success) mutate(data);
  };

  return { handleCreate, error };
};
