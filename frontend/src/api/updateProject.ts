export const updateProject = async (
  projectId: string,
  name: string,
  accToken: string | undefined
) => {
  if (!accToken) return;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects/${projectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  );
  if (!res.ok) return;
  return await res.json();
};
