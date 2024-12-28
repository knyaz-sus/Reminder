import { Task } from "@/types/schemas";
import { createContext, PropsWithChildren } from "react";

export type TaskState = Omit<Task & { projectName?: string }, "date"> & {
  date?: Date;
};
export const TaskStateContext = createContext<TaskState | null>(null);

export function TaskStateProvider(props: PropsWithChildren<TaskState>) {
  return (
    <TaskStateContext.Provider value={props}>
      {props.children}
    </TaskStateContext.Provider>
  );
}
