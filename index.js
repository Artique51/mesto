let editButton = document.querySelector ('.profile__edit-button');
let closeButton = document.querySelector ('.popup__close');
let popup = document.querySelector ('.popup');
let nameInput = document.querySelector ('.popup__input-name');
let jobInput = document.querySelector ('.popup__input-status');
let profileUserName = document.querySelector ('.profile__info-name');
let profileUserStatus = document.querySelector ('.profile__info-status');

editButton.addEventListener('click', function () {
    popup.classList.add ('popup_opened');
}); 

closeButton.addEventListener('click', function () {
    popup.classList.remove ('popup_opened')
});

let formElement = document.querySelector('.popup');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', formSubmitHandler);
