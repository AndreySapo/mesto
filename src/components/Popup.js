// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._buttonClose = document.querySelector(this._popupSelector).querySelector('.popup__button-close');
  }

  open() {
    document.querySelector(this._popupSelector).classList.add('popup_opened');
  }

  close() {
    document.querySelector(this._popupSelector).classList.remove('popup_opened');

    document.removeEventListener('click', this.close.bind(this));
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose() {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__button-close')) {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', this._handleClickClose.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

}