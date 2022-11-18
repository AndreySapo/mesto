class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    this._buttonElement = formElement.querySelector(settingsObject.buttonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settingsObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settingsObject.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
    errorElement.classList.remove(this._settingsObject.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export default FormValidator;