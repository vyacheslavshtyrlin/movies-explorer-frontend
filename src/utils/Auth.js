const API_URL = "https://api.moviesdiploma.nomoredomains.xyz";

export default class Auth {
  constructor(url) {
    this._url = url;
  }

  _checkStatus(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  createUser(data) {
    const promise = fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },

      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    return this._checkStatus(promise);
  }

  login(data) {
    const promise = fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },

      body: JSON.stringify({ password: data.password, email: data.email }),
    });
    return this._checkStatus(promise);
  }
}
