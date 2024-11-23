import { ThemeToggle } from "@/app/layouts/AppLayout/ThemeToggle";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <>
      <header className="flex justify-end w-full fixed pl-6 pt-3 pb-3 pr-6">
        <ThemeToggle />
      </header>
      <main className="flex flex-col items-center justify-center p-4 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
