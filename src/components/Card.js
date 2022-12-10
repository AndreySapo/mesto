export default class Card {
  constructor(data, userID, template, handleCardClick, handleCardDelete, handleCardLike) {
    // поиск и копирование шаблона 
    this._cardTemplate = document.querySelector(template).content;
    this._cardTemplateClone = this._cardTemplate.cloneNode(true);
    this._element = this._cardTemplateClone.querySelector('.element');

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    
    // из шаблона выбираем картинку, подпись и количество лайков 
    this._cardImage = this._element.querySelector('.element__image');
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardLikes = this._element.querySelector('.element__counter-like');

    // выбранным картинкам и подписям присваиваем значения из полученной карточки 
    this._cardImage.src = data.link;
    this._cardImage.alt = data.name;
    this._cardTitle.textContent = data.name;
    this._cardLikes.textContent = data.likes.length;
    this._cardID = data._id;


    // из шаблона выбираем кнопки
    this._cardLikeButton = this._element.querySelector('.element__button-like');
    this._cardTrashButton = this._element.querySelector('.element__button-trash');
    this._cardTrashButton.setAttribute('disabled', true);
    this._cardTrashButton.style.visibility = 'hidden';
    this._cardZoomButton = this._element.querySelector('.element__button-zoom');

    // если айди владельца карточки совпадает с моим айди - включаем мусорку
    if (data.owner._id == userID) {
      this._cardTrashButton.removeAttribute('disabled', true);
      this._cardTrashButton.style.visibility = 'visible';
    }

    // лайки - это массив. для каждого элемента массива лайков (т.е. объекта юзера) делаем проверку
    // если айди лайкнувшего человека = мой айди, тогда элементу кнопки лайка добавляем состояние активной кнопки
    data.likes.forEach((user) => {
      if (user._id === userID) {
        this._cardLikeButton.classList.add('element__button-like_active');
      }
    })

    // слушатели кнопок
    this._cardLikeButton.addEventListener('click', () => this._handleCardLike(this._element, data));
    this._cardTrashButton.addEventListener('click', () => this._handleCardDelete(this._cardID)); //this._remove.bind(this)
    this._cardZoomButton.addEventListener('click', this._handleCardClick);

    return this._element
  }
}