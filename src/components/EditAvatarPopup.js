import React from "react";
import '../index.css';
import { useState } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const [buttonText, setButtonText] = useState("Сохранить");
    const avatarInputRef = React.useRef();

    function handleClose() {
        onClose();
        avatarInputRef.current.value = "";
    }

    function handleSubmit(event) {
        event.preventDefault();
        setButtonText("Сохранение...");
        onUpdateAvatar({
            avatar: avatarInputRef.current.value || "",
        }).finally(() => {
            handleClose();
            setButtonText("Сохранить")
        });
    }

    function handleMouseDown(event) {
        if (event.target.classList.contains('popup_type_profile-photo')) {
            handleClose();
        }
    }

    return (
        <div className={`popup popup_type_profile-photo ${isOpen ? 'popup_opened' : ''}`} onMouseDown={handleMouseDown}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={handleClose}></button>
                <h2 className="popup__title popup__title_element">Обновить аватар</h2>
                <form className="form" name="form-profile-photo" action="#" method="post" noValidate onSubmit={handleSubmit}>
                    <label className="form__label">
                        <input
                            id="url-input-avatar"
                            className="form__item form__item_text_name"
                            placeholder="Ссылка на картинку"
                            type="url"
                            ref={avatarInputRef}
                            name="avatar" required autoFocus />
                        <span className="url-input-avatar-error form__item-error"></span>
                    </label>
                    <button className="form__submit-button" type="submit" value="save">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default EditAvatarPopup;