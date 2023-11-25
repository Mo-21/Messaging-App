import { useEffect } from "react";
import "./App.css";
import { UserDetailsProvider } from "./Login/UserDetailsProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import Logout from "./Logout/Logout";
import { userDetailsFromStorage } from "./getFromStorage";

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

  const user = userDetailsFromStorage();
  if (user !== null) {
    console.log(user);
  } else {
    console.log("null");
  }

  useEffect(() => {
    if (user !== null) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <UserDetailsProvider>
      <Navbar />
      <Outlet />
    </UserDetailsProvider>
  );
}

export default App;
