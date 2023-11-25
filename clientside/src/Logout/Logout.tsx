import { useQueryClient } from "@tanstack/react-query";
import ClientAPI from "../react-query/services/api-client";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom";

const Client = new ClientAPI("/logout");

export default function Logout() {
  const queryClient = useQueryClient();
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Client.logout();
      queryClient.clear(); // Clear the cache
      window.location.reload();
      dispatch({ type: "LOGOUT" });
      navigate("/login")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
}
