import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useUpdateOptimistic = <T extends { id: string }>({
  mutationFn,
  queryKey,
  id,
  updateList,
  onSettledCallback,
  onMutateCallback,
}: {
  mutationFn: MutationFunction<T>;
  queryKey: QueryKey;
  id: string;
  updateList: Partial<T>;
  onSettledCallback?: () => void;
  onMutateCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });
      if (onMutateCallback) onMutateCallback();
      const previous = queryClient.getQueryData<T[]>(queryKey);
      if (!previous) return;
      const targetIndex = previous.findIndex((entity) => entity.id === id);
      if (targetIndex === -1) return;

      const target = previous[targetIndex];
      const updatedEntity = {
        ...target,
        ...updateList,
      };
      const updatedList = previous.map((item) =>
        item.id === updatedEntity.id ? updatedEntity : item
      );
      queryClient.setQueryData(queryKey, updatedList);
      return { previous };
    },
    onError: (err, _new, context) => {
      if (context?.previous) {
        queryClient.setQueryData<T[]>(queryKey, context.previous);
        console.log(err);
      }
    },
    onSettled: () => {
      console.log(queryKey);
      queryClient.invalidateQueries({
        queryKey,
      });
      if (onSettledCallback) onSettledCallback();
    },
  });
  return updateMutation;
};
