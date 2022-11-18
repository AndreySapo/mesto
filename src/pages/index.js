import './index.css';

import {
  initialCards,
  profileEditButton,
  profileAddButton,
  profilePopupName,
  profilePopupJob,
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
// ==========================================================
// тестовая карточка
// Ангарск
// https://shorturl.at/lwDTZ

// ==========================================================
//добавление изначальных карточек
const initialCardsAdding = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', () => {
      cardPopup.open();
    });
    const cardPopup = new PopupWithImage('.img-zoom', item);
    cardPopup.setEventListeners();
    initialCardsAdding.addItem(card);
  }
}, '.elements__grid');
initialCardsAdding.renderItems();

// ==========================================================
// Создание экземпляра класса попап с формой для редактирования профиля
const userInfo = new UserInfo('.profile__name', '.profile__job');

const profileEditPopup = new PopupWithForm('.profile-popup', (inputValues) => {
  event.preventDefault();
  userInfo.setUserInfo(inputValues);
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
  console.log([inputs]);
  const card = new Section({
    items: [{
      name: inputs.place,
      link: inputs.picture
    }],
    renderer: (item) => {
      const cardMarkup = new Card(item, '#card-template', () => {
        cardPopup.open();
      });
      const cardPopup = new PopupWithImage('.img-zoom', item);
      cardPopup.setEventListeners();
      card.addItem(cardMarkup);
    }
  }, '.elements__grid');
  card.renderItems();
  cardAddPopup.close();
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