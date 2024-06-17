import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/authProvider";

function Users() {
  const [user, setUser] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(auth);

    const getUsers = async () => {
      try {
        console.log(auth.accessToken);

        const respone = await axios.get("http://localhost:8000/users/auths", {
          headers: auth.accessToken,
          signal: controller.signal,
        });

        if (isMounted) {
          setUser(respone.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {user?.length ? (
        <ul>
          {user.map((user, i) => (
            <li key={i}>{user?.user_email}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
