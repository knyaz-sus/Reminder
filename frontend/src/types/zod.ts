import { z } from "zod";

export const userRowSchema = z.object({
  created_at: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string(),
  provider: z.string(),
});

export const projectSchema = z.object({
  admin_id: z.string().uuid(),
  id: z.string().uuid(),
  name: z.string().min(1),
  updated_at: z.string(),
});

export const projectsSchema = z.array(projectSchema);
