import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "@/components/ui/provider";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <AppRoutes />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
