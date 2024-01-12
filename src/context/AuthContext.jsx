import { createContext } from "react";
import { getUser } from "../utils/localStorage";


export const AuthContext = createContext(getUser() || null);

export const AuthContextProvider = AuthContext.Provider;

