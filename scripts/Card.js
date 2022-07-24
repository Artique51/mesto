//Импорт функция открытия и закрытия попапа, переменная которая содержит страницу
import {openPopup, closePopup, page} from './index.js'

class Card {
  constructor(data, cardSelector){
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    //определяем переменные для работы с попапом открытия картинки в больший размер
    this._popup = page.querySelector('.popup-image');
    this._popupImage = this._popup.querySelector('.popup-image__item');
    this._popupTitle = this._popup.querySelector('.popup-image__title');
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupOverlay = this._popup.querySelector('.popup-image__overlay');
  };
  //Получение темплейта карточки
  _getTemplate() {
    const cardElement = page
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  };
  //Генерация карточки
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    this._likeButton = this._element.querySelector('.card__like-button');
    this._cardTrash = this._element.querySelector('.card__trash');
    this._cardImage = this._element.querySelector('.card__image');

    this._setEventListeners();
    return this._element;
  };
  //Вешаем слушатели на карточку
  _setEventListeners() {
    //Слушатель нажатия на лайк
    this._likeButton
    .addEventListener('click', () => {
      this._toggleLikeButton();
    });
    //Нажатие на корзину
    this._cardTrash
    .addEventListener('click', () => {
      this._removeElement();
    });
    //Нажатие на картинку, для открытия попапа
    this._cardImage
    .addEventListener('click', () => {
      this._handleOpenPopup();
    });
    //Нажатие на закрытие попапа увеличенной картинки
    this._popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
    //Нажатие на фон в попапе увеличенной картинки
    this._popupOverlay.addEventListener('click', () => {
      this._handleClosePopup();
    });
  };
  //Удаление карточки
  _removeElement() {
    this._element.remove();
  };
  //Постановка и удаление лайка
  _toggleLikeButton() {
    this._likeButton
    .classList
    .toggle('card__like-button_active')
  };
  //Открытие попапа увеличенной картинки
  _handleOpenPopup() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._title;
    this._popupTitle.textContent = this._title;
    openPopup(this._popup);
  };
  //Закрытие попапа увеличенной картинки
  _handleClosePopup() {
    closePopup(this._popup);
  };
};

export {Card};
