import React, { useRef } from "react";
import '../../styles/Search_result.css';
import Search_result_image from '../../images/search_result/search_result.png';
import { useHistograms } from "../context/HistogramsContext.js";
import leftArrowImage from '../../images/search_result/left_arrow.png'
import rightArrowImage from '../../images/search_result/right_arrow.png'

const Search_result = () => {
    const { histograms, isLoadingHistograms, documentsData, isLoadingDocuments } = useHistograms();

    const scrollContainerRef = useRef(null);

    console.log(documentsData)

    // Функция для прокрутки влево
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200, // Прокрутка на 200px влево
                behavior: 'smooth'
            });
        }
    };

    // Функция для прокрутки вправо
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200, // Прокрутка на 200px вправо
                behavior: 'smooth'
            });
        }
    };

    const renderHistogramCards = () => {
        if (isLoadingHistograms) {
            return (
                <div className="loader-container">
                    <div className="circle-spinner">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="dot" style={{ "--i": i }}></div>
                        ))}
                    </div>
                </div>
            );
        }

        if (!histograms || !Array.isArray(histograms)) {
            return <p>Данные не загружены или отсутствуют</p>;
        }

        const totalDocumentsData = histograms.find(
            (h) => h.histogramType === "totalDocuments"
        )?.data;
        const riskFactorsData = histograms.find(
            (h) => h.histogramType === "riskFactors"
        )?.data;

        if (!totalDocumentsData || !riskFactorsData) {
            return <p>Данные неполные</p>;
        }

        return totalDocumentsData.map((item, index) => {
            const riskFactorItem = riskFactorsData[index];
            return (
                <div key={index} className="histogram-card">
                    <h3>{new Date(item.date).toLocaleDateString()}</h3>
                    <p>{item.value}</p>
                    <p>{riskFactorItem?.value || 0}</p>
                </div>
            );
        });
    };

    return (
        <div className="search-result">
            <div className="search-result-header">
                <div className="text-content">
                    <h1>
                        Ищем. Скоро
                        <br />
                        Будут результаты
                    </h1>
                    <p>
                        Поиск может занять некоторое время,
                        <br />
                        просим сохранять терпения
                    </p>
                </div>
                <div className="image-section">
                    <img src={Search_result_image} alt="img" className="search-result-image" />
                </div>
            </div>
            <div className="general-summary">
                <h2>Общая сводка</h2>
                <div className="histograms-container">
                    <button className="scroll-button left" onClick={scrollLeft}>
                        <img src={leftArrowImage} alt="Scroll Left" />
                    </button>
                    <div className="histograms">
                        <div className="header-histograms">
                            <p>Период</p>
                            <p>Всего</p>
                            <p>Риски</p>
                        </div>
                        <div className="content-histograms" ref={scrollContainerRef}>
                            {renderHistogramCards()}
                        </div>
                    </div>
                    <button className="scroll-button right" onClick={scrollRight}>
                        <img src={rightArrowImage} alt="Scroll Right" />
                    </button>
                </div>
            </div>
            <div className="list-of-documents">
                <h2>Список документов</h2>
            </div>
        </div>
    );
};

export default Search_result;