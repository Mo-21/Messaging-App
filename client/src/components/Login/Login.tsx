import "./login.css";
import logo from "./logo-icon.svg";

export default function Login() {
  return (
    <div className="login-container">
      <div className="second-login-container">
        <img src={logo} alt="logo" className="logo" />
        <div className="form-group">
          <div className="title">Sign In</div>
          <form className="" action="">
            <div className="email-field">
              <label htmlFor="email">Email</label>
              <input type="email" required />
            </div>
            <div className="password-field">
              <label htmlFor="">Password</label>
              <input type="password" required />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
