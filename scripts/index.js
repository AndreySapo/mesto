const overlay = document.querySelector('.popup');
let form = overlay.querySelector('.popup__form');
let formName = overlay.querySelector('.popup__form-name');
let formJob = overlay.querySelector('.popup__form-job');
// TODO Название переменных должно начинаться с существительного
const closeButton = overlay.querySelector('.popup__form-close-button');

const profile = document.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

//слушатель на открытие формы
// TODO В качестве второго параметра метода addEventListener следует использовать ранее объявленую функцию. 
profileEdit.addEventListener('click', () => {
  // TODO Управление стилями должно быть только в стилевых файлах. По заданию попап должен открываться при добавлении в класс модификатора.
  overlay.setAttribute('style', 'display: block');
  formName['value'] = profileName.textContent;
  formJob['value'] = profileJob.textContent;
})

//слушатель на закрытие формы
// TODO В качестве второго параметра метода addEventListener следует использовать ранее объявленую функцию. 
closeButton.addEventListener('click', () => {
  // TODO Попап должен закрываться при удалении из класса модификатора
  overlay.setAttribute('style', 'display: none');
})

//слушатель на форму
form.addEventListener('submit', (event) => {
  // TODO объект event тут не нужен.
  event.preventDefault();
  profileName.textContent = formName['value'];
  profileJob.textContent = formJob['value'];
  // TODO Необходимо избегать дублирования кода. Надо вызвать уже готовую функцию закрытия попап
  overlay.setAttribute('style', 'display: none');
} );

//на странице выбираем кнопки лайков
// TODO Весь код, не относящийся к заданию, надо удалить или закомментировать
const elements = document.querySelector('.elements__grid');
// TODO Весь код, не относящийся к заданию, надо удалить или закомментировать
let likeButtons = elements.querySelectorAll('.element__button');

//для каждой кнопки лайка при нажатии добавляем/убираем класс element__button_active
likeButtons.forEach(elem => {
  // TODO Весь код, не относящийся к заданию, надо удалить или закомментировать
  elem.addEventListener('click', () => elem.classList.toggle('element__button_active'))
});