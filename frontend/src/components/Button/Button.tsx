import { ReactNode } from "react";

interface ButtonProps {
  handleClick?: () => void | Promise<unknown>;
  children: ReactNode | string;
}

export function Button({ handleClick, children }: ButtonProps) {
  return (
    <button
      className="text-button bg-button rounded-lg p-2"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
