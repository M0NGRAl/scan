import React, { useRef, useEffect, useState } from "react";
import '../../styles/Search_result.css';
import Search_result_image from '../../images/search_result/search_result.png';
import { useHistograms } from "../context/HistogramsContext.js";
import leftArrowImage from '../../images/search_result/left_arrow.png';
import rightArrowImage from '../../images/search_result/right_arrow.png';

const Search_result = () => {
    const { histograms, isLoadingHistograms, documentsData, isLoadingDocuments } = useHistograms();
    const [publications, setPublications] = useState([]);
    const [isLoadingPublications, setIsLoadingPublications] = useState(false);
    const scrollContainerRef = useRef(null);
    const [quantityPublications, setQuantityPublications] = useState(6);

    // Загрузка данных о публикациях
    useEffect(() => {
        if (documentsData?.items?.length > 0) {
            const ids = documentsData.items.map(doc => doc.encodedId);

            const fetchData = async () => {
                setIsLoadingPublications(true);
                const data = await fetchDocumentsDetails(ids, publications.length);
                if (data) {
                    setPublications(data);
                }
                setIsLoadingPublications(false);
            };

            fetchData();
        }
    }, [documentsData, quantityPublications]);

    const fetchDocumentsDetails = async (ids, startIndex) => {
        const idsToFetch = ids.slice(startIndex, startIndex + 6)
        const fetchedPublications = [];
        for (const id of idsToFetch) {
            try {
                const requestBody = JSON.stringify({"ids": [id]}); // Отправляем один id
                const response = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: requestBody
                });

                const data = await response.json();
                if (data) {
                    fetchedPublications.push(data);
                }
            } catch (error) {
                console.error(`Ошибка при загрузке ID ${id}:`, error);
            }
        }
        return fetchedPublications;
    };

    // Функция для прокрутки влево
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -100,
                behavior: 'smooth'
            });
        }
    };

    // Функция для прокрутки вправо
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 100,
                behavior: 'smooth'
            });
        }
    };

    // Рендер гистограмм
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

    const renderPublications = () => {

        if (isLoadingPublications && !publications || publications.length === 0) {
            return <p>Публикации не найдены</p>;
        }

        return publications.map((pubGroup, index) => {
            const pub = pubGroup[0]?.ok || pubGroup[0];

            if (!pub) {
                return null;
            }

            return (
                <div key={index} className="publication-card">
                    <div className='card-header'>
                        <p>{new Date(pub.issueDate).toLocaleDateString()}</p>
                        <a href={pub.url} target="_blank" rel="noopener noreferrer">
                            {pub.source.name}
                        </a>
                    </div>
                    <div className="attributes">
                        {pub.attributes.isTechNews && <span className="tag tech-news">Технические новости</span>}
                        {pub.attributes.isAnnouncement && <span className="tag announcement">Анонсы и события</span>}
                        {pub.attributes.isDigest && <span className="tag digest">Сводки новостей</span>}
                    </div>
                    <div className="card-content">
                        <h3 className='title'>{extractHtmlFromXml(pub.title?.markup) || "Без названия"}</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: truncateText(extractTextFromXml(pub.content?.markup), 2000),
                            }}
                        />
                    </div>
                    <div className="card-footer">
                        <div className="read-more-button">
                            <button onClick={() => window.open(pub.url, "_blank")}>Читать в источнике</button>
                        </div>
                        <p>{pub.attributes.wordCount} слова</p>
                    </div>
                </div>
            );
        });
    };

    const truncateText = (text, maxLength = 200) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const extractTextFromXml = (xmlString) => {
        if (!xmlString) return "";

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        // Извлекаем текстовое содержимое
        return xmlDoc.documentElement.textContent || "";
    };

    const extractHtmlFromXml = (xmlString) => {
        if (!xmlString) return ""; // Если разметка отсутствует, возвращаем пустую строку

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        let textContent = xmlDoc.documentElement.textContent || "";

        textContent = textContent.replace(/<[^>]+>/g, "");

        textContent = textContent.replace(/\s+/g, " ").trim();

        return textContent;
    };

    const handleShowMore = () => {
        setQuantityPublications((prev) => prev + 6);
    };

    const isShowMoreVisible = documentsData?.items?.length > quantityPublications;

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
                <div className='documents-list-section'>
                    <div className='publications'>
                        {renderPublications()}
                    </div>
                    <div className='show-more-section'>
                        {isShowMoreVisible && (
                            <button className='show-more-button' onClick={handleShowMore}>Показать больше</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search_result;