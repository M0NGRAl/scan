import React, { useState, useEffect } from "react";
import image_main from '../../../images/why_we.png';
import '../../../styles/Why_we.css';
import image_time from '../../../images/carousel/time.png';
import image_magnifier from '../../../images/carousel/magnifier.png';
import image_protected from '../../../images/carousel/protected.png';
import right_arrow from '../../../images/carousel/right_arrow.png';
import left_arrow from '../../../images/carousel/left_arrow.png';

const WhyWe = () => {
    const carouselItems = [
        {
            description: "Огромная комплексная база данных,\n" +
                "обеспечивающая объективный ответ на запрос",
            image: image_magnifier,
        },
        {
            description: "Высокая и оперативная скорость обработки заявки",
            image: image_time,
        },
        {
            description: "Защита конфиденциальных сведений,\n" +
                "не подлежащих разглашению по федеральному законодательству",
            image: image_protected,
        },
    ];

    // Создаем расширенный массив для бесконечной карусели
    const extendedItems = [...carouselItems.slice(-2), ...carouselItems, ...carouselItems.slice(0, 2)];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);

    useEffect(() => {
        const handleResize = () => {

            if (window.innerWidth < 786) {
                setSlidesToShow(1); // 1 слайд на маленьких экранах
            } else if (window.innerWidth < 1200) {
                setSlidesToShow(2); // 2 слайда на средних экранах
            } else {
                setSlidesToShow(3); // 3 слайда на больших экранах
            }

        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Обработчик для кнопки "Назад"
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return extendedItems.length - slidesToShow - 2;
            }
            return prevIndex - 1;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= extendedItems.length - slidesToShow - 2) {
                return 2;
            }
            return prevIndex + 1;
        });
    };

    return (
        <div className="why-we">
            <div className='text-content'>
                <h1>
                    Почему именно мы
                </h1>
            </div>
            <div className="carousel-container">
                <button className="carousel-button carousel-prev" onClick={handlePrev}>
                    <img src={left_arrow} alt="Previous" />
                </button>
                <div
                    className="carousel-slides"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
                    }}
                >
                    {extendedItems.map((item, index) => (
                        <div
                            key={index}
                            className="carousel-slide"
                            style={{
                                flex: `0 0 ${100 / slidesToShow}%`,
                            }}
                        >
                            <img className='carousel-image' src={item.image} alt={item.description} />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <button className="carousel-button carousel-next" onClick={handleNext}>
                    <img src={right_arrow} alt="Next" />
                </button>
            </div>
        </div>
    );
};

export default WhyWe