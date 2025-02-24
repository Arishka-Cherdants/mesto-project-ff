//проверяем валидность полей (возвращает true при невалидности хотя бы одного поля)
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//переключаем кнопку в случае невалидности полей
function buttonToggle(inputList, buttonElement, objectF) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(objectF.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(objectF.inactiveButtonClass);
  }
}

//функция для показа ошибки валидации
function showInputError(formElement, inputElement, errorMessage, objectF) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(objectF.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objectF.errorClass);
}

//функция для скрытия ошибки валидации
function hideError(formElement, inputElement, objectF) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(objectF.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(objectF.errorClass);
}

//проверка валидности форм и присвоение сообщения об ошибке
function checkInputValidity(formElement, inputElement, objectF) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      objectF
    );
  } else {
    hideError(formElement, inputElement, objectF);
  }
}

//"живая" првоерка валидности полей
function setEventListener(formElement, objectF) {
  const inputList = Array.from(
    formElement.querySelectorAll(objectF.inputSelector)
  );
  const buttonElement = formElement.querySelector(objectF.submitButtonSelector);
  buttonToggle(inputList, buttonElement, objectF);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formElement, inputEl, objectF);
      buttonToggle(inputList, buttonElement, objectF);
    });
  });
}

//включение валидации всех форм
function enableValidation(objectF) {
  const formList = Array.from(document.querySelectorAll(objectF.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListener(formElement, objectF);
  });
}

function clearValidation(formElement, objectF) {
  const inputList = Array.from(
    formElement.querySelectorAll(objectF.inputSelector)
  );
  inputList.forEach(function (inputElement) {
    hideError(formElement, inputElement, objectF);
  });
  const buttonElement = formElement.querySelector(objectF.submitButtonSelector);
  buttonToggle(inputList, buttonElement, objectF);
}

export { enableValidation, clearValidation };
