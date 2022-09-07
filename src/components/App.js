import React from "react";
import '../index.css';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";


function App() {
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = React.useState(false);
  const [isDeleteConfirmPopupOpened, setIsDeleteConfirmPopupOpened] = React.useState(false);


  const [isPreviewCardPopupOpened, setPreviewCardPopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
    setPreviewCardPopupOpened(true);
  };

  function handleDeleteCardConfirm() {
    closeAllPopups();
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteConfirmPopupOpened(true);
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

  function closeAllPopups() {
    setSelectedCard({});
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setPreviewCardPopupOpened(false);
    setIsDeleteConfirmPopupOpened(false);
  }

  return (
    <>
      <div className="body">
        <div className="root">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onDeleteCardClick={handleDeleteCardClick}
          />
          <Footer />

          <PopupWithForm
            onClose={closeAllPopups}
            isOpen={isEditProfilePopupOpened}
            buttonText="Сохранить"
            name="user"
            title="Редактировать профиль"
          >
            <fieldset className="form__user-data">
              <label className="form__label">
                <input
                  id="name-input"
                  className="form__item form__item_text_name"
                  minLength="2"
                  maxLength="40"
                  type="text"
                  placeholder="Жак-Ив-Кусто"
                  name="name" required autoFocus />
                <span className="name-input-error form__item-error"></span>
              </label>
              <label className="form__label">
                <input
                  id="subtitle-input"
                  className="form__item form__item_text_subtitle"
                  minLength="2"
                  maxLength="200"
                  type="text"
                  placeholder="Исследователь  океана"
                  name="about" required />
                <span className="subtitle-input-error form__item-error"></span>
              </label>
            </fieldset>
          </PopupWithForm>

          <PopupWithForm
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpened}
            buttonText="Сохранить"
            title="Обновить аватар"
            name="profile-photo"
            titleExtClass="popup__title_element">
            <label className="form__label">
              <input
                id="url-input-avatar"
                className="form__item form__item_text_name"
                placeholder="Ссылка на картинку"
                type="url"
                name="avatar" required autoFocus />
              <span className="url-input-avatar-error form__item-error"></span>
            </label>
          </PopupWithForm>

          <PopupWithForm
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpened}
            buttonText="Создать"
            title="Новое место"
            name="photo-card"
            titleExtClass="popup__title_item">
            <fieldset className="form__item-data">
              <label className="form__label">
                <input
                  id="name-input-card"
                  className="form__item form__item_text_name"
                  minLength="2"
                  maxLength="30"
                  type="text"
                  placeholder="Название"
                  name="name" required />
                <span className="name-input-card-error form__item-error"></span>
              </label>
              <label className="form__label">
                <input
                  id="url-input"
                  className="form__item form__item_text_link"
                  type="url"
                  placeholder="Ссылка на картинку"
                  name="link" required />
                <span className="url-input-error form__item-error"></span>
              </label>
            </fieldset>
          </PopupWithForm>

          <ImagePopup
            name="view-photo"
            onClose={closeAllPopups}
            isOpen={isPreviewCardPopupOpened}
            card={selectedCard}>
          </ImagePopup>

          <ConfirmDeletePopup
            name="delete-card-confirm"
            onClose={closeAllPopups}
            onConfirmed={handleDeleteCardConfirm}
            isOpen={isDeleteConfirmPopupOpened}>
          </ConfirmDeletePopup>
        </div>
      </div>
    </>
  );
}



export default App;
