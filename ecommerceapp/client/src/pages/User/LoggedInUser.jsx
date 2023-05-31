import React from "react";

const LoggedInUser = ({ user }) => {
    return (
        <div className="loggedInUser">
        <h3>Logged in as:</h3>
        <p>{user}</p>
        </div>
    );
};

export default LoggedInUser;