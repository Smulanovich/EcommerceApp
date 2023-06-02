// User.jsx

import React from 'react';
import { UserContext } from './UserProvider.jsx';
import { useContext } from 'react';
import Login from './Forms/Login.jsx';
import LoggedInUser from './LoggedInUser.jsx';

const User = () => {
    const { user } = useContext(UserContext);
    if (!user) {
        console.log(user);
        return <Login />;
    }
    return <LoggedInUser user={user} />;
}

export default User;