import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { showPopup, closePopup, buttonClosePopup } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getUserInf,
  getInitialCards,
  profileEdit,
  createUserCard,
  editAvatar,
} from "./scripts/api.js";

const objectF = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "form__input-error-active",
};

const cardList = document.querySelector(".places__list");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonAvatar = document.querySelector(".button__avatar");
const buttonClose = document.querySelectorAll(".popup__close");
const cardImage = document.querySelectorAll(".card__image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const popupAvatar = document.querySelector(".popup_type_new-avatar");
const formNewAvatar = document.querySelector('[name="new-avatar"]');
const inputAvatar = formNewAvatar.querySelector(".popup__input_type_avatar");

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const nameValue = document.querySelector(".profile__title");
const jobValue = document.querySelector(".profile__description");
const avatarValue = document.querySelector(".profile__image");

buttonAvatar.addEventListener("click", () => showPopup(popupAvatar));

//форма редактирования фотографии аватара
function submitEditAvatar(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();
  editAvatar(inputAvatar.value)
    .then((data) => {
      avatarValue.setAttribute(
        "style",
        `background-image: url(${data.avatar})`
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      clearValidation(formNewAvatar, objectF);
      formNewAvatar.reset();
      closePopup(popupAvatar);
      button.textContent = "Сохранить";
    });
}
formNewAvatar.addEventListener("submit", submitEditAvatar);

buttonEdit.addEventListener("click", function () {
  nameInput.placeholder = nameValue.textContent;
  jobInput.placeholder = jobValue.textContent;
  showPopup(popupEdit);
  clearValidation(formEditProfile, objectF);
});
buttonAdd.addEventListener("click", () => showPopup(popupAdd));

buttonClose.forEach((item) => {
  item.addEventListener("click", buttonClosePopup);
});

//показать попап картинки из карточки
function showImagePopup(evt) {
  const targetEl = evt.target;
  const elImage = popupImage.querySelector(".popup__image");
  const popupCaption = targetEl.alt
  popupImage.querySelector(".popup__caption").textContent = popupCaption;
  console.log(popupCaption);
  elImage.src = targetEl.src;
  elImage.alt = popupCaption;
  showPopup(popupImage);
}

//форма редактирвоания профиля пользователя
function submitEditProfileForm(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();

  profileEdit(nameInput.value, jobInput.value)
    .then((data) => {
      nameValue.textContent = data.name;
      jobValue.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditProfile.reset();
      closePopup(popupEdit);
      button.textContent = "Сохранить";
    });
}
formEditProfile.addEventListener("submit", submitEditProfileForm);

const formAddCard = document.querySelector('[ name = "new-place"]');
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardImageInput = formAddCard.querySelector(".popup__input_type_url");

//функция добавления новой карточки на страницу
function addCard(evt) {
  const button = evt.target.querySelector(".button");
  button.textContent = "Сохранение...";
  evt.preventDefault();

  createUserCard(cardNameInput.value, cardImageInput.value)
    .then((data) => {
      cardList.prepend(createCard(data, deleteCard, likeCard, showImagePopup, data.owner._id));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAddCard.reset();
      clearValidation(formEditProfile, objectF);
      closePopup(evt.target.closest(".popup"));
      button.textContent = "Сохранить";
    });
}

formAddCard.addEventListener("submit", addCard);

enableValidation(objectF);

//отображение карточек на странице
Promise.all([getInitialCards(), getUserInf()])
  .then(([cards, user]) => {
    nameValue.textContent = user.name;
    jobValue.textContent = user.about;
    avatarValue.setAttribute("style", `background-image: url(${user.avatar})`);
    cards.forEach((card) => {
      const newCard = createCard(
        card,
        deleteCard,
        likeCard,
        showImagePopup,
        user._id
      );
      cardList.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

