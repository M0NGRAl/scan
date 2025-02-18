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
    const [quantityPublications, setQuantityPublications] = useState(5);

    // Загрузка данных о публикациях
    useEffect(() => {
        if (documentsData?.items?.length > 0) {
            const ids = documentsData.items.map(doc => doc.encodedId);

            const fetchData = async () => {
                setIsLoadingPublications(true);
                const data = await fetchDocumentsDetails(ids);
                if (data) {
                    setPublications(data);
                }
                setIsLoadingPublications(false);
            };

            fetchData();
        }
    }, [documentsData, quantityPublications]); // Добавлена зависимость от quantityPublications

    const fetchDocumentsDetails = async (ids) => {
        const idsToFetch = ids.slice(0, quantityPublications);
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
                    fetchedPublications.push(data); // Accumulate the fetched data
                }
            } catch (error) {
                console.error(`Ошибка при загрузке ID ${id}:`, error);
            }
        }
        return fetchedPublications; // Возвращаем новые публикации
    };

    // Функция для прокрутки влево
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        }
    };

    // Функция для прокрутки вправо
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
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

    // Рендер публикаций
    const renderPublications = () => {
        if (isLoadingPublications) {
            return <p>Загрузка публикаций...</p>;
        }

        if (!publications || publications.length === 0) {
            return <p>Публикации не найдены</p>;
        }

        return publications.map((pubGroup, index) => {
            // pubGroup — это массив с одним объектом. Достаем первый элемент
            const pub = pubGroup[0]?.ok || pubGroup[0]; // Учитываем структуру ответа

            if (!pub) {
                return null; // Пропускаем, если данные отсутствуют
            }

            return (
                <div key={index} className="publication-card">
                    <div className='card-header'>
                        <p>{new Date(pub.issueDate).toLocaleDateString()}</p>
                        <a href={pub.url} target="_blank" rel="noopener noreferrer">
                            {pub.source.name}
                        </a>
                    </div>
                    <div className="attributes"></div>
                    <div className="card-content">
                        <h3>{extractHtmlFromXml(pub.title?.markup) || "Без названия"}</h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: truncateText(extractTextFromXml(pub.content?.markup), 3000),
                            }}
                        />
                    </div>
                    <div className="card-footer">
                        <div className="read-more-button">
                            <button>Читать далее</button>
                        </div>
                        <p>{pub.attributes.wordCount}</p>
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
        if (!xmlString) return ""; // Если разметка отсутствует, возвращаем пустую строку

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        // Извлекаем текстовое содержимое
        return xmlDoc.documentElement.textContent || "";
    };

    const extractHtmlFromXml = (xmlString) => {
        if (!xmlString) return ""; // Если разметка отсутствует, возвращаем пустую строку

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");

        // Извлекаем текстовое содержимое
        let textContent = xmlDoc.documentElement.textContent || "";

        // Удаляем все HTML-теги с помощью регулярного выражения
        textContent = textContent.replace(/<[^>]+>/g, "");

        // Удаляем лишние пробелы и спецсимволы
        textContent = textContent.replace(/\s+/g, " ").trim();

        return textContent;
    };

    const handleShowMore = () => {
        console.log("Текущее количество отображаемых публикаций:", quantityPublications); // Логируем текущее значение
        setQuantityPublications((prev) => prev + 5); // Увеличиваем количество отображаемых публикаций на 5
    };

    // Проверка, нужно ли показывать кнопку "Показать больше"
    const isShowMoreVisible = documentsData?.items?.length > quantityPublications;
    console.log("Кнопка 'Показать больше' видима:", isShowMoreVisible);

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
                <div className='show-more-section'>
                    {isShowMoreVisible && (
                        <button className='show-more-button' onClick={handleShowMore}>Показать больше</button>
                    )}
                </div>
                <div className='publications'>
                    {renderPublications()}
                </div>

            </div>
        </div>
    );
};

export default Search_result;