import { projectsSchema } from "@/types/zod";
import { fetchWithToken } from "@/api/fetchWithToken";

export const fetchProjects = async (
  userId: string | undefined,
  accToken: string | undefined
) => {
  if (!userId) return;
  try {
    return await fetchWithToken({
      endpoint: `${import.meta.env.VITE_API_URL}/projects/${userId}`,
      accToken,
      schema: projectsSchema,
    });
  } catch (e) {
    console.log(e);
  }
};
