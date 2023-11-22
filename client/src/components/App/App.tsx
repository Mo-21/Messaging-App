import "./App.css";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import Chat from "../ChatPage/Chat";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "../Register/Register";
import { useState } from "react";
import Logout from "../Logout/Logout";

interface NavbarProps {
  username: string | null;
  setUsername: (name: string | null) => void;
}

export function Navbar({ username, setUsername }: NavbarProps) {
  return (
    <div className="navbar">
      <div className="username">{username ? username : ""}</div>
      <div className="brand">Send</div>
      {username ? <Logout setUsername={setUsername} /> : ""}
    </div>
  );
}

function App() {
  const [username, setUsername] = useState<string | null>(null);
  return (
    <Router>
      <Navbar setUsername={setUsername} username={username} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/logout" />
      </Routes>
    </Router>
  );
}

export default App;
