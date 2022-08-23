import "./Tumbler.css";

export default function FilterCheckbox({ setTumbler }) {
  function handleChange() {
    setTumbler((state) => !state);
  }
  return (
    <label className="tumbler">
      <input
        onChange={handleChange}
        className="tumbler__checkbox"
        type="checkbox"
      />
      <span className="tumbler__tumbler"></span>
      <span className="tumbler__text">Короткометражки</span>
    </label>
  );
}
