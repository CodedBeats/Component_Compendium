// dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// app
import App from "./App.jsx";
// context
import { AuthProvider } from "./context/AuthContext.jsx";
// global style
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
