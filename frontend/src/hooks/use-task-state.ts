import { TaskStateContext } from "@/context/taskstate-provider";
import { useContextTyped } from "./use-context-typed";

export const useTaskState = () => useContextTyped(TaskStateContext);
