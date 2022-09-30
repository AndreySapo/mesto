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
const profilePopupCloseButton = profilePopup.querySelector('.popup__button-close');

// переменные для new-post-popup
const newPostPopup = document.querySelector('.new-post-popup');
const newPostPopupForm = newPostPopup.querySelector('.popup__form');
const newPostPopupPlace = newPostPopup.querySelector('#place');
const newPostPopupPicture = newPostPopup.querySelector('#picture');
const newPostPopupCloseButton = newPostPopup.querySelector('.popup__button-close');

// переменные для img-zoom
const imgZoomPopup = document.querySelector('.img-zoom');
const imageImgZoomPopup = imgZoomPopup.querySelector('.img-zoom__img');
const captionImgZoomPopup = imgZoomPopup.querySelector('.img-zoom__caption');
const imgZoomPopupButtonClose = imgZoomPopup.querySelector('.popup__button-close');

// функция открытия ЛЮБОГО попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия ЛЮБОГО попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addCard(card) {
  // поиск и копирование шаблона 
  const cardTemplate = document.querySelector('#card-template').content;
  const cardTemplateClone = cardTemplate.cloneNode(true);

  // из шаблона выбираем картинку и подпись 
  const cardImage = cardTemplateClone.querySelector('.element__image');
  const cardTitle = cardTemplateClone.querySelector('.element__title');

  // выбранным картинкам и подписям присваиваем значения из полученной карточки 
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  // из шаблона выбираем кнопки
  const cardLikeButton = cardTemplateClone.querySelector('.element__button-like');
  const cardTrashButton = cardTemplateClone.querySelector('.element__button-trash');
  const cardZoomButton = cardTemplateClone.querySelector('.element__button-zoom');

  // функция изменения состояния кнопки лайка
  function toggleLike(event) {
    event.target.classList.toggle('element__button-like_active');
  }

  // функция удаления карточки из списка карточек
  function deleteElement() {
    const listItem = cardTrashButton.closest('.element');
    listItem.remove();
  }
  
  // присваиваем нужные значения в попап картинки
  function copyToPopupZoom() {
    imageImgZoomPopup.src = card.link;
    imageImgZoomPopup.alt = card.name;
    captionImgZoomPopup.textContent = card.name;
  }

  // слушатели кнопок
  cardLikeButton.addEventListener('click', toggleLike);
  cardTrashButton.addEventListener('click', deleteElement);
  cardZoomButton.addEventListener('click', () => {
    copyToPopupZoom();
    openPopup(imgZoomPopup);
  });

  return cardTemplateClone
}

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

function makeCard() {

  const card = {
    name : newPostPopupPlace.value,
    link : newPostPopupPicture.value
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
const closeButtons = document.querySelectorAll('.popup__button-close');

closeButtons.forEach((button) => {
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
  cardsContainer.prepend(addCard(makeCard()));
  closePopup(newPostPopup);
  event.target.reset();
});

// создание изначальных карточек
initialCards.forEach(element => {
  cardsContainer.append(addCard(element));
});

// тестовая карточка 

// Ангарск 
// https://bit.ly/3xqAYRg


const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');

formInput.addEventListener('input', function (evt) {
  console.log(evt.target.validity.valid);
});