function showPopup(popup) {
  popup.classList.remove("popup_close");
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_close");
}

export { showPopup, closePopup };
