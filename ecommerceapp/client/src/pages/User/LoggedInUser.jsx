import React from "react";
import { useContext } from 'react';
import axios from "axios";
import { UserContext } from "./UserProvider.jsx";

const LoggedInUser = () => {

    const { user, logout } = useContext(UserContext);

    const DeleteAccount = async () => {
        try {
            const deleteSucces = await axios.post(`http://localhost:4000/api/users/${user.email}/delete`);
            if (deleteSucces) {
                console.log("Account deleted");
                logout();
            }
            else {
                console.log("Failed to delete account");
            }
        }
        catch (error) {
            console.error("Error deleting account:", error);
        }
    }

    return (
        <div className="loggedInUser">
            <h3>Logged in as:</h3>
            <h4>{user.firstName} {user.lastName}</h4>
            <p>email: {user.email}</p>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => DeleteAccount()}>Delete account</button>
        </div>
    );
};

export default LoggedInUser;