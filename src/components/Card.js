import React from "react";
import '../index.css';

function Card({ card, onCardClick, onDeleteCardClick, userId }) {
    function handleClick() {
        onCardClick(card);
    }
    function handleDeleteClick() {
        onDeleteCardClick(card);
    }
    const canDelete = userId === card.owner._id;
    return (
        <article className="element">
            <button className={`element__button-delete ${canDelete ? '' : 'element__button-delete_inactive'}`}
                type="button"
                aria-label="Удалить"
                onClick={handleDeleteClick}>
            </button>
            <img onClick={handleClick} src={card.link} className="element__image" alt={card.name} />
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__wrap">
                    <button className="element__button" type="button" aria-label="Лайк"></button>
                    <div className="element__like">{card.likes.length}</div>
                </div>
            </div>
        </article>
    );
}

export default Card;