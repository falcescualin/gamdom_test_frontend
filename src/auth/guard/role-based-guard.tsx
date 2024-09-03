import React from "react";
import { Link } from "react-router-dom";

import { paths } from "src/routes/paths";

import { useAuthContext } from "src/auth/hooks";

type RoleBasedGuardProp = {
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({
  roles,
  children,
}: RoleBasedGuardProp) {
  const { user, unauthenticated } = useAuthContext();

  const currentRole = user?.role;

  if (
    (typeof roles !== "undefined" &&
      currentRole &&
      !roles.includes(currentRole)) ||
    unauthenticated
  ) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6">
        <h3 className="text-2xl font-semibold mb-2">Permission Denied</h3>
        <p className="text-gray-600">
          You do not have permission to access this page
        </p>
        <Link
          to={paths.auth.login}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Login
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
