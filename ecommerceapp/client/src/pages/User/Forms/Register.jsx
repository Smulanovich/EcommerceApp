import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userProvider";
import axios from "axios";
import "./SignIn.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [failedLoginMsg, setFailedLoginMsg] = useState("");
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  const { login, user } = useContext(UserContext);

  const goToAccount = () => {
    navigate("/account");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const insertingResponse = await axios.post(
        "http://localhost:4000/api/insertUser",
        { email, firstName, lastName, password }
      );
      if (insertingResponse.data) {
        console.log("User registered successfully");
        login(insertingResponse.data);
        goToAccount();
      } 
      else {
        console.log("User registration failed");
        setFailedLoginMsg("Registration failed. Email already in use. Please try again.");
        setEmail(""); // Clear the email input
        emailInputRef.current.focus(); // Move the focus back to the email input field
      }
    } 
    catch (error) {
      console.error("Error registering user:", error);
      setFailedLoginMsg(
        "Registration error. Please try again."
      );
      setEmail(""); // Clear the email input
      emailInputRef.current.focus(); // Move the focus back to the email input field
    }
  };

  return (
    <div className="overallSignIn">
      <div className="auth-form-container">
        <h2>Register</h2>
        <p>{failedLoginMsg}</p>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">First Name</label>
          <input
            value={firstName}
            name="name"
            onChange={(e) => setFirstName(e.target.value)}
            id="name"
            placeholder="First Name"
          />
          <label htmlFor="name">Last Name</label>
          <input
            value={lastName}
            name="name"
            onChange={(e) => setLastName(e.target.value)}
            id="name"
            placeholder="Last Name"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@email"
            id="email"
            name="email"
            ref={emailInputRef}
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
          <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={goToAccount}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};

export default Register;
