import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { paths } from "src/routes/paths";

interface Props {
  error: Error;
}

const DashboardError = ({ error }: Props) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleHome = () => {
    navigate(paths.dashboard.root);
  };

  useEffect(() => {
    enqueueSnackbar(error.message, { variant: "error" });
  }, [error.message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-red-600 text-6xl mb-4">
          <span className="material-icons">error_outline</span>{" "}
          {/* Error icon */}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Something Went Wrong
        </h1>
        <p className="text-gray-700 mb-6">
          We encountered an unexpected error. Please try again later or contact
          support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700 transition"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleHome}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardError;
