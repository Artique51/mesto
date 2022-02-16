

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  inputElement.classList.remove(config.errorClass);
  errorElement.textContent = ' ';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonPopup = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonPopup, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonPopup, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonPopup, config) => {
  if (hasInvalidInput(inputList)) {
    saveButtonDisabled(buttonPopup, config);
  } else {
    saveButtonActive(buttonPopup, config);
  };
};

//функция активной кнопки
const saveButtonActive = (buttonPopup, config) => {
  buttonPopup.classList.remove(config.inactiveButtonClass);
  buttonPopup.removeAttribute('disabled');
};

//функция деактивации кнопки
const saveButtonDisabled = (buttonPopup, config) => {
  buttonPopup.classList.add(config.inactiveButtonClass);
  buttonPopup.setAttribute('disabled', '');
};

// Вызовем функцию
enableValidation(config);


