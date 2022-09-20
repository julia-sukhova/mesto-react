import React from "react";
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
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({ avatar: loader });
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isDeleteConfirmPopupOpened, setIsDeleteConfirmPopupOpened] = useState(false);
  const [isPreviewCardPopupOpened, setPreviewCardPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [editProfilePopupButtonText, setEditProfilePopupButtonText] = useState("Сохранить");
  const [editAvatarPopupButtonText, setEditAvatarPopupButtonText] = useState("Сохранить");
  const [addPlacePopupButtonText, setAddPlacePopupButtonText] = useState("Создать");
  const [confirmDeleteButtonPopupText, setConfirmDeleteButtonPopupText] = useState("Да");

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

  function handleCardClick(card) {
    setSelectedCard(card);
    setPreviewCardPopupOpened(true);
  };

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteConfirmPopupOpened(true);
  }

  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const action = isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id);
    action
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
    const origButtonText = editProfilePopupButtonText;
    setEditProfilePopupButtonText("Сохранение...");
    api.updateUserInfo(JSON.stringify(newUserInfo))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обновления информации о пользователе: ${err}`);
      }).finally(() => {
        setEditProfilePopupButtonText(origButtonText);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    const origButtonText = editAvatarPopupButtonText;
    setEditAvatarPopupButtonText("Сохранение...");
    api.updateAvatar(JSON.stringify(newAvatar))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка обновления аватара: ${err}`);
      }).finally(() => {
        setEditAvatarPopupButtonText(origButtonText);
      });
  }

  function handleAddCard(newCard) {
    const origButtonText = addPlacePopupButtonText;
    setAddPlacePopupButtonText("Создание...");
    api.addNewCard(JSON.stringify(newCard))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка добавления карточки: ${err}`);
      }).finally(() => {
        setAddPlacePopupButtonText(origButtonText);
      });
  }

  function handleDeleteCardConfirm() {
    const origButtonText = confirmDeleteButtonPopupText;
    setConfirmDeleteButtonPopupText("Удаление...");
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(`Ошибка удаления карточки: ${err}`);
      }).finally(() => {
        setConfirmDeleteButtonPopupText(origButtonText);
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
            onUpdateUser={handleUpdateUser}
            buttonText={editProfilePopupButtonText}
          />

          <EditAvatarPopup
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpened}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={editAvatarPopupButtonText}
          />

          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpened}
            onAddCard={handleAddCard}
            buttonText={addPlacePopupButtonText}
          />

          <ImagePreviewPopup
            onClose={closeAllPopups}
            isOpen={isPreviewCardPopupOpened}
            card={selectedCard}
          />

          <ConfirmDeletePopup
            onClose={closeAllPopups}
            onConfirmed={handleDeleteCardConfirm}
            isOpen={isDeleteConfirmPopupOpened}
            buttonText={confirmDeleteButtonPopupText}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
