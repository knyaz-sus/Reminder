import { Button } from "../../../components/Button";
import GithubIconDark from "../../../assets/icons/GithubIconDark.svg";
import { signInSchema, SingInSchema } from "../utils/validate";
import { FormField } from "./FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../services/signIn";
import { IconButton } from "../../../components/IconButton";
import { signInWithGithub } from "../services/signInWithGithub";
import { Link } from "react-router-dom";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const handleSignIn: SubmitHandler<SingInSchema> = (formData) => {
    signIn(formData.email, formData.password);
  };
  return (
    <div className="rounded-lg border-base border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-2"
        onSubmit={handleSubmit(handleSignIn)}
        id="signup-form"
        name="signup-form"
      >
        <h1 className="mb-2">Sign in</h1>
        <IconButton Icon={GithubIconDark} handleClick={signInWithGithub}>
          Sign in with github
        </IconButton>
        <div className="flex flex-col gap-3 mb-2">
          <FormField
            register={register}
            error={errors.email?.message}
            name="email"
          />
          <FormField
            register={register}
            error={errors.password?.message}
            name="password"
            type="password"
          />
        </div>
        <Button type="submit">Sign in with password</Button>
      </form>

      <div className="text-sm text-center">
        New to Reminder?{" "}
        <Link className="underline" to="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}