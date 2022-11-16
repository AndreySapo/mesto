import PopupWithImage from "./PopupWithImage.js";

export default class Card {
  constructor(data, template) { //в конструктор передаем объект данных, где содержится имя и ссылка на картинку. и ещё передаем название шаблона
    // поиск и копирование шаблона 
    this._cardTemplate = document.querySelector(template).content;
    this._cardTemplateClone = this._cardTemplate.cloneNode(true);
    this._element = this._cardTemplateClone.querySelector('.element');

    // из шаблона выбираем картинку и подпись 
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');

    // выбранным картинкам и подписям присваиваем значения из полученной карточки 
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    this._cardTitle.textContent = data.name;

    // из шаблона выбираем кнопки
    this._cardLikeButton = this._element.querySelector('.element__button-like');
    this._cardTrashButton = this._element.querySelector('.element__button-trash');
    this._cardZoomButton = this._element.querySelector('.element__button-zoom');

    // слушатели кнопок
    this._cardLikeButton.addEventListener('click', this._toggleLike);
    this._cardTrashButton.addEventListener('click', () => this._element.remove());
    this._cardZoomButton.addEventListener('click', () => {
      const popup = new PopupWithImage('.img-zoom', data);
      popup.setEventListeners();
      popup.open();
    });

    return this._element
  }

  // функция изменения состояния кнопки лайка
  _toggleLike = function (event) {
    event.target.classList.toggle('element__button-like_active');
  }
}