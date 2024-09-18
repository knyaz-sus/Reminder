import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void | Promise<unknown>;
  children: ReactNode | string;
}

export function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
