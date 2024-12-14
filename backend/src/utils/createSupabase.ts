import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config.ts";
import { Database } from "../types/schema.ts";

export const createSupabase = () =>
  createClient<Database>(supabaseConfig.url, supabaseConfig.secretKey);

export const supabase = createSupabase();
