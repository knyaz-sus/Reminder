export const addTask = async (
  accToken: string | undefined,
  projectId: string | undefined,
  title: string,
  description?: string,
  date?: string
) => {
  try {
    if (!title || !accToken || !projectId) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, projectId, description, date }),
    });
    if (!res.ok) return;
    console.log(await res.json());
  } catch (e) {
    console.log(e);
  }
};
