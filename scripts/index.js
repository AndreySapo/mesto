// место куда вставлять темплейт с карточками + массив для объектов карточек
const cardsContainer = document.querySelector('.elements__grid');
const initialCards = [
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
const profilePopupCloseButton = profilePopup.querySelector('.popup__button-close');

// переменные для new-post-popup
const newPostPopup = document.querySelector('.new-post-popup');
const newPostPopupForm = newPostPopup.querySelector('.popup__form');
const newPostPopupPlace = newPostPopup.querySelector('#place');
const newPostPopupPicture = newPostPopup.querySelector('#picture');
const newPostPopupCloseButton = newPostPopup.querySelector('.popup__button-close');


function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardTemplateClone = cardTemplate.cloneNode(true);

  const cardImage = cardTemplateClone.querySelector('.element__image');
  const cardTitle = cardTemplateClone.querySelector('.element__title');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  const cardLikeButton = cardTemplateClone.querySelector('.element__button-like');
  const cardTrashButton = cardTemplateClone.querySelector('.element__button-trash');

  function toggleLike(event) {
    event.target.classList.toggle('element__button-like_active');
  }

  function deleteElement() {
    const listItem = cardTrashButton.closest('.element');
    listItem.remove();
  }

  cardLikeButton.addEventListener('click', toggleLike);
  cardTrashButton.addEventListener('click', deleteElement);

  return cardTemplateClone;
}

function createFirstCards(card) {
  cardsContainer.append(createCard(card));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function defaultInputValue(popup) {
  arrayOfInputs = popup.querySelectorAll('.popup__input');
  arrayOfInputs.forEach(element => { element.value = '' });
}

// частные функции
function sendToInput() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

function saveToProfile(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;
}

function addCard(event) {
  event.preventDefault();

  const card = {
    name: newPostPopupPlace.value,
    link: newPostPopupPicture.value
  }

  cardsContainer.prepend(createCard(card));
}

// вызовы функций
initialCards.forEach(createFirstCards);

profileEditButton.addEventListener('click', () => {
  sendToInput();
  openPopup(profilePopup);
});

profilePopupForm.addEventListener('submit', () => {
  saveToProfile(event);
  closePopup(profilePopup);
  defaultInputValue(profilePopup);
});

profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
  defaultInputValue(profilePopup);
});

profileAddButton.addEventListener('click', () => {
  openPopup(newPostPopup);
});

newPostPopupCloseButton.addEventListener('click', () => {
  closePopup(newPostPopup);
  defaultInputValue(newPostPopup);
});

// тестовая карточка
// Ангарск
// https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Angarsk_car_Volga_GAZ-21_%2825720495842%29.jpg/1920px-Angarsk_car_Volga_GAZ-21_%2825720495842%29.jpg

newPostPopupForm.addEventListener('submit', () => {
  addCard(event);
  closePopup(newPostPopup);
  defaultInputValue(newPostPopup);
})
