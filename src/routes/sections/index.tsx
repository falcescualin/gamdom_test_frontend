import { Navigate, useRoutes } from "react-router-dom";

import NotFoundPage from "src/pages/404/404";
import Homepage from "src/pages/homepage/homepage";

import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Homepage />,
    },

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    {
      path: "/404",
      element: <NotFoundPage />,
    },

    // No match 404
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
