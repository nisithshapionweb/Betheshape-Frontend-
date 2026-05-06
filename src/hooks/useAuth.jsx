import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      loading: true,
      createUser: () => { },
      signIn: () => { },
      logout: () => { },
      updateUserProfile: () => { },
      forgotPassword: () => { },
    };
  }

  return context;
};

export default useAuth;
