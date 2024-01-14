import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";

export const PublicRoute = ({ element }) => {
  const token = getToken();
  return token ? <Navigate to="/" replace /> : element;
};
