import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineInbox,
} from "react-icons/hi";
import { UserAvatar } from "../../../../components/UserAvatar";
import { UserRow } from "../../../../types/database";
import { SideBarElement } from "./SideBarElement";
import { useRef } from "react";
import { useResize } from "./useResize";

interface SideBarProps {
  user?: UserRow;
}

export function SideBar({ user }: SideBarProps) {
  const sideBarRef = useRef<HTMLElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  useResize(sideBarRef, separatorRef);
  return (
    <>
      <nav
        style={{
          width: localStorage.getItem("sideBarWidth")
            ? `${localStorage.getItem("sideBarWidth")}`
            : "256px",
        }}
        className="bg-leftbar p-3"
        ref={sideBarRef}
      >
        <div className="flex items-center justify-between mb-3">
          <button className="flex items-center rounded-md p-1 gap-2 hover:bg-transparent">
            <UserAvatar src="/src/assets/test.png" />
            <span>{user?.name}</span>
          </button>
        </div>
        <ul className="flex flex-col mb-3">
          <SideBarElement Icon={HiOutlineInbox} to="/app/inbox">
            Inbox
          </SideBarElement>
          <SideBarElement Icon={HiOutlineBriefcase} to="/app/today">
            Today
          </SideBarElement>
          <SideBarElement Icon={HiOutlineCalendar} to="/app/upcoming">
            Upcoming
          </SideBarElement>
          <SideBarElement Icon={HiOutlineCheckCircle} to="/app/done">
            Done
          </SideBarElement>
        </ul>
      </nav>
      <div
        className="w-2 cursor-col-resize hover:bg-gray-500"
        ref={separatorRef}
      ></div>
    </>
  );
}
