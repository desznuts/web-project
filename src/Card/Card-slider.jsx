import React, { useRef } from 'react';
import Card from './Card';
import './Card-Slider.css';

function CardSlider({cards, onCardClick}) {
    const sliderRef = useRef(null);

    const scroll = (direction) => {
        const slider = sliderRef.current;
        const cardWidth = slider.querySelector('.card').offsetWidth;
        const visibleCards = 2.5; // Number of fully visible cards
        const scrollAmount = direction === 'left' ? -cardWidth * visibleCards : cardWidth * visibleCards;
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="card-slider-container">
            <button className="scroll-button left" onClick={() => scroll('left')}>
                &#8249;
            </button>
            <div className="card-slider" ref={sliderRef}>
                {cards.map(card => (
                    <Card key={card.id} title={card.title} content={card.content} imgUrl={card.imgUrl} date={card.date} onClick={()=>onCardClick(card)}/>
                ))}
            </div>
            <button className="scroll-button right" onClick={() => scroll('right')}>
                &#8250;
            </button>
        </div>
    );
}

export default CardSlider;
