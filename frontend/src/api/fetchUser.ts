import { userRowSchema } from "@/types/schemas";
import { fetchWithValidation } from "@/api/fetchWithValidation";

export const fetchUser = async (
  userId: string | undefined,
  accToken: string | undefined
) => {
  if (!userId) return;
  return await fetchWithValidation(`/users/${userId}`, accToken, userRowSchema);
};
