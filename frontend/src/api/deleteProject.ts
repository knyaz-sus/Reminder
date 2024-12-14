export const deleteProject = async (
  projectId: string,
  adminId: string,
  accToken: string | undefined
) => {
  if (!accToken) return;
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminId }),
    }
  );
  if (!res.ok) return;
  return await res.json();
};
