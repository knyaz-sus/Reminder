import { FormEvent } from "react";
import { Button } from "../../../components/Button";
import { singUpSchema } from "../utils/validate";
import { useValidateForm } from "../hooks/useValidateForm";
import { FormField } from "./FormField";
import { signUpWithPassword } from "../services/signUpWithPassword";

export function SignupForm() {
  const { formData, errors, isFormValid, handleChange, handleSubmit } =
    useValidateForm(singUpSchema, { email: "", password: "", name: "" });
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    if (isFormValid) {
      signUpWithPassword(formData.name, formData.email, formData.password);
    }
  };
  console.log(`f${formData.name}a`, errors.name);
  return (
    <div className="rounded-lg border-base border w-full max-w-sm p-6">
      <form
        className="flex flex-col gap-3 mb-2"
        onSubmit={handleSignIn}
        id="signup-form"
        name="signup-form"
      >
        <h1 className="mb-2">Sign up</h1>
        <FormField
          value={formData.name}
          handleChange={handleChange}
          errors={errors.name}
          name="name"
        />
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
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}
