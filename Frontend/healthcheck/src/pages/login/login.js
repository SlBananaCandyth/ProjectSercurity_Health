import "./login.css";
import mapBackground from "../../icon/mapBackground.png";
import mail from "../../icon/envelope-closed 1.svg";
import lock from "../../icon/lock 1.svg";

import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
  const [user_email, setEmail] = useState("");
  const [encrypted_password, setPassword] = useState("");
  const [navigate, setNavaigate] = useState(false);
  const [navigateRegister, setNavaigateRegister] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const {data} = await axios.post("http://localhost:8000/users/login", {
      user_email,
      encrypted_password,
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${data["accessToken"]}`;

    setNavaigate(true);
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  const registerPage = () => {
    setNavaigateRegister(true);
  };

  if (navigateRegister) {
    return <Navigate to="/register" />;
  }

  return (
    <div className="Login">
      <header className="App-header">
        <div class="demo-login">
          <img class="mapBackground" alt="" src={mapBackground}></img>

          <div class="demo-login-child"></div>

          <b class="welcome-back">Welcome back</b>

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
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <img class="lock" alt="" src={lock}></img>
            </div>

            <button class="signin-button" type="submit">
              Sign in
              {/* <div class="signin-button-child"></div>
            <b class="sign-in">sign in</b> */}
            </button>
          </form>

          <b class="dont-have-account">
            <span class="dont-have-an-container1">
              <span>Don’t have an account? </span>
              <span class="register" onClick={registerPage}>
                Register
              </span>
            </span>
          </b>
          <b class="forgot-password">Forgot password?</b>
        </div>
      </header>
    </div>
  );
}

export default Login;
