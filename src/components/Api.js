export default class Api {
  constructor({ link, cohort, token }) {
    this._url = link + cohort;
    this._headers = {
      headers: {
        authorization: token
      }
    }
  }

  _getResponseData(response) {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json()
  }

  // Получаем юзера
  getUser() {
    return fetch(this._url + '/users/me', this._headers)
      .then(response => {
          return this._getResponseData(response)
      }
      )
  }

  // Получаем начальные карточки
  getInitialCards() {
    return fetch(this._url + '/cards', this._headers)
      .then(response => {
        return this._getResponseData(response);
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
        return this._getResponseData(response);
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
        return this._getResponseData(response)
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
        return this._getResponseData(response);
      })
  }

  like(cardID) {
    // Собираем новый Headers
    const headerForToggleLike = Object.assign({}, this._headers);
    headerForToggleLike.method = 'PUT';

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

  dislike(cardID) {
    // Собираем новый Headers
    const headerForToggleLike = Object.assign({}, this._headers);
    headerForToggleLike.method = 'DELETE';

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



  setAvatar(input) {
    const headerForSetAvatar = Object.assign({}, this._headers);
    headerForSetAvatar.headers[`Content-Type`] = 'application/json';
    headerForSetAvatar.method = 'PATCH';
    headerForSetAvatar.body = JSON.stringify(
      {
        avatar: input.avatar
      }
    )

    return fetch(
      this._url + '/users/me/avatar',
      headerForSetAvatar
    )
      .then(response => {
        return this._getResponseData(response);
      })
  }
}