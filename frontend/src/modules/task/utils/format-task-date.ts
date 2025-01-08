import { isToday, isYesterday, isTomorrow } from "date-fns";

export const formatTaskDate = (date: Date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  if (isTomorrow(date)) return "Tomorrow";
  return date.toDateString();
};
