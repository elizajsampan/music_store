import { createContext, useReducer } from "react";
import authReducer from "./authReducer";
import useHttp from "../../hooks/useHttp";
import { setAuthToken } from "./authActions";

export const AuthContext = createContext({
  jwt: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},

});

export const AuthProvider = ({ children }) => {
  const initialState = {
    jwt: localStorage.getItem("jwt"),
  };
  const [{ jwt }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const http = useHttp();

  const signIn = async ({ username, password }) => {
    const {
      data: { jwt },
    }= await http.post("/authenticate", {
      username,
      password,
    });

    dispatch(setAuthToken(jwt));
    localStorage.setItem("jwt", jwt);
  };

  const signUp = async ({
    userId,
    username,
    firstName,
    lastName,
    password,
    email,
    phone,
    address,
    role,
  }) => {
    await http.post("/register", {
      userId,
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      address,
      role,
    });
  };


  const signOut = () => {
    dispatch(setAuthToken(null));
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider
      value={{
        jwt,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
