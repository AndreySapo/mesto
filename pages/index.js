import {
  initialCards,
  cardsContainer,
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

// тестовая карточка
// Ангарск
// https://shorturl.at/lwDTZ

// функция переноса из профайла в попап
function fillProfileInputs() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

// функция сохранения из попапа в профайл
function savePopupToProfile(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;
}

//создаем объект карточки из полученных данных
function makeCard() {

  const card = [{
    name: newPostPopupPlace.value,
    link: newPostPopupPicture.value
  }]

  return card
}

// по кнопке редактирования профиля открыть попап редактирования профиля
profileEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  fillProfileInputs();
});

// сабмит + закрытие попапа редактирования профиля
profilePopupForm.addEventListener('submit', (event) => {
  savePopupToProfile(event);
  closePopup(profilePopup);
});

// находим все крестики проекта по универсальному селектору
const buttonsClose = document.querySelectorAll('.popup__button-close');

buttonsClose.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// по кнопке добавления поста открыть попап добавления поста
profileAddButton.addEventListener('click', () => openPopup(newPostPopup));

// сабмит+закрытие попапа добавления поста
newPostPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const cardAdding = new Section({
    items: makeCard(),
    renderer: (item) => {
      const cardMarkup = new Card(item, '#card-template');
      cardAdding.addItem(cardMarkup);
    }
  },
  '.elements__grid'
  );
  cardAdding.renderItems();

  closePopup(newPostPopup);
  event.target.reset();
  newPostPopupSaveButton.classList.add('popup__button-save_inactive');
  newPostPopupSaveButton.setAttribute('disabled', true);
});

// создание изначальных карточек
const initialCardsAdding = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardMarkup = new Card(item, '#card-template');
      initialCardsAdding.addItem(cardMarkup);
    }
  },
  '.elements__grid'
);
initialCardsAdding.renderItems();

// код для валидации
//берем форму из документа, создаем экземпляр класса для именно этой формы и включаем валидацию

const formNameValidity = new FormValidator(validationSettings, formName);
formNameValidity.enableValidation();


const formNewPostValidity = new FormValidator(validationSettings, formNewPost);
formNewPostValidity.enableValidation();