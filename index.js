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
let form = document.querySelector('.profile__form');
let formName = form.querySelector('#name');
let formJob = form.querySelector('#job');

//функция на передачу информации из профайла в форму + отображение формы
function profileEditHandler(evt) {
  form.setAttribute('style', 'display: grid');
  formName.setAttribute('value', `${profileName.textContent}`);
  formJob.setAttribute('value', `${profileJob.textContent}`);
  console.log('Открыто');
}

function closeForm(evt) {
  evt.preventDefault();
  form.setAttribute('style', 'display: none');
  console.log('Закрыто');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  console.log('Записано');
  closeForm(evt);
}

profileEditButton.addEventListener('click', profileEditHandler);
form.addEventListener('submit', formSubmitHandler);
form.addEventListener('button', closeForm);