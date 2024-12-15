import { z } from "zod";

export const userRowSchema = z.object({
  createdAt: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string(),
  provider: z.string(),
});

export const projectSchema = z.object({
  adminId: z.string().uuid(),
  id: z.string().uuid(),
  name: z.string().min(1),
  updatedAt: z.string(),
});

export const projectsSchema = z.array(projectSchema);
