// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./Pages/Ruta";
import GlobalProvider from "./Provider/GlobalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  </StrictMode>
);
