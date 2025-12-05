import { Suspense } from "react";
import LoginInner from "./LoginInner";

const Login = () => {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
};

export default Login;
