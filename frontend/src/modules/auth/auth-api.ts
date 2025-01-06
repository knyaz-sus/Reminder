import { supabase } from "@/lib/create-supabase";

export const authApi = {
  async signInWithPassword(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },

  async signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${import.meta.env.BASE_URL}/app`,
      },
    });
    if (error) throw error;
  },

  async signUpWithPassword(name: string, email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
  },

  async signOut() {
    supabase.auth.signOut();
  },
};
