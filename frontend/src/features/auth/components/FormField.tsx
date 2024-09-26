import { ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { ErrorSpan } from "../../../components/ErrorSpan";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";

interface FormFieldProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors?: string[];
  name: string;
}

export function FormField({
  value,
  handleChange,
  errors,
  name,
}: FormFieldProps) {
  return (
    <div>
      <label className="text-sm p-1" htmlFor={`${name}`}>
        {capitalizeFirstLetter(name)}
      </label>
      <Input
        value={value}
        handleChange={handleChange}
        placeholder={`Enter ${name}`}
        id={`${name}`}
        name={`${name}`}
      />
      {errors && <ErrorSpan>{errors.at(-1)}</ErrorSpan>}
    </div>
  );
}
