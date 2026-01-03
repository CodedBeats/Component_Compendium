// dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// app
import App from "./App.jsx";
// global style
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
