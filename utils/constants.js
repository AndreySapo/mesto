export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// место куда вставлять темплейт с карточками
export const cardsContainer = document.querySelector('.elements__grid');

// переменные для profile
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileJob = profile.querySelector('.profile__job');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const profileAddButton = profile.querySelector('.profile__add-button');

// переменные для profilePopup
export const profilePopup = document.querySelector('.profile-popup');
export const profilePopupForm = profilePopup.querySelector('.popup__form');
export const profilePopupName = profilePopup.querySelector('#name');
export const profilePopupJob = profilePopup.querySelector('#job');

// переменные для new-post-popup
export const newPostPopup = document.querySelector('.new-post-popup');
export const newPostPopupForm = newPostPopup.querySelector('.popup__form');
export const newPostPopupPlace = newPostPopup.querySelector('#place');
export const newPostPopupPicture = newPostPopup.querySelector('#picture');
export const newPostPopupSaveButton = newPostPopup.querySelector('.popup__button-save');

// объект настроек, то, что нужно валидировать
export const validationSettings = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const formName = document.forms.user;
export const formNewPost = document.forms.new_post;