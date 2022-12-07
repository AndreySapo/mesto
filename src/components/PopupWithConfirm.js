import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }
  
  open(cardID, cardMarkup) {
    super.open();
    this._cardID = cardID;
    this._cardMarkup = cardMarkup;
  }
  
  _submitCallbackHandler() {
    this._submitCallback(this._cardID, this._cardMarkup);
  }

  setEventListeners() {
    super.setEventListeners();
    // добавляем слушатель, на него вешаем обработчик сабмита
    this._popup.addEventListener('submit', this._submitCallbackHandler.bind(this));
  }

  close() {
    super.close();
    // сбрасываем форму и удаляем дополнительный слушатель
    this._popup.removeEventListener('submit', this._submitCallbackHandler.bind(this) );
  }
}