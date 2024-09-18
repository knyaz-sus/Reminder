import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config.ts";

export const createSupabase = () =>
  createClient(supabaseConfig.url, supabaseConfig.secretKey);

export const supabase = createSupabase();
