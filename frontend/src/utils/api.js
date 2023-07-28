class Api {
    constructor(options) {
      this._url = options.baseUrl;
    }
  
    _checkResponse(res, errorText) {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`${errorText}: ${res.status}`)
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка получения карточек')
      })
    }
  
    getUresInfo() {
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка загрузки информации о пользователе')
      })
    }

    setUserInfo(userData) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify(userData),
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
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
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка загрузки новой карточки на сервер')
      })
    }
  
    deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка удаления карточки с сервера')
      })
    }
  
    setAvatar(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify(avatar),
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка изменения аватара пользователя')
      })
    }
  
    changeLike(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        return this._checkResponse(res, 'Ошибка изменения статуса лайка')
      })
    }
}

export const api = new Api({
  baseUrl: 'https://api.kharchenkode-pw15.nomoredomains.sbs'
});
