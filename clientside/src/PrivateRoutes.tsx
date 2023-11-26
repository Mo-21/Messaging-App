import { Navigate, Outlet } from "react-router-dom";
import { userDetailsFromStorage } from "./getFromStorage";

export default function PrivateRoutes() {
  const user = userDetailsFromStorage();

  if (!user) return <Navigate to={"/login"} />;
  return <Outlet />;
}
