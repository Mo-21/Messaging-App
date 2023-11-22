import { FormEvent, useState } from "react";
import logo from "./logo-icon.svg";
import { useNavigate } from "react-router-dom";

export default function Register({ setUsername }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [username, setNewUsername] = useState();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (e: FormEvent) => {
    setNewUsername(e.currentTarget.value);
  };

  const handleEmailChange = (e: FormEvent) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e: FormEvent) => {
    setPassword(e.currentTarget.value);
  };

  const handlePasswordConfirmationChange = (e: FormEvent) => {
    setPasswordConfirmation(e.currentTarget.value);
  };

  const handleFormSubmission = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirmation,
        }),
      });

      if (!response.ok) {
        setError("Invalid Info");
        setLoading(false);
      }
      const data = await response.json();
      if (response.status !== 200) {
        setError("Unauthorized");
      } else {
        setUsername(data.userDetails.username);
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
          <div className="title">Sign Up</div>
          <form onSubmit={handleFormSubmission} action="">
            <div className="email-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                type="text"
                required
              />
            </div>
            <div className="email-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                type="email"
                required
              />
            </div>
            <div className="password-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
                type="password"
                required
              />
            </div>
            <div className="password-field">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                onChange={handlePasswordConfirmationChange}
                value={passwordConfirmation}
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Register
            </button>
          </form>
          <div className="register-banner">
            Already Have An Account?{" "}
            <a className="register-link" href="#">
              Sign In!
            </a>
          </div>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
}
