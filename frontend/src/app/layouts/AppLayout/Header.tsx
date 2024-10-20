import { IconButton } from "../../../components/IconButton";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineBars3,
} from "react-icons/hi2";

interface HeaderProps {
  toggleOpen: () => void;
}

export function Header({ toggleOpen }: HeaderProps) {
  return (
    <header className="flex items-center">
      <div className="flex-1">
        <IconButton Icon={HiOutlineBars3} handleClick={toggleOpen} />
      </div>
      <span className="flex-1 flex justify-center invisible">Info</span>
      <div className="flex-1 flex justify-end">
        <IconButton
          Icon={HiOutlineAdjustmentsHorizontal}
          handleClick={() => {}}
        />
      </div>
    </header>
  );
}
