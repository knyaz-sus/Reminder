import { ChangeEvent, FormEvent, useState } from "react";
import { ZodSchema } from "zod";

type FormErrors<T> = {
  [K in keyof T]?: string[];
};

export const useValidateForm = <T>(schema: ZodSchema, initialData: T) => {
  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState<FormErrors<typeof initialData>>({});

  const [isFormValid, setIsFormValid] = useState(true);

  const [wasInvalid, setWasInvalid] = useState(false);

  const validateForm = () => {
    const result = schema.safeParse({ ...formData });
    if (!result.success) {
      const errors = result.error.flatten();
      setErrors(errors.fieldErrors);
      setWasInvalid(true);
    }
    setIsFormValid(result.success);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (wasInvalid) {
      validateForm();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
  };
  return {
    formData,
    errors,
    isFormValid,
    handleChange,
    handleSubmit,
  };
};
