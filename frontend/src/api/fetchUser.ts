import { userRowSchema } from "@/types/zod";
import { fetchWithToken } from "@/api/fetchWithToken";

export const fetchUser = async (
  userId: string | undefined,
  accToken: string | undefined
) => {
  if (!userId) return;
  try {
    return await fetchWithToken({
      endpoint: `${import.meta.env.VITE_API_URL}/users/${userId}`,
      accToken,
      schema: userRowSchema,
    });
  } catch (e) {
    console.log(e);
  }
};
