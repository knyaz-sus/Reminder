import { useId, useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { changeUserName } from "../../services/changeUserName";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../features/auth/services/getUserById";
import { UserRow } from "../../types/database";
import { signOut } from "../../features/auth/services/signOut";

export function AppTodayPage() {
  const { user, isLoading } = useAuth();
  const [newName, setNewName] = useState("");
  const id = useId();
  const {
    data: userRow,
    refetch: refetchRow,
    isLoading: isLoadingQuery,
  } = useQuery<UserRow>({
    queryKey: ["user"],
    queryFn: () => getUserById(user?.id),
    enabled: !!user?.id && !isLoading,
  });

  const changeNameHandler = async () => {
    await changeUserName(newName, userRow?.id);
    refetchRow();
    setNewName("");
  };
  return (
    <div className="flex flex-col items-center gap-2">
      {!isLoading && !isLoadingQuery ? (
        <h2>{userRow?.name}</h2>
      ) : (
        <h2>Loading...</h2>
      )}
      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder=""
        name={`${id}`}
        id={`${id}`}
      />
      <Button handleClick={changeNameHandler}>change</Button>
      <Button handleClick={signOut}>sign out</Button>
    </div>
  );
}
