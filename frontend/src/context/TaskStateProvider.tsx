import { Task } from "@/types/schemas";
import { createContext, PropsWithChildren, useEffect } from "react";

export type TaskState = Omit<Task & { projectName?: string }, "date"> & {
  date?: Date;
};
export const TaskStateContext = createContext<TaskState | null>(null);

export function TaskStateProvider(props: PropsWithChildren<TaskState>) {
  useEffect(() => {
    console.log("Данные обновились в контексте", props);
  }, [props]);
  return (
    <TaskStateContext.Provider value={props}>
      {props.children}
    </TaskStateContext.Provider>
  );
}
