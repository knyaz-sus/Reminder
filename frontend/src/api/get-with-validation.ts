import { axiosInstance } from "@/lib/axios";
import { isAxiosError } from "axios";
import { ZodError, ZodSchema } from "zod";

export const getWithValidation = async <T>(
  path: string,
  schema: ZodSchema<T>
) => {
  try {
    if (!path || !schema) {
      throw new Error("Requared params wasn't provided.");
    }

    const { data } = await axiosInstance.get<T>(
      `${import.meta.env.VITE_API_URL}${path}`
    );

    return schema.parse(data);
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Error fetching data:", error.response?.data);
    } else if (error instanceof ZodError) {
      console.error(error.errors);
    } else if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
