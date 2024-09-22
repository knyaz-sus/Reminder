interface InputProps {
  value: string;
  setValue: (param: string) => void;
  id: string;
  name: string;
  placeholder?: string;
}

export function Input({ value, setValue, id, name, placeholder }: InputProps) {
  return (
    <input
      className="rounded-lg border-base border bg-inherit p-2 w-full max-w-sm"
      type="text"
      value={value}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
