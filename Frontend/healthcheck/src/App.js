import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
