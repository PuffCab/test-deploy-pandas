import React, { useContext } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";

function MyNavbar() {
  // const [user, setUser] = useState<User | null>(null);
  // give acces to the AuthContext
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  // * function from bootstrap for tooltip
  const renderTooltip = (props: OverlayInjectedProps) => (
    <Tooltip id="button-tooltip" {...props}>
      Login First!
    </Tooltip>
  );

  return (
    <nav>
      <NavLink to="/">Home</NavLink> |{" "}
      <NavLink
        to="about"
        style={({ isActive }) => {
          return isActive ? { fontSize: "50px" } : {};
        }}
      >
        About
      </NavLink>{" "}
      |{/* {user ? <Link to="characters">Characters</Link> : <p></p>} */}
      <NavLink to="characters">Characters</NavLink> |{" "}
      <NavLink to="contact">Contact</NavLink> |{" "}
      <OverlayTrigger
        placement="right"
        delay={{ show: 100, hide: 250 }}
        overlay={renderTooltip}
      >
        <NavLink to="chat" className="disabled">
          Chat
        </NavLink>
      </OverlayTrigger>{" "}
      | <NavLink to="register">Register</NavLink>|{" "}
      <NavLink to="login">Login</NavLink>
      {user && (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      )}{" "}
    </nav>
  );
}

export default MyNavbar;
