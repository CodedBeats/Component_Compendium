// dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// app
import App from "./App.jsx";
// context
import { AuthProvider } from "./auth/providers/AuthProvider.jsx";
// boundries
import { AuthBoundry } from "./auth/boundries/AuthBoundry.jsx";
// query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
// global style
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AuthBoundry>
                    <App />
                    <ReactQueryDevtools />
                </AuthBoundry>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
