import { FormEvent, useId, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { signIn } from "../services/signIn";
import { signInWithGithub } from "../services/signInWithGithub";
import GithubIconDark from "../../../assets/icons/GithubIconDark.svg";
import { IconButton } from "./IconButton";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const id = useId();
  const handleSignIn = () => signIn(email, password);
  const preventSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
  return (
    <div className="rounded-lg border-base border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-2"
        onSubmit={preventSubmit}
        id={`${id}-login`}
        name={`${id}-login`}
      >
        <h1 className="mb-2">Log in</h1>
        <IconButton Icon={GithubIconDark} handleClick={signInWithGithub}>
          Sign up with Github
        </IconButton>
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
        <Button handleClick={handleSignIn}>Sign in</Button>
      </form>
      <div className="flex justify-center text-sm ">
        <span>
          Are you new to my app? Feel free to{" "}
          <Link className="underline" to={"/auth/signup"}>
            sing up
          </Link>
        </span>
      </div>
    </div>
  );
}
