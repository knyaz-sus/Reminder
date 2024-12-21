import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { v4 as uuiv4 } from "uuid";

export const useAddOptimistic = <T extends { id: string }>({
  mutationFn,
  queryKey,
  newEntity,
  onSettledCallback,
}: {
  mutationFn: MutationFunction;
  queryKey: QueryKey;
  newEntity: Partial<T>;
  onSettledCallback?: () => void;
}) => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const previous = queryClient.getQueryData<T[]>(queryKey);
      if (!previous) return;

      queryClient.setQueryData(queryKey, [
        ...previous,
        { ...newEntity, id: uuiv4() },
      ]);
      return { previous };
    },
    onError: (err, _new, context) => {
      if (context?.previous) {
        queryClient.setQueryData<T[]>(queryKey, context.previous);
        console.log(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
      if (onSettledCallback) onSettledCallback();
    },
  });
  return updateMutation;
};
