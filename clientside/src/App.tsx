import { useEffect } from "react";
import "./App.css";
import { UserDetailsProvider } from "./Login/UserDetailsProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import Logout from "./Logout/Logout";

function Navbar() {
  const { state } = useAuth();

  return (
    <div className="navbar">
      <div className="username">{state?.userDetails.username}</div>
      <div className="brand">Send</div>
      {state?.userDetails.username ? <Logout /> : ""}
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const { state } = useAuth();

  const _id = state?.userDetails._id || undefined;

  useEffect(() => {
    if (_id) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [_id, navigate]);

  return (
    <UserDetailsProvider>
      <Navbar />
      <Outlet />
    </UserDetailsProvider>
  );
}

export default App;
