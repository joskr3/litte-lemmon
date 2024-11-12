import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserProvider } from "../Context/UserContexto.tsx";
import { TableProvider } from "../Context/TableContext";

interface Props {
  children: React.ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <TableProvider>{children}</TableProvider>
        </UserProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default GlobalProvider;
