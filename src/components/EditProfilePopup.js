import React from "react";
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    const currentUser = React.useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(event) {
        setName(event.target.value || "");
    }

    function handleAboutChange(event) {
        setAbout(event.target.value || "");
    }

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name: name,
            about: about,
        })
    }

    return (
        <PopupWithForm
            name="user"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            buttonText={buttonText}>
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
        </PopupWithForm>
    );
}

export default EditProfilePopup;