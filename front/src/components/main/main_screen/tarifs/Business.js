import React from "react";
import "../../../../styles/Business.css";
import businessImage from "../../../../images/our_rates/business.png";

const Business = () => {
    return (
        <div className="tariff business">
            <div className="tariff-header">
                <div className="header-info">
                    <h2>Business</h2>
                    <p>Для корпоративных клиентов</p>
                </div>
                <img src={businessImage} alt="Business" className="tariff-image"/>
            </div>
            <div className="tariff-info">
                <div className="price-info">
                    <h3 className="price">2379₽</h3>
                    <h4 className="old-price">3700₽</h4>
                </div>
                <div className="tariff-include">
                    <p>В тариф входит</p>
                    <ul className="tariff-features">
                        <li>Все пункты тарифа Pro</li>
                        <li>Безлимитное количество запросов</li>
                        <li>Приоритетная поддержка</li>
                    </ul>
                </div>
                <button className='more-details'>Подробнее</button>
            </div>
        </div>
    );
};

export default Business;