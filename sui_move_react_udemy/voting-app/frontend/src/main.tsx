import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavigationProvider from "./providers/navigation/NavigationProvider.tsx";
import { ThemeProvider } from "./providers/theme/ThemeProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
