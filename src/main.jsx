// dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// app
import App from "./App.jsx";
// context
import { AuthProvider } from "./auth/providers/AuthProvider.jsx";
// boundries
import { AuthBoundry } from "./auth/boundries/AuthBoundry.js";
// global style
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <AuthBoundry>
                <App />
            </AuthBoundry>
        </AuthProvider>
    </StrictMode>
);
