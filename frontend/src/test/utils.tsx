import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";

export function TestProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>{children}</UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
