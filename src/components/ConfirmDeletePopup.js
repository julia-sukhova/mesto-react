import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onConfirmed, buttonText }) {

    function handleConfirmed(event) {
        event.preventDefault();
        onConfirmed();
    }

    return (
        <PopupWithForm
            name="delete-card-confirm"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleConfirmed}
            title="Вы уверены?"
            titleExtClass="popup__title_element popup__title_indent"
            buttonText={buttonText}
        >
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;