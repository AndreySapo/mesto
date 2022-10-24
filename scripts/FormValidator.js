class FormValidator {
  constructor(settingsObject, formElement) {
    this.settingsObject = settingsObject;
    this.formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners(this.settingsObject, this.formElement);
  }

  _setEventListeners(settingsObject, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    const buttonElement = formElement.querySelector(settingsObject.buttonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(settingsObject, formElement, inputElement);
        this._toggleButtonState(settingsObject, inputList, buttonElement);
      });
    });

    this._toggleButtonState(settingsObject, inputList, buttonElement);
  }

  _isValid(settingsObject, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(settingsObject, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(settingsObject, formElement, inputElement);
    }
  }

  _showInputError(settingsObject, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settingsObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settingsObject.errorClass);
  }

  _hideInputError(settingsObject, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settingsObject.inputErrorClass);
    errorElement.classList.remove(settingsObject.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(settingsObject, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(settingsObject.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(settingsObject.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export default FormValidator;