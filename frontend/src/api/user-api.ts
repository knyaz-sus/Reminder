import { userRowSchema } from "@/types/schemas";
import { getWithValidation } from "./get-with-validation";
import { queryOptions } from "@tanstack/react-query";

export const userApi = {
  getUserQueryOptions(userId: string | undefined) {
    return queryOptions({
      queryKey: ["user"],
      queryFn: () => {
        if (!userId) return;
        return getWithValidation(`/users/${userId}`, userRowSchema);
      },
    });
  },
};
