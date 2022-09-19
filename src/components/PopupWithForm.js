import React from "react";
import Popup from './Popup';

function PopupWithForm({ name, isOpen, onClose, onSubmit, title, titleExtClass, children, buttonText }) {
    return (
        <Popup
            name={name}
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            titleExtClass={titleExtClass}
        >
            <form className="form" name={`form-${name}`} action="#" method="post" noValidate onSubmit={onSubmit}>
                <label className="form__label">
                    {children}
                </label>
                <button className="form__submit-button" type="submit" value="save">{buttonText}</button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;