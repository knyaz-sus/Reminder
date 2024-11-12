import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { ErrorSpan } from "@/components/ErrorSpan";
import { Input } from "@/components/Input";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: "text" | "password";
}

export function FormField<T extends FieldValues>({
  name,
  error,
  register,
  type = "text",
}: FormFieldProps<T>) {
  return (
    <div>
      <label className="text-sm p-1" htmlFor={name}>
        {capitalizeFirstLetter(name)}
      </label>
      <Input
        {...register(name)}
        type={type}
        placeholder={`Enter your ${name}`}
        id={name}
        autoComplete={name}
      />
      {error && <ErrorSpan>{error}</ErrorSpan>}
    </div>
  );
}
