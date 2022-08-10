import "./Tumbler.css";

export default function FilterCheckbox() {
  return (
    <label className="tumbler">
      <input className="tumbler__checkbox" type="checkbox" />
      <span className="tumbler__tumbler"></span>
      <span className="tumbler__text">Короткометражки</span>
    </label>
  );
}
