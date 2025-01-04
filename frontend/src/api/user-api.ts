import { userRowSchema } from "@/types/schemas";
import { fetchWithValidation } from "./fetch-with-validation";
import { queryOptions } from "@tanstack/react-query";

export const userApi = {
  getUserQueryOptions(
    userId: string | undefined,
    accToken: string | undefined
  ) {
    return queryOptions({
      queryKey: ["user", accToken],
      queryFn: () => {
        if (!userId) return;
        return fetchWithValidation(`/users/${userId}`, accToken, userRowSchema);
      },
    });
  },
};
