import React from "react";
import '../../styles/Search_result.css'
import Search_result_image from '../../images/search_result.png'

const Search_result = () => {
    return (
        <div className="search-result">
            <div className="search-result-header">
                <div className="text-content">
                    <h1>
                        Ищем. Скоро
                        <br/>
                        Будут результаты
                    </h1>
                    <p>
                        Поиск может занять некоторое время,
                        <br/>
                        просим сохранять терпения
                    </p>
                </div>
                <div className="image-section">
                    <img src={Search_result_image} alt="img" className="search-result-image"/>
                </div>
            </div>
            <div className='general-summary'>
                <h2>
                    Общая сводка
                </h2>
                <div className='summary-carousel'></div>
            </div>
            <div className="list-of-documents">
                <h2>
                    Список документов
                </h2>
            </div>
        </div>
    )
}

export default Search_result