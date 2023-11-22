import App from "./App/App";
import Dashboard from "./Dashboard/Dashboard";
import ErrorPage from "./ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login/Login";
import Chat from "./ChatPage/Chat";
import Logout from "./Logout/Logout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/logout",
      element: <Logout />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/chat/:id",
      element: <Chat />,
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
