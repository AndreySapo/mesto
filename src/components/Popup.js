export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._buttonSave = this._popup.querySelector('.popup__button-save');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscClose);
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
    this._popup.addEventListener('mousedown', this._handleClickClose.bind(this));
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = 'Сохраняем...';
    } else {
      this._buttonSave.textContent = 'Сохранить';
    }
  }
}