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
const newPostPopupSaveButton = newPostPopup.querySelector('.popup__button-save');
const newPostPopupCloseButton = newPostPopup.querySelector('.popup__button-close');

// переменные для img-zoom
const imgZoomPopup = document.querySelector('.img-zoom');
const imageImgZoomPopup = imgZoomPopup.querySelector('.img-zoom__img');
const captionImgZoomPopup = imgZoomPopup.querySelector('.img-zoom__caption');
const imgZoomPopupButtonClose = imgZoomPopup.querySelector('.popup__button-close');

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

class Card {
  constructor(data, template) { //в конструктор передаем объект данных, где содержится имя и ссылка на картинку. и ещё передаем название шаблона
    // поиск и копирование шаблона 
    const _cardTemplate = document.querySelector(template).content;
    const cardTemplateClone = _cardTemplate.cloneNode(true);

    // из шаблона выбираем картинку и подпись 
    const _cardImage = cardTemplateClone.querySelector('.element__image');
    const _cardTitle = cardTemplateClone.querySelector('.element__title');

    // выбранным картинкам и подписям присваиваем значения из полученной карточки 
    _cardImage.src = data.link;
    _cardImage.alt = data.name;
    _cardTitle.textContent = data.name;

    // из шаблона выбираем кнопки
    const _cardLikeButton = cardTemplateClone.querySelector('.element__button-like');
    const _cardTrashButton = cardTemplateClone.querySelector('.element__button-trash');
    const _cardZoomButton = cardTemplateClone.querySelector('.element__button-zoom');

    // слушатели кнопок
    _cardLikeButton.addEventListener('click', this._toggleLike);
    _cardTrashButton.addEventListener('click', this._deleteElement);
    _cardZoomButton.addEventListener('click', () => {
      this._copyToPopupZoom(data);
      openPopup(imgZoomPopup);
    });

    return cardTemplateClone
  }

  // функция изменения состояния кнопки лайка
  _toggleLike = function (event) {
    event.target.classList.toggle('element__button-like_active');
  }

  // функция удаления карточки из списка карточек
  _deleteElement = function (event) {
    const listItem = event.target.parentElement;
    listItem.remove();
  }

  // присваиваем нужные значения в попап картинки
  _copyToPopupZoom(data) {
    imageImgZoomPopup.src = data.link;
    imageImgZoomPopup.alt = data.name;
    captionImgZoomPopup.textContent = data.name;
  }
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

// создание изначальных карточек
initialCards.forEach(element => {
  cardsContainer.append(new Card(element, '#card-template'));
});

// тестовая карточка

// Ангарск
// https://bit.ly/3xqAYRg