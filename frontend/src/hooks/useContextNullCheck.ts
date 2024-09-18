import { Context, useContext } from "react";

export const useContextNullCheck = <T>(context: Context<T>) => {
  if (!context) throw new Error("");
  return useContext<T>(context);
};
