import "./SearchForm.css";
import Tumbler from "../Tumbler/Tumbler.jsx";
import { useMediaQuery } from "react-responsive";
import loupe from "../../images/icon-form.svg";
import { useState } from "react";

export default function SearchForm({ value, onSearch, setTumbler }) {
  const [state, setState] = useState("");
  const isMobile = useMediaQuery({ query: `(min-width: 544px)` });
  const isTumbler = useMediaQuery({ query: `(max-width: 544px)` });

  function handleChange(e) {
    setState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(state);
  }
  return (
    <section className="search">
      <form onSubmit={handleSubmit} className="search__form" name="search">
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          required
          onChange={handleChange}
          value={state || value}
        />
        <div className="search__tumbler-container">
          <button className="search__button" type="submit"></button>
          {isMobile && <Tumbler setTumbler={setTumbler}></Tumbler>}
        </div>
        {isMobile && <img className="search__icon" src={loupe} />}
      </form>
      {isTumbler && <Tumbler setTumbler={setTumbler}></Tumbler>}
      <div className="search__line"></div>
    </section>
  );
}
