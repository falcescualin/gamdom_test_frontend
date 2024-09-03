import { Icon } from "@iconify/react";
import { Link } from "react-router-dom"; // Assuming RouterLink is a custom component that wraps React Router's Link

const NotFoundView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
    <div className="flex flex-col items-center">
      <Icon
        icon="mdi:alert-octagon"
        width={120}
        height={120}
        className="text-red-600 mb-4"
      />
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-4">
        Oops! The page you&apos;re looking for does not exist.
      </p>
    </div>

    <p className="text-lg text-gray-500 mb-6">
      It seems like you&apos;ve followed a broken link or entered a URL that
      doesn&apos;t exist. Please check the URL and try again.
    </p>

    <Link
      to="/"
      className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Go to Home
    </Link>
  </div>
);

export default NotFoundView;
