import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <Outlet />
    </div>
  );
}
