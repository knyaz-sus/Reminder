import { createContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";

type UserContextType = {
  user: User | null | undefined;
  refetch: () => Promise<void>;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  refetch: async () => {},
  isLoading: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, refetch, isLoading } = useCurrentUser();

  return (
    <UserContext.Provider value={{ user, refetch, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
