import { FormEvent, useId, useState } from "react";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { signUpWithPassword } from "../services/signUpWithPassword";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const id = useId();
  const handleSignUp = () => signUpWithPassword(name, email, password);
  const preventSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
  return (
    <form
      className="flex flex-col gap-3 rounded-lg border-base border w-full max-w-sm p-6"
      onSubmit={preventSubmit}
      id={`${id}-signin`}
      name={`${id}-signin`}
    >
      <h1 className="mb-2">Sign up</h1>
      <div>
        <label className="text-sm p-1" htmlFor={`${id}-username`}>
          Username
        </label>
        <Input
          value={name}
          setValue={setName}
          placeholder="Enter username"
          id={`${id}-username`}
          name={`${id}-username`}
        />
      </div>
      <div>
        <label className="text-sm p-1" htmlFor={`${id}-email`}>
          Email
        </label>
        <Input
          value={email}
          setValue={setEmail}
          placeholder="Enter email"
          id={`${id}-email`}
          name={`${id}-email`}
        />
      </div>
      <div className="mb-2">
        <label className="text-sm p-1" htmlFor={`${id}-password`}>
          Password
        </label>
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Enter password"
          id={`${id}-password`}
          name={`${id}-password`}
        />
      </div>
      <Button handleClick={handleSignUp}>Sign up</Button>
    </form>
  );
}
