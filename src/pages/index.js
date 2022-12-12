import './index.css';

import {
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

function generateCard(cardData, userID) {
  return {
    data: cardData,
    userID: userID,
    template: '#card-template',
    handleCardClick: () => { cardPopup.open(cardData); },
    handleCardDelete: () => {
      confirmPopup.open()
    },
    handleCardLike: (thisCard) => {
      if (thisCard.likeState) {
        api
          .dislike(cardData._id)
          .then(result => {
            thisCard.removeLike(result.likes.length)
          });
      } else {
        console.log('клик по НЕ лайкнутой карточке')
        api
          .like(cardData._id)
          .then(result => {
            thisCard.addLike(result.likes.length)
          });
      }
    }
  }
}

function deleteCard() {
  
}

// Создание экземпляра класса попап с формой для редактирования профиля
const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar-img');

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
    userInfo.setUserInfo(getUserResult);
    userInfo.setUserAvatar(getUserResult);
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
    const card = new Card(generateCard(item, userID));
    cardsContainer.addItem(card);
  }
}, '.elements__grid');


// ==========================================================

// попап редактирования профиля
const profileEditPopup = new PopupWithForm('.profile-popup', (inputValues) => {
  event.preventDefault();
  profileEditPopup.renderLoading(true);
  api.setUserName({
    name: inputValues.name,
    about: inputValues.job
  })
    .then((result) => {
      userInfo.setUserInfo(result);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => profileEditPopup.renderLoading(false));
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
const confirmPopup = new PopupWithConfirm('.confirm-popup', deleteCard());
confirmPopup.setEventListeners();

// Создание экземпляра класса попап с формой для добавления карточки
const cardAddPopup = new PopupWithForm('.new-post-popup', (inputs) => {
  event.preventDefault();
  cardAddPopup.renderLoading(true);
  api.addNewCard({ name: inputs.place, link: inputs.picture })
    .then(result => {
      // Чтобы не дублировать код (строки 80-120), создание карточки следует вынести в отдельную функцию
      const newCard = new Card(generateCard(result, result.owner._id));
      cardsContainer.addNewCard(newCard);
      cardAddPopup.close();
      cardAddPopupButtonSave.classList.add('popup__button-save_inactive');
      cardAddPopupButtonSave.setAttribute('disabled', true);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => cardAddPopup.renderLoading(false));
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
      // DOM установку информации о пользователе следует осуществлять с помощью отдельных методов класса UserInfo:
      // setUserInfo
      // setUserAvavatar
      profileAvatar.src = result.avatar;
      avatarEditPopupButtonSave.classList.add('popup__button-save_inactive');
      avatarEditPopupButtonSave.setAttribute('disabled', true);
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => avatarEditPopup.renderLoading(false));
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