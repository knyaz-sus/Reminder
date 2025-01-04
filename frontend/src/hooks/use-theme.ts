import { ThemeProviderContext } from "@/context/theme-provider";
import { useContextTyped } from "./use-context-typed";

export const useTheme = () => useContextTyped(ThemeProviderContext);
