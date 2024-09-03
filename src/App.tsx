import { useState } from "react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import Router from "./routes/sections";
import { AuthProvider } from "./auth/context";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <Router />
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
