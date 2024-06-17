import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [user_email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8000/users/auths");

      setEmail(data[0].user_email);
    })();
  }, []);
  return (
    <div>
      <h1>Users Account Page</h1>
      <p>Email: {user_email}</p>
    </div>
  );
}

export default Users;
