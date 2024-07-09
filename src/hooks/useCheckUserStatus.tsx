import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type HookReturn = {
  isLogged: boolean;
  userStatusMessage: string;
};

function useCheckUserStatus(): HookReturn {
  const { user } = useContext(AuthContext);

  const [isLogged, setIsLogged] = useState(false);
  const [userStatusMessage, setUserStatusMessage] = useState("");

  const checkUserStatus = () => {
    if (user !== null) {
      setIsLogged(true);
      setUserStatusMessage("user is logged in");
    } else {
      setIsLogged(false);
      setUserStatusMessage("user is NOT logged in");
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, [user?.email]);

  return { isLogged, userStatusMessage };
}

export default useCheckUserStatus;
