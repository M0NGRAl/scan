import React from "react";
import image from '../../../images/search_date.png'
import '../../../styles/Search_date.css'

const SearchDate = ({onShowSearch}) => {
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
                <button className="search-button" onClick={onShowSearch}>Запросить данные</button>
            </div>
            <div className="image-section">
                <img src={image} alt="img" className="search-image" />
            </div>
        </div>
    )
}

export default SearchDate;