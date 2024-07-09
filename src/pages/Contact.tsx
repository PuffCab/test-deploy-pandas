import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useCheckUserStatus from "../hooks/useCheckUserStatus";

function Contact() {
  const { user } = useContext(AuthContext);
  const { userStatusMessage } = useCheckUserStatus();
  return (
    <div>
      {userStatusMessage && <p>{userStatusMessage}</p>}
      {user ? (
        <h1>Contact me at {user.email} </h1>
      ) : (
        <h1>Find out our contact info</h1>
      )}
    </div>
  );
}

export default Contact;
