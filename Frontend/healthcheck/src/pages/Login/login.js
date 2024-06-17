import "./login.css";
import mapBackground from "../icon/mapBackground.png";
import mail from "../icon/envelope-closed 1.svg";
import lock from "../icon/lock 1.svg";
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('../Register')
  };

  return (
    <div className="container">
      <div class="demo-login">
          <img class="mapBackground" alt="" src={mapBackground}></img>

          <div class="demo-login-child">
          </div>
 
          <b class="welcome-back">Welcome back</b>

          <div class="email-input">
            <input class="input" type="email" placeholder="email"></input>
            <img class="mail" alt="" src={mail}></img>
          </div>

          <div class="password-input">
            <input class="input" type="password" placeholder="password"></input>
            <img class="lock" alt="" src={lock}></img>
          </div>

          <button class="signin-button">login
          </button>

          
          <b class="dont-have-account">
            <span class="dont-have-an-container1">
              <span>Don’t have an account? </span>
              <span class="register" onClick={handleRegisterClick}>Register
              </span>
              
            </span>
          </b>
          <b class="forgot-password">Forgot password?</b>
          
        </div>
    </div>
  );
}

export default Login;



