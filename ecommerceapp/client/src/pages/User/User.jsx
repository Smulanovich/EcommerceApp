// User.jsx

import React from 'react';
import { UserContext } from './UserProvider.jsx';

const User = () => {
    const { user } = useContext(UserContext);

}

export default User;