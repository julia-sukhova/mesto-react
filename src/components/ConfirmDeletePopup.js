import React from "react";
import { useState } from 'react';
import '../index.css';

function ConfirmDeletePopup({ isOpen, onClose, onConfirmed }) {
    const [buttonText, setButtonText] = useState("Да");
    function handleConfirmed() {
        setButtonText("Удаление...");
        onConfirmed().finally(() => {
            onClose();
            setButtonText("Да")
        });
    }
    function handleMouseDown(event) {
        if (event.target.classList.contains('popup_type_delete-card-confirm')) {
            onClose();
        }
    }
    return (
        <div className={`popup popup_type_delete-card-confirm ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className="popup__title popup__title_element popup__title_indent">Вы уверены?</h2>
                <button className="popup__button" type="button" value="save" onClick={handleConfirmed}>{buttonText}</button>
            </div>
        </div >
    )
}

export default ConfirmDeletePopup;