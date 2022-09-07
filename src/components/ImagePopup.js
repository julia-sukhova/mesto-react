import React from "react";
import '../index.css';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <p className="popup__caption">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;