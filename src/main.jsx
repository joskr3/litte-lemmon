// @ts-nocheck
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./Context/UserContexto";
import { TableProvider } from "./Context/TableContext";
import AppRoutes from "./Pages/Ruta";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <TableProvider>
            <AppRoutes />
          </TableProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
