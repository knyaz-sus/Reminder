import { TaskStateContext } from "@/context/TaskStateProvider";
import { useContextTyped } from "./useContextTyped";

export const useTaskState = () => useContextTyped(TaskStateContext);
