import { Projects } from "@/types/schema";

export const fetchProjects = async (userId?: string, accToken?: string) => {
  if (!userId || !accToken) return;

  try {
    const url = new URL(`${import.meta.env.VITE_API_URL}/projects`);
    url.searchParams.append("userId", userId);

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return;
    const projects: Projects = await res.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};
