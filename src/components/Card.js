export default class Card {
  constructor(data, userID, template, handleCardClick, handleCardDelete) {
    // поиск и копирование шаблона 
    this._cardTemplate = document.querySelector(template).content;
    this._cardTemplateClone = this._cardTemplate.cloneNode(true);
    this._element = this._cardTemplateClone.querySelector('.element');

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;

    // из шаблона выбираем картинку, подпись и количество лайков 
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardLikes = this._element.querySelector('.element__counter-like');

    // выбранным картинкам и подписям присваиваем значения из полученной карточки 
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    this._cardTitle.textContent = data.name;
    this._cardLikes.textContent = data.likes.length;

    
    // из шаблона выбираем кнопки
    this._cardLikeButton = this._element.querySelector('.element__button-like');
    this._cardTrashButton = this._element.querySelector('.element__button-trash');
    this._cardTrashButton.setAttribute('disabled', true);
    this._cardTrashButton.style.visibility = 'hidden';
    this._cardZoomButton = this._element.querySelector('.element__button-zoom');
    
    if (data.owner._id == userID) {
      this._cardTrashButton.removeAttribute('disabled', true);
    this._cardTrashButton.style.visibility = 'visible';
    }

    // слушатели кнопок
    this._cardLikeButton.addEventListener('click', this._toggleLike);
    this._cardTrashButton.addEventListener('click', this._remove.bind(this));
    this._cardZoomButton.addEventListener('click', this._handleCardClick);

    return this._element
  }

  _remove() {
    this._element.remove();
  }

  // функция изменения состояния кнопки лайка
  _toggleLike() {
    event.target.classList.toggle('element__button-like_active');
  }
}