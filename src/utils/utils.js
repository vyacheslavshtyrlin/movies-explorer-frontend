import { MOVIES_URL_IMG } from "../utils/constants";

function handleMoviesObject(movies) {
  return movies.map((i) => {
    const obj = {
      country: i.country || "-",
      director: i.director,
      duration: i.duration,
      year: i.year,
      description: i.description,
      image: `${MOVIES_URL_IMG}${i.image.url}`,
      trailerLink: i.trailerLink,
      nameRU: i.nameRU,
      nameEN: i.nameEN,
      thumbnail: `${MOVIES_URL_IMG}${i.image.formats.thumbnail.url}`,
      movieId: i.id,
    };
    return obj;
  });
}
function filterMovies(movies, query, checkBox) {
  const result = movies.filter((i) => {
    const nameRu = String(i.nameRU).toLowerCase().trim();
    const nameEn = String(i.nameEN).toLowerCase().trim();
    const userRequest = query.toLowerCase().trim();
    return (
      nameRu.indexOf(userRequest) !== -1 || nameEn.indexOf(userRequest) !== -1
    );
  });
  if (checkBox) {
    return shortMovies(result);
  } else {
    return result;
  }
}

function shortMovies(movies) {
  return movies.filter((movie) => movie.duration < 40);
}

function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + "ч " + minutes + "м";
}

function isSaved(arr, movie) {
  return arr.some((i) => {
    return i.movieId === movie.movieId;
  });
}

export {handleMoviesObject, filterMovies, getTimeFromMins, isSaved, shortMovies}
