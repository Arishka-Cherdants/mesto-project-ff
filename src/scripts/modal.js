import { popupImage } from "../index.js";

const escCode = 27;

function escClose(evt) {
  const popup = document.querySelector(".popup_is-opened");
  if (evt.keyCode === escCode) {
    closePopup(popup);
  }
}

function overlayClose(evt) {
  const popup = document.querySelector(".popup_is-opened");
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("popup")) {
    closePopup(popup);
  }
}

function buttonClosePopup() {
  const popup = document.querySelector(".popup_is-opened");
  closePopup(popup);
}

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

function showPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
  popup.addEventListener("click", overlayClose);
  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.addEventListener("click", buttonClosePopup);
}

function closePopup() {
  const popup = document.querySelector(".popup_is-opened");
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
  popup.removeEventListener("click", overlayClose);
  const buttonClose = popup.querySelector(".popup__close");
  buttonClose.removeEventListener("click", buttonClosePopup);
}

export { showPopup, closePopup, showImagePopup };
