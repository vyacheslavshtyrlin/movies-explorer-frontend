export default class moviesApi {
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

  getData() {
    const promise = fetch(`${this._url}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return this._checkStatus(promise);
  }
}


