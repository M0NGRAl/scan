import React, { useState } from "react";
import Authorization_image from '../../images/authorization/authorization.png';
import '../../styles/Authorization.css';
import Lock_image from "../../images/authorization/lock.png";
import Google_image from "../../images/authorization/google.png";
import Facebook_image from "../../images/authorization/facebook.png";
import Yandex_image from "../../images/authorization/yandex.png";

const Authorization = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const phoneRegex = /^[\+]?[0-9]{10,15}$/; // Номер телефона
    const loginRegex = /^[a-zA-Z0-9_]{3,20}$/; // Логин

    const handleLoginChange = (e) => {
        const value = e.target.value;
        setLogin(value);

        if (!value) {
            setLoginError(true); // Если поле пустое
        } else if (!phoneRegex.test(value) && !loginRegex.test(value)) {
            setLoginError(true); // Если не соответствует формату
        } else {
            setLoginError(false); // Если все ок
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError(true); // Если поле пустое
        } else {
            setPasswordError(false); // Если все ок
        }
    };

    const isFormValid = login && password && !loginError && !passwordError;

    const handleSubmit = () => {
        if (isFormValid) {
            console.log("Логин:", login);
            console.log("Пароль:", password);
            // Здесь можно добавить логику отправки данных на сервер
        } else {
            alert("Пожалуйста, исправьте ошибки в форме.");
        }
    };

    return (
        <div className="authorization">
            <div className="content">
                <div className="content-container">
                    <div className="text-content">
                        <h2>
                            Для оформления подписки
                            <br />
                            на тариф, необходимо
                            <br />
                            авторизоваться.
                        </h2>
                    </div>
                    <div className="image-section">
                        <img src={Authorization_image} alt="img" className="authorization_image" />
                    </div>
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
                    />
                    {loginError && <p style={{ color: 'red', fontSize: '14px' }}>Введите корректные данные</p>}
                    <p>Пароль:</p>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="on"
                    />
                    {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>Неверный пароль</p>}
                    <button onClick={handleSubmit} disabled={!isFormValid}>Войти</button>
                </div>
                <div className="links">
                    <a href="#">Восстановить пароль</a>
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
        </div>
    );
};

export default Authorization;