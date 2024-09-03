import { Helmet } from "react-helmet-async";

import DashboardView from "src/views/dashboard/DashboardView";

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
