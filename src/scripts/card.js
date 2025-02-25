import { deleeteCard, addLike, deleteLike } from "./api.js";

const templateCard = document.querySelector("#card-template").content;

//создание карточки
function createCard(
  cardContent,
  deleteCardHandler,
  likeCardHandler,
  showImagePopupHandler,
  userId
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

  if (cardContent.owner._id !== userId) {
    cardDltBtn.setAttribute("style", "display:none");
  }
  if (cardContent.likes.some((item) => item._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  // const likesId = cardContent.likes.map(function (item) {
  //   return item._id;
  // });

  // if (likesId.includes(userId)) {
  //   likeButton.classList.add("card__like-button_is-active");
  // }

  cardDltBtn.addEventListener("click", deleteCardHandler);
  likeButton.addEventListener("click", likeCardHandler);
  cardImage.addEventListener("click", showImagePopupHandler);

  return cardEl;
}

//удаление карточки
function deleteCard(evt) {
  const targetEl = evt.target;
  const cardEl = targetEl.closest(".card");
  deleeteCard(cardEl.dataset.deleteId)
    .then(() => {
      cardEl.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//лайк карточки
function likeCard(evt) {
  const targetEl = evt.target;
  const cardEl = targetEl.closest(".card");
  const likeCounter = cardEl.querySelector(".like__counter");
  const likeMethod = targetEl.classList.contains("card__like-button_is-active")
    ? deleteLike
    : addLike;
  likeMethod(cardEl.dataset.deleteId)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
      targetEl.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard, deleteCard, likeCard };
