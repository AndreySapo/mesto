const overlay = document.querySelector('.popup');
let form = overlay.querySelector('.popup__form');
let formName = overlay.querySelector('.popup__form-name');
let formJob = overlay.querySelector('.popup__form-job');
const closeButton = overlay.querySelector('.popup__form-close-button');

const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

//слушатель на открытие формы
profileEdit.addEventListener('click', () => {
  overlay.setAttribute('style', 'display: block');
  formName['value'] = profileName.textContent;
  formJob['value'] = profileJob.textContent;
})

//слушатель на закрытие формы
closeButton.addEventListener('click', () => {
  overlay.setAttribute('style', 'display: none');
})

//слушатель на форму
form.addEventListener('submit', (event) => {
  event.preventDefault();
  profileName.textContent = formName['value'];
  profileJob.textContent = formJob['value'];
  overlay.setAttribute('style', 'display: none');
} );

//на странице выбираем кнопки лайков
const elements = document.querySelector('.elements__grid');
let likeButtons = elements.querySelectorAll('.element__button');

//для каждой кнопки лайка при нажатии добавляем/убираем класс element__button_active
likeButtons.forEach(elem => {
  elem.addEventListener('click', () => elem.classList.toggle('element__button_active'))
});