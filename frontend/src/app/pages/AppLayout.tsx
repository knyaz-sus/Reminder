import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function AppLayout() {
  const { user } = useAuth();

  return (
    <div>
      {/* <strong className="bg-red-800">{user?.name}</strong> */}
      <Outlet />
    </div>
  );
}
