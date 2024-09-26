import { ReactNode } from "react";

interface ButtonProps {
  handleClick?: () => void | Promise<unknown>;
  children: ReactNode | string;
  type?: "button" | "submit" | "reset";
}

export function Button({ handleClick, children, type }: ButtonProps) {
  return (
    <button
      className="text-button bg-button rounded-lg p-2"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
