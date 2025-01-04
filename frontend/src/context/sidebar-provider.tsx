import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  createContext,
} from "react";
import { TooltipProvider } from "@/components/tooltip";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/cn";
import {
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON}
  from "@/modules/sidebar/constants"

interface ISidebarContext {
  state: "expanded" | "collapsed";
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<ISidebarContext | null>(null);

export const SidebarProvider = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {}
>(({ className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  const defaultOpen = useMemo(
    () => (localStorage.getItem("sidebar:state") === "true" ? true : false),
    []
  );
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const setOpen = useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(isOpen) : value;
      setIsOpen(openState);

      // This sets the sidebar state to local storage.
      localStorage.setItem("sidebar:state", `${openState}`);
    },
    [setIsOpen, isOpen]
  );
  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = isOpen ? "expanded" : "collapsed";

  const contextValue = useMemo<ISidebarContext>(
    () => ({
      state,
      isOpen,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, isOpen, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";
