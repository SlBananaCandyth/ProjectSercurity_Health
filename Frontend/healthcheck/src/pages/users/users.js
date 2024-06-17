import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [user, setUser] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const respone = await axios.get("http://localhost:8000/users/auths", {
          signal: controller.signal,
        });
        console.log(respone.data);

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
