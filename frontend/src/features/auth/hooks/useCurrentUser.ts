import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/createSupabase";
import { User } from "@supabase/supabase-js";

export const useCurrentUser = () => {
  const [authUser, setAuthUser] = useState<User | undefined>(undefined);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      else setAuthUser(data.user);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user);
      setIsAuthLoading(false);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return { authUser, refetch: fetchUser, isAuthLoading };
};
