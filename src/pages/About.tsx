import useCheckUserStatus from "../hooks/useCheckUserStatus";

function About() {
  const { userStatusMessage } = useCheckUserStatus();
  return (
    <div>
      {userStatusMessage && <p>{userStatusMessage}</p>}
      <h1>About this website</h1>
    </div>
  );
}

export default About;
