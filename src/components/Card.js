import React from "react";
import '../index.css';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleDeleteClick() {
        props.onDeleteCardClick(props.card);
    }
    const canDelete = props.userId === props.card.owner._id;
    return (
        <article className="element">
            <button className={`element__button-delete ${canDelete ? '' : 'element__button-delete_inactive'}`} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
            <img onClick={handleClick} src={props.card.link} className="element__image" alt={props.card.name} />
            <div className="element__container">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__wrap">
                    <button className="element__button" type="button" aria-label="Лайк"></button>
                    <div className="element__like">{props.card.likes.length}</div>
                </div>
            </div>
        </article>
    );
}

export default Card;