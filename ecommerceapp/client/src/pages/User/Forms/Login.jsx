import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseEmail = await axios.post('/api/login', { email, password });

      if (responseEmail) {
        // Authentication successful, do something (e.g., set user in state)
        console.log("Authentication successful");
      } else {
        // Authentication failed, do something (e.g., show error message)
        console.log("Authentication failed");
      }
    } catch (error) {
      // Error occurred during authentication, do something (e.g., show error message)
      console.error("Error authenticating login:", error);
    }
  };

  const goToRegister = () => {
    navigate("/account/register");
  };

  return (
    <div className="overallSignIn">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@email"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={goToRegister}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};

export default Login;
