import { supabase } from "@/lib/createSupabase";

export const signOut = () => {
  supabase.auth.signOut();
};
