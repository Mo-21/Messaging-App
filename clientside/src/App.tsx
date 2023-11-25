import "./App.css";
import Login from "./Login/Login";
import { UserDetailsProvider } from "./Login/UserDetailsProvider";
import { useAuth } from "./Login/Login";

function Navbar() {
  const { state } = useAuth();

  const username = state.userDetails.username || "";

  return (
    <div className="navbar">
      <div className="username">{username}</div>
      <div className="brand">Send</div>
    </div>
  );
}

function App() {
  return (
    <UserDetailsProvider>
      <Navbar />
      <Login />
    </UserDetailsProvider>
  );
}

export default App;
