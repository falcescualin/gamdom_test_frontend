import { Helmet } from "react-helmet-async";

import NotFoundView from "src/views/404/NotFoundView";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title> 404 Page Not Found!</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
