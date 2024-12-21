import { supabase } from "@/lib/createSupabase";

export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${
        import.meta.env.DEV
          ? "http//localhost:5173"
          : "https://reminder-navy.vercel.app/"
      }/app`,
    },
  });

  if (error) {
    console.log(`Authentication error: ${error.message}`);
  }
};
