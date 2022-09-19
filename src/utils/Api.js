import { authorizationToken } from './constants.js'

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })).then(res => res.json());
    }

    getUserInfo() {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })).then(res => res.json());
    }

    likeCard(cardId) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })).then(res => res.json());
    }

    dislikeCard(cardId) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })).then(res => res.json());
    }

    addNewCard(cardData) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            body: cardData,
            headers: this._headers
        })).then(res => res.json());
    }

    updateUserInfo(userData) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: userData
        })).then(res => res.json());
    }

    deleteCard(cardId) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })).then(res => res.json());
    }

    updateAvatar(data) {
        return this._wrapFetchResponse(fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            body: data,
            headers: this._headers
        })).then(res => res.json());
    }

    _wrapFetchResponse(res) {
        return res.then(res => {
            if (!res.ok) {
                return Promise.reject(`fetch(): ${res.body} (${res.status})`);
            }
            return res;
        });
    }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
    headers: {
        authorization: authorizationToken,
        'Content-Type': 'application/json'
    }
});


export { api };