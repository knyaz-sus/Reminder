export interface DeleteProjectParams {
  id: string;
  adminId: string;
  accToken: string | undefined;
}

export const deleteProject = async ({
  id,
  adminId,
  accToken,
}: DeleteProjectParams) => {
  // throw new Error();
  if (!accToken) return;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminId }),
  });
  if (!res.ok) return;
  return await res.json();
};
