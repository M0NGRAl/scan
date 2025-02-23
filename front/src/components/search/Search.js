import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Search.css";
import list_image from '../../images/search/list.png';
import folders_image from '../../images/search/folders.png';
import { validateInn } from './validateInn.js';
import main_image from '../../images/search/main_search.png';
import SearchRequest from "./SearchRequest.js";

const Search = () => {
    const {
        inn,
        isValidInn, isValidDocuments, isDateValid,
        maxFullness, inBusinessNews, onlyMainRole, onlyWithRiskFactors,
        includeTechNews, includeAnnouncements, includeDigests, tonality,
        handleInnChange, handleDocumentsChange, handleTonalityChange, handleStartDateChange, handleEndDateChange,
        handleIncludeDigestsChange, handleInBusinessNewsChange, handleIncludeAnnouncementsChange,
        handleIncludeTechNewsChange, handleOnlyMainRoleChange, handleOnlyWithRiskFactorsChange,
        handleMaxFullnessChange, isFormValid, handleSubmit
    } = SearchRequest()

    const navigate = useNavigate();

    return (
        <div className="search">
            <div className='search-header'>
                <div className="text-content">
                    <h1>найдите необходимые
                        <br/>
                        данные в пару кликов</h1>
                    <p>Задайте параметры поиска.<br />Чем больше заполните, тем точнее поиск</p>
                </div>
                <div className='images-section'>
                    <img src={list_image} alt="img" className="list_image" />
                    <img src={folders_image} alt="img" className="folders_image" />
                </div>
            </div>
            <div className="search-content">
                <div className="field-input">
                    <div className="inputs">
                        <div className="inn-input">
                            <label htmlFor="inn">ИНН компании
                                <span className={`required-star ${!isValidInn ? "red-star" : ""}`}>*</span>
                            </label>
                            <input
                                type="text"
                                id="inn"
                                name="inn"
                                value={inn}
                                onChange={handleInnChange}
                                className={!isValidInn ? "error-input" : ""}
                                required
                            />
                            {!isValidInn && <p className="error">Неверный ИНН</p>}
                        </div>

                        <div className="tonality-input">
                            <label htmlFor="tonality">Тональность</label>
                            <select
                                id="tonality"
                                name="tonality"
                                value={tonality}
                                onChange={handleTonalityChange}
                            >
                                <option value="any">Любая</option>
                                <option value="negative">Негативная</option>
                                <option value="positive">Позитивная</option>
                            </select>
                        </div>

                        <div className="quantity-input">
                            <label htmlFor="docCount" className="input-label">Количество документов в выдаче
                                <span
                                    className={`required-star ${!isValidDocuments ? "red-star" : ""}`}>*</span></label>
                            <input
                                type="number"
                                id="docCount"
                                name="docCount"
                                min="1"
                                max="1000"
                                onChange={handleDocumentsChange}
                                className={!isValidDocuments ? "error-input" : ""}
                                placeholder='От 1 до 1000'
                                required
                            />
                            {!isValidDocuments && <p className="error">Неверное количество документов</p>}
                        </div>

                        <div className="dates-input">
                            <label htmlFor="startDate" className="input-label">Диапазон поиска
                                <span className={`required-star ${!isDateValid ? "red-star" : ""}`}>*</span>
                            </label>
                            <div className="date-range">
                                <div className="date-input-group">
                                    <p>Дата начала</p>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        placeholder="Дата начала"
                                        onChange={handleStartDateChange}
                                        className={!isDateValid ? "error-input" : ""}
                                        required
                                    />
                                </div>
                                <div className="date-input-group">
                                    <p>Дата конца</p>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        placeholder="Дата конца"
                                        onChange={handleEndDateChange}
                                        className={!isDateValid ? "error-input" : ""}
                                        required
                                    />
                                </div>
                            </div>
                            {!isDateValid && <p className="error">Введите корректные данные</p>}
                        </div>
                    </div>
                    <div className="selection-fields">
                        <label>
                            <input
                                type="checkbox"
                                name="maxFullness"
                                checked={maxFullness}
                                onChange={handleMaxFullnessChange}
                            />
                            Признак максимальной полноты
                        </label>
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="inBusinessNews"
                                checked={inBusinessNews}
                                onChange={handleInBusinessNewsChange}
                            />
                            Упоминания в бизнес-контексте
                        </label>
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="onlyMainRole"
                                checked={onlyMainRole}
                                onChange={handleOnlyMainRoleChange}
                            />
                            Главная роль в публикации
                        </label>
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="onlyWithRiskFactors"
                                checked={onlyWithRiskFactors}
                                onChange={handleOnlyWithRiskFactorsChange}
                            />
                            Публикации только с риск-факторами
                        </label>
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="includeTechNews"
                                checked={includeTechNews}
                                onChange={handleIncludeTechNewsChange}
                            />
                            Включать технические новости рынков
                        </label>
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="includeAnnouncements"
                                checked={includeAnnouncements}
                                onChange={handleIncludeAnnouncementsChange}
                            />
                            Включать анонсы и календари
                        </label>
                        <br/>
                        <label>
                            <input
                                type="checkbox"
                                name="includeDigests"
                                checked={includeDigests}
                                onChange={handleIncludeDigestsChange}
                            />
                            Включать сводки новостей
                        </label>
                        <div className='button-section'>
                            <button disabled={!isFormValid()} onClick={handleSubmit}>Поиск</button>
                            <p>* Обязательные поля для заполнения</p>
                        </div>
                    </div>
                </div>
                <div className="main-image-search">
                    <img src={main_image} alt="img" className="main-image"/>
                </div>
            </div>
        </div>
    );
};

export default Search;