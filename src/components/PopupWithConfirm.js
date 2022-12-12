import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  _submitCallbackHandler() {
    this._submitCallback();
  }

  setEventListeners() {
    super.setEventListeners();
    // добавляем слушатель, на него вешаем обработчик сабмита
    this._popup.addEventListener('submit', this._submitCallbackHandler.bind(this));
  }

  remove() {
    // DOM удаление карточки необходимо переместить в класс Card в виде отдельного метода, так как данное действие логически принадлежит сущности карточки, а не попапу
    this._cardMarkup.remove();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = 'Сохраняем...';
    } else {
      this._buttonSave.textContent = 'Да';
    }
  }
}