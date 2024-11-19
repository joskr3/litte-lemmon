// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./app/Ruta";
import GlobalProvider from "./Provider/GlobalProvider";
import { AnimatePresence, motion } from "motion/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <AnimatePresence>
        <motion.div
          exit={{
            scale: 3,
          }}
        >
          <AppRoutes />
        </motion.div>
      </AnimatePresence>
    </GlobalProvider>
  </StrictMode>
);
