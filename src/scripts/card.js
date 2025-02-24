import { deleeteCard, addLike, deleteLikeCounter } from "./api.js";

const templateCard = document.querySelector("#card-template").content;

//создание карточки
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
  const likeCounter = cardEl.querySelector(".like__counter");
  cardEl.setAttribute("data-delete-id", `${cardContent._id}`);

  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  likeCounter.textContent = cardContent.likes.length;

  cardDltBtn.addEventListener("click", deleteCardHandler);
  likeButton.addEventListener("click", likeCardHandler);
  cardImage.addEventListener("click", showImagePopupHandler);

  return cardEl;
}

//удаление карточки
function deleteCard(evt) {
  const targetEl = evt.target;
  const cardEl = targetEl.closest(".card");
  deleeteCard(cardEl.dataset.deleteId);
  cardEl.remove();
}


//лайк карточки
function likeCard(evt) {
  const targetEl = evt.target;
  const cardEl = targetEl.closest(".card");
  const likeCounter = cardEl.querySelector(".like__counter");
  if (targetEl.classList.contains("card__like-button_is-active")) {
    deleteLikeCounter(cardEl.dataset.deleteId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardEl.dataset.deleteId)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  targetEl.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
