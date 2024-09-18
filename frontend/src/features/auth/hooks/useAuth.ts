import { UserContext } from "../../../context/UserProvider";
import { useContextNullCheck } from "../../../hooks/useContextNullCheck";

export const useAuth = () => useContextNullCheck(UserContext);
