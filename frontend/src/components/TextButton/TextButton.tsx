import { ReactNode } from "react";

interface TextButtonProps {
  handleClick?: () => void | Promise<unknown>;
  children: ReactNode | string;
  type?: "button" | "submit" | "reset";
}

export function TextButton({ handleClick, children, type }: TextButtonProps) {
  return (
    <button
      className="text-button bg-button rounded-md pt-1 pl-2 pb-1 pr-2"
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
