import React from "react";
import '../index.css'
import { useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
    const [buttonText, setButtonText] = useState("Создать");
    const nameInputRef = React.useRef();
    const linkInputRef = React.useRef();

    function handleClose() {
        onClose();
        nameInputRef.current.value = "";
        linkInputRef.current.value = "";
    }

    function handleAddPlaceSubmit(event) {
        event.preventDefault();
        setButtonText("Создание...");
        onAddCard({
            name: nameInputRef.current.value || "",
            link: linkInputRef.current.value || ""
        }).finally(() => {
            handleClose();
            setButtonText("Создать")
        });
    }

    function handleMouseDown(event) {
        if (event.target.classList.contains('popup_type_photo-card')) {
            handleClose();
        }
    }

    return (
        <div className={`popup popup_type_photo-card ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={handleClose}></button>
                <h2 className="popup__title popup__title_item">Новое место</h2>
                <form className="form" name="form-photo-card" action="#" method="post" noValidate onSubmit={handleAddPlaceSubmit}>
                    <fieldset className="form__item-data">
                        <label className="form__label">
                            <input
                                id="name-input-card"
                                className="form__item form__item_text_name"
                                minLength="2"
                                maxLength="30"
                                type="text"
                                placeholder="Название"
                                ref={nameInputRef}
                                name="name" required />
                            <span className="name-input-card-error form__item-error"></span>
                        </label>
                        <label className="form__label">
                            <input
                                id="url-input"
                                className="form__item form__item_text_link"
                                type="url"
                                placeholder="Ссылка на картинку"
                                ref={linkInputRef}
                                name="link" required />
                            <span className="url-input-error form__item-error"></span>
                        </label>
                    </fieldset>
                    <button className="form__submit-button" type="submit" value="save">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default AddPlacePopup;