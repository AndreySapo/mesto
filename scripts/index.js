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
// Это круто, что вы знаете про тоггл. Но по заданию при открытии попапа данные должны сразу заноситься в форму. 
// Причем, если только при открытии, то значит при использовании тоггла необходимо проверить, содержит ли попап класс открытия.
// Для этого необходимо использовать условие и воспользоваться методом classList.contains. 
// Можно лучше: Лучше функцию с classList.toggle разделить на две разные функции: открытия попапа и закрытия.
// Так ими легче будет управлять и поддерживать в дальнейшем
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
// Если оставите функцию с тогглом, то функция закрытия будет не нужна, так как тоггл и добавляет, и удаляет класс (по принципу выключателя)
// Подробнее http://code.mu/ru/javascript/manual/dom/classList/toggle/
  popup.classList.remove('popup_opened');
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