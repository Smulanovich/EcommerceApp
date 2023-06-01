import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignIn.css'
import { UserContext } from "../UserProvider";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');
  const [failedLoginMsg, setFailedLoginMsg] = useState(''); 
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("email: " + email);
      console.log("password: " + password);
      const user = await axios.post('http://localhost:4000/api/login', { email, password });

      if (user.data) {
        console.log("Authentication successful");
        console.log("Data ", user.data);
        login (user.data);
      } 
      else {
        console.log("Authentication failed");
        setFailedLoginMsg("Login failed. Please try again.");
      }
    } 
    catch (error) {
      console.error("Error authenticating login:", error);
      setFailedLoginMsg("Login failed. Please try again.");
    }
  };

  const goToRegister = () => {
    navigate("/account/register");
  };

  return (
    <div className="overallSignIn">
      <div className="auth-form-container">
        <h2>Login</h2>
        <p>{failedLoginMsg}</p>
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
