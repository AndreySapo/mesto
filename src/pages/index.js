import './index.css';

import {
  profileName,
  profileAbout,
  profileEditButton,
  profileAddButton,
  profilePopupName,
  profilePopupJob,
  cardAddPopupButtonSave,
  validationSettings,
  formName,
  formNewPost,
  avatarEditButton,
  formAvatar,
  profileAvatar,
  avatarEditPopupButtonSave,
  profilePopupButtonSave
} from '../utils/constants.js'
import Section from '../components/Section.js';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
// ==========================================================
// тестовая карточка
// Ангарск
// https://shorturl.at/lwDTZ

// ==========================================================
// Работа с API
// задаем настройки для запросов
const apiSettings = {
  link: 'https://mesto.nomoreparties.co/v1/',
  cohort: 'cohort-54',
  token: '05145e33-315e-4591-bbb6-f1880e215d8f'
}

// создаем экземпляр обращения к API
const api = new Api(apiSettings);

// создаем переменные для промисов
const getUserPromise = api.getUser();
const getInitialCardsPromise = api.getInitialCards();

// Создаём массив с промисами
const promises = [getUserPromise, getInitialCardsPromise]

// Передаём массив с промисами методу Promise.all
Promise.all(promises)
  .then((results) => {
    // первый элемент - объект с именем
    const getUserResult = results[0];
    profileName.textContent = getUserResult.name;
    profileAbout.textContent = getUserResult.about;
    profileAvatar.src = getUserResult.avatar;
    const userID = results[0]._id;

    // второй элемент - массив карточек
    const initialCards = results[1];
    cardsContainer.renderItems(initialCards, userID);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// ==========================================================
// добавление изначальных карточек

// создаем экземпляр класса попап для клика по карточке
const cardPopup = new PopupWithImage('.img-zoom');
cardPopup.setEventListeners();

// создаем экземпляр секции с карточкамии
const cardsContainer = new Section({
  renderer: (item, userID) => {
    const card = new Card(
      item,
      userID,
      '#card-template',
      // handleCardClick
      () => { cardPopup.open(item); },
      // handleCardDelete
      (cardID) => { confirmPopup.open(cardID, card) },
      // handleCardLike
      (cardMarkup, cardData) => {
        const cardDataLikes = cardData.likes;
        // если среди лайкнувших юзеров нет меня - тогда поставить лайк
        if (!cardDataLikes.includes(userID)) {
          cardDataLikes.push(userID);
          const method = 'PUT';
          api.toggleLike(method, cardData._id)
            .then(result => {
              cardMarkup.querySelector('.element__counter-like').textContent = result.likes.length;
              cardMarkup.querySelector('.element__button-like').classList.add('element__button-like_active');
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        } else { // иначе если среди лайкнувших юзеров есть я - тогда удалить меня из лайкнувших юзеров и снять лайк
          const index = cardDataLikes.indexOf(userID);
          if (index >= 0) {
            cardDataLikes.splice(index, 1);
          }

          const method = 'DELETE';
          api.toggleLike(method, cardData._id)
            .then(result => {
              cardMarkup.querySelector('.element__counter-like').textContent = result.likes.length;
              cardMarkup.querySelector('.element__button-like').classList.remove('element__button-like_active');
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        }
      });
    cardsContainer.addItem(card);
  }
}, '.elements__grid');


// ==========================================================
// Создание экземпляра класса попап с формой для редактирования профиля
const userInfo = new UserInfo('.profile__name', '.profile__job');

// попап редактирования профиля
const profileEditPopup = new PopupWithForm('.profile-popup', (inputValues) => {
  event.preventDefault();
  profileEditPopup.renderLoading(true);
  api.setUserName({
    name: inputValues.name,
    about: inputValues.job
  })
    .then((result) => {
      profileName.textContent = result.name;
      profileAbout.textContent = result.about;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(profileEditPopup.renderLoading(false));
  profileEditPopup.close();
  profilePopupButtonSave.classList.add('popup__button-save_inactive');
  profilePopupButtonSave.setAttribute('disabled', true);
});
profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  profilePopupName.value = userInfo.getUserInfo().name;
  profilePopupJob.value = userInfo.getUserInfo().job;
  profileEditPopup.open();
});

// ==========================================================
// создаем экземпляр класса для удаления карточки
const confirmPopup = new PopupWithConfirm('.confirm-popup', (cardID, card) => {
  event.preventDefault();
  confirmPopup.renderLoading(true);
  api.deleteCard(cardID)
    .then(() => {
      confirmPopup.close();
      card.remove();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(confirmPopup.renderLoading(false));
});
confirmPopup.setEventListeners();

// Создание экземпляра класса попап с формой для добавления карточки
const cardAddPopup = new PopupWithForm('.new-post-popup', (inputs) => {
  event.preventDefault();
  cardAddPopup.renderLoading(true);
  api.addNewCard({ name: inputs.place, link: inputs.picture })
    .then(result => {
      const newCard = new Card(result,
        result.owner._id,
        '#card-template',
        // handleCardClick
        () => { cardPopup.open(result) },
        // handleCardDelete
        (cardID) => { confirmPopup.open(cardID, newCard) }, 
        // handleCardLike
        // функция аналогична как и для начальных карточек, только получаем юзера из ответа API
        (cardMarkup, cardData) => {
          const cardDataLikes = cardData.likes;
          if (!cardDataLikes.includes(result.owner._id)) {
            cardDataLikes.push(result.owner._id);
            const method = 'PUT';
            api.toggleLike(method, cardData._id)
              .then(result => {
                cardMarkup.querySelector('.element__counter-like').textContent = result.likes.length;
                cardMarkup.querySelector('.element__button-like').classList.add('element__button-like_active');
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              });
          } else {

            const index = cardDataLikes.indexOf(result.owner._id);
            if (index >= 0) {
              cardDataLikes.splice(index, 1);
            }

            const method = 'DELETE';
            api.toggleLike(method, cardData._id)
              .then(result => {
                cardMarkup.querySelector('.element__counter-like').textContent = result.likes.length;
                cardMarkup.querySelector('.element__button-like').classList.remove('element__button-like_active');
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              });
          }
        }
      );
      cardsContainer.addNewCard(newCard);
      cardAddPopup.close();
      cardAddPopupButtonSave.classList.add('popup__button-save_inactive');
      cardAddPopupButtonSave.setAttribute('disabled', true);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(cardAddPopup.renderLoading(false));
});
cardAddPopup.setEventListeners();

profileAddButton.addEventListener('click', () => cardAddPopup.open());

// ==========================================================
// попап редактирования аватарки
const avatarEditPopup = new PopupWithForm('.avatar-edit-popup', (input) => {
  event.preventDefault();
  avatarEditPopup.renderLoading(true)
  api.setAvatar(input)
    .then((result) => {
      profileAvatar.src = result.avatar;
      avatarEditPopupButtonSave.classList.add('popup__button-save_inactive');
      avatarEditPopupButtonSave.setAttribute('disabled', true);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(avatarEditPopup.renderLoading(false));
});
avatarEditPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => avatarEditPopup.open());


// ==========================================================
// код для валидации
// берем форму из документа, создаем экземпляр класса для именно этой формы и включаем валидацию

const formNameValidity = new FormValidator(validationSettings, formName);
formNameValidity.enableValidation();

const formNewPostValidity = new FormValidator(validationSettings, formNewPost);
formNewPostValidity.enableValidation();

const formEditAvatarValidity = new FormValidator(validationSettings, formAvatar);
formEditAvatarValidity.enableValidation();