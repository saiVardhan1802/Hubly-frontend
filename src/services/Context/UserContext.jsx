import { createContext, useEffect, useState } from "react";
import React from "react";

export const UserContext = createContext();
export const SetUserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
    }, [user])

    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}