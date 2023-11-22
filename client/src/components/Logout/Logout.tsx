import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import { NavbarProps } from "../App/App";

interface LogoutProps {
  setUsername: (name: string | null) => void;
}

export default function Logout({ setUsername }: LogoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout");

      if (!response.ok) {
        console.log("Invalid");
      }
      const data = await response.json();
      if (response.status !== 200) {
        console.log("Unauthorized");
      } else {
        setUsername(null);
        navigate("/login");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-warning mx-2">
      Logout
    </button>
  );
}
