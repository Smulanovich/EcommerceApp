import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from './SignIn.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate= useNavigate('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    };

    const goToLogin = () => {
        navigate("/account")
    };

    return (
        <div className="overallSignIn">
            <div className="auth-form-container">
                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">First Name</label>
                    <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="First Name" />
                    <label htmlFor="name">Last Name</label>
                    <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Last Name" />
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email" id="email" name="email"/>
                    <label htmlFor="password">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                    <button type="submit">Register</button>
                </form>
                <button className="link-btn" onClick={goToLogin}>Already have an account? Login here.</button>
            </div>
        </div>
    );
};
export default Register;