import React from "react";
import '../index.css';

function ImagePreviewPopup({ isOpen, card, onClose }) {

    function handleMouseDown(event) {
        if (event.target.classList.contains('popup_type_view-photo')) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_view-photo ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__content">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePreviewPopup;