import { UserRow } from "@/types/schema";
import { userRowSchema } from "@/types/zod";

export const fetchUser = async (userId?: string, accToken?: string) => {
  if (!userId || !accToken) return;

  try {
    const url = new URL(`${import.meta.env.VITE_API_URL}/users`);
    url.searchParams.append("userId", userId);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return;
    const user: UserRow = await res.json();
    userRowSchema.parse(user);
    return user;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};
