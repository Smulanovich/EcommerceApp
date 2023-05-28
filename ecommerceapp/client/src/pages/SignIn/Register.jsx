import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        navigate("/SignIn/Login")
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@email" id="email" name="email"/>
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password"/>
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={goToLogin}>Already have an account?Login here.</button>
        </div>
    );
};
export default Register;