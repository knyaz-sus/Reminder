import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserRow } from "../../../types/database";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { getUserById } from "../../../features/auth/services/getUserById";
import { LeftBar } from "./LeftBar";
import { TextButton } from "../../../components/TextButton";
import { signOut } from "../../../features/auth/services/signOut";
import { Header } from "./Header";

export function AppLayout() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { authUser, isAuthLoading } = useAuth();
  const { data: user } = useQuery<UserRow>({
    queryKey: ["user"],
    queryFn: () => getUserById(authUser?.id),
    enabled: !!authUser && !isAuthLoading,
  });
  const toggleOpen = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="flex min-h-screen">
      {isNavOpen && <LeftBar user={user} toggleOpen={toggleOpen} />}
      <div className="flex flex-col flex-1 p-3">
        <Header isNavOpen={isNavOpen} toggleOpen={toggleOpen} />
        <main>
          <Outlet />
          <TextButton handleClick={signOut}>Sign out</TextButton>
        </main>
      </div>
    </div>
  );
}
