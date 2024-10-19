import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../lib/createSupabase";
import { User } from "@supabase/supabase-js";

export const useCurrentUser = () => {
  const [authUser, setAuthUser] = useState<User | null | undefined>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error.message);
    } else {
      setAuthUser(data.session?.user);
    }
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user);
      setIsAuthLoading(false);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return { authUser, refetch: fetchUser, isAuthLoading };
};
