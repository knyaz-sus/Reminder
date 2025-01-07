import {
  CalendarDays,
  CircleCheckBig,
  Inbox,
  SquareChartGantt,
} from "lucide-react";

export const sidebarMenuRoutes = [
  { name: "Inbox", Icon: Inbox, path: "/app/inbox" },
  { name: "Today", Icon: SquareChartGantt, path: "/app/today" },
  { name: "Upcoming", Icon: CalendarDays, path: "/app/upcoming" },
  { name: "Done", Icon: CircleCheckBig, path: "/app/done" },
] as const;

export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "m";
