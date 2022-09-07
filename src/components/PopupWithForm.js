import React from "react";
import '../index.css';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <h2 className={`popup__title ${props.titleExtClass}`}>{props.title}</h2>
                <form className="form" name={`form-${props.name}`} action="#" method="post" noValidate>
                    <label className="form__label">
                        {props.children}
                    </label>
                    <button className="form__submit-button" type="submit" value="save">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;