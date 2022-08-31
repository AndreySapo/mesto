//При клике на profile__edit-button должно выполняться 3 действия
//1. отмена display:none для попапа
//2. заполняться input name value из profile__name
//3. заполняться input job value из profile__job

//Выбираем элементы из профайла
let profile = document.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');
let profileEditButton = profile.querySelector('.profile__edit-button');

//выбираем элементы из формы
// TODO переделать выбор селекторов
let formOverlay = document.querySelector('.form__overlay');
let form = document.querySelector('.profile__form');
let formName = form.querySelector('#name');
let formJob = form.querySelector('#job');
let formSaveButton = form.querySelector('.profile__form-save-button');
let formCloseButton = form.querySelector('.profile__form-close-button');

//функция на передачу информации из профайла в форму + отображение формы
function profileEditHandler(evt) {
  formOverlay.setAttribute('style', 'display: block');
  formName.setAttribute('value', `${profileName.textContent}`);
  formJob.setAttribute('value', `${profileJob.textContent}`);
}

function closeForm(evt) {
  evt.preventDefault();
  formOverlay.setAttribute('style', 'display: none');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  closeForm(evt);
}

profileEditButton.addEventListener('click', profileEditHandler);
formSaveButton.addEventListener('click', formSubmitHandler);
formCloseButton.addEventListener('click', closeForm);

//на странице выбираем кнопки лайков
let elements = document.querySelector('.elements__grid');
let element = elements.querySelectorAll('.element');
let likeButtons = elements.querySelectorAll('.element__button');

//для каждой кнопки лайка при нажатии добавляем/убираем класс element__button_active
likeButtons.forEach(elem => {
  elem.addEventListener('click', () => elem.classList.toggle('element__button_active'))
});