// функция закрытия ЛЮБОГО попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('click', closeByClick);
}

// функции слушателей кнопки esc и щелчка по оверлею
function closeByEscape(evt) {
  // если esc, то находим открытый попап и закрываем его
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

function closeByClick(evt) {
  // если клик по оверлею - то находим открытый попап и закрываем его
  if (evt.target.classList.contains('popup')) {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

// функция открытия ЛЮБОГО попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // добавляем два слушателя, на клик и на клавишу
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeByClick);
}

export { closePopup, openPopup }