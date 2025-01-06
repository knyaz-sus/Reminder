import axios from "axios";
import { supabase } from "@/lib/create-supabase";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: { post: { "Content-Type": "application/json" } },
});

axiosInstance.interceptors.request.use(
  async (request) => {
    const { data, error } = await supabase.auth.getSession();

    if (error) return Promise.reject(error);

    const token = data?.session?.access_token;
    request.headers.Authorization = `Bearer ${token}`;

    return request;
  },

  (error) => {
    return Promise.reject(error);
  }
);
