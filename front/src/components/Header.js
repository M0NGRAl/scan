import React, {useContext} from "react";
import logo from "../images/logo.png";
import '../styles/Header.css'
import { useNavigate } from "react-router-dom";
import {AuthContext} from "./context/AuthContext.js";
const Header = () => {
    const navigate = useNavigate();
    const {isAuthenticated, logout} = useContext(AuthContext);

    return (
        <div className="header-container">
            <div className="logo-section">
                <img src={logo} alt="logo" className="logo-image" />
            </div>
            <div className="nav-links">
                <a href="/" className="nav-link" onClick={() => navigate('/')}>Главная</a>
                <a href="#" className="nav-link">Тарифы</a>
                <a href="#" className="nav-link">FAQ</a>
            </div>
            <div className="auth-buttons">
                <a href="#" className="auth-link">Зарегистрироваться</a>
                <span className="separator-line"></span>
                {isAuthenticated ? (
                    <>
                        <button className="auth-button" onClick={logout}>Выйти</button>
                    </>

                ): (
                    <button className="auth-button" onClick={() => navigate('/authorization')}>Войти</button>
                )}

            </div>
        </div>
    );
};

export default Header;