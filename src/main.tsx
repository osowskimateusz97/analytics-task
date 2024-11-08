import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DateProvider } from "./providers/date/dateProvider";
import { ThemeProvider } from "./providers/theme/themeProvider";
import DashboardPage from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SalesPage from "./pages/Sales";
import OrdersPage from "./pages/Orders";
import MainTemplate from "./templates/MainTemplate";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainTemplate />,
      children: [
        {
          path: "",
          element: <DashboardPage />,
        },
        {
          path: "sales",
          element: <SalesPage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <DateProvider>
          <RouterProvider router={router} />
        </DateProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
