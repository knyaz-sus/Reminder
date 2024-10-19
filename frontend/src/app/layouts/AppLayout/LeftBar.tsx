import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineInbox,
} from "react-icons/hi";
import { UserAvatar } from "../../../components/UserAvatar";
import { IconButton } from "../../../components/IconButton";
import { UserRow } from "../../../types/database";
import { LeftBarElement } from "./LeftBarElement";
import { HiOutlineBars3 } from "react-icons/hi2";

interface LeftBarProps {
  user?: UserRow;
  toggleOpen: () => void;
}

export function LeftBar({ user, toggleOpen }: LeftBarProps) {
  return (
    <nav style={{ maxWidth: "256px" }} className="flex-1 bg-leftbar p-3">
      <div className="flex items-center justify-between mb-3">
        <button className="flex items-center rounded-md p-1 gap-2 hover:bg-transparent">
          <UserAvatar src="/src/assets/test.png" />
          <span>{user?.name}</span>
        </button>
        <IconButton Icon={HiOutlineBars3} handleClick={toggleOpen} />
      </div>
      <ul className="flex flex-col mb-3">
        <LeftBarElement Icon={HiOutlineInbox} to="/app/inbox">
          Inbox
        </LeftBarElement>
        <LeftBarElement Icon={HiOutlineBriefcase} to="/app/today">
          Today
        </LeftBarElement>
        <LeftBarElement Icon={HiOutlineCalendar} to="/app/upcoming">
          Upcoming
        </LeftBarElement>
        <LeftBarElement Icon={HiOutlineCheckCircle} to="/app/done">
          Done
        </LeftBarElement>
      </ul>
      <div>{/* <span>My projects</span> */}</div>
    </nav>
  );
}
