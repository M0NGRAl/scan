import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Authorization_image from '../../images/authorization/authorization.png';
import '../../styles/Authorization.css';
import Lock_image from "../../images/authorization/lock.png";
import Google_image from "../../images/authorization/google.png";
import Facebook_image from "../../images/authorization/facebook.png";
import Yandex_image from "../../images/authorization/yandex.png";
import {AuthContext} from "../context/AuthContext.js";

const Authorization = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authorizationData, setAuthorizationData] = useState(true);
    const navigate = useNavigate();
    const {login: authLogin} = useContext(AuthContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const phoneRegex = /^[\+]?[0-9]{10,15}$/; // Номер телефона
    const loginRegex = /^[a-zA-Z0-9_]{3,20}$/; // Логин

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize(); // Вызываем сразу при загрузке
        window.addEventListener('resize', handleResize); // Следим за изменением размера окна

        return () => {
            window.removeEventListener('resize', handleResize); // Очищаем слушатель
        };
    }, []);
    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);

        if (!value) {
            setLoginError(true);
        } else if (!phoneRegex.test(value) && !loginRegex.test(value)) {
            setLoginError(true);
        } else {
            setLoginError(false);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const isFormValid = login && password && !loginError && !passwordError;

    const handleSubmit = () => {
        if (isFormValid) {
            setIsLoading(true);

            fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Ошибка HTTP: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data && data.accessToken && data.expire) {
                        setAuthorizationData(true);
                        authLogin(data.accessToken, data.expire)
                        navigate("/");
                    } else {
                        throw new Error('Неверные данные в ответе');
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при авторизации:', error);
                    setAuthorizationData(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setPasswordError(true);
            setLoginError(true);
        }
    };

    return (
        <div className="authorization">
            <div className="content">
                <div className="content-container">
                    <div className="text-content">
                        <h1>
                            Для оформления подписки
                            <br />
                            на тариф, необходимо
                            <br />
                            авторизоваться.
                        </h1>
                    </div>
                    {windowWidth > 880 && (
                        <div className="image-section">
                            <img src={Authorization_image} alt="img" className="authorization_image" />
                        </div>
                    )}
                </div>
                <div className="image-lock">
                    <img src={Lock_image} alt="img" className="lock-image" />
                </div>
            </div>
            <div className="login-container">
                <div className='button-group'>
                    <button className="login-button">Войти</button>
                    <button className='register-button'>Зарегистрироваться</button>
                </div>
                <div className="placeholder">
                    <p>Логин или номер телефона:</p>
                    <input
                        type="text"
                        value={login}
                        onChange={handleLoginChange}
                        autoComplete="on"
                        className={[
                            loginError ? "error-input" : "",
                            !authorizationData ? "error-input" : ""
                        ].join(" ").trim()}
                    />
                    {loginError && <p style={{color: 'red', fontSize: '16  px'}}>Введите корректные данные</p>}
                    <p>Пароль:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="on"
                        className={[
                            passwordError ? "error-input" : "",
                            !authorizationData ? "error-input" : ""
                        ].join(" ").trim()}

                    />
                    {passwordError && <p style={{color: 'red', fontSize: '16px'}}>Неправильный пароль</p>}
                    {!authorizationData && <p style={{color: 'red', fontSize: '16px'}}>Неверный логин или пароль</p>}
                    <button onClick={handleSubmit} disabled={!isFormValid || isLoading}>
                        {isLoading ? 'Загрузка...' : 'Войти'}
                    </button>
                    <div className="links">
                        <a href="#">Восстановить пароль</a>
                    </div>
                </div>

                <div className="social-login">
                    <p>Войти через:</p>
                    <div className="social-buttons">
                        <button>
                            <img src={Google_image} alt="Google" className="social-icon" />
                        </button>
                        <button>
                            <img src={Facebook_image} alt="Facebook" className="social-icon" />
                        </button>
                        <button>
                            <img src={Yandex_image} alt="Yandex" className="social-icon" />
                        </button>
                    </div>
                </div>
            </div>
            {windowWidth < 880 && (
                <div className="image-section">
                    <img src={Authorization_image} alt="img" className="authorization_image" />
                </div>
            )}
        </div>
    );
};

export default Authorization;