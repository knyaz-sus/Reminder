import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/createSupabase";
import { User } from "@supabase/supabase-js";

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error.message);
        return;
      }
      setUser(data.session?.user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
      setIsLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { user, refetch: fetchUser, isLoading };
};
