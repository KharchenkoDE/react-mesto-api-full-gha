class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    _checkResponse(res, errorText) {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`${errorText}: ${res.status}`)
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения карточек')
      })
    }
  
    getUresInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка загрузки информации о пользователе')
      })
    }

    setUserInfo(userData) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка изменения данных пользователя')
      })
    }
  
    getAppData() {
      return Promise.all([this.getUresInfo(), this.getInitialCards()])
    }
  
    postNewCard(cardData) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        body: JSON.stringify(cardData),
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка загрузки новой карточки на сервер')
      })
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка удаления карточки с сервера')
      })
    }
  
    setAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify(avatar),
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка изменения аватара пользователя')
      })
    }
  
    changeLike(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка изменения статуса лайка')
      })
    }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
      authorization: '2e178716-522e-409b-aca6-9350655766ce',
      'Content-Type': 'application/json'
  }
});
