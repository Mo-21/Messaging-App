import { useState } from "react";
import "./App.css";
import Login from "../Login/Login";
import logo from "./logo-icon.svg";
import Dashboard from "../Dashboard/Dashboard";
import Chat from "../ChatPage/Chat";

export function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="brand">Send</div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Chat />
    </>
  );
}

export default App;
