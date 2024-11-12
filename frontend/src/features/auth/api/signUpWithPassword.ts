import { supabase } from "@/lib/createSupabase";

export const signUpWithPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Ошибка входа:", error);
    throw error;
  }
};
