import { ThemeProviderContext } from "@/context/ThemeProvider";
import { useContextTyped } from "./useContextTyped";

export const useTheme = () => useContextTyped(ThemeProviderContext);
