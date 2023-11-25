import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login from "./Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./Dashboard/Dashboard";
import Chat from "./Chat/Chat";
import Logout from "./Logout/Logout";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <PrivateRoutes />,
        children: [
          {
            path: "",
            element: <Dashboard />,
            children: [
              {
                path: "chat/:id",
                element: <Chat />,
              },
            ],
          },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;

// {
//     element: <PrivateRoutes />,
//     children: [
//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//         children: [
//           {
//             path: "chat/:id",
//             element: <Chat />,
//           },
//         ],
//       },
//       {
//         path: "/logout",
//         element: <Logout />,
//       },
//     ],
//   },
