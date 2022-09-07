import '../index.css';
import React from "react";
import { api } from './Api.js';
import Card from './Card.js';

function Main(props) {
    const [userAvatar, setUserAvatar] = React.useState(require('../images/loader.gif'));
    const [userName, setUserName] = React.useState('Загрузка...');
    const [userTitle, setUserTitle] = React.useState('');
    const [userId, setUserId] = React.useState(0);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
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
                <div className="profile__container" onClick={props.onEditAvatar}>
                    <img src={userAvatar} className="profile__avatar" alt="Аватар профиля" />
                </div>
                <div className="profile__info">
                    <div className="profile__info-item">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__subtitle">{userTitle}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить"></button>
            </section>

            <section className="elements">
                {cards.map((card, i) => (
                    <Card
                        key={card._id}
                        userId={userId}
                        card={card}
                        onDeleteCardClick={props.onDeleteCardClick}
                        onCardClick={props.onCardClick}>
                    </Card>
                ))}
            </section>
        </main>
    )
}

export default Main;