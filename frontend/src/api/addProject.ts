export const addProject = async (
  name: string,
  accToken?: string,
  userId?: string
) => {
  try {
    if (!name || !userId || !accToken) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, userId }),
    });
    if (!res.ok) return;
    console.log(await res.json());
  } catch (e) {
    console.log(e);
  }
};
