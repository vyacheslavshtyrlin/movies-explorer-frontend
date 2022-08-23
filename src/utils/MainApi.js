export default class MainApi {
  constructor(url, header) {
    this._url = url;
    this._header = header;
  }

  _checkStatus(promise) {
    return promise.then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    });
  }
  getUser() {
    const promise = fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._header,
      },
    });
    return this._checkStatus(promise);
  }

  patchUser(data) {
    const promise = fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: this._header,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    });
    return this._checkStatus(promise);
  }

  getMovie() {
    const promise = fetch(`${this._url}/movies/`, {
      method: "GET",
      headers: {
        authorization: this._header,
      },
    });
    return this._checkStatus(promise);
  }

  createMovie(data) {
    const promise = fetch(`${this._url}/movies/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',

        authorization: this._header,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
      }),
    });
    return this._checkStatus(promise);
  }

  deleteMovie(data) {
    const promise = fetch(`${this._url}/movies/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: this._header,
      },
    });
    return this._checkStatus(promise);
  }
}
