import * as dotenv from "dotenv";

dotenv.config();

const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  throw new Error("Required environment variables are missing");
}

export const supabaseConfig = {
  url: SUPABASE_URL,
  secretKey: SUPABASE_SECRET_KEY,
};
