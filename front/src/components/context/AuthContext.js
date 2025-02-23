import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isTokenExpired = (expire) => {
        if (!expire) return true;
        const currentTime = Date.now()
        return currentTime > expire;

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expire = localStorage.getItem("expire");

        if (token && !isTokenExpired(expire)) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
            localStorage.removeItem("expire");
        }
    }, []);

    const login = (token, expire) => {
        localStorage.setItem("token", token);
        localStorage.setItem("expire", expire);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};