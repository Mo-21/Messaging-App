import { useEffect } from "react";
import "./App.css";
import Login from "./Login/Login";
import { UserDetailsProvider } from "./Login/UserDetailsProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

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
      <Login />
    </UserDetailsProvider>
  );
}

export default App;
