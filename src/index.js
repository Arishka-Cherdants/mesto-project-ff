import "./pages/index.css";
import { cardList, createCard, deleteCard, likeCard } from "./scripts/card.js";
import { showPopup, closePopup, showImagePopup } from "./scripts/modal.js";
import { initialCards } from "./scripts/cards.js";

function showCards(allCards) {
  allCards.forEach((cards) => {
    const card = createCard(cards, deleteCard, likeCard, showImagePopup);
    cardList.append(card);
  });
}

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

const formEditProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const nameValue = document.querySelector(".profile__title");
const jobValue = document.querySelector(".profile__description");
nameInput.placeholder = nameValue.textContent;
jobInput.placeholder = jobValue.textContent;

function submitEditProfileForm(evt) {
  evt.preventDefault();

  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  nameInput.placeholder = nameInput.value;
  jobInput.placeholder = jobInput.value;
  formEditProfile.reset();
  closePopup();
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
  closePopup();
}

formAddCard.addEventListener("submit", addCard);

export { popupImage };
