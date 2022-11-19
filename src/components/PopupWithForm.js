import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popup = document.querySelector(this._popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._form.querySelectorAll('.popup__input');

    // создаём пустой объект
    this._formValues = {};

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    // добавляем слушатель, на него вешаем обработчик сабмита, куда передаем результат функции сбора значений инпутов с открытой формы.
    this._popup.addEventListener('submit', () => this._submitCallback(this._getInputValues()));
  }

  close() {
    super.close();
    // сбрасываем форму и удаляем дополнительный слушатель
    this._form.reset();
    this._popup.removeEventListener('submit', () => this._submitCallback(this._getInputValues()));
  }

}