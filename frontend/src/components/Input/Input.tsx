interface InputProps {
  value: string;
  setValue: (param: string) => void;
}

export function Input({ value, setValue }: InputProps) {
  return (
    <input
      className="rounded-md border-white border-2 bg-inherit p-2 w-96"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
