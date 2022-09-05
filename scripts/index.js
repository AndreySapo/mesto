// Код для формы
// 1. Получаем необходимые объекты из DOM
// 2. создаем 3 функции.
//      открытие попапа с записью в инпуты информации из профайла
//      закрытие попапа
//      сохранение информации из инпута в профайл + закрытие попапа
// 3. добавляем слушатели на нужные кнопки из первого пункта.
// P.S. сохранение идет по submit, который вешается на форму

const profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
const profileEditButton = profile.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
let popupInputName = popup.querySelector('#name');
let popupInputJob = popup.querySelector('#job');
const popupCloseButton = popup.querySelector('.popup__button-close');

function openPopup() {
  popup.classList.toggle('popup_disable');
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.toggle('popup_disable');
}

function saveToProfile(event) {
  event.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
}

function saveAndClose(event) {
  saveToProfile(event);
  closePopup();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveAndClose);

// код для лайков
// 1. Получаем массив кнопок из родительского для них элемента
// 2. для каждого элемента из массива кнопок добавляем слушатель с нужной функцией
// 3. нужная функция переключает нужный класс для кнопки

// function toggleLike(event) {
//   event.target.classList.toggle('element__button_active');
// }

// const elements = document.querySelector('.elements__grid');
// let likeButtonsArray = elements.querySelectorAll('.element__button');

// likeButtonsArray.forEach(button => button.addEventListener('click', toggleLike));