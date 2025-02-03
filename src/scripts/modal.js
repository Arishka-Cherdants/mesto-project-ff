const escCode = 27;

function escClose(evt) {
  if (evt.keyCode === escCode) {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function overlayClose(evt) {
  const eventTarget = evt.target;
  if (eventTarget.classList.contains("popup")) {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function buttonClosePopup() {
  const popup = document.querySelector(".popup_is-opened");
  closePopup(popup);
}

function showPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
  popup.addEventListener("click", overlayClose);
}

function closePopup(popup) {
  document.removeEventListener("keydown", escClose);
  popup.removeEventListener("click", overlayClose);
  popup.classList.remove("popup_is-opened");
}

export { showPopup, closePopup, buttonClosePopup };
