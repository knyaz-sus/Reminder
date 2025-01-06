import { Project, projectSchema, projectsSchema } from "@/types/schemas";
import { getWithValidation } from "@/api/get-with-validation";
import { queryOptions } from "@tanstack/react-query";

export const projectApi = {
  baseKey: ["projects"],
  getProjectQueryOptions(projectId: string | undefined) {
    return queryOptions({
      queryFn: () => {
        if (!projectId) return;
        return getWithValidation(`/projects/${projectId}`, projectSchema);
      },
      queryKey: ["projects", projectId],
    });
  },

  getAllProjectsQueryOptions(userId: string | undefined) {
    return queryOptions({
      queryFn: () => {
        if (!userId) return;
        return getWithValidation(`/projects/?userId=${userId}`, projectsSchema);
      },
      queryKey: ["projects"],
    });
  },

  async deleteProject(id: string, adminId: string, accToken?: string) {
    if (!accToken || !id || !adminId) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminId }),
    });
    if (!res.ok) return;
    return await res.json();
  },

  async addProject(project: Project, accToken: string | undefined) {
    try {
      if (!project) return;
      const { name } = project;
      if (!name || !accToken) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e);
    }
  },

  async updateProject(accToken?: string, project?: Partial<Project>) {
    if (!accToken || !project) return;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${project.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }
    );
    if (!res.ok) return;
    return await res.json();
  },
};
