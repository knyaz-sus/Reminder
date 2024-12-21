import { projectSchema } from "@/types/schemas";
import { fetchWithValidation } from "./fetchWithValidation";

export const fetchProject = async (
  projectId: string | undefined,
  accToken: string | undefined
) => {
  try {
    if (!projectId) return;
    return await fetchWithValidation(
      `/projects/${projectId}`,
      accToken,
      projectSchema
    );
  } catch (e) {
    console.log(e);
  }
};
