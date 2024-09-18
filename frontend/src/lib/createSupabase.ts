import { createClient } from "@supabase/supabase-js";

export const createSupabase = () =>
  createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

export const supabase = createSupabase();
