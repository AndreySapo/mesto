import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  open(data, objectCard){
    super.open();
    this._cardData = data;
    this._objectCard = objectCard;
  }

  setEventListeners() {
    super.setEventListeners();
    // добавляем слушатель, на него вешаем обработчик сабмита
    this._popup.addEventListener('submit', () => this._submitCallback(this._cardData, this._objectCard));
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSave.textContent = 'Сохраняем...';
    } else {
      this._buttonSave.textContent = 'Да';
    }
  }
}