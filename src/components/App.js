import React from "react";
import '../index.css';
import loader from '../images/loader.gif';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup'
import ImagePreviewPopup from "./ImagePreviewPopup";
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({ avatar: loader });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()])
      .then(([profileInfo, initialCards]) => {
        setCurrentUser(profileInfo);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка загрузки начальных данных: ${err}`);
      });
  }, []);

  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isDeleteConfirmPopupOpened, setIsDeleteConfirmPopupOpened] = useState(false);
  const [isPreviewCardPopupOpened, setPreviewCardPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
    setPreviewCardPopupOpened(true);
  };

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteConfirmPopupOpened(true);
  }

  function handleDeleteCardConfirm() {
    return api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
      })
      .catch(err => {
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    let p;
    if (isLiked) {
      p = api.dislikeCard(card._id);
    } else {
      p = api.likeCard(card._id);
    }
    p
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(`Ошибка лайка карточки: ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  };

  function handleUpdateUser(newUserInfo) {
    return api.updateUserInfo(JSON.stringify(newUserInfo))
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(`Ошибка обновления информации о пользователе: ${err}`);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    return api.updateAvatar(JSON.stringify(newAvatar))
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(`Ошибка обновления аватара: ${err}`);
      });
  }

  function handleAddCard(newCard) {
    return api.addNewCard(JSON.stringify(newCard))
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch(err => {
        console.log(`Ошибка добавления карточки: ${err}`);
      });
  }

  function closeAllPopups() {
    setSelectedCard({});
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setPreviewCardPopupOpened(false);
    setIsDeleteConfirmPopupOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="root">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteCardClick={handleDeleteCardClick}
            onCardLikeClick={handleCardLikeClick}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpened}
            onUpdateUser={handleUpdateUser}>
          </EditProfilePopup>

          <EditAvatarPopup
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpened}
            onUpdateAvatar={handleUpdateAvatar}>
          </EditAvatarPopup>

          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpened}
            onAddCard={handleAddCard}>
          </AddPlacePopup>

          <ImagePreviewPopup
            onClose={closeAllPopups}
            isOpen={isPreviewCardPopupOpened}
            card={selectedCard}>
          </ImagePreviewPopup>

          <ConfirmDeletePopup
            onClose={closeAllPopups}
            onConfirmed={handleDeleteCardConfirm}
            isOpen={isDeleteConfirmPopupOpened}>
          </ConfirmDeletePopup>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
