import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { signIn } from "../services/signIn";
import { signInWithGithub } from "../services/signInWithGithub";
import GithubIconDark from "../../../assets/icons/GithubIconDark.svg";
import { IconButton } from "../../../components/IconButton";
import { signInSchema } from "../utils/validate";
import { useValidateForm } from "../hooks/useValidateForm";
import { FormField } from "./FormField";

export function LoginForm() {
  const { formData, errors, isFormValid, handleChange, handleSubmit } =
    useValidateForm(signInSchema, { email: "", password: "" });
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    if (isFormValid) {
      signIn(formData.email, formData.password);
    }
  };
  return (
    <div className="rounded-lg border-base border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-2"
        onSubmit={handleSignIn}
        id="login-form"
        name="login-form"
      >
        <h1 className="mb-2">Log in</h1>
        <IconButton Icon={GithubIconDark} handleClick={signInWithGithub}>
          Sign up with Github
        </IconButton>
        <FormField
          value={formData.email}
          handleChange={handleChange}
          errors={errors.email}
          name="email"
        />
        <FormField
          value={formData.password}
          handleChange={handleChange}
          errors={errors.password}
          name="password"
        />
        <Button type="submit">Sign in with password</Button>
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
