// переменные для profile
const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileAbout = profile.querySelector('.profile__job');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const profileAddButton = profile.querySelector('.profile__add-button');
export const avatarEditButton = profile.querySelector('.profile__avatar-edit-button');
export const profileAvatar = profile.querySelector('.profile__avatar-img');

// переменные для profilePopup
const profilePopup = document.querySelector('.profile-popup');
export const profilePopupName = profilePopup.querySelector('#name');
export const profilePopupJob = profilePopup.querySelector('#job');
export const profilePopupButtonSave = profilePopup.querySelector('.popup__button-close');

// переменные для avatarEditPopup
export const avatarEditPopup = document.querySelector('.avatar-edit-popup');
export const avatarEditPopupButtonSave = avatarEditPopup.querySelector('.popup__button-save');

export const cardAddPopupButtonSave = document.querySelector('.new-post-popup').querySelector('.popup__button-save');

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
export const formAvatar = document.forms.avatar;