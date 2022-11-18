export const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

// переменные для profile
const profile = document.querySelector('.profile');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const profileAddButton = profile.querySelector('.profile__add-button');

// переменные для profilePopup
const profilePopup = document.querySelector('.profile-popup');
export const profilePopupName = profilePopup.querySelector('#name');
export const profilePopupJob = profilePopup.querySelector('#job');

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