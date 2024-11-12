import axios from "axios";

export const changeUserName = async (name: string, id?: string) => {
  if (!name || !id) return;
  return await axios.post("/api/auth/change-username", { name, id });
};
