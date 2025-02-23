import React, { useContext, useState, useEffect } from "react";
import logo from "../images/logo.png";
import '../styles/Header.css';
import profile_picture from "../images/profile_picture.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [usedCompany, setUsedCompany] = useState(0);
    const [companyLimit, setCompanyLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoading(true);
            fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    setUsedCompany(data.eventFiltersInfo.usedCompanyCount);
                    setCompanyLimit(data.eventFiltersInfo.companyLimit);
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="header-container">
                <div className="header-logo-section">
                    <img src={logo} alt="logo" className="logo-image" />
                </div>

                {/* Навигация */}
                <div className="nav-links">
                    <a href="/" className="nav-link" onClick={() => navigate('/')}>Главная</a>
                    <a href="#" className="nav-link">Тарифы</a>
                    <a href="#" className="nav-link">FAQ</a>
                </div>

                {/* Информация о компании */}
                {isAuthenticated && (
                    <div className='company-info'>
                        {isLoading ? (
                            <div className="circle-spinner">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="dot" style={{"--i": i}}></div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <p>Использовано компаний: <span className="company-number1">{usedCompany}</span></p>
                                <p>Лимит по компаниям: <span className="company-number2">{companyLimit}</span></p>
                            </>
                        )}
                    </div>
                )}

                {/* Блок авторизации */}
                <div className="auth-buttons">
                    {isAuthenticated ? (
                        <div className='header-login-container'>
                            <div className='user-info'>
                                <label>Алексей А.</label>
                                <button className="exit-button" onClick={handleLogout}>Выйти</button>
                            </div>
                            <img src={profile_picture} alt="profile picture" className="profile-image"/>
                        </div>
                    ) : (
                        <>
                            <a href="#" className="auth-link">Зарегистрироваться</a>
                            <span className="separator-line"></span>
                            <button className="auth-button" onClick={() => navigate('/authorization')}>Войти</button>
                        </>
                    )}
                </div>

                {/* Кнопка гамбургер для открытия меню */}
                <div className="hamburger-menu" onClick={toggleMenu}>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                    <div className="hamburger-line"></div>
                </div>
            </div>

            {/* Мобильное меню */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <div className="mobile-menu-content">
                    <a href="/" className="nav-link" onClick={() => navigate('/')}>Главная</a>
                    <a href="#" className="nav-link">Тарифы</a>
                    <a href="#" className="nav-link">FAQ</a>
                    {isAuthenticated ? (
                        <div className='header-login-container'>
                            <div className='user-info'>
                                <label>Алексей А.</label>
                                <button className="exit-button" onClick={handleLogout}>Выйти</button>
                            </div>
                            <img src={profile_picture} alt="profile picture" className="profile-image"/>
                        </div>
                    ) : (
                        <>
                            <a href="#" className="auth-link">Зарегистрироваться</a>
                            <span className="separator-line"></span>
                            <button className="auth-button" onClick={() => navigate('/authorization')}>Войти</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;