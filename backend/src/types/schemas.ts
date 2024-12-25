import { z } from "zod";

export const addProjectRequestSchema = z.object({
  body: z.object({ name: z.string().nonempty(), userId: z.string().uuid() }),
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

export const addTaskRequestSchema = z.object({
  body: z.object({
    title: z.string().nonempty(),
    projectId: z.string().uuid(),
    description: z.string().optional().nullable(),
    date: z.string().optional(),
    priority: z.number().int().optional(),
  }),
});

export const getTasksRequestSchema = z.object({
  query: z.object({
    projectId: z.string().uuid(),
  }),
});

export const deleteTaskRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateTaskRequestHandelr = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional().nullable(),
    date: z.string().nullable().optional(),
    isDone: z.boolean().optional(),
    updatedAt: z.string().optional(),
    priority: z.number().int().optional(),
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
