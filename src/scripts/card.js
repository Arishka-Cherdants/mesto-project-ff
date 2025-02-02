const templateCard = document.querySelector("#card-template").content;

const cardList = document.querySelector(".places__list");

function createCard(
  cardContent,
  deleteCardHandler,
  likeCardHandler,
  showImagePopupHandler
) {
  const cardEl = templateCard.querySelector(".card").cloneNode(true);
  const cardTitle = cardEl.querySelector(".card__title");
  const cardImage = cardEl.querySelector(".card__image");
  const likeButton = cardEl.querySelector(".card__like-button");
  const cardDltBtn = cardEl.querySelector(".card__delete-button");

  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  cardDltBtn.addEventListener("click", deleteCardHandler);
  likeButton.addEventListener("click", likeCardHandler);
  cardImage.addEventListener("click", showImagePopupHandler);

  return cardEl;
}

function deleteCard(evt) {
  const targetEl = evt.target;
  const cardEl = targetEl.closest(".card");
  cardEl.remove();
}

function likeCard(evt) {
  const targetEl = evt.target;
  targetEl.classList.toggle("card__like-button_is-active");
}

export { cardList, createCard, deleteCard, likeCard };
