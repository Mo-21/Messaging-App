import { FormEvent, useState } from "react";
import "./login.css";
import logo from "./logo-icon.svg";
import { useNavigate } from "react-router-dom";

export default function Login({ setUsername, setUserId }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e: FormEvent) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent) => {
    setPassword(e.currentTarget.value);
  };

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid Credentials");
      }
      const data = await response.json();
      console.log(data.userDetails._id);
      setUserId(data.userDetails._id);
      setUsername(data.userDetails.username);
      if (response.status !== 200) {
        setError("Unauthorized");
      } else {
        navigate("/"); // Redirect to dashboard on successful login
      }
    } catch (err) {
      console.log(err.message);
      setError(err);
      if (err) setError(err.message);
      else return;
    } finally {
      setLoading(true);
    }
  };

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
          <form onSubmit={handleFormSubmission} action="">
            <div className="email-field">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={handleEmailChange}
                type="email"
                required
              />
            </div>
            <div className="password-field">
              <label htmlFor="">Password</label>
              <input
                onChange={handlePasswordChange}
                value={password}
                type="password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="register-banner">
            Don't Have An Account?{" "}
            <a className="register-link" href="#">
              Sign Up!
            </a>
          </div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
}
