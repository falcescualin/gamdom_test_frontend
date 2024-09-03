import { Helmet } from "react-helmet-async";

import { AuthRegisterView } from "src/views/auth/AuthRegisterView";

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register</title>
      </Helmet>

      <AuthRegisterView />
    </>
  );
}
