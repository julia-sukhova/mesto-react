import React from "react";
import '../index.css';

function ImagePopup({ name, isOpen, card, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;