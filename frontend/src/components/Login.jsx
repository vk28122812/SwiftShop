import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import {validateLogin} from "../http";
import toast from "react-hot-toast";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError ] = useState('');
  function handleChange(event) {
    const {name,value} = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
  async function handleLogin(event) {
    try{
      event.preventDefault();
      const res =await validateLogin(input);
      if(res.error){
        setError("Invalid credentials");
        toast.error("Invalid credentials");
      }else{
        toast.success("Logged in!");
        dispatch(authActions.login(res));
        navigate("/");
        setError('');
      }
    }catch(err){
      setError(err.message || "Login failed");
    }
  }
  return (
    <div className="auth-container">
      <div className="login form">
        <header>Login</header>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={input.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            minLength={6}
            value={input.password}
            onChange={handleChange}
            required
          />
          {error && <p style={{color:'red'}}>Invalid credentials...</p>}
          <a href="#">Forgot password?</a>
          <p >
            <button>Login</button>
          </p>
        </form>
        <div className="signup">
          <span className="signup">
            Don't have an account?
            <label htmlFor="check" onClick={()=> navigate("/signup")}>Sign Up</label>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Login;
