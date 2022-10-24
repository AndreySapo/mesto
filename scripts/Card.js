import {openPopup} from './index.js';

class Card {
  constructor(data, template) { //в конструктор передаем объект данных, где содержится имя и ссылка на картинку. и ещё передаем название шаблона
    // поиск и копирование шаблона 
    const _cardTemplate = document.querySelector(template).content;
    const cardTemplateClone = _cardTemplate.cloneNode(true);

    // переменные для img-zoom
    this._imgZoomPopup = document.querySelector('.img-zoom');
    this._imageImgZoomPopup = this._imgZoomPopup.querySelector('.img-zoom__img');
    this._captionImgZoomPopup = this._imgZoomPopup.querySelector('.img-zoom__caption');

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
      openPopup(this._imgZoomPopup);
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
    this._imageImgZoomPopup.src = data.link;
    this._imageImgZoomPopup.alt = data.name;
    this._captionImgZoomPopup.textContent = data.name;
  }
}

export default Card;