import { tasksSchema } from "@/types/schemas";
import { fetchWithValidation } from "@/api/fetchWithValidation";

export const fetchTasks = async (
  projectId: string | undefined,
  accToken: string | undefined
) => {
  if (!projectId) return;
  return await fetchWithValidation(
    `/tasks/?projectId=${projectId}`,
    accToken,
    tasksSchema
  );
};
