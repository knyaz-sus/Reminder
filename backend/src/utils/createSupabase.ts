import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config";
import { Database } from "../types/schema";

export const createSupabase = () =>
  createClient<Database>(supabaseConfig.url, supabaseConfig.secretKey);

export const supabase = createSupabase();
