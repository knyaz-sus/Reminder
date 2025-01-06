import { Task, tasksSchema } from "@/types/schemas";
import { getWithValidation } from "@/api/get-with-validation";
import { queryOptions } from "@tanstack/react-query";

export const taskApi = {
  getProjectTasksQueryOptions(projectId: string | undefined) {
    return queryOptions({
      queryKey: ["user-tasks", projectId],
      queryFn: () => {
        if (!projectId) return;
        return getWithValidation(`/tasks/?projectId=${projectId}`, tasksSchema);
      },
    });
  },

  async addTask(accToken: string | undefined, newTask?: Partial<Task>) {
    try {
      if (!newTask) return;
      const { title, projectId, description, date } = newTask;
      if (!title || !accToken || !projectId) return;
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, projectId, description, date }),
      });
      console.log(await res.json());
    } catch (e) {
      console.log(e);
    }
  },

  async deleteTask(id: string, accToken: string | undefined) {
    if (!accToken || !id) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  },

  async updateTask({
    id,
    updatedProperties,
    accToken,
  }: {
    id: string;
    updatedProperties: Partial<Task>;
    accToken: string | undefined;
  }) {
    if (!accToken || !updatedProperties || !accToken) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProperties),
    });
    const data = await res.json();
    if (!res.ok) return;
    console.log(data);
    return data;
  },
};
