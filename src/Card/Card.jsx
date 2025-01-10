import React from 'react';
import './Card.css';

function Card({ title, content, imgUrl, date, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {imgUrl && (
                <div className="image-container">
                    <img src={imgUrl} alt={title} className="card-image" />
                    <div className="text-overlay">
                        <p className="card-date">{date}</p>
                        <h2 className="card-title">{title}</h2>
                        <p className="card-content">{content}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Card;
