import { Response, Request } from "express";
import { AnyZodObject, z, ZodError } from "zod";

export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: Request,
  res: Response
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }
    return res.status(400).json(JSON.stringify(error));
  }
}
