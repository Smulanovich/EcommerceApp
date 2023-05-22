import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate= useNavigate('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);


    };

    const goToRegister = () => {
        navigate("/SignIn/Register")
    };
    return (
        <div className="auth-form-conatiner">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={goToRegister}>Don't have an account?Register here.</button>
        </div>
    );
};
export default Login;