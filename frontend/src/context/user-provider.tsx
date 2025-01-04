import { createContext, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";

type UserContextType = {
  session: Session | null;
  refetch: () => Promise<void>;
  isAuthLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  session: null,
  refetch: async () => {},
  isAuthLoading: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { session, refetch, isAuthLoading } = useCurrentUser();

  return (
    <UserContext.Provider value={{ session, refetch, isAuthLoading }}>
      {children}
    </UserContext.Provider>
  );
}
