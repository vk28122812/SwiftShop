import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../http";

function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({name:"", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (input.password !== input.confirm) {
      setError("confirm password must match with the password");
      return;
    }
    if( !input.name.trim()){
      setError("Name is required.");
      return;
    }
    try {
      const res = await signUp({
        email: input.email,
        password: input.password,
        name: input.name
      });
      if (res.error) {
        setError("Email already exists");
      } else {
        setError("");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Sign Up Failed...");
    }
  }

  return (
    <div className="auth-container">
      <div className="registration form">
        <header>Sign Up</header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={input.name}
            onChange={handleChange}
            pattern="[A-Za-z\s]+"
            title="Name should contain only alphabets and spaces."
            required
          />
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
            placeholder="Create a password"
            value={input.password}
            onChange={handleChange}
            minLength={6}
            required
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm your password"
            value={input.confirm}
            onChange={handleChange}
            minLength={6}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button>Sign Up</button>
        </form>
        <div className="signup">
          <span className="signup">
            Already have an account?
            <label htmlFor="check" onClick={() => navigate("/login")}>
              Login
            </label>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
