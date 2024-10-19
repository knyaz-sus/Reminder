import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserRow } from "../../../types/database";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { getUserById } from "../../../features/auth/services/getUserById";
import { TextButton } from "../../../components/TextButton";
import { signOut } from "../../../features/auth/services/signOut";
import { Header } from "./Header";
import { SideBar } from "./SideBar/SideBar";

export function AppLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(
    localStorage.getItem("isSideBarOpen") === "true"
  );
  const { authUser, isAuthLoading } = useAuth();
  const { data: user } = useQuery<UserRow>({
    queryKey: ["user"],
    queryFn: () => getUserById(authUser?.id),
    enabled: !!authUser && !isAuthLoading,
  });
  const toggleOpen = () => {
    setIsSideBarOpen(!isSideBarOpen);
    localStorage.setItem("isSideBarOpen", `${!isSideBarOpen}`);
  };
  return (
    <div className="flex min-h-screen">
      {isSideBarOpen && <SideBar user={user} />}
      <div className="flex flex-col flex-1 p-3">
        <Header toggleOpen={toggleOpen} />
        <main>
          <Outlet />
          <TextButton handleClick={signOut}>{user?.name}</TextButton>
        </main>
      </div>
    </div>
  );
}
