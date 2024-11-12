import { supabase } from "@/lib/createSupabase";

export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:5173/app/today",
    },
  });

  if (error) {
    console.log(`Authentication error: ${error.message}`);
  }
};
