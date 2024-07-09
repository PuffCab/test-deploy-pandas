import { ReactNode } from "react";

import useCheckUserStatus from "../hooks/useCheckUserStatus";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  //   console.log("props :>> ", props);
  // const { user } = useContext(AuthContext);

  //? using a helper function to find out if the user is logged in or not.
  // const isUserLogged = checkUserStatus(user);

  //? using custom hook

  const { isLogged } = useCheckUserStatus();

  //   return <> {user ? children : <h1>You need to Login</h1>} </>;
  // return <> {user ? children : <Navigate to="/" />} </>;
  //? using helper function

  // return <> {isUserLogged ? children : <Navigate to="/" />} </>;
  //? using custom hook. When isLogged = false, we need to render something "inside" the protected route, not navigate somewhere else.
  return <> {isLogged ? children : <h1>Login First!!</h1>}</>;
}

export default ProtectedRoute;
