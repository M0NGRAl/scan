import React from "react";
import logo from "../images/logo.png";
import '../styles/Header.css'

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-section">
                <img src={logo} alt="logo" className="logo-image" />
            </div>
            <div className="nav-links">
                <a href="/" className="nav-link">Главная</a>
                <a href="/" className="nav-link">Тарифы</a>
                <a href="/" className="nav-link">FAQ</a>
            </div>
            <div className="auth-buttons">
                <a href="/" className="auth-link">Зарегистрироваться</a>
                <span className="separator-line"></span>
                <button className="auth-button">Войти</button>
            </div>
        </div>
    );
};

export default Header;