import { Helmet } from "react-helmet-async";

import { AuthLoginView } from "src/views/auth/AuthLoginView";

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login</title>
      </Helmet>

      <AuthLoginView />
    </>
  );
}
