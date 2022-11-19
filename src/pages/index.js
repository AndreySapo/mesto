import './index.css';

import {
  initialCards,
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
// ==========================================================
// тестовая карточка
// Ангарск
// https://shorturl.at/lwDTZ

// ==========================================================
//добавление изначальных карточек
const cardPopup = new PopupWithImage('.img-zoom');
cardPopup.setEventListeners();
const cardsContainer = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template', () => {
      cardPopup.open(item);
    });
    cardsContainer.addItem(card);
  }
}, '.elements__grid');
cardsContainer.renderItems();

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
  const item = { name: inputs.place, link: inputs.picture };
  const newCard = new Card(item, '#card-template', () => { cardPopup.open(item) });
  cardsContainer.addItem(newCard);
  cardAddPopup.close();
  cardAddPopupButtonSave.classList.add('popup__button-save_inactive');
  cardAddPopupButtonSave.setAttribute('disabled', true);
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