import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useDeleteOptimistic = <T extends { id: string }>({
  mutationFn,
  queryKey,
  id,
}: {
  mutationFn: MutationFunction<T>;
  queryKey: QueryKey;
  id: string;
}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const previous = queryClient.getQueryData<T[]>(queryKey);
      if (!previous) return;
      queryClient.setQueryData(
        queryKey,
        previous.filter((entity) => entity.id !== id)
      );
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
    },
  });
  return deleteMutation;
};
