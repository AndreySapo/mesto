import initialCards from "./cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// тестовая карточка
// Ангарск
// https://bit.ly/3xqAYRg

// место куда вставлять темплейт с карточками
const cardsContainer = document.querySelector('.elements__grid');

// переменные для profile
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

// переменные для profilePopup
const profilePopup = document.querySelector('.profile-popup');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupName = profilePopup.querySelector('#name');
const profilePopupJob = profilePopup.querySelector('#job');

// переменные для new-post-popup
const newPostPopup = document.querySelector('.new-post-popup');
const newPostPopupForm = newPostPopup.querySelector('.popup__form');
const newPostPopupPlace = newPostPopup.querySelector('#place');
const newPostPopupPicture = newPostPopup.querySelector('#picture');
const newPostPopupSaveButton = newPostPopup.querySelector('.popup__button-save');



// функция закрытия ЛЮБОГО попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscapeOrClick);
  document.removeEventListener('click', closeByEscapeOrClick);
}

// функция слушателей кнопки esc и щелчка по оверлею
function closeByEscapeOrClick(evt) {
  // если esc, то находим открытый попап и закрываем его
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }

  // если клик по оверлею - то находим открытый попап и закрываем его
  if (evt.target.classList.contains('popup')) {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

// функция открытия ЛЮБОГО попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // добавляем два слушателя, на клик и на клавишу
  document.addEventListener('keydown', closeByEscapeOrClick);
  document.addEventListener('click', closeByEscapeOrClick);
}

export { openPopup }

// функция переноса из профайла в попап
function fillProfileInputs() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

function savePopupToProfile(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;
}

//создаем объект карточки из полученных данных
function makeCard() {

  const card = {
    name: newPostPopupPlace.value,
    link: newPostPopupPicture.value
  }

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
profileAddButton.addEventListener('click', () => {
  openPopup(newPostPopup);
});

// сабмит+закрытие попапа добавления поста
newPostPopupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  cardsContainer.prepend(new Card(makeCard(), '#card-template'));
  closePopup(newPostPopup);
  event.target.reset();
  newPostPopupSaveButton.classList.add('popup__button-save_inactive');
  newPostPopupSaveButton.setAttribute('disabled', true);
});

// создание изначальных карточек путем создания новой разметки на основе класса
initialCards.forEach(element => {
  cardsContainer.append(new Card(element, '#card-template'));
});


// код для валидации
// объект настроек, то, что нужно валидировать
const settings = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// массив из всех форм на странице
const formList = Array.from(document.forms);

// для каждого элемента из массива форм создаем новый объект из класса и используем его публичный метод включения валидации
formList.forEach((formElement) => {
  const form = new FormValidator(settings, formElement);
  form.enableValidation();
});