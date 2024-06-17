import "./login.css";
import mapBackground from "../../icon/mapBackground.png";
import mail from "../../icon/envelope-closed 1.svg";
import lock from "../../icon/lock 1.svg";

function Login() {
  return (
    <div className="Login">
      <header className="App-header">
        <div class="demo-login">
          <img class="mapBackground" alt="" src={mapBackground}></img>

          <div class="demo-login-child"></div>

          <b class="welcome-back">Welcome back</b>

          <div class="email-input">
            <input class="input" type="email" placeholder="Email"></input>
            <img class="mail" alt="" src={mail}></img>
          </div>

          <div class="password-input">
            <input class="input" type="password" placeholder="Password"></input>
            <img class="lock" alt="" src={lock}></img>
          </div>

          <button class="signin-button">
            Sign in
            {/* <div class="signin-button-child"></div>
            <b class="sign-in">sign in</b> */}
          </button>

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

export default Login;
