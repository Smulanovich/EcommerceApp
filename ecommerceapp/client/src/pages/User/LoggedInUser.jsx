import React from "react";
import { useContext } from 'react';
import { UserContext } from "./userProvider.jsx";

const LoggedInUser = ({ user }) => {
    const { logout } = useContext(UserContext);
    return (
        <div className="loggedInUser">
        <h3>Logged in as:</h3>
        <h4>{user.firstName} {user.lastName}</h4>
        <p>email: {user.email}</p>
        <button onClick={() => logout()}>Logout</button>
        </div>
    );
};

export default LoggedInUser;