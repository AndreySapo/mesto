import {
  initialCards,
  profileName,
  profileJob,
  profileEditButton,
  profileAddButton,
  profilePopup,
  profilePopupForm,
  profilePopupName,
  profilePopupJob,
  newPostPopup,
  newPostPopupForm,
  newPostPopupPlace,
  newPostPopupPicture,
  newPostPopupSaveButton,
  validationSettings,
  formName,
  formNewPost
} from '../utils/constants.js'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closePopup, openPopup } from '../utils/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';

// тестовая карточка
// Ангарск
// https://shorturl.at/lwDTZ

function handleCardClick() {
  const popup = new PopupWithImage('.img-zoom', data);
  popup.setEventListeners();
  popup.open();
}

//добавление изначальных карточек
const initialCardsAdding = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card-template');
    initialCardsAdding.addItem(card);
  }
}, '.elements__grid');
initialCardsAdding.renderItems();

//===========================================================
// Создание экземпляра класса попап с формой для редактирования профиля

const profileEditPopup = new PopupWithForm('.profile-popup', (item) => {
  // PopupWithForm submitCallback
  event.preventDefault();
  console.log(item);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => profileEditPopup.open());

//===========================================================
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
      const cardMarkup = new Card(item, '#card-template');
      card.addItem(cardMarkup);
    }
  }, '.elements__grid');
  card.renderItems();
  cardAddPopup.close();
});
cardAddPopup.setEventListeners();

profileAddButton.addEventListener('click', () => cardAddPopup.open());
//===========================================================
// код для валидации
//берем форму из документа, создаем экземпляр класса для именно этой формы и включаем валидацию

const formNameValidity = new FormValidator(validationSettings, formName);
formNameValidity.enableValidation();


const formNewPostValidity = new FormValidator(validationSettings, formNewPost);
formNewPostValidity.enableValidation();