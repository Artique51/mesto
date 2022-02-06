
const elementsContainer = document.querySelector('.elements');
const popup = document.querySelector('.popup');

// первый попап(изменение имени и статуса)
const popupEditNameStatus = document.querySelector('.popup_edit-profile');
const nameInput = document.querySelector('.popup__input_value_name');
const jobInput = document.querySelector('.popup__input_value_status');
const profileUserName = document.querySelector('.profile__info-name');
const profileUserStatus = document.querySelector('.profile__info-status');
const formElement = document.querySelector('.popup__form');

// второй попап (добавление карточек)
const popupAddNameLink = document.querySelector('.popup_add-element');
const profilePlaceName = popupAddNameLink.querySelector('.popup__input_value_element-name');
const profilePlacePicture = popupAddNameLink.querySelector('.popup__input_value_element-picture');
const profileAddForm = popupAddNameLink.querySelector('.popup__form');

//кнопки открытия, закрытия, добавления
const editButton = document.querySelector('.profile__edit-button');
const closeButtonNameStatus = document.querySelector('.popup__close');
const closeButtonNameLink = popupAddNameLink.querySelector('.popup__close');
const likeButton = document.querySelector('.element__like');
const addButton = document.querySelector('.profile__add-button');
const deleteButton = document.querySelector('.element__delete');

//переменные попапа image-fullsize
const popupImageFullsize = document.querySelector('.popup_value-fullsize');
const popupImageFullsizeImage = popupImageFullsize.querySelector('.popup__fullsize-image');
const popupImageFullsizeNameImage = popupImageFullsize.querySelector('.popup__fullsize-image-name');
const closeButtonpopupImageFullsize = popupImageFullsize.querySelector('.popup__close');

//добавление функций
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
};

function likeElements(element) {
  element.classList.toggle('element__like_active');
};

function deleteBlock(element) {
  element.remove('element__card');
}

//активация кнопок
addButton.addEventListener('click', function () {
  openPopup(popupAddNameLink);
});

closeButtonNameStatus.addEventListener('click', function () {
  closePopup(popupEditNameStatus);
});

closeButtonNameLink.addEventListener('click', function () {
  profileAddForm.reset();
  closePopup(popupAddNameLink);
});

closeButtonpopupImageFullsize.addEventListener('click', () => {
  closePopup(popupImageFullsize);
});

//первый попап(изменение имени и статуса)
editButton.addEventListener('click', function () {
  openPopup(popupEditNameStatus);
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserStatus.textContent;
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileUserName.textContent = nameInput.value;
  profileUserStatus.textContent = jobInput.value;
  closePopup(popupEditNameStatus);
};

formElement.addEventListener('submit', formSubmitHandler);

//второй попап (добавление/лайк/удаление карточки)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function addElement(name, link) {
  const elementTemplate = document.querySelector('#elements').content;
  const cardElement = elementTemplate.querySelector('.element__card').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');
  const nameElement = cardElement.querySelector('.element__name');
  const titleElement = nameElement.querySelector('.element__title');
  const likeElement = nameElement.querySelector('.element__like');
  const deleteElement = cardElement.querySelector('.element__delete');

  imageElement.alt = name;
  imageElement.src = link;
  titleElement.textContent = name;

  likeElement.addEventListener('click', function () {
    likeElements(likeElement);
  });

  deleteElement.addEventListener('click', function () {
    deleteBlock(cardElement);
  });

  imageElement.addEventListener('click', () => {
    popupImageFullsizeImage.src = link;
    popupImageFullsizeImage.alt = name;
    popupImageFullsizeNameImage.textContent = name;
    openPopup(popupImageFullsize);
  });

  return cardElement;
};

function prependElement(elementsAll, cardElement) {
  elementsAll.prepend(addElement(cardElement.name, cardElement.link));
};

function handleAddElementFormSubmit(event) {
  event.preventDefault();
  const cardElement = {
    name: profilePlaceName.value,
    link: profilePlacePicture.value
  };
  prependElement(elementsContainer, cardElement);
  profileAddForm.reset();
  closePopup(popupAddNameLink);
}

profileAddForm.addEventListener('submit', handleAddElementFormSubmit);

initialCards.forEach(function (cardElement) {
  prependElement(elementsContainer, cardElement);
});