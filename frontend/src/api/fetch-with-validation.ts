import { ZodSchema } from "zod";

export const fetchWithValidation = async <T>(
  path: string,
  accToken: string | undefined,
  schema: ZodSchema<T>,
) => {
  try {
    if (!path || !schema || !accToken) {
      throw new Error("Requared params wasn't provided.");
    }
    const res = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch data from ${path}`, res.status);
      return;
    }

    const data = await res.json();
    const valdatedData = schema.safeParse(data);
    if (valdatedData.success) return valdatedData.data;
    console.log(valdatedData.error);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
