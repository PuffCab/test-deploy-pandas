import { useEffect, useState } from "react";
import {
  // ErrorResponse,
  // Navigate,
  useNavigate,
  useRouteError,
} from "react-router-dom";

type ErrorPage = {
  data: string;
  error: {
    message: string;
    stack: string;
  };
  status: number;
  statusText: string;
};

function NoMatchPage() {
  const [isRedirect, setIsRedirect] = useState(false);
  console.log("isRedirect :>> ", isRedirect);

  const redirectUser = () => {
    setTimeout(() => {
      setIsRedirect(true);
    }, 3000);
  };

  const error = useRouteError() as ErrorPage;
  console.log("error :>> ");

  // NOTE in order to create a back button, we will have to use the useNavigate() hook: https://reactrouter.com/en/main/hooks/use-navigate
  const navigateTo = useNavigate();

  const redirectTo = () => {
    navigateTo("/");
  };

  useEffect(() => {
    redirectUser();
  }, []);

  return (
    <div>
      <h1>...Nothing to display here...</h1>
      <h3>{error.error.message}</h3>
      <button onClick={redirectTo}>Go back to Home</button>
      {/* {isRedirect ? (
        <Navigate to="/" />
      ) : (
        <h1>...you will be redirected to home in 3...2..1..</h1>
      )} */}
    </div>
  );
}

export default NoMatchPage;
