import React from "react";
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onDeleteCardClick, onCardLikeClick }) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onDeleteCardClick(card);
    }

    function handleCardLike() {
        onCardLikeClick(card);
    }

    const canDelete = currentUser._id === card.owner._id;
    const isLiked = card.likes.some(user => user._id === currentUser._id);

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
                    <button onClick={handleCardLike} className={`element__button ${isLiked ? 'element__button_active' : ''}`} type="button" aria-label="Лайк"></button>
                    <div className="element__like">{card.likes.length}</div>
                </div>
            </div>
        </article>
    );
}

export default Card;