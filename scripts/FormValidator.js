class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  };
  //Отображение ошибки в форме и вывод сообщения об ошибке
  _showErrorInput = (inputItem, errorMessage) => {
    const inputError = this._form.querySelector(`.${inputItem.id}-error`);
    inputError.textContent = errorMessage;
    inputItem.classList.add(this._config.errorInputText);
    inputError.classList.add(this._config.errorInputSpan);
  };
  //Скрытие ошибки в форме
  _hideErrorInput = (inputItem) => {
    const inputError = this._form.querySelector(`.${inputItem.id}-error`);
    inputError.textContent = ' ';
    inputItem.classList.remove(this._config.errorInputText);
    inputError.classList.remove(this._config.errorInputSpan);
  };
  //Проверка инпута на валидность
  _checkInputValidity = (inputItem) => {
    if(!inputItem.validity.valid) {
      this._showErrorInput(inputItem, inputItem.validationMessage)
    } else {
      this._hideErrorInput(inputItem)
    };
  };
  //Утсновка слушателей изменения полей
  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputTextClass));
    this._button = this._form.querySelector(this._config.buttonSubmit);
    this._toggleButton();
    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButton();
      });
    });
  };
  //Функция смены активности кнопки
  _toggleButton = () => {
    if (this._hasInvalidInput()) {
      this.deactivateButton();
    } else {
      this._activateButton();
    };
  };
  //Получение валидности инпутов
  _hasInvalidInput = () => {
    return this._inputList.some((inputItem) => {
      return !inputItem.validity.valid;
    });
  };
  //Автивация кнопки
  _activateButton = () => {
    this._button.classList.remove(this._config.buttonSubmitDisabled);
    this._button.removeAttribute('disabled');
  };
  //Деактивация кнопки
  deactivateButton = () => {
    this._button.classList.add(this._config.buttonSubmitDisabled);
    this._button.setAttribute('disabled', '');
  };
  //Запуск валидации формы
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
};

export {FormValidator};
