import { projectsSchema } from "@/types/schemas";
import { fetchWithValidation } from "@/api/fetchWithValidation";

export const fetchProjects = async (
  userId: string | undefined,
  accToken: string | undefined
) => {
  if (!userId) return;
  try {
    return await fetchWithValidation(
      `/projects/?userId=${userId}`,
      accToken,
      projectsSchema
    );
  } catch (e) {
    console.log(e);
  }
};
