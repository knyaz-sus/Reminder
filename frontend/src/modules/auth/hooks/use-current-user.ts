import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/create-supabase";
import { Session } from "@supabase/supabase-js";

export const useCurrentUser = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      else setSession(session);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsAuthLoading(false);
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return { session, refetch: fetchUser, isAuthLoading };
};
