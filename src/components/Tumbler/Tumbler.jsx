import "./Tumbler.css";

export default function FilterCheckbox({ setTumbler, tumbler, handleCheckBox }) {
  function handleChange() {
    setTumbler((state) => !state);
    handleCheckBox()
  }

  console.log(tumbler)
  return (
    <label className="tumbler">
      <input
        onChange={handleChange}
        className="tumbler__checkbox"
        type="checkbox"
        checked={tumbler ? true : false}
      />
      <span className="tumbler__tumbler"></span>
      <span className="tumbler__text">Короткометражки</span>
    </label>
  );
}
