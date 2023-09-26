import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Create root node and render the app in it
createRoot(document.getElementById("root"))
    .render(
        <StrictMode>
            <App />
        </StrictMode>
    )
