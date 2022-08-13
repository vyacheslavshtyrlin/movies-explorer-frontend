import "./SearchForm.css";
import Tumbler from "../Tumbler/Tumbler.jsx";
import { useMediaQuery } from "react-responsive";
import loupe from "../../images/icon-form.svg";

export default function SearchForm() {
  const isMobile = useMediaQuery({ query: `(min-width: 544px)` });
  const isTumbler = useMediaQuery({ query: `(max-width: 544px)` });

  return (
    <section className="search">
      <form className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
        />
        <div className="search__tumbler-container">
          <button className="search__button" type="submit"></button>
          {isMobile && <Tumbler></Tumbler>}
        </div>
        {isMobile && <img className="search__icon" src={loupe} />}
      </form>
      {isTumbler && <Tumbler></Tumbler>}
      <div className="search__line"></div>
    </section>
  );
}
