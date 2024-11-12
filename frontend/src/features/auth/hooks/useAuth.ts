import { UserContext } from "@/context/UserProvider";
import { useContextTyped } from "@/hooks/useContextTyped";

export const useAuth = () => useContextTyped(UserContext);
