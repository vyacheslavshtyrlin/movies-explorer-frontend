import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getTimeFromMins } from "../../utils/utils";

export default function MoviesCard({ card, onSave, isSaved, onDelete }) {
  const location = useLocation();

  const [isCardSaved, setIsCardSaved] = useState(isSaved);

  function handleClickCard(card) {
    if (isCardSaved) {
      onDelete(card);
      setIsCardSaved(!isCardSaved);
    } else {
      onSave(card);
      setIsCardSaved(!isCardSaved);
    }
  }

  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <a target="_blank" rel="noreferrer" href={card.trailerLink}>
          <img
            src={card.image}
            alt={card.nameRU}
            title={`Описание: ${card.description} \nCтрана: ${card.country} \nГод: ${card.year} г.`}
            className="movies-card__poster"
          />
        </a>
        <div className="movies-card__description">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          {location.pathname === "/movies" && (
            <button
              onClick={() => handleClickCard(card)}
              type="button"
              className={`movies-card__button movies-card__button_type_${
                !isCardSaved ? "save" : "saved"
              }`}
              title={`${
                isCardSaved ? "Удалить фильм из сохранённых" : "Сохранить фильм"
              }`}
            ></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button
              type="button"
              className="movies-card__button movies-card__button_type_unsave"
              onClick={() => handleClickCard(card)}
              title="Удалить фильм из сохранённых"
            ></button>
          )}
          <span className="movies-card__duration">
            {getTimeFromMins(card.duration)}
          </span>
        </div>
      </article>
    </li>
  );
}
