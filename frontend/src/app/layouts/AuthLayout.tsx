import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="flex flex-col items-center justify-center p-4 min-h-screen">
      <Outlet />
    </main>
  );
}
