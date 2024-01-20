import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import {
  ErrorPage,
  Login,
  Register,
  ProfilePicker,
  ChatUsers,
  ChatRooms,
  ChatActiveUsers,
} from "../utils/import.js";
import { AuthorizeRoute } from "./AuthorizeRoute.jsx";
import { PublicRoute } from "./PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizeRoute element={<App element={<ChatUsers />} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "users",
    element: <AuthorizeRoute element={<App element={<ChatUsers />} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "rooms",
    element: <AuthorizeRoute element={<App element={<ChatRooms />} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "active",
    element: <AuthorizeRoute element={<App element={<ChatActiveUsers />} />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <PublicRoute element={<Login />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <PublicRoute element={<Register />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile-picker",
    element: <AuthorizeRoute element={<ProfilePicker />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <AuthorizeRoute element={<App element={<ChatUsers />} />} />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
