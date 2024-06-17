import "./register.css";
import mapBackground from "../../icon/mapBackground.png";
import mail from "../../icon/envelope-closed 1.svg";
import lock from "../../icon/lock 1.svg";

import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Register() {
  const [user_email, setEmail] = useState("");
  const [encrypted_password, setPassword] = useState("");
  const [navigate, setNavaigate] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const respone = await axios.post("http://localhost:8000/users/register", {
      user_email,
      encrypted_password,
    });

    console.log(respone.data);

    setNavaigate(true);
  };

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="Register">
      <header className="App-header">
        <div class="demo-login">
          <img class="mapBackground" alt="" src={mapBackground}></img>

          <div class="demo-login-child"></div>

          <b class="welcome-back">Register here</b>

          <form onSubmit={submit}>
            <div class="email-input">
              <input
                class="input"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <img class="mail" alt="" src={mail}></img>
            </div>

            <div class="password-input">
              <input
                class="input"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <img class="lock" alt="" src={lock}></img>
            </div>

            <button class="signin-button" type="submit">
              Register in
              {/* <div class="signin-button-child"></div>
            <b class="sign-in">sign in</b> */}
            </button>
          </form>

          <b class="dont-have-account">
            <span class="dont-have-an-container1">
              <span>Don’t have an account? </span>
              <span class="register">Register</span>
            </span>
          </b>
          <b class="forgot-password">Forgot password?</b>
        </div>
      </header>
    </div>
  );
}

export default Register;
