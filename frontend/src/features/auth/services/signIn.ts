import { supabase } from "../../../lib/createSupabase";

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error.message);
    return null;
  }
  return data.user;
};
