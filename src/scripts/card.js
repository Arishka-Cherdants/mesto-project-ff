// @todo: Темплейт карточки

const templateCard = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(cardContent) {
  const cardEl = templateCard.querySelector(".card").cloneNode(true);
  const cardTitle = cardEl.querySelector(".card__title");
  const cardImage = cardEl.querySelector(".card__image");
  const likeButton = cardEl.querySelector(".card__like-button");

  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;

  const cardDltBtn = cardEl.querySelector(".card__delete-button");
  cardDltBtn.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", () => likeCard(likeButton));

  return cardEl;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const cardEl = evt.target.closest(".card");
  cardEl.remove();
}

// @todo: Вывести карточки на страницу

function showCards(allCards) {
  allCards.forEach((cards) => {
    const card = createCard(cards);
    cardList.append(card);
  });
}

function likeCard(el) {
  el.classList.toggle("card__like-button_is-active");
}

export { showCards, cardList, createCard };
