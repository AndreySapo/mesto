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

// функция открытия ЛЮБОГО попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия ЛЮБОГО попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция обнуления инпутов в ЛЮБОМ попапе
function defaultInputValue(popup) {
  arrayOfInputs = popup.querySelectorAll('.popup__input');
  arrayOfInputs.forEach(element => { element.value = '' });
}

// функция создания карточки
// принимает на вход объект карточки
// берем ноду темплейта карточки, копируем её, нужным элементам
// присваиваем необходимые для отображения значения
// создаем кнопки лайка, удаления и зума
// добавляем кнопкам слушатели
// обязательно возвращаем html-код карточки
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
  const cardZoomButton = cardTemplateClone.querySelector('.element__button-zoom');

  function toggleLike(event) {
    event.target.classList.toggle('element__button-like_active');
  }

  function deleteElement() {
    const listItem = cardTrashButton.closest('.element');
    listItem.remove();
  }

  cardLikeButton.addEventListener('click', toggleLike);
  cardTrashButton.addEventListener('click', deleteElement);

  const popupZoom = document.querySelector('.img-zoom');
  const imagePopupZoom = popupZoom.querySelector('.img-zoom__img');
  const captionPopupZoom = popupZoom.querySelector('.img-zoom__caption');
  const buttonClosePopupZoom = popupZoom.querySelector('.img-zoom__button-close');


  function copyToPopupZoom() {
    imagePopupZoom.src = card.link;
    imagePopupZoom.alt = card.name;
    captionPopupZoom.textContent = card.name;
  }

  cardZoomButton.addEventListener('click', () => {
    copyToPopupZoom();
    openPopup(popupZoom);
  });

  function defaultZoomValue() {
    imagePopupZoom.src = '';
    imagePopupZoom.alt = '';
    captionPopupZoom.textContent = '';
  }

  buttonClosePopupZoom.addEventListener('click', () => {
    closePopup(popupZoom);
    defaultZoomValue();
  });

  return cardTemplateClone;
}

// функция создания первых карточек
// получает карточку и добавляет полученную из функции createCard карточку
// в конец списка карточек
function createFirstCards(card) {
  cardsContainer.append(createCard(card));
}

// функция передачи контента из профайла в попап
function sendToInput() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

// функция сохранения контента из попапа в профайл
function saveToProfile(event) {
  event.preventDefault();
  profileName.textContent = profilePopupName.value;
  profileJob.textContent = profilePopupJob.value;
}

// функция добавления новой карточки
// генерируем объект карточки из полученных значений от пользователя
// передаем карточку в функцию создания карточки и добавляем её
// в начало списка карточек
function addCard(event) {
  event.preventDefault();

  const card = {
    name: newPostPopupPlace.value,
    link: newPostPopupPicture.value
  }

  cardsContainer.prepend(createCard(card));
}

// вызовы функций
// для каждой карточки из списка начальных карточек выполнить функцию создания карточки одна за одной
initialCards.forEach(createFirstCards);

// слушатель кнопки редактирования профиля
// сначала передаем данные в инпуты, потом открываем попап
profileEditButton.addEventListener('click', () => {
  sendToInput();
  openPopup(profilePopup);
});

// слушатель кнопки сохранения данных из попапа в профайл
// сохраняем=>закрываем=>очищаем инпуты
profilePopupForm.addEventListener('submit', () => {
  saveToProfile(event);
  closePopup(profilePopup);
  defaultInputValue(profilePopup);
});

// слушатель кнопки закрытия попапа
// закрываем=>очищаем инпуты
profilePopupCloseButton.addEventListener('click', () => {
  closePopup(profilePopup);
  defaultInputValue(profilePopup);
});

// слушатель кнопки открытия попапа профайла
profileAddButton.addEventListener('click', () => {
  openPopup(newPostPopup);
});

// слушатель кнопки закрытия попапа нового поста
// закрываем попап=>очищаем инпуты
newPostPopupCloseButton.addEventListener('click', () => {
  closePopup(newPostPopup);
  defaultInputValue(newPostPopup);
});

// тестовая карточка
// Ангарск
// https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Angarsk_car_Volga_GAZ-21_%2825720495842%29.jpg/1920px-Angarsk_car_Volga_GAZ-21_%2825720495842%29.jpg
// Карачаево-Черкессия
// ./images/Image.jpg

// слушатель кнопки создания нового поста
// добавляем карточку=>закрываем попап=>очищаем инпуты
newPostPopupForm.addEventListener('submit', () => {
  addCard(event);
  closePopup(newPostPopup);
  defaultInputValue(newPostPopup);
})