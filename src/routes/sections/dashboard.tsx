import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AuthGuard } from "src/auth/guard";
import DashboardPage from "src/pages/dashboard/dashboard";

import { LoadingScreen } from "src/components/loading-screen";

import { paths } from "../paths";

export const dashboardRoutes = [
  {
    path: paths.dashboard.root,
    element: (
      <AuthGuard>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </AuthGuard>
    ),
    children: [{ element: <DashboardPage />, index: true }],
  },
];
