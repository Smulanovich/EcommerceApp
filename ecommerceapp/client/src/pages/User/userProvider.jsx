import React, { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    
    const login = (user) => {
        setUser(user);
    };
    
    const logout = () => {
        setUser({});
    };

    const returnUser = () => {
        return user;
    }
    
    return (
        <UserContext.Provider
        value={{
            user,
            login,
            logout,
            returnUser
        }}
        >
        {children}
        </UserContext.Provider>
    );
}

export default UserProvider;