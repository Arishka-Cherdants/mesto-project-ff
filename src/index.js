import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import { showPopup, closePopup, buttonClosePopup } from "./scripts/modal.js";
import { initialCards } from "./scripts/cards.js";

const cardList = document.querySelector(".places__list");

function showCards(allCards) {
  allCards.forEach((cards) => {
    const card = createCard(cards, deleteCard, likeCard, showImagePopup);
    cardList.append(card);
  });
}

showCards(initialCards);

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonClose = document.querySelectorAll(".popup__close");
const cardImage = document.querySelectorAll(".card__image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popups = [popupEdit, popupAdd, popupImage];

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const nameValue = document.querySelector(".profile__title");
const jobValue = document.querySelector(".profile__description");

buttonEdit.addEventListener("click", function () {
  nameInput.placeholder = nameValue.textContent;
  jobInput.placeholder = jobValue.textContent;
  showPopup(popupEdit);
});
buttonAdd.addEventListener("click", () => showPopup(popupAdd));

buttonClose.forEach((item) => {
  item.addEventListener("click", buttonClosePopup);
});

function showImagePopup(evt) {
  const targetEl = evt.target;
  const elImage = popupImage.querySelector(".popup__image");
  const popupCaption = targetEl
    .closest(".places__item")
    .querySelector(".card__title").textContent;
  popupImage.querySelector(".popup__caption").textContent = popupCaption;
  console.log(popupCaption);
  elImage.src = targetEl.src;
  elImage.alt = targetEl.alt;
  showPopup(popupImage);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  formEditProfile.reset();
  closePopup(evt.target.closest(".popup"));
}

formEditProfile.addEventListener("submit", submitEditProfileForm);

const formAddCard = document.querySelector('[ name = "new-place"]');
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const cardImageInput = formAddCard.querySelector(".popup__input_type_url");

function addCard(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardImageInput.value,
  };
  const card = createCard(newCard, deleteCard, likeCard, showImagePopup);
  cardList.prepend(card);
  formAddCard.reset();
  closePopup(evt.target.closest(".popup"));
}

formAddCard.addEventListener("submit", addCard);