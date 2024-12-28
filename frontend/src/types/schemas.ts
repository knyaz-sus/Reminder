import { z } from "zod";

export const userRowSchema = z.object({
  createdAt: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string().min(1),
  provider: z.string(),
});
export const usersRowSchema = z.array(userRowSchema);

export const projectSchema = z.object({
  adminId: z.string().uuid(),
  id: z.string().uuid(),
  name: z.string().min(1),
  updatedAt: z.string(),
  createdAt: z.string(),
});
export const projectsSchema = z.array(projectSchema);

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  date: z.string().nullable(),
  isDone: z.boolean(),
  projectId: z.string().uuid(),
  updatedAt: z.string(),
  priority: z.number().int(),
  createdAt: z.string(),
});
export const tasksSchema = z.array(taskSchema);

export type Project = z.infer<typeof projectSchema>;
export type UserRow = z.infer<typeof userRowSchema>;
export type Task = z.infer<typeof taskSchema>;

export type Projects = Project[];
export type UserRows = UserRow[];
export type Tasks = Task[];
