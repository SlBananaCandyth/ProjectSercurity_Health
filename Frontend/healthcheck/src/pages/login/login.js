import "./login.css";
import mapBackground from "../../icon/mapBackground.png";
import mail from "../../icon/envelope-closed 1.svg";
import lock from "../../icon/lock 1.svg";


function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user_email, setEmail] = useState("");
  const [encrypted_password, setPassword] = useState("");
  const [navigate, setNavaigate] = useState(false);
  const [navigateRegister, setNavaigateRegister] = useState(false);
  const [success, setSucess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user_email, encrypted_password]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        JSON.stringify({ user_email, encrypted_password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;

      setAuth({ user_email, encrypted_password, accessToken });
      setEmail("");
      setPassword("");
      setSucess(true);
      setNavaigate(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Server is offline");
      } else if (err.response?.status === 400) {
        setErrMsg("Cannot find user");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      }else{
        setErrMsg("Something went wrong");
      }
      errRef.current.focus();
    }
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

          <>
            {success ? (
              <section>
                <h1>Logged in successfully</h1>
              </section>
            ) : (
              <section>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </section>
            )}
          </>

          <form onSubmit={submit}>
            <div class="email-input">
              <input
                class="input"
                type="text"
                placeholder="Email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={user_email}
                required
              ></input>
              <img class="mail" alt="" src={mail}></img>
            </div>

            <div class="password-input">
              <input
                class="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={encrypted_password}
                required
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
