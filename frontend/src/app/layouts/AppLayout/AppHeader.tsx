import { SidebarTrigger } from "@/components/Sidebar/components/Sidebar";
import { ViewOptions } from "./ViewOptions";
import { useSidebar } from "@/hooks/useSideBar";
import { cn } from "@/lib/cn";

export function AppHeader() {
  const { isOpen, isMobile } = useSidebar();
  return (
    <header className="flex fixed w-full justify-between h-[52px] z-[2] bg-background">
      <SidebarTrigger
        className={cn(
          "absolute left-[1.5rem] top-3 transition-all ease-linear duration-200",
          {
            "left-[17.5rem]": isOpen,
            "left-6": isMobile,
          }
        )}
      />
      <div className="flex gap-4 items-center absolute right-6 top-3">
        <ViewOptions />
      </div>
    </header>
  );
}
