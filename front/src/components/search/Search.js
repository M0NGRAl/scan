import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Search.css";
import list_image from '../../images/search/list.png';
import folders_image from '../../images/search/folders.png';
import { validateInn } from './validateInn.js';

const Search = () => {
    const [inn, setInn] = React.useState('');
    const [isValid, setIsValid] = React.useState(true);

    // Обработчик изменения значения в поле ИНН
    const handleInnChange = (e) => {
        const value = e.target.value;
        setInn(value);
        setIsValid(validateInn(value));
    };

    return (
        <div className="search">
            <div className='search-header'>
                <div className="text-content">
                    <h2>найдите необходимую информацию в пару кликов</h2>
                    <p>Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</p>
                </div>
                <div className='images-section'>
                    <img src={list_image} alt="img" className="search-image" />
                    <img src={folders_image} alt="img" className="search-image" />
                </div>
            </div>
            <div className="search-content">
                <div className="field-input">
                    <div className="inputs">
                        <div className="inn-input">
                            <label htmlFor="inn">ИНН компании*</label>
                            <input
                                type="text"
                                id="inn"
                                name="inn"
                                value={inn}
                                onChange={handleInnChange}
                                required
                            />
                            {!isValid && <p className="inn-error">Неверный ИНН</p>}
                        </div>

                        <div className="tonality-input">
                            <label htmlFor="tonality">Тональность</label>
                            <select id="tonality" name="tonality">
                                <option value="any">Любая</option>
                                <option value='negative'>Негативная</option>
                                <option value='positive'>Позитивная</option>
                                <option value='neutral'>Нейтральная</option>
                            </select>
                        </div>

                        <div className="quantity-input">
                            <label htmlFor="docCount" className="input-label">Количество документов в выдаче*</label>
                            <input
                                type="number"
                                id="docCount"
                                name="docCount"
                                min="1"
                                max="1000"
                                required
                            />
                        </div>

                        <div className="dates-input">
                            <label htmlFor="startDate" className="input-label">Диапазон поиска*</label>
                            <div className="date-range">
                                <input type="date" id="startDate" name="startDate" required/>
                                <input type="date" id="endDate" name="endDate" required/><br/><br/>
                            </div>
                        </div>
                    </div>
                    <div className="selection-fields">
                        <label>
                            <input type="checkbox" name="maxFullness"/> Признак максимальной полноты
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" name="inBusinessNews"/> Упоминания в бизнес-контексте
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" name="onlyMainRole" /> Главная роль в публикации
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" name="onlyWithRiskFactors"/> Публикации только с риск-факторами
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" name="includeTechNews"/> Включать технические новости рынков
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" name="includeAnnouncements"/> Включать анонсы и календари
                        </label>
                        <br/>
                        <label>
                            <input type="checkbox" name="includeDigests"/> Включать сводки новостей
                        </label>
                    </div>
                </div>
                <div className="image-section"></div>
            </div>
        </div>
    );
};

export default Search;