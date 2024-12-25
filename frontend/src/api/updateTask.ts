import { Task } from "@/types/schemas";

export const updateTask = async ({
  id,
  updatedProperties,
  accToken,
}: {
  id: string;
  updatedProperties: Partial<Task>;
  accToken: string | undefined;
}) => {
  if (!accToken) return;
  const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProperties),
  });
  const data = await res.json();

  if (!res.ok) return;
  console.log(data);
  return data;
};
