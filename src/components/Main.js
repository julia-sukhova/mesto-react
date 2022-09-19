import React from "react";
import Card from './Card.js';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onDeleteCardClick, onCardClick, onCardLikeClick }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} className="profile__avatar" alt="Аватар профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__info-item">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить"></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        userId={currentUser._id}
                        card={card}
                        onDeleteCardClick={onDeleteCardClick}
                        onCardClick={onCardClick}
                        onCardLikeClick={onCardLikeClick}>
                    </Card>
                ))}
            </section>
        </main>
    )
}

export default Main;