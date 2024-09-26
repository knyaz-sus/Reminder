import { ReactNode } from "react";

export function ErrorSpan({ children }: { children: string | ReactNode }) {
  return <span className="text-sm p-1 text-red-400">{children}</span>;
}
