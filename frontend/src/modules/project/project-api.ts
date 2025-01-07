import { z } from "zod";
import { AxiosResponse } from "axios";
import {
  CreateProjectRequestSchema,
  DeleteProjectRequestSchema,
  Project,
  projectSchema,
  projectsSchema,
  UpdateProjectRequestSchema,
} from "@/types/schemas";
import { getWithValidation } from "@/api/get-with-validation";
import { queryOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const projectApi = {
  baseKey: ["projects"],
  getProjectQueryOptions(projectId: string | undefined) {
    return queryOptions({
      queryFn: () => {
        z.string().uuid().parse(projectId);
        return getWithValidation(`/projects/${projectId}`, projectSchema);
      },
      queryKey: ["projects", projectId],
    });
  },

  getAllProjectsQueryOptions(userId: string | undefined) {
    return queryOptions({
      queryFn: () => {
        z.string().uuid().parse(userId);
        return getWithValidation(`/projects/?userId=${userId}`, projectsSchema);
      },
      queryKey: ["projects", userId],
    });
  },

  async deleteProject({ id, adminId }: DeleteProjectRequestSchema) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${id}`;
    const { data } = await axiosInstance.delete<
      DeleteProjectRequestSchema,
      AxiosResponse<{ message: string }>
    >(url, {
      data: { adminId },
    });
    return data;
  },

  async addProject(projectRequest: CreateProjectRequestSchema) {
    const url = `${import.meta.env.VITE_API_URL}/projects`;
    const { data } = await axiosInstance.post<
      CreateProjectRequestSchema,
      AxiosResponse<Project>
    >(url, projectRequest);
    const validatedNewProject = projectSchema.parse(data);
    return validatedNewProject;
  },

  async updateProject(project: UpdateProjectRequestSchema) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${project.id}`;
    const { data } = await axiosInstance.put<
      UpdateProjectRequestSchema,
      AxiosResponse<Project>
    >(url, project);
    const validatedData = projectSchema.parse(data);
    return validatedData;
  },
};
