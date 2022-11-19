import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  open(data) {
    super.open();
    this._image = this._popup.querySelector('.img-zoom__img');
    this._image.src = data.link;
    this._image.alt = data.name;
    this._popup.querySelector('.img-zoom__caption').textContent = data.name;
  }
}