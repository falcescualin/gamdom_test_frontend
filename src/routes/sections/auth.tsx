import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SplashScreen } from "src/components/loading-screen";

import { paths } from "../paths";

const LoginPage = lazy(() => import("src/pages/auth/login"));
const RegisterPage = lazy(() => import("src/pages/auth/register"));

export const authRoutes = [
  {
    path: paths.auth.root,
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: paths.auth.login,
        element: <LoginPage />,
      },
      {
        path: paths.auth.register,
        element: <RegisterPage />,
      },
    ],
  },
];
