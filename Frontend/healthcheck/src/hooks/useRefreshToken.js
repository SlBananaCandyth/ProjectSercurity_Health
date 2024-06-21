import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "http://localhost:8000/users/token",
      JSON.stringify({ refreshToken: auth.refreshToken }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
    const accessToken = response?.data?.accessToken;
    console.log("respone: " + accessToken);

    setAuth((prev) => {
      console.log("user prev: " + JSON.stringify(prev));
      console.log(accessToken);
      return { ...prev, accessToken: accessToken };
    });

    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
