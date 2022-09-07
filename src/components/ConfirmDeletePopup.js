import React from "react";
import '../index.css';

function ConfirmDeletePopup(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
            <div className="popup__container">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
                <h2 className="popup__title popup__title_element popup__title_indent">Вы уверены?</h2>
                <button className="popup__button" type="button" value="save" onClick={props.onConfirmed}>Да</button>
            </div>
        </div >
    )
}

export default ConfirmDeletePopup;