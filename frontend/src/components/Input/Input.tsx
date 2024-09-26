import { ChangeEvent } from "react";

interface InputProps {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  placeholder?: string;
}

export function Input({
  value,
  handleChange,
  id,
  name,
  placeholder,
}: InputProps) {
  return (
    <input
      className="rounded-lg border-base border bg-inherit p-2 w-full max-w-sm"
      type="text"
      value={value}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={(e) => handleChange(e)}
    />
  );
}
