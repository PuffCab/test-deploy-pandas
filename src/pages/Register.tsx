import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Register() {
  const { register } = useContext(AuthContext);

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

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("email, password :>> ", email, password);
    // if (password.length < 6) {
    //   alert("password is too short");
    //   return;
    // }
    console.log("I am gonna do a request to FIREBASE");
    register(email, password);
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegisterSubmit}>
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
        <button>Register</button>
      </form>
      <Link to={"/login"}>
        Do you have already an account? click here to Login
      </Link>
    </div>
  );
}

export default Register;
