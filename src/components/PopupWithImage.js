import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    super.open();
    this._popup.querySelector('.img-zoom__img').src = this._link;
    this._popup.querySelector('.img-zoom__img').alt = this._name;
    this._popup.querySelector('.img-zoom__caption').textContent = this._name;
  }
}