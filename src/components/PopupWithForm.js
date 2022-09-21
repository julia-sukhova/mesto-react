import React from "react";
import { useRef, useEffect } from "react";
import Popup from './Popup';

function PopupWithForm({ name, isOpen, onClose, onSubmit, title, titleExtClass, children, buttonText }) {
    const formRef = useRef();
    useEffect(() => {
        formRef.current.reset();
    }, [isOpen])

    return (
        <Popup
            name={name}
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            titleExtClass={titleExtClass}
        >
            <form ref={formRef} className="form" name={`form-${name}`} action="#" method="post" noValidate onSubmit={onSubmit}>
                <label className="form__label">
                    {children}
                </label>
                <button className="form__submit-button" type="submit" value="save">{buttonText}</button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;