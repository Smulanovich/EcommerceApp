import React, { createContext, useState, useEffect, useRef } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const userRef = useRef(null);

  // Now using local storage to persist user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      userRef.current = parsedUser;
    }
  }, []);

  const login = (user) => {
    setUser(user);
    userRef.current = user;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    userRef.current = null;
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
