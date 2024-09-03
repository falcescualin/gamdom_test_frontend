import { Icon } from "@iconify/react";
import { Link } from "react-router-dom"; // Import Iconify for icons
import { paths } from "src/routes/paths";

const featuredSports = [
  {
    name: "Football",
    icon: "mdi:football",
    color: "text-green-600",
  },
  {
    name: "Baseball",
    icon: "mdi:baseball",
    color: "text-red-600",
  },
  {
    name: "Basketball",
    icon: "mdi:basketball",
    color: "text-orange-600",
  },
];

const Homepage = () => (
  <div className="relative min-h-screen bg-gray-100">
    <header className="absolute top-0 right-0 p-6">
      <Link
        to={paths.auth.login} // Update with the actual path to your login page
        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </Link>
    </header>
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to GamdomTest
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your ultimate destination for sports betting. Get the best odds!
        </p>
        <Link
          to={paths.dashboard.root}
          className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Place Your Bets
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Featured Sports
        </h2>
        <div className="flex space-x-6 justify-center">
          {featuredSports.map((sport) => (
            <Link
              to={paths.dashboard.root}
              key={sport.name}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-32 text-center hover:bg-gray-100"
            >
              <Icon
                icon={sport.icon}
                width={48}
                height={48}
                className={`${sport.color} mb-2`}
              />
              <span className="text-sm font-semibold text-gray-700">
                {sport.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Link
        to={`${paths.dashboard.root}/404`}
        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-32 text-center hover:bg-gray-100 mt-12"
      >
        <span className="text-sm font-semibold text-gray-700">404 demo</span>
      </Link>
    </div>
  </div>
);

export default Homepage;
