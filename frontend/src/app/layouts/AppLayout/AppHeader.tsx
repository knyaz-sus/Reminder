import { ThemeToggle } from "@/app/layouts/AppLayout/ThemeToggle";
import { SidebarTrigger } from "@/features/sidebar/components/Sidebar";
import { ViewOptions } from "./ViewOptions";

export function AppHeader() {
  return (
    <header className="flex justify-between items-center w-full pb-2">
      <SidebarTrigger />
      <div className="flex gap-4 items-center">
        <ViewOptions />
        <ThemeToggle />
      </div>
    </header>
  );
}
