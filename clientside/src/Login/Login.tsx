/* eslint-disable react-refresh/only-export-components */
import logo from "../assets/logo-icon.svg";
import "../styles/login.css";
import ClientAPI from "../react-query/services/api-client";
import {
  LoginCredentialsResponse,
  LoginCredentials,
} from "./UserDetailsProvider";
import { useContext } from "react";
import userDetailsContext from "./userDetails-context";

export const useAuth = () => useContext(userDetailsContext);

export default function Login() {
  const { state, dispatch } = useAuth();

  const { userDetails, credentials } = state;

  console.log(userDetails);
  const Client = new ClientAPI<LoginCredentials, LoginCredentialsResponse>(
    "/login"
  );

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
                  dispatch({
                    type: "SET_CREDENTIALS",
                    payload: { ...credentials, email: event.target.value },
                  })
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
                  dispatch({
                    type: "SET_CREDENTIALS",
                    payload: { ...credentials, password: event.target.value },
                  })
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
            <a className="register-link" href="#">
              Sign Up!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
