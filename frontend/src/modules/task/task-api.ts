import {
  CreateTaskRequestSchema,
  Task,
  Tasks,
  taskSchema,
  tasksSchema,
  UpdateTaskRequestSchema,
} from "@/types/schemas";
import { getWithValidation } from "@/api/get-with-validation";
import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import { AxiosResponse } from "axios";

export const taskApi = {
  baseKey: ["tasks"],

  getProjectTasksQueryOptions(queryKey: string | undefined) {
    return queryOptions({
      queryKey: ["tasks", queryKey],
      queryFn: () => {
        z.string().uuid().parse(queryKey);
        return getWithValidation(`/tasks/?projectId=${queryKey}`, tasksSchema);
      },
    });
  },

  async addTask(newTask: CreateTaskRequestSchema) {
    const url = `${import.meta.env.VITE_API_URL}/tasks`;
    const { data } = await axiosInstance.post<
      CreateTaskRequestSchema,
      AxiosResponse<Task>
    >(url, newTask);
    console.log("new task", newTask);
    console.log("data", data);

    const validatedData = taskSchema.parse(data);
    return validatedData;
  },

  async deleteTask(id: string) {
    const url = `${import.meta.env.VITE_API_URL}/tasks/${id}`;
    const { data } = await axiosInstance.delete<
      string,
      AxiosResponse<{ message: string }>
    >(url);
    return data;
  },

  async updateTask(updatedProperties: UpdateTaskRequestSchema) {
    const url = `${import.meta.env.VITE_API_URL}/tasks/${updatedProperties.id}`;
    const { data } = await axiosInstance.put<
      UpdateTaskRequestSchema,
      AxiosResponse<Task>
    >(url, updatedProperties);
    taskSchema.parse(data);
    return data;
  },

  async updateOrder(updatedTasks: Tasks) {
    const url = `${import.meta.env.VITE_API_URL}/tasks/update-order`;
    const { data } = await axiosInstance.post<Tasks, AxiosResponse<Tasks>>(
      url,
      updatedTasks
    );
    tasksSchema.parse(data);
    return data;
  },
};
