import { IconType } from "react-icons";

interface IconButtonProps {
  Icon: IconType;
  handleClick: () => void | Promise<unknown>;
}
export function IconButton({ Icon, handleClick }: IconButtonProps) {
  return (
    <button
      className="flex items-center justify-center rounded-md p-1 hover:bg-transparent"
      onClick={handleClick}
      type="button"
    >
      <Icon size={22} />
    </button>
  );
}
