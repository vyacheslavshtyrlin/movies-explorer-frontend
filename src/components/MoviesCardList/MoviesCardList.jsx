import "./MoviesCardList.css";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard.jsx";
import { isSaved } from "../../utils/utils";

export default function MoviesCardList({
  movies,
  savedMovies,
  onSave,
  onDelete,
}) {
  const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );

  const [cardLength, setCardLength] = useState(0);
  const [cardNumber, setCardNumber] = useState(0);
  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", handleResizeWidth);
  }, [handleResizeWidth]);

  useEffect(() => {
    if (screenWidth > 1024) {
      setCardLength(12);
      setCardNumber(3);
    } else if (screenWidth >= 544 && screenWidth < 1024) {
      setCardLength(8);
      setCardNumber(2);
    } else if (screenWidth < 544) {
      setCardLength(5);
      setCardNumber(2);
    }
  }, [screenWidth, movies]);

  const handleShowMore = () => {
    setCardLength(cardLength + cardNumber);
  };

  return (
    <section className="movies-card-list">
      {movies.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <ul className="movies-card-list__list">
          {movies.slice(0, cardLength).map((card) => (
            <MoviesCard
              onDelete={onDelete}
              onSave={onSave}
              key={card.movieId || card._id}
              card={card}
              isSaved={isSaved(savedMovies, card)}
            />
          ))}
        </ul>
      )}

      {location.pathname === "/movies" && (
        <button
          onClick={handleShowMore}
          className={
            movies.length > cardLength
              ? "movies-card-list__show-more"
              : "movies-card-list__show-more_disabled"
          }
        >
          Ещё
        </button>
      )}
    </section>
  );
}
