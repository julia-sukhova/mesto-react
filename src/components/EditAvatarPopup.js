import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
    const avatarInputRef = React.useRef();

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarInputRef.current.value || "",
        });
    }

    return (
        <PopupWithForm
            name="profile-photo"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Обновить аватар"
            titleExtClass="popup__title_element"
            buttonText={buttonText}>
            <input
                id="url-input-avatar"
                className="form__item form__item_text_name"
                placeholder="Ссылка на картинку"
                type="url"
                ref={avatarInputRef}
                name="avatar" required autoFocus />
            <span className="url-input-avatar-error form__item-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;