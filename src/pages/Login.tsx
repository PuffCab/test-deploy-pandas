import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.value :>> ", e.target.value);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value :>> ", e.target.value);
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email, password :>> ", email, password);
    // if (password.length < 6) {
    //   alert("password is too short");
    //   return;
    // }
    login(email, password);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">password </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button>Login</button>
      </form>
      <Link to={"/register"}>
        If you don't have an account, click here to Register
      </Link>
    </div>
  );
}

export default Login;
