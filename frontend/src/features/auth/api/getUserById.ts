import { supabase } from "@/lib/createSupabase";

export const getUserById = async (userId?: string) => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};
