import "./App.css";
import Login from "./Login/Login";
import { UserDetailsProvider } from "./Login/UserDetailsProvider";
import { useAuth } from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Logout from "./Logout/Logout";
import Chat from "./Chat/Chat";

function Navbar() {
  const { state } = useAuth();

  const username = state.userDetails.username || "";

  return (
    <div className="navbar">
      <div className="username">{username}</div>
      <div className="brand">Send</div>
      {username ? <Logout /> : ""}
    </div>
  );
}

function App() {
  return (
    <UserDetailsProvider>
      <Navbar />
      <Chat />
    </UserDetailsProvider>
  );
}

export default App;
