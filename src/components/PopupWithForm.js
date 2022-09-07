import React from "react";
import '../index.css';

function PopupWithForm({ name, isOpen, onClose, title, titleExtClass, children, buttonText }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <h2 className={`popup__title ${titleExtClass}`}>{title}</h2>
                <form className="form" name={`form-${name}`} action="#" method="post" noValidate>
                    <label className="form__label">
                        {children}
                    </label>
                    <button className="form__submit-button" type="submit" value="save">{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;