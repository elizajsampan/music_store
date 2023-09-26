import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../auth/AuthContext";
import { editUser, setUser } from "./userActions";
import userReducer from "./userReducer";

export const UserContext = createContext({
  user: [],
  loading: false,
  fetchUser: () => {},
});

export const UserProvider = ({ children }) => {
  const initialState = {
    user: [],
  };

  const http = useHttp("http://localhost:8080/reverb");

  const [{ user }, dispatch] = useReducer(userReducer, initialState);

  const [loading, setLoading] = useState(false);
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const response = await http.get("/me", {
      headers: {
        Authorization: jwt ? `Bearer ${jwt}` : "",
      },
    });
    setLoading(false);
    dispatch(setUser(response.data));
  }, [http, jwt]);

  // const handleEditUser = useCallback(
  //   async (currentUser) => {
  //     const response = await http.put(
  //       "/editprofile",
  //       { ...currentUser },
  //       {
  //         headers: {
  //           Authorization: jwt ? `Bearer ${jwt}` : "",
  //         },
  //       }
  //     );
  //     dispatch(handleEditUser(response.data));
  //   },
  //   [http, jwt]
  // );

  const handleEditUser = useCallback(
    async (updatedUser) => {
      const { data: updatedUserInDb } = await http.put(
        `/editprofile`,
        {
          ...updatedUser,
        },
        {
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
          },
        }
      );
      dispatch(editUser(updatedUserInDb));
      console.log(updatedUserInDb);
    },
    [http, jwt]
  );

  const handleEditPassword = useCallback(
    async (updatedUser) => {
      const { data: updatedUserInDb } = await http.put(
        `/editpassword`,
        {
          ...updatedUser,
        },
        {
          headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
          },
        }
      );
      dispatch(editUser(updatedUserInDb));
    },
    [http, jwt]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUser,
        loading,
        handleEditUser,
        handleEditPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
