export const deleteTask = async (id: string, accToken: string | undefined) => {
  if (!accToken || !id) return;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return;
  return await res.json();
};
