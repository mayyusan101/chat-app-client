import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import {
  ErrorPage,
  Login,
  Register,
  ProfilePicker,
  ChatUsers,
  ChatRooms,
  ChatActiveUsers,
} from "./utils/import.js";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
import { getToken } from "./utils/localStorage.js";
import "react-toastify/dist/ReactToastify.css";

// prevent access if token is not set
const AuthorizedRoute = ({ element }) => {
  const token = getToken();
  return token ? element : <Navigate to="/login" state={{ message: 'Please login first to access the page' }} replace/>;
};
// prevent access if token is set
const PublicRoute = ({ element }) => {
  const token = getToken();
  return token ?  <Navigate to="/" replace/> : element;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizedRoute element={<App/>} />,
    children: [
      { index: true, element: <ChatUsers /> },
      { path: "/", element: <ChatUsers /> },
      {
        path: "users",
        element: <ChatUsers />,
      },
      {
        path: "rooms",
        element: <ChatRooms />,
      },
      {
        path: "active",
        element: <ChatActiveUsers />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<Login />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <PublicRoute element={<Register />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile-picker",
    element: <AuthorizedRoute element={<ProfilePicker />} />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
      <ToastContainer />
    </RouterProvider>
  </Provider>
);
