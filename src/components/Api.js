export default class Api {
  constructor({ link, cohort, token }) {
    this._url = link + cohort;
    this._headers = {
      headers: {
        authorization: token
      }
    }
  }

  // Получаем юзера
  getUser() {
    return fetch(this._url + '/users/me', this._headers)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result
      })
  }

  // Получаем начальные карточки
  getInitialCards() {
    return fetch(this._url + '/cards', this._headers)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result
      })
  }

  // устанавливаем новые данные юзера
  setUserName(inputs) {
    // Собираем новый Headers
    const headerForSetUserName = Object.assign({}, this._headers);
    headerForSetUserName.headers[`Content-Type`] = 'application/json';
    headerForSetUserName.method = 'PATCH';
    headerForSetUserName.body = JSON.stringify(
      {
        name: inputs.name,
        about: inputs.about
      }
    )

    return fetch(
      this._url + '/users/me',
      headerForSetUserName
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result
      })
  }

  // Добавляем новую карточку
  addNewCard(item) {
    // Собираем новый Headers
    const headerForAddNewCard = Object.assign({}, this._headers);
    headerForAddNewCard.headers[`Content-Type`] = 'application/json';
    headerForAddNewCard.method = 'POST';
    headerForAddNewCard.body = JSON.stringify(
      {
        name: item.name,
        link: item.link
      }
    )

    return fetch(
      this._url + '/cards',
      headerForAddNewCard
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result
      })
  }

  deleteCard(cardId) {
    // Собираем новый Headers
    const headerForDeleteCard = Object.assign({}, this._headers);
    headerForDeleteCard.method = 'DELETE';
    return fetch(
      this._url + '/cards/' + cardId,
      headerForDeleteCard
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result
      })
  }

  toggleLike(method, cardID) {
    // Собираем новый Headers
    const headerForToggleLike = Object.assign({}, this._headers);
    headerForToggleLike.method = method;

    return fetch(
      this._url + `/cards/${ cardID }/likes`,
      headerForToggleLike,
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        return result
      })
  }
}