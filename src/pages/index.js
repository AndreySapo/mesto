import './index.css';

import {
  // initialCards,
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

// создаем экземпляр
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
    const userID = results[0]._id;

    // второй элемент - массив карточек
    const initialCards = results[1];
    cardsContainer.renderItems(initialCards, userID);


    // console.log(results[1]);
    // initialCards.forEach( (card) => {
    //   card.likes.forEach((user) => {
    //     console.log(user._id === userID)
    //   })
    // })
  });



// ==========================================================
//добавление изначальных карточек
const cardPopup = new PopupWithImage('.img-zoom');
cardPopup.setEventListeners();

const confirmPopup = new PopupWithConfirm('.confirm-popup', (cardID, card) => {
  event.preventDefault();
  api.deleteCard(cardID)
    .then(() => {
      confirmPopup.close();
      card.remove();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
});
confirmPopup.setEventListeners();

const cardsContainer = new Section({
  // items: initialCards,
  renderer: (item, userID) => {


    item.likes.forEach((user) => {
          console.log(user._id === userID)
        })
    const card = new Card(
      
      item,
      userID,
      '#card-template',
      () => { cardPopup.open(item); }, // handleCardClick
      (cardID) => { confirmPopup.open(cardID, card) } // handleCardDelete
    );
    cardsContainer.addItem(card);


  }
}, '.elements__grid');


// ==========================================================
// Создание экземпляра класса попап с формой для редактирования профиля
const userInfo = new UserInfo('.profile__name', '.profile__job');

const profileEditPopup = new PopupWithForm('.profile-popup', (inputValues) => {
  event.preventDefault();
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
    });
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => {
  profilePopupName.value = userInfo.getUserInfo().name;
  profilePopupJob.value = userInfo.getUserInfo().job;
  profileEditPopup.open();
});

// ==========================================================
// Создание экземпляра класса попап с формой для добавления карточки

const cardAddPopup = new PopupWithForm('.new-post-popup', (inputs) => {
  event.preventDefault();
  api.addNewCard({ name: inputs.place, link: inputs.picture })
    .then(result => {
      // console.log(result);
      const item = result;
      const newCard = new Card(item,
        result.owner._id,
        '#card-template',
        () => { cardPopup.open(item) },// handleCardClick
        (cardID) => { confirmPopup.open(cardID, newCard) } // handleCardDelete
      );
      cardsContainer.addItem(newCard);
      cardAddPopup.close();
      cardAddPopupButtonSave.classList.add('popup__button-save_inactive');
      cardAddPopupButtonSave.setAttribute('disabled', true);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
});
cardAddPopup.setEventListeners();

profileAddButton.addEventListener('click', () => cardAddPopup.open());
// ==========================================================
// код для валидации
//берем форму из документа, создаем экземпляр класса для именно этой формы и включаем валидацию

const formNameValidity = new FormValidator(validationSettings, formName);
formNameValidity.enableValidation();

const formNewPostValidity = new FormValidator(validationSettings, formNewPost);
formNewPostValidity.enableValidation();