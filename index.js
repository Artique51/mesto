let editButton = document.querySelector ('.profile__edit-button');
let closeButton = document.querySelector ('.popup__close');
let popup = document.querySelector ('.popup');
let nameInput = document.querySelector ('.popup__input_value_name');
let jobInput = document.querySelector ('.popup__input_value_status');
let profileUserName = document.querySelector ('.profile__info-name');
let profileUserStatus = document.querySelector ('.profile__info-status');

editButton.addEventListener('click', function () {
    popup.classList.add ('popup_opened');
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserStatus.textContent;
}); 

function closePopup() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);


let formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);
