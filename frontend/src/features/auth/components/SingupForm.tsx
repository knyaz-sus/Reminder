import { Button } from "../../../components/Button";
import { SingUpSchema, singUpSchema } from "../utils/validate";
import { FormField } from "./FormField";
import { signUpWithPassword } from "../services/signUpWithPassword";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingUpSchema>({
    resolver: zodResolver(singUpSchema),
  });
  const handleSignIn: SubmitHandler<SingUpSchema> = (formData) => {
    signUpWithPassword(formData.name, formData.email, formData.password);
  };
  return (
    <div className="rounded-lg border-base border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(handleSignIn)}
        id="signup-form"
        name="signup-form"
      >
        <h1 className="mb-2">Sign up</h1>
        <div className="flex flex-col gap-3 mb-2">
          <FormField
            register={register}
            error={errors.name?.message}
            name="name"
          />
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
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}
