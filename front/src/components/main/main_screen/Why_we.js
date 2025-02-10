import React from "react";
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

    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Обработчик для кнопки "Назад"
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return extendedItems.length - 3; // Переход к последнему блоку
            }
            return prevIndex - 1;
        });
    };

    // Обработчик для кнопки "Вперед"
    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= extendedItems.length - 3) {
                return 0; // Переход к первому блоку
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
                    <img src={left_arrow}/>
                </button>
                <div
                    className="carousel-slides"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                    }}
                >
                    {extendedItems.map((item, index) => (
                        <div key={index} className="carousel-slide">
                            <img src={item.image} alt={item.description} />
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <button className="carousel-button carousel-next" onClick={handleNext}>
                    <img src={right_arrow}/>
                </button>
            </div>
        </div>
    );
};

export default WhyWe;