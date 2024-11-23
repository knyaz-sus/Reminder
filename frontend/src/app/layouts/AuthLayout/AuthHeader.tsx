import { ThemeToggle } from "@/app/layouts/AppLayout/ThemeToggle";

export function AuthHeader() {
  return (
    <header className="flex justify-end w-full fixed pl-6 pt-3 pb-3 pr-6">
      <ThemeToggle />
    </header>
  );
}
