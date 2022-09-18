import React from "react";
import { useState, useEffect } from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [buttonText, setButtonText] = useState("Сохранить");

    const currentUser = React.useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    function handleNameChange(event) {
        setName(event.target.value || "");
    }

    function handleAboutChange(event) {
        setAbout(event.target.value || "");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setButtonText("Сохранение...");
        onUpdateUser({
            name: name,
            about: about,
        }).finally(() => {
            onClose();
            setButtonText("Сохранить")
        });
    }

    function handleMouseDown(event) {
        if (event.target.classList.contains('popup_type_user')) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_user ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className={`popup__title`}>Редактировать профиль</h2>
                <form className="form" name="form-user" action="#" method="post" noValidate onSubmit={handleSubmit}>
                    <fieldset className="form__user-data">
                        <label className="form__label">
                            <input
                                id="name-input"
                                className="form__item form__item_text_name"
                                minLength="2"
                                maxLength="40"
                                type="text"
                                placeholder="Жак-Ив-Кусто"
                                value={name || ""}
                                name="name" required autoFocus
                                onChange={handleNameChange} />
                            <span className="name-input-error form__item-error"></span>
                        </label>
                        <label className="form__label">
                            <input
                                id="subtitle-input"
                                className="form__item form__item_text_subtitle"
                                minLength="2"
                                maxLength="200"
                                type="text"
                                placeholder="Исследователь  океана"
                                value={about || ""}
                                name="about" required
                                onChange={handleAboutChange} />
                            <span className="subtitle-input-error form__item-error"></span>
                        </label>
                    </fieldset>
                    <button className="form__submit-button" type="submit" value="save">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfilePopup;