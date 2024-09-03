import { Helmet } from "react-helmet-async";

import UnauthorizedView from "src/views/401/UnauthorizedView";

export default function UnauthorizedPage() {
  return (
    <>
      <Helmet>
        <title> 401 Unauthorized!</title>
      </Helmet>

      <UnauthorizedView />
    </>
  );
}
