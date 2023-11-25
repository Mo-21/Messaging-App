import { useQueryClient } from "@tanstack/react-query";
import ClientAPI from "../react-query/services/api-client";

const Client = new ClientAPI("/logout");

export default function Logout() {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await Client.logout();
      queryClient.clear(); // Clear the cache
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.response.data.message);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-warning mx-2">
      Logout
    </button>
  );
}
