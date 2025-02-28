import React, {useContext} from "react";
import "../../../../styles/Beginner.css";
import beginnerImage from "../../../../images/our_rates/beginner.png";
import {AuthContext} from "../../../context/AuthContext.js";

const Beginner = () => {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <div className={`tariff beginner ${!isAuthenticated ? "no-border" : ""}`}>
            <div className="tariff-header">
                <div className="header-info">
                    <h2>Beginner</h2>
                    <p>Для небольшого исследования</p>
                </div>
                <img src={beginnerImage} alt="Beginner" className="tariff-image"/>
            </div>
            <div className="tariff-info">
                <div className="price-info">
                    <h3 className="price">799₽</h3>
                    <h4 className="old-price">1200₽</h4>
                </div>
                <p className="installment">или 150 ₽/мес. при рассрочке на 24 мес.</p>
                <div className="tariff-include">
                    <p>В тариф входит</p>
                    <ul className="tariff-features">
                        <li>Безлимитная история запросов</li>
                        <li>Безопасная сделка</li>
                        <li>Поддержка 24/7</li>
                    </ul>
                </div>
                {isAuthenticated ? (
                    <button className="in_personal_account">Перейти в личный кабинет</button>
                    )
                    :
                    (<button className="more-details">Подробнее</button>)
                }
            </div>
        </div>
    );
};

export default Beginner;