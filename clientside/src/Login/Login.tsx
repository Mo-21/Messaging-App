/* eslint-disable react-refresh/only-export-components */
import logo from "../assets/logo-icon.svg";
import "./Login.css";
import ClientAPI from "../react-query/services/api-client";
import {
  LoginCredentialsResponse,
  LoginCredentials,
} from "./UserDetailsProvider";
import { useAuth } from "../useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

  const { userDetails } = state;
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const Client = new ClientAPI<LoginCredentials, LoginCredentialsResponse>(
    "/login"
  );

  if (userDetails._id !== null) {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    navigate("/dashboard");
  }
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
          <div className="title">Sign In</div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              dispatch({
                type: "SET_USER_DETAILS",
                payload: await Client.login(credentials),
              });
            }}
          >
            <div className="email-field">
              <label htmlFor="email">Email</label>
              <input
                onChange={(event) =>
                  setCredentials((prevCredentials) => ({
                    ...prevCredentials,
                    email: event.target.value,
                  }))
                }
                value={credentials.email}
                type="email"
                required
              />
            </div>
            <div className="password-field">
              <label htmlFor="">Password</label>
              <input
                value={credentials.password}
                onChange={(event) =>
                  setCredentials((prevCredentials) => ({
                    ...prevCredentials,
                    password: event.target.value,
                  }))
                }
                type="password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="register-banner">
            Don't Have An Account?
            <Link to={"/register"} className="register-link">
              Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
