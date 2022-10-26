import { openPopup } from './utils.js';

class Card {
  constructor(data, template) { //в конструктор передаем объект данных, где содержится имя и ссылка на картинку. и ещё передаем название шаблона
    // поиск и копирование шаблона 
    this._cardTemplate = document.querySelector(template).content;
    this.cardTemplateClone = this._cardTemplate.cloneNode(true);

    // переменные для img-zoom
    this._imgZoomPopup = document.querySelector('.img-zoom');
    this._imageImgZoomPopup = this._imgZoomPopup.querySelector('.img-zoom__img');
    this._captionImgZoomPopup = this._imgZoomPopup.querySelector('.img-zoom__caption');

    // из шаблона выбираем картинку и подпись 
    this._cardImage = this.cardTemplateClone.querySelector('.element__image');
    this._cardTitle = this.cardTemplateClone.querySelector('.element__title');

    // выбранным картинкам и подписям присваиваем значения из полученной карточки 
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    this._cardTitle.textContent = data.name;

    // из шаблона выбираем кнопки
    this._cardLikeButton = this.cardTemplateClone.querySelector('.element__button-like');
    this._cardTrashButton = this.cardTemplateClone.querySelector('.element__button-trash');
    this._cardZoomButton = this.cardTemplateClone.querySelector('.element__button-zoom');

    // слушатели кнопок
    this._cardLikeButton.addEventListener('click', this._toggleLike);
    this._cardTrashButton.addEventListener('click', this._deleteElement);
    this._cardZoomButton.addEventListener('click', () => {
      this._copyToPopupZoom(data);
      openPopup(this.this._imgZoomPopup);
    });

    return this.cardTemplateClone
  }

  // функция изменения состояния кнопки лайка
  _toggleLike = function (event) {
    event.target.classList.toggle('element__button-like_active');
  }

  // функция удаления карточки из списка карточек
  _deleteElement = function (event) {
    const listItem = event.target.parentElement;
    // listItem.remove();
    console.log(listItem)
  }

  // присваиваем нужные значения в попап картинки
  _copyToPopupZoom(data) {
    this.this._imageImgZoomPopup.src = data.link;
    this.this._imageImgZoomPopup.alt = data.name;
    this.this._captionImgZoomPopup.textContent = data.name;
  }
}

export default Card;