import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, buttonText }) {
    const nameInputRef = React.useRef();
    const linkInputRef = React.useRef();

    function onSubmit(event) {
        event.preventDefault();
        onAddCard({
            name: nameInputRef.current.value || "",
            link: linkInputRef.current.value || ""
        });
    }

    return (
        <PopupWithForm
            name="photo-card"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title="Новое место"
            titleExtClass="popup__title_item"
            buttonText={buttonText}
        >
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
        </PopupWithForm>
    )
}

export default AddPlacePopup;