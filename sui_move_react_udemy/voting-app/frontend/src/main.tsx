import { DAppKitProvider } from "@mysten/dapp-kit-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { dAppKit } from "./config/networkConfig.ts";
import "./index.css";
import NavigationProvider from "./providers/navigation/NavigationProvider.tsx";
import { ThemeProvider } from "./providers/theme/ThemeProvider.tsx";

const queryClient = new QueryClient();

declare module "@mysten/dapp-kit-react" {
  interface Register {
    dAppKit: typeof dAppKit;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <DAppKitProvider dAppKit={dAppKit}>
          <NavigationProvider>
            <App />
          </NavigationProvider>
        </DAppKitProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
