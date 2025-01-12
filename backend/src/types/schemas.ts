import { z } from "zod";

export const addProjectRequestSchema = z.object({
  body: z.object({
    id: z.string().uuid().optional(),
    name: z.string().nonempty(),
    adminId: z.string().uuid(),
  }),
});

export const getProjectsRequestSchema = z.object({
  query: z.object({
    userId: z.string().uuid(),
  }),
});

export const getProjectRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteProjectRequestSchema = z.object({
  body: z.object({
    adminId: z.string().uuid(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateProjectRequestSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});
/////////////////////////////////////////////////////////////////////

export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  date: z.string().nullable(),
  isDone: z.boolean(),
  projectId: z.string().uuid().nullable(),
  updatedAt: z.string(),
  priority: z.enum(["1", "2", "3", "4"]),
  createdAt: z.string(),
  order: z.number().int().nullable(),
});

export const updateOrderRequestSchema = z.object({ body: z.array(taskSchema) });

export const addTaskRequestSchema = z.object({
  body: z.object({
    title: z.string().nonempty(),
    projectId: z.string().uuid().nullable(),
    description: z.string().nullable().optional(),
    date: z.string().optional(),
    priority: z.enum(["1", "2", "3", "4"]).optional(),
    updatedAt: z.string().optional(),
    order: z.number().int().nullable(),
  }),
});

export const getTasksRequestSchema = z.object({
  query: z.object({
    projectId: z
      .string()
      .uuid()
      .or(z.enum(["inbox", "today"])),
  }),
});

export const deleteTaskRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateTaskRequestSchema = z.object({
  body: z.object({
    id: z.string().uuid().optional(),
    title: z.string().optional(),
    description: z.string().optional().nullable(),
    date: z.string().nullable().optional(),
    isDone: z.boolean().optional(),
    updatedAt: z.string().optional(),
    priority: z.enum(["1", "2", "3", "4"]).optional(),
    projectId: z.string().uuid().nullable().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});
/////////////////////////////////////////////////////////////////////

export const getUserRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
