import React from "react";
import { useNavigate } from "react-router";

import { paths } from "src/routes/paths";

const UnauthorizedView: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(paths.root);
  };

  const handleLogin = () => {
    navigate(paths.auth.login);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">401</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Unauthorized Access
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, you are not authorized to view this page.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleGoHome}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedView;
