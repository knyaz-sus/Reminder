import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useCreateState = () => {
  const [isCreating, setIsCreating] = useState(false);

  const location = useLocation();
  useEffect(() => setIsCreating(false), [location]);

  const toggleCreating = () => setIsCreating((prev) => !prev);

  return { isCreating, toggleCreating };
};
