import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";

export const AuthorizeRoute = ({ element }) => {
  const token = getToken();
  return token ? (
    element
  ) : (
    <Navigate
      to="/login"
      state={{ message: "Please login first to access the page" }}
      replace
    />
  );
};
