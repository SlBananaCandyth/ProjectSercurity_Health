import { useContext, useDebugValue } from "react";
import AuthContext from "../context/authProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (auth) =>
    auth?.user_email ? `Logged In` : "Logged Out"
  );
  return useContext(AuthContext);
};

export default useAuth;
