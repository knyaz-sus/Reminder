import { ZodSchema } from "zod";

interface FetchParams<T> {
  endpoint: string;
  accToken: string | undefined;
  schema: ZodSchema<T>;
  body?: string | null;
}
export const fetchWithToken = async <T>({
  endpoint,
  accToken,
  schema,
  body = null,
}: FetchParams<T>): Promise<T | undefined> => {
  if (!endpoint || !schema || !accToken) return;
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
      body,
    });

    if (!res.ok) {
      console.error(`Failed to fetch data from ${endpoint}`, res.status);
      return;
    }

    const data = await res.json();
    schema.parse(data);

    return data as T;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
