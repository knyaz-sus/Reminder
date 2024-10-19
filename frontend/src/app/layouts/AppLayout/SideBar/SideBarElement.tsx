import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface SideBarElementProps {
  to: string;
  Icon?: IconType;
  children: string;
}

export function SideBarElement({ to, Icon, children }: SideBarElementProps) {
  return (
    <li className="flex items-center rounded-md p-1 gap-2 hover:bg-transparent">
      {Icon ? <Icon size={20} /> : <></>}
      <Link className="block w-full" to={to}>
        {children}
      </Link>
    </li>
  );
}
