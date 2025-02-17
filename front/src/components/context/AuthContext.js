import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isTokenExpired = (expire) => {
        if (!expire) return true; // Если expire отсутствует, токен считается истекшим
        const currentTime = Date.now(); // Текущее время в секундах
        return currentTime > expire; // Сравниваем с expire

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const expire = localStorage.getItem("expire");

        if (token && !isTokenExpired(expire)) {
            setIsAuthenticated(true); // Токен действителен
        } else {
            setIsAuthenticated(false); // Токен истек или отсутствует
            localStorage.removeItem("token"); // Удаляем недействительный токен
            localStorage.removeItem("expire"); // Удаляем expire
        }
    }, []);

    const login = (token, expire) => {
        localStorage.setItem("token", token); // Сохраняем токен
        localStorage.setItem("expire", expire); // Сохраняем время истечения
        setIsAuthenticated(true); // Устанавливаем аутентификацию
    };

    const logout = () => {
        setIsAuthenticated(false); // Сбрасываем аутентификацию
        localStorage.removeItem("token"); // Удаляем токен
        localStorage.removeItem("expire"); // Удаляем время истечения
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};