import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div>
      {/* <strong className="bg-red-800">{user?.name}</strong> */}
      <Outlet />
    </div>
  );
}
