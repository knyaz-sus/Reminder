import { Database } from "@/types/schema";
import { createClient } from "@supabase/supabase-js";

export const createSupabase = () =>
  createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

export const supabase = createSupabase();
