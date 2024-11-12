import { signInSchema, SingInSchema } from "../utils/validate";
// import GithubIconDark from "@/assets/icons/GithubIconDark.svg";
// import GithubIconLight from "@/assets/icons/GithubIconLight.svg";
import { FormField } from "./FormField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../api/signIn";
import { Button } from "@/components/Button";
import { signInWithGithub } from "../api/signInWithGithub";
import { FormFooter } from "./FormFooter";
// import { useTheme } from "@/hooks/useTheme";
// import { useMemo } from "react";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInSchema>({
    resolver: zodResolver(signInSchema),
  });
  // const { theme } = useTheme();
  // const GitHubIcon = useMemo(() => {
  //   switch (theme) {
  //     case "light":
  //       return <img src={GithubIconLight} alt="Github" />;
  //     case "dark":
  //       return <img src={GithubIconDark} alt="Github" />;
  //     case "system": {
  //       const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  //         .matches
  //         ? "dark"
  //         : "light";
  //       return systemTheme === "light" ? (
  //         <img src={GithubIconLight} alt="Github" />
  //       ) : (
  //         <img src={GithubIconDark} alt="Github" />
  //       );
  //     }
  //   }
  // }, [theme]);
  const handleSignIn: SubmitHandler<SingInSchema> = (formData) => {
    signIn(formData.email, formData.password);
  };
  return (
    <div className="rounded-md border border-border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-4"
        onSubmit={handleSubmit(handleSignIn)}
        id="signin-form"
        name="signin-form"
      >
        <h1 className="mb-2">Sign in</h1>
        <Button type="button" onClick={signInWithGithub}>
          <span>Sign in with github</span>
        </Button>
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
      <FormFooter
        path="/auth/signup"
        content="New to Reminder? "
        link="Sign up"
      />
    </div>
  );
}
