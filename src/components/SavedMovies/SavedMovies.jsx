import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { useEffect, useState } from "react";

export default function SavedMovies({ movies, onDelete }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [checkBox, setCheckBox] = useState(false);

  function handleSearch(value) {
    const result = filterMovies(movies, value, checkBox);
    setSavedMovies(result);
  }

  useEffect(() => {
    setSavedMovies(movies);
  }, [movies]);

  function shortMovies(movies) {
    return movies.filter((movie) => movie.duration < 40);
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

  return (
    <main className="saved-movies">
      <SearchForm setTumbler={setCheckBox} onSearch={handleSearch} />
      <MoviesCardList
        onDelete={onDelete}
        movies={savedMovies}
        savedMovies={movies}
      />
    </main>
  );
}
