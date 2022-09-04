import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm.jsx";
import moviesApi from "../../utils/MoviesApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import { useState, useEffect } from "react";
import { MOVIES_URL } from "../../utils/constants";
import {
  handleMoviesObject,
  filterMovies,
  shortMovies,
} from "../../utils/utils";

export default function Movies({
  onSave,
  onDelete,
  savedMovies,
  setPreloader,
  setMessage,
  isOpen,
}) {
  const api = new moviesApi(MOVIES_URL);
  const [serchedMovie, setSerchedMovie] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [value, setValue] = useState("");

  function handleSubmit(value) {
    localStorage.setItem("query", ` ${value}`);
    localStorage.setItem("checkBox", `${checkBox}`);

    if (allMovies.length === 0) {
      api
        .getData()
        .then((movies) => {
          setPreloader(true);
          setAllMovies(movies);
          handleSearchMovies(value, movies);
        })
        .catch((error) => {
          isOpen(true);
          setMessage({
            isError: true,
            message: `${error}`,
          });
        })
        .finally(() => setTimeout(() => setPreloader(false), 500));
    } else {
      handleSearchMovies(value, allMovies);
    }
  }

  function handleSearchMovies(value, movies) {
    const result = filterMovies(movies, value, checkBox);
    localStorage.setItem(
      "movie",
      ` ${JSON.stringify(handleMoviesObject(result))}`
    );

    setSerchedMovie(handleMoviesObject(result));
    setMovies(handleMoviesObject(result));
  }

  function handleCheckBox() {
    localStorage.setItem("checkBox", `${!checkBox}`);
    if (!checkBox) {
      const result = shortMovies(serchedMovie);
      setSerchedMovie(result);
    } else {
      setSerchedMovie(movies);
    }
  }

  useEffect(() => {
    const storageCheckBox = localStorage.getItem("checkBox") === "true";
    if (storageCheckBox) {
      setCheckBox(true);
    } else {
      setCheckBox(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("movie")) {
      const moviesStorage = JSON.parse(localStorage.getItem("movie"));
      setMovies(moviesStorage);
      setValue(localStorage.getItem("query"));
      const storageCheckBox = localStorage.getItem("checkBox") === "true";
      if (storageCheckBox) {
        setSerchedMovie(shortMovies(moviesStorage));
        console.log(serchedMovie);
      } else {
        setSerchedMovie(moviesStorage);
      }
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        handleCheckBox={handleCheckBox}
        checkbox={checkBox}
        value={value}
        setTumbler={setCheckBox}
        onSearch={handleSubmit}
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
