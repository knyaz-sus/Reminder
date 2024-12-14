import { z } from "zod";

export const userRowSchema = z.object({
  created_at: z.string(),
  email: z.string().email("Wrong email format"),
  id: z.string().uuid(),
  name: z.string(),
  provider: z.string(),
});
