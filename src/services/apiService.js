import axios from "axios";
import { getToken, removeToken, removeUser } from "../utils/localStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors
    console.log("error", error);
    if (error?.response?.status === 401) {
      // Redirect to login or refresh token
      console.log("Unauthorized: token.");
      removeUser();
      removeToken();
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
