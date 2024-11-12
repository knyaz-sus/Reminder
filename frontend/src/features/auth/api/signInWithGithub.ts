import { supabase } from "@/lib/createSupabase";

export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${import.meta.env.VITE_API_URL}/app`,
    },
  });

  if (error) {
    console.log(`Authentication error: ${error.message}`);
  }
};
