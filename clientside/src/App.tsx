import "./App.css";
import Login from "./Login";
import { UserDetailsProvider } from "./UserDetailsProvider";
import useAuth from "./hooks/useAuth";

function Navbar() {
  const { state } = useAuth();

  console.log(state.userDetails.username);
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
