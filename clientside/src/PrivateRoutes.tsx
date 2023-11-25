import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function PrivateRoutes() {
  const { state } = useAuth();

  const _id = state.userDetails._id || undefined;

  if (!_id) return <Navigate to={"/login"} />;
  return <Outlet />;
}
