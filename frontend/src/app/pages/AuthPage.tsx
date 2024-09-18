import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { signIn } from "../../features/auth/services/signIn";
import { signUpWithPassword } from "../../features/auth/services/signUpWithPassword";
import { signInWithGithub } from "../../features/auth/services/signInWithGithub";

export function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" flex flex-col justify-center gap-4 items-center min-h-svh">
      <Input value={name} setValue={setName} />
      <Input value={email} setValue={setEmail} />
      <Input value={password} setValue={setPassword} />
      <Button onClick={() => signIn(email, password)}>Sign in</Button>
      <Button onClick={() => signUpWithPassword(name, email, password)}>
        Sign up
      </Button>
      <Button onClick={signInWithGithub}>Sign up with Github</Button>
    </div>
  );
}
