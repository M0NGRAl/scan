import React from "react";
import "../../../../styles/Pro.css";
import proImage from "../../../../images/our_rates/pro.png";

const Pro = () => {
    return (
        <div className="tariff pro">
            <div className="tariff-header">
                <div className="header-info">
                    <h2>Pro</h2>
                    <p>Для HR и фрилансеров</p>
                </div>
                <img src={proImage} alt="Pro" className="tariff-image"/>
            </div>
            <div className="tariff-info">
                <div className="price-info">
                    <h3 className="price">1299₽</h3>
                    <h4 className="old-price">2600₽</h4>
                </div>
                <p className="installment">или 279 ₽/мес. при рассрочке на 24 мес.</p>
                <div className="tariff-include">
                    <p>В тариф входит</p>
                    <ul className="tariff-features">
                        <li>Все пункты тарифа Beginner</li>
                        <li>Экспорт истории</li>
                        <li>Рекомендации по приоритетам</li>
                    </ul>
                </div>
                <button className="in_personal_account">Подробнее</button>
            </div>
        </div>
    );
};

export default Pro;