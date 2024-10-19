import { ReactNode } from "react";

interface IconTextButtonProps {
  Icon: string;
  handleClick: () => void | Promise<unknown>;
  children: ReactNode | string;
}

export function IconTextButton({
  Icon,
  handleClick,
  children,
}: IconTextButtonProps) {
  return (
    <button
      className="flex items-center text-button bg-button rounded-md p-2"
      onClick={handleClick}
      type="button"
    >
      <img className="w-5 h-5" src={Icon} alt="Github" />
      <span className="flex-auto">{children}</span>
    </button>
  );
}
