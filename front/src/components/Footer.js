import React from "react";
import logo from '../images/logo_footer.png'; // Импорт логотипа
import '../styles/Footer.css'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="logo-section">
                <img src={logo} alt="logo" className="logo-image" />
            </div>

            <div className="info-section">
                <p>
                    г. Москва, Цветной б-р, 40
                    <br />
                    +7 495 771 21 11
                    <br />
                    info@skan.ru.
                </p>
            </div>
        </div>
    );
};

export default Footer; // Экспорт компонента