import { SidebarTrigger } from "@/components/Sidebar/components/Sidebar";
import { ViewOptions } from "./ViewOptions";

export function AppHeader() {
  return (
    <header className="flex justify-between w-full pb-2">
      <SidebarTrigger />
      <div className="flex gap-4 items-center">
        <ViewOptions />
      </div>
    </header>
  );
}
