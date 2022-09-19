import React from "react";

function Popup({ name, isOpen, onClose, title, titleExtClass, children, popupContentClass }) {
    function handleMouseDown(event) {
        if (event.target.classList.contains(`popup_type_${name}`)) {
            onClose();
        }
    }
    if (!popupContentClass) {
        popupContentClass = "popup__container";
    }
    let titleElement;
    if (title !== "") {
        titleElement = React.createElement('h2', { "className": `popup__title ${titleExtClass}` }, title);
    }
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className={`${popupContentClass}`}>
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                {titleElement}
                {children}
            </div>
        </div>
    );
}

export default Popup;