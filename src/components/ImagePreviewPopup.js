import React from "react";
import Popup from './Popup';

function ImagePreviewPopup({ isOpen, card, onClose }) {
    return (
        <Popup
            name="view-photo"
            isOpen={isOpen}
            onClose={onClose}
            title=""
            titleExtClass="popup__title_inactive"
            popupContentClass="popup__content"
        >
            <img className="popup__image" src={card.link} alt={card.name} />
            <p className="popup__caption">{card.name}</p>
        </Popup>
    )
}

export default ImagePreviewPopup;