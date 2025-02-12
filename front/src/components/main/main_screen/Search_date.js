import React from "react";
import image from '../../../images/search_date.png'
import '../../../styles/Search_date.css'
import { useNavigate } from "react-router-dom";

const SearchDate = ({onShowSearch}) => {
    const navigate = useNavigate();
    return (
        <div className="search_date-container">
            <div className="information">
                <h1>
                    сервис по поиску
                    <br/>
                    публикаций
                    <br/>
                    о компании
                    <br/>
                    по его ИНН
                </h1>
                <p>
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </p>
                <button className="search-button" onClick={() => navigate('/search')}>Запросить данные</button>
            </div>
            <div className="image-section">
                <img src={image} alt="img" className="search-image" />
            </div>
        </div>
    )
}

export default SearchDate;