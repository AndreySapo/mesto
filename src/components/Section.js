export default class Section {

  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {//принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(item);
  }

  renderItems(items, userID) { // публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента осуществляется функцией renderer.
    items.forEach(item => {
      this._renderer(item, userID);
    });
  }
}