import "./pages/index.css"; // добавьте импорт главного файла стилей
import { showCards, cardList, createCard } from "./scripts/card.js";
import { showPopup, closePopup } from "./scripts/modal.js";
import { initialCards } from "./scripts/cards.js";

showCards(initialCards);

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const cardImage = document.querySelectorAll(".card__image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popups = [popupEdit, popupAdd, popupImage];

buttonEdit.addEventListener("click", () => showPopup(popupEdit));
buttonAdd.addEventListener("click", () => showPopup(popupAdd));
cardImage.forEach((item) => {
  item.addEventListener("click", function () {
    const elImage = popupImage.querySelector(".popup__image");
    elImage.src = item.src;
    elImage.alt = item.alt;
    showPopup(popupImage);
  });
});

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
  popup.addEventListener("click", function (evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

popups.forEach((popup) => {
  document.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      closePopup(popup);
    }
  });
});

const buttonsClose = document.querySelectorAll(".popup__close");
buttonsClose.forEach((item) => {
  item.addEventListener("click", () => closePopup(item.closest(".popup")));
});

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = document.querySelector(".profile__title");
  const jobValue = document.querySelector(".profile__description");

  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  formElement.reset();
}

formElement.addEventListener("submit", handleFormSubmit);

const addCardElement = document.querySelector('[ name = "new-place"]');
const cardNameInput = addCardElement.querySelector(
  ".popup__input_type_card-name"
);
const cardImageInput = addCardElement.querySelector(".popup__input_type_url");

function addCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardImageInput.value,
  };
  const card = createCard(newCard);
  cardList.prepend(card);
  addCardElement.reset();
}

addCardElement.addEventListener("submit", addCard);
