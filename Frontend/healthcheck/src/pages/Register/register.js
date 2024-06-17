import "./register.css";
import mapBackground from "../icon/mapBackground.png";
import mail from "../icon/envelope-closed 1.svg";
import lock from "../icon/lock 1.svg";
import name from "../icon/nameBadge.svg";
import age from "../icon/age.svg";
import height from "../icon/height.svg";
import weight from "../icon/weight.svg";
import { useNavigate } from 'react-router-dom';




function Register() {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/')
  };


  return (
    <div className="container">
      <div class="register2">
        <img class="image-2-icon" alt="" src={mapBackground}></img>


        <div class="login-box">
          <div class="login-box-child"></div>

          <b class="create-account">Create account</b>

          <div class="inputs">
            
            <div class="box">
              <input class="input2"></input>
              <img class="group-item" alt="" src={mail}></img>  
            </div>
            
            <div class="box">
              <input class="input2"></input>
              <img class="login-box-item" alt="" src={lock}></img>  
            </div>

            <div class="box">
              <input class="input2"></input>
              <img class="login-box-inner" alt="" src={name}></img>  
            </div>

            <div class="box">
              <input class="input2"></input>
              <img class="group-icon" alt="" src={age}></img> 
            </div>

            <div class="box">
              <input class="input2"></input>
              <img class="height-icon" alt="" src={height}></img> 
            </div>

            <div class="box">
              <input class="input2"></input>
              <img class="login-box-child1" alt="" src={weight}></img> 
            </div>
           
          </div>


          <div class="sign-in">
            <div class="sign-in-child"></div>
            <b class="sign-up">sign up</b>
          </div>

          
          <b class="already-have-an-container">
            <span class="already-have-an-container1">
              <span>Already have an account? </span>
              <span class="login" onClick={handleLoginClick}>Login</span>
            </span>
          </b>
          
          
          
          
        </div>
      </div>
    </div>
  );
}

export default Register;
