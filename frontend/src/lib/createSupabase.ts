import { createClient } from "@supabase/supabase-js";

export const createSupabase = () =>
  createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
  );

export const supabase = createSupabase();
