import { useState } from "react";
import logo from "../assets/logo-icon.svg";
import { RegistrationCredentials } from "../Login/UserDetailsProvider";
import { Link } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState<RegistrationCredentials>({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  return (
    <div className="login-container">
      <div className="second-login-container">
        <div className="left-container">
          <img src={logo} alt="logo" className="logo" />
          <div
            style={{
              textAlign: "center",
              fontSize: "6rem",
              fontFamily: "Holiday",
              letterSpacing: "1px",
            }}
          >
            Send
          </div>
        </div>
        <div className="form-group">
          <div className="title">Sign Up</div>
          <form>
            <div className="email-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={(event) => {
                  setCredentials({
                    ...credentials,
                    username: event.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="email-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(event) => {
                  setCredentials({
                    ...credentials,
                    email: event.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="password-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(event) => {
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="password-field">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                onChange={(event) => {
                  setCredentials({
                    ...credentials,
                    passwordConfirmation: event.target.value,
                  });
                }}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Register
            </button>
          </form>
          <div className="register-banner">
            Already Have An Account?
            <Link className="register-link" to={"/login"}>
              Sign-In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
