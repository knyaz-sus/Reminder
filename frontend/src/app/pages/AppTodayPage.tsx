import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { changeUserName } from "../../services/changeUserName";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../features/auth/services/getUserById";
import { UserRow } from "../../types/database";
import { signOut } from "../../features/auth/services/signOut";

export function AppTodayPage() {
  const { user, isLoading } = useAuth();
  const [newName, setNewName] = useState("");

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
      <Input value={newName} setValue={setNewName} />
      <Button onClick={changeNameHandler}>change</Button>
      <Button onClick={signOut}>sign out</Button>
    </div>
  );
}
