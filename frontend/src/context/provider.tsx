import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/context/user-provider";
import { ThemeProvider } from "@/context/theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}