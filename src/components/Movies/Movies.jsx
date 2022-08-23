import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import moviesApi from "../../utils/MoviesApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { useState, useEffect } from "react";
import { MOVIES_URL } from "../../utils/constants";
import { handleMoviesObject, filterMovies } from "../../utils/utils";

export default function Movies({
  onSave,
  onDelete,
  savedMovies,
  setPreloader,
  onMessage,
  isOpen,
}) {
  const api = new moviesApi(MOVIES_URL);
  const [serchedMovie, setSerchedMovie] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [value, setValue] = useState("");

  function handleSearchMovies(value) {
    api
      .getData()
      .then((movies) => {
        setPreloader(true);
        const result = filterMovies(movies, value, checkBox);
        localStorage.setItem("checkBox", `${checkBox}`);
        localStorage.setItem("query", ` ${value}`);
        localStorage.setItem(
          "movie",
          ` ${JSON.stringify(handleMoviesObject(result))}`
        );
      })
      .catch(() => {
        isOpen(true);
        onMessage(`Произошла ошибка, попробуйте позже`);
      })
      .finally(() => setTimeout(() => setPreloader(false), 500));
  }

  useEffect(() => {
    const storage = localStorage.getItem("movie");
    if (storage) {
      setSerchedMovie(JSON.parse(storage));
      setValue(localStorage.getItem("query"));
    } else {
      return;
    }
  }, [localStorage.getItem("movie")]);

  return (
    <main className="movies">
      <SearchForm
        value={value}
        setTumbler={setCheckBox}
        onSearch={handleSearchMovies}
      />
      <MoviesCardList
        onDelete={onDelete}
        onSave={onSave}
        movies={serchedMovie}
        savedMovies={savedMovies}
      />
    </main>
  );
}
