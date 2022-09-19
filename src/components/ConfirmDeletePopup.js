import React from "react";
import { useState } from 'react';
import Popup from './Popup';

function ConfirmDeletePopup({ isOpen, onClose, onConfirmed }) {
    const [buttonText, setButtonText] = useState("Да");

    function handleConfirmed() {
        setButtonText("Удаление...");
        onConfirmed(() => {
            setButtonText("Да");
        });
    }

    return (
        <Popup
            name="delete-card-confirm"
            isOpen={isOpen}
            onClose={onClose}
            title="Вы уверены?"
            titleExtClass="popup__title_element popup__title_indent"
        >
            <button className="popup__button" type="button" value="save" onClick={handleConfirmed}>{buttonText}</button>
        </Popup>
    )
}

export default ConfirmDeletePopup;