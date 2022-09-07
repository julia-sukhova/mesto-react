import '../index.css';
import React from "react";
import { api } from '../utils/Api.js';
import Card from './Card.js';
import { useEffect, useState } from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onDeleteCardClick, onCardClick }) {
    const [userAvatar, setUserAvatar] = useState(require('../images/loader.gif'));
    const [userName, setUserName] = useState('Загрузка...');
    const [userTitle, setUserTitle] = useState('');
    const [userId, setUserId] = useState(0);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()])
            .then(([profileInfo, initialCards]) => {
                setUserName(profileInfo.name);
                setUserTitle(profileInfo.about);
                setUserAvatar(profileInfo.avatar);
                setUserId(profileInfo._id);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(`Ошибка загрузки начальных данных: ${err}`);
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__container" onClick={onEditAvatar}>
                    <img src={userAvatar} className="profile__avatar" alt="Аватар профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__info-item">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" onClick={onEditProfile} type="button" aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__subtitle">{userTitle}</p>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button" aria-label="Добавить"></button>
            </section>

            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        userId={userId}
                        card={card}
                        onDeleteCardClick={onDeleteCardClick}
                        onCardClick={onCardClick}>
                    </Card>
                ))}
            </section>
        </main>
    )
}

export default Main;